// pages/agencyTask/index.ts
import { getAssureList } from "../../services/api";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loanLists: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        getAssureList({}, {
            success: (result: any) => {
                this.setData({
                    loanLists: result
                })
            }
        })
    },

    onClickItem(event) {
        const { index } = event.currentTarget.dataset;
        wx.navigateTo({url: `/pages/agencyTaskList/index?index=${index}`})
    }
})