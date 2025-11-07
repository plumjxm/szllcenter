// pages/profile/profile.js
const app = getApp()

Page({
  data: {
    hasUserInfo: false,
    userInfo: {
      avatarUrl: '',
      nickName: '',
      id: ''
    },

    luckyValue: 0,
    exploredCount: 15,
    capturedCount: 28,
    achievementCount: 2,
    collectionCount: 12,

    weekStats: {
      explored: 15,
      distance: 8.5,
      lucky: 450,
      species: 12
    }
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserData()
  },

  // 加载用户信息
  loadUserInfo() {
    // 从全局数据或本地存储中加载
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  // 加载用户数据
  loadUserData() {
    // 从全局数据中加载
    const luckyValue = app.globalData.luckyValue || 0
    const capturedSpecies = app.globalData.capturedSpecies || new Set()

    this.setData({
      luckyValue: luckyValue,
      capturedCount: capturedSpecies.size
    })
  },

  // 登录
  login() {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = {
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          id: this.generateUserId()
        }

        this.setData({
          hasUserInfo: true,
          userInfo: userInfo
        })

        // 保存到本地存储
        wx.setStorageSync('userInfo', userInfo)

        // 保存到全局
        app.globalData.userInfo = userInfo

        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })

        // 实际项目中这里会调用后端接口进行登录
      },
      fail: (err) => {
        console.log('获取用户信息失败', err)
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  // 生成用户ID(模拟)
  generateUserId() {
    return Math.floor(Math.random() * 1000000).toString()
  },

  // 退出登录
  logout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            hasUserInfo: false,
            userInfo: {
              avatarUrl: '',
              nickName: '',
              id: ''
            }
          })

          // 清除本地存储
          wx.removeStorageSync('userInfo')

          // 清除全局数据
          app.globalData.userInfo = null

          wx.showToast({
            title: '已退出登录',
            icon: 'success'
          })
        }
      }
    })
  },

  // 跳转页面
  goToPage(e) {
    const url = e.currentTarget.dataset.url

    // 检查是否需要登录
    if (!this.data.hasUserInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        confirmText: '去登录',
        success: (res) => {
          if (res.confirm) {
            this.login()
          }
        }
      })
      return
    }

    // 提示功能开发中
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })

    // 实际项目中取消注释下面的代码
    // wx.navigateTo({
    //   url: url
    // })
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '橱窗狩猎 - 探索城市中的数字宝藏',
      path: '/pages/index/index',
      imageUrl: ''
    }
  }
})
