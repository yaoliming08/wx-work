// pages/active/active.ts
import { getActivityList } from "../../services/api";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeList: []
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        getActivityList({ activityType: 2 }, {
            success: (result: any) => {
                this.setData({
                    activeList: result
                })
            }
        })
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
    lookActive(e: WechatMiniprogram.BaseEvent) {
        const { url = '' } = e.currentTarget.dataset ?? {};
        wx.navigateTo({
            url: `/pages/productDetail/index?url=${url}`
        })
    }
})