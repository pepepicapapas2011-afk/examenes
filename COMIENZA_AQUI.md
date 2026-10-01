# 🎉 ¡Bienvenido a Guía10!

Tu aplicación web completa para generar guías de estudio usando IA está lista. Sigue esta guía para empezar.

---

## 📦 ¿Qué Incluye?

Tu Guía10 tiene:
- ✅ Aplicación web moderna y completa
- ✅ 5 modos de estudio diferentes
- ✅ Soporte para PDF, Word, imágenes y texto
- ✅ Generación de contenido con Claude API (IA)
- ✅ Almacenamiento automático de guías
- ✅ Descarga en PDF
- ✅ Modo oscuro automático
- ✅ Completamente responsive

---

## 🚀 Opción 1: Abrir Directamente (La Más Fácil)

### Pasos

1. **Encuentra el archivo `index.html`** en tu carpeta del proyecto
2. **Haz doble clic** para abrir en tu navegador
3. **¡Listo!** Verás la aplicación cargada

### ¿Qué ves?

- La página principal con 2 guías de ejemplo (Biología e Historia)
- Botón **⚙️ Configuración** para agregar tu clave API
- Botón **+ Crear Nueva Guía** para hacer tus propias guías

**Limitación**: Sin clave API, no puedes generar nuevas guías (pero sí ver y estudiar las existentes).

---

## 🖥️ Opción 2: Usar Servidor Node.js (Recomendado para Desarrollo)

### Requisitos
- Tener **Node.js** instalado
  - Descarga desde: https://nodejs.org/

### Pasos

1. **Abre la terminal** en la carpeta del proyecto

2. **Instala las dependencias**:
   ```bash
   npm install
   ```
   (Esto descarga la librería `dotenv`)

3. **Inicia el servidor**:
   ```bash
   npm start
   ```

4. **Abre en tu navegador**:
   - Ve a: `http://localhost:3000`

5. **Detén el servidor** cuando termines:
   - Presiona `Ctrl+C` en la terminal

### Ventajas del Servidor
- ✅ Mejor manejo de archivos
- ✅ Más rápido y estable
- ✅ Puedes usar variables de entorno
- ✅ Menú bonito de inicio

---

## 🔑 Paso Importante: Configurar tu Clave API

Para generar nuevas guías automáticamente, necesitas una **clave API de Claude**.

### Obtener tu Clave (Gratis)

1. Ve a: **https://console.anthropic.com/**
2. Crea una cuenta o inicia sesión
3. Busca "API Keys"
4. Haz clic en **"Create API Key"**
5. **Copia la clave** (comienza con `sk-ant-`)
6. ⚠️ **¡Guárdala en un lugar seguro!**

### Agregar la Clave a Guía10

#### Opción A: En el Navegador (Más Fácil)
1. Abre Guía10 en tu navegador
2. Haz clic en **⚙️ Configuración** (arriba a la derecha)
3. Pega tu clave en el campo
4. Haz clic en **Guardar**
5. **¡Listo!** Ahora puedes generar guías

#### Opción B: En el Servidor (Con Archivo .env)
1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edita el archivo `.env` y agrega:
   ```
   ANTHROPIC_API_KEY=tu-clave-aqui
   ```
3. Guarda e inicia el servidor con `npm start`

### ¿Cuánto Cuesta?

- **Prueba Gratis**: $5 USD en créditos (3 meses)
  - Suficiente para ~1500-2000 guías
- **Después**: ~$0.003 por guía (muy barato)
- Ver precios: https://www.anthropic.com/pricing

---

## 📚 Cómo Usar Guía10

### Ver las Guías de Ejemplo

1. Abre la aplicación (index.html o servidor)
2. Verás 2 guías ya creadas:
   - 📖 Biología - Célula Animal y Vegetal
   - 📖 Historia - Revolución Francesa
3. **Haz clic en cualquiera** para estudiar
4. **Cambia entre modos**: Guía Completa, Rápido, 30 min, Examen, Tarjetas

### Crear Tu Primera Guía Real

1. Haz clic en **+ Crear Nueva Guía**
2. Completa:
   - **Nombre**: Ej: "Matemáticas - Ecuaciones"
   - **Materia**: Ej: "Matemáticas"
   - **Temas**: (opcional) "Ecuaciones lineales, Sistemas"
   - **Fecha del Examen**: (opcional)

3. **Agrega Material**:
   - Sube archivos (PDF, Word, imágenes)
   - O pega tus apuntes directamente
   - Mezcla varios formatos

4. Haz clic en **Generar Guía**
5. ⏳ Espera 10-30 segundos
6. ¡**Tu guía está lista!**

### Estudiar

1. Elige uno de los 5 modos:
   - 📖 **Guía Completa**: Todo detallado
   - ⚡ **Repaso Rápido**: Solo lo esencial
   - ⏱️ **30 Minutos**: Plan de media hora
   - ✍️ **Examen Práctico**: Responde y aprende
   - 🎴 **Tarjetas**: Aprendizaje interactivo

