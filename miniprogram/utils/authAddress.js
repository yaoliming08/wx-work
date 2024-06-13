const QQMapWX = require('./qqmap-wx-jssdk.js');
 
// 实例化API核心类
const qqmapsdk = new QQMapWX({
    key: '6X3BZ-VKCK5-T2YIL-ISJCT-HFDKZ-ZBFXU' // 必填
});  


export const onGetAddressInfo = (onCallback, onFailCallback = null) => {
    wx.getFuzzyLocation({
        type: 'wgs84',
        success(res) {
            const { latitude, longitude } = res;
            transformAdress({location: `${latitude},${longitude}`}, (res) => {
                onCallback(res);
            })
        },
        fail(res) {
            onFailCallback && onFailCallback(res);
            wx.showToast({
                title: '请授权您的位置信息'
            })
        }
    })
    
    // '31.328265,121.343246',
    
}

const transformAdress = function(addressData, onCallback) {
    const { location = ''} = addressData;
    qqmapsdk.reverseGeocoder({
        location,
        success: (res) => {
            onCallback(res);
        },
        fail: function (res) {
            wx.showToast({
              title: '获取地理位置信息失败',
            })
        },
    })
}
