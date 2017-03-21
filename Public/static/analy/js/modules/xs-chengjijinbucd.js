define(function (require, exports) {
    require("../getData");
    var href = window.location.href;   //获取链接地址
    // 成绩进步程度
    var analy = require("analy");
    exports.chengjijinbucd = function () {
        // 定义参数
        var param = {
            params:["getScoreGrade"],
            userID: $.cookie("yj_front_UserID"),
            examID:$.cookie("analy_ExamID"),
            studentID: $.cookie("analy_StudentID")
        };
        //考点分析页面 参数
        if(href.indexOf("kaodian") !== -1){
            param.params = ["getSubjectGrade"];
            param.subjectID = $.cookie("analy_SubjectID");
        }
        if(role === "1"){
            // 老师权限参数
            param.subjectID = $.cookie("analy_SubjectID");
            param.classID = $.cookie("analy_ClassID")
        }else if(role === "2"){
            // 班主任权限参数
            param.classID = $.cookie("analy_ClassID")
        }
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                var list = data.data;
                var $score = $(".j_chengjijingbuchengdu"),
                    $table = $("#chart_jinbuchengdu");
                if(href.indexOf("kaodian") !== -1){
                    //考点分析 文字信息
                    $score.html("本次考试满分："+list.SubjectScore+"分")
                }else{
                    // 其他页面 文字信息
                    $score.html("本次考试满分："+ list.ExamScore +" 分");
                }
                // 返回参数处理
                var eachArr = function(num){
                    var arr = [];
                    var newList = list.ExamList;
                    for(var i = 0 ; i < newList.length; i++){
                        var item = newList[i][num];
                        arr.push(item)
                    }
                    return arr;
                };
                // 图表参数
                var newdata = {};
                newdata.legend = ["班级进步程度","校级进步程度","总体进步程度"];
                newdata.xAxis = eachArr("ExamName");
                newdata.series = [];
                newdata.series[0] = eachArr("ClassGrade");
                newdata.series[1] = eachArr("SchoolGrade");
                newdata.series[1] = eachArr("SchoolGrade");
                newdata.series[2] = eachArr("ExamGrade");
                newdata.series[2] = eachArr("ExamGrade");
                newdata.fullScore = 800;

                var option = {
                    tooltip: {
                        trigger: 'axis',
                        // formatter: function (newdata) {
                        //     return tooltipFormatter(newdata[0]);
                        // }
                        formatter: '{b} <br />{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}% '
                    },
                    legend:{
                        // borderColor:'#ccc'
                        trigger: 'axis',
                        data:newdata.legend,
                        x:"center",
                        y:"bottom"
                    },
                    toolbox: {
                        feature: {
                            // dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
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
                            data: newdata.xAxis
                            // axisLine:{
                            //     lineStyle:{
                            //         color:"#ddd"
                            //     }
                            // }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            minInterval : 1,
                            // inverse:true,
                            min: -100,
                            max: 100,
                            axisLabel: {
                                formatter: '{value}%',
                                interval:2
                            },
                            axisLine:{
                                lineStyle:{
                                    color:"#ddd"
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name:'班级进步程度',
                            type:'line',
                            data: newdata.series[0]
                        },
                        {
                            name:'校级进步程度',
                            type:'line',
                            data: newdata.series[1]
                        },{
                            name:'总体进步程度',
                            type:'line',
                            data: newdata.series[2]
                        }
                    ]
                };
                // 设置图表高度
                $table.height(450);
                $.chart(option,"#chart_jinbuchengdu");
            }
            else{
                // 数据为空时显示
                $table.subDataEmpty(0);
            }
        });

    }
});