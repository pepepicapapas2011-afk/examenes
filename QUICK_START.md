# 🚀 Guía10 - Inicio Rápido

## Opción 1: Abrir directamente en el navegador (Sin servidor)

1. Haz clic en el archivo `index.html`
2. ¡La aplicación está lista para usar!

**Nota**: Puedes ver 2 guías de ejemplo (Biología e Historia) que se cargan automáticamente.

---

## Opción 2: Ejecutar con servidor Node.js (Recomendado)

### Requisitos
- Node.js instalado en tu computadora
  - Descarga desde: https://nodejs.org/

### Pasos

1. **Abre la terminal** en la carpeta del proyecto

2. **Instala dependencias** (primera vez):
   ```bash
   npm install
   ```

3. **Inicia el servidor**:
   ```bash
   npm start
   ```

4. **Abre tu navegador**:
   - Ve a: `http://localhost:3000`

5. **Detén el servidor**:
   - Presiona `Ctrl+C` en la terminal

---

## Próximos Pasos

### 1️⃣ Ver las guías de ejemplo
- En la pantalla principal verás 2 guías de demostración
- Haz clic en cualquiera para estudiar

### 2️⃣ Configurar tu clave API (para generar nuevas guías)
- Haz clic en **⚙️ Configuración**
- Obtén una clave en: https://console.anthropic.com/
- Pega tu clave y guarda

### 3️⃣ Crear tu primera guía real
- Haz clic en **+ Crear Nueva Guía**
- Completa la información
- Sube tus apuntes o pega texto
- ¡Genera tu guía!

---

## ⚡ Atajos Útiles

| Acción | Tecla |
|--------|-------|
| Cambiar tema (claro/oscuro) | Haz clic en 🌙 o ☀️ |
| Abrir configuración | Haz clic en ⚙️ |
| Crear guía | Botón principal |

---

## 🆘 Problemas Comunes

### "No puedo generar guías"
→ Necesitas configurar tu clave de API. Ve a Configuración.

### "Las guías de ejemplo no aparecen"
→ Abre la consola (F12) y ejecuta: `loadDemoData()`

### "El servidor no inicia"
```bash
# Verifica que Node.js esté instalado
node --version

# Si no está, instálalo de https://nodejs.org/
```

### "Puerto 3000 en uso"
```bash
# Cambia el puerto con:
PORT=3001 npm start
```

---

## 📚 Información Importante

### Tu privacidad
- ✅ Todas las guías se guardan **en tu computadora**
- ✅ No se almacenan en servidores externos
- ✅ Solo se conecta a Claude API para generar contenido

### Formatos soportados
- 📄 PDF
- 📋 Word (.doc, .docx)
- 🖼️ Imágenes (PNG, JPG, GIF)
- 📝 Texto (.txt)
- ✍️ Copiar y pegar directamente

---

## 🎯 Consejos para Mejores Resultados

1. **Material de calidad** → Usa tus mejores apuntes
2. **Temas específicos** → Lista los temas exactos
3. **Textos claros** → Evita archivos muy largos o borrosos
4. **Repaso activo** → Usa el modo Examen Práctico

---

## 📖 Más Información

Lee `README.md` para documentación completa.

---

## ¿Necesitas ayuda?

- Lee el README.md
- Prueba con las guías de ejemplo
- Verifica la consola del navegador (F12) para errores

---

**¡Listo! Ahora puedes empezar a estudiar. 📚✨**
