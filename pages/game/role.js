function role(x,y,width,height,index,val,self){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.index = index;
  this.val = val;
  this.moving = false
	this.defend = function(data,timer){
    this.timer = timer
	  if(data[this.index].dart.x > 20){
      const ctx = wx.createCanvasContext('canvas'+this.index);
      if(data[this.index].role.val<9&&this.moving==true){ 
        let imgY = self.data.groundHeight-40
        x = this.x
        ctx.drawImage('../../assets/r'+data[this.index].role.val+'.png', this.x, this.y, this.width, this.height)
        data[this.index].role.val += 1
      }else{
        data[this.index].role.val = 1
        data[this.index].role.moving = false
        let imgY = self.data.groundHeight-40
        ctx.drawImage('../../assets/r1.png', this.x, this.y, this.width, this.height)
        clearInterval(data[this.index].role.timer)
      }
      self.setData({
          canvasData:data
        })
      ctx.drawImage('../../assets/dart'+data[this.index].dart.rotateNum+'.png', data[this.index].dart.x, data[this.index].dart.y, 20, 20)
      ctx.drawImage('../../assets/diren'+data[this.index].hand.handnum+'.png', self.data.groundWidth-30,self.data.groundHeight-38,30,40)
      ctx.draw()
	}
}
}

module.exports = {
	role:role
}