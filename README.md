# nuxt-exe-frontend

> 参考项目: https://github.com/paulbrickwell/wails-nuxt-template

![首页](./pngs/home.png)
## 一、项目背景（Background）

解决前端小工具部署痛点：将纯前端项目打包为 Windows 平台 exe 可执行文件，实现客户双击即用，无需复杂部署。
注意, 项目不支持在nuxt中写后端代码, 仅支持纯前端代码. server/api中的代码仅作为本地示例, 打包成exe无法使用.

## 二、技术选型（Technology Selection）

| 技术方案 | 打包体积 | 免安装 | 配置复杂度 | 结论 |
|---------|---------|--------|-----------|------|
| **WAILS** | 小 | ✅ 支持 | 简单 | ✅ **选用** |
| Tauri | 小巧 | ❌ 需安装 | 中等 | 增加客户使用成本 |
| NW.js / Electron | 较大 | ❌ 不支持 | 中等 | 不符合轻量化需求 |
| pkg / nexe | - | - | - | 未测试，暂不纳入 |

**选型理由**：WAILS 兼顾轻量化、免安装特性，适配 Windows 客户使用场景。

## 三、项目特性（Features）

- 前端转exe打包：支持将编写完成的前端项目（适配Nuxt框架）打包为Windows平台exe可执行文件，无需复杂部署，客户双击即可运行，极大降低分发和使用门槛。

- 搭配开源项目分发：集成开源项目 [UpgradeLink](https://www.toolsetlink.com/)，用于exe文件的下载与分发，为项目分发提供便捷支持。

- 轻量化免安装：基于WAILS框架特性，打包后的exe文件无需安装，直接双击启动，适配客户日常使用场景，兼顾便捷性与轻量化。

** 相关技术栈 ** :

- **前端框架** : Nuxt.js
- **UI框架** : Nuxt UI

## 四、环境要求

- Go 环境 + WAILS 工具：[安装文档](https://wails.io/zh-Hans/)
- Node.js 环境（npm/pnpm）
- 优先支持 Windows，兼顾 macOS/Linux

## 五、快速开始

```bash
# 克隆项目
git clone https://github.com/wodepig/nuxt-exe-frontend.git
cd nuxt-exe-frontend

# 开发模式
wails dev

# 打包 exe
wails build

# 单独开发前端
cd frontend
pnpm i
pnpm dev
```

打包完成后，exe 文件位于 `build/bin` 目录。

## 六、结合 UpgradeLink 分发

将打包后的 exe 文件上传至 [UpgradeLink](https://www.toolsetlink.com/) 开源项目，通过该项目提供的下载链接，即可便捷分发给客户使用。

### 自动上传配置

项目已集成 GitHub Action 自动上传功能，配置路径：`Settings -> Secrets and variables -> Actions -> Repository xxx`

**Secrets（加密）:**
| 名称 | 说明 |
|------|------|
| `UPGRADELINK_KEY` | type 对应的唯一 key |
| `UPGRADELINK_PWD` | 密码 |

**Variables（明文）:**
| 名称 | 说明 |
|------|------|
| `SC_KEY` | server 酱发送通知 key |
| `UPGRADELINK_TYPE` | 类型，如 file/url/tauri |
| `UPGRADELINK_USERNAME` | UpgradeLink 用户名 |
| `YUNMA_TOKEN` | 云码 token，用来自动登录 |

详细配置参考：[自动上传文件](https://github.com/wodepig/upgradelink-upload-xxdl)



## 七、项目结构（Project Structure）

```
# 项目核心目录结构（标注关键目录作用）
├── .github/           # GitHub Action工作流目录（自动打包配置）
│   └── workflows/
│       └── main.yml   # 自动打包工作流配置
├── build/             # 构建输出目录
│   ├── README.md
│   └── appicon.png    # 应用图标
├── frontend/          # 前端项目目录（Nuxt前端代码）
│   ├── app/           # Nuxt应用核心目录
│   │   ├── assets/    # 静态资源
│   │   │   └── css/
│   │   │       └── main.css
│   │   ├── components/# Vue组件
│   │   │   ├── ContentArea.vue
│   │   │   ├── LogPanel.vue
│   │   │   └── SidebarMenu.vue
│   │   ├── layout/    # 布局文件
│   │   │   └── default.vue
│   │   ├── pages/     # 页面路由
│   │   │   └── index.vue
│   │   └── app.vue    # 应用入口
│   ├── public/        # 公共静态资源
│   ├── server/        # 服务端API
│   ├── nuxt.config.ts # Nuxt配置文件
│   ├── package.json   # 前端依赖配置
│   └── tsconfig.json  # TypeScript配置
├── pngs/              # 截图/图片资源
├── scripts/           # 构建脚本
│   ├── build.sh
│   ├── build-windows.sh
│   ├── build-macos.sh
│   └── install-wails-cli.sh
├── app.go             # WAILS后端主程序
├── main.go            # Go程序入口
├── go.mod             # Go模块依赖
├── wails.json         # WAILS配置文件
├── package.json       # 项目根目录配置
└── README.md          # 项目说明文档
```

## 八、常见问题（FAQ）

- Q：执行 `wails dev/build` 命令报错？
A：检查 Go 环境与 WAILS 工具是否正常安装（通过 `go version`、`wails doctor` 验证），同时确认前端依赖已安装完成。

- Q：打包后的 exe 文件无法启动？
A：确保打包环境为 Windows 系统，同时检查项目 `wails.json` 配置是否正确，无语法错误。

## 九、贡献指南（Contributing）

1.  Fork 本项目仓库；

2.  创建新的分支（git checkout -b feature/xxx）；

3.  提交代码修改（git commit -m "feat: 新增xxx功能"）；

4.  推送至分支（git push origin feature/xxx）；

5.  提交 Pull Request，等待审核。

## 十、许可证（License）

MIT License © 2026 wodepig

## 十一、联系方式（Contact）

GitHub：[https://github.com/wodepig](https://github.com/wodepig)
如有问题，可通过 GitHub Issues 留言沟通。
