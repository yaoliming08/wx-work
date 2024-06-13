// pages/securityDetail/index.ts
import { getAssureHistory } from "../../services/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    assureList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { applyId = '' } = options;
    getAssureHistory({applyId }, {
        success: (result: any) => {
            this.setData({
                assureList: result
            })
        }
    })
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
})