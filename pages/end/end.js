//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:{},
    windowHeight:'',
    score:'',
    level:''
  },
  //页面加载
  onLoad: function (options) {
    let self = this
    let level = options.level 
    let score = options.score 
    self.setData({
      level:level,
      score:score
    })
     wx.getSystemInfo({
        success: function(res) {
          self.setData({
            windowHeight:res.windowHeight,
            windowWidth:res.windowWidth
          })
        }
      }) 
  },
  tryagain:function(){
    let self = this
    wx.redirectTo({
      url: '/pages/game/game?level='+self.data.level
    })
  },
  backhome:function(){
    wx.redirectTo({
      url: '/pages/index/index'
    })
  }
  
})
