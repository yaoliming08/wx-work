// pages/securityEdit/index.ts
import { upLoadImage } from "../../services/api";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urls: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  onChange(event) {
      const { current } = event.detail;
    wx.uploadFile({
        url: 'https://miniprogram.lixuepeng.cn/prod-api/apminipg/fileUpload/upload',
        filePath: current[0],
        name: 'file',
        success (res){
          const data = res.data
          //do something
        }
      })
  }

})