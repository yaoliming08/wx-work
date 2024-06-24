// pages/userDetail/index.ts
import { getUserInfo, signOff } from "../../services/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        show: false,
        offText: '注销操作将清空您在本产品所有数据，若账户下存在优惠券、礼品卡、奖励等资产均视为放弃，注册完成后所有数据无法恢复，再次进入产品视为重新注册登录，请谨慎操作!'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.queryUserInfo();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    queryUserInfo() {
        getUserInfo({}, {
            success: (result: any) => {
                const { userInfo = null } = result;
                this.setData({
                    userInfo
                })
            }
        });
    },
    onExit() {
        wx.clearStorageSync();
        wx.redirectTo({
            url: "/pages/login/index"
        })
    },
    onLogoff() {
        this.setData({
            show: true
        });

    },
    onConfirm() {
  
        signOff({}, {
            success: (res) => {
                wx.showToast({
                    icon: 'none',
                    title: '注销成功'
                });

                wx.clearStorageSync();
                setTimeout(() => {
                    wx.exitMiniProgram();
                    wx.redirectTo({
                        // url: "/pages/middleware/index",
                         url: "/pages/login/index"
                      });
                }, 2000)
            }
        })
    }

})