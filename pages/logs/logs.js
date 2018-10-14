//获取应用实例
var app = getApp()
Page({
  data: {
    show: "",
  },

  onLoad: function() {
    console.log('onLoad')
  },
  click: function() {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        that.getCatImg(res.result);


      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {}
    });
  },


  //获取轮播图
  getCatImg: function(_id) {
    console.log('getCatImg' , _id)
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/book/isbn/:' + _id,
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      
      success: function(res) {
        console.log("aaaaaa", res)
        // if (res.data.code == 200) {
        //   if (res.data.object.categoryUrl != null) {


        //     var categoryUrl = Array();
        //     categoryUrl = res.data.object.categoryUrl;
        //     that.setData({
        //       imgUrls: categoryUrl,
        //     })
        //   }
        // }
      },
      fail: function(res) {
        
        console.log('fail' , res.errMsg)

      },
      complete: function(res) {
        
        console.log('complete', res)
      },

    })

  }











})