define(function (require, exports) {
    var analy = require("analy");

    // 学科命题分析-难度区分度
    exports.nanduqufenduChart = function(){
        // 参数配置
        var param,
            baseParam = {
                params:["subjectProposition"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                subjectID:$.cookie("analy_SubjectID")
            },
            // 学科老师权限参数
            param_Teacher = {
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                schoolID: $.cookie("analy_SchoolID")
            };
        // 根据身份id 配置参数
        switch(role){
            case "1" : param = $.extend({},baseParam,param_Teacher);
                break;
            case "4" : param = $.extend({},baseParam,param_Rector);
                break;
        }
        $.analyzeHandler(param,function(data){
            createChart(data)
        });
    };
    // 试卷难度区分度分布
    exports.nanduqufendu = function(){
        // 参数配置
        var param,
            baseParam = {
                params:["diffDistinguish"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                subjectID:$.cookie("analy_SubjectID")
            },
            // 学科老师权限参数
            param_Teacher = {

                classID:$.cookie("analy_ClassID")
            },
            // 班主任权限参数
            param_Bzr = {
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                schoolID: $.cookie("analy_SchoolID")
            },
            // 区域权限
            param_Region = {
                schoolID: $.cookie("analy_SchoolID"),
                areaID: $.cookie("analy_AreaID")
            };
        // 根据身份id 配置参数
        switch(role){
            case "1" : param = $.extend({},baseParam,param_Teacher);
                break;
            case "2" : param = $.extend({},baseParam,param_Bzr);
                break;
            case "4" : param = $.extend({},baseParam,param_Rector);
                break;
            case "5" : param = $.extend({},baseParam,param_Region);
                break;
        }
        $.analyzeHandler(param,function(data){
            createChart(data)
        });
    };
    // 创建图表
    var createChart = function (data) {
        analy.chartPie_v2({
            el:"#chart_nandu",
            data:data,
            callback:function(d){
                var idff = d.DiffDistribution;
                return {
                    title:"难度分布图",
                    legend:['困难（0.1-0.2）','偏难（0.2-0.4）','中等（0.4-0.8）','容易（0.8-1.0）'],
                    series:[
                        {value:idff[3], name:'困难（0.1-0.2）'},
                        {value:idff[2], name:'偏难（0.2-0.4）'},
                        {value:idff[1], name:'中等（0.4-0.8）'},
                        {value:idff[0], name:'容易（0.8-1.0）'}
                    ]
                }
            }
        },1);
        analy.chartPie_v2({
            el:"#chart_qufendu",
            data:data,
            callback:function(d){
                var Distin = d.Distinguish;
                return {
                    title:"区分度分布图",
                    legend:['较差（0.1-0.2）','需改（0.2-0.4）','较好（0.4-0.8）','很好（0.8-1.0）'],
                    series:[
                        {value:Distin[3], name:'较差（0.1-0.2）'},
                        {value:Distin[2], name:'需改（0.2-0.4）'},
                        {value:Distin[1], name:'较好（0.4-0.8）'},
                        {value:Distin[0], name:'很好（0.8-1.0）'}
                    ]
                }
            }
        },1);
    }
});