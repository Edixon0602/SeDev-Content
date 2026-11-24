// Automatic image & brand logo resolver with zero API keys required.
// Sources:
//   - brand_logos: SimpleIcons CDN (https://cdn.simpleicons.org/<slug>/<color>)
//   - web_search:  Openverse API & Wikimedia Commons API
//   - ai_flux:     Pollinations Flux (https://image.pollinations.ai/prompt/...)
// Every external fetch enforces a 6s timeout and strict byte/header validation.
// When offline or SEDEV_FORCE_OFFLINE=1, deterministic local SVG editorial assets
// are synthesized immediately so the pipeline never stalls or fails.

const fs = require('fs');
const path = require('path');
const { ensureDir, sha256, PROJECT_ROOT } = require('./utils');

const DEFAULT_IMAGE_CACHE = path.join(PROJECT_ROOT, 'animaciones', 'editor', '.cache', 'images');
const REQUEST_TIMEOUT_MS = 6000;

const BRAND_META = {
  salesforce: { name: 'Salesforce', color: '00A1E0', abbr: 'SF' },
  hubspot: { name: 'HubSpot', color: 'FF7A59', abbr: 'HS' },
  notion: { name: 'Notion', color: 'F2EDE4', abbr: 'N' },
  slack: { name: 'Slack', color: '36C5F0', abbr: 'SL' },
  stripe: { name: 'Stripe', color: '635BFF', abbr: 'ST' },
  zendesk: { name: 'Zendesk', color: 'F2EDE4', abbr: 'ZD' },
  openai: { name: 'OpenAI', color: '10A37F', abbr: 'OA' },
  anthropic: { name: 'Anthropic', color: 'D97757', abbr: 'AN' },
  cursor: { name: 'Cursor', color: '38BDF8', abbr: 'CU' },
  githubcopilot: { name: 'Copilot', color: '818CF8', abbr: 'CP' },
  typescript: { name: 'TypeScript', color: '3178C6', abbr: 'TS' },
  docker: { name: 'Docker', color: '2496ED', abbr: 'DK' },
  postgresql: { name: 'PostgreSQL', color: '4169E1', abbr: 'PG' },
  react: { name: 'React', color: '61DAFB', abbr: 'RE' },
  redis: { name: 'Redis', color: 'FF4438', abbr: 'RD' },
  python: { name: 'Python', color: '3776AB', abbr: 'PY' },
  cloudflare: { name: 'Cloudflare', color: 'F38020', abbr: 'CF' },
  vercel: { name: 'Vercel', color: 'F2EDE4', abbr: 'VC' },
  php: { name: 'PHP', color: '777BB4', abbr: 'PHP' },
  supabase: { name: 'Supabase', color: '3ECF8E', abbr: 'SB' },
  gitlab: { name: 'GitLab', color: 'FC6D26', abbr: 'GL' },
  nvidia: { name: 'Nvidia', color: '76B900', abbr: 'NV' },
  amd: { name: 'AMD', color: 'ED1C24', abbr: 'AMD' }
};

const ENTITY_LOGO_GROUPS = [
  { pattern: /\b(anthropic|nvidia|amd|nasdaq|bolsa|ipo)\b/i, logos: ['anthropic', 'nvidia', 'amd', 'openai'] },
  { pattern: /\b(php|tls|https|file_get_contents|fopen)\b/i, logos: ['php', 'cloudflare', 'docker', 'postgresql'] },
  { pattern: /\b(supabase|lovable|rls|row level)\b/i, logos: ['supabase', 'postgresql', 'vercel', 'react'] },
  { pattern: /\b(gitlab|pg_dump|pg_restore|replica|db1|db2)\b/i, logos: ['gitlab', 'postgresql', 'docker', 'redis'] },
  { pattern: /\b(valkey|redis|skiplist|leaderboard|sorted set)\b/i, logos: ['redis', 'postgresql', 'docker', 'cloudflare'] },
  { pattern: /\b(saas|software como servicio|crm|erp|enterprise)\b/i, logos: ['salesforce', 'hubspot', 'notion', 'slack', 'stripe', 'zendesk'] },
  { pattern: /\b(agente|agentes|ia|ai|llm|inteligencia artificial)\b/i, logos: ['openai', 'anthropic', 'cursor', 'githubcopilot'] },
  { pattern: /\b(custom software|a medida|codigo|código|desarrollo|arquitectura|backend|stack)\b/i, logos: ['typescript', 'docker', 'postgresql', 'react'] },
  { pattern: /\b(base de datos|datos|almacenamiento|cache|caché)\b/i, logos: ['postgresql', 'redis', 'docker'] }
];

