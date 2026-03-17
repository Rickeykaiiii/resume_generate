# Resume Generate

一个基于 React 的在线简历生成器，支持实时编辑、预览和导出 PDF。

## 项目简介

这是一个现代化的简历制作工具，提供直观的可视化编辑界面，用户可以实时预览简历效果，并通过浏览器打印功能导出为 PDF 文件。

### 主要功能

- **实时编辑预览**：左侧编辑器，右侧实时预览，所见即所得
- **完整的简历模块**：
  - 基本信息（姓名、联系方式、头像、自定义字段）
  - 个人总结
  - 教育经历
  - 实习经历
  - 项目经历
  - 社团与组织经历
  - 荣誉奖项
  - 证书
  - 技能
  - 语言能力
- **灵活的内容管理**：
  - 每个模块可独立显示/隐藏（眼睛图标切换）
  - 支持强制分页（从新页面开始显示某个模块）
  - 富文本编辑支持（HTML 格式）
- **头像管理**：
  - 支持上传本地图片或使用外部 URL
  - 可调整头像尺寸和比例（正方形/原始比例）
- **数据导入导出**：
  - 导出为 JSON 格式保存数据
  - 导入 JSON 文件恢复简历内容
  - 智能合并导入数据
- **PDF 导出**：通过浏览器原生打印功能导出 PDF，完美支持现代 CSS 样式
- **A4 分页辅助**：可选显示 A4 分页参考线，帮助控制内容布局
- **QR Code 集成**：简历右上角自动生成个人网站二维码

## 技术栈

### 核心框架
- **React 19.2.0** - 最新的 React 版本，使用 Hooks 进行状态管理
- **Vite (rolldown-vite 7.2.5)** - 极速的前端构建工具

### UI 与样式
- **Tailwind CSS v4.1.18** - 现代化的原子化 CSS 框架
- **Lucide React** - 精美的图标库
- **Google Fonts (Noto Sans SC)** - 中文字体支持

### 其他依赖
- **html2pdf.js** - PDF 导出功能（当前使用浏览器原生打印）
- **ESLint** - 代码质量检查

### 开发工具
- **PostCSS + Autoprefixer** - CSS 后处理
- **@vitejs/plugin-react** - React 快速刷新支持

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 在 GitHub 仓库中，进入 `Settings` -> `Pages`
3. 将 `Source` 设置为 `Deploy from a branch`
4. 选择分支 `gh-pages`，文件夹选择 `/ (root)`
5. 推送到 `main` 分支或手动运行 `Deploy GitHub Pages` workflow

部署完成后，访问地址：
- `https://rickeykaiiii.github.io/resume_generate/`

## 项目特色

- **单文件架构**：核心逻辑集中在 `App.jsx`，便于理解和维护
- **响应式设计**：适配不同屏幕尺寸
- **打印优化**：专门优化的打印样式，确保 PDF 输出质量
- **无后端依赖**：纯前端应用，数据存储在浏览器本地
- **中文优化**：界面和字体针对中文用户优化

## 浏览器兼容性

推荐使用现代浏览器：
- Chrome / Edge (推荐)
- Firefox
- Safari

## License

MIT
