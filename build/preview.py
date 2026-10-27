"""Fotografa os SVGs em vários instantes da animação (e com movimento reduzido).

uso: python build/preview.py <saida> <arquivo.svg> [instantes...]
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

out = pathlib.Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
svg = pathlib.Path(sys.argv[2]).resolve()
times = [float(t) for t in sys.argv[3:]] or [6.0]
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

html = f"""<html><body style="margin:0;background:#888">
<img id="i" src="{svg.as_uri()}" style="display:block;width:1200px"></body></html>"""
page_file = out / "_preview.html"; page_file.write_text(html, encoding="utf-8")

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=CHROME)
    for t in times:
        pg = b.new_page(viewport={"width": 1200, "height": 800})
        pg.goto(page_file.as_uri()); pg.wait_for_timeout(int(t * 1000))
        pg.locator("#i").screenshot(path=str(out / f"{svg.stem}@{t}s.png"))
        pg.close()
    pg = b.new_page(viewport={"width": 1200, "height": 800}, reduced_motion="reduce")
    pg.goto(page_file.as_uri()); pg.wait_for_timeout(300)
    pg.locator("#i").screenshot(path=str(out / f"{svg.stem}@reduced.png"))
    b.close()
print("ok")
