// pages/loanApply/index.ts
import { sendSmsCode, applyCreditMoney } from "../../services/api";
import { getUserInfo } from "../../services/api";
import { onGetAddressInfo } from "../../utils/authAddress";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        applyData: {
            loanUsage: "",
            applyAmount: null,
            iceName: '',
            icePhone: '',
            iceRelation: '',
            referenceNo: '',
            smsCode: '',
            lng: '',
            lat: '',
            productCode: 'PRD001',
        },
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
    onLoad() {
        this.queryUserInfo();
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
            applyData: { ...this.data.applyData, [key]: e?.detail.value }
        })
    },

    onToggle() {
        this.setData({
            isToggleCheck: !this.data.isToggleCheck
        })
    },
    getSmsCode: function () {
        sendSmsCode({
            phone: '17321196924',
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

    applyCredit: function () {
        const keyArray = Object.keys(this.data.applyData);
        for (let i = 0; i < keyArray.length; i++) {
            const item = keyArray[i];
            if (!this.data.applyData[item] && item !== 'lng' && item!=='lat') {
                wx.showToast({
                    title: '信息不完善',
                })
                return
            }
        }
        if (!this.data.isToggleCheck) {
            wx.showToast({
                title: '请勾选协议',
            });
            return;
        };
        onGetAddressInfo((res) => {
            const { address, location = {}, address_component = {}, formatted_addresses = {} } = res.result ?? {};
            this.onAppluCredit({
                ...this.data.applyData,
                applyAddress: address,
                ...location,
                ...address_component,
                ...formatted_addresses
            })
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
                        url: `/pages/creditResult/index?applyId=${applyId}`
                    })
                } else {
                    wx.redirectTo({
                        url: `/pages/transfer/index?authToken=${authToken}&applyId=${applyId}`
                    })
                }
            }
        })
    }
})