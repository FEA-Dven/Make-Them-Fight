function handmove(x,y,width,height,handnum,index,self){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height; 
	this.handnum = handnum;
	this.index = index;
	this.throw = false
	this.move = function(data){
	  const ctx = wx.createCanvasContext('canvas'+this.index);
      if(data[this.index].hand.handnum>=5){
        data[this.index].hand.handnum = 1
        data[this.index].hand.throw = false
        ctx.drawImage('../../assets/r'+data[this.index].role.val+'.png', -10,(self.data.groundHeight-70), 70, 70)
        ctx.drawImage('../../assets/diren1.png', this.x, this.y, this.width, this.height)
        ctx.draw()
        self.setData({
          canvasData:data
        })
      }else if(data[this.index].hand.throw == true){
        data[this.index].hand.handnum += 1
        ctx.drawImage('../../assets/r'+data[this.index].role.val+'.png', -10,(self.data.groundHeight-70), 70, 70)
        ctx.drawImage('../../assets/diren'+data[this.index].hand.handnum+'.png', this.x, this.y, this.width, this.height)
        ctx.draw()
        self.setData({
          canvasData:data
        })
      }
	}
}

module.exports = {
	handmove:handmove
}