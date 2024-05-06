
import { postRequest, getRequest } from "./services";

export const authLogin = (data: any, options: RequestOption = {}) => {
    const { jscode = '', code = '' } = data;
    const params = {
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
    return postRequest(`apminipg/wxminipg/queryUserInfo`, data, { IG_TOKEN: true, ...options });
}

// 宣传图
export const getMarketDetail = (data: any, options: RequestOption = {}) => {
    return postRequest(`apminipg/marketMaterial/getDsegMarketMateriallist`, data, options)
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

// 上传图片
export const upLoadImage = (data: any, options: RequestOption = {}) => {
    return postRequest(`/apminipg/fileUpload/upload`, data, options)
}







