define(function (require, exports, module) {
    require("./units/analyhead");
    var m1 = require("./modules/js-xuekemingti-class");
    var m2 = require("./modules/js-nanduqufendu");
    var m3 = require("./modules/js-keguantifenxi");
    var score_section = require("./modules/score_section");
    var m5 = require("./modules/js-getikaoqing");
    var m6 = require("./modules/js-gaikuang-xiaojie");
    // 本班学科命题分析
    m1.xuekemingti();
    // 难度区分度
    m2.nanduqufenduChart();
    // 客观题选项分析
    m3.keguantifenxi();
    // 分数段
    score_section.teacher();
    // 各题考情
    m5.getikaoqing();
    //小结
    m6.xiaojie();
});