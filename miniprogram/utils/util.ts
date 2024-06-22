import { authLogin } from "../services/api";
import { StoreKeys } from "./keys";

export const formatTime = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return (
        [year, month, day].map(formatNumber).join('/') +
        ' ' +
        [hour, minute, second].map(formatNumber).join(':')
    )
}

const formatNumber = (n: number) => {
    const s = n.toString()
    return s[1] ? s : '0' + s
}

export const EnvType = {
    develop: 'develop',
    trial: 'trial',
    release: 'release'
}

export const ActiveStatus = {
    OFF_LINE: 0,
    IN_LINE: 1,
    COMMING_LINE: 2
}

export const VerifyStatus = {
    ALL_STATUS: '1',
    OCR_LIVING: '2',
    LIVING: '3',
    NUCLEAR: '4'
}

export const AuthScene = {
    AUTHOR: 'SCENE_001',
    CREDIT: 'SCENE_002'
}

export const ApplyStatus = {
    APPLYING: '1',
    APPLY_REFUSE: '7',
    APPLY_SUCCESS: '26'
}

export const ApplyStatusTexts = {
    '1': '审批中',
    '7': '审批拒绝',
    '26': '审批成功'
}



export const ProduceNames = {
    "PRD001": '市民贷'
}


const serverHost = {
    [EnvType.develop]: "https://miniprogram.lixuepeng.cn/prod-api",
    [EnvType.trial]: "https://miniprogram.lixuepeng.cn/prod-api",
    [EnvType.release]: "https://miniprogram.lixuepeng.cn/prod-api",
}

export const getServerHost = () => {
    var app = getApp().globalData;
    const { env = EnvType.release } = app;
    console.log(env);
    return serverHost[env] || serverHost[EnvType.release];
}

export const onLogin = (code, onCallBack) => {
    wx.login({
        success: (res) => {
            const jsCode = res.code;
            if (jsCode) {

                const scanSeqNo = wx.getStorageSync(StoreKeys.scanSeqNo);

                let requestObj = { jscode: jsCode, code }
                if(scanSeqNo){

                    requestObj = { jscode: jsCode, code ,scanSeqNo:scanSeqNo}
                }

                
                authLogin(requestObj, {
                    success: (result: any) => {
                        const { token = '' } = result;
                        wx.setStorageSync(StoreKeys.token, token);
                        onCallBack({...result, jscode: jsCode, code})
                        // this.queryUserInfo();
                    }
                })
            }

        }
    })
}
