define(function (require, exports, module) {
    // 教师成绩分析
    require("./units/analyhead");
    var analy = require("analy");
    var test_ranking = require("./modules/test_ranking");
    // var m2 = require("./modules/js-benxiaoQian50");

    test_ranking.liankaoQian50();   //联考成绩排名（前50名）

    test_ranking.benxiaoQian50();   //本校学生成绩排名（前50名）
});