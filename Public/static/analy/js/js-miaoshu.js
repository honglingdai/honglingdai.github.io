define(function (require, exports, module) {
    require("./units/analyhead.js");
    var m1 = require("./modules/js-zuigaofen");
    var m2 = require("./modules/js-pingjunfenBiaozhunfen");
    var m3 = require("./modules/js-youxiaofen");
    //最高分
    m1.zuigaofen();
    // 平均分与标准分
    m2.pingjunfenBiaozhunfen();
    // 有效分
    m3.youxiaofen();
    //小结
});