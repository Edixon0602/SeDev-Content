// Component: code_terminal
// Code editor inspection with syntax coloring, active line indicator, and zero horizontal clipping.

window.registerComponent('code_terminal', {
  init(container, props) {
    const filename = props.filename || 'src/main.rs';
    const lines = props.codeLines || [
      '// Zero-overhead abstraction:',
      'pub fn process_event(event: Event) -> Result<(), Error> {',
      '    let buffer = event.read_payload()?;',
      '    dispatch_in_memory(buffer)',
      '}'
    ];

    // Determine font size dynamically based on max line length
    const maxLen = Math.max(...lines.map(l => (typeof l === 'string' ? l.length : (l.text ? l.text.length : 0))));
    const fontSize = maxLen > 55 ? '15px' : (maxLen > 40 ? '17px' : '19px');

    container.innerHTML = `
      <div class="comp-code-terminal">
        ${props.badge || props.header ? `<div class="scene-category" id="ctBadge">${props.badge || props.header}</div>` : ''}
        <div class="ct-title" id="ctTitle">${props.title || 'INSPECCIÓN DE CÓDIGO FUENTE'}</div>

        <!-- Window Container -->
        <div class="ct-window" id="ctWindow">
          <div class="ct-window-bar">
            <div class="ct-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="ct-filename">${filename}</div>
          </div>

          <div class="ct-editor" style="font-size: ${fontSize};">
            ${lines.map((lineObj, i) => {
              const text = typeof lineObj === 'string' ? lineObj : (lineObj.text || '');
              const isHighlight = typeof lineObj === 'object' && lineObj.highlight;
              const isCursor = props.cursorLine && props.cursorLine === (i + 1);
              return `
                <div class="ct-line ${isHighlight ? 'highlight' : ''}" id="ctLine_${i}">
                  <span class="ct-linenum">${i + 1}</span>
                  <span class="ct-linetext">${this.colorize(text)}${isCursor ? '<span class="ct-cursor">_</span>' : ''}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;
  },

  colorize(text) {
    if (!text || typeof text !== 'string') return '';
    let t = text;

    // 1. Comments
    if (t.trim().startsWith('#') || t.trim().startsWith('//') || t.trim().startsWith('--')) {
      return `<span class="comm" style="color: #71717a; font-style: italic;">${t}</span>`;
    }

    // 2. Syntax Keywords
    t = t.replace(/\b(import|export|from|const|let|var|function|return|async|await|pub|fn|SELECT|FROM|WHERE|GROUP|ORDER|BY|ALTER|TABLE|ADD|COLUMN|BF\.RESERVE|BF\.ADD|BF\.EXISTS)\b/g, '<span style="color: #f43f5e; font-weight: 700;">$1</span>');
    // 3. Types
    t = t.replace(/\b(string|number|boolean|Result|Error|VARCHAR|BIGINT|PRIMARY|KEY|NULLABLE)\b/g, '<span style="color: #38bdf8; font-weight: 600;">$1</span>');
    // 4. Strings
    t = t.replace(/(["'].*?["'])/g, '<span style="color: #10b981;">$1</span>');

    return t;
  },

  render(container, t, duration, props, utils) {
    const { spring, clamp } = utils;

    // Hard-cut exit in last 0.3s
    const exitT = duration - 0.3;
    let exitAlpha = 1;
    let exitY = 0;
    if (t > exitT) {
      const p = (t - exitT) / 0.3;
      exitY = -p * p * 70;
      exitAlpha = clamp(1 - p * 1.3, 0, 1);
    }

    // Badge & Title
    const badgeEl = container.querySelector('#ctBadge');
    const titleEl = container.querySelector('#ctTitle');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }
    if (titleEl) {
      const s = spring(Math.max(0, t - 0.12), 24, 0.7);
      titleEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      titleEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    // Window Spring
    const winEl = container.querySelector('#ctWindow');
    if (winEl) {
      const s = spring(Math.max(0, t - 0.2), 22, 0.75);
      winEl.style.opacity = (clamp((t - 0.15) / 0.15, 0, 1) * exitAlpha).toFixed(3);
      winEl.style.transform = `translateY(${((1 - s) * 40 + exitY).toFixed(1)}px) scale(${s.toFixed(3)})`;
    }

    // Blinking Cursor
    const cursorEl = container.querySelector('.ct-cursor');
    if (cursorEl) {
      cursorEl.style.opacity = Math.floor(t * 3.5) % 2 === 0 ? '1' : '0';
    }
  }
});
