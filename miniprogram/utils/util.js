/**
 * 工具函数库
 */

/**
 * 格式化时间
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

/**
 * 计算两点间距离(米)
 * @param {number} lat1 纬度1
 * @param {number} lng1 经度1
 * @param {number} lat2 纬度2
 * @param {number} lng2 经度2
 */
const getDistance = (lat1, lng1, lat2, lng2) => {
  const radLat1 = lat1 * Math.PI / 180.0
  const radLat2 = lat2 * Math.PI / 180.0
  const a = radLat1 - radLat2
  const b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
  s = s * 6378.137 // 地球半径
  s = Math.round(s * 10000) / 10 // 保留1位小数，单位km
  return s * 1000 // 转换为米
}

/**
 * 格式化距离显示
 * @param {number} distance 距离(米)
 */
const formatDistance = (distance) => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`
  } else {
    return `${(distance / 1000).toFixed(1)}km`
  }
}

/**
 * 判断是否在指定范围内
 * @param {number} lat1 当前纬度
 * @param {number} lng1 当前经度
 * @param {number} lat2 目标纬度
 * @param {number} lng2 目标经度
 * @param {number} range 范围(米)
 */
const isInRange = (lat1, lng1, lat2, lng2, range = 500) => {
  const distance = getDistance(lat1, lng1, lat2, lng2)
  return distance <= range
}

/**
 * 防抖函数
 */
const debounce = (fn, delay = 500) => {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 */
const throttle = (fn, delay = 1000) => {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= delay) {
      fn.apply(this, args)
      last = now
    }
  }
}

/**
 * 显示Toast
 */
const showToast = (title, icon = 'none', duration = 2000) => {
  wx.showToast({
    title,
    icon,
    duration
  })
}

/**
 * 显示加载中
 */
const showLoading = (title = '加载中...') => {
  wx.showLoading({
    title,
    mask: true
  })
}

/**
 * 隐藏加载
 */
const hideLoading = () => {
  wx.hideLoading()
}

/**
 * 确认对话框
 */
const showConfirm = (content, title = '提示') => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      success: (res) => {
        if (res.confirm) {
          resolve(true)
        } else {
          reject(false)
        }
      },
      fail: () => {
        reject(false)
      }
    })
  })
}

/**
 * 获取当前位置
 */
const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        resolve({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * 存储数据
 */
const setStorage = (key, data) => {
  try {
    wx.setStorageSync(key, data)
    return true
  } catch (e) {
    console.error('存储失败', e)
    return false
  }
}

/**
 * 获取存储数据
 */
const getStorage = (key, defaultValue = null) => {
  try {
    const value = wx.getStorageSync(key)
    return value || defaultValue
  } catch (e) {
    console.error('读取失败', e)
    return defaultValue
  }
}

/**
 * 删除存储数据
 */
const removeStorage = (key) => {
  try {
    wx.removeStorageSync(key)
    return true
  } catch (e) {
    console.error('删除失败', e)
    return false
  }
}

module.exports = {
  formatTime,
  getDistance,
  formatDistance,
  isInRange,
  debounce,
  throttle,
  showToast,
  showLoading,
  hideLoading,
  showConfirm,
  getLocation,
  setStorage,
  getStorage,
  removeStorage
}