function isForceOffline(options = {}) {
  return Boolean(options.forceOffline || process.env.SEDEV_FORCE_OFFLINE === '1');
}

function normalizeBrandSlug(slug) {
  return String(slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function resolveEntityLogos(text, max = 4) {
  const raw = String(text || '');
  for (const group of ENTITY_LOGO_GROUPS) {
    if (group.pattern.test(raw)) {
      return group.logos.slice(0, max);
    }
  }
  return ['typescript', 'docker', 'postgresql', 'react'].slice(0, max);
}

function detectImageFormat(buffer, contentType = '') {
  if (!Buffer.isBuffer(buffer) || buffer.length < 16) return null;
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return { ext: '.png', mimeType: 'image/png' };
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return { ext: '.jpg', mimeType: 'image/jpeg' };
  }
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return { ext: '.webp', mimeType: 'image/webp' };
  }
  const head = buffer.slice(0, Math.min(buffer.length, 512)).toString('utf8').trim().toLowerCase();
  if ((head.startsWith('<svg') || (head.startsWith('<?xml') && head.includes('<svg'))) && !head.includes('<html')) {
    if (buffer.toString('utf8').includes('</svg>')) {
      return { ext: '.svg', mimeType: 'image/svg+xml' };
    }
  }
  if (contentType && /svg/i.test(contentType) && head.includes('<svg') && !head.includes('<html')) {
    return { ext: '.svg', mimeType: 'image/svg+xml' };
  }
  return null;
}

function toDataUri(buffer, mimeType) {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

function makeOfflineBrandLogoSvg(slug) {
  const key = normalizeBrandSlug(slug);
  const meta = BRAND_META[key] || {
    name: String(slug || 'TECH').slice(0, 14),
    color: 'd08a5a',
    abbr: String(slug || 'T').slice(0, 2).toUpperCase()
  };
  const hex = `#${meta.color.replace(/^#/, '')}`;
  let inner = '';
  if (key === 'salesforce') {
    inner = `
      <path d="M32 76 H84 C94 76 100 68 100 59 C100 50 93 43 84 43 C81 30 70 22 57 22 C44 22 33 30 30 42 C22 43 17 50 17 58 C17 68 23 76 32 76 Z" fill="#00A1E0"/>
      <text x="58" y="61" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="22" font-weight="900" fill="#09090b" text-anchor="middle">CRM</text>
    `;
  } else if (key === 'slack') {
    inner = `
      <rect x="24" y="47" width="28" height="12" rx="6" fill="#36C5F0"/>
      <rect x="47" y="24" width="12" height="28" rx="6" fill="#2EB67D"/>
      <rect x="68" y="47" width="28" height="12" rx="6" fill="#ECB22E"/>
      <rect x="47" y="68" width="12" height="28" rx="6" fill="#E01E5A"/>
      <circle cx="38" cy="34" r="6" fill="#36C5F0"/>
      <circle cx="82" cy="34" r="6" fill="#2EB67D"/>
      <circle cx="82" cy="82" r="6" fill="#ECB22E"/>
      <circle cx="38" cy="82" r="6" fill="#E01E5A"/>
    `;
  } else if (key === 'typescript') {
    inner = `
      <rect x="18" y="18" width="84" height="84" rx="14" fill="#3178C6"/>
      <text x="72" y="86" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="40" font-weight="900" fill="#ffffff" text-anchor="middle">TS</text>
    `;
  } else if (key === 'openai') {
    inner = `
      <circle cx="60" cy="60" r="34" fill="none" stroke="#10A37F" stroke-width="7" stroke-dasharray="18 8"/>
      <circle cx="60" cy="60" r="14" fill="none" stroke="#10A37F" stroke-width="5"/>
    `;
  } else if (key === 'anthropic') {
    inner = `
      <path d="M40 86 L56 32 H66 L82 86 H71 L67 72 H51 L47 86 Z M53 63 H65 L59 42 Z" fill="#D97757"/>
    `;
  } else {
    inner = `
      <circle cx="60" cy="60" r="34" fill="${hex}" fill-opacity="0.18" stroke="${hex}" stroke-width="3.5"/>
      <text x="60" y="69" font-family="Plus Jakarta Sans, Arial, sans-serif" font-size="30" font-weight="800" fill="${hex}" text-anchor="middle">${meta.abbr}</text>
    `;
  }
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">',
    '  <rect x="6" y="6" width="108" height="108" rx="22" fill="#18181b" stroke="#27272a" stroke-width="3"/>',
    inner,
    '</svg>'
  ].join('\n');
  return {
    slug: key,
    name: meta.name,
    color: hex,
    buffer: Buffer.from(svg, 'utf8'),
    ext: '.svg',
    mimeType: 'image/svg+xml'
  };
}

