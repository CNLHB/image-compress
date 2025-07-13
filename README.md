# 图片压缩工具

一个基于Web的图片压缩应用，支持多种图片格式压缩、批量处理和ZIP打包下载。

## 功能特点
- 📁 支持批量上传图片
- ⚙️ 可调整压缩质量和尺寸
- 🔍 实时预览压缩效果
- 📦 批量压缩后ZIP打包下载
- 📱 响应式设计，适配各种设备

## 技术栈
- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS v3
- **图片压缩**: browser-image-compression
- **ZIP打包**: jszip
- **部署**: Docker + Nginx

## 安装步骤

### 本地开发
1. 克隆仓库
```bash
git clone <仓库地址>
cd imageCompress1
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 访问 http://localhost:8080

### Docker部署
1. 构建镜像
```bash
docker build -t image-compress-app .
```

2. 启动容器
```bash
docker-compose up -d
```

3. 访问 http://localhost:8080

## 使用方法
1. 点击上传区域或拖拽图片到上传框
2. 调整压缩参数（质量、宽度）
3. 点击"压缩图片"按钮
4. 查看压缩前后对比
5. 单个下载或批量打包下载

## 项目结构
```
imageCompress1/
├── public/           # 静态资源
├── src/
│   ├── components/   # 组件
│   ├── js/           # 工具函数
│   ├── css/          # 样式文件
│   ├── App.vue       # 主应用
│   └── main.ts       # 入口文件
├── Dockerfile        # Docker构建文件
├── docker-compose.yml # Docker编排文件
└── nginx.conf        # Nginx配置
```

## 许可证
MIT
