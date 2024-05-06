// pages/login/index.ts
import { onLogin } from "../../utils/util";
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  getRealtimePhoneNumber(e: WechatMiniprogram.ButtonGetPhoneNumber) {
    const code = e?.detail?.code;
    if (!code) {
        wx.showToast({ title: '授权失败，请重试', icon: 'error' });
        return;
    } else {
       
        onLogin(code, () => {
            console.log(5555);
            wx.switchTab({url: '/pages/index/index'})
        });
    }
},
})