function makeOfflineEditorialIllustrationSvg(query, options = {}) {
  const q = String(query || 'SeDev Engineering').trim();
  const hashHex = sha256(q);
  const seed = parseInt(hashHex.slice(0, 8), 16) || 1;
  const accent = options.accent || '#d08a5a';
  const lower = q.toLowerCase();

  let motif = '';
  if (/decline|merma|drop|down|caida|caída|menos|saas/.test(lower)) {
    motif = `
      <polyline points="90,150 220,175 340,215 470,295 620,385 710,430" fill="none" stroke="#ef4444" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <polygon points="710,430 675,425 696,392" fill="#ef4444"/>
      <circle cx="220" cy="175" r="9" fill="#f2ede4"/>
      <circle cx="470" cy="295" r="9" fill="#f2ede4"/>
      <circle cx="710" cy="430" r="12" fill="#ef4444"/>
    `;
  } else if (/agent|agente|ai|ia|neural|autonomous/.test(lower)) {
    motif = `
      <circle cx="400" cy="290" r="130" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="14 10"/>
      <line x1="210" y1="180" x2="400" y2="290" stroke="#38bdf8" stroke-width="4"/>
      <line x1="590" y1="180" x2="400" y2="290" stroke="#10b981" stroke-width="4"/>
      <line x1="210" y1="400" x2="400" y2="290" stroke="#a855f7" stroke-width="4"/>
      <line x1="590" y1="400" x2="400" y2="290" stroke="${accent}" stroke-width="4"/>
      <circle cx="210" cy="180" r="24" fill="#18181b" stroke="#38bdf8" stroke-width="4"/>
      <circle cx="590" cy="180" r="24" fill="#18181b" stroke="#10b981" stroke-width="4"/>
      <circle cx="210" cy="400" r="24" fill="#18181b" stroke="#a855f7" stroke-width="4"/>
      <circle cx="590" cy="400" r="24" fill="#18181b" stroke="${accent}" stroke-width="4"/>
      <circle cx="400" cy="290" r="46" fill="#18181b" stroke="${accent}" stroke-width="6"/>
      <circle cx="400" cy="290" r="16" fill="${accent}"/>
    `;
  } else {
    const barHeights = [140, 210, 170, 260, 310].map((base, idx) => base + ((seed >> (idx * 3)) % 45));
    const bars = barHeights.map((h, idx) => {
      const x = 130 + idx * 120;
      const y = 470 - h;
      const fill = idx === barHeights.length - 1 ? accent : '#27272a';
      return `<rect x="${x}" y="${y}" width="72" height="${h}" rx="8" fill="${fill}" stroke="#3f3f46" stroke-width="2"/>`;
    }).join('');
    motif = `
      <line x1="90" y1="470" x2="710" y2="470" stroke="#52525b" stroke-width="3"/>
      ${bars}
    `;
  }

  const label = q.replace(/[<>&"']/g, '').toUpperCase().slice(0, 38);
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">',
    '  <rect width="800" height="600" fill="#0d0d11"/>',
    '  <g stroke="#1f1f26" stroke-width="1">',
    '    <line x1="0" y1="120" x2="800" y2="120"/><line x1="0" y1="240" x2="800" y2="240"/>',
    '    <line x1="0" y1="360" x2="800" y2="360"/><line x1="0" y1="480" x2="800" y2="480"/>',
    '    <line x1="160" y1="0" x2="160" y2="600"/><line x1="320" y1="0" x2="320" y2="600"/>',
    '    <line x1="480" y1="0" x2="480" y2="600"/><line x1="640" y1="0" x2="640" y2="600"/>',
    '  </g>',
    `  ${motif}`,
    '  <rect x="44" y="38" width="16" height="16" rx="4" fill="#10b981"/>',
    `  <text x="74" y="52" font-family="JetBrains Mono, monospace" font-size="20" font-weight="700" fill="#a1a1aa">${label}</text>`,
    '</svg>'
  ].join('\n');

  return {
    buffer: Buffer.from(svg, 'utf8'),
    ext: '.svg',
    mimeType: 'image/svg+xml'
  };
}

async function fetchWithTimeout(url, options = {}) {
  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== 'function') {
    throw new Error('fetch no disponible en este runtime');
  }
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timeoutMs = Number(options.timeoutMs || REQUEST_TIMEOUT_MS);
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    return await fetchImpl(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'SeDev-VideoEditor/2.0 (https://github.com/sedev)',
        ...(options.headers || {})
      },
      signal: controller ? controller.signal : undefined
    });
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function downloadValidatedImage(url, options = {}) {
  const response = await fetchWithTimeout(url, options);
  if (!response || !response.ok) {
    throw new Error(`HTTP ${response ? response.status : 'sin respuesta'} en ${url}`);
  }
  const contentType = String(response.headers && response.headers.get ? response.headers.get('content-type') : '');
  const buffer = Buffer.from(await response.arrayBuffer());
  const format = detectImageFormat(buffer, contentType);
  if (!format) {
    throw new Error(`Payload de imagen inválido (${contentType || 'unknown'}, ${buffer.length} bytes)`);
  }
  if (buffer.length > 8 * 1024 * 1024) {
    throw new Error(`Imagen demasiado grande (${buffer.length} bytes)`);
  }
  return { buffer, ...format };
}

