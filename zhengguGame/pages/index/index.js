//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '发起整蛊',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag_tousu: true,
    text_tousu: ''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //发起整蛊
  formSubmit: function (e) {
    wx.redirectTo({
      url: '../code/code?form_id=' + e.detail.formId
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log(3)
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  look_answer: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '斯纳德六角形行为分析',
      path: '/pages/route/route?start_user_id=' + app.globalData.user_id,
      imageUrl: '/images/zhenggu.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  //消失
  tijiao: function () {
    wx.showToast({
      title: '信息已提交',
      icon: 'none',
      image: '../../images/success.png',
      duration: 2000,
      mask: true
    })
    this.setData({
      flag_tousu: true,
      text_tousu: ''

    })
  },

  catch: function () {
    //阻止冒泡
  },

  hide3: function () {
    this.setData({ flag_tousu: true, text_tousu: '' })
  },
  tousu: function () {
    this.setData({ flag_tousu: false, text_tousu: '' })
  }
})
