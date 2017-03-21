define(function (require, exports, module) {
    //描述统计
    require("./units/analyhead.js");
    var m1 = require("./modules/qy-xianji-fenshuxian");
    var m2 = require("./modules/qy-xianji-kaoqing");
    var m3 = require("./modules/qy-xianji-fenshuduan");
    var m4 = require("./modules/qy-xianji-banjishangxian");
    var m5 = require("./modules/qy-xianji-xiaojie");

    m5.xianji_xiaojie();  //导读
    m1.liankaofenshuxian();  // 联考分数线
    m2.xianjikaoqing();  // 各县考情分析
    m3.fenshuduan();  // 分数段
    m4.banjishangxian();  //各班级上线情况

});