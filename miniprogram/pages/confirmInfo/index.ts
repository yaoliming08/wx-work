// pages/confirmInfo/index.ts

import { getAuthResult, saveAuthResult } from "../../services/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        idCardInfo: {},
        path: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { bizToken, path } = options;
        getAuthResult({ seqNo: '', bizToken }, {
            success: (result: any) => {
                const { idCardInfo } = result;
                this.setData({
                    idCardInfo,
                    path
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
    saveInfo: function() {
        saveAuthResult({...this.data.idCardInfo}, {
            success: (result) => {
                wx.switchTab({
                    url: this.data.path ?  `${this.data.path}` : "/pages/index/index" 
                })
            }
        })
    }
})