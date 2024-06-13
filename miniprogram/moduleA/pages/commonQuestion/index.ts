import { getQuestionList } from "../../../services/api";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        keys: [{
            key: '1',
            title: '常见申请问题'
        }, {
            key: '2',
            title: '常见用信问题'
        }, {
            key: '9',
            title: '其他问题'
        }],
        questionList: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        getQuestionList({}, {
            success: (result: any) => {
                const tempObj: any = {};
                result.forEach((item: any) => {
                    const { type } = item;
                    if (!tempObj[type]) {
                        tempObj[type] = [item];
                    } else {
                        tempObj[type].push(item)
                    }
                });
                this.setData({
                    questionList: tempObj
                })
            }
        })
    },

    jumpDetail(event) {
        const { id } = event.currentTarget.dataset;
        wx.navigateTo({
            url: `/pages/questionDetail/index?id=${id}`
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

})