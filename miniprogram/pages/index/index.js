// pages/index/index.js
const app = getApp()

Page({
  data: {
    currentCity: '上海',
    selectedSpecies: '全部',
    activeTab: '热门',
    showFilter: false,
    filterDistance: 'all',
    filterRating: 'all',

    tabs: [
      { id: 1, name: '热门' },
      { id: 2, name: '附近' },
      { id: 3, name: '最新' }
    ],

    species: [
      { name: '全部', icon: '🎯', count: 28 },
      { name: '乒乓彩蛋', icon: '🥚', count: 12 },
      { name: '物游口袋', icon: '🎒', count: 5 },
      { name: '字在印章', icon: '🎨', count: 7 },
      { name: '美感细胞', icon: '✨', count: 4 }
    ],

    windows: [
      {
        id: 1,
        name: '木兰咖啡',
        type: '咖啡馆',
        description: '温暖的手冲咖啡，遇见城市慢时光',
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
        speciesPreview: [
          { id: 's1', name: '温暖手冲', emoji: '🥚' },
          { id: 's2', name: '咖啡品鉴', emoji: '🎯' },
          { id: 's3', name: '慢时光', emoji: '☕' }
        ],
        speciesType: ['乒乓彩蛋', '字在印章', '美感细胞']
      },
      {
        id: 2,
        name: '织梦书店',
        type: '书店',
        description: '在字里行间，寻找生活的诗意',
        color: 'gradient-blue',
        iconEmoji: '📚',
        distance: '250m',
        distanceValue: 250,
        lucky: 80,
        visitors: 203,
        rating: 4.9,
        reviews: 89,
        tags: ['阅读', '安静', '二手书'],
        specialOffer: '购书送印章',
        speciesPreview: [
          { id: 's5', name: '书架美学', emoji: '📚' },
          { id: 's6', name: '阅读口袋', emoji: '🎒' },
          { id: 's7', name: '诗意生活', emoji: '✍️' }
        ],
        speciesType: ['美感细胞', '物游口袋', '字在印章']
      },
      {
        id: 3,
        name: '花间烘焙',
        type: '烘焙坊',
        description: '每一口都是幸福的味道',
        color: 'gradient-pink',
        iconEmoji: '🍰',
        distance: '380m',
        distanceValue: 380,
        lucky: 100,
        visitors: 89,
        rating: 4.7,
        reviews: 156,
        tags: ['甜品', '新鲜', '手作'],
        specialOffer: '限时彩蛋x2',
        speciesPreview: [
          { id: 's8', name: '甜蜜好运', emoji: '🍰' }
        ],
        speciesType: ['乒乓彩蛋', '美感细胞']
      },
      {
        id: 4,
        name: '时光杂货',
        type: '生活美学',
        description: '发现日常生活的小确幸',
        color: 'gradient-green',
        iconEmoji: '🎨',
        distance: '95m',
        distanceValue: 95,
        lucky: 60,
        visitors: 124,
        rating: 5.0,
        reviews: 23,
        tags: ['文创', '设计', '礼品'],
        specialOffer: '新店开业好运x1.5',
        speciesPreview: [
          { id: 's9', name: '生活印章', emoji: '🎨' },
          { id: 's10', name: '美学细胞', emoji: '✨' }
        ],
        speciesType: ['字在印章', '美感细胞', '物游口袋']
      },
      {
        id: 5,
        name: '陶然手作',
        type: '手工艺',
        description: '用双手创造独一无二的温度',
        color: 'gradient-purple',
        iconEmoji: '🏺',
        distance: '450m',
        distanceValue: 450,
        lucky: 70,
        visitors: 67,
        rating: 4.8,
        reviews: 45,
        tags: ['陶艺', '体验', '课程'],
        specialOffer: '体验课程送口袋',
        speciesPreview: [
          { id: 's11', name: '手作口袋', emoji: '🎒' },
          { id: 's12', name: '陶艺美学', emoji: '✨' }
        ],
        speciesType: ['物游口袋', '美感细胞']
      }
    ],

    distanceOptions: [
      { label: '不限', value: 'all' },
      { label: '500m内', value: '500' },
      { label: '1km内', value: '1000' },
      { label: '2km内', value: '2000' }
    ],

    ratingOptions: [
      { label: '不限', value: 'all' },
      { label: '4.5分以上', value: '4.5' },
      { label: '4.0分以上', value: '4.0' }
    ],

    filteredWindows: []
  },

  onLoad() {
    this.filterWindows()
  },

  onShow() {
    // 页面显示时刷新数据
    this.filterWindows()
  },

  // 选择物种
  selectSpecies(e) {
    const name = e.currentTarget.dataset.name
    this.setData({
      selectedSpecies: name
    })
    this.filterWindows()
  },

  // 切换Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({
      activeTab: tab
    })
    this.sortWindows(tab)
  },

  // 排序橱窗
  sortWindows(tab) {
    let windows = [...this.data.filteredWindows]

    switch(tab) {
      case '热门':
        windows.sort((a, b) => b.visitors - a.visitors)
        break
      case '附近':
        windows.sort((a, b) => a.distanceValue - b.distanceValue)
        break
      case '最新':
        windows.sort((a, b) => b.id - a.id)
        break
    }

    this.setData({
      filteredWindows: windows
    })
  },

  // 筛选橱窗
  filterWindows() {
    let filtered = [...this.data.windows]

    // 按物种筛选
    if (this.data.selectedSpecies !== '全部') {
      filtered = filtered.filter(w =>
        w.speciesType.includes(this.data.selectedSpecies)
      )
    }

    // 按距离筛选
    if (this.data.filterDistance !== 'all') {
      const maxDistance = parseInt(this.data.filterDistance)
      filtered = filtered.filter(w => w.distanceValue <= maxDistance)
    }

    // 按评分筛选
    if (this.data.filterRating !== 'all') {
      const minRating = parseFloat(this.data.filterRating)
      filtered = filtered.filter(w => w.rating >= minRating)
    }

    this.setData({
      filteredWindows: filtered
    })

    this.sortWindows(this.data.activeTab)
  },

  // 打开筛选
  openFilter() {
    this.setData({
      showFilter: true
    })
  },

  // 关闭筛选
  closeFilter() {
    this.setData({
      showFilter: false
    })
  },

  // 阻止冒泡
  stopPropagation() {},

  // 选择距离
  selectDistance(e) {
    this.setData({
      filterDistance: e.currentTarget.dataset.value
    })
  },

  // 选择评分
  selectRating(e) {
    this.setData({
      filterRating: e.currentTarget.dataset.value
    })
  },

  // 重置筛选
  resetFilter() {
    this.setData({
      filterDistance: 'all',
      filterRating: 'all'
    })
  },

  // 应用筛选
  applyFilter() {
    this.filterWindows()
    this.closeFilter()
  },

  // 切换城市
  changeLocation() {
    wx.showActionSheet({
      itemList: ['上海', '北京', '深圳', '杭州'],
      success: (res) => {
        const cities = ['上海', '北京', '深圳', '杭州']
        this.setData({
          currentCity: cities[res.tapIndex]
        })
      }
    })
  },

  // 打开地图
  openMap() {
    wx.showToast({
      title: '地图功能开发中',
      icon: 'none'
    })
  },

  // 跳转到详情页
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  }
})
