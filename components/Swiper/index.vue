<template>
  <swiper
    class="swiper-container"
    :indicator-dots="true"
    :autoplay="true"
    :interval="3000"
    :duration="500"
    indicator-active-color="#4A90E2"
  >
    <swiper-item v-for="(item, index) in swiperList" :key="index">
      <image :src="item.imageUrl" mode="aspectFill" />
    </swiper-item>
  </swiper>
</template>

<style lang="scss">
.swiper-container {
  height: 400rpx;
  border-radius: 20rpx;
  overflow: hidden;
  margin: 20rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
  
  image {
    width: 100%;
    height: 100%;
  }
}
</style> 