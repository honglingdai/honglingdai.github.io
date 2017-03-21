define(function (require, exports, module) {
    //上线情况
    require("./units/analyhead");
    var online_rate = require("./modules/online_rate");
    var m2 = require("./modules/bzr-gebanqingkuang");

    online_rate.master();  // 上线率

    m2.gebanqingkuang();  // 本校各班级考试情况
});