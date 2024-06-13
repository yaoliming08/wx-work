// pages/creditResult/index.ts
import { creditCommit } from "../../services/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
     result: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      console.log(options);
      const { applyId = '', areaCode = '', bizToken } = options;
      this.onApplyCredit(applyId, areaCode, bizToken);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  onBackHome() {
      wx.switchTab({
          url: `/pages/index/index`
      })
  },
  onApplyCredit(applyId, areaCode, bizToken) {
      console.log(applyId, areaCode, bizToken);
    creditCommit({productCode: 'test001', applyId, areaCode, bizToken}, {
        success: (result) => {
            this.setData({
                result: 1
            })
        },
        fail: (res) => {
            this.setData({
                result: 2
            })
        }
    })
  }
})