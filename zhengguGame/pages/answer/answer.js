// pages/answer/answer.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // question: ['你是哪个星座？', '选择对象时，你更看中什么？', '你是否容易为TA吃醋？', '路上遇见一个老太太摔倒，旁边没人，你会：', '人挤的电梯里，突然需要放屁，怎么办？', '小时候有没有偷偷吃过鼻屎？', '会不会喜欢上朋友的TA？', '生活中，会自慰吗？', '你多大的时候失去的童真？', '对现在的性生活是否满意？', '你认为自己活儿好吗？','在亲密的时候会发出声音吗？'],
    question: [],
    option: [
      // ['白羊座', '水瓶座', '双鱼座', '金牛座', '巨蟹座', '狮子座', '处女座', '双子座', '摩羯座', '天秤座', '天蝎座', '射手座'],
      // ['长相（很好看但是很穷）','金钱（很有钱但是很丑）'],
      // ['我是个醋坛子', '还好','基本上不吃醋'],
      // ['马上去扶她 ', '不会帮忙，怕碰瓷','不碰她，但会叫人来帮忙 '],
      // ['直接放，反正不会知道是我', '直接放，有人闻到就怪别人', '一定要忍住，这太缺德了','把屁股掰开一点，无声的放出来'],
      // ['吃过，哈哈', '当！然！没！有！','现在偶尔还会吃'],
      // ['从来不会', '会，但不会有所行动','会，爱情比友情贵重'],
      // ['几乎每天都会', '一周一两次', '一个月几次', '很少，几个月一次吧','从来没有自慰过'],
      // ['初中时候', '高中时候', '20岁之后', '30岁之后','至今未破'],
      // ['不满意', '还可以', '很满意', '没有性生活'],
      // ['活儿不好', '感觉我还可以', '试过的都说我很厉害','我性冷淡'],
      // ['不大会，我是个木头', '会的，如果很有感觉','当然，爱爱的时候就要像AV一样才好']
    ],
    limit: 3,
    pos: 1,
    total: 6,
    answer_list: [],
    answer_num: [],
    flag: true,
    scrollTop: 0,
    scrollHeight: 0,
    hidden: false,
    flag2: true,
    phone: '',
    btn_flag: false,
    btn_text: '有人上当通知我'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cache_arr = [];
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    wx.request({
      url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/get_question_list.php',
      method: 'GET',    //必须大写哦   
      header: {
        "Content-Type": "application/json",
        "clienttype": app.globalData.clienttype
      },
      success: function (res) {
        //success
        var question_cache = [];
        var option_cache = [];
        for (var i = 0; i < res.data.total; i++) {
          question_cache.push(res.data.list[i].name);
          option_cache.push(res.data.list[i].answer);
        }
        that.setData({
          question: question_cache,
          option: option_cache
        })
        wx.request({
          url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/answer_list.php?user_id=' + app.globalData.user_id + '&pos=' + that.data.pos + '&limit=' + that.data.limit,
          method: 'GET',    //必须大写哦  
          header: {
            "Content-Type": "application/json",
            "clienttype": app.globalData.clienttype
          },
          success: function (res) {
            //success
            //是否付过钱
            that.data.total = res.data.total;
            that.setData({
              total: res.data.total
            })
            if (res.data.flag_payed || res.data.total <= 3) {
              that.setData({
                flag: true
              })
            } else if (!res.data.flag_payed && res.data.total > 3) {
              that.setData({
                flag: false
              })
            }
            for (var i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].answers.length < that.data.question.length) {
                var x = that.data.question.length - res.data.list[i].answers.length;
                for (var j = 0; j < x; j++) {
                  res.data.list[i].answers.push("0");
                }
              }
              cache_arr.push(res.data.list[i].answers)
            }
            that.setData({
              answer_list: res.data.list,
              answer_num: cache_arr,
              hidden: true
            })
          },
          fail: function () {
            // fail         
          },
          complete: function () {
            // complete          
          }
        })
      },
      bindDownLoad: function () {
        console.log(1)
      },
      fail: function () {
        // fail         
      },
      complete: function () {
        // complete          
      }
    })
  },
  payment: function () {
    var that = this;
    wx.request({
      url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/create_order.php',
      method: 'POST',    //必须大写哦   
      header: {
        "Content-Type": "application/json",
        "clienttype": app.globalData.clienttype
      },
      data: {
        user_id: app.globalData.user_id
      },
      dataType: 'json',
      success: function (res) {
        //success
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': res.data.signType,
          'paySign': res.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功',
              icon: 'none',
              image: '../../images/success.png',
              duration: 2000,
              mask: true
            })
            that.setData({
              flag: true
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败',
              icon: 'none',
              image: '../../images/fail.png',
              duration: 2000,
              mask: true
            })
          }
        })
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete          
      }
    })
  },

  onReachBottom: function () {
    var that = this;
    if (that.data.total > that.data.pos * that.data.limit) {
      that.setData({
        hidden: false
      })
      that.data.pos++;
      wx.request({
        url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/answer_list.php?user_id=' + app.globalData.user_id + '&pos=' + that.data.pos + '&limit=' + that.data.limit,
        method: 'GET',    //必须大写哦        
        header: {
          "Content-Type": "application/json",
          "clienttype": app.globalData.clienttype
        },
        success: function (res) {
          //success
          var cache_list = that.data.answer_list;
          var cache_arr = that.data.answer_num;
          for (var i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].answers.length < that.data.question.length) {
              var x = that.data.question.length - res.data.list[i].answers.length;
              for (var j = 0; j < x; j++) {
                res.data.list[i].answers.push("0");
              }
            }
            cache_arr.push(res.data.list[i].answers)
            cache_list.push(res.data.list[i])
          }
          that.setData({
            answer_list: cache_list,
            answer_num: cache_arr
          })
        },
        fail: function () {
          // fail         
        },
        complete: function () {
          // complete 
          that.setData({
            hidden: true
          })
        }
      })
    }
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

  show: function () {
    this.setData({ flag2: false })
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
            flag2: true,
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

  catch: function () {
    //阻止冒泡
  },

  hide2: function () {
    this.setData({ flag2: true })
  },

})