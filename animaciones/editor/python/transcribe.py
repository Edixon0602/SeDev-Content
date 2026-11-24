#!/usr/bin/env python3
"""Local faster-whisper transcription for the SeDev editor.

Writes one JSON document with text, language, segments and word timestamps.
Nothing is uploaded: the model runs on the local CPU and lives inside the
project (--model-dir). Exit codes:
  2 -> invalid arguments / unreadable audio
  3 -> faster_whisper is not installed
  4 -> transcription error
"""

import argparse
import json
import os
import sys
import traceback


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--audio", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--model", default="small")
    parser.add_argument("--model-dir", default="")
    parser.add_argument("--language", default="auto")
    parser.add_argument("--compute-type", default="int8")
    parser.add_argument("--device", default="cpu")
    parser.add_argument("--beam-size", type=int, default=5)
    parser.add_argument("--vad", action="store_true")
    return parser.parse_args()


def main():
    args = parse_args()
    if not os.path.isfile(args.audio):
        print(f"Audio no encontrado: {args.audio}", file=sys.stderr)
        return 2
    try:
        from faster_whisper import WhisperModel
    except Exception as exc:  # pragma: no cover - handled by Node wrapper
        print(
            "faster_whisper no está instalado en este intérprete. "
            "Ejecuta 'npm run edit:setup' en la raíz del proyecto.\n"
            f"Detalle: {exc}",
            file=sys.stderr,
        )
        return 3

    download_root = args.model_dir or None
    if download_root:
        os.makedirs(download_root, exist_ok=True)

    try:
        model = WhisperModel(
            args.model,
            device=args.device,
            compute_type=args.compute_type,
            download_root=download_root,
        )
        language = None if args.language in ("", "auto", "und") else args.language
        segments_iter, info = model.transcribe(
            args.audio,
            language=language,
            beam_size=max(1, args.beam_size),
            vad_filter=bool(args.vad),
            word_timestamps=True,
            condition_on_previous_text=False,
        )
    except Exception as exc:
        print(f"Error inicializando/ejecutando faster-whisper: {exc}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return 4

    segments = []
    words = []
    text_parts = []
    for index, segment in enumerate(segments_iter):
        seg_text = (segment.text or "").strip()
        if seg_text:
            text_parts.append(seg_text)
        seg_words = []
        for w in (segment.words or []):
            word = (w.word or "").strip()
            if not word:
                continue
            item = {
                "word": word,
                "start": round(float(w.start), 3),
                "end": round(float(w.end), 3),
            }
            probability = getattr(w, "probability", None)
            if probability is not None:
                item["probability"] = round(float(probability), 5)
            seg_words.append(item)
            words.append(item)
        segments.append(
            {
                "id": index,
                "text": seg_text,
                "start": round(float(segment.start), 3),
                "end": round(float(segment.end), 3),
                "words": seg_words,
            }
        )

    detected = getattr(info, "language", None) or args.language or "und"
    probability = getattr(info, "language_probability", None)
    payload = {
        "provider": "faster-whisper",
        "model": args.model,
        "device": args.device,
        "compute_type": args.compute_type,
        "language": detected,
        "language_probability": round(float(probability), 5) if probability is not None else None,
        "text": " ".join(text_parts).strip(),
        "segments": segments,
        "words": words,
        "meta": {
            "model": args.model,
            "device": args.device,
            "computeType": args.compute_type,
            "vad": bool(args.vad),
            "duration": round(float(getattr(info, "duration", 0.0) or 0.0), 3),
        },
    }
    os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)
    tmp = args.output + ".tmp"
    with open(tmp, "w", encoding="utf-8") as handle:
        json.dump(payload, handle, ensure_ascii=False, indent=2)
    os.replace(tmp, args.output)
    print(
        f"OK: {len(words)} palabras, {len(segments)} segmentos, idioma {detected}",
        file=sys.stderr,
    )
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        sys.exit(130)
