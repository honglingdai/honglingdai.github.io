define(function (require, exports) {
    var analy = require("analy");

    //成绩分布
    exports.chengjifenbu = function(){
        // 参数配置
        var param,
            baseParam = {
                params:["scoreDistribution"],
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
            var $chengjifenbu = $("#chart_chengjifenbu");
            if(data.status === 1){
                var json = data.data;
                var eachArr = function(num){
                    var arr = [];
                    for(var i = 0 ; i < json.length; i++){
                        var item = json[i][num];
                        arr.push(item)
                    }
                    return arr;
                };

                /*echart表*/
                //成绩分布图
                var list = {
                    "name":["分数段人数"]
                };
                list.xAxis = eachArr("Interval");
                list.series = eachArr("UserCount");


                var option = {
                    title:{
                        show:false,
                        text:"成绩分布图",
                        x:"center"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            // dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:["分数段人数"],
                        bottom:5
                    },
                    grid:{
                        top:40,
                        left:10,
                        right:10,
                        bottom:40,
                        borderColor:"#aaa",
                        containLabel:true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: list.xAxis
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name:'单位：人数',
                            min: 0,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:list.name[0],
                            type:'bar',
                            barWidth:"40%",
                            data:list.series,
                            label: {
                                normal: {
                                    show: true,
                                    position: "top"
                                }
                            }
                        }
                    ]
                };
                $chengjifenbu.height(400);
                $.chart(option,"#chart_chengjifenbu");
            }
            $chengjifenbu.subDataEmpty(0)
        });
    };
});