function readCachedImage(cacheDir, key) {
  for (const ext of ['.png', '.jpg', '.webp', '.svg']) {
    const file = path.join(cacheDir, `${key}${ext}`);
    if (fs.existsSync(file) && fs.statSync(file).size > 16) {
      const buffer = fs.readFileSync(file);
      const format = detectImageFormat(buffer);
      if (format) {
        return { file, buffer, ...format };
      }
    }
  }
  return null;
}

function writeCachedImage(cacheDir, key, ext, buffer) {
  ensureDir(cacheDir);
  const file = path.join(cacheDir, `${key}${ext}`);
  fs.writeFileSync(file, buffer);
  return file;
}

async function fetchBrandLogo(slug, options = {}) {
  const clean = normalizeBrandSlug(slug);
  const meta = BRAND_META[clean] || { name: String(slug || clean), color: 'f2ede4', abbr: clean.slice(0, 2).toUpperCase() };
  const cacheDir = options.cacheDir || DEFAULT_IMAGE_CACHE;
  const offline = isForceOffline(options);
  const cacheKey = sha256(`brand_logo:${clean}:${meta.color}`);

  if (!offline && !options.noCache) {
    const cached = readCachedImage(cacheDir, cacheKey);
    if (cached) {
      return {
        slug: clean,
        name: meta.name,
        color: `#${meta.color}`,
        file: cached.file,
        mimeType: cached.mimeType,
        dataUri: toDataUri(cached.buffer, cached.mimeType),
        source: 'cache:brand_logos',
        fallback: false
      };
    }
  }

  if (!offline) {
    const cdnUrl = `https://cdn.simpleicons.org/${encodeURIComponent(clean)}/${encodeURIComponent(meta.color)}`;
    try {
      const downloaded = await downloadValidatedImage(cdnUrl, options);
      const file = writeCachedImage(cacheDir, cacheKey, downloaded.ext, downloaded.buffer);
      return {
        slug: clean,
        name: meta.name,
        color: `#${meta.color}`,
        file,
        mimeType: downloaded.mimeType,
        dataUri: toDataUri(downloaded.buffer, downloaded.mimeType),
        source: 'brand_logos',
        fallback: false
      };
    } catch (err) {
      if (options.logger && options.logger.warn) {
        options.logger.warn(`Logo "${clean}" fallback local: ${err.message}`);
      }
    }
  }

  const fallback = makeOfflineBrandLogoSvg(clean);
  const offlineKey = sha256(`brand_logo_offline:${clean}`);
  const file = writeCachedImage(cacheDir, offlineKey, fallback.ext, fallback.buffer);
  return {
    slug: clean,
    name: meta.name,
    color: fallback.color,
    file,
    mimeType: fallback.mimeType,
    dataUri: toDataUri(fallback.buffer, fallback.mimeType),
    source: 'fallback_svg',
    fallback: true
  };
}

