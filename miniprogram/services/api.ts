
import { postRequest, getRequest } from "./services";

export const authLogin = (data: any, options: RequestOption = {}) => {
    const { jscode = '', code = '' } = data;
    const params = {
        ...data,
        jsCode: jscode,
        code
    }
    return postRequest(`apminipg/wxminipg/login`, params, {IG_TOKEN: true, ...options});
}

export const getHomeInfo = (data: any, options: RequestOption = {}) => {
    const params = data;
    return postRequest(`apminipg/wxminipg/homePage`, params, options);
}

export const getAuthUrl = (data: any, options: RequestOption = {}) => {
    const params = data;

    return postRequest(`apminipg/wxminipg/getAuthUrl`, params, options);
}

export const beforeApplyAuth = (data: any, options: RequestOption = {}) => {
    const params = data;
    return postRequest(`apminipg/wxminipg/beforeApplyAuth`, params, options);
}

export const getAuthResult = (data: any, options: RequestOption = {}) => {
    const params = data;
    return postRequest(`apminipg/wxminipg/getNameAuthResult`, params, options);
}

export const saveAuthResult = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/wxminipg/saveNameAuthResult`, data, options);
}

export const sendSmsCode = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/wxminipg/sendSmsCode`, data, options);
}

export const applyCreditMoney = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/wxminipg/applyCredit`, data, options);
}

export const creditCommit = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/wxminipg/applyCreditCommit`, data, options);
}

export const getApplyList = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/wxminipg/getApplyCreditList`, data, { IG_TOKEN: true, ...options });
}

export const getActivityList = (data: any, options: RequestOption = {}) => {
    return postRequest(`mtminipg/wxminipg/activityList`, data, options);
}

// 个人中心
export const getUserInfo = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/wxminipg/queryUserInfo`, data, options);
}

// 获取我的客户经理
export const searchCustManager = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/wxminipg/searchCustManager`, data, options);
}

// 宣传图
export const getMarketDetail = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/marketMaterial/getDsegMarketMateriallist`, data, {IG_TOKEN: true, ...options})
}

// 申请列表
// export const getApplyList = (data: any, options: RequestOption = {}) => {
//     return postRequest(`apminipg/wxminipg/getApplyCreditList`, data, options)
// }

export const getInvestigateList = (data: any, options: RequestOption = {}) => {
    return getRequest(`apminipg/wxminipg/getInvestigateList`, data, options)
}
// 待办列表
export const getAssureList = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/assure/toDoList`, data, options)
}

// 担保人信息提交
export const editOrUpdate = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/assure/addOrUpdate`, data, options)
}

// 删除担保人
export const refuseById = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/assure/refuseById`, data, options)
}

// 获取担保人
export const getInfoById = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/assure/getInfoById`, data, options)
}

export const getAssureHistory = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/assure/history`, data, options)
}

// 上传图片
export const upLoadImage = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/fileUpload/upload`, data, options)
}

// 问题列表
export const getQuestionList = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/question/list`, data, options)
}

// 问题详情
export const getQuestionDetail = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/question/getInfo`, data, options)
}

// 问题反馈
export const behaviorLog = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/behaviorLog/add`, data, options);
}
// 担保信息
export const getInvestList = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/wxminipg/getInvestigateList`, data, options)
}

// 担保检查
export const beforeAssureCheck = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/assure/preCommitCheck`, data, options)
}

//信息确认
export const beforeCheckApplyInfo = (data: any,  options: RequestOption = {}) => {
    return postRequest(`/apminipg/assure/checkApplyInfo`, data, options)
}

// 提交
export const commitAssureInfo = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/assure/commit`, data, options)
}

//失效担保
export const cancelAssure = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/assure/vitiate`, data, options)
}

// 推荐支行
export const getNearBank = (data: any, options: RequestOption = {}) => {
    return getRequest(`/apminipg/bankBranch/getNearbyBranch`, data, options)
}

//二维码
export const getQrCodeInfo = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/wxminipg/verifyAndGetQrCodeInfo`, data, options)
}

//获取这个人的客户经理信息
export const getCustPromoter = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/wxminipg/getCustPromoter`, data, options)
   
}


//记录扫码事件 获取扫描流水号
export const recordScan = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/wxminipg/recordScan`, data, options)
}

//更新用户信息
export const updateUserInfo = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/wxminipg/updateUserInfo`, data, options)
}

// 协议
export const getProtocal = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/CustAuth/getTemplateDetail`, data, options)
}

// 注销
export const signOff = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/wxminipg/signOff`, data, options)
}

export const getProductDetail = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/product/getDsegProductDetail`, data, options)
}























