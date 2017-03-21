define(function (require, exports, module) {
    require("./student");
    require("./units/analyhead");
    var analy = require("analy");
    var m1 = require("./modules/xs-chengjigk");
    var m2 = require("./modules/xs-chengjipm");
    var m3 = require("./modules/xs-chengjizuigaofenPingjunfen");
    var m4 = require("./modules/xs-chengjijinbucd");
    var m5 = require("./modules/xs-chengjigekeqk");
    var m6 = require("./modules/xs-chengjixj");
    // 身份id
    //成绩概况
    if(role == "0" || role == "2"){   //当角色为学生和班主任时
        m1.chengjigkTable();
    }else{
        m1.jschengjigkTable();
    }
    m2.paiming();  //成绩排名
    m3.chengjizuigaofenPingjunfen();  //最高分与平均分对比
    m4.chengjijinbucd();  // 成绩进步程度
    m5.gekeqk();  // 各科考试情况
    m6.xiaojie();  // 导读
    // analy.studentNav();  // 其他权限查看学生导航改变
});