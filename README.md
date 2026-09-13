# profile.yangzx1.xyz

Deployment is managed by GitHub Actions and publishes the Vite `dist` artifact to GitHub Pages.

Vite + React 个人技术主页：项目档案、技术能力、开源活动和联系方式。

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 修改页面内容

项目介绍和技术栈统一维护在 `src/content/site.ts`：修改 `projects` 更新项目卡片，修改 `skills` 更新技术栈和进度百分比。保存后执行 `npm run build`，推送到 `main` 即可发布。
