# SZnY

SZnY 的双语手绘个人网站。内容与页面代码已经分离，日常维护主要在 `content/` 中完成。

在线地址：<https://lordemaxwell.github.io/szny/>

## 日常需要关注的文件

```text
content/
├── site.json                         # About、Works、Talks 说明、Contact
└── talks/
    └── YYYY-MM-DD-slug.md            # 一篇 Talk 对应一个文件

assets/                               # 字体与插图
css/style.css                         # 视觉样式
js/                                   # 页面行为与内容渲染
scripts/prepare_pages.py              # 构建与 Talks 索引生成
```

添加文章或修改个人资料时，先阅读 [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md)。

## 技术栈

- Vanilla HTML、CSS、JavaScript
- `content/site.json` 驱动 About、Works 和 Contact
- 单 Markdown 驱动 Talks，构建时自动生成文章索引与双语正文
- GitHub Pages + GitHub Actions 自动部署

## 检查

```powershell
D:\NodeJS\npm.cmd test
D:\Python\Python311\python.exe scripts\prepare_pages.py --base /szny
```

## 本地预览

```powershell
D:\Python\Python311\python.exe scripts\prepare_pages.py --base / --output output/local-site
D:\Python\Python311\python.exe -m http.server 8000 --directory output/local-site
```

然后访问 <http://127.0.0.1:8000/>。

推送到 `main` 后，GitHub Actions 会自动构建并更新 GitHub Pages。

本项目的上游来源和仍在使用的第三方视觉资源见 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)。
