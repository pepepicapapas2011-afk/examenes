// Integración con Claude API para generar guías

class ClaudeAPI {
    static API_ENDPOINT = 'https://api.anthropic.com/v1/messages';
    static MODEL = 'claude-3-5-sonnet-20241022';

    static getAPIKey() {
        // Primero intenta obtener de las variables de entorno (servidor)
        // Si no está disponible, intenta del localStorage (cliente)
        const settings = StorageManager.getSettings();
        return settings.apiKey || '';
    }

    static setAPIKey(key) {
        const settings = StorageManager.getSettings();
        settings.apiKey = key;
        StorageManager.saveSettings(settings);
    }

    static async generateGuide(guideMaterial, mode = 'complete') {
        const apiKey = this.getAPIKey();

        if (!apiKey) {
            throw new Error('Clave de API no configurada. Ve a Configuración para agregar tu clave de Claude API.');
        }

        const prompt = this.buildPrompt(guideMaterial, mode);

        try {
            const response = await fetch(this.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: this.MODEL,
                    max_tokens: 4000,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error?.message || 'Error en la API de Claude');
            }

            const data = await response.json();
            const content = data.content[0].text;

            return this.parseGuideContent(content, mode);
        } catch (error) {
            console.error('Error generating guide:', error);
            throw error;
        }
    }

    static buildPrompt(guideMaterial, mode) {
        const { subject, topics, materials, examDate } = guideMaterial;
        const topicsList = Array.isArray(topics) ? topics.join(', ') : topics;

        const basePrompt = `Eres un tutor experto en crear guías de estudio para estudiantes de preparatoria.

Materia: ${subject}
Temas: ${topicsList || 'A determinarse del material'}
${examDate ? `Fecha del examen: ${examDate}` : ''}

Material proporcionado por el estudiante:
${materials.map(m => `- ${m.filename}: ${m.preview}`).join('\n')}

${mode === 'complete' && `Crea una GUÍA COMPLETA que incluya:
1. Resumen claro de cada tema
2. Conceptos importantes con definiciones sencillas
3. Ejemplos cotidianos para cada concepto
4. Procedimientos paso a paso para ejercicios
5. 3-5 preguntas de autoevaluación con respuestas
6. Errores comunes y cómo evitarlos
7. Puntos clave para recordar

Usa el material del estudiante como fuente principal. Si falta información importante, señálalo con [INFORMACIÓN FALTANTE: descripción].`}

${mode === 'quick' && `Crea un REPASO RÁPIDO con:
1. Los conceptos ESENCIALES (máximo 5 por tema)
2. Una frase clave para cada concepto
3. Un ejemplo rápido
4. Lo más importante que no debo olvidar

Sé muy conciso, ideal para estudiar en 15-20 minutos.`}

${mode === 'thirty' && `Crea un plan de REPASO DE 30 MINUTOS con división clara:
- 10 minutos: Conceptos centrales (80/20 - lo más importante)
- 15 minutos: Ejercicios prácticos o problemas tipo
- 5 minutos: Errores comunes a evitar

Para cada sección, incluye instrucciones claras del tiempo.`}

${mode === 'practice' && `Genera un EXAMEN PRÁCTICO con:
1. 5 preguntas de opción múltiple (a, b, c, d)
2. 2 preguntas abiertas
3. Para cada pregunta, incluye: [RESPUESTA CORRECTA: X] y [EXPLICACIÓN: ...]
4. Para preguntas abiertas, incluye criterios de evaluación

Formato cada pregunta así:
Pregunta 1: [texto]
A) Opción
B) Opción
C) Opción
D) Opción
[RESPUESTA: C]
[EXPLICACIÓN: ...]`}

${mode === 'flashcards' && `Genera 10-15 TARJETAS DE ESTUDIO en este formato exacto:
[FRENTE]: Pregunta o concepto clave
[REVERSO]: Respuesta completa pero concisa

