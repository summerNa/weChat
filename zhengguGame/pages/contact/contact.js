// pages/contact/contact.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    phone: '',
    btn_flag: false,
    btn_text: '有人上当通知我'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  //消失
  hide: function () {
    var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!re.test(this.data.phone)) {
      wx.showToast({
        title: '手机号格式不对',
        icon: 'none',
        image: '../../images/fail.png',
        duration: 2000,
        mask: true
      })
    } else {
      var that = this;
      wx.request({
        url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/set_user_mobile.php',
        method: 'POST',    //必须大写哦        
        header: {
          "Content-Type": "application/json",
          "clienttype": app.globalData.clienttype
        },
        data: {
          mobile: this.data.phone,
          user_id: app.globalData.user_id
        },
        dataType: 'json',
        success: function (res) {
          //success 
          wx.showToast({
            title: '免费通知已开通',
            icon: 'none',
            image: '../../images/success.png',
            duration: 2000,
            mask: true
          })
          that.setData({
            flag: true,
            btn_flag: true,
            btn_text: '已填写通知短信'
          })
        },
        fail: function () {
          // fail 
        },
        complete: function () {
          // complete          
        }
      })
    }
  },

  look_answer: function () {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },

  show: function () {
    this.setData({ flag: false })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  catch: function () {
    //阻止冒泡
  },

  hide2: function () {
    this.setData({ flag: true })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})