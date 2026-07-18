# SZnY

SZnY 的双语个人网站，采用手绘、极简和多页面结构。

在线地址：<https://lordemaxwell.github.io/szny/>

## 页面

- `index.html`：首页
- `about.html`：个人介绍、教育经历和实习状态
- `works.html`：公开项目
- `talks.html`：论文动态、想法与感悟
- `contact.html`：公开联系方式

## 技术栈

- Vanilla HTML、CSS、JavaScript
- 中英文切换，语言偏好保存在 `localStorage`
- 共享导航通过 `fetch` 注入
- GitHub Pages 静态部署

## 本地预览

共享导航需要 HTTP 环境，不能直接用 `file://` 打开：

```powershell
D:\Python\Python311\python.exe -m http.server 8000
```

然后访问 <http://127.0.0.1:8000/>。

## 检查与构建

```powershell
npm run check
D:\Python\Python311\python.exe scripts\prepare_pages.py
```

`scripts/prepare_pages.py` 会生成适配 `/szny/` 子路径的 `_site` 目录。

## 联系

- Email: <2955648038@qq.com>
- Instagram: <https://www.instagram.com/luxurmaybe/>
- GitHub: <https://github.com/lordemaxwell>

本项目的上游来源和仍在使用的第三方视觉资源见 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)。
