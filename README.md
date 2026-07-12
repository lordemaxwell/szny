# Personal Website v0

这是一个公开版个人网站草稿，当前重点是确认信息边界和视觉方向。

## 内容原则

- 只放公开信息：个人公开介绍、作品、经历、能力、联系方式。
- 不放私密内容：学习笔记、阅读记录、电影音乐、旅行照片、随手想法、最近在做。
- 没有确认的内容全部保留为 `[待填写]` 占位，不编文案。
- “毕业”只作为可选时间节点，不作为主页身份叙事。

## 替换位置

主要内容在 `app/page.js`：

- `profileFacts`：公开身份字段。
- `works`：作品或项目占位。
- `publicSections`：公开经历、能力、奖项或证书。
- `YOUR_EMAIL@example.com`、GitHub、LinkedIn：联系方式。

全局视觉系统在 `app/globals.css`。

## 本地运行

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
```

`npm run build` 使用 vinext 生成 Sites 可部署的 `dist/server/index.js`，并复制 `.openai/hosting.json` 到 `dist/.openai/hosting.json`。
