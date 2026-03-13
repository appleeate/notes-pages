# 7 年前端 Vue 工程师面试大纲（2026 年版）

> 定位：7 年经验 | Vue 3 专家 | 全栈能力 | 架构思维

---

## 一、Vue 3 核心深度（必考）

### 1.1 Composition API
- [ ] setup() 语法糖 vs 选项式 API
- [ ] ref / reactive / toRef / toRefs
- [ ] computed / watch / watchEffect
- [ ] 生命周期钩子（onMounted / onUpdated / onUnmounted 等）
- [ ] provide / inject
- [ ] 组合式函数（Composables）编写与复用
- [ ] 逻辑复用：Composables vs Mixins（为什么弃用 Mixins）

### 1.2 响应式原理
- [ ] Proxy vs Object.defineProperty
- [ ] effect / track / trigger 机制
- [ ] 依赖收集与触发更新
- [ ] 浅响应式（shallowRef / shallowReactive）
- [ ] 只读代理（readonly / shallowReadonly）
- [ ] 响应式性能优化

### 1.3 渲染机制
- [ ] 虚拟 DOM（Patch Flags 优化）
- [ ] 静态提升（Hoist Static）
- [ ] 事件缓存
- [ ] 碎片（Fragment）支持
- [ ] Teleport 传送门
- [ ] Suspense 异步组件
- [ ] 自定义渲染器（createRenderer）

### 1.4 性能优化
- [ ] 组件懒加载（defineAsyncComponent）
- [ ] v-memo 指令
- [ ] 列表优化（key 的选择）
- [ ] 大列表虚拟滚动
- [ ] 响应式对象粒度控制
- [ ] 避免不必要的 watch

---

## 二、TypeScript（2026 年必备）

### 2.1 类型基础
- [ ] 接口 vs 类型别名
- [ ] 泛型（函数 / 类 / 约束）
- [ ] 联合类型 / 交叉类型
- [ ] 类型守卫（typeof / instanceof / in）
- [ ] 类型推断

### 2.2 高级类型
- [ ] 条件类型（T extends U ? X : Y）
- [ ] 映射类型（Record / Partial / Required / Pick / Omit）
- [ ] 模板字面量类型
- [ ] 索引签名
- [ ] 类型断言 vs as const

### 2.3 Vue + TS
- [ ] defineComponent 类型推导
- [ ] 组件 Props 类型定义
- [ ] Emits 类型定义
- [ ] 组合式函数类型定义
- [ ] 泛型组件

---

## 三、构建工具链

### 3.1 Vite（必须精通）
- [ ] Vite 原理（ESM 开发 + Rollup 生产）
- [ ] 插件系统（Rollup 插件兼容）
- [ ] 热更新（HMR）原理
- [ ] 预构建依赖（deps pre-bundling）
- [ ] 多页面应用配置
- [ ] 库模式打包
- [ ] 自定义插件开发

### 3.2 工程化
- [ ] Monorepo（pnpm workspace / Turborepo）
- [ ] 微前端（qiankun / micro-app / wujie）
- [ ] 模块联邦（Module Federation）
- [ ] 构建优化（分包 / Tree Shaking）
- [ ] 持续集成（CI/CD）

---

## 四、状态管理

### 4.1 Pinia（Vuex 替代品）
- [ ] Store 定义与使用
- [ ] State / Getters / Actions
- [ ] 持久化方案
- [ ] 组合式 API 风格
- [ ] 多 Store 组织
- [ ] 与 Vue DevTools 集成

### 4.2 服务端状态管理
- [ ] TanStack Query（Vue Query）
- [ ] SWR 思想
- [ ] 缓存策略
- [ ] 乐观更新
- [ ] 无限加载

---

## 五、路由（Vue Router 4）

### 5.1 核心功能
- [ ] 路由配置与模式
- [ ] 动态路由
- [ ] 路由守卫（全局 / 独享 / 组件内）
- [ ] 路由元信息
- [ ] 编程式导航

