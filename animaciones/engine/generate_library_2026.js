const fs = require('fs');
const path = require('path');

const topics1_5 = require('./data_topics_1_5');
const topics6_10 = require('./data_topics_6_10');
const topics11_15 = require('./data_topics_11_15');
const topics16_20 = require('./data_topics_16_20');

const allTopics = [...topics1_5, ...topics6_10, ...topics11_15, ...topics16_20];
const baseOutputDir = path.resolve('animaciones/manifests/biblioteca_2026');

function formatSeconds(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  const ms = Math.floor((sec % 1) * 10);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${ms}`;
}

function generateMarkdownScript(topic, variation, varKey) {
  const isVarA = varKey === 'varA';
  const varLetter = isVarA ? 'A' : 'B';
  const varSuffix = isVarA ? 'TÉCNICO / ARQUITECTURA' : 'POLÉMICO / PRAGMATISMO';
  
  let currentSec = 0;
  const sceneRows = [];
  let totalWords = 0;

  variation.scenes.forEach((sc, i) => {
    const dur = sc.duration || 5.0;
    const startStr = formatSeconds(currentSec);
    const endStr = formatSeconds(currentSec + dur);
    const words = sc.voiceover ? sc.voiceover.split(/\s+/).filter(Boolean).length : 0;
    totalWords += words;

    sceneRows.push({
      index: i + 1,
      id: sc.id,
      range: `[${startStr} - ${endStr}]`,
      duration: `${dur.toFixed(1)}s`,
      component: sc.type,
      visual_cue: sc.visual_cue || '',
      voiceover: sc.voiceover || '(Sin locución)',
      words
    });

    currentSec += dur;
  });

  const totalDuration = currentSec;
  const wpm = Math.round((totalWords / (totalDuration / 60)));

  return `# Guion de Grabación: ${variation.title}
> **Tema #${topic.slug.slice(0, 2)}:** ${topic.slug}  
> **Variación ${varLetter} (${varSuffix})**  
> **Categoría:** ${topic.category}  
> **Tono:** ${variation.tone}  
> **Duración total:** ${totalDuration.toFixed(1)}s | **Palabras:** ${totalWords} palabras (~${wpm} palabras/minuto)

---

## 1. Desglose Escena por Escena (Teleprónter & Visual Cues)

| # | Tiempo | Componente Visual | Visual Cue (Acción en Pantalla) | Locución del Teleprónter | Palabras |
|---|---|---|---|---|---|
${sceneRows.map(r => `| **${r.index}** | \`${r.range}\` (${r.duration}) | \`${r.component}\` | ${r.visual_cue} | "${r.voiceover}" | ${r.words} |`).join('\n')}

---

## 2. Texto Continuo para Teleprónter (Lectura Fluida)

\`\`\`text
${variation.scenes.map(s => s.voiceover).filter(Boolean).join('\n\n')}
\`\`\`

---

## 3. Remate & CTA Asignado
- **Objetivo de Negocio:** Posicionamiento y captación de clientes cualificados.
- **Tipo de Oferta:** ${topic.ctaType}
- **Última Escena (CTA Leve):** 
  > *"${variation.scenes[variation.scenes.length - 1].voiceover}"*
`;
}

function buildManifest(topic, variation, varKey) {
  const isVarA = varKey === 'varA';
  const varLetter = isVarA ? 'A' : 'B';

  return {
    title: `[${topic.slug.slice(0, 2)}] ${variation.title} (Var ${varLetter})`,
    category: topic.category,
    slug: topic.slug,
    variation: varLetter,
    fps: 30,
    scenes: variation.scenes
  };
}

console.log(`\n======================================================`);
console.log(`📦 GENERADOR DE LA BIBLIOTECA DE VÍDEOS SEDEV 2026`);
console.log(`======================================================`);
console.log(`Procesando ${allTopics.length} temáticas (40 vídeos en total)...\n`);

if (!fs.existsSync(baseOutputDir)) {
  fs.mkdirSync(baseOutputDir, { recursive: true });
}

