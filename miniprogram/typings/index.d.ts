/// <reference path="../../node_modules/miniprogram-api-typings/index.d.ts" />

interface IAppOption {
    globalData: {
      userInfo?: WechatMiniprogram.UserInfo,
      env: string
    }
    userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
  }
  
  type BaseResponse<T = any> = {
    // status: number,
    // message?: string,
    // response?: T,
    respData: any,
    respBody: any
  }
  
  type LoadingOption = {
    showLoading?: boolean;
    IG_TOKEN?: boolean;
  }
  
  type RequestOption = Omit<WechatMiniprogram.RequestOption, "url"> & LoadingOption;