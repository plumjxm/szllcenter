/**
 * API接口配置
 */

// API基础地址
const API_BASE_URL = 'https://api.example.com'

// 请求封装
const request = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_BASE_URL}${url}`,
      method,
      data,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync('token') || ''
      },
      success: (res) => {
        if (res.statusCode === 200) {
          if (res.data.code === 0) {
            resolve(res.data.data)
          } else {
            wx.showToast({
              title: res.data.message || '请求失败',
              icon: 'none'
            })
            reject(res.data)
          }
        } else {
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

// API接口定义
const api = {
  // 用户相关
  user: {
    // 登录
    login: (code) => request('/user/login', 'POST', { code }),
    // 获取用户信息
    getUserInfo: () => request('/user/info', 'GET'),
    // 更新用户信息
    updateUserInfo: (data) => request('/user/update', 'POST', data)
  },

  // 橱窗相关
  window: {
    // 获取橱窗列表
    getList: (params) => request('/window/list', 'GET', params),
    // 获取橱窗详情
    getDetail: (id) => request(`/window/detail/${id}`, 'GET'),
    // 获取附近橱窗
    getNearby: (lat, lng, radius) => request('/window/nearby', 'GET', { lat, lng, radius })
  },

  // 物种相关
  species: {
    // 获取物种列表
    getList: () => request('/species/list', 'GET'),
    // 捕获物种
    capture: (speciesId, windowId) => request('/species/capture', 'POST', { speciesId, windowId }),
    // 获取用户已捕获的物种
    getCaptured: () => request('/species/captured', 'GET')
  },

  // 任务相关
  task: {
    // 开始任务
    start: (windowId) => request('/task/start', 'POST', { windowId }),
    // 完成任务
    complete: (taskId) => request('/task/complete', 'POST', { taskId }),
    // 获取任务列表
    getList: () => request('/task/list', 'GET')
  },

  // 卡券相关
  coupon: {
    // 获取卡券列表
    getList: (status) => request('/coupon/list', 'GET', { status }),
    // 使用卡券
    use: (couponId) => request('/coupon/use', 'POST', { couponId }),
    // 核销卡券
    verify: (code) => request('/coupon/verify', 'POST', { code })
  },

  // 路线相关
  route: {
    // 获取路线列表
    getList: () => request('/route/list', 'GET'),
    // 获取路线详情
    getDetail: (id) => request(`/route/detail/${id}`, 'GET'),
    // 开始路线
    start: (routeId) => request('/route/start', 'POST', { routeId }),
    // 完成路线
    complete: (routeId) => request('/route/complete', 'POST', { routeId })
  },

  // 数据统计
  stats: {
    // 获取用户统计数据
    getUserStats: () => request('/stats/user', 'GET'),
    // 获取周统计
    getWeekStats: () => request('/stats/week', 'GET')
  }
}

module.exports = {
  API_BASE_URL,
  request,
  api
}
