define(function (require, exports, module) {
    require("./units/analyhead");
    //上线情况
    var online_rate = require("./modules/online_rate");
    var m2 = require("./modules/xz-zong-shangxianlvpaiming");
    var m3 = require("./modules/bzr-gebanqingkuang");
    online_rate.rector();  //上线率
    m2.shangxianlvPangming();  //上线率学校排名（前10位）
    m3.gebanqingkuangRector(); //本校各班级考试情况
});