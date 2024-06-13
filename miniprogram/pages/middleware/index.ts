// pages/middleware/index.ts
import { getQrCodeInfo } from "../../services/spi";
import { StoreKeys } from "../../utils/keys";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { scene = '' } = options;
    const token = wx.getStorageSync(StoreKeys.token);
    
    if (scene) {
        wx.setStorageSync(StoreKeys._scene_, scene);
        this.jumpPath(token);
    } else {
        wx.removeStorageSync(StoreKeys._scene_);
        wx.navigateTo({
            url: '/pages/launch/index'
        })
    }
  },

  jumpPath(token) {
    if (token) {
        wx.switchTab({
            url: '/pages/index/index',
        })
    } else {
        wx.navigateTo({
            url: '/pages/launch/index'
        })
    }
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

  }
})