from __future__ import annotations

import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "_site"
PAGES_PREFIX = "/szny"

PUBLISH_FILES = (
    "index.html",
    "about.html",
    "works.html",
    "talks.html",
    "contact.html",
)

PUBLISH_DIRECTORIES = (
    "assets",
    "css",
    "js",
    "partials",
    "talks",
)

STATIC_ROOTS = (
    "assets/",
    "css/",
    "js/",
    "partials/",
    "index.html",
    "about.html",
    "works.html",
    "talks.html",
    "talks/",
    "contact.html",
)

TEXT_SUFFIXES = {".html", ".js", ".css", ".json", ".webmanifest"}
VERCEL_ANALYTICS = '<script defer src="/_vercel/insights/script.js"></script>'


def copy_site() -> None:
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()

    for filename in PUBLISH_FILES:
        shutil.copy2(ROOT / filename, OUTPUT / filename)

    for dirname in PUBLISH_DIRECTORIES:
        shutil.copytree(ROOT / dirname, OUTPUT / dirname)


def add_pages_prefix(text: str) -> str:
    text = text.replace(VERCEL_ANALYTICS, "")

    for static_root in STATIC_ROOTS:
        text = text.replace(f'"/{static_root}', f'"{PAGES_PREFIX}/{static_root}')
        text = text.replace(f"'/{static_root}", f"'{PAGES_PREFIX}/{static_root}")

    text = text.replace('"start_url": "/"', f'"start_url": "{PAGES_PREFIX}/"')
    text = text.replace('"scope": "/"', f'"scope": "{PAGES_PREFIX}/"')
    return text


def rewrite_static_paths() -> None:
    for path in OUTPUT.rglob("*"):
        if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
            original = path.read_text(encoding="utf-8")
            rewritten = add_pages_prefix(original)
            path.write_text(rewritten, encoding="utf-8", newline="\n")

    (OUTPUT / ".nojekyll").touch()


if __name__ == "__main__":
    copy_site()
    rewrite_static_paths()
