// pages/productDetail/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: any) {
    console.log(options,'url11111111111')
    const { url = "https://miniprogram.lixuepeng.cn/group1/M00/00/04/birvhmXmhbGASfyuAAQLg4-xcC8796.png" } = options;
    this.setData({
        imgUrl: url
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onShare() {
    wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
    })
  }
})