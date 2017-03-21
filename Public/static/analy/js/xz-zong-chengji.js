define(function (require, exports, module) {
    require("./units/analyhead.js");
    var analy = require("analy");
    var test_ranking = require("./modules/test_ranking");
    // var m2 = require("./modules/bzr-benquQian50");
    test_ranking.liankaoQian100();  //联考成绩排名（前100名）

    test_ranking.benxiao100Rector();  //本校学生成绩（前50名）
 });