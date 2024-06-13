import { getQuestionDetail, behaviorLog } from "../../services/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: null,
        clickText: null,
        question: {}
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
            phoneNumber: '10086'
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