define(function (require, exports, module) {
    //描述统计
    require("./units/analyhead.js");
    var m1 = require("./modules/bzr-zuigaofen");
    var m2 = require("./modules/xz-youxiuxueshengfenbu");
    var m3 = require("./modules/bzr-pingjunfenBiaozhunfen");
    var m4 = require("./modules/js-youxiaofen");
    var m5 = require("./modules/xz-zong-sifenwei");
    var m6 = require("./modules/xz-zong-banjishangxian");

    m1.zuigaofen();  // 最高分

    m2.youxiuxuesheng();  //联考优秀学生分布

    m3.pingjunfenBiaozhunfen();  // 平均分与标准分

    m4.youxiaofen();  //有效分

    m5.sifenweifenxi();  // 联考四分位分析

    m6.banjishangxian();  // 各班级上线情况
});