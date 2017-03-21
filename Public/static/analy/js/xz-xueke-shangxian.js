define(function (require, exports, module) {
    require("./units/analyhead");
    var online_rate = require("./modules/online_rate");
    var m2 = require("./modules/js-sxlpaiming");
    var m3 = require("./modules/js-classinfo");
    online_rate.rector_subject();    //上线率
    m2.sxlschool();    //一、二本上线率学校排名前10名
    m3.classinfolist();    //本校班级考试情况
});