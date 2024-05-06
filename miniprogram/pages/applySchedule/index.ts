import { getApplyList, getInvestigateList } from "../../services/api";

import { ApplyStatusTexts } from "../../utils/util";

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
    const { applyId, ...rest } = options;
    console.log(rest);
    getInvestigateList({applyId}, {
        success: (result: any) => {
            console.log(result);
            this.setData({
                applyDetail: result,
                productData: rest
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