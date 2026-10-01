#!/usr/bin/env node

/**
 * Servidor simple para Guía10
 * Sirve los archivos estáticos y puede actuar como proxy para la API de Claude
 *
 * Uso: node server.js
 * La aplicación estará disponible en http://localhost:3000
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const HOST = 'localhost';

// Tipos MIME
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

// Crear servidor
const server = http.createServer((req, res) => {
    // Headers de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Responder a OPTIONS
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Rutas de API
    if (req.url.startsWith('/api/')) {
        handleAPI(req, res);
        return;
    }

    // Servir archivos estáticos
    handleStaticFile(req, res);
});

function handleStaticFile(req, res) {
    let pathname = req.url;

    // Remover query string
    if (pathname.includes('?')) {
        pathname = pathname.split('?')[0];
    }

    // Index por defecto
    if (pathname === '/' || pathname === '') {
        pathname = '/index.html';
    }

    // Construir ruta del archivo
    const filepath = path.join(__dirname, pathname);

    // Validar que la ruta está dentro del directorio raíz (seguridad)
    if (!filepath.startsWith(__dirname)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Acceso denegado');
        return;
    }

    // Leer archivo
    fs.readFile(filepath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Archivo no encontrado - retornar index.html para SPA
                fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
                    if (err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('404 - No encontrado');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': MIME_TYPES['.html'] });
                    res.end(data);
                });
                return;
            }

            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error interno del servidor');
            return;
        }

        // Determinar tipo MIME
        const ext = path.extname(filepath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Enviar archivo
        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': ext === '.js' || ext === '.css' ? 'max-age=3600' : 'no-cache'
        });
        res.end(data);
    });
}

function handleAPI(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // POST /api/generate-guide
    if (pathname === '/api/generate-guide' && method === 'POST') {
        handleGenerateGuide(req, res);
        return;
    }

    // Ruta no encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
}

function handleGenerateGuide(req, res) {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const data = JSON.parse(body);

            // Obtener clave API
            const apiKey = process.env.ANTHROPIC_API_KEY;
            if (!apiKey) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    error: 'ANTHROPIC_API_KEY no configurada en el servidor'
                }));
                return;
            }

            // Llamar a Claude API
            const response = await callClaudeAPI(data, apiKey);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));

        } catch (error) {
            console.error('Error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                error: error.message || 'Error al procesar la solicitud'
            }));
        }
    });
}

async function callClaudeAPI(data, apiKey) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.anthropic.com',
            port: 443,
            path: '/v1/messages',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            }
        };

        const req = https.request(options, (res) => {
            let responseData = '';

            res.on('data', chunk => {
                responseData += chunk;
            });

            res.on('end', () => {
                try {
                    const parsed = JSON.parse(responseData);
                    resolve(parsed);
                } catch (e) {
                    reject(new Error('Error parsing response: ' + e.message));
                }
            });
        });

        req.on('error', reject);

        // Enviar solicitud
        const payload = JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 4000,
            messages: [
                {
                    role: 'user',
                    content: buildPrompt(data)
                }
            ]
        });

        req.write(payload);
        req.end();
    });
}

function buildPrompt(data) {
    const { subject, topics, materials, mode } = data;

    return `Eres un tutor experto en crear guías de estudio para estudiantes de preparatoria.

Materia: ${subject}
Temas: ${topics.join(', ')}

Material del estudiante:
${materials.map(m => `- ${m.filename}: ${m.preview}`).join('\n')}

Crea una GUÍA COMPLETA que incluya:
1. Resumen claro de cada tema
2. Conceptos importantes con definiciones sencillas
3. Ejemplos cotidianos para cada concepto
4. Procedimientos paso a paso para ejercicios
5. Preguntas de autoevaluación con respuestas
6. Errores comunes y cómo evitarlos`;
}

// Iniciar servidor
server.listen(PORT, HOST, () => {
    console.log(`
╔════════════════════════════════════════╗
║        📚 Guía10 - Servidor             ║
╚════════════════════════════════════════╝

🚀 Servidor ejecutándose en: http://${HOST}:${PORT}

📝 Acciones:
   - Abre tu navegador en: http://localhost:${PORT}
   - Presiona Ctrl+C para detener el servidor

⚙️  Configuración:
   - Si usas Claude API localmente, configura:
     ANTHROPIC_API_KEY=tu-clave-aqui

   - O agrega tu clave en la interfaz de Guía10

💾 Información:
   - Las guías se guardan en localStorage del navegador
   - No se almacenan datos en el servidor
   - Todos tus datos son privados

📚 Más información: Lee README.md
    `);
});

// Manejar Ctrl+C
process.on('SIGINT', () => {
    console.log('\n👋 Cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado');
        process.exit(0);
    });
});
