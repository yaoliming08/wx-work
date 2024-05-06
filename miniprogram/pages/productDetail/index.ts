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
    const { url = "https://miniprogram.lixuepeng.cn/images/prdInfo.png" } = options;
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