// pages/securityEdit/index.ts
import { upLoadImage, getInvestList, getInfoById, editOrUpdate, cancelAssure } from "../../services/api";
import { StoreKeys } from "../../utils/keys";

const emptyValues = {
    'assureName': '请输入担保人姓名',
    'assureIdCard': '请输入身份证号码',
    'assurePhone': '请输入担保人手机号',
    'applyRelationship': '请选择申请人关系'
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isEditStatus: true,
        applyAssure: {
            id: '',
            applyAssureId: '',
            applyId: '',
            assureName: '',
            assureIdCard: '',
            assurePhone: '',
            assureStatus: 0,
            applyRelationship: 0,
        },
        loadUseArray: [
            '配偶',
            '亲属',
            '朋友'
        ],
        fileUrls: [],
        urls: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { applyAssureId = '', applyId = '', assureStatus } = options;
        this.setData({
            applyAssure: {
                ...this.data.applyAssure,
                assureStatus,
                applyAssureId,
                applyId
            },
            isEditStatus: Number(assureStatus) !== 6 //失效
        });
        if (applyAssureId) {
            getInfoById({ applyAssureId }, {
                success: (result) => {
                    const { applyAssure, fileUrls } = result
                    this.setData({
                        applyAssure: {
                            ...this.data.applyAssure,
                            ...applyAssure
                        },
                        fileUrls,
                    })
                }
            })
        }
    },

    onChangeInput(event) {
        const { key } = event.currentTarget.dataset;
        const { value } = event.detail;
        let noPass =  false

        console.log(/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[Xx\d]$/.test(value),'是否符合身份证格式')

        if(['assureIdCard','assurePhone'].includes(key) ){
            if(value && ((key == 'assureIdCard' && value.length > 18) ||  (key == 'assurePhone' && value.length > 11)) ){
                noPass = true
            }
        }

        if(noPass){
            this.setData({
                applyAssure: {
                    ...this.data.applyAssure,
                    [key]: this.data.applyAssure[key],
                }
            })
            return
        }


        this.setData({
            applyAssure: {
                ...this.data.applyAssure,
                [key]: value.trim(),
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    onChange(event) {
        const { current } = event.detail;
        wx.uploadFile({
            header: {
                "MGP_ID": "APPLY_MINIPG",
                "token": wx.getStorageSync(StoreKeys.token) || ''
            },
            url: 'https://miniprogram.lixuepeng.cn/prod-api/apminipg/fileUpload/upload',
            filePath: current[0],
            name: 'file',
            success: (res: any) => {
                const result = JSON.parse(res.data);
                const { respData, respBody } = result;
                if (respData.code === '000000') {
                    const { showUrl } = respBody;
                    const tempUrl = this.data.fileUrls;
                    tempUrl.push(showUrl);
                    this.setData({
                        fileUrls: tempUrl
                    })
                }
            }
        })
    },
    onHandleInfo(event) {

        const { key } = event.currentTarget.dataset;
        const { applyAssure, fileUrls } = this.data;
        const { assurePhone, assureIdCard } = applyAssure;

        console.log(this.data.applyAssure,12131)



        const checkNames = ['assureName', 'assureIdCard', 'assurePhone','applyRelationship'];

        for (let i = 0; i < checkNames.length; i++) {
            const item = checkNames[i];

            console.log(applyAssure[item],32433242)
            if (!applyAssure[item]) {
                wx.showToast({
                    title: emptyValues[item] ? emptyValues[item] : '信息不完善',
                    icon: 'none'
                });
                return;
            }
        }
        if(assureIdCard && !/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[Xx\d]$/.test(assureIdCard)) {
            wx.showToast({
                title: '请输入正确的身份证',
                icon: 'none'
            });
            return;
        }
        // 手机号
        if(assurePhone && !/^1[3-9]\d{9}$/.test(assurePhone)) {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none'
            });
            return;
        }
        
        if (applyAssure.applyRelationship === 1 && !fileUrls.length) {
            wx.showToast({
                title: '请上传结婚证明',
                icon: 'none'
            });
            return;
        }

        editOrUpdate({
            applyAssure,
            fileUrls: applyAssure.applyRelationship !== 1 ? [] : fileUrls,
            commit: key === 'SAVE' ? 0 : 1,
        }, {
            success: (result) => {
                if (key !== 'SAVE') {
                    wx.redirectTo({
                        url: "/pages/securityResult/index"
                    })
                } else {
                    console.log(result,'返回数据')

                    if(result.applyAssureId){
                        this.setData({
                            [`applyAssure.id`] : result.applyAssureId,
                            [`applyAssure.applyAssureId`] : result.applyAssureId,

                        })
                        console.log(this.data.applyAssure,'编辑保存的参数')
                    }

        

                    setTimeout(()=>{
                        wx.showToast({
                            icon: 'none',
                            title: '保存成功',
                            duration:2000,
                        });
                    },0)
  
                }
            }
        })
    },
    removeImage(event) {
        const { all } = event.detail;
        this.setData({
            fileUrls: all
        })
    },
    onPicker(event) {
        const { key } = event.currentTarget.dataset;
        const { value } = event.detail;
        this.setData({
            applyAssure: {
                ...this.data.applyAssure,
                [key]: Number(value) + 1
            }
        })
    },

    cancelSecutity() {
        const { applyAssureId } = this.data.applyAssure;
        cancelAssure({ applyAssureId }, {
            success: (result) => {
                this.setData({
                    applyAssure: {
                        ...this.data.applyAssure,
                        assureName: '',
                        assureIdCard: '',
                        assurePhone: '',
                        applyRelationship: 0,
                        assureStatus: 0,
                    }
                })
            }
        })
    }

})