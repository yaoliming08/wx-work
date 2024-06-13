import { getInvestigateList } from "../../services/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyDetail: [], 
    productData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { applyId } = options;
    getInvestigateList({applyId}, {
        success: (result: any) => {
            this.setData({
                applyDetail: result,
                productData: options
            })
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
})