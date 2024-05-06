// index.ts
// 获取应用实例
import { getAuthUrl, getHomeInfo, beforeApplyAuth, getMarketDetail } from "../../services/api";
import { onLogin } from "../../utils/util";
import { StoreKeys } from "../../utils/keys";
// import { onGetAddressInfo } from "../../utils/authAddress";

const applyTexts = {
    '0': '申请额度',
    '1': '审批中',
    '7': '申请额度',
    '26': '去用款'
}
var app = getApp<IAppOption>();

Page({
    data: {
        isLogin: wx.getStorageSync(StoreKeys.token),
        loanData: {},
        prodList: [],
        applyTexts,
        isShow: false
    },
    onLoad() {
        this.setData({
            isShow: !Boolean(wx.getStorageSync(StoreKeys.isShowAgree))
        });
    },
    onShow() {
        this.queryHomeInfo('NO_JUMP');
        if (wx.getStorageSync(StoreKeys.token)) {
            // this.queryHomeInfo('NO_JUMP');
            this.getMarketDetail({materialType: 5})
        }
    },

    getMarketDetail(data) {
        getMarketDetail(data, {
            success: (result) => {
                console.log(result)
            }
        })
    },

    queryHomeInfo(status: string) {
        getHomeInfo({}, {
            success: (result: any) => {
                const { applyInfo, prodList} = result;
                
                this.setData({
                    loanData: applyInfo,
                    prodList,
                });
                // const { applyStatus } = this.data.loanData;
                // if (status === 'JUMP' && applyStatus === 0) {
                //     this.onApply();
                // }
            }
        })
    },
    goProductDetail: function () {
        wx.navigateTo({
            url: '/pages/productDetail/index'
        })
    },
    onApply() {
        const { allowApply = null } = this.data.loanData ?? {};
        if (allowApply  === 0) {
            wx.navigateTo({
                url: '/pages/applyRecordList/index'
            });
            return;
        };
    
        beforeApplyAuth({
            productCode: 'PRD001'
        }, {
            success: (result: any) => {
                const { authToken = null, authType, authUrl = null } = result;
                if (authType !== '0') {
                    wx.navigateTo({
                        url: `/pages/transfer/index?authToken=${authToken}`
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/loanApply/index'
                    })
                }
            }
        })
    },
    onConfirm() {
        this.setData({
            isShow: false
        })
        wx.setStorageSync(StoreKeys.isShowAgree, 'show_dialog');
    },
    onCancel() {
        wx.exitMiniProgram();
    },
    onCallPhone() {
        wx.makePhoneCall({
            phoneNumber: '0757-960123'
        })
    },
    getRealtimePhoneNumber(e: WechatMiniprogram.ButtonGetPhoneNumber) {
        const code = e?.detail?.code;
        if (!code) {
            wx.showToast({ title: '授权失败，请重试', icon: 'error' });
            return;
        } else {
            onLogin(code, () => {
                this.queryHomeInfo("JUMP");
            });
        }
    },
    onShare() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        })
    },
    onLink() {
        wx.navigateTo({
            url: "/pages/agreement/index"
        })
    },
    formatNumber(num: number) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
})
