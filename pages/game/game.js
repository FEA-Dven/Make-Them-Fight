//index.js
//获取应用实例
const app = getApp()
const role = require('./role.js')
const dart = require('./dart.js')
const handmove = require('./handmove.js')

Page({
  data: {
    windowHeight:'',
    score:0,
    canvasData:'',
    groundHeight:'',
    groundWidth:'',
    groundColor:['#F4606C','#19CAAD','#815BFF','#D1BA74','#A0EEE1','#28FF28'],
    attackTimer:'',
    dartTimer:'',
    level:'',
    gameover : {
      status : true,
      message : "你输了"
    },
    clickstate:true,
    throwstate:true,
  },
  //页面加载
  onLoad: function (options) {
    let self = this
    //获取用户选择难度
    let level = options.level;
    wx.getSystemInfo({
        success: function(res) {
          console.log(res.windowHeight)
          self.setData({
            windowHeight:res.windowHeight,
            groundHeight:((res.windowHeight-40)/level) - 10,
            groundWidth:res.windowWidth
          })
        }
      }) 
    self.setData({
      level:level
    })
    //初始化对象，画出初始化图片
    let shuzu = []; 
    for(var i=0;i<this.data.level;i++){
      let _obj = {role:'',dart:'',hand:'',deadnum:1,bgc:this.data.groundColor[i],};
      shuzu.push(_obj)
      shuzu[i].role = new role.role(-10,(self.data.groundHeight-70), 70, 70,i,1,self)
      shuzu[i].dart = new dart.dart(1000,self.data.groundHeight-40, 20, 20,i,0,1,1,self)
      shuzu[i].hand = new handmove.handmove(self.data.groundWidth-30,self.data.groundHeight-38,30,50,1,i,self)
      const ctx = wx.createCanvasContext('canvas'+i);
      ctx.drawImage('../../assets/r1.png', -10,(self.data.groundHeight-70), 70, 70);
      ctx.drawImage('../../assets/diren1.png', self.data.groundWidth-30,self.data.groundHeight-38,30,40);
      ctx.draw()
    }
    self.setData({
      canvasData:shuzu,
    })
    // // 设置定时器让哪一列扔飞镖
    let timer = setInterval(function(){
      let num = Math.floor(Math.random()*self.data.level)
      let shuzu = self.data.canvasData;
      if(shuzu[num].dart.show==false){
        self.dartMove(num)
      }   
    },500)
    self.setData({
      attackTimer:timer,
    })  
  },
  //点击屏幕挥动剑，判断飞镖是否在范围内，在就消灭
  defend:function(e){
    let self = this
    let sy = e.target.dataset.index
    self.upDate('click',sy)
  },
  //飞镖的移动，超过一定范围游戏结束
  dartMove:function(num){
    let self = this
    let shuzu = self.data.canvasData;
    self.upDate('throw',num)
  },
  //跳转到结束页面
  gameover:function(){
    let self = this
    wx.redirectTo({
      url: '/pages/end/end?level='+self.data.level+'&score='+self.data.score
    })
  },
  //根据state判断执行更新
  upDate:function(state,index){
    let self = this
    let shuzu = self.data.canvasData;
    if(state=='click'){
        //判断人物是否在移动
    if(shuzu[index].role.moving==false){
        //判断飞镖位置是否可以消灭
      if(shuzu[index].dart.x > 20 && shuzu[index].dart.x < 80){
        //调用声音
        const audioCtx = wx.createAudioContext('myAudio'+index)
        audioCtx.play()
        shuzu[index].dart.val = 0
        shuzu[index].dart.show = false
        shuzu[index].dart.x = self.data.groundWidth+100
        clearInterval(shuzu[index].dart.timer)
        let score = self.data.score 
        score += 1
        self.setData({
          canvasData:shuzu,
          score:score
        })
      }
      shuzu[index].role.moving = true
      self.setData({
        canvasData:shuzu
      })
      }
    }else if(state=="throw"){
        shuzu[index].dart.show = true;
        shuzu[index].hand.throw = true;
        self.setData({
         canvasData:shuzu
        })
      }
    let timer = setInterval(function(){
      let mydata = self.data.canvasData;
      if(state=='click'){
        mydata[index].role.defend(mydata,timer) 
      }else if(state=='throw'){
        mydata[index].hand.move(mydata)
        mydata[index].dart.move(mydata,timer)
      }
    },1000/30)
  },
  touchStart:function(){

  },
  touchMove:function(){

  }
})
