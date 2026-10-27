"""Vetoriza as artes da IA (assets/src/ai/*.png) em assets/src/vector/*.svg.

Etapas (docs/ESCOPO-RYUMON.md §9): limiar 50% → recorte → vtracer (binário, spline).
As folhas com várias peças (kamon, nuvens) são recortadas numa grade e cada
célula é aparada ao contorno da tinta.

uso: python build/vectorize.py [id ...]     (requer: pip install vtracer pillow)
"""
import sys, pathlib, tempfile
from PIL import Image
import vtracer

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, OUT = ROOT / "assets/src/ai", ROOT / "assets/src/vector"

# id → (arquivo, largura de trabalho, grade (colunas, linhas) ou None, nomes das células)
JOBS = {
    "wave": ("A-hero-wave.png", 1800, None, None),
    "dragon": ("B-dragon.png", 1600, None, None),
    "dragon-sm": ("B-dragon.png", 760, None, None),  # rodapé: aparece com ~480 px
    "koi": ("C-koi-waterfall.png", 900, None, None),
    "clouds": ("D-clouds-set.png", 1536, (2, 3), ["c1", "c2", "c3", "c4", "c5", "c6"]),
    "mountain": ("E-mountain-trail.png", 1400, None, None),
    "kamon": ("F-kamon-set.png", 640, (2, 2), ["retail", "fintech", "entertainment", "platforms"]),
}


def ink(img, width):
    """Escala para a largura de trabalho e aplica o limiar de 50% (1 = tinta)."""
    img = img.convert("L")
    if img.width != width:
        img = img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)
    return img.point(lambda v: 0 if v < 128 else 255, "L")


def trim(img, pad=4):
    """Apara ao retângulo da tinta, com uma pequena margem."""
    box = Image.eval(img, lambda v: 255 - v).getbbox()
    if not box:
        return img
    l, t, r, b = box
    return img.crop((max(l - pad, 0), max(t - pad, 0), min(r + pad, img.width), min(b + pad, img.height)))


def trace(img, out):
    with tempfile.TemporaryDirectory() as d:
        tmp = pathlib.Path(d) / "in.png"
        img.convert("RGB").save(tmp)
        vtracer.convert_image_to_svg_py(
            str(tmp), str(out), colormode="binary", mode="spline",
            filter_speckle=6, corner_threshold=60, length_threshold=4.0,
            splice_threshold=45, path_precision=1,
        )
    print(f"{out.relative_to(ROOT)}  {img.width}×{img.height}  {out.stat().st_size / 1024:.0f} KB")


def main(only):
    OUT.mkdir(parents=True, exist_ok=True)
    for key, (file, width, grid, names) in JOBS.items():
        if only and key not in only:
            continue
        img = ink(Image.open(SRC / file), width)
        if not grid:
            trace(trim(img), OUT / f"{key}.svg")
            continue
        cols, rows = grid
        cw, ch = img.width / cols, img.height / rows
        for i, name in enumerate(names):
            c, rr = i % cols, i // cols
            cell = img.crop((round(c * cw), round(rr * ch), round((c + 1) * cw), round((rr + 1) * ch)))
            trace(trim(cell), OUT / f"{key}-{name}.svg")


if __name__ == "__main__":
    main(sys.argv[1:])
