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
            },
            {
                text: '授权记录',
                icon: "/images/my/icon-list-2.png",
            },
            {
                text: '续贷/展期记录',
                icon: "/images/my/icon-list-3.png",
            },
            {
                text: '结清证明',
                icon: "/images/my/icon-list-4.png",
            },
            {
                text: '贷款征询函',
                icon: "/images/my/icon-list-5.png",
            },
            {
                text: '礼券包',
                icon: "/images/my/icon-list-6.png",
                path: "/pages/giftVoucher/index"
            },
            {
                text: '常见问题',
                icon: "/images/my/icon-list-7.png",
                path: "/pages/commonQuestion/index",
            },
            {
                text: '担保情况',
                icon: "/images/my/icon-list-8.png",
                path: "/pages/securityList/index"
            },
            {
                text: '待办任务',
                icon: "/images/my/icon-list-8.png",
                path: "/pages/agencyTask/index"
            },
            {
                text: '隐私管理',
                icon: "/images/my/icon-list-9.png",
                path: "/pages/privacyList/index"
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
            phoneNumber: '0757-960123'
        })
    },
    onClickTab: function (e: WechatMiniprogram.BaseEvent) {
        const { index } = e.currentTarget.dataset;
        const { path = '' } = this.data.recordTabs[index]
        wx.navigateTo({
            url: path
        })
    },
    onClickItem: function (e: WechatMiniprogram.BaseEvent) {
        const { index } = e.currentTarget.dataset;
        const { path } = this.data.lists[index];
        if (index) {
            wx.navigateTo({
                url: path
            })
        } else {
            if (this.data.userInfo?.realNameFlag === '0') {
                this.setData({
                    isShowPopup: true
                })
            }
        }
    },
    onRealName() {
        getAuthUrl({
            authType: 2,
            supply: 'tencent',
            authScene: 'SCENE_001',
            productCode: 'PRD001'
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