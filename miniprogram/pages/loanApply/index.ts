// pages/loanApply/index.ts
import { getUserInfo, getNearBank, getQrCodeInfo, sendSmsCode, applyCreditMoney, getProductDetail ,getCustPromoter} from "../../services/api";
import { onGetAddressInfo } from "../../utils/authAddress";
import { StoreKeys } from "../../utils/keys";

const regexData = {
    'applyAmount': '请输入意向金额',
    'loanUsage': '选择借款用途',
    'iceName': '请输入联系人姓名',
    'icePhone': '请输入联系方式',
    'iceRelation': '选择借款人关系',
    'smsCode': '请输入短信验证码'
}

Page({
    /**
     * 页面的初始数据
     */
    data: {
        applyData: {
            applyAmount: null,
            loanUsage: "",
            iceName: '',
            icePhone: '',
            iceRelation: '',
            referenceNo: '',
            smsCode: '',
            lng: '',
            lat: '',
            referenceType: '',
            productCode: 'test001',
        },
        amountMin: 0,
        amountMax: 0,
        isShowBank: false,
        selectBankCode: null,
        bankList: [],
        showBankList: [],
        areaCode: null,
        userInfo: {},
        isToggleCheck: false,
        relationArray: ['朋友', '夫妻', '父母'],
        loadUseArray: [
            '装修',
            '结婚',
            '消费'
        ],
        countNumber: 0,
        isShowAddress: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { areaCode, isAgree } = options;
        if (isAgree === '1') {
            this.setData({
                isToggleCheck: true,
                applyData: getApp().globalData.applyAssure
            });
            getApp().globalData.applyAssure = null;
        }
        const _scene_ = wx.getStorageSync(StoreKeys._scene_);
        this.setData({
            areaCode
        })
        this.queryUserInfo();
        this.getProductDetail();
        if (_scene_) {
            getCustPromoter({
                scene: _scene_
            }, {
                success: (result: any) => {
                    const { referenceType } = result;
                    this.setData({
                        applyData: {...this.data.applyData, referenceType}
                    })
                }
            })
        };
        onGetAddressInfo((res) => {
            const { address, location = {}, address_component = {}, formatted_addresses = {} } = res.result ?? {};
            const { lat, lng } = location;
            getNearBank({
                longitude: lng,
                latitude: lat
            }, {
                success: (result: any) => {
                    const banks = result.filter(item => item.deptCode);
                    this.setData({
                        bankList: banks,
                        showBankList: banks.slice(0, 3)
                    })
                }
            })
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
    onGetAddress() {
        this.setData({
            isShowAddress: false
        })
    },

    getProductDetail() {
        getProductDetail({}, {
            success: (res: any) => {
                console.log(res);
                const {  amountMin = 0, amountMax = 0 } = res.records[0];
                this.setData({
                    amountMin,
                    amountMax
                })
            }
        })
    },

    queryUserInfo() {
        getUserInfo({}, {
            success: (result) => {
                this.setData({
                    userInfo: result?.userInfo
                })
            }
        })
    },
    onPicker(event: any) {
        const { key } = event.currentTarget.dataset;
        const { value } = event.detail;
        const array = key === 'loanUsage' ? this.data.loadUseArray : this.data.relationArray;
        this.setData({
            applyData: {
                ...this.data.applyData,
                [key]: array[value]
            }

        })
    },
    onInput(e: WechatMiniprogram.BaseEvent) {
        const { key } = e.currentTarget.dataset;
        this.setData({
            applyData: { ...this.data.applyData, [key]: e?.detail.value.trim() }
        })
    },
    getSmsCode: function () {
        sendSmsCode({
            phone: this.data.userInfo.userPhone || '',
            sendType: '1'
        }, {
            success: (result) => {
                this.setCountTime();
                wx.showToast({ title: '发送成功' })
            }
        })
    },

    setCountTime() {
        let count = 60;
        const timeId = setInterval(() => {
            if (!count) return;
            count--
            this.setData({
                countNumber: count
            })
        }, 1000)
    },

    onSelectBank(event) {
        const { code } = event.currentTarget.dataset;
        const { bankList, selectBankCode, showBankList } = this.data;
        const index = bankList.findIndex(item => item.deptCode === code);
        this.setData({
            showBankList: index > 2 ? [bankList[index]] : bankList.slice(0, 3),
            selectBankCode: code === selectBankCode ? '' : code
        })
    },

    applyCredit: function () {
        const keyArray = Object.keys(this.data.applyData);
        for (let i = 0; i < keyArray.length; i++) {
            const item = keyArray[i];
            if (!this.data.applyData[item] && item !== 'lng' && item!=='lat' && item !== 'referenceNo' && item !== 'referenceType') {
                wx.showToast({
                    icon: 'none',
                    title: regexData[item] ? regexData[item] : '信息不完善',
                })
                return
            }
        }
        if (!this.data.isToggleCheck) {
            wx.showToast({
                icon: 'none',
                title: '请勾选协议',
            });
            return;
        };

        if (!this.data.applyData.referenceNo){
            if (!this.data.selectBankCode) {
                wx.showToast({
                    icon: 'none',
                    title: '请选择附近支行',
                });
                return;
            }
        }
        onGetAddressInfo((res) => {
            const { address, location = {}, address_component = {}, formatted_addresses = {} } = res.result ?? {};
            this.onAppluCredit({
                ...this.data.applyData,
                applyAddress: address,
                choiceOrg: this.data.applyData.referenceNo ? '' : this.data.selectBankCode,
                ...location,
                ...address_component,
                ...formatted_addresses
            })
        })
    },
    onShowBankList() {
        this.setData({
            isShowBank: true
        })
    },
    onAppluCredit(data) {
        applyCreditMoney({
            ...data,
        }, {
            success: (result: any) => {
                const { applyId = '', faceAuth, authToken } = result;
                //faceAuth 0:不需要核身 1: 需要核身
                if (faceAuth === '0') {
                    wx.redirectTo({
                        url: `/pages/creditResult/index?applyId=${applyId}&areaCode=${this.data.areaCode}`
                    })
                } else {
                    wx.redirectTo({
                        url: `/pages/transfer/index?authToken=${authToken}&applyId=${applyId}&areaCode=${this.data.areaCode}`
                    })
                }
            }
        })
    },
    lookProtocal() {
        getApp().globalData.applyAssure = this.data.applyData;
        wx.navigateTo({
            url: `/pages/protocalDetail/index?areaCode=${this.data.areaCode || ''}`
        })
    },
    onToggle() {
        if (!this.data.isToggleCheck) {
            wx.showToast({
                title: '请点击并阅读授权书',
                icon: 'none'
            })
        }
    },
    onBlur(event) {
        const { value } = event.detail;
        const { amountMin, amountMax, applyData } = this.data;
        if (!/^[1-9][0-9]*$/.test(value) || (Number(value) < amountMin || Number(value) > amountMax)) {
            wx.showToast({
                icon: 'none',
                title: `请输入${amountMin}~${amountMax}的意向金额`,
            });
            this.setData({
                applyData: {...applyData, applyAmount: null}
            })
            return;
        }
    }
})