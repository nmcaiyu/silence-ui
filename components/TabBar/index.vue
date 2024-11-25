<template>
  <view class="tab-bar">
    <view 
      v-for="(item, index) in tabs" 
      :key="index"
      class="tab-item"
      @tap="switchTab(item.pagePath)"
    >
      <image :src="currentPath === item.pagePath ? item.selectedIconPath : item.iconPath" />
      <text :class="{'active': currentPath === item.pagePath}">{{item.text}}</text>
    </view>
  </view>
</template>

<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 110rpx;
  background: #ffffff;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  
  .tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    image {
      width: 48rpx;
      height: 48rpx;
      margin-bottom: 6rpx;
    }
    
    text {
      font-size: 24rpx;
      color: #999;
      transition: color 0.3s;
      
      &.active {
        color: #4A90E2;
      }
    }
  }
}
</style> 