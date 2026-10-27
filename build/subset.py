"""Reduz uma fonte aos caracteres usados e devolve woff2 em base64.

uso: python subset.py <fonte.ttf> [peso] < texto
Fontes variáveis são instanciadas no peso pedido antes de reduzir.
"""
import base64, io, sys
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options
from fontTools.varLib import instancer

path = sys.argv[1]
weight = float(sys.argv[2]) if len(sys.argv) > 2 else None
text = sys.stdin.buffer.read().decode("utf-8")

font = TTFont(path)
if "fvar" in font:
    font = instancer.instantiateVariableFont(font, {"wght": weight or 400})

opts = Options()
opts.flavor = "woff2"
opts.layout_features = ["kern", "liga", "palt"]
opts.name_IDs = []
opts.notdef_outline = True
sub = Subsetter(opts)
sub.populate(text=text + " ")
sub.subset(font)

buf = io.BytesIO()
font.flavor = "woff2"
font.save(buf)
sys.stdout.write(base64.b64encode(buf.getvalue()).decode("ascii"))