async function resolveBrandLogos(logosOrQuery, options = {}) {
  const list = Array.isArray(logosOrQuery)
    ? logosOrQuery
    : resolveEntityLogos(logosOrQuery, options.max || 4);
  const unique = Array.from(new Set(list.map(normalizeBrandSlug).filter(Boolean))).slice(0, options.max || 6);
  return Promise.all(unique.map((slug) => fetchBrandLogo(slug, options)));
}

function isBadEditorialCandidate(titleOrUrl) {
  return /\b(pdf|djvu|hearing|congress|committee|subcommittee|dod|report|transcript|manuscript|gazette|scan|page\d+|document|memo|letter|archive)\b/i.test(String(titleOrUrl || ''));
}

async function tryOpenverse(query, options = {}) {
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=6&mature=false`;
  const response = await fetchWithTimeout(url, options);
  if (!response || !response.ok) throw new Error(`Openverse HTTP ${response ? response.status : 'error'}`);
  const data = await response.json();
  const results = Array.isArray(data && data.results) ? data.results : [];
  for (const item of results) {
    const candidate = item && (item.thumbnail || item.url);
    if (!candidate) continue;
    if (isBadEditorialCandidate(item.title) || isBadEditorialCandidate(candidate)) continue;
    try {
      return await downloadValidatedImage(candidate, options);
    } catch (err) { /* try next */ }
  }
  throw new Error('Openverse sin imágenes válidas');
}

async function tryWikimediaCommons(query, options = {}) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=${encodeURIComponent(query)}&gsrlimit=6&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=800&format=json`;
  const response = await fetchWithTimeout(url, options);
  if (!response || !response.ok) throw new Error(`Wikimedia HTTP ${response ? response.status : 'error'}`);
  const data = await response.json();
  const pages = data && data.query && data.query.pages ? Object.values(data.query.pages) : [];
  for (const page of pages) {
    if (isBadEditorialCandidate(page && page.title)) continue;
    const info = Array.isArray(page && page.imageinfo) ? page.imageinfo[0] : null;
    if (!info || /pdf|tiff/i.test(String(info.mime || ''))) continue;
    const candidate = info && (info.thumburl || info.url);
    if (!candidate || isBadEditorialCandidate(candidate)) continue;
    try {
      return await downloadValidatedImage(candidate, options);
    } catch (err) { /* try next */ }
  }
  throw new Error('Wikimedia sin imágenes válidas');
}