2. En la Guía Completa:
   - Marca cada tema como "Aprendido" o "Necesito repasarlo"
   - Tu progreso se guarda automáticamente

3. Haz clic en **⬇️ Descargar PDF** para guardar tu guía

---

## 📁 Archivos Principales

```
📚 Tu carpeta contiene:

index.html          ← Abre esto en tu navegador
styles.css          (estilos bonitos)
app.js              (lógica de la app)
api.js              (conecta con IA)
utils.js            (utilidades)
demo-data.js        (guías de ejemplo)

README.md           (documentación completa)
QUICK_START.md      (inicio rápido)
CONFIGURACION.md    (cómo configurar API)
ARQUITECTURA.md     (estructura técnica)

server.js           (servidor opcional)
package.json        (configuración NPM)
.env.example        (ejemplo de configuración)
```

---

## ⚡ Atajos Útiles

| Acción | Cómo Hacerlo |
|--------|-------------|
| Crear nueva guía | Botón principal **+ Crear** |
| Configurar API | Botón **⚙️ Configuración** |
| Cambiar tema (claro/oscuro) | Botón **🌙** / **☀️** |
| Estudiar guía | Haz clic en cualquier guía |
| Cambiar modo | Botones en la parte superior |
| Descargar PDF | Botón **⬇️ Descargar PDF** |
| Eliminar guía | Botón **🗑️** en la guía |

---

## 🆘 Si Algo No Funciona

### "No veo las guías de ejemplo"
- Abre la consola (F12) en tu navegador
- En la consola, escribe: `loadDemoData()`
- Recarga la página

### "Error: Clave de API no configurada"
- Necesitas agregar tu clave
- Ve a Configuración y pégala
- O agrega ANTHROPIC_API_KEY al archivo .env

### "El servidor no inicia"
```bash
# Verifica que Node.js está instalado
node --version

# Si no funciona, reinstala Node.js desde:
# https://nodejs.org/
```

### "La generación tarda mucho"
- Es normal, la IA tarda 10-30 segundos
- Ten paciencia, estará lista pronto
- Si tarda más de 1 minuto, hay un problema

### "Error al procesar archivo"
- Intenta pegar el contenido en la caja de texto
- O sube un formato diferente (PDF vs Word)
- Verifica que el archivo no esté corrupto

---

## 🔒 Tu Privacidad

### Importante Saber

✅ **Tus datos son privados**:
- Todas las guías se guardan en tu computadora
- No hay servidor central
- Nadie más puede ver tus apuntes

✅ **Tu clave API es segura**:
- Se guarda solo en tu navegador
- Nunca se envía a servidores externos
- No la publiques nunca

✅ **Puedes usar sin crear cuenta**:
- No hay login
- No hay emails
- No hay datos personales

---

## 📖 Documentación Completa

- **README.md**: Guía detallada de todas las características
- **CONFIGURACION.md**: Cómo configurar la API y resolver problemas
- **ARQUITECTURA.md**: Para programadores que quieran entender el código
- **QUICK_START.md**: Inicio rápido

---

## 🎯 Próximos Pasos

### 1. **Hoy**
- [ ] Abre Guía10
- [ ] Mira las guías de ejemplo
- [ ] Prueba los 5 modos de estudio
- [ ] Descarga una guía en PDF

### 2. **Esta Semana**
- [ ] Obtén tu clave API de Claude
- [ ] Configúrala en Guía10
- [ ] Crea tu primer guía real
- [ ] Estudia con tu guía

### 3. **Próximamente**
- [ ] Crea guías para todos tus cursos
- [ ] Usa para prepararte para exámenes
- [ ] Marca tu progreso
- [ ] ¡Aprueba tus exámenes! 🎓

---

## 💡 Consejos para Mejores Resultados

1. **Material de Calidad**
   - Usa tus mejores apuntes
   - Sé específico con los temas
   - Proporciona contexto

2. **Aprende Activamente**
   - No solo leas, responde las preguntas
   - Usa el modo Examen Práctico
   - Marca lo que no entiendas

3. **Repasa Regularmente**
   - Revisa unos días antes del examen
   - Usa el modo de 30 minutos para repaso rápido
   - Las tarjetas de estudio son perfectas para recordar

4. **Personaliza**
   - Edita las guías si es necesario
   - Cambia el orden de temas
   - Agrega tus propias notas

---

## 🚀 ¿Listo?

### Paso 1: Abre index.html en tu navegador

**¡Ya tienes todo lo que necesitas!**

Si tienes dudas, lee el README.md o CONFIGURACION.md.

---

## 📞 ¿Preguntas?

- Revisa **README.md** para ayuda general
- Mira **CONFIGURACION.md** para problemas con la API
- Consulta **ARQUITECTURA.md** si quieres entender el código

---

## 🎓 ¡Buena Suerte!

Guía10 está diseñada para ayudarte a estudiar mejor y más eficientemente.

**Tu éxito en los exámenes depende de tu dedicación.** 

Usa Guía10 como tu herramienta de apoyo y verás resultados.

---

**¡A estudiar! 📚✨**

**Hecho con ❤️ para estudiantes como tú.**
