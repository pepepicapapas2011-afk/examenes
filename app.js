// Aplicación principal - Guía10

class Guide10App {
    constructor() {
        this.currentGuide = null;
        this.currentMode = 'complete';
        this.uploadedMaterials = [];
        this.practiceAnswers = {};
        this.currentFlashcardIndex = 0;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDragDrop();
        this.loadMainPage();
        this.setupTheme();
    }

    setupTheme() {
        const themeBtn = document.getElementById('toggleTheme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.style.colorScheme === 'dark';
            document.documentElement.style.colorScheme = isDark ? 'light' : 'dark';
            localStorage.setItem('guia10_theme', !isDark ? 'dark' : 'light');
            themeBtn.querySelector('.theme-icon').textContent = isDark ? '🌙' : '☀️';
        });

        const savedTheme = localStorage.getItem('guia10_theme');
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.style.colorScheme = 'dark';
            themeBtn.querySelector('.theme-icon').textContent = '☀️';
        }
    }

    setupEventListeners() {
        // Botón crear guía
        document.getElementById('createGuideBtn').addEventListener('click', () => {
            this.uploadedMaterials = [];
            this.showPage('createGuidePage');
            document.getElementById('createGuideTitle').textContent = 'Crear Nueva Guía';
            this.resetForm();
        });

        // Botones de navegación
        document.getElementById('backFromCreate').addEventListener('click', () => {
            this.loadMainPage();
        });

        document.getElementById('backFromStudy').addEventListener('click', () => {
            this.loadMainPage();
        });

        // Botones de crear/cancelar
        document.getElementById('generateGuideBtn').addEventListener('click', () => {
            this.generateGuide();
        });

        document.getElementById('cancelCreateBtn').addEventListener('click', () => {
            this.loadMainPage();
        });

        // Modos de estudio
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentMode = btn.dataset.mode;
                this.loadStudyContent();
            });
        });

        // Acciones de guía
        document.getElementById('editGuideBtn').addEventListener('click', () => {
            this.editGuide();
        });

        document.getElementById('downloadPdfBtn').addEventListener('click', () => {
            this.downloadPDF();
        });

        document.getElementById('deleteGuideBtn').addEventListener('click', () => {
            this.deleteGuide();
        });

        // Modales
        document.getElementById('errorCloseBtn').addEventListener('click', () => {
            this.hideModal('errorModal');
        });

        document.getElementById('errorRetryBtn').addEventListener('click', () => {
            this.hideModal('errorModal');
            this.generateGuide();
        });

        // Botón de configuración (crear si no existe)
        document.addEventListener('DOMContentLoaded', () => {
            const settingsBtn = document.querySelector('.settings-btn');
            if (settingsBtn) {
                settingsBtn.addEventListener('click', () => {
                    this.showSettings();
                });
            }
        });

        document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
            this.saveSettings();
        });

        document.getElementById('closeSettingsBtn')?.addEventListener('click', () => {
            this.hideModal('settingsModal');
        });
    }

    setupDragDrop() {
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');

        // Prevenir comportamiento por defecto
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Resaltar área al arrastrar
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('dragover');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('dragover');
            });
        });

        // Manejar drop
        uploadArea.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        });

        // Click para seleccionar
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            this.handleFiles(e.target.files);
        });
    }

    async handleFiles(files) {
        const fileArray = Array.from(files);

        for (const file of fileArray) {
            this.addFileToUI(file, 'processing');
            const result = await FileProcessor.processFile(file);
            this.addFileToUI(file, result.success ? 'success' : 'error', result);

            if (result.success) {
                this.uploadedMaterials.push(result);
            }
        }
    }

    addFileToUI(file, status, result = null) {
        const filesContainer = document.getElementById('uploadedFiles');
        const existingItem = document.querySelector(`[data-filename="${file.name}"]`);

        if (existingItem) {
            existingItem.remove();
        }

        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.setAttribute('data-filename', file.name);

        const icon = FileProcessor.getFileIcon(file.name);
        const statusClass = status === 'success' ? 'success' : status === 'error' ? 'error' : 'processing';
        const statusText = status === 'success' ? '✓ Cargado' : status === 'error' ? '✗ Error' : '⋯ Procesando';

        fileItem.innerHTML = `
            <div class="file-info">
                <span class="file-icon">${icon}</span>
                <div class="file-details">
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${FileProcessor.formatFileSize(file.size)}</div>
                </div>
            </div>
            <span class="file-status ${statusClass}">${statusText}</span>
            ${status === 'success' || status === 'error' ? `<button class="remove-file" onclick="app.removeFile('${file.name}')">×</button>` : ''}
        `;

        filesContainer.appendChild(fileItem);

        if (result?.error) {
            const errorMsg = document.createElement('small');
            errorMsg.style.color = 'var(--danger)';
            errorMsg.style.display = 'block';
            errorMsg.style.marginTop = '0.25rem';
            errorMsg.textContent = result.error;
            fileItem.appendChild(errorMsg);
        }
    }

    removeFile(filename) {
        this.uploadedMaterials = this.uploadedMaterials.filter(m => m.filename !== filename);
        const fileItem = document.querySelector(`[data-filename="${filename}"]`);
        if (fileItem) {
            fileItem.remove();
        }
    }

    resetForm() {
        document.getElementById('guideName').value = '';
        document.getElementById('subject').value = '';
        document.getElementById('topics').value = '';
        document.getElementById('examDate').value = '';
        document.getElementById('notesText').value = '';
        document.getElementById('uploadedFiles').innerHTML = '';
        this.uploadedMaterials = [];
    }

    async generateGuide() {
        const name = document.getElementById('guideName').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const topics = parseTopics(document.getElementById('topics').value);
        const examDate = document.getElementById('examDate').value;
        const notesText = document.getElementById('notesText').value.trim();

        if (!name || !subject) {
            this.showError('Por favor completa el nombre y la materia.');
            return;
        }

        if (this.uploadedMaterials.length === 0 && !notesText) {
            this.showError('Debes subir al menos un archivo o pegar contenido de texto.');
            return;
        }

        // Preparar material
        let materials = [...this.uploadedMaterials];
        if (notesText) {
            materials.push({
                filename: 'Apuntes copiados',
                content: notesText,
                preview: notesText.substring(0, 200),
                type: 'Texto'
            });
        }

        this.showLoading('Generando tu guía...');

        try {
            const guideMaterial = {
                subject,
                topics,
                materials,
                examDate
            };

            const guideContent = await ClaudeAPI.generateGuide(guideMaterial, 'complete');

            const guide = new Guide({
                name,
                subject,
                topics,
                examDate,
                materials: materials.map(m => ({
                    filename: m.filename,
                    type: m.type
                })),
                content: guideContent
            });

            guide.save();

            this.hideLoading();
            showNotification('¡Guía creada exitosamente!', 'success');
            this.loadMainPage();

        } catch (error) {
            this.hideLoading();
            console.error('Error:', error);

            if (error.message.includes('Clave de API')) {
                this.showError(error.message + '\n\nDebes configurar tu clave de API de Claude para generar guías.');
                this.showSettings();
            } else {
                this.showError(error.message || 'Error al generar la guía. Intenta nuevamente.');
            }
        }
    }

    loadMainPage() {
        this.showPage('mainPage');
        this.renderGuidesList();
    }

    renderGuidesList() {
        const guides = StorageManager.getAllGuides();
        const guidesList = document.getElementById('guidesList');
        const emptyState = document.getElementById('emptyState');

        guidesList.innerHTML = '';

        if (guides.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        guides.forEach(guideData => {
            const guide = new Guide(guideData);
            const card = document.createElement('div');
            card.className = 'guide-card';
            card.onclick = () => this.loadStudyPage(guide.id);

            const status = getExamStatus(guide.examDate);
            const progressPercent = guide.getProgressPercentage();

            card.innerHTML = `
                <div class="guide-card-header">
                    <h3 class="guide-card-title">${guide.name}</h3>
                    <div class="guide-card-actions">
                        <button class="guide-card-action" onclick="event.stopPropagation(); app.quickEdit('${guide.id}');" title="Editar">✏️</button>
                        <button class="guide-card-action" onclick="event.stopPropagation(); app.deleteGuideWithConfirm('${guide.id}');" title="Eliminar">🗑️</button>
                    </div>
                </div>
                <p class="guide-card-meta">📚 ${guide.subject}</p>
                ${status ? `<p class="guide-card-meta">${status}</p>` : ''}
                <div class="guide-card-topics">
                    ${guide.topics.slice(0, 3).map(t => `<span class="topic-tag">${t}</span>`).join('')}
                    ${guide.topics.length > 3 ? `<span class="topic-tag">+${guide.topics.length - 3}</span>` : ''}
                </div>
                <div class="guide-card-footer">
                    <span class="progress-stat">📈 ${progressPercent}% completado</span>
                    <span class="progress-stat">${formatDate(guide.updatedAt)}</span>
                </div>
            `;

            guidesList.appendChild(card);
        });
    }

    loadStudyPage(guideId) {
        const guideData = StorageManager.getGuide(guideId);
        if (!guideData) {
            this.showError('Guía no encontrada.');
            return;
        }

        this.currentGuide = new Guide(guideData);
        this.currentMode = 'complete';
        this.showPage('studyPage');

        const examStatus = getExamStatus(this.currentGuide.examDate);
        document.getElementById('currentGuideName').textContent = this.currentGuide.name;
        document.getElementById('guideMetadata').textContent = `${this.currentGuide.subject} • ${examStatus}`;

        // Actualiza botones de modos
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === 'complete');
        });

        this.loadStudyContent();
    }

    loadStudyContent() {
        if (!this.currentGuide?.content) {
            document.getElementById('studyContent').innerHTML = '<p>No hay contenido disponible.</p>';
            return;
        }

        const content = this.currentGuide.content;
        let html = '';

        switch (this.currentMode) {
            case 'complete':
                html = this.renderCompleteGuide(content);
                break;
            case 'quick':
                html = this.renderQuickReview(content);
                break;
            case 'thirty':
                html = this.renderThirtyMinutes(content);
                break;
            case 'practice':
                html = this.renderPracticeExam(content);
                break;
            case 'flashcards':
                html = this.renderFlashcards(content);
                break;
            default:
                html = content.html || content.rawContent;
        }

        const studyContent = document.getElementById('studyContent');
        studyContent.innerHTML = html;

        // Agregar interactividad
        this.setupStudyInteractions();
    }

    renderCompleteGuide(content) {
        let html = content.html || '';

        if (!html) {
            // Si no tiene HTML, usa el contenido crudo
            html = `<div class="content-text">${ClaudeAPI.escapeHtml(content.rawContent || '')}</div>`;
        }

        // Agregar secciones de temas para marcar progreso
        if (this.currentGuide.topics && this.currentGuide.topics.length > 0) {
            html += `
                <div class="content-section" style="margin-top: 3rem; border-top: 2px solid var(--border-color); padding-top: 2rem;">
                    <h3>Mi Progreso</h3>
                    <div class="progress-tracker">
                        ${this.currentGuide.topics.map(topic => {
                            const isLearned = this.currentGuide.progress[topic]?.learned;
                            return `
                                <div class="progress-item" style="padding: 0.75rem; background: var(--bg-gray); border-radius: 8px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                                    <span>${topic}</span>
                                    <button class="btn btn-sm ${isLearned ? 'btn-primary' : 'btn-secondary'}"
                                        onclick="app.toggleTopicProgress('${topic}')">
                                        ${isLearned ? '✓ Aprendido' : 'Marcar como entendido'}
                                    </button>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        return html;
    }

    renderQuickReview(content) {
        return content.html || ClaudeAPI.formatQuickReview(content.rawContent || '');
    }

    renderThirtyMinutes(content) {
        return content.html || ClaudeAPI.formatThirtyMinutes(content.rawContent || '');
    }

    renderPracticeExam(content) {
        return content.html || ClaudeAPI.formatPracticeExam(content.rawContent || '');
    }

    renderFlashcards(content) {
        this.currentFlashcardIndex = 0;
        return content.html || ClaudeAPI.formatFlashcards(content.rawContent || '');
    }

    setupStudyInteractions() {
        // Mostrar/ocultar respuestas
        document.querySelectorAll('.answer-box').forEach(box => {
            box.previousElementSibling?.addEventListener('click', () => {
                box.classList.toggle('show');
            });
        });

        // Verificar respuestas en examen práctico
        document.querySelectorAll('.exam-question').forEach((question, index) => {
            const choices = question.querySelectorAll('.choice');
            const answerBox = question.querySelector('.answer-box');

            choices.forEach(choice => {
                choice.addEventListener('click', () => {
                    choice.classList.add('selected');
                    if (answerBox) {
                        answerBox.classList.add('show');
                    }
                });
            });
        });

        // Tarjetas de estudio
        document.querySelectorAll('.flashcard').forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    }

    toggleTopicProgress(topic) {
        const isLearned = this.currentGuide.progress[topic]?.learned;

        if (isLearned) {
            this.currentGuide.markTopicAsNeedsReview(topic);
        } else {
            this.currentGuide.markTopicAsLearned(topic);
        }

        // Recargar contenido para actualizar UI
        this.loadStudyContent();
    }

    editGuide() {
        this.showPage('createGuidePage');
        document.getElementById('createGuideTitle').textContent = 'Editar Guía';

        document.getElementById('guideName').value = this.currentGuide.name;
        document.getElementById('subject').value = this.currentGuide.subject;
        document.getElementById('topics').value = this.currentGuide.topics.join(', ');
        document.getElementById('examDate').value = this.currentGuide.examDate || '';

        this.uploadedMaterials = this.currentGuide.materials || [];
    }

    downloadPDF() {
        if (!this.currentGuide) return;

        let pdfContent = document.getElementById('studyContent').innerHTML;

        // Limpiar HTML para PDF
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = pdfContent;

        // Eliminar botones y controles
        tempDiv.querySelectorAll('.btn, .mode-btn, .progress-tracker').forEach(el => el.remove());

        PDFGenerator.generatePDF(
            this.currentGuide.name,
            tempDiv.innerHTML
        );

        showNotification('PDF descargado exitosamente', 'success');
    }

    deleteGuide() {
        if (!confirm('¿Estás seguro de que quieres eliminar esta guía? Esta acción no se puede deshacer.')) {
            return;
        }

        StorageManager.deleteGuide(this.currentGuide.id);
        showNotification('Guía eliminada', 'success');
        this.loadMainPage();
    }

    deleteGuideWithConfirm(guideId) {
        if (!confirm('¿Estás seguro de que quieres eliminar esta guía?')) {
            return;
        }

        StorageManager.deleteGuide(guideId);
        showNotification('Guía eliminada', 'success');
        this.renderGuidesList();
    }

    quickEdit(guideId) {
        const guideData = StorageManager.getGuide(guideId);
        if (guideData) {
            this.currentGuide = new Guide(guideData);
            this.editGuide();
        }
    }

    showSettings() {
        document.getElementById('settingsModal').classList.remove('hidden');
        const settings = StorageManager.getSettings();
        if (settings.apiKey) {
            document.getElementById('apiKeyInput').value = settings.apiKey;
        }
    }

    saveSettings() {
        const apiKey = document.getElementById('apiKeyInput').value.trim();

        if (!apiKey) {
            this.showError('Por favor ingresa tu clave de API de Claude.');
            return;
        }

        ClaudeAPI.setAPIKey(apiKey);
        this.hideModal('settingsModal');
        showNotification('Configuración guardada exitosamente', 'success');
    }

    // Utilidades de UI
    showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
    }

    showLoading(message = 'Procesando...') {
        document.getElementById('loadingText').textContent = message;
        document.getElementById('loadingModal').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingModal').classList.add('hidden');
    }

    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        document.getElementById('errorModal').classList.remove('hidden');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }
}

