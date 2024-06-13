import { getServerHost } from "../utils/util";
import { StoreKeys } from "../utils/keys";

const ResponseStatus = {
    success: "000000",
    needLogin: '000004'
}

const showRequestError = (msg?: string) => {
    setTimeout(() => {
        if (msg && msg.length >= 15) {
            wx.showModal({
                content: msg,
                showCancel: false,
                confirmColor: '#1F55EC'
            })
        } else {
            wx.showToast({
                title: msg || '网络异常',
                icon: 'none',
            })
        }
    }, 100)
}

const goLogin = () => {
    wx.reLaunch({
        url: '/pages/login/index'
    })
}

const handlerComplete = (err: WechatMiniprogram.GeneralCallbackResult, completeCallback: WechatMiniprogram.RequestCompleteCallback | undefined) => {
    completeCallback?.(err);
}

const handlerFail = (err: WechatMiniprogram.RequestFailCallbackErr, failCallback: WechatMiniprogram.RequestFailCallback | undefined) => {
    showRequestError(err.errMsg);
    failCallback?.(err);
}

const handlerSuccess = (res: WechatMiniprogram.RequestSuccessCallbackResult, successCallback: WechatMiniprogram.RequestSuccessCallback | undefined, failCallback: WechatMiniprogram.RequestFailCallback | undefined) => {
    const { respData, respBody } = (res.data || {}) as unknown as BaseResponse;
    if (respData?.code === ResponseStatus.needLogin) {
        wx.removeStorageSync(StoreKeys.token)
        goLogin();
        return;
    }
    if (respData?.code === ResponseStatus.success) {
        successCallback?.(respBody);
    } else {
        handlerFail({
            errMsg: respData?.message || "",
            errno: respData?.code
        }, failCallback);
    }
}

const getCompleteUrl = (url: string) => {
    let tempUrl = url;
    if (tempUrl && !tempUrl.startsWith("http")) {
        const flag = tempUrl.startsWith("/") ? "" : "/";
        tempUrl = `${getServerHost()}${flag}${tempUrl}`;
    }
    return tempUrl;
}

const showLoadingFn = (options: WechatMiniprogram.ShowLoadingOption | undefined = undefined) => {
    wx.showLoading({
        title: "加载中...",
        mask: true,
        ...(options || {})
    });
}

const hideLoadingFn = () => {
    wx.hideLoading();
}

const handlerRequestOptions = (options: WechatMiniprogram.RequestOption & LoadingOption): WechatMiniprogram.RequestOption | void => {
    const { url, showLoading = true, success: successCallback, fail: failCallback, complete: completeCallback, IG_TOKEN, ...rest } = options;
    const token = wx.getStorageSync(StoreKeys.token) || '';
    console.log(token, IG_TOKEN, 66666);
    if (!token && !IG_TOKEN) {
        goLogin();
        return;
    }
    if (showLoading) showLoadingFn();
    return {
        ...rest,
        header: {
            "MGP_ID": "APPLY_MINIPG",
            "token": wx.getStorageSync(StoreKeys.token) || ''
        },
        url: getCompleteUrl(url),
        success: (res) => {
            handlerSuccess(res, successCallback, failCallback);
        },
        fail: (err: WechatMiniprogram.RequestFailCallbackErr) => {
            handlerFail(err, failCallback);
        },
        complete: (res: WechatMiniprogram.GeneralCallbackResult) => {
            if (showLoading) hideLoadingFn();
            handlerComplete(res, completeCallback);
        }
    }
}

const baseRequest = (url: string, data?: string | WechatMiniprogram.IAnyObject | ArrayBuffer, options: RequestOption = {}) => {
    wx.request(handlerRequestOptions({ ...options, url, data }));
}

export const getRequest = (url: string, data?: string | WechatMiniprogram.IAnyObject | ArrayBuffer, options: RequestOption = {}) => {
    baseRequest(url, data, { ...options, method: "GET" });
}

export const postRequest = (url: string, data?: string | WechatMiniprogram.IAnyObject | ArrayBuffer, options: RequestOption = {}) => {
    baseRequest(url, data, { ...options, method: "POST" });
}

export const putRequest = (url: string, data?: string | WechatMiniprogram.IAnyObject | ArrayBuffer, options: RequestOption = {}) => {
    baseRequest(url, data, { ...options, method: "PUT" });
}

export const deleteRequest = (url: string, data?: string | WechatMiniprogram.IAnyObject | ArrayBuffer, options: RequestOption = {}) => {
    baseRequest(url, data, { ...options, method: "DELETE" });
}

