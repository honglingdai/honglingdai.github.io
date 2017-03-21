define(function (require, exports, module) {
    require("./units/analyhead.js");
    var m1 = require("./modules/linjiesheng");
    var m2 = require("./modules/duanbansheng");
    var m3 = require("./modules/teyousheng");
    // 本班特优生
    m3.teyoushengTableRector();
    // 本校模拟A线临界生
    m1.AlineLinjieshengTable();
    // 本校模拟B线临界生
    m1.BlineLinjieshengTable();
    // 本班A线短板生
    m2.AduanbanshengTable();
    // 本班B线短板生
    m2.BduanbanshengTable();
});