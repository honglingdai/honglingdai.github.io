define(function (require, exports, module) {
    //考试概括
    require("./units/analyhead");
    var analy = require("analy");
    var m1 = require("./modules/bzr-mingtizhiliang");
    var m2 = require("./modules/bzr-fenshuduan");
    var m3 = require("./modules/bzr-gaikuang-xiaojie");
    m1.mingtizhiliang();  //命题质量概况
    m2.fenshuduan();  // 分数段
    m3.xiaojie();  // 小结
});