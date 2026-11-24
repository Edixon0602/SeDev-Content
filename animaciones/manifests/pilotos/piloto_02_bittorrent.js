window.__DEFAULT_MANIFEST__ = {
  "title": "PILOTO 02 — El servidor que BitTorrent no necesita",
  "slug": "piloto_02_bittorrent",
  "brand": "sedev",
  "format": "short_form_pilot",
  "fps": 30,
  "output": "animaciones/output_clips/pilotos/piloto_02_bittorrent.mp4",
  "hook_variants": [
    "Descargaste 50 GB sin servidor. Tu SaaS se cae si Railway estornuda.",
    "BitTorrent movió 50 GB con gente que ni se conoce. Tú no puedes mandar un PDF sin que se caiga el backend.",
    "Tu arquitectura tiene un punto único de falla. BitTorrent tiene 200,000."
  ],
  "cta_keyword": "P2P",
  "tone": "Drama: caída de producción. Humor: capitalismo en kilobytes y el PDF que tumba el backend.",
  "beats": [
    {
      "t": "0.0 - 4.5",
      "on_screen": "50 GB SIN SERVIDOR",
      "voiceover": "Descargaste 50 GB sin servidor. Tu SaaS se cae si Railway estornuda.",
      "visual": "Cara a cámara + texto. Cero diagrama en el primer frame.",
      "cut": "Hard in. Sin logo."
    },
    {
      "t": "4.5 - 12.0",
      "on_screen": "200,000 BLOQUES SHA-1",
      "voiceover": "BitTorrent parte el archivo en bloques de 256 KB, cada uno con su hash. Si uno llega corrupto, se pide otra vez.",
      "visual": "Archivo partido en bloques verificados.",
      "cut": "Corte seco. Micro-zoom."
    },
    {
      "t": "12.0 - 19.5",
      "on_screen": "CAPITALISMO EN KILOBYTES",
      "voiceover": "No lo bajas de un servidor: lo bajas de gente que también lo baja. El que más comparte, más prioridad. Capitalismo en kilobytes.",
      "visual": "Enjambre P2P y Tit-for-Tat.",
      "cut": "Corte al enjambre. Paquetes viajando."
    },
    {
      "t": "19.5 - 26.0",
      "on_screen": "1 SERVIDOR VS 200,000 PEERS",
      "voiceover": "Tu arquitectura tiene un punto único de falla. BitTorrent hizo infraestructura a cada usuario. Tú tienes un servidor.",
      "visual": "Comparativa 1 servidor vs enjambre. Texto secundario: “Y TÚ PAGANDO POR UN PDF”.",
      "cut": "Dos tarjetas. La ganadora pulsa una vez."
    },
    {
      "t": "26.0 - 32.0",
      "on_screen": "COMENTA P2P",
      "voiceover": "Si tu producto depende de un solo servidor, comenta P2P y te paso el checklist de resiliencia.",
      "visual": "Cara + CTA. El checklist aparece como texto, no como promesa vaga.",
      "cut": "Cierre directo. Sin “sígueme”."
    }
  ],
  "scenes": [
    {
      "id": "s01_hook",
      "type": "kinetic_slam",
      "duration": 4.5,
      "voiceover": "Descargaste 50 GB sin servidor. Tu SaaS se cae si Railway estornuda.",
      "visual_cue": "Hook: 50 GB sin servidor",
      "props": {
        "theme": "dark",
        "badge": "RESILIENCIA // P2P",
        "lines": [
          {
            "text": "DESCARGASTE 50 GB",
            "color": "#ffffff"
          },
          {
            "text": "SIN SERVIDOR",
            "color": "#fbbf24",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          }
        ],
        "stat": "TU SAAS SE CAE SI RAILWAY ESTORNUDA",
        "subtitle": "BITTORRENT LO HIZO CON GENTE QUE NI SE CONOCE"
      }
    },
    {
      "id": "s02_bloques",
      "type": "bittorrent_file_slicer_viz",
      "duration": 7.5,
      "voiceover": "BitTorrent parte el archivo en bloques de 256 KB, cada uno con su hash. Si uno llega corrupto, se pide otra vez.",
      "visual_cue": "Archivo partido en 200,000 bloques de 256 KB con hash SHA-1",
      "props": {
        "theme": "dark",
        "title": "EL ARCHIVO EN 200,000 BLOQUES",
        "subtitle": "SHA-1: 256 KB POR BLOQUE / VERIFICACIÓN INDEPENDIENTE"
      }
    },
    {
      "id": "s03_enjambre",
      "type": "bittorrent_swarm_viz",
      "duration": 7.5,
      "voiceover": "No lo bajas de un servidor: lo bajas de gente que también lo baja. El que más comparte, más prioridad. Capitalismo en kilobytes.",
      "visual_cue": "Enjambre P2P y algoritmo Tit-for-Tat",
      "props": {
        "theme": "dark",
        "title": "TIT-FOR-TAT: EL QUE COMPARTE, GANA",
        "subtitle": "SIN SERVIDOR CENTRAL / 200,000 PEERS"
      }
    },
    {
      "id": "s04_comparativa",
      "type": "metrics_comparison",
      "duration": 6.5,
      "voiceover": "Tu arquitectura tiene un punto único de falla. BitTorrent hizo infraestructura a cada usuario. Tú tienes un servidor.",
      "visual_cue": "1 servidor vs 200,000 peers. Texto: “Y TÚ PAGANDO POR UN PDF”",
      "props": {
        "theme": "dark",
        "badge": "RESILIENCIA // P2P",
        "title": "UN SERVIDOR VS UNA RED",
        "barA": 4,
        "barB": 100,
        "metricA": {
          "name": "1 SERVIDOR",
          "value": "1 punto",
          "sub": "Se cae y no hay plan B",
          "color": "#ef4444"
        },
        "metricB": {
          "name": "200,000 PEERS",
          "value": "200,000",
          "sub": "La red sigue viva",
          "color": "#10b981"
        },
        "speedup": "SINGLE POINT OF FAILURE VS ENJAMBRE"
      }
    },
    {
      "id": "s05_cta",
      "type": "kinetic_slam",
      "duration": 6,
      "voiceover": "Si tu producto depende de un solo servidor, comenta P2P y te paso el checklist de resiliencia.",
      "visual_cue": "CTA: comenta P2P para recibir el checklist",
      "props": {
        "theme": "dark",
        "badge": "CHECKLIST // RESILIENCIA",
        "lines": [
          {
            "text": "COMENTA",
            "color": "#ffffff"
          },
          {
            "text": "P2P",
            "color": "#fbbf24",
            "highlight": "#fbbf24",
            "textColor": "#050505"
          },
          {
            "text": "Y TE PASO EL CHECKLIST",
            "color": "#ffffff"
          }
        ],
        "stat": "RESILIENCIA SIN PUNTO ÚNICO DE FALLA",
        "subtitle": "SEDEV // INGENIERÍA QUE SE ENTIENDE"
      }
    }
  ]
};
