#!/usr/bin/env python3
"""Prepare (download) a faster-whisper model inside the project model directory.

No audio is transcribed here. `npm run edit:setup -- --prepare-model` uses this
so the first real run can work offline. The model files remain under
animaciones/editor/.models.
"""

import argparse
import os
import sys


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", default="small")
    parser.add_argument("--model-dir", required=True)
    parser.add_argument("--compute-type", default="int8")
    args = parser.parse_args()
    os.makedirs(args.model_dir, exist_ok=True)
    try:
        from faster_whisper import WhisperModel
    except Exception as exc:
        print(f"faster_whisper no disponible: {exc}", file=sys.stderr)
        return 3
    try:
        WhisperModel(
            args.model,
            device="cpu",
            compute_type=args.compute_type,
            download_root=args.model_dir,
        )
    except Exception as exc:
        print(f"No se pudo preparar el modelo {args.model}: {exc}", file=sys.stderr)
        return 4
    print(f"Modelo {args.model} listo en {args.model_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