### 5.2 进阶
- [ ] 路由懒加载
- [ ] 滚动行为
- [ ] 路由过渡动画
- [ ] 权限路由方案

---

## 六、UI 框架与组件开发

### 6.1 主流框架
- [ ] Element Plus
- [ ] Ant Design Vue
- [ ] Naive UI
- [ ] Headless UI（无头组件）
- [ ] 按需引入原理

### 6.2 组件开发能力
- [ ] 组件设计原则（单一职责 / 可组合性）
- [ ] Props / Emits / Slots 设计
- [ ] v-model 双向绑定实现
- [ ] 受控组件 vs 非受控组件
- [ ] 表单组件封装
- [ ] 表格组件封装
- [ ] 弹窗/通知/确认组件
- [ ] 组件测试（Vitest + Vue Test Utils）

### 6.3 设计系统
- [ ] Design Token
- [ ] 主题定制
- [ ] 暗色模式
- [ ] 响应式适配

---

## 七、网络与数据层

### 7.1 HTTP 封装
- [ ] Axios 深度封装
- [ ] 请求拦截器（Token / 重试 / 取消）
- [ ] 响应拦截器（错误统一处理）
- [ ] 请求并发控制
- [ ] 文件上传（分片 / 断点续传）

### 7.2 API 规范
- [ ] RESTful
- [ ] GraphQL（了解）
- [ ] RPC（了解）
- [ ] OpenAPI / Swagger
- [ ] Mock 方案（MSW / Mock.js）

### 7.3 WebSocket
- [ ] 连接管理
- [ ] 心跳机制
- [ ] 断线重连
- [ ] 消息队列

---

## 八、性能优化（7 年经验必问）

### 8.1 加载性能
- [ ] 首屏优化（SSR / SSG / ISR）
- [ ] 资源压缩（Gzip / Brotli）
- [ ] CDN 策略
- [ ] 图片优化（WebP / AVIF / 懒加载）
- [ ] 预加载（preload / prefetch）

### 8.2 运行时性能
- [ ] 渲染性能（避免重排重绘）
- [ ] 长列表优化
- [ ] 防抖节流
- [ ] 时间分片（requestIdleCallback）
- [ ] Web Worker

### 8.3 监控与分析
- [ ] Core Web Vitals（LCP / FID / CLS）
- [ ] 性能监控平台
- [ ] 错误监控（Sentry）
- [ ] 用户行为分析

---

## 九、跨端能力（加分项）

### 9.1 移动端
- [ ] 响应式布局
- [ ] 移动端适配（rem / vw / 媒体查询）
- [ ] 触摸事件
- [ ] 安全区域（safe-area-inset）

### 9.2 小程序
- [ ]  uni-app
- [ ] Taro
- [ ] 小程序原生开发

### 9.3 桌面端
- [ ] Electron
- [ ] Tauri

### 9.4 服务端渲染
- [ ] Nuxt 3
- [ ] SSR 原理（同构 / 水合）
- [ ] SEO 优化

---

## 十、测试

### 10.1 测试类型
- [ ] 单元测试（Vitest）
- [ ] 组件测试（Vue Test Utils）
- [ ] E2E 测试（Playwright / Cypress）

### 10.2 测试实践
- [ ] TDD / BDD
- [ ] 测试覆盖率
- [ ] Mock 与 Stub
- [ ] 快照测试

---

## 十一、架构与设计（7 年重点）

### 11.1 项目架构
- [ ] 目录结构设计
- [ ] 代码分层（UI / 业务 / 数据）
- [ ] 模块划分
- [ ] 依赖注入

### 11.2 设计模式
- [ ] 单例模式
- [ ] 工厂模式
- [ ] 观察者模式
- [ ] 策略模式
- [ ] 代理模式
- [ ] 组合模式

### 11.3 代码质量
- [ ] ESLint + Prettier
- [ ] Git 工作流（GitFlow / Trunk Based）
- [ ] Code Review 规范
- [ ] 文档规范（JSDoc / TSDoc）

