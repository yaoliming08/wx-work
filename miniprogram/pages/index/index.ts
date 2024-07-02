// index.ts
// 获取应用实例
import {
  getAuthUrl,
  getHomeInfo,
  beforeApplyAuth,
  getMarketDetail,
} from "../../services/api";
import { onLogin } from "../../utils/util";
import { StoreKeys } from "../../utils/keys";
import { onGetAddressInfo } from "../../utils/authAddress";

const applyTexts = {
  "0": "申请额度",
  "1": "审批中",
  "7": "申请额度",
  "26": "去用款",
};
let timeId = null;
var app = getApp<IAppOption>();

Page({
  data: {
    isLogin: wx.getStorageSync(StoreKeys.token),
    loanData: {},
    limitArea: "",
    prodList: [],
    bannerList: [],
    applyTexts,
    isShow: false,
    hasAssureTask: false,
    confirmText: 10,
    currentProd: {},
    servicePhone: "",
    serviceName: "",
    tipTitle: "",
    realNameFlag: "",
    isShowPopup: false,
  },
  onLoad(options) {},
  onShow() {
    this.queryHomeInfo("NO_JUMP");
    if (wx.getStorageSync(StoreKeys.token)) {
      this.getMarketDetail({ materialType: 5 });
    }
  },

  //跳转待办任务
  goTask() {
    console.log("11111111", this.data.realNameFlag);

    if (this.data.realNameFlag == "1") {
      wx.navigateTo({
        url: "/moduleA/pages/agencyTask/index",
      });
    } else {
      this.setData({
        isShowPopup: true,
      });
      console.log(123)
    }
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
},

  getMarketDetail(data) {
    getMarketDetail(data, {
      success: (result: any) => {
        const list = result ?? [].map((item) => item?.materialBanner || "");
        console.log(list);
        this.setData({
          bannerList: list,
        });
      },
    });
  },

  queryHomeInfo(status: string) {
    getHomeInfo(
      {},
      {
        success: (result: any) => {
          console.log(result, "首页获取信息接口");
          const {
            applyInfo,
            prodList,
            selectedProdList,
            limitArea,
            servicePhone,
            serviceName,
            tips = [],
            hasAssureTask,
            realNameFlag,
          } = result;
          let tipTitle = "";
          tips.filter((str) => {
            tipTitle = tipTitle + "                           " + str;
          });

          wx.setStorageSync(StoreKeys.servicePhone, servicePhone);
          wx.setStorageSync(StoreKeys.serviceName, serviceName);
          this.setData({
            loanData: applyInfo,
            limitArea,
            prodList,
            servicePhone,
            serviceName,
            tipTitle,
            hasAssureTask,
            selectedProdList,
            realNameFlag,
          });
        },
      }
    );
  },
  goProductDetail: function () {
    const { landingPage = "" } = this.data.prodList[0];
    wx.navigateTo({
      url: `/pages/productDetail/index?url=${landingPage}`,
    });
  },
  setCountTime() {
    let count = 10;
    timeId && clearInterval(timeId);
    timeId = setInterval(() => {
      if (!count) {
        clearInterval(timeId);
        return;
      }
      count--;
      this.setData({
        confirmText: count,
      });
    }, 1000);
  },
  onApply(event: any) {
    const { allowApply = null } = this.data.loanData ?? {};

    let { prodobj } = event.currentTarget.dataset ?? {};

    this.setData({
      currentProd: prodobj,
    });

    console.log(this.data.loanData, 7666);

    console.log(this.data.prodList, 111111111, event);
    if (allowApply === 0) {
      wx.navigateTo({
        url: "/pages/applyRecordList/index",
      });
      return;
    }
    this.setData({
      isShow: true,
      confirmText: 10,
    });
    this.setCountTime();
  },
  onConfirm() {
    this.setData({
      isShow: false,
    });
    onGetAddressInfo((res) => {
      const { city = "" } = res.result.address_component ?? {};
      if (
        (city && this.data.limitArea.includes(city)) ||
        this.data.limitArea.includes("none")
      ) {
        beforeApplyAuth(
          {
            productCode: this.data.currentProd.code,
          },
          {
            success: (result: any) => {
              const { authToken = null, authType, authUrl = null } = result;
              const { areaCode } = this.data.currentProd;

              console.log(this.data.currentProd, "当前产品");
              if (authType !== "0") {
                wx.navigateTo({
                  url: `/pages/transfer/index?authToken=${authToken}&areaCode=${
                    areaCode || ""
                  }`,
                });
              } else {
                wx.navigateTo({
                  url: `/pages/loanApply/index?areaCode=${areaCode}&productCode=${this.data.currentProd.code}`,
                });
              }
            },
          }
        );
      } else {
        wx.showToast({
          title: `申请地域非${this.data.limitArea}，申请失败`,
          icon: "none",
        });
      }
    });
  },
  onCancel() {
    this.setData({
      isShow: false,
    });
  },
  onCallPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.servicePhone,
    });
  },
  getRealtimePhoneNumber(e: WechatMiniprogram.ButtonGetPhoneNumber) {
    const code = e?.detail?.code;
    if (!code) {
      wx.showToast({ title: "授权失败，请重试", icon: "error" });
      return;
    } else {
      onLogin(code, () => {
        this.queryHomeInfo("JUMP");
      });
    }
  },
  onLink() {
    wx.navigateTo({
      url: "/pages/agreement/index",
    });
  },
  formatNumber(num: number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  },
});
