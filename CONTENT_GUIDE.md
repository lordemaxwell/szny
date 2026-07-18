# 内容维护指南

日常更新只需要修改 `content/`。不要直接编辑 `_site/`，它是构建脚本生成的发布目录。

## 修改 About、Works、Contact

打开 [`content/site.json`](content/site.json)：

- `about.bio`：个人介绍，每一项显示为一个段落。
- `about.education`：教育经历。
- `about.internship`：实习经历。
- `works`：项目列表。
- `talks.intro`：Talks 页面顶部说明。
- `talks.tags`：文章标签及其中英文名称。
- `contact`：邮箱和公开社交链接。

含有 `zh` 和 `en` 的字段分别对应中文与英文。修改后注意保留 JSON 的逗号、双引号和括号。

### 添加一个项目

在 `works` 数组中增加：

```json
{
  "title": "project-name",
  "url": "https://example.com",
  "description": {
    "zh": "中文简介",
    "en": "english description"
  },
  "meta": {
    "zh": "2026 年 7 月 · 网页",
    "en": "july 2026 · web"
  }
}
```

## 添加一篇 Talk

在 `content/talks/` 新建一个 Markdown。文件名必须是：

```text
YYYY-MM-DD-lowercase-slug.md
```

例如：

```text
2026-07-18-life-is-brief.md
```

模板：

```markdown
---
date: 2026-07-18
tags: reflections
title_zh: 中文标题
title_en: english title
summary_zh: 中文摘要
summary_en: english summary
---

<!-- zh -->

中文正文。

<!-- en -->

English body.
```

规则：

- 文件名开头日期必须和 `date` 一致。
- 多个标签用英文逗号分隔，例如 `tags: papers, ideas`。
- 标签名称建议先在 `content/site.json` 的 `talks.tags` 中登记。
- `title_en`、`summary_en` 和 `<!-- en -->` 后的正文可以暂时不写；构建时会回退到中文。
- 不需要创建 `posts.json`，也不需要分别创建 `.zh.md` 和 `.en.md`。

## 发布

可以直接在 GitHub 网页编辑 `content/` 中的文件。提交到 `main` 后，GitHub Actions 会自动：

1. 检查内容格式。
2. 扫描所有 Talk。
3. 生成文章索引和中英文正文。
4. 处理 `/szny/` 子路径。
5. 发布到 GitHub Pages。

如果构建失败，进入仓库的 Actions 页面查看错误。脚本会指出具体文件和缺失字段。
