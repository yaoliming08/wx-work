import validate from "./utils/validate";
import Log from "./constants/log";
import { navigateToEid } from "./utils/index";
const EIDAppID = "wx0e2cb0b052a91c92";
function initEid(
  e = "https://eid.faceid.qq.com",
  o = "release",
  n = "https://eid-enhance.faceid.qq.com"
) {
  console.log("initEid"),
    (wx.eidBaseUrl = e),
    (wx.eidEnvVersion = o),
    (wx.eidBackUpUrl = n),
    wx.onAppShow((e) => {
      console.log("!!!!!!监听onshow事件", e, wx.eidTokenToCallback);
      var { scene: e, referrerInfo: o } = e,
        { appId: o, extraData: n } = o || {},
        { token: t, verifyDone: i } = n || {};
      1038 === e &&
        o === EIDAppID &&
        wx.eidTokenToCallback &&
        ((o = t || wx.eidTokenToCallback),
        wx.reportLogToEid({
          token: o,
          event: Log.navigateBackFromEid,
          errMsg:
            `从EID核身完成返回，核验未完成或者没有处理核验完成的函数，token:${o},verifyDone:${i},scene:` +
            e,
        }),
        wx.eidTokenToCallback) &&
        wx.eidTokenToCallback === t &&
        i &&
        wx.handleEidVerifyDone &&
        wx.handleEidVerifyDone(n),
        (wx.eidTokenToCallback = "");
    });
  const d = wx.getSystemInfoSync()["version"];
  wx.reportLogToEid = function (e) {
    var {
        token: e = "",
        event: o = "",
        errCode: n = "",
        errMsg: t = "",
        data: i = {},
      } = e,
      r = new Date();
    const a = {
      Token: e,
      SourceType: "mp_sdk",
      SourceVersion: Log.version,
      EnvVersion: d,
      Timestamp: r.getTime(),
      Event: o,
      ErrorCode: "number" == typeof n ? n.toString() : n,
      ErrorMsg: t,
      Data: JSON.stringify(i),
    };
    console.log("开始上报日志：", a),
      wx.request({
        url: wx.eidBaseUrl + "/api/common/ReportEvent",
        method: "POST",
        data: a,
        success(e) {
          console.log("上报日志完成：", "payload:", a, "res:", e);
        },
      });
  };
}
function startEid(e) {
  const { data: o, verifyDoneCallback: n } = e;
  if (!o || !n)
    return (
      wx.reportLogToEid({
        token: t,
        event: Log.startEidFail,
        errMsg: "传入的参数有误",
      }),
      void wx.showModal({
        title: "提示",
        content: "传入的参数有误",
        showCancel: !1,
      })
    );
  const { token: t, needJumpPage: i = !1 } = o;
  validate(t, "token")
    ? ((wx.handleEidVerifyDone = (e) => {
        const o = e["token"];
        console.log("验证完成，token：", e),
          wx.reportLogToEid({
            token: o,
            event: Log.EidVerifyDone,
            errMsg: "验证完成，token：" + o,
          }),
          i
            ? wx.navigateBack({
                success() {
                  wx.reportLogToEid({
                    token: o,
                    event: Log.EidVerifyDone,
                    errMsg: "验证完成，token：" + o,
                  }),
                    n({ token: o, verifyDone: !0 });
                },
              })
            : (wx.reportLogToEid({
                token: o,
                event: Log.EidVerifyDone,
                errMsg: "验证完成，token：" + o,
              }),
              n({ token: o, verifyDone: !0 }));
      }),
      i
        ? wx.navigateTo({
            url: `/mp_ecard_sdk/index/index?token=${t}&needJumpPage=` + i,
          })
        : navigateToEid(t))
    : (wx.reportLogToEid({
        token: t,
        event: Log.startEidFail,
        errMsg: "传入的token有误，token:" + t,
      }),
      wx.showModal({
        title: "提示",
        content: "传入的token有误",
        showCancel: !1,
      }));
}
module.exports = { initEid: initEid, startEid: startEid };
