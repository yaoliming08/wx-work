// pages/my/my.ts
import { getUserInfo, getAuthUrl } from "../../services/api";
import { StoreKeys } from "../../utils/keys";
import {  onLogin } from "../../utils/util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLogin: false,
        userInfo: null,
        isShowPopup: false,

        servicePhone:wx.getStorageSync(StoreKeys.servicePhone),
        recordTabs: [
            {
                icon: '/images/my/icon-apply.png',
                text: '申请记录',
                path: '/pages/applyRecordList/index'
            },
            {
                icon: '/images/my/icon-repayment.png',
                text: '用还款记录',
                path: '/pages/payment/index'
            },
            {
                icon: '/images/my/icon-client.png',
                text: '我的客户经理',
                path: '/pages/serveManager/serveManager'
            }
        ],

        lists: [
            {
                text: '实名认证',
                icon: "/images/my/icon-list-1.png",
                isNeedAuth: true,
            },
            {
                text: '授权记录',
                icon: "/images/my/icon-list-2.png",
                isNeedAuth: true
            },
            {
                text: '结清证明',
                icon: "/images/my/icon-list-4.png",
                isNeedAuth: true
            },
            {
                text: '礼券包',
                icon: "/images/my/icon-list-6.png",
                path: "/moduleA/pages/giftVoucher/index",
                isNeedAuth: true
            },
            {
                text: '常见问题',
                icon: "/images/my/icon-list-7.png",
                path: "/moduleA/pages/commonQuestion/index",
            },
            {
                text: '待办任务',
                icon: "/images/my/icon-list-8.png",
                path: "/moduleA/pages/agencyTask/index",
                isNeedAuth: true
            },
            {
                text: '隐私管理',
                icon: "/images/my/icon-list-9.png",
                path: "/moduleA/pages/privacyList/index"
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        // if (wx.getStorageSync(StoreKeys.token)) {
        //     this.queryUserInfo();
        // };
    },
    onShow() {
        this.setData({
            isLogin: wx.getStorageSync(StoreKeys.token),
        });
        if (wx.getStorageSync(StoreKeys.token)) {
            this.queryUserInfo();
        };
    },
    queryUserInfo() {
        getUserInfo({}, {
            success: (result: any) => {
                const { userInfo = null } = result;
                this.setData({
                    userInfo,
                    isLogin: true
                })
            }
        });
    },

    getRealtimePhoneNumber(e: WechatMiniprogram.ButtonGetPhoneNumber) {
        const code = e?.detail?.code;
        if (!code) {
            wx.showToast({ title: '授权失败，请重试', icon: 'error' });
            return;
        } else {
            onLogin(code, this.queryUserInfo);
            
        }
    },
    onCallPhone() {
        wx.makePhoneCall({
            phoneNumber: this.data.servicePhone
        })
    },
    onClickTab: function (e: WechatMiniprogram.BaseEvent) {
        const { index } = e.currentTarget.dataset;
        const { path = '' } = this.data.recordTabs[index];
        if(this.data.userInfo?.realNameFlag === '0') {
            this.setData({
                isShowPopup: true
            })
        } else {
            wx.navigateTo({
                url: path
            })
        }
    },
    onClickItem: function (e: WechatMiniprogram.BaseEvent) {
        const { index } = e.currentTarget.dataset;
        const { path = '', isNeedAuth } = this.data.lists[index];
        if ( isNeedAuth && this.data.userInfo?.realNameFlag === '0') {
            this.setData({
                isShowPopup: true
            })
        } else {
            if(!path) return;
            wx.navigateTo({
                url: path
            })
        }
    },
    goDetail() {
        wx.navigateTo({
            url: '/pages/userDetail/index'
        })
    },
    onRealName() {
        getAuthUrl({
            authType: 2,
            supply: 'tencent',
            authScene: 'SCENE_001',
            productCode: 'test001'
        }, {
            success: (result) => {
                const { authToken = '' } = result;
                this.setData({
                    isShowPopup: false
                })
                wx.navigateTo({
                    url: `/pages/transfer/index?authToken=${authToken}&path=/pages/my/my`
                })
            }
        })
    }
})