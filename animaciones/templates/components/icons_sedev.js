// Central Vector Icon Catalog for SeDev Motion Graphics
// Clean, engineering-focused SVGs, zero external dependencies, 100% crisp at 1080x1920.

(function() {
  const ICONS = {
    lightning: (color = '#fbbf24') => `
      <path d="M54 18 L30 52 H48 L44 82 L70 46 H52 Z" fill="${color}" stroke="#09090b" stroke-width="2.5" stroke-linejoin="round"/>
    `,
    cpu: (color = '#38bdf8') => `
      <rect x="30" y="30" width="40" height="40" rx="8" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <rect x="42" y="42" width="16" height="16" rx="3" fill="${color}"/>
      <line x1="38" y1="18" x2="38" y2="30" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="18" x2="50" y2="30" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="62" y1="18" x2="62" y2="30" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="38" y1="70" x2="38" y2="82" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="70" x2="50" y2="82" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="62" y1="70" x2="62" y2="82" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="18" y1="38" x2="30" y2="38" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="18" y1="50" x2="30" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="18" y1="62" x2="30" y2="62" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="70" y1="38" x2="82" y2="38" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="70" y1="50" x2="82" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="70" y1="62" x2="82" y2="62" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `,
    ram: (color = '#10b981') => `
      <rect x="22" y="32" width="56" height="36" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <rect x="28" y="40" width="10" height="16" rx="2" fill="${color}"/>
      <rect x="44" y="40" width="10" height="16" rx="2" fill="${color}"/>
      <rect x="60" y="40" width="10" height="16" rx="2" fill="${color}"/>
      <line x1="28" y1="68" x2="32" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="36" y1="68" x2="40" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="44" y1="68" x2="48" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="52" y1="68" x2="56" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="60" y1="68" x2="64" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="68" y1="68" x2="72" y2="76" stroke="${color}" stroke-width="2.5"/>
    `,
    nvme: (color = '#a855f7') => `
      <rect x="20" y="36" width="60" height="28" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <rect x="26" y="42" width="18" height="16" rx="2" fill="${color}"/>
      <rect x="48" y="42" width="14" height="16" rx="2" fill="#27272a"/>
      <circle cx="72" cy="50" r="4" fill="${color}"/>
    `,
    database: (color = '#38bdf8') => `
      <ellipse cx="50" cy="28" rx="28" ry="10" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M22 28 V50 C22 56 34 60 50 60 C66 60 78 56 78 50 V28" fill="none" stroke="${color}" stroke-width="3"/>
      <path d="M22 50 V72 C22 78 34 82 50 82 C66 82 78 78 78 72 V50" fill="none" stroke="${color}" stroke-width="3"/>
    `,
    kernel_shield: (color = '#f59e0b') => `
      <path d="M50 18 L76 28 V52 C76 68 50 82 50 82 C50 82 24 68 24 52 V28 Z" fill="#18181b" stroke="${color}" stroke-width="3" stroke-linejoin="round"/>
      <circle cx="50" cy="46" r="8" fill="${color}"/>
      <path d="M42 56 L50 64 L58 56" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `,
    network_packet: (color = '#06b6d4') => `
      <rect x="24" y="28" width="52" height="44" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polyline points="24,32 50,52 76,32" fill="none" stroke="${color}" stroke-width="3"/>
      <line x1="36" y1="60" x2="44" y2="60" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="56" y1="60" x2="64" y2="60" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    `,
    tree: (color = '#10b981') => `
      <circle cx="50" cy="26" r="8" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="32" cy="54" r="7" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="68" cy="54" r="7" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="24" cy="78" r="6" fill="${color}"/>
      <circle cx="40" cy="78" r="6" fill="${color}"/>
      <circle cx="60" cy="78" r="6" fill="${color}"/>
      <circle cx="76" cy="78" r="6" fill="${color}"/>
      <line x1="44" y1="32" x2="36" y2="48" stroke="${color}" stroke-width="2.5"/>
      <line x1="56" y1="32" x2="64" y2="48" stroke="${color}" stroke-width="2.5"/>
      <line x1="28" y1="60" x2="26" y2="72" stroke="${color}" stroke-width="2"/>
      <line x1="36" y1="60" x2="38" y2="72" stroke="${color}" stroke-width="2"/>
      <line x1="64" y1="60" x2="62" y2="72" stroke="${color}" stroke-width="2"/>
      <line x1="72" y1="60" x2="74" y2="72" stroke="${color}" stroke-width="2"/>
    `,
    rust_gear: (color = '#f97316') => `
      <circle cx="50" cy="50" r="16" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <circle cx="50" cy="50" r="7" fill="${color}"/>
      <path d="M47 18 H53 V26 H47 Z M47 74 H53 V82 H47 Z M18 47 H26 V53 H18 Z M74 47 H82 V53 H74 Z" fill="${color}"/>
      <path d="M26 26 L32 32 M68 68 L74 74 M74 26 L68 32 M26 74 L32 68" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
    `,
    sqlite_feather: (color = '#38bdf8') => `
      <path d="M68 20 C42 22 26 44 26 74 C34 68 44 64 54 64 C64 64 74 54 74 42 C74 32 72 24 68 20 Z" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="24" y1="78" x2="52" y2="48" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="34" r="3" fill="${color}"/>
    `,
    duckdb: (color = '#fbbf24') => `
      <rect x="22" y="24" width="56" height="52" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="40" y1="24" x2="40" y2="76" stroke="${color}" stroke-width="2"/>
      <line x1="58" y1="24" x2="58" y2="76" stroke="${color}" stroke-width="2"/>
      <line x1="22" y1="42" x2="78" y2="42" stroke="${color}" stroke-width="2"/>
      <line x1="22" y1="58" x2="78" y2="58" stroke="${color}" stroke-width="2"/>
      <circle cx="31" cy="33" r="3" fill="${color}"/>
      <circle cx="49" cy="50" r="3" fill="${color}"/>
      <circle cx="68" cy="67" r="3" fill="${color}"/>
    `,
    agent_loop: (color = '#a855f7') => `
      <circle cx="50" cy="50" r="26" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="14 6"/>
      <polygon points="76,46 76,58 84,52" fill="${color}"/>
      <circle cx="50" cy="50" r="10" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="50" cy="50" r="4" fill="${color}"/>
    `,
    server_rack: (color = '#64748b') => `
      <rect x="24" y="20" width="52" height="60" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="24" y1="40" x2="76" y2="40" stroke="${color}" stroke-width="2.5"/>
      <line x1="24" y1="60" x2="76" y2="60" stroke="${color}" stroke-width="2.5"/>
      <circle cx="32" cy="30" r="2.5" fill="#10b981"/>
      <circle cx="40" cy="30" r="2.5" fill="#38bdf8"/>
      <circle cx="32" cy="50" r="2.5" fill="#10b981"/>
      <circle cx="40" cy="50" r="2.5" fill="#38bdf8"/>
      <circle cx="32" cy="70" r="2.5" fill="#10b981"/>
      <circle cx="40" cy="70" r="2.5" fill="#38bdf8"/>
    `,
    zero_trust_lock: (color = '#ef4444') => `
      <rect x="26" y="44" width="48" height="38" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M36 44 V32 C36 24 42 18 50 18 C58 18 64 24 64 32 V44" fill="none" stroke="${color}" stroke-width="3.5"/>
      <circle cx="50" cy="60" r="4" fill="${color}"/>
      <line x1="50" y1="64" x2="50" y2="70" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `,
    scale_balance: (color = '#fbbf24') => `
      <line x1="24" y1="36" x2="76" y2="36" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="50" y1="36" x2="50" y2="76" stroke="${color}" stroke-width="3.5"/>
      <line x1="38" y1="76" x2="62" y2="76" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="24,38 16,56 32,56" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <polygon points="76,38 68,56 84,56" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
    `,
    check_circle: (color = '#10b981') => `
      <circle cx="50" cy="50" r="30" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polyline points="36,50 46,60 64,40" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    `,
    terminal: (color = '#38bdf8') => `
      <rect x="22" y="26" width="56" height="48" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polyline points="32,44 40,50 32,56" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="46" y1="56" x2="56" y2="56" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `
  };

  window.__ICONS__ = ICONS;

  window.getSeDevIcon = function(name, size = 100, color = null) {
    const fn = ICONS[name] || ICONS.lightning;
    const body = fn(color || undefined);
    return `
      <svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <rect x="8" y="8" width="84" height="84" rx="22" fill="#121214" stroke="#27272a" stroke-width="2.5"/>
        ${body}
      </svg>
    `;
  };
})();
