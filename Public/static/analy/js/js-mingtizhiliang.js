define(function (require) {
    require("./units/analyhead.js");
    var m1 = require("./modules/js-mingtigaikuang");
    var m2 = require("./modules/js-xuekemingti");
    var m3 = require("./modules/js-keguantifenxi");
    var m4 = require("./modules/js-nanduqufendu");
    var m5 = require("./modules/js-chengjifenbu");
    var m6 = require("./modules/js-nanyipodu");
    var m7 = require("./modules/js-IRT");

    m1.mingtizhiliang();    //命题质量概况
    m2.xuekemingti();       //学科命题
    m3.keguantifenxi();     //客观题选项分析
    m4.nanduqufendu();      //试卷难度区分度分布
    m5.chengjifenbu();      //成绩分布
    m6.nanyipodu();         //试卷难易坡度
    m7.IRT();               //IRT理论典型错误答题
})