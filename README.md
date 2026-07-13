# Personal Website v0

这是一个公开版个人网站草稿，当前重点是确认信息边界和视觉方向。项目已改为标准 Vite 静态站，可部署到 GitHub Pages 或 Netlify。

当前使用 React Router 的 `HashRouter` 实现点击式页面切换，不再把所有栏目长滚动排列在同一页。左侧导航会切换 Home / About / Works / Profile / Contact，页面支持中英文切换。

路由地址：

- Home：`/#/`
- About：`/#/about`
- Works：`/#/works`
- Profile：`/#/profile`
- Contact：`/#/contact`

## 内容原则

- 只放公开信息：个人公开介绍、作品、经历、能力、联系方式。
- 不放私密内容：学习笔记、阅读记录、电影音乐、旅行照片、随手想法、最近在做。
- 没有确认的内容全部保留为 `[待填写]` 占位，不编文案。
- “毕业”只作为可选时间节点，不作为主页身份叙事。

## 替换位置

主要内容在 `src/content.js`：

- `copy.zh.about.facts` / `copy.en.about.facts`：公开身份字段。
- `copy.zh.works.items` / `copy.en.works.items`：作品或项目占位。
- `copy.zh.profile.sections` / `copy.en.profile.sections`：公开经历、能力、奖项或证书。
- `YOUR_EMAIL@example.com`、GitHub、LinkedIn：联系方式。

路由配置在 `src/App.jsx`，共享导航在 `src/components/SiteLayout.jsx`，五个独立页面组件在 `src/pages/`，全局视觉系统在 `src/styles.css`。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物在 `dist/`。

## GitHub Pages

仓库推到 GitHub 后，`.github/workflows/deploy.yml` 会在 `main` 分支 push 后自动构建，并把 `dist/` 发布到 `gh-pages` 分支。

GitHub 仓库 `Settings -> Pages` 中应保持 `Deploy from a branch`，分支选择 `gh-pages`，目录选择 `/ (root)`。

`vite.config.js` 使用相对资源基址 `base: "./"`，因此站点部署在 `lordemaxwell.github.io/szny/` 这样的仓库子目录时，CSS 和 JavaScript 资源仍可正常加载。Hash 路由也允许直接刷新任意页面而不触发 GitHub Pages 404。

## Netlify

Netlify 连接同一个 GitHub 仓库即可，配置会自动读取 `netlify.toml`：

- Build command: `npm run build`
- Publish directory: `dist`
