define(function (require, exports, module) {
    require("./units/analyhead.js");
    // var analy = require("analy");
    var m1 = require("./modules/teyousheng");
    var m2 = require("./modules/linjiesheng");
    var m3 = require("./modules/duanbansheng");

    m1.teyoushengTable();  // 本班特优生

    m2.AlineLinjieshengTable();  // 本班模拟A线临界生

    m2.BlineLinjieshengTable();  // 本班模拟B线临界生

    m3.AduanbanshengTable();  // 本班A线短板生

    m3.BduanbanshengTable();  // 本班B线短板生
 });