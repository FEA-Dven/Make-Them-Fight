function dart(x,y,width,height,index,val,rotateNum,deadnum,self){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.index = index;
	this.val = val;
  this.rotateNum = rotateNum;
  this.deadnum = deadnum;
	this.show = false
  let timer;
  this.timer = timer
	this.move = function(data,timer){
		const ctx = wx.createCanvasContext('canvas'+this.index);
		data[this.index].dart.timer = timer
		data[this.index].dart.val += 1
    data[this.index].dart.rotateNum +=1
    if(data[this.index].dart.rotateNum>2){
      data[this.index].dart.rotateNum = 1
    }
    data[this.index].dart.x = self.data.groundWidth-40-(data[this.index].dart.val*5)
    ctx.drawImage('../../assets/dart'+[this.rotateNum]+'.png',data[this.index].dart.x, this.y, 20, 20)
	  ctx.drawImage('../../assets/r'+data[this.index].role.val+'.png', data[this.index].role.x, data[this.index].role.y, 70, 70)
	  ctx.drawImage('../../assets/diren'+data[this.index].hand.handnum+'.png', self.data.groundWidth-30,self.data.groundHeight-38,30,40)
	  ctx.draw()
    if(data[this.index].dart.x < 15){
      data[this.index].dart.show = false
      clearInterval(self.data.attackTimer)
      for(var i=0;i<self.data.level;i++){
      	clearInterval(data[i].dart.timer)
      }
      self.setData({
        canvasData:data
      })
      const ctx = wx.createCanvasContext('canvas'+index);
      ctx.drawImage('../../assets/diren1.png',self.data.groundWidth-30,self.data.groundHeight-38,30,40)
      ctx.drawImage('../../assets/dead'+data[this.index].dart.deadnum+'.png',0,self.data.groundHeight-38,30,40)
      ctx.draw()
      let that = this
        data[that.index].dart.timer = setInterval(function(){
        let mydata = self.data.canvasData
        if(mydata[that.index].dart.deadnum>3){
          clearInterval(mydata[that.index].dart.timer);
          self.gameover()
        }else{
          const ctx = wx.createCanvasContext('canvas'+index);
          ctx.drawImage('../../assets/dead'+mydata[that.index].dart.deadnum+'.png',0,self.data.groundHeight-38,30,40)
          ctx.drawImage('../../assets/diren1.png',self.data.groundWidth-30,self.data.groundHeight-38,30,40)
          ctx.draw()
          mydata[that.index].dart.deadnum += 1
          self.setData({
            canvasData:mydata
          })
        }
        },1000/30)
    } 
    self.setData({
      canvasData:data
    })
	}
}

module.exports = {
	dart:dart
}