//index.js
//获取应用实例
const app = getApp()
var amapFile = require('../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
var config = require('../../libs/config.js');


var markersData = [];
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getPoiAround({
      iconPathSelected: "../../img/marker.png", //如：..­/..­/img/marker_checked.png
      iconPath: "../../img/marker.png", //如：..­/..­/img/marker.png
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "../../img/marker.png"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "../../img/marker.png"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})