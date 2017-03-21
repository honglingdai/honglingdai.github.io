define(function (require, exports, module) {
    //描述统计
    require("./units/analyhead.js");
    var m1 = require("./modules/bzr-zuigaofen");
    var m2 = require("./modules/bzr-youxiuxueshengfenbu");
    var m3 = require("./modules/bzr-pingjunfenBiaozhunfen");
    var m4 = require("./modules/js-youxiaofen");


    m1.bzr_zuigaofen();  // 最高分

    m2.youxiuxuesheng();  //联考优秀学生分布

    m3.pingjunfenBiaozhunfen(); // 平均分与标准分

    m4.youxiaofen();  //有效分
});