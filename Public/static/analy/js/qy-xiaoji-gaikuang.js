define(function (require, exports, module) {
    //描述统计
    require("./units/analyhead.js");
    var m1 = require("./modules/qy-xianji-xiaojie");
    var m2 = require("./modules/xz-mingtizhiliang");
    var score_section = require("./modules/score_section");

    m1.xiaojie_xiaoji();  //导读
    m2.mingtizhiliang();  // 命题质量概况
    score_section.region();  // 分数段

});