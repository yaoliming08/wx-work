// pages/serveManager/serveManager.ts

import { searchCustManager } from "../../services/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    custData:{}

  },



  searchCustManager(){

    searchCustManager({}, {
      success: (result) => {

        this.setData({
            custData:result
        })
        console.log('获取客户经理信息',result)
      }
  })

  },


  onCallPhone() {
    wx.makePhoneCall({
        phoneNumber:  this.data.custData.managerPhone
    })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

    this.searchCustManager()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onBack() {
      wx.navigateBack()
  },
})