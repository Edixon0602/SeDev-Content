// Dynamic Word-by-Word Kinetic Caption Renderer
// Renders high-retention synchronized captions with keyword highlighting

(function(global) {
  const Captions = {
    // Break voiceover into timed words based on phonetic weight
    computeWordTimings(text, startTime = 0, duration = 5.0) {
      if (!text) return [];
      const rawWords = text.trim().split(/\s+/).filter(Boolean);
      if (rawWords.length === 0) return [];

      // Weight words by length and syllable count
      const weights = rawWords.map(w => Math.max(1, w.length * 0.15 + (/[aeiouáéíóú]/gi.test(w) ? 1 : 0.5)));
      const totalWeight = weights.reduce((a, b) => a + b, 0);

      // Usable speech window (90% of duration to leave breathing air)
      const speechDuration = duration * 0.9;
      let cur = startTime;

      return rawWords.map((word, idx) => {
        const wordDur = (weights[idx] / totalWeight) * speechDuration;
        const wStart = cur;
        const wEnd = cur + wordDur;
        cur = wEnd;

        // Is this a punchy keyword? (numbers, currency, uppercase, or critical words)
        const isHighlight = /\$|\d|minutos|caída|error|pago|servidor|semana|costó|rot|bug/i.test(word);

        return {
          word,
          start: wStart,
          end: wEnd,
          isHighlight
        };
      });
    },

    // Subtitle rendering disabled (user adds subtitles externally in post-production)
    render() {}
  };

  global.RigCaptions = Captions;
})(typeof window !== 'undefined' ? window : global);
