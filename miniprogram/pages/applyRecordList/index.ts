// pages/applyRecordList/index.ts
import { getApplyList } from "../../services/api";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        applyList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        
    },
    onShow() {
        getApplyList({}, {
            success: (result: any) => {
                this.setData({
                    applyList: result
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    
    onCallPhone(event) {
        const { phone = '' } = event.currentTarget.dataset;
        if (phone) {
            wx.makePhoneCall({
                phoneNumber: phone
            })
        }
    },
    goSecurityDetail(event) {
        const { id = '' } = event.currentTarget.dataset;
        if (!id) {
            wx.showToast({ title: '暂无担保详情' });
            return;
        }
        wx.navigateTo({ url: `/pages/securityDetail/index?applyId=${id}` })
    },
    addSecurity(event) {
        const { index } = event.currentTarget.dataset;
        const { applyAssureId = '', applyId = '', assureStatus = '' } = this.data.applyList[index];
        wx.navigateTo({ url: `/pages/securityEdit/index?applyAssureId=${applyAssureId ?? ''}&applyId=${applyId ?? ''}&assureStatus=${assureStatus ?? 0}` })
    },
    goApplyDetail(event) {
        const { index } = event.currentTarget.dataset;
        const { applyId = '', productName = '', loanAmount = '', loanRate = '' } = this.data.applyList[index] ?? {}
        wx.navigateTo({
            url: `/pages/applySchedule/index?applyId=${applyId}&productName=${productName ?? ''}&loanAmount=${loanAmount ?? ''}&loanRate=${loanRate ?? ''}`
        })
    }
})


