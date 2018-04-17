// pages/code/code.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgUrl: '',
    flag: true,
    flag_tousu: true,
    phone: '',
    btn_flag: false,
    btn_text: '有人上当通知我',
    text_tousu: ''
  },
  onLoad: function (options) {
    var that = this;
    wx.downloadFile({
      url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/share_image.php?start_user_id=' + app.globalData.user_id + '&form_id=' + options.form_id, //仅为示例，并非真实的资源
      header: {
        "Content-Type": "application/json",
        "clienttype": app.globalData.clienttype
      },
      success: function (res) {
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          that.setData({
            imgUrl: res.tempFilePath
          })
        }
      }, fail: function (err) {
        console.log(err)
      }
    })
  },
  save: function () {
    console.log(this.data.imgUrl)
    wx.saveImageToPhotosAlbum({
      filePath: this.data.imgUrl,
      success(res) {
        console.log("保存图片：success");
        wx.showToast({
          title: '保存成功',
        });
      },
      fail(res) {
        console.log("保存图片：fail");
        console.log(res);
      }
    })
  },
  show: function () {
    this.setData({ flag: false })
  },

  tousu: function () {
    this.setData({ flag_tousu: false, text_tousu: '' })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
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

  hide2: function () {
    this.setData({ flag: true })
  },

  hide3: function () {
    this.setData({ flag_tousu: true, text_tousu: '' })
  },

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
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