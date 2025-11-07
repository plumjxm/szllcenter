// pages/coupons/coupons.js
const app = getApp()

Page({
  data: {
    activeTab: 'available',
    showCouponDetail: false,
    selectedCoupon: null,

    tabs: [
      { id: 1, name: '可使用', status: 'available', count: 0 },
      { id: 2, name: '已使用', status: 'used', count: 0 },
      { id: 3, name: '已过期', status: 'expired', count: 0 }
    ],

    coupons: [
      {
        id: 1,
        title: '温暖手冲好运卡',
        type: '好运卡',
        emoji: '🥚',
        color: 'gradient-amber',
        description: '今日手冲特调，享受8折优惠',
        value: '8折',
        shopName: '木兰咖啡',
        expireDate: '2025-11-08 23:59',
        expireText: '今日有效',
        status: 'available',
        code: 'CPN2025110701',
        rules: '1. 仅限堂食使用\n2. 不与其他优惠同享\n3. 每人每日限用1次',
        luckyValue: 50
      },
      {
        id: 2,
        title: '木兰咖啡·慢时光',
        type: '数字文创',
        emoji: '☕',
        color: 'gradient-purple',
        description: '独家设计的咖啡主题印章',
        value: '抵扣¥10',
        shopName: '木兰咖啡',
        expireDate: '长期有效',
        expireText: '长期有效',
        status: 'available',
        code: 'CPN2025110702',
        rules: '1. 购买任意商品可抵扣\n2. 可累加使用\n3. 收集5个印章可兑换免费咖啡',
        luckyValue: 0
      },
      {
        id: 3,
        title: '书架几何美学',
        type: '美学元素',
        emoji: '📚',
        color: 'gradient-blue',
        description: '书籍排列形成的自然韵律',
        value: '+30好运值',
        shopName: '织梦书店',
        expireDate: '收藏即永久',
        expireText: '永久有效',
        status: 'available',
        code: 'CPN2025110703',
        rules: '1. 已添加至您的美学收藏\n2. 可在图鉴中查看\n3. 参与月度美学评选',
        luckyValue: 30
      },
      {
        id: 4,
        title: '手冲咖啡单品券',
        type: '代金券',
        emoji: '🎫',
        color: 'gradient-green',
        description: '手冲咖啡单品优惠',
        value: '¥38',
        shopName: '木兰咖啡',
        expireDate: '2025-11-01 23:59',
        expireText: '已过期',
        status: 'expired',
        code: 'CPN2025110101',
        rules: '1. 仅限购买手冲咖啡\n2. 不与其他优惠同享',
        luckyValue: 0
      },
      {
        id: 5,
        title: '阅读者的口袋',
        type: '流动容器',
        emoji: '🎒',
        color: 'gradient-pink',
        description: '书籍推荐收集进度 3/5',
        value: '达阈开奖',
        shopName: '织梦书店',
        expireDate: '2025-10-28 23:59',
        expireText: '已使用',
        status: 'used',
        code: 'CPN2025102801',
        rules: '已完成并兑换神秘书单大礼包',
        luckyValue: 0
      }
    ],

    filteredCoupons: [],
    totalCoupons: 0,
    availableCoupons: 0,
    usedCoupons: 0,
    expiredCoupons: 0,
    emptyText: '暂无卡券'
  },

  onLoad() {
    this.initCoupons()
  },

  onShow() {
    // 每次显示页面时刷新数据
    this.filterCoupons()
  },

  initCoupons() {
    // 统计各状态卡券数量
    const available = this.data.coupons.filter(c => c.status === 'available').length
    const used = this.data.coupons.filter(c => c.status === 'used').length
    const expired = this.data.coupons.filter(c => c.status === 'expired').length

    this.setData({
      totalCoupons: this.data.coupons.length,
      availableCoupons: available,
      usedCoupons: used,
      expiredCoupons: expired,
      'tabs[0].count': available,
      'tabs[1].count': used,
      'tabs[2].count': expired
    })

    this.filterCoupons()
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({
      activeTab: tab
    })
    this.filterCoupons()
  },

  // 筛选卡券
  filterCoupons() {
    const filtered = this.data.coupons.filter(c => c.status === this.data.activeTab)

    let emptyText = '暂无卡券'
    if (this.data.activeTab === 'available') {
      emptyText = '暂无可使用的卡券\n快去探索橱窗获取吧！'
    } else if (this.data.activeTab === 'used') {
      emptyText = '暂无已使用的卡券'
    } else if (this.data.activeTab === 'expired') {
      emptyText = '暂无过期卡券'
    }

    this.setData({
      filteredCoupons: filtered,
      emptyText: emptyText
    })
  },

  // 查看卡券详情
  viewCoupon(e) {
    const id = e.currentTarget.dataset.id
    const coupon = this.data.coupons.find(c => c.id === id)
    if (coupon) {
      this.setData({
        selectedCoupon: coupon,
        showCouponDetail: true
      })
    }
  },

  // 关闭详情
  closeDetail() {
    this.setData({
      showCouponDetail: false,
      selectedCoupon: null
    })
  },

  // 阻止冒泡
  stopPropagation() {},

  // 使用卡券
  useCoupon(e) {
    const id = e.currentTarget.dataset.id
    const coupon = this.data.coupons.find(c => c.id === id)

    if (!coupon) return

    this.setData({
      selectedCoupon: coupon,
      showCouponDetail: true
    })
  },

  // 显示二维码
  showQRCode() {
    wx.showModal({
      title: '使用卡券',
      content: `核销码: ${this.data.selectedCoupon.code}\n\n请出示此码给商家扫描核销`,
      confirmText: '我知道了',
      showCancel: false
    })
  },

  // 分享卡券
  onShareAppMessage() {
    return {
      title: '我在橱窗狩猎获得了好运卡，一起来玩吧！',
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
