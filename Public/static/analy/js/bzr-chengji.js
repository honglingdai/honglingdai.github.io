define(function (require, exports, module) {

    var analy = require("analy");
    require("./units/analyhead");
    var test_ranking = require("./modules/test_ranking");
    // var m2 = require("./modules/bzr-benquQian50");

    test_ranking.benxiaoQian100();
    test_ranking.benquQian50();
 });