// pages/protocalDetail/index.ts
import { getProtocal } from "../../services/api";

const protocalLinks = ['7', '8', '9'];
let timeOut = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        templateContent: '',
        disabled: true,
        times: 3,
        step: 0,
        applyRelationship: '',
        applyAssureId: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const { applyAssureId, applyRelationship } = options;
        this.setData({
            applyAssureId,
            applyRelationship
        });
        
    },
    onShow() {
        clearInterval(timeOut);
        this.getPrDetail();
    },
    getPrDetail() {
        getProtocal({
            contractType: protocalLinks[this.data.step]
        }, {
            success: (result: any) => {
                const { templateContent } = result;
                this.setData({
                    templateContent,
                    disabled: true,
                    times: 3
                });
                this.cuntimes();
            }
        })
    },
    onNext() {
        const { step, applyAssureId, applyRelationship } = this.data;
        if (step + 1 === protocalLinks.length) {
            wx.redirectTo({
                url: `/pages/qualReview/index?applyAssureId=${applyAssureId  || ''}&applyRelationship=${applyRelationship || ''}&isAgree=1`
            });
            return;
        };
        this.setData({
            step: this.data.step + 1
        });
        this.getPrDetail();
    },
    cuntimes() {
        timeOut = setInterval(() => {
            if (!this.data.times) {
                clearInterval(timeOut);
                this.setData({
                    disabled: false
                })
                return;
            }
            this.setData({
                times: this.data.times-1
            })
        }, 1000)
    }
})