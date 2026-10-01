# 🏗️ Arquitectura de Guía10

## Estructura General

```
guia10/
├── index.html           # Página principal (interfaz)
├── styles.css           # Estilos CSS
├── utils.js             # Utilidades (procesamiento, almacenamiento)
├── api.js               # Integración con Claude API
├── app.js               # Lógica principal de la aplicación
├── demo-data.js         # Datos de ejemplo
├── server.js            # Servidor Node.js (opcional)
├── package.json         # Dependencias NPM
├── .env.example         # Variables de entorno de ejemplo
├── .gitignore           # Archivos a ignorar en git
├── README.md            # Documentación completa
├── QUICK_START.md       # Guía de inicio rápido
├── CONFIGURACION.md     # Configuración de API
└── ARQUITECTURA.md      # Este archivo
```

---

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    INTERFAZ DE USUARIO                       │
│                      (index.html)                            │
│                                                               │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │ Crear Guía       │  │ Estudiar Guía    │                 │
│  │ - Subir archivos │  │ - 5 modos        │                 │
│  │ - Pegar apuntes  │  │ - Seguimiento    │                 │
│  └──────────────────┘  └──────────────────┘                 │
└─────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                  APP.JS (Controlador)                        │
│                                                               │
│  Maneja eventos y flujos de la aplicación                    │
│  - Navegación entre páginas                                  │
│  - Eventos de botones                                        │
│  - Cambios de modo de estudio                                │
└─────────────────────────────────────────────────────────────┘
                  ↙                            ↖
        ┌─────────────────────┐      ┌─────────────────────┐
        │                     │      │                     │
        ↓                     ↓      ↓                     ↓
    UTILS.JS              API.JS          ALMACENAMIENTO   DATOS
    
    • FileProcessor      • ClaudeAPI      • localStorage    • Demo
    • PDFGenerator       • Prompts        • StorageManager  • Guías
    • Guide class        • Parsing        • LocalStorage    • Progreso
    • Storage Mgr
```

---

## Componentes Principales

### 1. **index.html** (Interfaz)
- Estructura HTML de toda la aplicación
- 3 páginas principales:
  - Página principal (lista de guías)
  - Crear/editar guía
  - Estudiar guía
- Modales para errores, carga, configuración
- Completamente responsive

### 2. **styles.css** (Presentación)
- 1000+ líneas de CSS
- Sistema de variables para colores
- Colores: Azul (#3b82f6), Morado (#8b5cf6), Blanco, Gris
- Modo oscuro automático
- Responsive para móvil/tablet/desktop
- Animaciones suaves

### 3. **utils.js** (Utilidades)

**FileProcessor**
- Procesa PDF con pdf.js
- Procesa Word (.docx) extrayendo XML
- Procesa imágenes como Data URL
- Procesa archivos de texto
- Maneja errores y proporciona feedback

**PDFGenerator**
- Convierte HTML a PDF con html2pdf
- Formatea contenido para impresión
- Genera descargas automáticas

**StorageManager**
- Maneja localStorage
- CRUD para guías
- Almacena configuración
- Genera IDs únicos

**Guide Class**
- Representa una guía
- Métodos para guardar, marcar progreso
- Calcula porcentaje completado

### 4. **api.js** (Integración IA)

**ClaudeAPI**
- Conecta con API de Anthropic
- Clave API guardada en localStorage
- Genera prompts dinámicos según modo
- Parsea respuestas de IA
- Convierte contenido a HTML

**Modos de Generación**
1. **Complete**: Guía completa y detallada
2. **Quick**: Resumen esencial
3. **Thirty**: Plan de 30 minutos
4. **Practice**: Examen práctico
5. **Flashcards**: Tarjetas interactivas

### 5. **app.js** (Controlador Principal)

**Guide10App Class**
- Inicializa la aplicación
- Maneja eventos globales
- Gestiona navegación
- Controla estados

**Métodos Principales**
- `generateGuide()`: Crea nueva guía
- `loadStudyPage()`: Carga página de estudio
- `loadStudyContent()`: Renderiza contenido según modo
- `setupInteractions()`: Agrega interactividad
- `downloadPDF()`: Descarga guía en PDF
- `toggleTopicProgress()`: Marca progreso

### 6. **demo-data.js** (Datos de Ejemplo)

- 2 guías pre-generadas (Biología, Historia)
- Se cargan automáticamente en localhost
- Permiten ver la funcionalidad sin generar contenido
- Útil para pruebas y demostración

### 7. **server.js** (Servidor Node.js - Opcional)

- Servidor HTTP simple
- Sirve archivos estáticos
- Soporte CORS
- Puede actuar como proxy para API (futuro)
- Ejecutar: `npm start`

---

## Flujo de Generación de Guía

```
1. USUARIO SUBE MATERIAL
   └─ Archivos → FileProcessor
   └─ Texto → Validación

