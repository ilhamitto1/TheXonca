# -*- coding: utf-8 -*-
"""Organize root collection media into public/collections."""
from __future__ import annotations

import re
import shutil
from pathlib import Path

from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

ROOT = Path(__file__).resolve().parents[1]
ELIZ_DIR = ROOT / "public" / "collections" / "elizabeth"
SAH_DIR = ROOT / "public" / "collections" / "sahzade"


def save_jpeg(src: Path, dest: Path) -> None:
    img = Image.open(src)
    if img.mode != "RGB":
        img = img.convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=92, optimize=True)


def main() -> None:
    ELIZ_DIR.mkdir(parents=True, exist_ok=True)
    SAH_DIR.mkdir(parents=True, exist_ok=True)

    files = [f for f in ROOT.iterdir() if f.is_file()]

    for f in files:
        if "elizabeth" in f.name.lower() and f.suffix.lower() in {".jpeg", ".jpg", ".png", ".heic", ".heif", ".webp"}:
            save_jpeg(f, ELIZ_DIR / "01.jpg")
            print(f"Elizabeth -> {ELIZ_DIR / '01.jpg'}")
            break

    sah_items: list[tuple[int, Path]] = []
    for f in files:
        m = re.search(r"(?i)(?:[sş]ahzad[eə]|sahzade)(\d+)", f.name)
        if m:
            sah_items.append((int(m.group(1)), f))

    sah_items.sort(key=lambda x: x[0])
    print("Sahzade count:", len(sah_items))

    for num, f in sah_items:
        ext = f.suffix.lower().lstrip(".")
        if ext in {"heic", "heif", "jpeg", "jpg", "png", "webp"}:
            dest = SAH_DIR / f"{num:02d}.jpg"
            save_jpeg(f, dest)
            print(f"image {num} -> {dest.name}")
        elif ext == "mp4":
            dest = SAH_DIR / f"{num:02d}.mp4"
            dest.write_bytes(f.read_bytes())
            print(f"video {num} -> {dest.name}")
        else:
            print(f"skip {f.name}")

    # Remove originals from project root after successful organize
    media_ext = {".jpeg", ".jpg", ".png", ".heic", ".heif", ".webp", ".mp4"}
    for f in files:
        if f.suffix.lower() not in media_ext:
            continue
        low = f.name.lower().replace(" ", "")
        if "elizabethcollection" in low or "collection" in low and (
            "sahzad" in low or "şahzadə" in f.name.lower() or "şahzade" in f.name.lower()
        ):
            f.unlink(missing_ok=True)
            print("removed root media")
        elif re.search(r"(?i)[sş]ahzad[eə]?\d+collection", f.name.replace(" ", "")):
            f.unlink(missing_ok=True)
            print("removed root media")

    print("--- elizabeth ---")
    for p in sorted(ELIZ_DIR.iterdir()):
        print(p.name, p.stat().st_size)
    print("--- sahzade ---")
    for p in sorted(SAH_DIR.iterdir()):
        print(p.name, p.stat().st_size)


if __name__ == "__main__":
    main()
