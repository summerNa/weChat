// pages/index2/index2.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cache: null
  },

  /***
   * 开始
   */
  start: function () {
    wx.redirectTo({
      url: '../question/question?start_user_id=' + this.data.cache
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cache: options.start_user_id
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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

})