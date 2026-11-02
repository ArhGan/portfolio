# 个人作品集网站 — 操作记录与经验总结

> 项目：Zephyr Arh Portfolio 个人作品集网站
> 技术栈：纯静态 HTML5 + CSS3 + 原生 JavaScript
> 部署：GitHub Pages（https://arhgan.github.io/portfolio/）
> 本文件记录了从网站搭建到动效集成的完整操作链路与关键经验。

---

## 一、项目文件清单

| 文件 | 用途 |
|------|------|
| `index.html` | 首页（Hero / Portfolio / Articles / Timeline / Contact） |
| `styles.css` | 全站样式（含变量、响应式、卡片、动效） |
| `app.js` | 首页交互（飞出门菜单、滚动揭示、动效） |
| `project-detail.html` / `.css` / `.js` | 项目详情页 |
| `article-detail.html` / `.css` / `.js` | 文章详情页 |
| `effects-demo.html` | 动效预览独立演示页 |
| `assets/` | 图片资源（photo.jpg + 6 个 placeholder SVG） |
| `fonts/` | 阿里巴巴方圆体字体文件 |
| `.trae/skills/` | 本次沉淀的 3 个可复用 Skill |

---

## 二、操作记录（按时间线）

### 阶段 1：网站框架搭建
- 参考 Young-Portfolio 形式搭建静态站点框架
- 中文字体替换为阿里巴巴方圆体 VF（Regular-Square）
- Hero 区域增加个人照片，三层绝对定位（背景文字 z-index:1 / 照片 z-index:2 / 文字 z-index:3）实现文字在最上层

### 阶段 2：布局与导航重构
- 所有英文大标题下增加中文小字注释
- 作品分类整合到 Portfolio 二级菜单，移除底部中/en 切换
- 侧边栏重构为窄图标导航 + 飞出门菜单（Flyout Panel）
- 移动端适配：顶部栏 + 底部导航栏，飞出门改为底部弹出面板（Bottom Sheet）

### 阶段 3：Bug 修复（关键经验）
1. **字体加载错误** — Google Fonts 无法连接 → 替换为国内镜像 `fonts.loli.net`
2. **照片遮挡文字** — Hero 照片垂直居中遮挡左侧文字 → 调整 `top: 50%` 为 `top: 8%` 并缩小宽度
3. **标题压住个人简介** — Hero 背景大标题与简介层叠 → 重构 Hero 布局为流式
4. **飞出门菜单点击后立即关闭** — 平滑滚动事件监听导致 → 仅在点击飞出门内链接时关闭
5. **移动端菜单不显示 / 激活状态不更新** — CSS 与 JS 逻辑修复
6. **项目卡片 #4 尺寸不一致**（本次会话重点）

### 阶段 4：动效集成（本次会话重点）
- 从 ReactBits Pro 组件库筛选 6 款动效，精选 4 款适配
- 创建 `effects-demo.html` 独立预览
- 集成 4 款动效到正式站点

---

## 三、关键经验沉淀

### 经验 1：CSS 布局调试（已沉淀为 skill: css-layout-debug）

**问题**：Portfolio 卡片 #4 宽度只有 197px，其他卡片 426px。

**排查方法**：用 `browser_evaluate` 批量测量所有卡片的 `getBoundingClientRect()` + `getComputedStyle().gridColumn`，发现卡片 #4 的 `grid-column` 是 `span 6` 而其他是 `span 12`。

**根因**：CSS 中 `.card:nth-child(4) { grid-column: span 6 }`（特异性 0,1,1）与响应式媒体查询内的 `.card { grid-column: span 12 }`（特异性 0,1,0）冲突，特异性高的基础规则覆盖了响应式规则。

**修复**：
1. 移除基础 CSS 中独立的 `.card:nth-child(4)` 规则
2. 在响应式规则中添加 `!important` 强制覆盖
3. 为 `styles.css` 增加 `?v=3` 缓存破坏参数

**教训**：
- **永远不要凭截图猜尺寸，必须用 computed style 测量**
- **CSS 修改后一定要 bump 缓存版本号**，否则浏览器用旧文件
- **特异性相同时源序决定，特异性不同时高特异性赢**，与媒体查询位置无关

### 经验 2：第三方动效原生移植（已沉淀为 skill: native-motion-port）

