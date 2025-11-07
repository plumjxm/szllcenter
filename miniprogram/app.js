// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户位置信息
    this.getUserLocation()

    // 登录
    wx.login({
      success: res => {
        console.log('登录成功', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.globalData.userLocation = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        console.log('位置信息获取成功', res)
      },
      fail: (err) => {
        console.log('位置信息获取失败', err)
        // 提示用户授权位置信息
        wx.showModal({
          title: '提示',
          content: '需要获取您的位置信息以显示附近橱窗',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting({
                success: (settingRes) => {
                  if (settingRes.authSetting['scope.userLocation']) {
                    this.getUserLocation()
                  }
                }
              })
            }
          }
        })
      }
    })
  },

  globalData: {
    userInfo: null,
    userLocation: null,
    capturedSpecies: new Set(), // 已捕获的物种
    luckyValue: 0, // 好运值
    coupons: [] // 用户的卡券
  }
})
