// pages/launch/index.ts
import { getMarketDetail } from "../../services/api";
import { StoreKeys } from "../../utils/keys";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    indicatorDots: true,
    autoplay: true,
    jumpStr:3,
    jumpTime:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

 let jumpTime =   setInterval(()=>{

      if(this.data.jumpStr > 1){

        this.setData({
          jumpStr : this.data.jumpStr -1
        })


      }else{
        this.setData({
          jumpStr : '跳过'
        })

        clearInterval(jumpTime)

      }
      

    },1000)
    

    
    getMarketDetail({
        materialType: 4
    }, {
        success: (result: any) => {
            this.setData({
                imgList: result 
            })
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },
  jump() {
    const token = wx.getStorageSync(StoreKeys.token);
    if (token) {
        wx.switchTab({
            url: "/pages/index/index"
        })
    } else {
        wx.navigateTo({
            url: '/pages/login/index'
        })
    }
  }
})