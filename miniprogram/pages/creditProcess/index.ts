// pages/creditProcess/index.ts
const urlArray = [
    'https://miniprogram.lixuepeng.cn/images/name3.png',
    'https://miniprogram.lixuepeng.cn/images/name2.png',
    'https://miniprogram.lixuepeng.cn/images/name1.png',
    'https://miniprogram.lixuepeng.cn/images/name4.png'
];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        urlArray,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },
    onNext() {
        let index = this.data.currentIndex;
        if (index < 3) {
            this.setData({
                currentIndex: this.data.currentIndex + 1 
            })
        } else {
            wx.redirectTo({
                url: "/pages/confirmInfo/index"
            })
        }
       
    }
})