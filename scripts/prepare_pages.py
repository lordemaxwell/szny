from __future__ import annotations

import argparse
import json
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
TALKS_SOURCE = CONTENT / "talks"

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
    "content/",
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
SLUG_RE = re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9-]+$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ZH_MARKER = "<!-- zh -->"
EN_MARKER = "<!-- en -->"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build the static SZnY site.")
    parser.add_argument(
        "--base",
        default="/szny",
        help="Deployment base path, for example /szny. Use an empty string for local preview.",
    )
    parser.add_argument("--output", default="_site", help="Output directory relative to the repository root.")
    return parser.parse_args()


def normalize_base(value: str) -> str:
    value = value.strip()
    if not value or value == "/":
        return ""
    if not value.startswith("/"):
        raise ValueError("--base must be empty or start with '/'")
    return value.rstrip("/")


def copy_site(output: Path) -> None:
    if output.exists():
        shutil.rmtree(output)
    output.mkdir(parents=True)

    for filename in PUBLISH_FILES:
        shutil.copy2(ROOT / filename, output / filename)

    for dirname in PUBLISH_DIRECTORIES:
        shutil.copytree(ROOT / dirname, output / dirname)

    content_output = output / "content"
    content_output.mkdir()
    site_data = json.loads((CONTENT / "site.json").read_text(encoding="utf-8"))
    (content_output / "site.json").write_text(
        json.dumps(site_data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )


def parse_front_matter(path: Path) -> tuple[dict[str, str], str]:
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValueError(f"{path.relative_to(ROOT)}: missing opening front matter delimiter")
    try:
        closing = next(index for index in range(1, len(lines)) if lines[index].strip() == "---")
    except StopIteration as error:
        raise ValueError(f"{path.relative_to(ROOT)}: missing closing front matter delimiter") from error

    metadata: dict[str, str] = {}
    for line_number, line in enumerate(lines[1:closing], start=2):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise ValueError(f"{path.relative_to(ROOT)}:{line_number}: expected 'key: value'")
        key, value = line.split(":", 1)
        metadata[key.strip()] = value.strip()

    body = "\n".join(lines[closing + 1 :]).strip()
    return metadata, body


def split_languages(body: str) -> tuple[str, str]:
    if ZH_MARKER in body:
        body = body.split(ZH_MARKER, 1)[1]
    if EN_MARKER in body:
        zh_body, en_body = body.split(EN_MARKER, 1)
    else:
        zh_body, en_body = body, ""
    zh_body = zh_body.strip()
    en_body = en_body.strip() or zh_body
    return zh_body + "\n", en_body + "\n"


def parse_tags(raw: str) -> list[str]:
    raw = raw.strip().strip("[]")
    if not raw:
        return []
    return [tag.strip().strip("'\"") for tag in raw.split(",") if tag.strip()]


def generate_talks(output: Path) -> None:
    posts: list[dict[str, object]] = []
    seen_slugs: set[str] = set()
    talks_output = output / "talks"

    for source in sorted(TALKS_SOURCE.glob("*.md")):
        slug = source.stem
        if not SLUG_RE.fullmatch(slug):
            raise ValueError(f"{source.relative_to(ROOT)}: filename must be YYYY-MM-DD-lowercase-slug.md")
        if slug in seen_slugs:
            raise ValueError(f"duplicate talk slug: {slug}")
        seen_slugs.add(slug)

        metadata, body = parse_front_matter(source)
        date = metadata.get("date", "")
        title_zh = metadata.get("title_zh", "")
        title_en = metadata.get("title_en", "") or title_zh
        summary_zh = metadata.get("summary_zh", "")
        summary_en = metadata.get("summary_en", "") or summary_zh
        if not DATE_RE.fullmatch(date):
            raise ValueError(f"{source.relative_to(ROOT)}: date must be YYYY-MM-DD")
        if not slug.startswith(date + "-"):
            raise ValueError(f"{source.relative_to(ROOT)}: filename date must match front matter date")
        if not title_zh:
            raise ValueError(f"{source.relative_to(ROOT)}: title_zh is required")

        zh_body, en_body = split_languages(body)
        (talks_output / f"{slug}.zh.md").write_text(zh_body, encoding="utf-8", newline="\n")
        (talks_output / f"{slug}.en.md").write_text(en_body, encoding="utf-8", newline="\n")
        posts.append(
            {
                "slug": slug,
                "date": date,
                "tags": parse_tags(metadata.get("tags", "")),
                "title": {"zh": title_zh, "en": title_en},
                "summary": {"zh": summary_zh, "en": summary_en},
            }
        )

    posts.sort(key=lambda post: str(post["date"]), reverse=True)
    (talks_output / "posts.json").write_text(
        json.dumps(posts, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )


def add_pages_prefix(text: str, base: str) -> str:
    for static_root in STATIC_ROOTS:
        destination = f"{base}/{static_root}" if base else f"/{static_root}"
        text = text.replace(f'"/{static_root}', f'"{destination}')
        text = text.replace(f"'/{static_root}", f"'{destination}")

    site_root = f"{base}/" if base else "/"
    text = text.replace('"start_url": "/"', f'"start_url": "{site_root}"')
    text = text.replace('"scope": "/"', f'"scope": "{site_root}"')
    return text


def rewrite_static_paths(output: Path, base: str) -> None:
    for path in output.rglob("*"):
        if path.is_file() and path.suffix.lower() in TEXT_SUFFIXES:
            original = path.read_text(encoding="utf-8")
            rewritten = add_pages_prefix(original, base)
            path.write_text(rewritten, encoding="utf-8", newline="\n")

    (output / ".nojekyll").touch()


def main() -> None:
    args = parse_args()
    base = normalize_base(args.base)
    output = (ROOT / args.output).resolve()
    if output == ROOT or ROOT not in output.parents:
        raise ValueError("--output must stay inside the repository")
    copy_site(output)
    generate_talks(output)
    rewrite_static_paths(output, base)
    print(f"built {output.relative_to(ROOT)} with base {base or '/'}")


if __name__ == "__main__":
    main()
