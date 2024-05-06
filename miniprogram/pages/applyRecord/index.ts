// pages/applyRecord/index.ts
import { getApplyList, getInvestigateList } from "../../services/api";
import { ApplyStatusTexts } from "../../utils/util";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ApplyStatusTexts: ApplyStatusTexts,
    applyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      const { applyId } = options;
      this.getApplyDetail(applyId)
    // this.getList({})
  },

  getApplyDetail(applyId) {
    getInvestigateList({applyId}, {
        success: (result) => {
            console.log(result);
        }
    })
  }


//   getApplyDetail(e: WechatMiniprogram.BaseEvent) {
//     const { id } = e.currentTarget.dataset ?? {};
//     wx.navigateTo({
//         url: `/pages/applySchedule/index?applyId=${id}`
//     })
//   },

//   getList(data: any) {
//     getApplyList({...data}, {
//         success: (result: any) => {
//             console.log(result);
//             const { applyList = {}} = result;
//             this.setData({
//                 applyList
//             })
//         }
//     })
//   }
})