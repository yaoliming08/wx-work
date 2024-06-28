import { getQuestionDetail, behaviorLog } from "../../services/api";
import { StoreKeys } from "../../utils/keys";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        clickText: null,
        question: {},
        servicePhone:wx.getStorageSync(StoreKeys.servicePhone),
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { id } = options;
        this.setData({
            id
        });
        getQuestionDetail({ id }, {
            success: (result) => {
                this.setData({
                    question: result
                });
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    onCallPhone() {
        wx.makePhoneCall({
            phoneNumber: this.data.servicePhone
        })
    },
    handleQuestion(event) {
        if (!this.data.id) return;
        const { key } = event.currentTarget.dataset ?? {};
        if (this.data.clickText === key) return;
        behaviorLog({ actionType: 1, actionPage: 'question_detail', actionButton: key, targetId: this.data.id}, {
            success: (result) => {
                this.setData({
                    clickText: key
                })
            }
        })

    }

})