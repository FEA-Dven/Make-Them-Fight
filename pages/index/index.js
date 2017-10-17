//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo:{},
    windowHeight:''
  },
  //页面加载
  onLoad: function () {
    let self = this
     wx.getUserInfo({
       success: res => {
         this.setData({
           userInfo: res.userInfo,
         })
       }
     }),
     wx.getSystemInfo({
        success: function(res) {
          self.setData({
            windowHeight:res.windowHeight,
            windowWidth:res.windowWidth
          })
        }
      }) 
  },
  selectlevel:function(e){
    let num = e.currentTarget.dataset.num
    wx.redirectTo({
      url: '/pages/game/game?level='+num
    })
  }
  
})
