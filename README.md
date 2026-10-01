# 📚 Guía10 - Generador de Guías de Estudio para Preparatoria

Una aplicación web moderna y completa para crear guías de estudio personalizadas usando inteligencia artificial. Ideal para prepararte para tus exámenes de preparatoria.

## ✨ Características

### 📖 5 Modos de Estudio
1. **Guía Completa** - Explicación detallada con resúmenes, conceptos, ejemplos, procedimientos y preguntas
2. **Repaso Rápido** - Lo esencial para estudiar en poco tiempo
3. **Repaso de 30 Minutos** - Plan dividido en: 10 min conceptos, 15 min práctica, 5 min errores
4. **Examen Práctico** - Preguntas de opción múltiple y abiertas con retroalimentación
5. **Tarjetas de Estudio** - Pregunta/respuesta interactivas

### 📁 Gestión de Archivos
- Sube PDF, documentos Word, imágenes y archivos de texto
- Pega apuntes directamente en la página
- Procesamiento automático de archivos
- Mensajes útiles si un archivo no se puede leer

### 📊 Seguimiento de Progreso
- Marca temas como "Ya lo entendí" o "Necesito repasarlo"
- Visualiza tu porcentaje de avance
- Guarda múltiples guías por materia

### 💾 Almacenamiento Local
- Todas tus guías se guardan en tu navegador
- Tus datos persisten al cerrar o recargar
- Búsqueda y filtrado de guías

### 🎨 Diseño Moderno
- Interfaz limpia y fácil de usar
- Colores azul, blanco y morado
- Modo oscuro automático
- Completamente responsive para móvil y computadora

### ⬇️ Exportación
- Descarga tus guías en PDF con formato limpio e imprimible

---

## 🚀 Cómo Usar

### 1. Abre la Aplicación
Simplemente abre `index.html` en tu navegador. No necesitas instalar nada.

### 2. Configura tu Clave API
Para que Guía10 pueda generar contenido con IA:

1. Haz clic en el botón **⚙️ Configuración** (arriba a la derecha)
2. Obtén una clave API gratis en: https://console.anthropic.com/
3. Pega tu clave en el campo y haz clic en **Guardar**

**Nota:** Tu clave se guarda solo en tu navegador, nunca se envía a servidores externos.

### 3. Crear una Nueva Guía

1. Haz clic en **+ Crear Nueva Guía**
2. Completa:
   - **Nombre de la Guía** (ej: "Matemáticas - Ecuaciones")
   - **Materia** (ej: "Matemáticas")
   - **Temas** (opcional, separados por coma)
   - **Fecha del Examen** (opcional)

3. Añade Material de Estudio:
   - Sube archivos (PDF, Word, imágenes)
   - O pega tus apuntes directamente en el área de texto
   - Si Guía10 no puede leer un archivo, te lo indicará

4. Haz clic en **Generar Guía**

La aplicación tardará unos segundos en crear tu guía usando IA.

### 4. Estudia en el Modo que Prefieras

Una vez creada tu guía, puedes cambiar entre 5 modos:

- 📖 **Guía Completa** - Lee todo el contenido ordenado
- ⚡ **Repaso Rápido** - Solo lo más importante
- ⏱️ **30 Minutos** - Plan de estudio de media hora
- ✍️ **Examen Práctico** - Contesta preguntas y verifica tus respuestas
- 🎴 **Tarjetas** - Aprende con tarjetas interactivas

### 5. Sigue tu Progreso

En la Guía Completa, puedes marcar cada tema como:
- ✓ Aprendido - Lo entiendo completamente
- Necesito repasarlo - Aún tengo dudas

Tu progreso se guarda automáticamente.

### 6. Descarga tu Guía

Haz clic en **⬇️ Descargar PDF** para guardar tu guía en formato PDF limpio y listo para imprimir.

---

## 🔧 Configuración

### Obtener tu Clave de API

1. Ve a https://console.anthropic.com/
2. Inicia sesión con tu cuenta (o crea una)
3. Ve a "API Keys"
4. Crea una nueva clave
5. Copia la clave (comienza con `sk-ant-`)
6. Pega en Guía10 → Configuración

### ¿Cuánto Cuesta?

Anthropic ofrece:
- **Prueba Gratuita:** $5 USD en créditos iniciales
- **Después:** Pagas solo por lo que usas (~$0.003 por guía típica)

Ver precios: https://www.anthropic.com/pricing

---

## 📖 Estructura del Contenido

### Guía Completa Incluye

✅ **Resumen de cada tema** - Explicación clara y concisa
✅ **Conceptos importantes** - Definiciones sencillas
✅ **Ejemplos cotidianos** - Para entender mejor
✅ **Procedimientos paso a paso** - Para ejercicios y problemas
✅ **Preguntas de autoevaluación** - Con respuestas
✅ **Errores comunes** - Qué evitar
✅ **Puntos clave** - Lo más importante para recordar

Si Guía10 no encuentra información en tus apuntes, te lo indicará con:
⚠️ **[INFORMACIÓN FALTANTE]**

---

## 💾 Dónde se Guardan tus Guías

- **Almacenamiento:** En tu navegador (localStorage)
- **Privacidad:** Todo está en tu computadora, nadie más puede verlo
- **Respaldo:** Guarda tus guías regularmente descargándolas en PDF
- **Límite:** Tu navegador puede almacenar ~5-10 MB (suficiente para muchas guías)

---

## 🌙 Modo Oscuro

Guía10 detecta automáticamente tu preferencia del sistema. Puedes cambiar manualmente haciendo clic en 🌙 / ☀️ en la barra superior.

---

## ❌ Solucionar Problemas

### "Error: Clave de API no configurada"
**Solución:** Abre Configuración (⚙️) y agrega tu clave API de Claude.

### "No se pudo leer el archivo PDF/Word"
**Solución:** Intenta copiar el contenido y pegarlo en el área de texto en lugar de subir el archivo.

### Las guías desaparecieron
**Solución:** Verifica que no hayas borrado los datos del navegador (caché). Las guías se guardan en localStorage.

### Generar la guía tarda mucho
**Solución:** Es normal, la IA tarda 10-30 segundos. Espera a que aparezca "Guía creada exitosamente".

---

## 📋 Requiere

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conexión a Internet
- Clave API de Claude (gratuita con prueba)

---

## 🎯 Consejos para Mejores Resultados

1. **Material de calidad** - Cuanto mejor sean tus apuntes, mejor será la guía
2. **Temas específicos** - Lista los temas exactos para guías más enfocadas
3. **Resúmenes cortos** - Si subes archivos, prefiere resúmenes sobre documentos largos
4. **Textos claros** - Evita imágenes pixeladas o texto borroso
5. **Repaso activo** - Usa el modo Examen Práctico para practicar

---

## 🚀 Características Futuras Planeadas

- Sincronización en la nube
- Colaboración con compañeros
- Integración con calendario
- Recordatorios de estudio
- Más opciones de exportación

---

## 📝 Licencia

Esta aplicación es de código abierto. Úsala libremente para tus estudios.

---

## 💬 ¿Preguntas o Sugerencias?

Si encuentras problemas o tienes ideas para mejorar Guía10, avísame.

---

**¡Buena suerte con tus estudios! 📚✨**

Guía10 te ayuda a prepararte mejor y más rápido para tus exámenes.
