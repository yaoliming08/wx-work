// pages/agencyTaskList/index.ts
import { getAssureList, refuseById, beforeCheckApplyInfo } from "../../../services/api";
Page({
    /**
     * 页面的初始数据
     */
    data: {
        taskIndex: 0,
        currentIndex: 0,
        contentStr: null,
        showDialog: false,
        assureTasks: [],
        applyName: '',
        applyIdCard: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { index } = options;
        this.setData({
            taskIndex: index
        });
        this.getList();

    },
    getList() {
        getAssureList({}, {
            success: (result: any) => {
                if (result.length > 0) {
                    const { assureTasks = [] } = result[this.data.taskIndex] ?? [];
                    this.setData({
                        assureTasks,
                        showDialog: false
                    });
                } else {
                    this.setData({
                        assureTasks: [],
                        showDialog: false
                    });
                }
                
            }
        });
    },
    onAgreeClick(event) {
        const { index, text } = event.currentTarget.dataset;
        this.setData({
            currentIndex: index,
            contentStr: text,
            applyName: '',
            applyIdCard: '',
            showDialog: true,
        })
    },
    goReview() {
        if (this.data.contentStr === 'REJECT') {
            const { applyAssureId } = this.data.assureTasks[this.data.currentIndex];
            refuseById({ applyAssureId }, {
                success: (result) => {
                    this.getList();
                }
            })
        } else {
            this.checkApplyInfo();
        }

    },
    onChange(event) {
        const { value } = event.detail;
        const { key } = event.currentTarget.dataset;
        this.setData({
            [key]: value
        })
    },
    checkApplyInfo() {
        const { applyId, applyAssureId, applyRelationship } = this.data.assureTasks[this.data.currentIndex];
        const { applyName, applyIdCard } = this.data;
        beforeCheckApplyInfo({ applyId, applyName, applyIdCard }, {
            success: (result) => {
                wx.navigateTo({ url: `/pages/qualReview/index?applyAssureId=${applyAssureId}&applyRelationship=${applyRelationship}`})
            }
        })
    }
})