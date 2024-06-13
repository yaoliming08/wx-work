// pages/qualReview/index.ts
import { getAuthResult, getUserInfo, editOrUpdate, getInfoById, beforeAssureCheck } from "../../services/api";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        listData: [
            {
                label: '姓名',
                key: 'name',
            },
            {
                label: '民族',
                key: 'nation',
            },
            {
                label: '出生日期',
                key: 'birthday',
            },
            {
                label: '身份证号',
                key: 'idCard',
            },
            {
                label: '与借款人关系',
                key: '',
            },

        ],
        countNumber: 0,
        isSelected: false,
        idCardInfo: {},
        smsCode: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { applyAssureId, isAgree, applyRelationship } = options;
        if (isAgree === '1') {
            this.setData({
                isSelected: true
            })
        };
        getUserInfo({}, {
            success: (result: any) => {
                const { userInfo } = result;
                this.setData({
                    idCardInfo: { ...userInfo, applyAssureId, applyRelationship }
                })
            }
        })
    },
    // onPicker(event) {
    //     const { value } = event.detail ?? {};
    //     if (value === undefined || value === null) return;
    //     const { id, label } = this.data.shipArray[value];
    //     this.setData({
    //         idCardInfo: {
    //             ...this.data.idCardInfo,
    //             applyRelationship: label
    //         }
    //     });
    // },

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
    getSmsCode() {
        this.setCountTime();
    },
    onInput(event) {
        const { value } = event.detail;
        this.setData({
            smsCode: value.trim()
        })
    },
    goProDetail() {
        const { applyAssureId, applyRelationship } = this.data.idCardInfo;
        wx.navigateTo({
            url: `/pages/qualProtocal/index?applyAssureId=${applyAssureId}&applyRelationship=${applyRelationship}`
        })
    },
    saveInfo() {
        const { name, idCard, applyRelationship, applyAssureId } = this.data.idCardInfo ?? {};

        if (!applyRelationship) {
            wx.showToast({ title: '请选择借款人关系' });
            return;
        }
        if (!this.data.smsCode) {
            wx.showToast({ title: '请输入验证码' });
            return;
        }
        if (!this.data.isSelected) {
            wx.showToast({ title: '请勾选协议' });
            return;
        }
        
        beforeAssureCheck({
            applyAssureId,
            name,
            idCard,
            smsCode: this.data.smsCode
        }, {
            success: (result) => {
                const { authToken } = result;
                wx.navigateTo({
                    url: `/pages/transfer/index?authToken=${authToken}&applyAssureId=${applyAssureId || ''}&type=ASSURE`
                })
            }
        })
    },
    onToggle() {
        if(!this.data.isSelected){
            wx.showToast({
                title: '请点击并阅读授权书',
                icon: 'none'
            })
        }
    }
})