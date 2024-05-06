// pages/applyRecordList/index.ts
import { getApplyList } from "../../services/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    applyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    getApplyList({}, {
        success: (result: any) => {
            this.setData({
                applyList: result
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

  goSecurityDetail(event) {
    const { applyAssureId = '' } = event.currentTarget.dataset;
    if (!applyAssureId) {
        wx.showToast({title: '暂无担保详情'})
    }
    wx.navigateTo({url: `/pages/securityDetail/index?applyAssureId=${applyAssureId}`})
  },
  addSecurity(event) {
    const { applyAssureId = '' } = event.currentTarget.dataset;
    wx.navigateTo({url: `/pages/securityEdit/index?applyAssureId=${applyAssureId}`})
  },
  goApplyDetail(event) {
    const { index } = event.currentTarget.dataset;
    const { applyId = '', productName = '', loanAmount = '', loanRate = '' } =  this.data.applyList[index] ?? {}
    wx.navigateTo({
        url: `/pages/applySchedule/index?applyId=${applyId}&productName=${productName??''}&loanAmount=${loanAmount ?? ''}&loanRate=${loanRate ?? ''}`
    })
  }
})


