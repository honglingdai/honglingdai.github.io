define(function (require, exports, module) {
    require("./units/analyhead.js");
    var m1 = require("./modules/js-zuigaofen");
    var m2 = require("./modules/xz-xueke-liankaoyouxiuxuesheng");
    var m3 = require("./modules/bzr-pingjunfenBiaozhunfen");
    var m4 = require("./modules/js-youxiaofen");
    m1.zuigaofenRector();    //最高分
    m2.youxiuxuesheng();   //联考优秀学生分布
    m3.pingjunfenBiaozhunfen();     //平均分与标准分
    m4.youxiaofen();    //有效分
});