Ejemplo:
[FRENTE]: ¿Qué es una ecuación lineal?
[REVERSO]: Una ecuación de primer grado donde la variable tiene exponente 1. Se resuelve despejando la incógnita.`}

Formato tu respuesta de manera clara y bien estructurada. Usa encabezados, listas y espacios en blanco para legibilidad.`;

        return basePrompt;
    }

    static parseGuideContent(content, mode) {
        const result = {
            mode: mode,
            rawContent: content,
            html: '',
            sections: [],
            hasWarnings: false,
            warnings: []
        };

        // Detecta si hay información faltante
        const missingInfo = content.match(/\[INFORMACIÓN FALTANTE:[^\]]+\]/g);
        if (missingInfo) {
            result.hasWarnings = true;
            result.warnings = missingInfo;
        }

        // Convierte el contenido a HTML según el modo
        switch (mode) {
            case 'complete':
                result.html = this.formatCompleteGuide(content);
                result.sections = this.extractSections(content);
                break;
            case 'quick':
                result.html = this.formatQuickReview(content);
                break;
            case 'thirty':
                result.html = this.formatThirtyMinutes(content);
                break;
            case 'practice':
                result.html = this.formatPracticeExam(content);
                break;
            case 'flashcards':
                result.html = this.formatFlashcards(content);
                result.flashcards = this.extractFlashcards(content);
                break;
            default:
                result.html = `<div class="content-text">${this.escapeHtml(content)}</div>`;
        }

        return result;
    }

    static formatCompleteGuide(content) {
        let html = content
            .split('\n')
            .map(line => {
                // Encabezados
                if (line.match(/^#+\s/)) {
                    const level = line.match(/^#+/)[0].length;
                    const text = line.replace(/^#+\s/, '');
                    return `<h${level} class="content-section">${this.escapeHtml(text)}</h${level}>`;
                }
                // Listas
                if (line.match(/^[-*]\s/)) {
                    const text = line.replace(/^[-*]\s/, '');
                    return `<li class="concept-list-item">${this.escapeHtml(text)}</li>`;
                }
                // Números
                if (line.match(/^\d+\.\s/)) {
                    const text = line.replace(/^\d+\.\s/, '');
                    return `<li class="concept-list-item">${this.escapeHtml(text)}</li>`;
                }
                // Líneas vacías
                if (line.trim() === '') {
                    return '';
                }
                // Párrafos normales
                return `<p class="content-text">${this.escapeHtml(line)}</p>`;
            })
            .join('\n');

        // Envuelve listas
        html = html.replace(/(<li class="concept-list-item">.*?<\/li>)/s, (match) => {
            return `<ul class="concept-list">${match}</ul>`;
        });

        // Destaca información faltante
        html = html.replace(
            /\[INFORMACIÓN FALTANTE:[^\]]+\]/g,
            (match) => `<div class="example-box warning"><strong>⚠️ ${match}</strong></div>`
        );

        return html;
    }

    static formatQuickReview(content) {
        const sections = content.split(/\n\n+/);
        let html = '';

        sections.forEach(section => {
            if (section.trim()) {
                const lines = section.split('\n');
                const title = lines[0];

                html += `<div class="content-section">
                    <h3>${this.escapeHtml(title)}</h3>`;

                lines.slice(1).forEach(line => {
                    if (line.trim()) {
                        html += `<p class="content-text">${this.escapeHtml(line)}</p>`;
                    }
                });

                html += '</div>';
            }
        });

        return html;
    }

    static formatThirtyMinutes(content) {
        const sections = content.split(/(?=\d+\s+minuto)/i);
        let html = '';

        sections.forEach(section => {
            if (section.trim()) {
                const lines = section.split('\n').filter(l => l.trim());
                const title = lines[0];

                html += `<div class="content-section">
                    <h3 class="timer">${this.escapeHtml(title)}</h3>`;

                lines.slice(1).forEach(line => {
                    if (line.trim()) {
                        html += `<p class="content-text">${this.escapeHtml(line)}</p>`;
                    }
                });

                html += '</div>';
            }
        });

        return html;
    }

    static formatPracticeExam(content) {
        const questions = content.split(/(?=Pregunta\s+\d+)/i);
        let html = '';

        questions.forEach((question, index) => {
            if (question.trim()) {
                const lines = question.split('\n').filter(l => l.trim());
                const questionText = lines[0];

                html += `<div class="exam-question">
                    <div class="exam-question-number">Pregunta ${index + 1}</div>
                    <div class="exam-question-text">${this.escapeHtml(questionText)}</div>`;

                const optionLines = lines.filter(l => l.match(/^[A-D]\)/));
                if (optionLines.length > 0) {
                    // Es opción múltiple
                    html += '<div class="multiple-choice-options">';
                    optionLines.forEach((option, i) => {
                        const letter = String.fromCharCode(65 + i);
                        const text = option.replace(/^[A-D]\)\s*/, '');
                        html += `<label class="choice">
                            <input type="radio" name="question-${index}" value="${letter}">
                            ${letter}) ${this.escapeHtml(text)}
                        </label>`;
                    });
                    html += '</div>';
                } else {
                    // Es pregunta abierta
                    html += `<div class="open-answer">
                        <textarea placeholder="Escribe tu respuesta aquí..."></textarea>
                    </div>`;
                }

                // Extrae respuesta
                const answerMatch = question.match(/\[RESPUESTA(?:\s+CORRECTA)?:\s*([^\]]+)\]/i);
                const explanationMatch = question.match(/\[EXPLICACIÓN:\s*([^\]]+)\]/i);

                if (answerMatch || explanationMatch) {
                    html += `<div class="answer-box">
                        ${answerMatch ? `<p><strong>Respuesta correcta:</strong> ${this.escapeHtml(answerMatch[1])}</p>` : ''}
                        ${explanationMatch ? `<p><strong>Explicación:</strong> ${this.escapeHtml(explanationMatch[1])}</p>` : ''}
                    </div>`;
                }

                html += '</div>';
            }
        });

        return html;
    }

    static formatFlashcards(content) {
        const flashcards = this.extractFlashcards(content);
        let html = '<div class="flashcards-container">';

        flashcards.forEach((card, index) => {
            html += `
                <div class="flashcard" data-index="${index}">
                    <div class="flashcard-inner">
                        <div class="flashcard-face flashcard-front">
                            <div class="flashcard-label">Pregunta ${index + 1}</div>
                            <div class="flashcard-content">${this.escapeHtml(card.front)}</div>
                        </div>
                        <div class="flashcard-face flashcard-back">
                            <div class="flashcard-label">Respuesta</div>
                            <div class="flashcard-content">${this.escapeHtml(card.back)}</div>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
            <div class="flashcards-controls">
                <button class="btn btn-secondary" onclick="previousFlashcard()">← Anterior</button>
                <button class="btn btn-secondary" onclick="nextFlashcard()">Siguiente →</button>
            </div>
            <div class="flashcard-progress">
                <span id="flashcard-progress">1</span> / ${flashcards.length}
            </div>
        </div>`;

        return html;
    }

    static extractFlashcards(content) {
        const flashcards = [];
        const cards = content.split(/\[FRENTE\]:/i);

        cards.forEach(card => {
            if (card.trim()) {
                const frontMatch = card.match(/^([^\[]+)/);
                const backMatch = card.match(/\[REVERSO\]:\s*([^\[]+)/i);

                if (frontMatch && backMatch) {
                    flashcards.push({
                        front: frontMatch[1].trim(),
                        back: backMatch[1].trim()
                    });
                }
            }
        });

        return flashcards;
    }

    static extractSections(content) {
        const sections = [];
        const lines = content.split('\n');
        let currentSection = null;

        lines.forEach(line => {
            if (line.match(/^#+\s/)) {
                const level = line.match(/^#+/)[0].length;
                const title = line.replace(/^#+\s/, '');
                currentSection = { level, title, content: [] };
                sections.push(currentSection);
            } else if (currentSection && line.trim()) {
                currentSection.content.push(line);
            }
        });

        return sections;
    }

    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}
