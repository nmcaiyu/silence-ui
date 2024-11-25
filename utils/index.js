/**
 * 防抖函数
 * @param {Function} fn 需要防抖的函数
 * @param {Number} delay 延迟时间，单位毫秒
 * @returns {Function} 防抖处理后的函数
 */
export const debounce = (fn, delay = 500) => {
  let timer = null
  
  return function (...args) {
    if (timer) clearTimeout(timer)
    
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 节流函数
 * @param {Function} fn 需要节流的函数
 * @param {Number} delay 延迟时间，单位毫秒
 * @returns {Function} 节流处理后的函数
 */
export const throttle = (fn, delay = 500) => {
  let timer = null
  let lastTime = 0
  
  return function (...args) {
    const now = Date.now()
    
    if (now - lastTime >= delay) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      
      fn.apply(this, args)
      lastTime = now
    } else if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        lastTime = Date.now()
        timer = null
      }, delay)
    }
  }
}

/**
 * 格式化日期
 * @param {Date|String|Number} date 日期对象/字符串/时间戳
 * @param {String} format 格式化模板，如 'YYYY-MM-DD HH:mm:ss'
 * @returns {String} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  date = new Date(date)
  
  const formatObj = {
    YYYY: date.getFullYear(),
    MM: String(date.getMonth() + 1).padStart(2, '0'),
    DD: String(date.getDate()).padStart(2, '0'),
    HH: String(date.getHours()).padStart(2, '0'),
    mm: String(date.getMinutes()).padStart(2, '0'),
    ss: String(date.getSeconds()).padStart(2, '0')
  }
  
  return format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, match => formatObj[match])
}

/**
 * 深拷贝
 * @param {*} obj 需要深拷贝的对象
 * @returns {*} 深拷贝后的对象
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj
  
  const clone = Array.isArray(obj) ? [] : {}
  
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key])
    }
  }
  
  return clone
}

/**
 * 获取当前位置
 * @returns {Promise} 返回位置信息的Promise
 */
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    uni.getLocation({
      type: 'gcj02',
      success: res => resolve(res),
      fail: err => reject(err)
    })
  })
}

/**
 * 计算两点之间的距离（km）
 * @param {Number} lat1 第一个点的纬度
 * @param {Number} lon1 第一个点的经度
 * @param {Number} lat2 第二个点的纬度
 * @param {Number} lon2 第二个点的经度
 * @returns {Number} 距离，单位公里
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // 地球半径，单位km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

/**
 * 角度转弧度
 * @param {Number} deg 角度
 * @returns {Number} 弧度
 */
export const deg2rad = (deg) => {
  return deg * (Math.PI/180)
}

/**
 * 显示加载提示
 * @param {String} title 提示文字
 */
export const showLoading = (title = '加载中...') => {
  uni.showLoading({
    title,
    mask: true
  })
}

/**
 * 隐藏加载提示
 */
export const hideLoading = () => {
  uni.hideLoading()
}

/**
 * 显示提示信息
 * @param {String} title 提示文字
 * @param {String} icon 图标类型
 */
export const showToast = (title, icon = 'none') => {
  uni.showToast({
    title,
    icon,
    duration: 2000
  })
}

/**
 * 检查并获取权限
 * @param {String} scope 权限名称
 * @returns {Promise} 返回权限状态的Promise
 */
export const checkPermission = (scope) => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      success: (res) => {
        if (res.authSetting[`scope.${scope}`]) {
          resolve(true)
        } else {
          uni.authorize({
            scope: `scope.${scope}`,
            success: () => resolve(true),
            fail: () => reject(false)
          })
        }
      },
      fail: () => reject(false)
    })
  })
} 