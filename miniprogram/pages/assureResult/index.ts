// pages/assureResult/index.ts
import { commitAssureInfo } from "../../services/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: true,
        isShowLeft: false,
        result: null,
        iconSuccess: "/images/icon/icon-success.png"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { applyAssureId = '', bizToken = '' } = options;
        commitAssureInfo({
            applyAssureId,
            bizToken
        }, {
            success: (result) => {
                this.setData({
                    result: 1
                })
            },
            fail: (err) => {
                this.setData({
                    result: 2
                })
            }
        });
    },
    goTask() {
        wx.navigateTo({
            url: '/moduleA/pages/agencyTask/index'
        })
    },
    onLeave() {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },
    goHome() {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
    }
})