2. USUARIO HACE CLIC "GENERAR"
   └─ Validar entrada
   └─ Mostrar modal de carga
   └─ Enviar a ClaudeAPI

3. CLAUDEAPI PROCESA
   └─ Construir prompt dinámico
   └─ Enviar a API.anthropic.com
   └─ Recibir respuesta
   └─ Parsear contenido
   └─ Convertir a HTML

4. APLICACIÓN GUARDA
   └─ Crear objeto Guide
   └─ Guardar en localStorage
   └─ Mostrar éxito

5. USUARIO ESTUDIA
   └─ Ver contenido
   └─ Cambiar modo
   └─ Marcar progreso
   └─ Descargar PDF
```

---

## Estados de la Aplicación

### Estado Global (App)
```javascript
{
  currentGuide: Guide | null,        // Guía actual
  currentMode: 'complete' | ...      // Modo de estudio
  uploadedMaterials: Array,          // Archivos subidos
  practiceAnswers: Object,           // Respuestas en examen
  currentFlashcardIndex: number      // Tarjeta actual
}
```

### Estado de Guía (localStorage)
```javascript
{
  id: string,                        // ID único
  name: string,                      // Nombre
  subject: string,                   // Materia
  topics: string[],                  // Temas
  examDate: string,                  // Fecha examen
  materials: Array,                  // Archivos
  content: Object,                   // Contenido generado
  progress: {                        // Progreso por tema
    "Tema": { learned: boolean }
  }
}
```

---

## Puntos de Integración

### 1. **Con Claude API**
- Endpoint: `https://api.anthropic.com/v1/messages`
- Método: POST
- Headers: `x-api-key`, `anthropic-version`
- Modelos: `claude-3-5-sonnet-20241022`

### 2. **Con Bibliotecas Externas**
- **html2pdf.js**: Generación de PDF
- **pdf.js**: Lectura de PDFs
- **localStorage**: Almacenamiento local

### 3. **Con el Sistema de Archivos**
- Carga mediante `<input type="file">`
- Lectura con FileReader API
- Procesamiento en cliente (sin servidor)

---

## Seguridad

### Validaciones
- ✅ Validar extensión de archivo
- ✅ Validar tamaño de archivo
- ✅ Sanitizar HTML (escapeHtml)
- ✅ Validar entrada de usuario

### Privacidad
- ✅ Clave API solo en navegador
- ✅ Sin servidor intermedio (aunque hay opción)
- ✅ Sin registro de cuentas
- ✅ Sin trackeo

### Límites
- 📦 Máx 25 archivos por subida
- 💾 Límite de localStorage (~5-10 MB)
- ⏱️ Timeout de API 30 segundos

---

## Rendimiento

### Optimizaciones
- 📦 Archivos minificados (CSS/JS)
- 🖼️ Imágenes como Data URLs
- 💾 Caché de localStorage
- ⚡ Lazy loading de contenido

### Tamaños
- HTML: 9 KB
- CSS: 19 KB
- utils.js: 12 KB
- api.js: 14 KB
- app.js: 24 KB
- **Total: ~80 KB**

---

## Extensibilidad

### Agregar Nuevo Modo de Estudio
1. Agregar botón en HTML
2. Agregar prompts en `api.js`
3. Agregar renderizado en `app.js`
4. Agregar estilos en CSS

### Agregar Nuevo Tipo de Archivo
1. Agregar método en `FileProcessor`
2. Agregar icono y validación
3. Agregar manejo de error

### Cambiar Colores
- Editar variables CSS en `:root`
- Cambiar en `@media (prefers-color-scheme: dark)`
- Regenerar CSS

---

## Testing

### Pruebas Manuales
- ✅ Abrir en navegador
- ✅ Ver guías de ejemplo
- ✅ Cambiar entre modos
- ✅ Marcar progreso
- ✅ Descargar PDF
- ✅ Cambiar tema oscuro/claro

### Pruebas de Funcionalidad (Con API)
- Generar guía completa
- Generar repaso rápido
- Generar examen práctico
- Verificar que se guardan en localStorage

---

## Deployment

### Local (Sin servidor)
- Abre index.html en navegador
- Todo funciona directamente

### Con servidor Node.js
```bash
npm install
npm start
# Abre http://localhost:3000
```

### En servidor web
- Copia todos los archivos a servidor web
- Asegúrate de CORS si usas proxy
- Actualiza variables de entorno

---

## Roadmap Futuro

- [ ] Sincronización en la nube
- [ ] Colaboración en línea
- [ ] Más modelos de IA
- [ ] Integración con calendario
- [ ] Recordatorios de estudio
- [ ] Análisis de progreso gráfico
- [ ] Exportación a Anki
- [ ] Búsqueda avanzada

---

**¡La arquitectura está diseñada para ser simple, mantenible y extensible! 🚀**