**做法**：
1. 浏览 ReactBits 筛选可原生实现的动效（跳过需要 Three.js/GSAP 的）
2. 先建 `effects-demo.html` 让用户预览确认
3. 用 `data-*` 属性挂载动效，不改现有 HTML 结构
4. 所有 hover 动效用 `window.matchMedia('(hover: hover)')` 守护
5. 内置 3 个可复用代码片段：Text Scramble / 3D Tilt Card / Magnetic Button

**集成的 4 款动效**：
- **Text Scramble** → Hero 大标题 ZEPHYR/ARH 解码动画
- **Depth Card** → Portfolio 6 张卡片 3D 倾斜 + 视差分层
- **Magnetic Button** → Explore Works + Wechat 按钮磁吸
- **Stagger Reveal** → Timeline hover 左滑 + 箭头滑入

### 经验 3：前端预览验证（已沉淀为 skill: frontend-live-preview）

**流程**：
1. `python -m http.server 8080` 启动本地服务器
2. `browser_console_messages()` 先查 JS 语法错误（一个语法错误会让整个 app.js 失效）
3. 一次 `browser_evaluate` 批量验证预期元素数量
4. 分区域截图确认

**踩坑**：本次会话中曾因 `app.js` 的 `if (copyBtn) {` 块缺少闭合 `}`，导致后续所有代码（动效部分）都不执行，页面表现为"空白/无交互"。必须先看 console 错误。

---

## 四、沉淀的 Skills（已全局安装到 ~/.agents/skills/）

| Skill | 用途 |
|-------|------|
| `css-layout-debug` | CSS 布局不一致调试（特异性、媒体查询、缓存） |
| `native-motion-port` | 第三方动效库原生移植到静态站 |
| `frontend-live-preview` | 静态站修改后浏览器预览验证 |

---

## 五、Git 提交记录

```
3be2222  Add 4 interactive motion effects: Text Scramble, Depth Card 3D tilt, Magnetic Button, Timeline stagger reveal
d34205f  (之前的提交，含卡片 #4 修复)
```

---

## 六、下次接手注意事项

1. 修改 `styles.css` / `app.js` 后务必更新 `index.html` 中的 `?v=` 参数
2. 动效只在桌面端（`hover: hover`）生效，移动端自动降级
3. 卡片 Grid 布局：桌面端 `span 6`（两列），≤1024px 时 `span 12`（单列，带 `!important`）
4. 字体文件在 `fonts/` 目录，需用户自行下载放入

---

## 第二阶段：工程整理与内容补全（2026-11-02）

### 1. 修复被污染的 index.html
上一轮在 Trae 预览环境中导出时，`index.html` 的 `<head>` 被注入了约 1900 行编辑器运行时样式与脚本
（`.trae-browser-inspect-*`、`icube-theme-variables`、`@vite/client` HMR），页面体积从 29 KB 膨胀到 167 KB，
且尾部残留 5 个覆盖层 `<div>`。现已全部剥离，并把 head 重写为完整的 SEO 结构（description / canonical /
OG / Twitter Card / JSON-LD Person / favicon）。

### 2. 字体从 7.06 MB 降到 303 KB
新增 `tools/subset-font.py`：收集全站 html/js/css 中出现过的字符 + ASCII + 常用中文标点共 807 字，
用 fontTools 子集化为 `fonts/AlibabaFangYuanTi-VF.woff2`。
**以后新增文案后要重新执行 `python tools/subset-font.py`**，否则新字会回退到系统字体。
同时删除了指向不存在文件 `Regular-Square.ttf` 的第二个 @font-face（此前每次加载都是 404）。

### 3. 人像与图标
- `photo.jpg`（4160×6240，2.1 MB）→ `photo-480/800/1200.webp`（4/9/17 KB），用 `<picture>` + srcset 输出
- 新增 `favicon.svg`、`apple-touch-icon.png`、`og-cover.png`（1200×630 分享封面）

### 4. 作品图：从作品集 PDF 反向提取
用纯 Python 解析 `安若翰-平面设计-5年工作经验-作品集.pdf` 中的 153 个 DCTDecode 图像流，
提取出 81 张可用图片，按项目归档到 `assets/work/p1…p6/`（封面 + 画廊，WebP，合计 3.9 MB）。
- 卡片封面：竖版海报统一处理成 4:3 画布（原图居中 + 同图模糊压暗作底），避免裁掉版面
- 6 个项目的封面与画廊归属，是按画面上的文字（「香港首店」「巧手傳非遺」等）推断的，**需本人复核**

