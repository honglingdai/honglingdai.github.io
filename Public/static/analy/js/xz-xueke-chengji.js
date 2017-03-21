define(function (require, exports, module) {
    require("./units/analyhead.js");
    var analy = require("analy");
    var test_ranking = require("./modules/test_ranking");

    test_ranking.liankaoQian50();   //联考成绩排名（前50名）
    test_ranking.benxiaoQian50();   //本校学生成绩排名（前50名）

});