const summaryTable = [];

allTopics.forEach((topic, idx) => {
  const topicDir = path.join(baseOutputDir, topic.slug);
  if (!fs.existsSync(topicDir)) {
    fs.mkdirSync(topicDir, { recursive: true });
  }

  // 1. Variation A
  const scriptA = generateMarkdownScript(topic, topic.varA, 'varA');
  const manifestA = buildManifest(topic, topic.varA, 'varA');
  fs.writeFileSync(path.join(topicDir, 'guion_var_a_tecnico.md'), scriptA, 'utf8');
  fs.writeFileSync(path.join(topicDir, 'manifest_var_a.json'), JSON.stringify(manifestA, null, 2), 'utf8');
  fs.writeFileSync(path.join(topicDir, 'manifest_var_a.js'), `window.__DEFAULT_MANIFEST__ = ${JSON.stringify(manifestA, null, 2)};\n`, 'utf8');

  // 2. Variation B
  const scriptB = generateMarkdownScript(topic, topic.varB, 'varB');
  const manifestB = buildManifest(topic, topic.varB, 'varB');
  fs.writeFileSync(path.join(topicDir, 'guion_var_b_polemico.md'), scriptB, 'utf8');
  fs.writeFileSync(path.join(topicDir, 'manifest_var_b.json'), JSON.stringify(manifestB, null, 2), 'utf8');
  fs.writeFileSync(path.join(topicDir, 'manifest_var_b.js'), `window.__DEFAULT_MANIFEST__ = ${JSON.stringify(manifestB, null, 2)};\n`, 'utf8');

  console.log(`✔ [${idx + 1}/20] Carpeta creada: ${topic.slug}`);
  console.log(`   ├── Var A: "${topic.varA.title}"`);
  console.log(`   └── Var B: "${topic.varB.title}"`);

  summaryTable.push({
    num: topic.slug.slice(0, 2),
    slug: topic.slug,
    titleA: topic.varA.title,
    titleB: topic.varB.title,
    cta: topic.ctaType
  });
});

// Generate Master README for the library
const readmeContent = `# Biblioteca SeDev 2026: 20 Temas en Tendencia (40 Vídeos)

Este directorio contiene los **20 temas de ingeniería de software en tendencia (octubre 2026)** preparados para producción, con 2 variaciones completas cada uno (40 vídeos en total).

Cada carpeta contiene:
- \`guion_var_a_tecnico.md\`: Guion escena a escena y texto continuo de teleprónter para la variación técnica.
- \`guion_var_b_polemico.md\`: Guion para la variación polémica/pragmática.
- \`manifest_var_a.json\` / \`manifest_var_a.js\`: Manifiesto reproducible en el player y motor de renderizado.
- \`manifest_var_b.json\` / \`manifest_var_b.js\`: Manifiesto alternativo.

---

## Índice Completo de Temáticas

| # | Slug / Carpeta | Variación A (Enfoque Técnico) | Variación B (Enfoque Polémico) | CTA Leve |
|---|---|---|---|---|
${summaryTable.map(s => `| **${s.num}** | [\`${s.slug}\`](./${s.slug}/) | ${s.titleA} | ${s.titleB} | \`${s.cta}\` |`).join('\n')}

---

## ¿Cómo Previsualizar en el Player?

1. Abre \`animaciones/player.html\` en tu navegador Chrome (doble clic directo).
2. Haz clic en el botón superior **\`[📂 Cargar otro JSON]\`**.
3. Selecciona cualquier archivo \`manifest_var_a.json\` o \`manifest_var_b.json\` de esta biblioteca.
4. Verás las escenas, gráficos interactivos y el teleprónter sincronizado en tiempo real.
`;

fs.writeFileSync(path.join(baseOutputDir, 'README.md'), readmeContent, 'utf8');

console.log(`\n🎉 Generación completada con éxito.`);
console.log(`📄 Índice maestro escrito en: ${path.join(baseOutputDir, 'README.md')}\n`);