### 5. 项目详情页
- 删除假的 Video 区块（只有占位图标，从未有视频）
- 画廊改为 `columns` 瀑布流，保留每张图原始比例，点击进入灯箱（支持 ←/→/Esc）
- 图片数据集中在 `project-detail.js` 的 `projects[n].gallery` 数组，改图只需要改数组

### 6. 死链与假交互
- 侧边栏 Pinterest 的 `mailto:https://...`、以及 5 个 `href="#"` 全部替换为真实地址
- 5 个「XX QR Code」假二维码提示卡改为真实账号信息；微信/小红书改为点击复制
- 全站统一 `[data-copy]` 复制逻辑 + 全局 toast，删除只打 console.log 的文章点击占位代码

### 7. 工程收尾
- 新增 `404.html`、`sitemap.xml`、`robots.txt`
- 统一资源版本号到 `?v=4`（此前 index 是 v3、详情页是 v2，缓存策略不一致）
- 新增 skip-link、`:focus-visible` 焦点环、`.sr-only`
- `effects-demo.html` 移入 `_dev/`，`_src/` 存放原始素材，两者均已加入 `.gitignore`，不再随站点发布

### 待办
1. 复核 6 个项目的图片归属
2. 字体子集覆盖的 807 字之外，若新增文案需重新跑子集脚本
3. 图片可进一步加 `srcset` 多尺寸（当前画廊为单尺寸）

---

## 第三阶段：图片归属复核与重建（2026-11-02）

### 1. 发现并修复一个隐蔽路径 Bug
上一轮生成画廊数组时用了 Windows 路径，写进 JS 变成：

```js
'assets/work/p1\01.webp'   // \0 是八进制转义，实际是控制字符 U+0001
```

JS 不报错（`node --check` 通过），但 35 张画廊图全部指向不存在的文件。已改为正斜杠，并加了一次
「引用路径必须能在磁盘上找到」的校验（41 条引用 / 41 个文件 / 0 缺失）。

### 2. 图片归属：从推断改为按页核对
装好 PyMuPDF 后能读取 PDF 页面结构，于是用 dhash（16×16 感知哈希）把每张入库图与 PDF 内嵌图逐一比对，
反查它来自第几页，再对照画册真实分节：

| 项目 | PDF 页 | 内容 |
|---|---|---|
| p1 | P4–P11 | 老碗会 香港首店（LWH&HELLO HONGKONG） |
| p2 | P12–P19 | 扑湘 PALATABLE |
| p3 | P22–P25 | 海报 & 信息流（城市开业系列） |
| p4 | P27–P29 | 展会 & 活动（徽菜年货节、老碗会十年） |
| p5 | P31–P33 | 周边 & 衍生（首席馍馍小厨 IP、团扇、纸袋） |
| p6 | P35 | 其他设计（非遗主题双层巴士车身） |

上一轮 35 张里有 8 张挂错项目，其中 p6「非遗技艺」的 4 张**全部**来自第 23 页（广州新店那组），等于整套错位。
现已按页码重建：不再抽取内嵌图，而是**整页渲染**（1920×1080）——文字、版式、标注全保留，
比抽出来的裸图更接近设计原貌。p6 只有一页，另从 2× 渲染里裁出三处细节（侧视 / 车头 / 车尾）凑成 4 张。

### 3. 封面重做
六张 4:3 卡片封面改为「整页居中 + 同页模糊压暗作底」，前景保留完整 16:9 版面，不裁切。
图片总量 5.5 MB（35 张 WebP，单页最多 8 张，均 lazy load）。

### 4. 连带修正
- `article-detail.js`：3 条图注与画面重新对应（菜单设计 / 色彩体系 / 辅助图形 / 巴士车身）
- 首页 4 个卡片 alt 改为描述实际画面
- JSON-LD 的 `image` 指向已替换的 `photo-800.webp`（原 `photo.jpg` 已归档到 `_src/`）
- 字体子集重跑（791 字，292.5 KB）

### 5. 仍需本人确认的文案错位
- **p4 标题写「PALATABLE 展会活动视觉」**，但画册里的展会是徽菜年货节（奋斗成就自我）与老碗会十年，
  与扑湘无关。图片已按实际展会重建，标题未动。
- **p5 文案写「扑湘品牌周边衍生品」**，实际周边是「首席馍馍小厨」IP 与老碗会团扇、纸袋、礼盒。
