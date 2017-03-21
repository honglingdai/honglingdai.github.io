define(function (require, exports, module) {
    require("./units/analyhead.js");
    var analy = require("analy");
    //考试概括
    var template =  require("tmpl");
    var m1 = require("./modules/xz-mingtizhiliang");
    var score_section = require("./modules/score_section");
    var m3 = require("./modules/xz-gaikuang-xiaojie");

    m3.xiaojie();  // 导读
    m1.mingtizhiliang();  // 命题质量概况
    score_section.rector();  // 分数段

});