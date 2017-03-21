define(function (require, exports, module) {
    require("./units/analyhead.js");
    var m1 = require("./modules/js-xuekemingti-class");
    var m2 = require("./modules/js-nanduqufendu");
    var m3 = require("./modules/js-keguantifenxi");
    var m4 = require("./modules/xz-xueke-fenshuduan");
    var m5 = require("./modules/js-gaikuang-xiaojie");
    m1.xuekemingti();  //学科命题分析
    m2.nanduqufendu();  //难度区分度
    m3.keguantifenxi();  //客观题选项分析
    m4.fenshuduan();  //分数段
    m5.xiaojieRector();   //导读
});