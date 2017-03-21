define(function (require, exports, module) {
    // 教师上线情况
    require("./units/analyhead.js");
    var online_rate = require("./modules/online_rate");
    var m2 = require("./modules/js-sxlpaiming");
    var m3 = require("./modules/js-classinfo");
    // 上线率
    online_rate.teacher();
    // 一、二本上线率学校排名前10名
    m2.sxlschool();
    // 本校班级考试情况
    m3.classinfolist();
});