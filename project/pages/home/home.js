// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //SSID 名字
    //pass 密码
    list: [{ name: "11111" }, { name: "2222" }, { name: "33333" },]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //隐藏转发
    wx.hideShareMenu();

    //有2种情况，1种是扫描二维码过来的，1种是正常过来的

    var that = this;

    //第一步首先获取手机类型
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        var systemVersion = '';
        //根据手机类型拿到版本号
        if (res.platform == 'android') {
          systemVersion = parseInt(res.system.substr(8));
        }
        if (res.platform == 'ios') {
          systemVersion = parseInt(res.system.substr(4));
        }
        //验证手机是否支持
        if (res.platform == 'android' && systemVersion < 6) {
          //弹框提醒，版本不兼容，无法使用
          return
        }
        if (res.platform == 'ios' && systemVersion < 11) {
          //弹框提醒，版本不兼容，无法使用
          return
        }

        //将版本和型号保存起来
        //初始化wifi模块
        wx.startWifi({
          success: function () {
            ////初始化成功，调用监听列表
            //调用获取列表
            that.queryWifiList();
          },
          fail: function (res) {
            //初始化出错，提示用户
            console.log(res);
          }
        })
      }
    })
  },

  /**
   * 查询wifi列表
   */
  queryWifiList: function () {
    wx.getWifiList({
      success: function () {
        //res列表
        wx.onGetWifiList({
          success: function (res) {
            //获取到wifi列表
            //1，展示wifi列表，仅供展示
            //2，链接wifi
          },
          fail:function(res){}
        })
      },
      fail: function (res) {
      }
    })
  },

  /**
   * 连接wifi
   */
  connectMyWifi: function(){
    var  that = this;
    wx.connectWifi({
      SSID: that.data.ssid,
      BSSID: that.data.bssid,
      password: that.data.pass,
      success: function (res) {
        _this.setData({ endError: 'wifi连接成功' });
      },
      fail: function (res) {
        _this.setData({ endError: res.errMsg });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
    return {
      title: 'xx小程序',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
})