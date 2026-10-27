"""Folha de contato: todas as peças sobre o fundo real do GitHub (escuro e claro).

uso: python build/sheet.py <saida> [segundos]
"""
import sys, pathlib
from playwright.sync_api import sync_playwright

out = pathlib.Path(sys.argv[1]); out.mkdir(parents=True, exist_ok=True)
wait = float(sys.argv[2]) if len(sys.argv) > 2 else 6
assets = pathlib.Path(__file__).resolve().parent.parent / "assets"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
GH = {"dark": "#0d1117", "light": "#ffffff"}

def img(name, theme, w=None):
    style = f"width:{w}px" if w else ""
    return f'<img src="{(assets / f"{name}-{theme}.svg").as_uri()}" style="{style};margin:4px">'

with sync_playwright() as p:
    b = p.chromium.launch(executable_path=CHROME)
    for theme, bg in GH.items():
        html = f"""<html><body style="margin:0;padding:16px;background:{bg};width:1012px">
        {img('hero', theme, 1000)}
        <div>{img('btn-email', theme)}{img('btn-linkedin', theme)}{img('btn-live', theme)}{img('btn-oss', theme)}</div>
        {img('divider', theme, 1000)}
        <div>{''.join(img(f'kamon-{k}', theme, 48) for k in ['retail','fintech','entertainment','platforms'])}</div>
        {img('stack', theme, 1000)}
        {img('offduty', theme, 1000)}
        {img('footer', theme, 1000)}
        </body></html>"""
        f = out / f"_sheet-{theme}.html"; f.write_text(html, encoding="utf-8")
        pg = b.new_page(viewport={"width": 1044, "height": 2600})
        pg.goto(f.as_uri()); pg.wait_for_timeout(int(wait * 1000))
        pg.screenshot(path=str(out / f"sheet-{theme}.png"), full_page=True)
        pg.close()
    b.close()
print("ok")
