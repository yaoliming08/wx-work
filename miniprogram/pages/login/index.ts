// pages/login/index.ts
import { onLogin } from "../../utils/util";
import { onGetAddressInfo } from "../../utils/authAddress";
import { StoreKeys } from "../../utils/keys";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: true,
        lat: '',
        lng: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.setData({
            isShow: !Boolean(wx.getStorageSync(StoreKeys.isShowLoginAgree)),
            lat: '',
            lng: ''
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    onCancel() {
        wx.exitMiniProgram();
    },

    onConfirm() {
        this.getAddress();
    },

    getAddress() {
        onGetAddressInfo((res) => {
            const { location = {} } = res.result ?? {};
            const { lat, lng } = location;
            this.setData({
                lat,
                lng,
                isShow: false
            });
            wx.setStorageSync(StoreKeys.isShowLoginAgree, 'show_dialog');
        }, (err) => {
            this.setData({
                isShow: false
            });
            wx.setStorageSync(StoreKeys.isShowLoginAgree, 'show_dialog');
        })
    },

    getRealtimePhoneNumber(e: WechatMiniprogram.ButtonGetPhoneNumber) {
        const code = e?.detail?.code;
        // const { lat, lng } = this.data;
        // if (!lat || !lng) {
        //     wx.showToast({
        //         title: '请授权您的区域'
        //     });
        //     this.getAddress();
        //     return;
        // }

        if (!code) {
            wx.showToast({ title: '授权失败，请重试', icon: 'error' });
            return;
        } else {
            onLogin(code, (result: any) => {
                const { userHeadPic = '', userNickName = '' } = result.userInfo;
                if (userHeadPic && userNickName) {
                    wx.switchTab({ url: '/pages/index/index' })
                } else {
                    wx.navigateTo({
                        url: `/pages/author/index`
                    })
                }
            });
        }
    },
})