// Funciones globales para interactividad de tarjetas
function nextFlashcard() {
    const flashcards = document.querySelectorAll('.flashcard');
    if (flashcards.length === 0) return;

    const app = window.app;
    app.currentFlashcardIndex = (app.currentFlashcardIndex + 1) % flashcards.length;
    flashcards.forEach((card, idx) => {
        card.style.display = idx === app.currentFlashcardIndex ? 'block' : 'none';
    });

    document.getElementById('flashcard-progress').textContent = app.currentFlashcardIndex + 1;
}

function previousFlashcard() {
    const flashcards = document.querySelectorAll('.flashcard');
    if (flashcards.length === 0) return;

    const app = window.app;
    app.currentFlashcardIndex = (app.currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
    flashcards.forEach((card, idx) => {
        card.style.display = idx === app.currentFlashcardIndex ? 'block' : 'none';
    });

    document.getElementById('flashcard-progress').textContent = app.currentFlashcardIndex + 1;
}

// Inicializar aplicación cuando el DOM esté listo
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new Guide10App();

    // Agregar botón de configuración a la navbar si no existe
    if (!document.querySelector('.settings-btn')) {
        const navbar = document.querySelector('.navbar-container');
        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'btn btn-secondary settings-btn';
        settingsBtn.innerHTML = '⚙️ Configuración';
        settingsBtn.style.marginLeft = '1rem';
        settingsBtn.addEventListener('click', () => app.showSettings());
        navbar.appendChild(settingsBtn);
    }
});
