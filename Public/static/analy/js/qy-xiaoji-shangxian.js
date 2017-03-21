define(function (require, exports, module) {
    require("./units/analyhead");
    //上线情况
    var online_rate = require("./modules/online_rate");
    var m2 = require("./modules/qy-xiaoji-shangxianlvpaiming");
    var m3 = require("./modules/qy-xiaoji-gebanqingkuang");

    online_rate.region_shangxianlv();  //上线率
    m2.shangxianlvPangming();  //上线率学校排名（前10位）
    m3.region_gebanqingkuang(); //本区各校考情
});