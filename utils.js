// Utilidades para procesamiento de archivos y generación de PDF

class FileProcessor {
    static getFileIcon(filename) {
        if (filename.endsWith('.pdf')) return '📄';
        if (filename.endsWith('.docx') || filename.endsWith('.doc')) return '📋';
        if (filename.match(/\.(jpg|jpeg|png|gif)$/i)) return '🖼️';
        if (filename.endsWith('.txt')) return '📝';
        return '📎';
    }

    static formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    }

    static async processFile(file) {
        try {
            const extension = file.name.split('.').pop().toLowerCase();

            if (extension === 'pdf') {
                return await this.processPDF(file);
            } else if (['doc', 'docx'].includes(extension)) {
                return await this.processWord(file);
            } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
                return await this.processImage(file);
            } else if (extension === 'txt') {
                return await this.processText(file);
            } else {
                return { success: false, error: `Formato no soportado: .${extension}` };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    static async processPDF(file) {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(' ');
                fullText += pageText + '\n';
            }

            return {
                success: true,
                filename: file.name,
                size: file.size,
                type: 'PDF',
                content: fullText,
                preview: fullText.substring(0, 200)
            };
        } catch (error) {
            return {
                success: false,
                filename: file.name,
                error: 'No se pudo leer el PDF. Puedes pegar el contenido manualmente.'
            };
        }
    }

    static async processWord(file) {
        try {
            // Intenta procesar como DOCX usando un enfoque simple
            const arrayBuffer = await file.arrayBuffer();
            const view = new Uint8Array(arrayBuffer);

            // Busca texto en el archivo ZIP
            let text = '';
            let found = false;

            // Intenta encontrar document.xml
            const str = String.fromCharCode.apply(null, view);
            const xmlRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
            let match;

            while ((match = xmlRegex.exec(str)) !== null) {
                text += match[1] + ' ';
                found = true;
            }

            if (found && text.trim()) {
                return {
                    success: true,
                    filename: file.name,
                    size: file.size,
                    type: 'Word',
                    content: text,
                    preview: text.substring(0, 200)
                };
            } else {
                return {
                    success: false,
                    filename: file.name,
                    error: 'No se pudo leer el archivo Word. Puedes pegar el contenido manualmente.'
                };
            }
        } catch (error) {
            return {
                success: false,
                filename: file.name,
                error: 'No se pudo procesar el archivo Word. Puedes pegar el contenido manualmente.'
            };
        }
    }

    static async processImage(file) {
        try {
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onload = (e) => {
                    resolve({
                        success: true,
                        filename: file.name,
                        size: file.size,
                        type: 'Imagen',
                        content: `[Imagen: ${file.name}]`,
                        preview: `[Imagen insertada: ${file.name}]`,
                        imageData: e.target.result
                    });
                };
                reader.onerror = () => {
                    resolve({
                        success: false,
                        filename: file.name,
                        error: 'No se pudo leer la imagen.'
                    });
                };
                reader.readAsDataURL(file);
            });
        } catch (error) {
            return {
                success: false,
                filename: file.name,
                error: 'Error al procesar la imagen.'
            };
        }
    }

    static async processText(file) {
        try {
            const text = await file.text();
            return {
                success: true,
                filename: file.name,
                size: file.size,
                type: 'Texto',
                content: text,
                preview: text.substring(0, 200)
            };
        } catch (error) {
            return {
                success: false,
                filename: file.name,
                error: 'No se pudo leer el archivo de texto.'
            };
        }
    }
}

class PDFGenerator {
    static generatePDF(guideName, content) {
        const element = document.createElement('div');
        element.innerHTML = this.formatContentForPDF(guideName, content);

        const options = {
            margin: 10,
            filename: `${guideName}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
            pagebreak: { mode: 'avoid-all', before: '.page-break' }
        };

        html2pdf().set(options).from(element).save();
    }

    static formatContentForPDF(guideName, content) {
        return `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h1 style="color: #3b82f6; text-align: center; margin-bottom: 10px;">
                    ${guideName}
                </h1>
                <p style="text-align: center; color: #999; margin-bottom: 30px;">
                    Generado con Guía10 • ${new Date().toLocaleDateString('es-ES')}
                </p>
                <div style="border-top: 2px solid #3b82f6; padding-top: 20px;">
                    ${content}
                </div>
            </div>
        `;
    }
}

class StorageManager {
    static KEY = 'guia10_guides';
    static SETTINGS_KEY = 'guia10_settings';

    static saveGuide(guide) {
        const guides = this.getAllGuides();
        const index = guides.findIndex(g => g.id === guide.id);

        if (index >= 0) {
            guides[index] = guide;
        } else {
            guides.push(guide);
        }

        localStorage.setItem(this.KEY, JSON.stringify(guides));
        return guide;
    }

    static getGuide(id) {
        const guides = this.getAllGuides();
        return guides.find(g => g.id === id);
    }

    static getAllGuides() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    }

    static deleteGuide(id) {
        const guides = this.getAllGuides();
        const filtered = guides.filter(g => g.id !== id);
        localStorage.setItem(this.KEY, JSON.stringify(filtered));
    }

    static saveSettings(settings) {
        localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
    }

    static getSettings() {
        const data = localStorage.getItem(this.SETTINGS_KEY);
        return data ? JSON.parse(data) : {};
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

class Guide {
    constructor(data = {}) {
        this.id = data.id || StorageManager.generateId();
        this.name = data.name || 'Sin título';
        this.subject = data.subject || '';
        this.topics = data.topics || [];
        this.examDate = data.examDate || null;
        this.createdAt = data.createdAt || new Date().toISOString();
        this.updatedAt = data.updatedAt || new Date().toISOString();
        this.materials = data.materials || [];
        this.content = data.content || null;
        this.progress = data.progress || {};
    }

    markTopicAsLearned(topic) {
        this.progress[topic] = { learned: true, date: new Date().toISOString() };
        this.save();
    }

    markTopicAsNeedsReview(topic) {
        this.progress[topic] = { learned: false, date: new Date().toISOString() };
        this.save();
    }

    getProgressPercentage() {
        if (this.topics.length === 0) return 0;
        const learned = this.topics.filter(t => this.progress[t]?.learned).length;
        return Math.round((learned / this.topics.length) * 100);
    }

    save() {
        this.updatedAt = new Date().toISOString();
        StorageManager.saveGuide(this);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            subject: this.subject,
            topics: this.topics,
            examDate: this.examDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            materials: this.materials,
            content: this.content,
            progress: this.progress
        };
    }
}

// Funciones auxiliares
function formatDate(dateString) {
    if (!dateString) return 'Sin fecha';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function daysUntilExam(examDate) {
    if (!examDate) return null;
    const exam = new Date(examDate);
    const today = new Date();
    const diff = exam - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
}

function getExamStatus(examDate) {
    const days = daysUntilExam(examDate);
    if (!days) return '';
    if (days < 0) return '⏰ Examen pasado';
    if (days === 0) return '⚠️ ¡Hoy es el examen!';
    if (days === 1) return '⚠️ Mañana es el examen';
    if (days <= 7) return `⏱️ ${days} días`;
    return `📅 ${days} días`;
}

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 2000;
        animation: slideInDown 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

function truncateText(text, maxLength = 100) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function parseTopics(topicsString) {
    if (!topicsString) return [];
    return topicsString
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
