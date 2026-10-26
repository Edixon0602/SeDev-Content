// Central Vector Icon Catalog for Technical Motion Graphics
// Clean, engineering-focused SVGs, zero external dependencies, 100% crisp at 1080x1920.

(function() {
  const ICONS = {
    // 1. Hardware & Low-Level
    lightning: (color = '#fbbf24') => `
      <path d="M54 16 L28 52 H48 L42 84 L72 46 H52 Z" fill="${color}" stroke="#09090b" stroke-width="2.5" stroke-linejoin="round"/>
    `,
    cpu: (color = '#38bdf8') => `
      <rect x="28" y="28" width="44" height="44" rx="8" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <rect x="40" y="40" width="20" height="20" rx="4" fill="${color}"/>
      <line x1="36" y1="16" x2="36" y2="28" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="16" x2="50" y2="28" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="64" y1="16" x2="64" y2="28" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="36" y1="72" x2="36" y2="84" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="72" x2="50" y2="84" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="64" y1="72" x2="64" y2="84" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="16" y1="36" x2="28" y2="36" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="16" y1="50" x2="28" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="16" y1="64" x2="28" y2="64" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="72" y1="36" x2="84" y2="36" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="72" y1="50" x2="84" y2="50" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="72" y1="64" x2="84" y2="64" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `,
    ram: (color = '#10b981') => `
      <rect x="20" y="32" width="60" height="36" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <rect x="26" y="40" width="10" height="16" rx="2" fill="${color}"/>
      <rect x="42" y="40" width="10" height="16" rx="2" fill="${color}"/>
      <rect x="58" y="40" width="10" height="16" rx="2" fill="${color}"/>
      <line x1="26" y1="68" x2="30" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="34" y1="68" x2="38" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="42" y1="68" x2="46" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="50" y1="68" x2="54" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="58" y1="68" x2="62" y2="76" stroke="${color}" stroke-width="2.5"/>
      <line x1="66" y1="68" x2="70" y2="76" stroke="${color}" stroke-width="2.5"/>
    `,
    nvme: (color = '#a855f7') => `
      <rect x="18" y="36" width="64" height="28" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <rect x="24" y="42" width="18" height="16" rx="2" fill="${color}"/>
      <rect x="46" y="42" width="14" height="16" rx="2" fill="#27272a"/>
      <circle cx="72" cy="50" r="4" fill="${color}"/>
      <line x1="18" y1="44" x2="14" y2="44" stroke="${color}" stroke-width="2.5"/>
      <line x1="18" y1="56" x2="14" y2="56" stroke="${color}" stroke-width="2.5"/>
    `,
    l1_cache: (color = '#f59e0b') => `
      <rect x="22" y="24" width="56" height="52" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="22" y1="50" x2="78" y2="50" stroke="${color}" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="50" y="42" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="${color}" text-anchor="middle">L1-D</text>
      <text x="50" y="68" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="800" fill="#71717a" text-anchor="middle">L1-I</text>
    `,
    syscall: (color = '#ef4444') => `
      <line x1="18" y1="50" x2="82" y2="50" stroke="#71717a" stroke-width="3" stroke-dasharray="6 4"/>
      <path d="M42 28 L50 20 L58 28 M50 22 V78 M42 70 L50 78 L58 70" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="50" cy="50" r="7" fill="#18181b" stroke="${color}" stroke-width="3"/>
    `,
    kernel_ring0: (color = '#f97316') => `
      <circle cx="50" cy="50" r="34" fill="none" stroke="#27272a" stroke-width="2"/>
      <circle cx="50" cy="50" r="24" fill="none" stroke="#3f3f46" stroke-width="2.5"/>
      <circle cx="50" cy="50" r="14" fill="#18181b" stroke="${color}" stroke-width="3.5"/>
      <text x="50" y="55" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="900" fill="${color}" text-anchor="middle">R0</text>
    `,

    // 2. Databases & Storage
    database: (color = '#38bdf8') => `
      <ellipse cx="50" cy="28" rx="28" ry="10" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M22 28 V50 C22 56 34 60 50 60 C66 60 78 56 78 50 V28" fill="none" stroke="${color}" stroke-width="3"/>
      <path d="M22 50 V72 C22 78 34 82 50 82 C66 82 78 78 78 72 V50" fill="none" stroke="${color}" stroke-width="3"/>
    `,
    postgres: (color = '#38bdf8') => `
      <ellipse cx="50" cy="26" rx="26" ry="9" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M24 26 V68 C24 76 36 80 50 80 C64 80 76 76 76 68 V26" fill="none" stroke="${color}" stroke-width="3"/>
      <path d="M38 48 C42 42 58 42 62 48" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="42" cy="58" r="3" fill="${color}"/>
      <circle cx="58" cy="58" r="3" fill="${color}"/>
    `,
    sqlite: (color = '#38bdf8') => `
      <path d="M68 20 C42 22 26 44 26 74 C34 68 44 64 54 64 C64 64 74 54 74 42 C74 32 72 24 68 20 Z" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="24" y1="78" x2="52" y2="48" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="34" r="3" fill="${color}"/>
    `,
    redis: (color = '#ef4444') => `
      <polygon points="50,22 80,36 50,50 20,36" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polygon points="50,42 80,56 50,70 20,56" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polygon points="50,62 80,76 50,90 20,76" fill="#18181b" stroke="${color}" stroke-width="3"/>
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
    rocksdb: (color = '#64748b') => `
      <rect x="20" y="24" width="60" height="20" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <rect x="20" y="48" width="28" height="20" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <rect x="52" y="48" width="28" height="20" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <rect x="20" y="72" width="60" height="14" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
    `,
    parquet: (color = '#06b6d4') => `
      <rect x="20" y="22" width="16" height="56" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <rect x="42" y="22" width="16" height="56" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <rect x="64" y="22" width="16" height="56" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <line x1="20" y1="40" x2="36" y2="40" stroke="${color}" stroke-width="2"/>
      <line x1="42" y1="40" x2="58" y2="40" stroke="${color}" stroke-width="2"/>
      <line x1="64" y1="40" x2="80" y2="40" stroke="${color}" stroke-width="2"/>
    `,
    clickhouse: (color = '#eab308') => `
      <rect x="22" y="52" width="6" height="26" fill="${color}"/>
      <rect x="32" y="40" width="6" height="38" fill="${color}"/>
      <rect x="42" y="28" width="6" height="50" fill="${color}"/>
      <rect x="52" y="34" width="6" height="44" fill="${color}"/>
      <rect x="62" y="46" width="6" height="32" fill="${color}"/>
      <rect x="72" y="58" width="6" height="20" fill="${color}"/>
    `,
    btree: (color = '#10b981') => `
      <rect x="38" y="20" width="24" height="14" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <rect x="20" y="50" width="22" height="14" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <rect x="58" y="50" width="22" height="14" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <line x1="44" y1="34" x2="32" y2="50" stroke="${color}" stroke-width="2"/>
      <line x1="56" y1="34" x2="68" y2="50" stroke="${color}" stroke-width="2"/>
      <circle cx="24" cy="76" r="3" fill="${color}"/>
      <circle cx="34" cy="76" r="3" fill="${color}"/>
      <circle cx="64" cy="76" r="3" fill="${color}"/>
      <circle cx="74" cy="76" r="3" fill="${color}"/>
      <line x1="27" y1="64" x2="25" y2="73" stroke="${color}" stroke-width="1.5"/>
      <line x1="33" y1="64" x2="34" y2="73" stroke="${color}" stroke-width="1.5"/>
      <line x1="67" y1="64" x2="65" y2="73" stroke="${color}" stroke-width="1.5"/>
      <line x1="73" y1="64" x2="74" y2="73" stroke="${color}" stroke-width="1.5"/>
    `,
    lsm_tree: (color = '#f59e0b') => `
      <rect x="24" y="22" width="52" height="16" rx="3" fill="#18181b" stroke="#10b981" stroke-width="2"/>
      <path d="M50 38 V48" stroke="#71717a" stroke-width="2" stroke-linecap="round"/>
      <rect x="20" y="48" width="60" height="16" rx="3" fill="#18181b" stroke="${color}" stroke-width="2"/>
      <path d="M50 64 V74" stroke="#71717a" stroke-width="2" stroke-linecap="round"/>
      <rect x="16" y="74" width="68" height="16" rx="3" fill="#18181b" stroke="#a855f7" stroke-width="2"/>
    `,
    wal_log: (color = '#ec4899') => `
      <rect x="22" y="24" width="56" height="52" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="30" y1="36" x2="60" y2="36" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="30" y1="48" x2="70" y2="48" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="30" y1="60" x2="52" y2="60" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="66" cy="60" r="3" fill="#10b981"/>
    `,

    // 3. Networking, Protocols & Kernel
    ebpf: (color = '#f59e0b') => `
      <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="50" cy="50" r="12" fill="${color}"/>
      <line x1="50" y1="18" x2="50" y2="38" stroke="${color}" stroke-width="2.5"/>
      <line x1="78" y1="66" x2="60" y2="56" stroke="${color}" stroke-width="2.5"/>
      <line x1="22" y1="66" x2="40" y2="56" stroke="${color}" stroke-width="2.5"/>
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
    websocket: (color = '#10b981') => `
      <path d="M30 40 L20 50 L30 60" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M70 40 L80 50 L70 60" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="22" y1="50" x2="78" y2="50" stroke="${color}" stroke-width="3.5" stroke-dasharray="4 4"/>
    `,
    sse_stream: (color = '#38bdf8') => `
      <line x1="22" y1="50" x2="76" y2="50" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="74,42 84,50 74,58" fill="${color}"/>
      <circle cx="34" cy="50" r="5" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="52" cy="50" r="5" fill="#18181b" stroke="${color}" stroke-width="3"/>
    `,
    http2: (color = '#818cf8') => `
      <rect x="22" y="26" width="56" height="48" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="30" y1="42" x2="70" y2="42" stroke="${color}" stroke-width="2"/>
      <line x1="30" y1="52" x2="70" y2="52" stroke="${color}" stroke-width="2"/>
      <line x1="30" y1="62" x2="70" y2="62" stroke="${color}" stroke-width="2"/>
      <circle cx="38" cy="42" r="2.5" fill="${color}"/>
      <circle cx="54" cy="52" r="2.5" fill="${color}"/>
      <circle cx="46" cy="62" r="2.5" fill="${color}"/>
    `,
    connection_pool: (color = '#06b6d4') => `
      <rect x="42" y="22" width="16" height="56" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="18" y1="34" x2="42" y2="44" stroke="#71717a" stroke-width="2"/>
      <line x1="18" y1="50" x2="42" y2="50" stroke="#71717a" stroke-width="2"/>
      <line x1="18" y1="66" x2="42" y2="56" stroke="#71717a" stroke-width="2"/>
      <line x1="58" y1="50" x2="82" y2="50" stroke="${color}" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="80,44 88,50 80,56" fill="${color}"/>
    `,
    tls_lock: (color = '#10b981') => `
      <rect x="26" y="44" width="48" height="38" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M36 44 V32 C36 24 42 18 50 18 C58 18 64 24 64 32 V44" fill="none" stroke="${color}" stroke-width="3.5"/>
      <circle cx="50" cy="60" r="4" fill="${color}"/>
      <line x1="50" y1="64" x2="50" y2="70" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `,

    // 4. Infrastructure & Cloud
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
    hetzner: (color = '#ef4444') => `
      <rect x="22" y="26" width="56" height="48" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M34 38 V62 M34 50 H66 M66 38 V62" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
    `,
    docker: (color = '#38bdf8') => `
      <path d="M18 64 C22 74 36 78 50 78 C70 78 82 68 84 54 C78 54 74 58 68 58 C62 58 60 54 52 54 C44 54 42 58 36 58 C30 58 26 54 18 64 Z" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <rect x="30" y="44" width="8" height="8" rx="1" fill="${color}"/>
      <rect x="42" y="44" width="8" height="8" rx="1" fill="${color}"/>
      <rect x="54" y="44" width="8" height="8" rx="1" fill="${color}"/>
      <rect x="42" y="34" width="8" height="8" rx="1" fill="${color}"/>
    `,
    kubernetes: (color = '#3b82f6') => `
      <polygon points="50,20 76,34 76,66 50,80 24,66 24,34" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="50" cy="50" r="10" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <line x1="50" y1="20" x2="50" y2="40" stroke="${color}" stroke-width="2"/>
      <line x1="76" y1="66" x2="58" y2="56" stroke="${color}" stroke-width="2"/>
      <line x1="24" y1="66" x2="42" y2="56" stroke="${color}" stroke-width="2"/>
    `,
    load_balancer: (color = '#10b981') => `
      <circle cx="50" cy="28" r="8" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <line x1="50" y1="36" x2="50" y2="54" stroke="${color}" stroke-width="2.5"/>
      <line x1="28" y1="54" x2="72" y2="54" stroke="${color}" stroke-width="2.5"/>
      <line x1="28" y1="54" x2="28" y2="68" stroke="${color}" stroke-width="2.5"/>
      <line x1="50" y1="54" x2="50" y2="68" stroke="${color}" stroke-width="2.5"/>
      <line x1="72" y1="54" x2="72" y2="68" stroke="${color}" stroke-width="2.5"/>
      <circle cx="28" cy="74" r="6" fill="${color}"/>
      <circle cx="50" cy="74" r="6" fill="${color}"/>
      <circle cx="72" cy="74" r="6" fill="${color}"/>
    `,
    cdn_edge: (color = '#a855f7') => `
      <circle cx="50" cy="50" r="28" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="6 4"/>
      <circle cx="50" cy="50" r="8" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="50" cy="22" r="5" fill="${color}"/>
      <circle cx="78" cy="50" r="5" fill="${color}"/>
      <circle cx="50" cy="78" r="5" fill="${color}"/>
      <circle cx="22" cy="50" r="5" fill="${color}"/>
    `,

    // 5. Runtimes & Languages
    rust_gear: (color = '#f97316') => `
      <circle cx="50" cy="50" r="16" fill="#18181b" stroke="${color}" stroke-width="4"/>
      <circle cx="50" cy="50" r="7" fill="${color}"/>
      <path d="M47 18 H53 V26 H47 Z M47 74 H53 V82 H47 Z M18 47 H26 V53 H18 Z M74 47 H82 V53 H74 Z" fill="${color}"/>
      <path d="M26 26 L32 32 M68 68 L74 74 M74 26 L68 32 M26 74 L32 68" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
    `,
    node_hex: (color = '#22c55e') => `
      <polygon points="50,18 78,34 78,66 50,82 22,66 22,34" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polyline points="36,44 50,36 64,44 50,52 36,44" fill="none" stroke="${color}" stroke-width="2.5"/>
      <line x1="50" y1="52" x2="50" y2="68" stroke="${color}" stroke-width="2.5"/>
    `,
    bun_dumpling: (color = '#fbbf24') => `
      <ellipse cx="50" cy="54" rx="28" ry="22" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M36 38 C42 32 46 26 50 26 C54 26 58 32 64 38" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="42" cy="52" r="3" fill="${color}"/>
      <circle cx="58" cy="52" r="3" fill="${color}"/>
      <path d="M46 62 Q50 66 54 62" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    `,
    wasm_cube: (color = '#6366f1') => `
      <polygon points="50,20 78,36 50,52 22,36" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polygon points="22,36 50,52 50,82 22,66" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polygon points="78,36 50,52 50,82 78,66" fill="#18181b" stroke="${color}" stroke-width="3"/>
    `,
    v8_engine: (color = '#06b6d4') => `
      <circle cx="50" cy="50" r="30" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <text x="50" y="58" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="900" fill="${color}" text-anchor="middle">V8</text>
    `,

    // 6. AI, Models & Protocols
    llm_brain: (color = '#a855f7') => `
      <circle cx="38" cy="40" r="14" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <circle cx="62" cy="40" r="14" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <circle cx="50" cy="62" r="14" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <line x1="38" y1="40" x2="62" y2="40" stroke="${color}" stroke-width="2"/>
      <line x1="38" y1="40" x2="50" y2="62" stroke="${color}" stroke-width="2"/>
      <line x1="62" y1="40" x2="50" y2="62" stroke="${color}" stroke-width="2"/>
    `,
    weights_matrix: (color = '#38bdf8') => `
      <rect x="22" y="24" width="56" height="52" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="22" y1="42" x2="78" y2="42" stroke="#3f3f46" stroke-width="2"/>
      <line x1="22" y1="58" x2="78" y2="58" stroke="#3f3f46" stroke-width="2"/>
      <line x1="40" y1="24" x2="40" y2="76" stroke="#3f3f46" stroke-width="2"/>
      <line x1="58" y1="24" x2="58" y2="76" stroke="#3f3f46" stroke-width="2"/>
      <rect x="24" y="26" width="14" height="14" fill="${color}"/>
      <rect x="42" y="44" width="14" height="14" fill="${color}"/>
    `,
    quant_4bit: (color = '#10b981') => `
      <rect x="20" y="32" width="60" height="36" rx="4" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <text x="50" y="56" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="900" fill="${color}" text-anchor="middle">INT4</text>
    `,
    vector_hnsw: (color = '#ec4899') => `
      <circle cx="28" cy="30" r="5" fill="${color}"/>
      <circle cx="72" cy="30" r="5" fill="${color}"/>
      <circle cx="50" cy="50" r="7" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="30" cy="72" r="5" fill="${color}"/>
      <circle cx="70" cy="72" r="5" fill="${color}"/>
      <line x1="28" y1="30" x2="50" y2="50" stroke="${color}" stroke-width="2"/>
      <line x1="72" y1="30" x2="50" y2="50" stroke="${color}" stroke-width="2"/>
      <line x1="30" y1="72" x2="50" y2="50" stroke="${color}" stroke-width="2"/>
      <line x1="70" y1="72" x2="50" y2="50" stroke="${color}" stroke-width="2"/>
    `,
    mcp_protocol: (color = '#a855f7') => `
      <rect x="20" y="36" width="24" height="28" rx="4" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <rect x="56" y="36" width="24" height="28" rx="4" fill="#18181b" stroke="#38bdf8" stroke-width="2.5"/>
      <line x1="44" y1="44" x2="56" y2="44" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="56" y1="56" x2="44" y2="56" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round"/>
    `,
    agent_loop: (color = '#a855f7') => `
      <circle cx="50" cy="50" r="26" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="14 6"/>
      <polygon points="76,46 76,58 84,52" fill="${color}"/>
      <circle cx="50" cy="50" r="10" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="50" cy="50" r="4" fill="${color}"/>
    `,
    token_stream: (color = '#38bdf8') => `
      <rect x="18" y="42" width="14" height="16" rx="2" fill="${color}"/>
      <rect x="38" y="42" width="14" height="16" rx="2" fill="${color}"/>
      <rect x="58" y="42" width="14" height="16" rx="2" fill="${color}"/>
      <line x1="78" y1="40" x2="78" y2="60" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `,

    // 7. Security, DevOps & General Engineering
    zero_trust_lock: (color = '#ef4444') => `
      <rect x="26" y="44" width="48" height="38" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M36 44 V32 C36 24 42 18 50 18 C58 18 64 24 64 32 V44" fill="none" stroke="${color}" stroke-width="3.5"/>
      <circle cx="50" cy="60" r="4" fill="${color}"/>
      <line x1="50" y1="64" x2="50" y2="70" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `,
    malware_bug: (color = '#ef4444') => `
      <ellipse cx="50" cy="52" rx="16" ry="20" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="50" cy="28" r="9" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="22" y1="44" x2="36" y2="48" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="22" y1="60" x2="36" y2="58" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="78" y1="44" x2="64" y2="48" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="78" y1="60" x2="64" y2="58" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
      <line x1="42" y1="20" x2="36" y2="14" stroke="${color}" stroke-width="2.5"/>
      <line x1="58" y1="20" x2="64" y2="14" stroke="${color}" stroke-width="2.5"/>
    `,
    terminal: (color = '#38bdf8') => `
      <rect x="22" y="26" width="56" height="48" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <polyline points="32,44 40,50 32,56" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="46" y1="56" x2="56" y2="56" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    `,
    git_branch: (color = '#a855f7') => `
      <circle cx="34" cy="28" r="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="34" cy="72" r="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <circle cx="66" cy="44" r="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <line x1="34" y1="34" x2="34" y2="66" stroke="${color}" stroke-width="3"/>
      <path d="M34 56 C48 56 66 52 66 50" fill="none" stroke="${color}" stroke-width="3"/>
    `,
    monorepo: (color = '#38bdf8') => `
      <rect x="24" y="24" width="52" height="52" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <rect x="32" y="32" width="14" height="14" rx="2" fill="${color}"/>
      <rect x="54" y="32" width="14" height="14" rx="2" fill="${color}"/>
      <rect x="32" y="54" width="14" height="14" rx="2" fill="${color}"/>
      <rect x="54" y="54" width="14" height="14" rx="2" fill="${color}"/>
    `,
    microservice: (color = '#f97316') => `
      <circle cx="32" cy="32" r="10" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <circle cx="68" cy="32" r="10" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <circle cx="50" cy="68" r="10" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <line x1="40" y1="38" x2="60" y2="38" stroke="#3f3f46" stroke-width="2" stroke-dasharray="3 3"/>
      <line x1="36" y1="42" x2="46" y2="60" stroke="#3f3f46" stroke-width="2" stroke-dasharray="3 3"/>
      <line x1="64" y1="42" x2="54" y2="60" stroke="#3f3f46" stroke-width="2" stroke-dasharray="3 3"/>
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
    speedometer: (color = '#38bdf8') => `
      <path d="M24 64 A32 32 0 1 1 76 64" fill="none" stroke="${color}" stroke-width="4" stroke-linecap="round"/>
      <line x1="50" y1="56" x2="66" y2="38" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="50" cy="56" r="4" fill="${color}"/>
    `,
    flamegraph: (color = '#f97316') => `
      <rect x="20" y="66" width="60" height="12" rx="2" fill="${color}"/>
      <rect x="26" y="50" width="28" height="12" rx="2" fill="#fbbf24"/>
      <rect x="58" y="50" width="18" height="12" rx="2" fill="#fbbf24"/>
      <rect x="32" y="34" width="16" height="12" rx="2" fill="#ef4444"/>
    `,
    cache_bolt: (color = '#06b6d4') => `
      <rect x="24" y="26" width="52" height="48" rx="6" fill="#18181b" stroke="${color}" stroke-width="3"/>
      <path d="M52 34 L40 50 H52 L48 66 L60 50 H48 Z" fill="${color}"/>
    `,
    bloom_filter: (color = '#a855f7') => `
      <rect x="16" y="40" width="68" height="20" rx="3" fill="#18181b" stroke="${color}" stroke-width="2.5"/>
      <line x1="26" y1="40" x2="26" y2="60" stroke="#3f3f46" stroke-width="1.5"/>
      <line x1="36" y1="40" x2="36" y2="60" stroke="#3f3f46" stroke-width="1.5"/>
      <line x1="46" y1="40" x2="46" y2="60" stroke="#3f3f46" stroke-width="1.5"/>
      <line x1="56" y1="40" x2="56" y2="60" stroke="#3f3f46" stroke-width="1.5"/>
      <line x1="66" y1="40" x2="66" y2="60" stroke="#3f3f46" stroke-width="1.5"/>
      <rect x="28" y="44" width="6" height="12" fill="${color}"/>
      <rect x="48" y="44" width="6" height="12" fill="${color}"/>
      <rect x="68" y="44" width="6" height="12" fill="${color}"/>
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
    `
  };

  // Aliases for compatibility
  ICONS.sqlite_feather = ICONS.sqlite;

  window.__ICONS__ = ICONS;

  window.getSeDevIcon = function(name, size = 100, color = null, variant = 'card') {
    const fn = ICONS[name] || ICONS.lightning;
    const body = fn(color || undefined);

    if (variant === 'raw') {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}">
          ${body}
        </svg>
      `;
    }

    if (variant === 'glow') {
      const glowColor = color || '#38bdf8';
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}">
          <defs>
            <filter id="glow_${name}" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="${glowColor}" flood-opacity="0.4"/>
            </filter>
          </defs>
          <g filter="url(#glow_${name})">
            ${body}
          </g>
        </svg>
      `;
    }

    if (variant === 'pill') {
      return `
        <svg viewBox="0 0 100 100" width="${size}" height="${size}">
          <rect x="6" y="16" width="88" height="68" rx="34" fill="#141418" stroke="#27272a" stroke-width="2"/>
          ${body}
        </svg>
      `;
    }

    // Default 'card' variant
    return `
      <svg viewBox="0 0 100 100" width="${size}" height="${size}">
        <rect x="8" y="8" width="84" height="84" rx="20" fill="#121216" stroke="#27272a" stroke-width="2.5"/>
        ${body}
      </svg>
    `;
  };
})();
