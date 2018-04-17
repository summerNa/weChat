// pages/question/question.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cache: null,
    Q_index: 0,
    flag: true,
    // question: ['你是哪个星座？', '选择对象时，你更看中什么？', '你是否容易为TA吃醋？', '路上遇见一个老太太摔倒，旁边没人，你会：', '人挤的电梯里，突然需要放屁，怎么办？', '小时候有没有偷偷吃过鼻屎？', '会不会喜欢上朋友的TA？', '生活中，会自慰吗？', '你多大的时候失去的童真？', '对现在的性生活是否满意？', '你认为自己活儿好吗？','在亲密的时候会发出声音吗？'],
    // option: [
    //   ['白羊座', '水瓶座', '双鱼座', '金牛座', '巨蟹座', '狮子座', '处女座', '双子座', '摩羯座', '天秤座', '天蝎座', '射手座'],
    //   ['长相（很好看但是很穷）','金钱（很有钱但是很丑）'],
    //   ['我是个醋坛子', '还好','基本上不吃醋'],
    //   ['马上去扶她 ', '不会帮忙，怕碰瓷','不碰她，但会叫人来帮忙 '],
    //   ['直接放，反正不会知道是我', '直接放，有人闻到就怪别人', '一定要忍住，这太缺德了','把屁股掰开一点，无声的放出来'],
    //   ['吃过，哈哈', '当！然！没！有！','现在偶尔还会吃'],
    //   ['从来不会', '会，但不会有所行动','会，爱情比友情贵重'],
    //   ['几乎每天都会', '一周一两次', '一个月几次', '很少，几个月一次吧','从来没有自慰过'],
    //   ['初中时候', '高中时候', '20岁之后', '30岁之后','至今未破'],
    //   ['不满意', '还可以', '很满意', '没有性生活'],
    //   ['活儿不好', '感觉我还可以', '试过的都说我很厉害','我性冷淡'],
    //   ['不大会，我是个木头', '会的，如果很有感觉','当然，爱爱的时候就要像AV一样才好']
    // ],
    question: [],
    option: [],
    A: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  select: function (event) {
    if (this.data.flag) {
      if (this.data.Q_index == this.data.question.length - 1) {
        var length_A = this.data.A.length
        var cache_A = this.data.A
        cache_A[length_A] = Number(event.currentTarget.id)
        this.setData({
          A: cache_A
        });
        this.data.flag = false;
        var that = this;
        wx.request({
          url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/add_user_answer.php',
          method: 'POST',    //必须大写哦        
          header: {
            "Content-Type": "application/json",
            "clienttype": app.globalData.clienttype
          },
          data: {
            answer_sort: that.data.A.toString(),
            start_user_id: that.data.cache,
            user_id: app.globalData.user_id
          },
          success: function (res) {
            //success 
            console.log(that.data.A.toString())
            wx.redirectTo({
              url: '../result/result'
            })
          },
          fail: function () {
            // fail 
          },
          complete: function () {
            // complete          
          }
        })
      } else {
        var length_A = this.data.A.length
        var cache_A = this.data.A
        cache_A[length_A] = Number(event.currentTarget.id)
        this.setData({
          Q_index: this.data.Q_index + 1,
          A: cache_A
        });
      }
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cache: options.start_user_id
    })
    var that = this;
    wx.request({
      url: 'https://zg.heyheychuiniu.cn/zhenggu/controller/get_question_list.php',
      method: 'GET',    //必须大写哦 
      header: {
        "Content-Type": "application/json",
        "clienttype": app.globalData.clienttype
      },
      success: function (res) {
        //success
        var name = []
        var cache_option = []
        for (var i = 0; i < res.data.total; i++) {
          name.push(res.data.list[i].name)
          cache_option.push(res.data.list[i].answer)
        }
        that.setData({
          question: name,
          option: cache_option
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
  // onShareAppMessage: function () {
  // }
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