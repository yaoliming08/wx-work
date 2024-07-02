// pages/middleware/index.ts
import { getQrCodeInfo ,recordScan ,authLogin} from "../../services/api";
import { StoreKeys } from "../../utils/keys";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { scene = '' } = options;

    console.log(scene,'初次进入页面')



    
    if (scene) {
        this.recordScan(scene)
    } else {
        wx.removeStorageSync(StoreKeys._scene_);
        wx.removeStorageSync(StoreKeys.scanSeqNo);
        wx.navigateTo({
            url: '/pages/launch/index'
        })
    }
  },


  //获取扫码流水号
  recordScan(scene:any){

    console.log('获取流水码',scene)


    recordScan({scene}, {
        success: (result: any) => {
            console.log('获取成功',result,result.scanSeqNo)
            
            const token = wx.getStorageSync(StoreKeys.token);
            wx.setStorageSync(StoreKeys.scanSeqNo, result.scanSeqNo);
            wx.setStorageSync(StoreKeys._scene_, scene);
            this.jumpPath(token);
       
  
        },
        fail:() =>{
            console.log('二维码已过期')
            wx.exitMiniProgram();
        }
    })

  },

  jumpPath(token) {
    console.log(12131)
    if (token) {
        wx.switchTab({
            url: '/pages/index/index',
        })
    } else {
        wx.navigateTo({
            url: '/pages/launch/index'
        })
    }
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})