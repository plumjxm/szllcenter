/**
 * 配置文件
 */

module.exports = {
  // 小程序信息
  appName: '橱窗狩猎',
  version: '1.0.0',

  // API配置
  apiBaseUrl: 'https://api.example.com',
  apiTimeout: 10000,

  // 地图配置
  map: {
    // 默认中心点
    defaultCenter: {
      latitude: 31.230416,
      longitude: 121.473701
    },
    // 默认缩放级别
    defaultZoom: 15,
    // 默认搜索半径(米)
    defaultRadius: 2000
  },

  // 任务配置
  task: {
    // 到店判定范围(米)
    checkInRange: 500,
    // 任务超时时间(分钟)
    timeout: 30
  },

  // 物种配置
  species: {
    // 物种分类
    categories: [
      { name: '全部', icon: '🎯' },
      { name: '乒乓彩蛋', icon: '🥚' },
      { name: '物游口袋', icon: '🎒' },
      { name: '字在印章', icon: '🎨' },
      { name: '美感细胞', icon: '✨' }
    ]
  },

  // 卡券配置
  coupon: {
    // 卡券状态
    status: {
      available: '可使用',
      used: '已使用',
      expired: '已过期'
    },
    // 卡券类型
    types: {
      discount: '折扣券',
      cash: '代金券',
      lucky: '好运卡',
      stamp: '印章',
      aesthetic: '美学元素'
    }
  },

  // 图片配置
  image: {
    // 默认头像
    defaultAvatar: '/images/default-avatar.png',
    // 允许的图片格式
    allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
    // 最大上传大小(MB)
    maxUploadSize: 5
  },

  // 缓存配置
  cache: {
    // 缓存时间(秒)
    duration: 300,
    // 缓存键前缀
    prefix: 'showcase_'
  },

  // 其他配置
  other: {
    // 分享配置
    share: {
      title: '橱窗狩猎 - 探索城市中的数字宝藏',
      path: '/pages/index/index',
      imageUrl: ''
    },
    // 客服配置
    customer: {
      phone: '400-123-4567',
      email: 'support@example.com'
    }
  }
}
