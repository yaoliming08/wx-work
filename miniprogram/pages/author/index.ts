// pages/author/index.ts
import { updateUserInfo } from "../../services/api";
import { StoreKeys } from "../../utils/keys";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        avatarUrl: '',
        value: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    },

    getUserInfo(event: any) {
        const { avatarUrl } = event.detail;
        wx.uploadFile({
            header: {
                "MGP_ID": "APPLY_MINIPG",
                "token": wx.getStorageSync(StoreKeys.token) || ''
            },
            url: 'https://miniprogram.lixuepeng.cn/prod-api/apminipg/fileUpload/upload',
            filePath: avatarUrl,
            name: 'file',
            success: (result: any) => {
                const data = JSON.parse(result.data);
                const { respData, respBody } = data;
                if (respData.code === '000000') {
                    const { showUrl } = respBody;
                    this.setData({
                        avatarUrl: showUrl
                    })
                }
            }
        })


        this.setData({
            avatarUrl
        })
    },
    changeName(event: any) {
        const { value } = event.detail;
        this.setData({
            value
        })
    },
    handleClick() {
        const { avatarUrl, value } = this.data;
        updateUserInfo({
            userHeadPic: avatarUrl,
            userNickName: value,
        }, {
            success: (result) => {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
        })
    }
})