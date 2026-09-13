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

项目预览图放在 `public/projects/`，然后在对应项目中添加 `image: "/projects/文件名.webp"`。图片字段是可选的，没有填写时项目卡片保持无图布局。

项目区采用封面优先的作品卡片：封面展示项目预览，悬停时显示跳转按钮和项目详情；没有封面时会显示按 `accent` 配色生成的项目预览占位面。

GitHub 在线编辑 `src/content/site.ts` 后直接提交到 `main`，`.github/workflows/deploy.yml` 会自动构建并部署 Pages；新建或编辑 Issue 也会触发构建。首次使用前请在仓库 Settings → Actions → General 启用 Actions，并在 Settings → Pages 将 Source 设为 GitHub Actions。