async function tryPollinationsFlux(query, options = {}) {
  const seed = parseInt(sha256(query).slice(0, 8), 16) % 1000000;
  const prompt = `${query}, minimal dark editorial tech illustration, clean geometry, no text`;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&nologo=true&seed=${seed}`;
  return downloadValidatedImage(url, options);
}

async function fetchImageForQuery(query, options = {}) {
  const cleanQuery = String(query || '').trim() || 'software architecture minimal dark';
  const cacheDir = options.cacheDir || DEFAULT_IMAGE_CACHE;
  const offline = isForceOffline(options);
  const sourceMode = options.source || 'auto';
  const cacheKey = sha256(`image_v2:${sourceMode}:${cleanQuery}`);

  if (!offline && !options.noCache) {
    const cached = readCachedImage(cacheDir, cacheKey);
    if (cached) {
      return {
        query: cleanQuery,
        file: cached.file,
        mimeType: cached.mimeType,
        dataUri: toDataUri(cached.buffer, cached.mimeType),
        source: 'cache',
        fallback: false
      };
    }
  }

  if (!offline) {
    const isAbstractTech = /\b(dark|minimal|chart|decline|architecture|software|agent|agents|ai|market|saas)\b/i.test(cleanQuery);
    const providers = [];
    if (sourceMode === 'ai_flux') {
      providers.push({ name: 'ai_flux', fn: () => tryPollinationsFlux(cleanQuery, options) });
    } else if (sourceMode === 'web_search') {
      providers.push({ name: 'web_search:openverse', fn: () => tryOpenverse(cleanQuery, options) });
      providers.push({ name: 'web_search:wikimedia', fn: () => tryWikimediaCommons(cleanQuery, options) });
    } else if (isAbstractTech) {
      // Conceptual dark tech visuals should never fall back to random PDF document scans.
      providers.push({ name: 'ai_flux', fn: () => tryPollinationsFlux(cleanQuery, options) });
    } else {
      providers.push({ name: 'web_search:openverse', fn: () => tryOpenverse(cleanQuery, options) });
      providers.push({ name: 'web_search:wikimedia', fn: () => tryWikimediaCommons(cleanQuery, options) });
      providers.push({ name: 'ai_flux', fn: () => tryPollinationsFlux(cleanQuery, options) });
    }

    for (const provider of providers) {
      try {
        const downloaded = await provider.fn();
        const file = writeCachedImage(cacheDir, cacheKey, downloaded.ext, downloaded.buffer);
        return {
          query: cleanQuery,
          file,
          mimeType: downloaded.mimeType,
          dataUri: toDataUri(downloaded.buffer, downloaded.mimeType),
          source: provider.name,
          fallback: false
        };
      } catch (err) {
        if (options.logger && options.logger.warn) {
          options.logger.warn(`Auto-image (${provider.name}) falló para "${cleanQuery}": ${err.message}`);
        }
      }
    }
  }

  const fallback = makeOfflineEditorialIllustrationSvg(cleanQuery, options);
  const offlineKey = sha256(`image_offline:${cleanQuery}`);
  const file = writeCachedImage(cacheDir, offlineKey, fallback.ext, fallback.buffer);
  return {
    query: cleanQuery,
    file,
    mimeType: fallback.mimeType,
    dataUri: toDataUri(fallback.buffer, fallback.mimeType),
    source: 'fallback_svg',
    fallback: true
  };
}

function loadLocalExplicitImage(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') return null;
  const resolved = path.isAbsolute(imagePath) ? imagePath : path.resolve(PROJECT_ROOT, imagePath);
  if (!fs.existsSync(resolved)) return null;
  const buffer = fs.readFileSync(resolved);
  const format = detectImageFormat(buffer);
  if (!format) return null;
  return {
    file: resolved,
    mimeType: format.mimeType,
    dataUri: toDataUri(buffer, format.mimeType),
    source: 'local_file',
    fallback: false
  };
}

function copyToRunAssets(resolved, run, prefix) {
  if (!run || !run.assetsDir || !resolved || !resolved.file || !fs.existsSync(resolved.file)) return;
  ensureDir(run.assetsDir);
  const ext = path.extname(resolved.file) || '.svg';
  const dest = path.join(run.assetsDir, `${prefix}${ext}`);
  if (path.resolve(resolved.file) !== path.resolve(dest)) {
    fs.copyFileSync(resolved.file, dest);
  }
}

async function resolvePlanMediaAssets(plan, run = null, options = {}) {
  const brolls = new Map();
  const overlays = new Map();

  for (const overlay of plan.overlays || []) {
    const entry = {};
    if (Array.isArray(overlay.logos) && overlay.logos.length) {
      const logos = await resolveBrandLogos(overlay.logos, options);
      logos.forEach((logo, idx) => copyToRunAssets(logo, run, `${overlay.id}_logo_${idx}_${logo.slug}`));
      entry.logos = logos.map((l) => ({ slug: l.slug, name: l.name, color: l.color, dataUri: l.dataUri, source: l.source }));
    }
    const explicit = loadLocalExplicitImage(overlay.image);
    if (explicit) {
      copyToRunAssets(explicit, run, `${overlay.id}_image`);
      entry.image = explicit.dataUri;
      entry.imageSource = explicit.source;
    } else if (overlay.imageQuery || overlay.style === 'image_card') {
      const img = await fetchImageForQuery(overlay.imageQuery || overlay.text, {
        ...options,
        accent: overlay.accent
      });
      copyToRunAssets(img, run, `${overlay.id}_image`);
      entry.image = img.dataUri;
      entry.imageSource = img.source;
    }
    overlays.set(overlay.id, entry);
  }

  for (const broll of plan.brolls || []) {
    const props = broll.props || {};
    const entry = {};
    if (Array.isArray(props.logos) && props.logos.length) {
      const logos = await resolveBrandLogos(props.logos, options);
      logos.forEach((logo, idx) => copyToRunAssets(logo, run, `${broll.id}_logo_${idx}_${logo.slug}`));
      entry.logos = logos.map((l) => ({ slug: l.slug, name: l.name, color: l.color, dataUri: l.dataUri, source: l.source }));
    }
    const explicit = loadLocalExplicitImage(props.image);
    if (explicit) {
      copyToRunAssets(explicit, run, `${broll.id}_image`);
      entry.image = explicit.dataUri;
      entry.imageSource = explicit.source;
    } else if (props.imageQuery) {
      const img = await fetchImageForQuery(props.imageQuery, {
        ...options,
        accent: props.accent
      });
      copyToRunAssets(img, run, `${broll.id}_image`);
      entry.image = img.dataUri;
      entry.imageSource = img.source;
    }
    brolls.set(broll.id, entry);
  }

  return { brolls, overlays };
}

module.exports = {
  DEFAULT_IMAGE_CACHE,
  REQUEST_TIMEOUT_MS,
  BRAND_META,
  isForceOffline,
  normalizeBrandSlug,
  resolveEntityLogos,
  detectImageFormat,
  makeOfflineBrandLogoSvg,
  makeOfflineEditorialIllustrationSvg,
  fetchBrandLogo,
  resolveBrandLogos,
  fetchImageForQuery,
  resolvePlanMediaAssets
};
