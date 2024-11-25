<template>
  <view class="float-buttons">
    <view class="float-btn light" @tap="handleLight">
      <image :src="lightIcon" mode="aspectFit" />
    </view>
    <view class="float-btn door" @tap="handleDoor">
      <image :src="doorIcon" mode="aspectFit" />
    </view>
  </view>
</template>

<style lang="scss">
.float-buttons {
  position: fixed;
  right: 30rpx;
  bottom: 160rpx;
  z-index: 100;
  
  .float-btn {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background: #4A90E2;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20rpx;
    box-shadow: 0 4rpx 20rpx rgba(74, 144, 226, 0.3);
    transition: transform 0.3s;
    
    &:active {
      transform: scale(0.95);
    }
    
    image {
      width: 50rpx;
      height: 50rpx;
    }
  }
}
</style> 