# profile.yangzx1.xyz

Vite + React 个人技术主页：项目档案、GitHub Issues 文章、标签筛选和 Giscus 评论入口。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建时读取仓库中带有 `blog` 标签的 GitHub Issues；API 不可用时使用 `src/data/issues.json` 缓存。

## Giscus

在 GitHub 仓库启用 Discussions 和 Giscus 应用，并在 Actions Variables 配置 `VITE_GISCUS_REPO_ID`、`VITE_GISCUS_CATEGORY_ID`。
