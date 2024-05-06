import Log from "../constants/log";
import { navigateToEid } from "../utils/index";
Page({
  data: { token: "" },
  onLoad(o) {
    const { token: e, needJumpPage: t } = o;
    console.log("onLoad", t, "true" === t),
      this.setData({ token: e }, () => {
        wx.reportLogToEid({
          token: e,
          event: Log.getIntoIndexPage,
          errMsg: `进入配置首页,token:${e},needJumpPage:` + t,
        });
      });
  },
  handleStart() {
    navigateToEid(this.data.token);
  },
});
