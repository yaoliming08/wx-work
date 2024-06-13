// pages/transfer/index.ts
import { startEid } from '../..//mp_ecard_sdk/main';

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
        const { authToken, applyId, applyAssureId = '', path = '', areaCode = '' } = options;
        if (authToken) {
            startEid({
                data: {
                    token: authToken,
                },
                verifyDoneCallback(res) {
                    const { token, verifyDone } = res;
                    if (applyId) {
                        wx.redirectTo({
                            url: `/pages/creditResult/index?applyId=${applyId}&areaCode=${areaCode || ''}&bizToken=${authToken}`
                        })
                    } else if(applyAssureId) {
                        wx.redirectTo({
                            url: `/pages/assureResult/index?applyAssureId=${applyAssureId}&bizToken=${authToken}`
                        })
                    } else {
                        wx.redirectTo({
                            url: `/pages/confirmInfo/index?bizToken=${token}&path=${path}&areaCode=${areaCode || ''}`
                        })
                    }
                    
                    console.log('收到核身完成的res:', res);
                    console.log('核身的token是:', token);
                    console.log('是否完成核身:', verifyDone);
                },
            });

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