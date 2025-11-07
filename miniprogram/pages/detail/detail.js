// pages/detail/detail.js
const app = getApp()

Page({
  data: {
    windowId: null,
    windowData: {},
    capturedSpecies: new Set(),
    showSpeciesPopup: false,
    selectedSpeciesItem: null,
    showCaptureAnimation: false,
    capturedEmoji: '',
    capturedReward: '',

    // 模拟数据
    mockData: {
      1: {
        id: 1,
        name: '木兰咖啡',
        type: '咖啡馆',
        description: '温暖的手冲咖啡，遇见城市慢时光',
        color: 'gradient-amber',
        iconEmoji: '☕',
        distance: '120m',
        openTime: '08:00-22:00',
        visitors: 156,
        rating: 4.8,
        reviews: 128,
        announcement: '新品上市:埃塞俄比亚耶加雪菲G1，限量供应',
        species: [
          {
            id: 's1',
            name: '乒乓彩蛋',
            type: '好运卡',
            emoji: '🥚',
            title: '温暖手冲好运卡',
            description: '今日手冲特调，带来温暖好运',
            reward: '+50好运值',
            validity: '今日有效',
            tips: '到店出示即可享受8折优惠',
            headerColor: 'gradient-amber'
          },
          {
            id: 's2',
            name: '乒乓彩蛋',
            type: '任务卡',
            emoji: '🎯',
            title: '咖啡品鉴任务',
            description: '品尝3种不同豆子的手冲咖啡',
            reward: '+100好运值',
            validity: '本周有效',
            tips: '完成任务可获得咖啡师认证徽章',
            headerColor: 'gradient-blue'
          },
          {
            id: 's3',
            name: '字在印章',
            type: '数字文创',
            emoji: '☕',
            title: '木兰咖啡·慢时光',
            description: '独家设计的咖啡主题印章',
            reward: '可抵扣¥10',
            validity: '长期有效',
            tips: '收集齐5个印章可兑换免费咖啡',
            headerColor: 'gradient-purple'
          }
        ],
        services: [
          { name: '外带服务', icon: '🛍️', available: true },
          { name: '堂食预订', icon: '📅', available: true },
          { name: '咖啡课程', icon: '📚', available: false },
          { name: '豆子零售', icon: '📦', available: true }
        ],
        neighborDeals: [
          { title: '手冲咖啡单品', price: 38, originalPrice: 48, sales: 234 },
          { title: '下午茶套餐', price: 68, originalPrice: 88, sales: 156 }
        ],
        routes: [
          { name: '文艺街区漫步', stops: 5, distance: '2.3km', participants: 234 },
          { name: '咖啡爱好者专线', stops: 8, distance: '3.8km', participants: 567 }
        ]
      },
      2: {
        id: 2,
        name: '织梦书店',
        type: '书店',
        description: '在字里行间，寻找生活的诗意',
        color: 'gradient-blue',
        iconEmoji: '📚',
        distance: '250m',
        openTime: '09:00-21:00',
        visitors: 203,
        rating: 4.9,
        reviews: 89,
        announcement: '本周主题:重读经典，每日好书推荐更新中',
        species: [
          {
            id: 's5',
            name: '美感细胞',
            type: '美学元素',
            emoji: '📚',
            title: '书架几何美学',
            description: '书籍排列形成的自然韵律',
            reward: '+30好运值',
            validity: '收藏即永久',
            tips: '发现隐藏在书架中的美学密码',
            headerColor: 'gradient-blue'
          }
        ],
        services: [
          { name: '图书借阅', icon: '📖', available: true },
          { name: '以书换书', icon: '🔄', available: true }
        ],
        neighborDeals: [
          { title: '文学精选套装', price: 158, originalPrice: 198, sales: 123 }
        ],
        routes: []
      }
    }
  },

  onLoad(options) {
    const windowId = parseInt(options.id)
    this.setData({
      windowId: windowId
    })
    this.loadWindowData()
  },

  loadWindowData() {
    // 从模拟数据中加载
    const data = this.data.mockData[this.data.windowId]
    if (data) {
      this.setData({
        windowData: data
      })
    } else {
      wx.showToast({
        title: '橱窗不存在',
        icon: 'none'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }

    // 从全局数据中加载已捕获的物种
    const captured = app.globalData.capturedSpecies || new Set()
    this.setData({
      capturedSpecies: captured
    })
  },

  // 捕获物种
  captureSpecies(e) {
    const species = e.currentTarget.dataset.species

    // 检查是否已捕获
    if (this.data.capturedSpecies.has(species.id)) {
      wx.showToast({
        title: '已经捕获过了',
        icon: 'none'
      })
      return
    }

    // 显示物种详情弹窗
    this.setData({
      showSpeciesPopup: true,
      selectedSpeciesItem: species
    })
  },

  // 关闭物种弹窗
  closeSpeciesPopup() {
    this.setData({
      showSpeciesPopup: false,
      selectedSpeciesItem: null
    })
  },

  // 阻止冒泡
  stopPropagation() {},

  // 确认捕获
  confirmCapture() {
    const species = this.data.selectedSpeciesItem
    if (!species) return

    // 添加到已捕获集合
    const captured = new Set(this.data.capturedSpecies)
    captured.add(species.id)
    this.setData({
      capturedSpecies: captured,
      showSpeciesPopup: false
    })

    // 更新全局数据
    app.globalData.capturedSpecies = captured

    // 显示捕获成功动画
    this.setData({
      showCaptureAnimation: true,
      capturedEmoji: species.emoji,
      capturedReward: species.reward
    })

    // 增加好运值
    const rewardMatch = species.reward.match(/\+(\d+)/)
    if (rewardMatch) {
      const luckyValue = parseInt(rewardMatch[1])
      app.globalData.luckyValue += luckyValue
    }

    // 自动关闭动画
    setTimeout(() => {
      this.setData({
        showCaptureAnimation: false
      })
    }, 2000)
  },

  // 导航到店
  openNavigation() {
    wx.showToast({
      title: '打开导航',
      icon: 'none'
    })
    // 实际项目中调用微信导航API
    // wx.openLocation({
    //   latitude: lat,
    //   longitude: lng,
    //   name: this.data.windowData.name,
    //   address: this.data.windowData.address
    // })
  },

  // 分享橱窗
  shareWindow() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  onShareAppMessage() {
    return {
      title: `发现了一个好地方:${this.data.windowData.name}`,
      path: `/pages/detail/detail?id=${this.data.windowId}`,
      imageUrl: '' // 可以设置分享图片
    }
  },

  // 开始任务
  startTask() {
    // 检查距离(模拟)
    const distance = parseInt(this.data.windowData.distance)
    if (distance > 500) {
      wx.showModal({
        title: '提示',
        content: '您离橱窗太远了，请靠近后再试',
        showCancel: false
      })
      return
    }

    // 显示任务开始提示
    wx.showModal({
      title: '开始橱窗狩猎',
      content: `准备好探索${this.data.windowData.name}了吗？`,
      confirmText: '开始',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '任务开始!',
            icon: 'success'
          })

          // 实际项目中这里会开启任务流程
          // 例如: 打开AR扫描、签到打卡等
        }
      }
    })
  }
})
