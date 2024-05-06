// pages/agencyTaskList/index.ts
import { getAssureList, refuseById } from "../../services/api";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    taskIndex: 0, 
    currentIndex: 0,
    contentStr: null,
    showDialog: false,
    assureTasks: []
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
            const { assureTasks = [] } = result[this.data.taskIndex];
            this.setData({
                assureTasks
            })
        }
    });
  },
  onAgreeClick(event) {
    const { index, text } = event.currentTarget.dataset;
    this.setData({
        showDialog: true,
        currentIndex: index,
        contentStr: text
    })
  },
  goReview() {
      if (this.data.contentStr === 'REJECT') {
        const { applyAssureId } = this.data.assureTasks[this.data.currentIndex];
        refuseById({applyAssureId}, {
            success: (result) => {
                this.getList()
            }
        })
      } else {
        wx.navigateTo({url: '/pages/qualReview/index'})
      }
      
  }
})