### 11.4 技术选型
- [ ] 如何评估新技术
- [ ] 技术债务管理
- [ ] 重构策略

---

## 十二、2026 年新技术趋势（了解即可）

### 12.1 AI 相关
- [ ] AI 辅助编程（Copilot / Cursor）
- [ ] 前端集成 AI 能力
- [ ] 智能 UI 生成

### 12.2 新标准
- [ ] Web Components
- [ ] WebAssembly
- [ ] PWA 进阶

### 12.3 工具链
- [ ] Biome（替代 ESLint + Prettier）
- [ ] Rspack（Rust 版 Webpack）
- [ ] Turbopack

---

## 十三、项目经验准备（面试核心）

### 13.1 准备 2-3 个亮点项目
- [ ] 项目背景与规模（DAU / QPS / 数据量）
- [ ] 你的角色与贡献
- [ ] 技术难点与解决方案
- [ ] 性能优化成果（量化指标）
- [ ] 架构设计决策

### 13.2 常见问题准备
- [ ] 做过最有挑战的事
- [ ] 如何推动技术改进
- [ ] 带人经验（如果有）
- [ ] 跨团队协作经验
- [ ] 技术决策失误与反思

### 13.3 代码展示
- [ ] GitHub 活跃项目
- [ ] 技术博客 / 文章
- [ ] 开源贡献

---

## 十四、手写代码（高频考点）

### 14.1 JavaScript 基础
- [ ] 防抖 / 节流
- [ ] 深拷贝（考虑循环引用）
- [ ] 数组扁平化（flat）
- [ ] Promise.all / Promise.race
- [ ] call / apply / bind
- [ ] new 操作符实现
- [ ] 继承实现

### 14.2 Vue 相关
- [ ] 简易响应式系统
- [ ] 简易 Computed 实现
- [ ] 简易 Watch 实现
- [ ] 虚拟 DOM diff 简化版
- [ ] 简易 Composable 封装

### 14.3 业务场景
- [ ] 数组转树形结构
- [ ] 树形结构转数组
- [ ] 大数相加
- [ ] 图片懒加载指令
- [ ] 权限指令

---

## 十五、软技能（7 年分水岭）

### 15.1 沟通能力
- [ ] 需求分析与拆解
- [ ] 技术方案表达
- [ ] 向上管理

### 15.2 团队贡献
- [ ] 技术分享
- [ ] 新人培养
- [ ] 规范制定

### 15.3 业务理解
- [ ] 产品思维
- [ ] 数据驱动
- [ ] ROI 意识

---

## 十六、面试策略

### 16.1 简历优化
- [ ] 突出技术深度
- [ ] 量化成果（性能提升 X% / 效率提升 X%）
- [ ] 技术栈清晰分层

### 16.2 面试表现
- [ ] 先讲思路再写代码
- [ ] 不会的承认 + 展示学习能力
- [ ] 主动引导到自己熟悉的领域

### 16.3 薪资谈判
- [ ] 了解市场行情
- [ ] 明确底线
- [ ] 多 offer 对比

---

## 十七、学习资源推荐

### 17.1 官方文档
- Vue 3: https://vuejs.org
- Vite: https://vitejs.dev
- Pinia: https://pinia.vuejs.org
- Vue Router: https://router.vuejs.org

### 17.2 进阶阅读
- Vue 3 源码解析
- 《Vue.js 设计与实现》
- 《TypeScript 深度解析》

### 17.3 实践项目
- 用 Vue 3 + Vite + Pinia 重构一个旧项目
- 写一个通用的 Composable 库
- 贡献一个开源项目

---

> 💡 **7 年经验的核心竞争力：**
> - 不只是会用，要懂原理
> - 不只是写代码，要能设计架构
> - 不只是执行，要能推动技术决策
> - 不只是个人能力，要能带动团队

---

**by 🐷AI** | 2026.02.28
