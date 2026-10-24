// Component: code_terminal
// Code editor with syntax styling and terminal execution output.

window.registerComponent('code_terminal', {
  init(container, props) {
    container.innerHTML = `
      <div class="comp-code-terminal">
        ${props.badge ? `<div class="ct-badge" id="ctBadge">${props.badge}</div>` : ''}
        
        <!-- IDE Window -->
        <div class="ct-window" id="ctWindow">
          <div class="ct-titlebar">
            <div class="ct-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <div class="ct-filename">${props.filename || 'server.c'}</div>
            <div class="ct-lang">${props.lang || 'C'}</div>
          </div>
          <div class="ct-editor" id="ctEditor">
            ${(props.codeLines || []).map((line, i) => `
              <div class="ct-line ${line.highlight ? 'highlight' : ''}" id="ctLine_${i}">
                <span class="ct-linenum">${String(i + 1).padStart(2, '0')}</span>
                <span class="ct-linetext">${this.colorize(line.text)}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Terminal Output Box -->
        ${props.terminal ? `
          <div class="ct-terminal" id="ctTerminal">
            <div class="term-bar">
              <span class="term-title">TERMINAL // SHELL</span>
              <span class="term-status">RUNNING</span>
            </div>
            <div class="term-body">
              <div class="term-cmd">
                <span class="prompt">$</span>
                <span class="cmd-text" id="termCmd">${props.terminal.command || ''}</span>
              </div>
              <div class="term-out" id="termOut">${props.terminal.output || ''}</div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  },

  colorize(text) {
    let t = text;
    // 1. Preserve comments
    const comments = [];
    t = t.replace(/\/\/.*$/g, (m) => {
      comments.push(m);
      return `___COMM_${comments.length - 1}___`;
    });

    // 2. Preserve string literals
    const strings = [];
    t = t.replace(/".*?"/g, (m) => {
      strings.push(m);
      return `___STR_${strings.length - 1}___`;
    });

    // 3. Keywords
    t = t.replace(/\b(int|void|char|struct|aeEventLoop|while|return|if|for)\b/g, '<span class="kw">$1</span>');

    // 4. Function calls
    t = t.replace(/\b([a-zA-Z0-9_]+)(?=\()/g, '<span class="fn">$1</span>');

    // Restore strings and comments safely
    t = t.replace(/___STR_(\d+)___/g, (_, i) => `<span class="str">${strings[i]}</span>`);
    t = t.replace(/___COMM_(\d+)___/g, (_, i) => `<span class="comm">${comments[i]}</span>`);
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

    // Badge
    const badgeEl = container.querySelector('#ctBadge');
    if (badgeEl) {
      const s = spring(Math.max(0, t - 0.05), 24, 0.7);
      badgeEl.style.opacity = (clamp(t / 0.1, 0, 1) * exitAlpha).toFixed(3);
      badgeEl.style.transform = `translateY(${((1 - s) * -20 + exitY).toFixed(1)}px)`;
    }

    // Window spring entrance
    const winEl = container.querySelector('#ctWindow');
    if (winEl) {
      const dt = t - 0.12;
      if (dt < 0) {
        winEl.style.opacity = '0';
        winEl.style.transform = 'translateY(40px) scale(0.95)';
      } else {
        const s = spring(dt, 24, 0.65);
        winEl.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        winEl.style.transform = `translateY(${((1 - s) * 40 + exitY).toFixed(1)}px) scale(${(0.95 + 0.05 * s).toFixed(3)})`;
      }
    }

    // Staggered reveal of code lines
    (props.codeLines || []).forEach((_, i) => {
      const lineEl = container.querySelector(`#ctLine_${i}`);
      if (!lineEl) return;
      const startT = 0.30 + i * 0.12;
      const dt = t - startT;
      if (dt < 0) {
        lineEl.style.opacity = '0';
        lineEl.style.transform = 'translateX(-12px)';
      } else {
        const s = spring(dt, 26, 0.7);
        lineEl.style.opacity = (clamp(dt / 0.06, 0, 1) * exitAlpha).toFixed(3);
        lineEl.style.transform = `translateX(${((1 - s) * -12).toFixed(1)}px)`;
      }
    });

    // Terminal reveal and typing
    const termEl = container.querySelector('#ctTerminal');
    if (termEl) {
      const startTerm = 0.30 + (props.codeLines || []).length * 0.12 + 0.2;
      const dt = t - startTerm;
      if (dt < 0) {
        termEl.style.opacity = '0';
        termEl.style.transform = 'translateY(30px)';
      } else {
        const s = spring(dt, 24, 0.65);
        termEl.style.opacity = (clamp(dt / 0.08, 0, 1) * exitAlpha).toFixed(3);
        termEl.style.transform = `translateY(${((1 - s) * 30 + exitY).toFixed(1)}px)`;

        // Stream terminal output
        const outEl = container.querySelector('#termOut');
        if (outEl) {
          const outProgress = clamp((dt - 0.3) / 0.6, 0, 1);
          outEl.style.opacity = outProgress.toFixed(2);
        }
      }
    }
  }
});
