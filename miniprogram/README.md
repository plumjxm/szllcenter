# 橱窗狩猎小程序

基于需求文档开发的"数字邻里中心平台"小程序端项目。

## 项目简介

橱窗狩猎是一个城市探索类小程序，用户可以通过小程序发现附近的橱窗、完成任务、捕获数字物种、获取卡券等，将城市空间变成可探索的数字邻里中心。

## 核心功能

### V1.0 MVP功能

1. **橱窗探索**
   - 浏览附近橱窗
   - 查看橱窗详情
   - 物种分类筛选
   - 距离和评分筛选

2. **数字物种捕获**
   - 查看可捕获物种
   - 捕获物种卡片
   - 捕获成功动画
   - 好运值奖励

3. **卡券系统**
   - 卡券包管理
   - 卡券分类(可使用/已使用/已过期)
   - 卡券详情展示
   - 核销码显示

4. **个人中心**
   - 用户登录/登出
   - 好运值统计
   - 探索数据展示
   - 本周数据统计

## 项目结构

```
miniprogram/
├── pages/                # 页面目录
│   ├── index/           # 首页(橱窗列表)
│   │   ├── index.wxml
│   │   ├── index.js
│   │   └── index.wxss
│   ├── detail/          # 橱窗详情页
│   │   ├── detail.wxml
│   │   ├── detail.js
│   │   └── detail.wxss
│   ├── coupons/         # 卡券包页面
│   │   ├── coupons.wxml
│   │   ├── coupons.js
│   │   └── coupons.wxss
│   └── profile/         # 个人中心
│       ├── profile.wxml
│       ├── profile.js
│       └── profile.wxss
├── utils/               # 工具函数
│   ├── util.js         # 通用工具函数
│   ├── api.js          # API接口封装
│   └── config.js       # 配置文件
├── images/              # 图片资源(需自行添加)
├── app.js               # 小程序逻辑
├── app.json             # 小程序配置
├── app.wxss             # 全局样式
├── sitemap.json         # 站点地图
├── project.config.json  # 项目配置
└── README.md            # 项目说明
```

## 技术栈

- 微信小程序原生框架
- WXML + WXSS + JavaScript
- 微信开放能力(定位、登录等)

## 开发指南

### 环境准备

1. 安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 注册微信小程序账号，获取AppID
3. 下载项目代码

### 本地运行

1. 打开微信开发者工具
2. 导入项目，选择 `miniprogram` 目录
3. 填入AppID(或使用测试号)
4. 点击编译即可预览

### 配置说明

1. **修改AppID**
   - 在 `project.config.json` 中修改 `appid` 字段

2. **配置API地址**
   - 在 `utils/api.js` 中修改 `API_BASE_URL`
   - 在 `utils/config.js` 中修改 `apiBaseUrl`

3. **添加图片资源**
   - 在 `images/` 目录下添加所需的图标和图片
   - 主要需要的图片包括:
     - tab图标(tab_home.png, tab_coupon.png, tab_profile.png及其active版本)
     - 功能图标(search.png, location.png, filter.png等)

### 注意事项

1. **位置权限**
   - 首次使用需要用户授权位置信息
   - 在 `app.json` 中已配置权限说明

2. **用户登录**
   - 使用微信授权登录
   - 需要用户主动触发(button组件的open-type="getUserProfile")

3. **数据模拟**
   - 当前版本使用本地模拟数据
   - 实际项目中需要对接后端API

## 页面说明

### 1. 首页(index)

橱窗列表页面，展示附近的橱窗信息。

**主要功能:**
- 搜索橱窗
- 物种分类筛选
- Tab切换(热门/附近/最新)
- 距离和评分筛选
- 跳转详情页

### 2. 橱窗详情(detail)

展示单个橱窗的详细信息。

**主要功能:**
- 橱窗基本信息
- 可捕获物种展示
- 物种捕获功能
- 店铺公告
- 服务项目
- 邻里好货
- 推荐路线
- 导航和分享

### 3. 卡券包(coupons)

管理用户的卡券。

**主要功能:**
- 卡券统计
- 状态分类
- 卡券详情
- 核销码展示

### 4. 个人中心(profile)

用户个人信息和数据统计。

**主要功能:**
- 用户登录/登出
- 好运值展示
- 数据统计
- 功能入口
- 本周数据

## 数据结构

### 橱窗数据

```javascript
{
  id: 1,
  name: '木兰咖啡',
  type: '咖啡馆',
  description: '温暖的手冲咖啡',
  color: 'gradient-amber',
  iconEmoji: '☕',
  distance: '120m',
  distanceValue: 120,
  lucky: 50,
  visitors: 156,
  rating: 4.8,
  reviews: 128,
  tags: ['文艺', '手冲', 'WiFi'],
  specialOffer: '首次到访送彩蛋',
  species: [...],  // 物种列表
  services: [...], // 服务列表
  routes: [...]    // 路线列表
}
```

### 物种数据

```javascript
{
  id: 's1',
  name: '乒乓彩蛋',
  type: '好运卡',
  emoji: '🥚',
  title: '温暖手冲好运卡',
  description: '今日手冲特调',
  reward: '+50好运值',
  validity: '今日有效',
  tips: '到店出示即可享受8折优惠'
}
```

### 卡券数据

```javascript
{
  id: 1,
  title: '温暖手冲好运卡',
  type: '好运卡',
  emoji: '🥚',
  color: 'gradient-amber',
  description: '今日手冲特调',
  value: '8折',
  shopName: '木兰咖啡',
  expireDate: '2025-11-08 23:59',
  status: 'available', // available/used/expired
  code: 'CPN2025110701'
}
```

## 后续开发计划

### P1优先级功能

- [ ] 路线玩法
- [ ] 图鉴系统
- [ ] 更多任务类型
- [ ] AR扫描功能
- [ ] 消息通知

### P2功能

- [ ] 社交功能
- [ ] 成就系统
- [ ] 排行榜
- [ ] 活动系统

## API对接

当前使用本地模拟数据，实际项目需要对接后端API:

1. 在 `utils/api.js` 中已定义了API接口结构
2. 将 `API_BASE_URL` 修改为实际后端地址
3. 在各页面的js文件中，将模拟数据替换为API调用

示例:
```javascript
// 当前(模拟数据)
this.data.windows

// 修改为(API调用)
const { api } = require('../../utils/api')
api.window.getList().then(res => {
  this.setData({
    windows: res.list
  })
})
```

## 常见问题

1. **Q: 如何添加图片资源?**
   A: 在 `images/` 目录下添加对应的图片文件，确保文件名与代码中引用的一致。

2. **Q: 如何修改主题色?**
   A: 在 `app.wxss` 中修改渐变色相关的样式变量。

3. **Q: 如何对接真实API?**
   A: 参考上面的"API对接"章节。

## 联系方式

如有问题，请联系开发团队。

## 许可证

本项目仅供学习和参考使用。
