import Log from "../constants/log";
const navigateToEid = (o) => {
  console.log("navigateToEid", wx.eidEnvVersion),
    wx.navigateToMiniProgram({
      appId: "wx0e2cb0b052a91c92",
      path: "pages/huiyan/index",
      envVersion: wx.eidEnvVersion,
      extraData: { useHuiyan: !0, huiyanToken: o },
      success() {
        wx.eidTokenToCallback = o;
      },
      fail(e) {
          wx.navigateBack();
        console.log("err", e), (wx.eidTokenToCallback = "");
      },
      complete(e) {
        wx.reportLogToEid({
          token: o,
          event: Log.navigateToEid,
          errMsg: e.errMsg,
        });
      },
    });
};
export { navigateToEid };
