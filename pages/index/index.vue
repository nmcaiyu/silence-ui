<template>
    <view class="page-container">
      <!-- 轮播图部分 -->
      <swiper class="banner" 
              :indicator-dots="true" 
              :indicator-color="'rgba(255, 255, 255, 0.6)'"
              :indicator-active-color="'#4A90E2'"
              circular 
              autoplay>
        <swiper-item v-for="item in banners" :key="item.id" class="swiper-item">
          <image :src="item.imageUrl" mode="aspectFill" />
        </swiper-item>
      </swiper>
  
      <!-- 快捷操作区 -->
      <view class="quick-actions">
        <button class="action-btn customer-service" open-type="contact">
          <text>在线咨询</text>
        </button>
      </view>
  
      <!-- 门店信息卡片 -->
      <view class="store-card">
        <image class="store-image" :src="storeInfo.image" mode="aspectFill" />
        <view class="store-content">
          <view class="store-header">
            <text class="store-name">{{ storeInfo.name }}</text>
            <text class="distance">距您{{ storeInfo.distance }}km</text>
          </view>
          <view class="store-details">
            <view class="detail-item">
              <text>{{ storeInfo.businessHours }}</text>
            </view>
            <view class="detail-item address" @tap="openLocation">
              <text>{{ storeInfo.address }}</text>
              <text class="navigate">导航</text>
            </view>
          </view>
        </view>
      </view>
  
      <!-- 功能区块 -->
      <view class="feature-section">
        <view class="section-title">
          <text class="title">快捷功能</text>
        </view>
        <view class="feature-grid">
          <view class="feature-item" @tap="toggleLight">
            <view class="feature-icon" :class="{ active: lightStatus }">
              <image src="/static/icons/light.png" />
            </view>
            <text>{{ lightStatus ? '关闭照明' : '开启照明' }}</text>
            <text class="status-text">{{ lightStatus ? '已开启' : '已关闭' }}</text>
          </view>
          <view class="feature-item" @tap="openDoor">
            <view class="feature-icon">
              <image src="/static/icons/door.png" />
            </view>
            <text>一键开门</text>
            <text class="status-text">{{ doorStatus ? '开门中...' : '点击开门' }}</text>
          </view>
          <view class="feature-item" @tap="scanCode">
            <view class="feature-icon">
              <image src="/static/icons/qrcode.png" />
            </view>
            <text>扫码入座</text>
            <text class="status-text">快速找到座位</text>
          </view>
          <view class="feature-item" @tap="goToBooking">
            <view class="feature-icon">
              <image src="/static/icons/booking.png" />
            </view>
            <text>预约座位</text>
            <text class="status-text">提前选择座位</text>
          </view>
        </view>
      </view>
  
      <!-- 环境展示区域 -->
      <view class="environment-section">
        <view class="section-title">
          <text class="title">环境展示</text>
          <text class="more" @tap="showMorePhotos">查看更多</text>
        </view>
        <scroll-view scroll-x class="environment-scroll">
          <view class="photo-list">
            <view class="photo-item" v-for="(photo, index) in environmentPhotos" :key="index" @tap="previewImage(index)">
              <image :src="photo.url" mode="aspectFill" />
              <text>{{photo.name}}</text>
            </view>
          </view>
        </scroll-view>
      </view>
      
      <!-- 底部导航栏 -->
      <view class="tab-bar">
        <view 
          v-for="(item, index) in tabList" 
          :key="index"
          class="tab-item"
          :class="{ active: currentTab === index }"
          @tap="switchTab(item.pagePath, index)"
        >
          <image :src="currentTab === index ? item.selectedIcon : item.icon" />
          <text>{{ item.text }}</text>
        </view>
      </view>
    </view>
  </template>
  
  <script>
  import { debounce, throttle, showToast } from '../../utils/index.js'
  
  export default {
    data() {
      return {
        currentTab: 0,
        tabList: [
          {
            text: '首页',
            pagePath: '/pages/index/index',
            icon: '',
            selectedIcon: ''
          },
          {
            text: '预约',
            pagePath: '/pages/booking/index',
            icon: '',
            selectedIcon: ''
          },
          {
            text: '发现',
            pagePath: '/pages/discover/index',
            icon: '',
            selectedIcon: ''
          },
          {
            text: '我的',
            pagePath: '/pages/profile/index',
            icon: '',
            selectedIcon: ''
          }
        ],
        banners: [
          {
            id: 1,
            imageUrl: 'http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvYmFubmVyL2Jhbm5lcjEucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9NUwyU0pON1NCOEpJRDZSTTQyTEslMkYyMDI0MTEyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjJUMTE0MTI3WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJMVRESlRTazQzVTBJNFNrbEVObEpOTkRKTVN5SXNJbVY0Y0NJNk1UY3pNak13TXpreU15d2ljR0Z5Wlc1MElqb2lZMkZwZVhVaWZRLndXejZwanQ3UUJCLUw4YXF0NW9jRG1WYTg4U1VsTFdmSWJtVHFoeld2UDFBcnZTckNEYVdnNVVnREFCTUxCX3M3djNoZ1RaZXNuS0hWU09tMk1VV2dBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NTU3NTFkNzRjZWM2ZDE2OTg2YzhkYzkxNTEyYTlmOGQ1N2I5ZTU2MDE4OTgxNmNmOTllOWZiNWM0ODM4NTNkNA'
          },
          {
            id: 2,
            imageUrl: 'http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvYmFubmVyL2Jhbm5lcjIucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9NUwyU0pON1NCOEpJRDZSTTQyTEslMkYyMDI0MTEyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjJUMTE0MTQ0WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJMVRESlRTazQzVTBJNFNrbEVObEpOTkRKTVN5SXNJbVY0Y0NJNk1UY3pNak13TXpreU15d2ljR0Z5Wlc1MElqb2lZMkZwZVhVaWZRLndXejZwanQ3UUJCLUw4YXF0NW9jRG1WYTg4U1VsTFdmSWJtVHFoeld2UDFBcnZTckNEYVdnNVVnREFCTUxCX3M3djNoZ1RaZXNuS0hWU09tMk1VV2dBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NmNlZTFjOTZkOTBjOWMxZTEwNTc0NjA0MmFkODExNmMxMmI3MGEyMjEwYzUzOTQ4ZmNkODA3MWRmM2U1NDRjZA'
          },
          {
            id: 3,
            imageUrl: 'http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvYmFubmVyL2Jhbm5lcjMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9NUwyU0pON1NCOEpJRDZSTTQyTEslMkYyMDI0MTEyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjJUMTE0MTU2WiZYLUFtei1FeHBpcmVzPTQzMTk5JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJMVRESlRTazQzVTBJNFNrbEVObEpOTkRKTVN5SXNJbVY0Y0NJNk1UY3pNak13TXpreU15d2ljR0Z5Wlc1MElqb2lZMkZwZVhVaWZRLndXejZwanQ3UUJCLUw4YXF0NW9jRG1WYTg4U1VsTFdmSWJtVHFoeld2UDFBcnZTckNEYVdnNVVnREFCTUxCX3M3djNoZ1RaZXNuS0hWU09tMk1VV2dBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9ODkxNzI3MGQwNWYwY2FlM2MyNWViYmY0NTZlMjRjMTQ2NDc5MzkyYjVkMzEyODc3MDg0MzJiODc2YTg5ODdjNw'
          }
        ],
        storeInfo: {
          name: '寂静空间自习室',
          image: 'http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9pbmRleC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD01TDJTSk43U0I4SklENlJNNDJMSyUyRjIwMjQxMTIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEyMlQwNzQyMjZaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUkxVERKVFNrNDNVMEk0U2tsRU5sSk5OREpNU3lJc0ltVjRjQ0k2TVRjek1qTXdNemt5TXl3aWNHRnlaVzUwSWpvaVkyRnBlWFVpZlEud1d6NnBqdDdRQkItTDhhcXQ1b2NEbVZhODhTVWxMV2ZJYm1UcWh6V3ZQMUFydlNyQ0RhV2c1VWdEQUJNTEJfczd2M2hnVFplc25LSFZTT20yTVVXZ0EmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT0wM2RhZWRkZmM3NmMxOGNlNzBlMmQ4MjkxMmE0N2Q2YmVkMzJlYjJjM2M3ODMxYWViZWEyN2JhOGM2MDI0OGU1',
          distance: '0.8',
          businessHours: '营业时间：09:00-23:00',
          address: '呼和浩特市赛罕区金桥开发区玖都公馆',
          latitude: 40.781,
          longitude: 111.741624
        },
        lightStatus: false,
        doorStatus: false,
        environmentPhotos: [
          { url: 'http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9yZWFkLXNwYWNlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPTVMMlNKTjdTQjhKSUQ2Uk00MkxLJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDA3NTAwNVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSTFUREpUU2s0M1UwSTRTa2xFTmxKTk5ESk1TeUlzSW1WNGNDSTZNVGN6TWpNd016a3lNeXdpY0dGeVpXNTBJam9pWTJGcGVYVWlmUS53V3o2cGp0N1FCQi1MOGFxdDVvY0RtVmE4OFNVbExXZklibVRxaHpXdlAxQXJ2U3JDRGFXZzVVZ0RBQk1MQl9zN3YzaGdUWmVzbktIVlNPbTJNVVdnQSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTM5ZWQ2NjlmYTQwNGQ4NjJkODhhNTVlZThjMWYyOWNiNDFmYzZhYmFhNTY0MGMyNmMzNDNlYmNkYjU3ZGMzOWY', name: '阅读区' },
          { url: 'http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9zZWxmLXJvb20ucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9NUwyU0pON1NCOEpJRDZSTTQyTEslMkYyMDI0MTEyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjJUMDc1MDM2WiZYLUFtei1FeHBpcmVzPTQzMTk5JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJMVRESlRTazQzVTBJNFNrbEVObEpOTkRKTVN5SXNJbVY0Y0NJNk1UY3pNak13TXpreU15d2ljR0Z5Wlc1MElqb2lZMkZwZVhVaWZRLndXejZwanQ3UUJCLUw4YXF0NW9jRG1WYTg4U1VsTFdmSWJtVHFoeld2UDFBcnZTckNEYVdnNVVnREFCTUxCX3M3djNoZ1RaZXNuS0hWU09tMk1VV2dBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9OTY2MWJmMDZlYzdmNDZkMzFiNDdjMzhiODdmZTZmODM4ZGM1ZDVlY2Y0YzgyODNlMmE4YmI2OTFhMDQzMTE0Mg', name: '学习区' },
          { url: 'http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9yZWxheC1hcmVhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPTVMMlNKTjdTQjhKSUQ2Uk00MkxLJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDA3NTA1MFomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSTFUREpUU2s0M1UwSTRTa2xFTmxKTk5ESk1TeUlzSW1WNGNDSTZNVGN6TWpNd016a3lNeXdpY0dGeVpXNTBJam9pWTJGcGVYVWlmUS53V3o2cGp0N1FCQi1MOGFxdDVvY0RtVmE4OFNVbExXZklibVRxaHpXdlAxQXJ2U3JDRGFXZzVVZ0RBQk1MQl9zN3YzaGdUWmVzbktIVlNPbTJNVVdnQSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTcyNmEwZTViZjhkZmYxNzllNDU4NzU4ZDFhYWE4ZjY4MWI0YTVjZDM4NDkyODk3OGEwYjUwMzM2OTdlOWRlZGE', name: '休息区' },
          { url: 'http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9tb2Rlcm4tcm9vbS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD01TDJTSk43U0I4SklENlJNNDJMSyUyRjIwMjQxMTIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEyMlQwNzUxMDRaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUkxVERKVFNrNDNVMEk0U2tsRU5sSk5OREpNU3lJc0ltVjRjQ0k2TVRjek1qTXdNemt5TXl3aWNHRnlaVzUwSWpvaVkyRnBlWFVpZlEud1d6NnBqdDdRQkItTDhhcXQ1b2NEbVZhODhTVWxMV2ZJYm1UcWh6V3ZQMUFydlNyQ0RhV2c1VWdEQUJNTEJfczd2M2hnVFplc25LSFZTT20yTVVXZ0EmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT00ODA5NDkxZDM2YWQ1NzkzOWE4YTMyZWYyMGE2MWY4ODI1NjQ2MWQ4ZjFkM2I2MzFhMmMwOTQ0ZjAxY2MwYzcx', name: '讨论室' }
        ],
        latestNotice: {
          title: '元旦假期营业时间调整通知',
          time: '2024-12-28'
        }
      }
    },
  
    onLoad() {
      this.getCurrentLocation()
    },
  
    onPullDownRefresh() {
      this.getCurrentLocation()
      setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1000)
    },
  
    methods: {
      async getCurrentLocation() {
        try {
          const location = await this.getLocation()
          const distance = this.calculateDistance(
            location.latitude,
            location.longitude,
            this.storeInfo.latitude,
            this.storeInfo.longitude
          )
          this.storeInfo.distance = distance.toFixed(1)
        } catch (error) {
          console.error('获取位置失败：', error)
          uni.showToast({
            title: '获取位置信息失败',
            icon: 'none'
          })
        }
      },
  
      getLocation() {
        return new Promise((resolve, reject) => {
          uni.getLocation({
            type: 'gcj02',
            success: res => resolve(res),
            fail: err => reject(err)
          })
        })
      },
  
      calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371
        const dLat = this.deg2rad(lat2 - lat1)
        const dLon = this.deg2rad(lon2 - lon1)
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return R * c
      },
  
      deg2rad(deg) {
        return deg * (Math.PI/180)
      },
  
      openLocation() {
        uni.openLocation({
          latitude: this.storeInfo.latitude,
          longitude: this.storeInfo.longitude,
          name: this.storeInfo.name,
          address: this.storeInfo.address
        })
      },
  
      toggleLight: debounce(function() {
        this.lightStatus = !this.lightStatus
        uni.showToast({
          title: this.lightStatus ? '已开灯' : '已关灯',
          icon: 'none'
        })
      }, 500),
  
      openDoor: throttle(function() {
        uni.showLoading({
          title: '开门中...'
        })
        
        setTimeout(() => {
          uni.hideLoading()
          uni.showToast({
            title: '开门成功',
            icon: 'success'
          })
        }, 1500)
      }, 3000),
  
      switchTab(path, index) {
        this.currentTab = index
        if (path !== '/pages/index/index') {
          uni.switchTab({ url: path })
        }
      },
  
      scanCode() {
        uni.scanCode({
          success: (res) => {
            console.log('扫码结果：', res)
            // 处理扫码结果
          }
        })
      },
  
      goToBooking() {
        uni.switchTab({
          url: '/pages/booking/index'
        })
      },
  
      showMorePhotos() {
        uni.navigateTo({
          url: '/pages/gallery/index'
        })
      },
  
      previewImage(index) {
        uni.previewImage({
          urls: this.environmentPhotos.map(photo => photo.url),
          current: index
        })
      },
  
      showNoticeDetail() {
        uni.navigateTo({
          url: '/pages/notice/detail'
        })
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .page-container {
    min-height: 100vh;
    background-color: #F8F9FA;
    padding-bottom: 120rpx;
  }
  
  .banner {
    height: 400rpx;
    
    .swiper-item {
      image {
        width: 100%;
        height: 100%;
        transition: transform 0.3s;
      }
    }
  }
  
  .quick-actions {
    padding: 20rpx 30rpx;
    
    .action-btn {
      background: linear-gradient(135deg, #4A90E2, #357ABD);
      border-radius: 50rpx;
      height: 88rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 28rpx;
      box-shadow: 0 8rpx 16rpx rgba(74,144,226,0.2);
      
      image {
        width: 36rpx;
        height: 36rpx;
        margin-right: 12rpx;
      }
    }
  }
  
  .store-card {
    margin: 30rpx;
    background: white;
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 24rpx rgba(0,0,0,0.06);
    
    .store-image {
      width: 100%;
      height: 320rpx;
    }
    
    .store-content {
      padding: 24rpx;
      
      .store-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20rpx;
        
        .store-name {
          font-size: 32rpx;
          font-weight: 600;
          color: #333;
        }
        
        .distance {
          font-size: 24rpx;
          color: #4A90E2;
        }
      }
      
      .detail-item {
        display: flex;
        align-items: center;
        margin-top: 16rpx;
        font-size: 26rpx;
        color: #666;
        
        image {
          width: 32rpx;
          height: 32rpx;
          margin-right: 12rpx;
        }
        
        &.address {
          .navigate {
            margin-left: auto;
            color: #4A90E2;
            padding: 4rpx 16rpx;
            border: 2rpx solid #4A90E2;
            border-radius: 24rpx;
            font-size: 24rpx;
          }
        }
      }
    }
  }
  
  .feature-section {
    margin: 30rpx;
    
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
      }
    }
    
    .feature-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20rpx;
      
      .feature-item {
        background: white;
        border-radius: 20rpx;
        padding: 30rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
        
        .feature-icon {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16rpx;
          background: #F5F7FA;
          transition: all 0.3s;
          
          &.active {
            background: #4A90E2;
            
            image {
              filter: brightness(0) invert(1);
            }
          }
          
          image {
            width: 50rpx;
            height: 50rpx;
          }
        }
        
        text {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .status-text {
          font-size: 24rpx;
          color: #999;
        }
      }
    }
  }
  
  .environment-section {
    margin: 30rpx;
    
    .section-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      
      .title {
        font-size: 32rpx;
        font-weight: 600;
        color: #333;
      }
      
      .more {
        font-size: 26rpx;
        color: #4A90E2;
      }
    }
    
    .environment-scroll {
      width: 100%;
      white-space: nowrap;
      
      .photo-list {
        display: inline-flex;
        padding: 10rpx 0;
        
        .photo-item {
          margin-right: 20rpx;
          width: 280rpx;
          border-radius: 16rpx;
          overflow: hidden;
          box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
          
          image {
            width: 280rpx;
            height: 200rpx;
          }
          
          text {
            display: block;
            padding: 16rpx;
            font-size: 26rpx;
            color: #333;
            background: white;
          }
        }
      }
    }
  }
  
  .notice-section {
    margin: 30rpx;
    
    .notice-card {
      background: white;
      border-radius: 20rpx;
      padding: 24rpx;
      display: flex;
      align-items: center;
      box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.04);
      
      .notice-icon {
        width: 80rpx;
        height: 80rpx;
        border-radius: 16rpx;
        background: #F5F7FA;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20rpx;
        
        image {
          width: 40rpx;
          height: 40rpx;
        }
      }
      
      .notice-content {
        flex: 1;
        
        .notice-title {
          font-size: 28rpx;
          color: #333;
          margin-bottom: 8rpx;
        }
        
        .notice-time {
          font-size: 24rpx;
          color: #999;
        }
      }
      
      .notice-arrow {
        width: 40rpx;
        height: 40rpx;
        
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100rpx;
    background: white;
    display: flex;
    padding-bottom: env(safe-area-inset-bottom);
    box-shadow: 0 -2rpx 20rpx rgba(0,0,0,0.05);
    
    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-top: 10rpx;
      
      image {
        width: 48rpx;
        height: 48rpx;
        margin-bottom: 6rpx;
      }
      
      text {
        font-size: 24rpx;
        color: #999;
      }
      
      &.active {
        text {
          color: #4A90E2;
        }
      }
    }
  }
  </style>