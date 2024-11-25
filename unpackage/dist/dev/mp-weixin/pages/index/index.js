"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      tabList: [
        {
          text: "首页",
          pagePath: "/pages/index/index",
          icon: "",
          selectedIcon: ""
        },
        {
          text: "预约",
          pagePath: "/pages/booking/index",
          icon: "",
          selectedIcon: ""
        },
        {
          text: "发现",
          pagePath: "/pages/discover/index",
          icon: "",
          selectedIcon: ""
        },
        {
          text: "我的",
          pagePath: "/pages/profile/index",
          icon: "",
          selectedIcon: ""
        }
      ],
      banners: [
        {
          id: 1,
          imageUrl: "http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvYmFubmVyL2Jhbm5lcjEucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9NUwyU0pON1NCOEpJRDZSTTQyTEslMkYyMDI0MTEyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjJUMTE0MTI3WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJMVRESlRTazQzVTBJNFNrbEVObEpOTkRKTVN5SXNJbVY0Y0NJNk1UY3pNak13TXpreU15d2ljR0Z5Wlc1MElqb2lZMkZwZVhVaWZRLndXejZwanQ3UUJCLUw4YXF0NW9jRG1WYTg4U1VsTFdmSWJtVHFoeld2UDFBcnZTckNEYVdnNVVnREFCTUxCX3M3djNoZ1RaZXNuS0hWU09tMk1VV2dBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NTU3NTFkNzRjZWM2ZDE2OTg2YzhkYzkxNTEyYTlmOGQ1N2I5ZTU2MDE4OTgxNmNmOTllOWZiNWM0ODM4NTNkNA"
        },
        {
          id: 2,
          imageUrl: "http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvYmFubmVyL2Jhbm5lcjIucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9NUwyU0pON1NCOEpJRDZSTTQyTEslMkYyMDI0MTEyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjJUMTE0MTQ0WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJMVRESlRTazQzVTBJNFNrbEVObEpOTkRKTVN5SXNJbVY0Y0NJNk1UY3pNak13TXpreU15d2ljR0Z5Wlc1MElqb2lZMkZwZVhVaWZRLndXejZwanQ3UUJCLUw4YXF0NW9jRG1WYTg4U1VsTFdmSWJtVHFoeld2UDFBcnZTckNEYVdnNVVnREFCTUxCX3M3djNoZ1RaZXNuS0hWU09tMk1VV2dBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NmNlZTFjOTZkOTBjOWMxZTEwNTc0NjA0MmFkODExNmMxMmI3MGEyMjEwYzUzOTQ4ZmNkODA3MWRmM2U1NDRjZA"
        },
        {
          id: 3,
          imageUrl: "http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvYmFubmVyL2Jhbm5lcjMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9NUwyU0pON1NCOEpJRDZSTTQyTEslMkYyMDI0MTEyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjJUMTE0MTU2WiZYLUFtei1FeHBpcmVzPTQzMTk5JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJMVRESlRTazQzVTBJNFNrbEVObEpOTkRKTVN5SXNJbVY0Y0NJNk1UY3pNak13TXpreU15d2ljR0Z5Wlc1MElqb2lZMkZwZVhVaWZRLndXejZwanQ3UUJCLUw4YXF0NW9jRG1WYTg4U1VsTFdmSWJtVHFoeld2UDFBcnZTckNEYVdnNVVnREFCTUxCX3M3djNoZ1RaZXNuS0hWU09tMk1VV2dBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9ODkxNzI3MGQwNWYwY2FlM2MyNWViYmY0NTZlMjRjMTQ2NDc5MzkyYjVkMzEyODc3MDg0MzJiODc2YTg5ODdjNw"
        }
      ],
      storeInfo: {
        name: "寂静空间自习室",
        image: "http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9pbmRleC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD01TDJTSk43U0I4SklENlJNNDJMSyUyRjIwMjQxMTIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEyMlQwNzQyMjZaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUkxVERKVFNrNDNVMEk0U2tsRU5sSk5OREpNU3lJc0ltVjRjQ0k2TVRjek1qTXdNemt5TXl3aWNHRnlaVzUwSWpvaVkyRnBlWFVpZlEud1d6NnBqdDdRQkItTDhhcXQ1b2NEbVZhODhTVWxMV2ZJYm1UcWh6V3ZQMUFydlNyQ0RhV2c1VWdEQUJNTEJfczd2M2hnVFplc25LSFZTT20yTVVXZ0EmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT0wM2RhZWRkZmM3NmMxOGNlNzBlMmQ4MjkxMmE0N2Q2YmVkMzJlYjJjM2M3ODMxYWViZWEyN2JhOGM2MDI0OGU1",
        distance: "0.8",
        businessHours: "营业时间：09:00-23:00",
        address: "呼和浩特市赛罕区金桥开发区玖都公馆",
        latitude: 40.781,
        longitude: 111.741624
      },
      lightStatus: false,
      doorStatus: false,
      environmentPhotos: [
        { url: "http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9yZWFkLXNwYWNlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPTVMMlNKTjdTQjhKSUQ2Uk00MkxLJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDA3NTAwNVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSTFUREpUU2s0M1UwSTRTa2xFTmxKTk5ESk1TeUlzSW1WNGNDSTZNVGN6TWpNd016a3lNeXdpY0dGeVpXNTBJam9pWTJGcGVYVWlmUS53V3o2cGp0N1FCQi1MOGFxdDVvY0RtVmE4OFNVbExXZklibVRxaHpXdlAxQXJ2U3JDRGFXZzVVZ0RBQk1MQl9zN3YzaGdUWmVzbktIVlNPbTJNVVdnQSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTM5ZWQ2NjlmYTQwNGQ4NjJkODhhNTVlZThjMWYyOWNiNDFmYzZhYmFhNTY0MGMyNmMzNDNlYmNkYjU3ZGMzOWY", name: "阅读区" },
        { url: "http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9zZWxmLXJvb20ucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9NUwyU0pON1NCOEpJRDZSTTQyTEslMkYyMDI0MTEyMiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDExMjJUMDc1MDM2WiZYLUFtei1FeHBpcmVzPTQzMTk5JlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJMVRESlRTazQzVTBJNFNrbEVObEpOTkRKTVN5SXNJbVY0Y0NJNk1UY3pNak13TXpreU15d2ljR0Z5Wlc1MElqb2lZMkZwZVhVaWZRLndXejZwanQ3UUJCLUw4YXF0NW9jRG1WYTg4U1VsTFdmSWJtVHFoeld2UDFBcnZTckNEYVdnNVVnREFCTUxCX3M3djNoZ1RaZXNuS0hWU09tMk1VV2dBJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9OTY2MWJmMDZlYzdmNDZkMzFiNDdjMzhiODdmZTZmODM4ZGM1ZDVlY2Y0YzgyODNlMmE4YmI2OTFhMDQzMTE0Mg", name: "学习区" },
        { url: "http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9yZWxheC1hcmVhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPTVMMlNKTjdTQjhKSUQ2Uk00MkxLJTJGMjAyNDExMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMTIyVDA3NTA1MFomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSTFUREpUU2s0M1UwSTRTa2xFTmxKTk5ESk1TeUlzSW1WNGNDSTZNVGN6TWpNd016a3lNeXdpY0dGeVpXNTBJam9pWTJGcGVYVWlmUS53V3o2cGp0N1FCQi1MOGFxdDVvY0RtVmE4OFNVbExXZklibVRxaHpXdlAxQXJ2U3JDRGFXZzVVZ0RBQk1MQl9zN3YzaGdUWmVzbktIVlNPbTJNVVdnQSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTcyNmEwZTViZjhkZmYxNzllNDU4NzU4ZDFhYWE4ZjY4MWI0YTVjZDM4NDkyODk3OGEwYjUwMzM2OTdlOWRlZGE", name: "休息区" },
        { url: "http://1.30.82.35:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3NpbGVuY2UvaWNvbi9tb2Rlcm4tcm9vbS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD01TDJTSk43U0I4SklENlJNNDJMSyUyRjIwMjQxMTIyJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTEyMlQwNzUxMDRaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUkxVERKVFNrNDNVMEk0U2tsRU5sSk5OREpNU3lJc0ltVjRjQ0k2TVRjek1qTXdNemt5TXl3aWNHRnlaVzUwSWpvaVkyRnBlWFVpZlEud1d6NnBqdDdRQkItTDhhcXQ1b2NEbVZhODhTVWxMV2ZJYm1UcWh6V3ZQMUFydlNyQ0RhV2c1VWdEQUJNTEJfczd2M2hnVFplc25LSFZTT20yTVVXZ0EmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT00ODA5NDkxZDM2YWQ1NzkzOWE4YTMyZWYyMGE2MWY4ODI1NjQ2MWQ4ZjFkM2I2MzFhMmMwOTQ0ZjAxY2MwYzcx", name: "讨论室" }
      ],
      latestNotice: {
        title: "元旦假期营业时间调整通知",
        time: "2024-12-28"
      }
    };
  },
  onLoad() {
    this.getCurrentLocation();
  },
  onPullDownRefresh() {
    this.getCurrentLocation();
    setTimeout(() => {
      common_vendor.index.stopPullDownRefresh();
    }, 1e3);
  },
  methods: {
    async getCurrentLocation() {
      try {
        const location = await this.getLocation();
        const distance = this.calculateDistance(
          location.latitude,
          location.longitude,
          this.storeInfo.latitude,
          this.storeInfo.longitude
        );
        this.storeInfo.distance = distance.toFixed(1);
      } catch (error) {
        console.error("获取位置失败：", error);
        common_vendor.index.showToast({
          title: "获取位置信息失败",
          icon: "none"
        });
      }
    },
    getLocation() {
      return new Promise((resolve, reject) => {
        common_vendor.index.getLocation({
          type: "gcj02",
          success: (res) => resolve(res),
          fail: (err) => reject(err)
        });
      });
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = this.deg2rad(lat2 - lat1);
      const dLon = this.deg2rad(lon2 - lon1);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    },
    deg2rad(deg) {
      return deg * (Math.PI / 180);
    },
    openLocation() {
      common_vendor.index.openLocation({
        latitude: this.storeInfo.latitude,
        longitude: this.storeInfo.longitude,
        name: this.storeInfo.name,
        address: this.storeInfo.address
      });
    },
    toggleLight: utils_index.debounce(function() {
      this.lightStatus = !this.lightStatus;
      common_vendor.index.showToast({
        title: this.lightStatus ? "已开灯" : "已关灯",
        icon: "none"
      });
    }, 500),
    openDoor: utils_index.throttle(function() {
      common_vendor.index.showLoading({
        title: "开门中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "开门成功",
          icon: "success"
        });
      }, 1500);
    }, 3e3),
    switchTab(path, index) {
      this.currentTab = index;
      if (path !== "/pages/index/index") {
        common_vendor.index.switchTab({ url: path });
      }
    },
    scanCode() {
      common_vendor.index.scanCode({
        success: (res) => {
          console.log("扫码结果：", res);
        }
      });
    },
    goToBooking() {
      common_vendor.index.switchTab({
        url: "/pages/booking/index"
      });
    },
    showMorePhotos() {
      common_vendor.index.navigateTo({
        url: "/pages/gallery/index"
      });
    },
    previewImage(index) {
      common_vendor.index.previewImage({
        urls: this.environmentPhotos.map((photo) => photo.url),
        current: index
      });
    },
    showNoticeDetail() {
      common_vendor.index.navigateTo({
        url: "/pages/notice/detail"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.banners, (item, k0, i0) => {
      return {
        a: item.imageUrl,
        b: item.id
      };
    }),
    b: $data.storeInfo.image,
    c: common_vendor.t($data.storeInfo.name),
    d: common_vendor.t($data.storeInfo.distance),
    e: common_vendor.t($data.storeInfo.businessHours),
    f: common_vendor.t($data.storeInfo.address),
    g: common_vendor.o((...args) => $options.openLocation && $options.openLocation(...args)),
    h: common_assets._imports_0,
    i: $data.lightStatus ? 1 : "",
    j: common_vendor.t($data.lightStatus ? "关闭照明" : "开启照明"),
    k: common_vendor.t($data.lightStatus ? "已开启" : "已关闭"),
    l: common_vendor.o((...args) => $options.toggleLight && $options.toggleLight(...args)),
    m: common_assets._imports_1,
    n: common_vendor.t($data.doorStatus ? "开门中..." : "点击开门"),
    o: common_vendor.o((...args) => $options.openDoor && $options.openDoor(...args)),
    p: common_assets._imports_2,
    q: common_vendor.o((...args) => $options.scanCode && $options.scanCode(...args)),
    r: common_assets._imports_3,
    s: common_vendor.o((...args) => $options.goToBooking && $options.goToBooking(...args)),
    t: common_vendor.o((...args) => $options.showMorePhotos && $options.showMorePhotos(...args)),
    v: common_vendor.f($data.environmentPhotos, (photo, index, i0) => {
      return {
        a: photo.url,
        b: common_vendor.t(photo.name),
        c: index,
        d: common_vendor.o(($event) => $options.previewImage(index), index)
      };
    }),
    w: common_vendor.f($data.tabList, (item, index, i0) => {
      return {
        a: $data.currentTab === index ? item.selectedIcon : item.icon,
        b: common_vendor.t(item.text),
        c: index,
        d: $data.currentTab === index ? 1 : "",
        e: common_vendor.o(($event) => $options.switchTab(item.pagePath, index), index)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
