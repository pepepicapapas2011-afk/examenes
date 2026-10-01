# ⚙️ Configuración de Guía10

Este documento explica qué configuración necesita Guía10 para funcionar completamente.

## 🎯 Lo Básico (Funciona Sin Configuración)

La aplicación funciona sin configuración:
- ✅ Ver y estudiar guías guardadas
- ✅ Crear nuevas guías (pero sin generar contenido IA)
- ✅ Descargar guías en PDF
- ✅ Marcar progreso

**Limitación**: No puede generar nuevas guías sin API.

---

## 🔑 Configuración Requerida para Generar Guías

### Paso 1: Obtener tu Clave API de Claude

1. Ve a: https://console.anthropic.com/
2. Crea una cuenta o inicia sesión
3. Ve a la sección "API Keys"
4. Haz clic en "Create API Key"
5. Copia la clave (comienza con `sk-ant-`)
6. ⚠️ **Guárdala en un lugar seguro** (nunca la compartas)

### Paso 2: Configurar Guía10

**Opción A: Configuración en el Navegador (Recomendado)**

1. Abre Guía10 en tu navegador
2. Haz clic en **⚙️ Configuración** (arriba a la derecha)
3. Pega tu clave API
4. Haz clic en **Guardar**
5. ¡Listo! Ahora puedes generar guías

**Tu clave se guarda solo en tu navegador, nunca se envía a servidores externos.**

**Opción B: Configuración del Servidor (Node.js)**

Si usas el servidor Node.js:

1. Copia `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita `.env` y agrega:
   ```
   ANTHROPIC_API_KEY=tu-clave-aqui
   ```

3. Inicia el servidor:
   ```bash
   npm start
   ```

---

## 💰 Costos de la API

### Prueba Gratuita
- Crédito inicial: **$5 USD**
- Válido por 3 meses
- Suficiente para ~1500-2000 guías

### Después de los Créditos
- **Precios**: ~$0.003 por guía típica (muy barato)
- Ver detalles: https://www.anthropic.com/pricing

### Monitoreo de Uso
1. Ve a: https://console.anthropic.com/
2. Busca "Usage" o "Billing"
3. Verás cuánto has gastado
4. Puedes establecer límites de gasto

---

## ⚠️ Seguridad y Privacidad

### ✅ Lo que Guía10 NO hace
- ❌ No guarda tu clave API en servidores
- ❌ No ve tu contenido educativo
- ❌ No rastrea tu actividad
- ❌ No requiere crear cuenta

### ✅ Lo que SÍ ocurre
- Tus apuntes se envían a Claude API para procesarlos
- Claude API genera el contenido automáticamente
- Luego se elimina de los servidores de Anthropic
- Puedes ver la política de privacidad de Anthropic: https://www.anthropic.com/privacy

### 🔒 Proteger tu Clave
- ❌ Nunca compartas tu clave con nadie
- ❌ No la publiques en Internet
- ❌ No la incluyas en git o GitHub
- ✅ Sí puedes regenerarla si alguien la ve
- ✅ Sí puedes desactivarla en cualquier momento

---

## 🚀 Configuración Avanzada

### Cambiar el Modelo de IA

En `api.js`, línea 3:
```javascript
static MODEL = 'claude-3-5-sonnet-20241022';
```

Modelos disponibles:
- `claude-opus-4-1` - Más potente, más lento
- `claude-sonnet-3-5` - Equilibrado (recomendado)
- `claude-haiku-3` - Más rápido, menos potente

### Personalizar Prompts

En `api.js`, función `buildPrompt()` puedes:
- Cambiar el nivel de dificultad
- Ajustar el formato de salida
- Personalizar las instrucciones para la IA

### Variables de Entorno

Si usas el servidor `.env`:

```bash
# API
ANTHROPIC_API_KEY=sk-ant-xxx

# Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

---

## 🆘 Solucionar Problemas

### Error: "Clave de API no configurada"
**Solución**: Abre Configuración (⚙️) y agrega tu clave.

### Error: "API key invalid"
**Solución**: 
- Copia la clave exacta de la consola
- Verifica que no tengas espacios
- Regenera la clave si es necesario

### Error: "Debes ser un usuario verificado"
**Solución**: Tu cuenta en Anthropic necesita verificación por email.

### La generación tarda mucho
**Solución**: Normal, la IA tarda 10-30 segundos. Ten paciencia.

### "No se pudo conectar a la API"
**Solución**:
- Verifica tu conexión a Internet
- Prueba accediendo a https://api.anthropic.com
- Si es proxy corporativo, configúralo en tu navegador

---

## 📚 Documentación Adicional

- **README.md**: Guía completa de uso
- **QUICK_START.md**: Inicio rápido
- **API de Claude**: https://docs.anthropic.com/
- **Precios**: https://www.anthropic.com/pricing

---

## ✅ Checklist de Configuración

- [ ] He creado una cuenta en Anthropic
- [ ] Tengo mi clave API (comienza con sk-ant-)
- [ ] He agregado la clave en Guía10 (Configuración)
- [ ] He probado generar una guía
- [ ] Entiendo que pago solo por lo que uso
- [ ] He guardado mi clave en un lugar seguro

---

**¡Tu Guía10 está lista para generar guías! 🚀📚**
