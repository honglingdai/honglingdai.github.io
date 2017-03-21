define(function (require, exports, module) {
    require("./student");
    require("./units/analyhead");
    var analy = require("analy");
    var m1 = require("./modules/xs-kaodian-fenxi");
    var m3 = require("./modules/xs-knowledgePoint");
    var m4 = require("./modules/xs-chengjijinbucd");
    var m5 = require("./modules/xs-kaodian-defenlv");
    var m6 = require("./modules/xs-kaodian-nenglijg");
    var m7 = require("./modules/xs-kaodian-zhangjie");
    m1.kaodianfenxi();   //各小题得分分析
    m5.kaodiandefenlv();  //各小题得分率对比
    m7.zhangjiedacheng();  // 章节达成度分析
    m6.skillAnalysis();  // 能力结构分析
    m4.chengjijinbucd();  // 成绩进步程度
    m3.knowledgePoint();  // 知识点掌握情况
    // analy.studentNav();  // 其他权限查看学生导航改变

});