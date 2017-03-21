define(function (require, exports, module) {
    // 教师本班学情分析
    require("./units/analyhead.js");
    var analy = require("analy");
    var m1 = require("./modules/js-zhishibankuaidcd");
    var m2 = require("./modules/linjiesheng");
    var m3 = require("./modules/duanbansheng");
    //班级知识板块达成度分析
    m1.zhishibankuaidcd();
    // 本班模拟A线临界生（+5，-5）
    m2.AlineLinjieshengTable();
    // 本班模拟B线临界生（+10，-10）
    m2.BlineLinjieshengTable();
    // 本班A线短板生
    m3.AduanbanshengTable();
    // 本班B线短板生
    m3.BduanbanshengTable();
});