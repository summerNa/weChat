// pages/route/route.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        app.globalData.code = res.code
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            app.globalData.hasUserInfo = true
            wx.request({
              url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/add_userinfo.php',
              method: 'POST',    //必须大写哦        
              header: {
                "Content-Type": "application/json",
                "clienttype": app.globalData.clienttype
              },
              data: {
                js_code: app.globalData.code,
                iv: res.iv,
                encryptedData: res.encryptedData
              },
              success: function (res) {
                //success 
                app.globalData.user_id = res.data.id
                if (options.start_user_id) {
                  wx.redirectTo({
                    url: '../index2/index2?start_user_id=' + options.start_user_id
                  })
                } else if (options.scene) {
                  try {
                    console.log(options.scene)
                    var userId = decodeURIComponent(options.scene).split('=')[1]
                    wx.redirectTo({
                      url: '../index2/index2?start_user_id=' + userId
                    })
                  }
                  catch (e) {
                    wx.redirectTo({
                      url: '../index/index'
                    })
                  }
                } else {
                  wx.redirectTo({
                    url: '../index/index'
                  })
                }
              },
              fail: function () {
                // fail         
              },
              complete: function () {
                // complete          
              }
            })
          }, fail: function () {
            wx.showModal({
              title: '警告',
              content: '您点击了拒绝授权,将无法正常显示个人信息,点击确定重新获取授权。',
              success: function (res) {
                if (res.confirm) {
                  wx.openSetting({
                    success: (res) => {
                      if (res.authSetting["scope.userInfo"]) {////如果用户重新同意了授权登录
                        wx.getUserInfo({
                          success: res => {
                            app.globalData.userInfo = res.userInfo
                            app.globalData.hasUserInfo = true
                            wx.request({
                              url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/add_userinfo.php',
                              method: 'POST',    //必须大写哦        
                              header: {
                                "Content-Type": "application/json",
                                "clienttype": app.globalData.clienttype
                              },
                              data: {
                                js_code: app.globalData.code,
                                iv: res.iv,
                                encryptedData: res.encryptedData
                              },
                              success: function (res) {
                                //success 
                                app.globalData.user_id = res.data.id
                                if (options.start_user_id) {
                                  wx.redirectTo({
                                    url: '../index2/index2?start_user_id=' + options.start_user_id
                                  })
                                } else if (options.scene) {
                                  try {
                                    var userId = decodeURIComponent(options.scene).split('=')[1]
                                    wx.redirectTo({
                                      url: '../index2/index2?start_user_id=' + userId
                                    })
                                  } catch (e) {
                                    wx.redirectTo({
                                      url: '../index/index'
                                    })
                                  }
                                } else {
                                  wx.redirectTo({
                                    url: '../index/index'
                                  })
                                }
                              },
                              fail: function () {
                                // fail         
                              },
                              complete: function () {
                                // complete          
                              }
                            })
                          }
                        })
                      }
                    }, fail: function (res) {
                    }
                  })
                }
              }
            })
          }, complete: function (res) {
          }
        })
      }
    })

  },

})