// pages/qualReview/index.ts
import { getAuthResult, editOrUpdate,  getInfoById } from "../../services/api";
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
                key: 'birth',
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
        shipArray: [{
            label: '户主',
            id: 1
        }, {
            label: '配偶',
            id: 2
        }, {
            label: '非家庭成员',
            id: 3
        }],
        idCardInfo: {},
        applyAssure: {},
        fileUrls: [],
        checkData: {applyAssure: { assurePhone: '18234345345' }},
        path: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        const { bizToken, path } = options;
        getAuthResult({ seqNo: '', bizToken }, {
            success: (result: any) => {
                const { idCardInfo } = result;
                this.setData({
                    idCardInfo,
                    path
                })
            }

        })
    },
    onPicker(event) {
        const { value } = event.detail ?? {};
        if (value === undefined || value === null) return;
        const {id, label} = this.data.shipArray[value];
        this.setData({
            applyAssure: {...this.data.applyAssure, applyRelationship: id, label}

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
    getSmsCode() {
        this.setCountTime();
    },
    onChange() {
        this.setData({
            isSelected: !this.data.isSelected
        })
    },
    saveInfo() {
        if (!this.data.isSelected){
            wx.showToast({title: '请勾选协议'});
            return;
        }
        const data = {applyAssure: this.data.applyAssure, fileUrls: this.data.fileUrls}
        editOrUpdate({ ...this.data.checkData }, {
            success: (result) => {
                console.log(result)
            }
        })
    }
})