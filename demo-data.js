/**
 * Datos de demostración para Guía10
 * Este archivo contiene ejemplos de guías pre-generadas
 * Ejecuta loadDemoData() para cargarlas en localStorage
 */

const DEMO_GUIDES = [
    {
        id: 'demo-1',
        name: 'Biología - Célula Animal y Vegetal',
        subject: 'Biología',
        topics: ['Estructura celular', 'Organelos', 'Funciones vitales', 'Mitocondria', 'Cloroplasto'],
        examDate: '2024-10-15',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        materials: [
            { filename: 'Apuntes de clase', type: 'Texto' },
            { filename: 'Libro de biología.pdf', type: 'PDF' }
        ],
        progress: {
            'Estructura celular': { learned: true, date: new Date().toISOString() },
            'Organelos': { learned: true, date: new Date().toISOString() },
            'Funciones vitales': { learned: false },
            'Mitocondria': { learned: false },
            'Cloroplasto': { learned: false }
        },
        content: {
            mode: 'complete',
            rawContent: `# Célula Animal y Vegetal

## 1. Estructura Celular

### Definición
La célula es la unidad más pequeña de vida. Todos los organismos vivos están compuestos por células.

### Tipos de Células
- **Célula Procariota**: Sin núcleo (bacterias)
- **Célula Eucariota**: Con núcleo (animales y plantas)

## 2. Componentes Principales

### Membrana Celular
La membrana plasmática controla el paso de sustancias dentro y fuera de la célula.

**Funciones**:
- Proteger el contenido celular
- Regular el intercambio de sustancias
- Permitir la comunicación celular

**Ejemplo cotidiano**: Como la piel de un globo que mantiene el aire adentro.

### Núcleo
Contiene el ADN y controla todas las funciones celulares.

**Características**:
- Contiene el material genético (ADN)
- Presente en células eucariotas
- Ausente en glóbulos rojos maduros

### Citoplasma
Es la sustancia que rellena la célula entre el núcleo y la membrana.

**Función**: Medio donde ocurren la mayoría de procesos metabólicos.

## 3. Organelos Celulares

### Mitocondria
- **Función**: Producir energía (ATP) mediante respiración celular
- **Forma**: Alargada, con crestas internas
- **Característica**: Tiene su propio ADN
- **Ejemplo**: Como la "planta eléctrica" de la célula

### Cloroplasto (solo en plantas)
- **Función**: Realizar fotosíntesis para producir glucosa
- **Color**: Verde (por la clorofila)
- **Ubicación**: En células vegetales
- **Proceso**: Convierte luz solar en energía química

### Retículo Endoplasmático
**Liso (SER)**:
- Síntesis de lípidos
- Detoxificación

**Rugoso (RER)**:
- Síntesis de proteínas
- Tiene ribosomas adheridos

### Aparato de Golgi
- **Función**: Modificar, empacar y enviar proteínas
- **Forma**: Cisternas apiladas
- **Ubicación**: Cerca del núcleo

### Ribosomas
- **Función**: Síntesis de proteínas
- **Ubicación**: Libres en el citoplasma o adheridos al RER
- **Tamaño**: Los más pequeños de los organelos

### Vacuolas
**En plantas**:
- Grandes (80% del volumen)
- Mantienen rigidez
- Almacenan agua y nutrientes

**En animales**:
- Pequeñas
- Función de almacenamiento

## 4. Diferencias Entre Célula Animal y Vegetal

| Característica | Célula Animal | Célula Vegetal |
|---|---|---|
| Pared celular | No | Sí (celulosa) |
| Cloroplastos | No | Sí |
| Vacuola | Pequeña | Grande |
| Forma | Redondeada | Rectangular |
| Centríolos | Sí | No |

## 5. Procedimiento: Observar una Célula al Microscopio

1. **Preparar la muestra**:
   - Obtener una célula (bucal o epidermis de cebolla)
   - Colocar en un portaobjetos
   - Añadir una gota de agua o colorante

2. **Teñir (opcional)**:
   - Usar azul de metileno
   - Dejar actuar 30 segundos
   - Enjuagar con agua

3. **Cubrir**:
   - Colocar cubreobjetos
   - Evitar burbujas

4. **Observar**:
   - Usar primero el objetivo de menor aumento
   - Luego aumentar paulatinamente
   - Localizar el núcleo

## 6. Preguntas de Autoevaluación

**P1: ¿Cuál es la función principal de la mitocondria?**
R: Producir energía (ATP) para las funciones celulares.

**P2: ¿Qué organelo tienen las plantas que no tienen los animales?**
R: Los cloroplastos, que realizan la fotosíntesis.

**P3: ¿Cuál es la función de la membrana plasmática?**
R: Controlar el paso de sustancias y proteger el contenido celular.

**P4: ¿En qué se diferencia una célula procariota de una eucariota?**
R: Las procariotas no tienen núcleo, mientras que las eucariotas sí.

**P5: ¿Por qué la vacuola es más grande en plantas?**
R: Porque almacena agua y mantiene la turgencia (rigidez) de la planta.

## 7. Errores Comunes

❌ **"El citoplasma es solo agua"**
✓ Correcto: Es una solución compleja con proteínas, minerales y organelos

❌ **"Todas las células tienen la misma forma"**
✓ Correcto: La forma varía según la función (esféricas, alargadas, ramificadas)

❌ **"Los cloroplastos están en todas las células de la planta"**
✓ Correcto: Solo están en células fotosintéticas (hojas principalmente)

❌ **"La mitocondria solo existe en animales"**
✓ Correcto: También existen en plantas (para respiración celular)

## 8. Puntos Clave para Recordar

⭐ **La célula es la unidad de vida**

⭐ **Todo organelo tiene una función específica**

⭐ **Mitocondria = energía; Cloroplasto = alimento (luz)**

⭐ **Membrana = frontera; Núcleo = control; Citoplasma = medio**

⭐ **Las plantas tienen pared celular, vacuola grande y cloroplastos**

⭐ **Los animales tienen centríolos y vacuolas pequeñas**
`,
            html: `<div class="content-section">
<h3>Célula Animal y Vegetal</h3>
<p class="content-text">Contenido de demostración - Esta es una guía de ejemplo para mostrar cómo funciona Guía10.</p>
</div>`
        }
    },
    {
        id: 'demo-2',
        name: 'Historia - Revolución Francesa',
        subject: 'Historia',
        topics: ['Causas', 'Etapas', 'Personajes importantes', 'Consecuencias', 'Legado'],
        examDate: '2024-10-20',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
        materials: [
            { filename: 'Apuntes historia.txt', type: 'Texto' }
        ],
        progress: {
            'Causas': { learned: false },
            'Etapas': { learned: false },
            'Personajes importantes': { learned: false },
            'Consecuencias': { learned: false },
            'Legado': { learned: false }
        },
        content: {
            mode: 'complete',
            rawContent: `# Revolución Francesa (1789-1799)

## Causas de la Revolución

### Crisis Financiera
- Luis XVI gastó mucho dinero en guerras
- La corte real vivía de manera lujosa
- El pueblo pagaba muchos impuestos

### Desigualdad Social
- Sociedad dividida en 3 Estados:
  1. Clero (1-2%)
  2. Nobleza (2-3%)
  3. Pueblo/Tercer Estado (95%)

### Ideas de la Ilustración
- Filósofos como Voltaire y Rousseau
- Derechos humanos
- Libertad e igualdad

### Hambre y Miseria
- Malas cosechas
- Precios muy altos
- Desempleo

## Etapas de la Revolución

### 1. Monarquía Constitucional (1789-1792)
- 14 de julio: Toma de la Bastilla
- Asamblea Constituyente
- Eliminación de feudalismo
- Declaración de Derechos del Hombre

### 2. Período Republicano (1792-1799)
- Proclamación de la República
- Ejecución de Luis XVI (1793)
- El Terror: Robespierre
- Muerte de la reina María Antonieta

### 3. Directorio (1795-1799)
- Gobierno débil
- Corrupción
- Sube Napoleón al poder

## Personajes Importantes

**Luis XVI**: Rey de Francia
- Débil político
- Ejecutado en 1793

**María Antonieta**: Reina
- Considerada extranjera (austriaca)
- Símbolo de lujo
- Ejecutada en 1793

**Robespierre**: Revolucionario radical
- Lideró el Reinado del Terror
- Ejecutado en 1794

**Napoleón Bonaparte**: General militar
- Tomó el poder en 1799
- Futuro emperador

**Voltaire y Rousseau**: Filósofos
- Inspiraron las ideas revolucionarias

## Consecuencias Inmediatas

✓ Fin de la monarquía absoluta
✓ Abolición de la nobleza y feudalismo
✓ Igualdad ante la ley
✓ Secularización (separación iglesia-estado)
✓ Pérdida de poder de la Iglesia

## Legado Duradero

📚 **Ideas**: Libertad, Igualdad, Fraternidad
⚖️ **Derechos**: Derechos Humanos universales
🏛️ **Gobierno**: Repúblicas democráticas
📜 **Leyes**: Códigos legales modernos
🌍 **Influencia**: Inspiró revoluciones en América Latina

## Puntos Clave

⭐ Cambió la historia mundial
⭐ Inspiró otros movimientos revolucionarios
⭐ Estableció principios democráticos modernos
⭐ Transitó de una monarquía absoluta a república
`,
            html: `<div class="content-text">Guía de demostración sobre la Revolución Francesa</div>`
        }
    }
];

function loadDemoData() {
    try {
        const existing = StorageManager.getAllGuides();

        // Evitar duplicados
        const demoIds = DEMO_GUIDES.map(g => g.id);
        const filtered = existing.filter(g => !demoIds.includes(g.id));

        // Combinar y guardar
        const allGuides = [...filtered, ...DEMO_GUIDES];
        localStorage.setItem(StorageManager.KEY, JSON.stringify(allGuides));

        console.log('✅ Datos de demostración cargados');
        return true;
    } catch (error) {
        console.error('❌ Error al cargar datos de demostración:', error);
        return false;
    }
}

// Auto-cargar datos de demostración si está en localhost
function autoLoadDemoIfNeeded() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const hasGuides = StorageManager.getAllGuides().length > 0;
        if (!hasGuides) {
            console.log('📚 Cargando datos de demostración...');
            loadDemoData();
        }
    }
}

// Ejecutar cuando esté listo
document.addEventListener('DOMContentLoaded', autoLoadDemoIfNeeded);
