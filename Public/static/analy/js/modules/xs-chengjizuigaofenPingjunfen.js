define(function (require, exports, module) {
    // 最高分与平均分对比
    var analy = require("analy");
    exports.chengjizuigaofenPingjunfen=function(){

        var param = {
            params:["getScoreMax"],
            userID: $.cookie("yj_front_UserID"),
            examID:$.cookie("analy_ExamID"),
            studentID: $.cookie("analy_StudentID")
        };
        if(role === "1"){
            // 教师权限参数
            param.subjectID = $.cookie("analy_SubjectID");
            param.classID = $.cookie("analy_ClassID")
        }else if(role === "2"){
            // 班主任权限参数
            param.params = ["getStudentScoreMax"];
            param.classID = $.cookie("analy_ClassID")
        }
        $.analyzeHandler(param,function(data){
            // 图表ID
            var $table = $("#chart_chengjiduibi");
            if(data.status===1){
                var list = data.data;
                // 处理数据方法
                var eachArr = function(num){
                    var arr = [];
                    var newList = list.ScoreList;
                    for(var i = 0 ; i < newList.length; i++){
                        var item = newList[i][num];
                        arr.push(item)
                    }
                    return arr;
                };
                // 返回数据处理成所需参数
                var newdata = {};
                newdata.name = ["我的成绩","班最高分","班平均分","校最高分","校平均分","总最高分","总平均分"];
                newdata.xAxis = eachArr("SubjectName");
                newdata.series = [];
                newdata.series.push(eachArr("Score"));
                newdata.series.push(eachArr("ClassMax"));
                newdata.series.push(eachArr("ClassAvg"));
                newdata.series.push(eachArr("SchoolMax"));
                newdata.series.push(eachArr("SchoolAvg"));
                newdata.series.push(eachArr("ExamMax"));
                newdata.series.push(eachArr("ExamAvg"));

                var option = {
                    title:{
                        show:false,
                        text:"本校学科标准分比较图",
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
                        data:newdata.name,
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
                            data: newdata.xAxis
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            min: 0,
                            // max: 150,
                            // interval: 50,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:newdata.name[0],
                            type:'bar',
                            barWidth:"40%",
                            data:newdata.series[0]
                        },
                        {
                            name:newdata.name[1],
                            type:'line',
                            data:newdata.series[1]
                        },
                        {
                            name:newdata.name[2],
                            type:'line',
                            data:newdata.series[2]
                        }
                        ,
                        {
                            name:newdata.name[3],
                            type:'line',
                            data:newdata.series[3]
                        },
                        {
                            name:newdata.name[4],
                            type:'line',
                            data:newdata.series[4]
                        },
                        {
                            name:newdata.name[5],
                            type:'line',
                            data:newdata.series[5]
                        },
                        {
                            name:newdata.name[6],
                            type:'line',
                            data:newdata.series[6]
                        }
                    ]
                };
                // 图表高度
                $table.height(450);
                // 生成图表
                $.chart(option,"#chart_chengjiduibi");
                // 文字信息
                $(".j_chengjiduibiFullScore").html('满分：'+ list.ExamScore +' 分')
            }else{
                // 数据为空时
                $table.subDataEmpty(0);
            }
        })
    }
});