// pages/securityDetail/index.ts
import { getInfoById } from "../../services/api";
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
    const { applyAssureId } = options;
    getInfoById({applyAssureId},{
        success: (result) => {
            console.log(result);
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