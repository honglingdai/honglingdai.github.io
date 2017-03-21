define(function (require, exports, module) {
    //描述统计
    require("./units/analyhead.js");
    var m1 = require("./modules/bzr-zuigaofen");
    var m2 = require("./modules/qy-xiaoji-gexiaozuigaofen");
    var m3 = require("./modules/xz-youxiuxueshengfenbu");
    var m4 = require("./modules/qy-xiaoji-pingjunfen");
    var m5 = require("./modules/qy-xiaoji-xuekebiaozhunfen");
    var m6 = require("./modules/js-youxiaofen");
    var m7 = require("./modules/xz-zong-sifenwei");
    var m8 = require("./modules/xz-zong-banjishangxian");

    m1.region_zuigaofen();  // 最高分

    m2.region_zuigaofen();  //区域各校最高分

    m3.region_youxiuxuesheng();  //联考优秀学生分布

    m4.region_zuigaofen();  // 平均分与标准分

    // m5.xuekebiaozhunfen();  // 学科标准分比较图

    m6.youxiaofen();  //有效分

    m7.sifenweifenxi();  // 联考四分位分析

    m8.region_banjishangxian();  // 各班级上线情况
});