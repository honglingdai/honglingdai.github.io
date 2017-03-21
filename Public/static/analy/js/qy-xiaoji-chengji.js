define(function (require, exports, module) {
    require("./units/analyhead.js");
    var analy = require("analy");
    var test_ranking = require("./modules/test_ranking");
    test_ranking.liankaoQian100Region();  //联考成绩排名（前100名）

    test_ranking.benqu50Region();  //本校学生成绩（前50名）
 });