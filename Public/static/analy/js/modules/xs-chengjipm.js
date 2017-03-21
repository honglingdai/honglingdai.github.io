define(function (require, exports, module) {
    // 成绩排名
    require("../getData");
    require("echarts");
    exports.paiming=function(){

        var param = {
            params:["getScoreRank"],
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
            param.classID = $.cookie("analy_ClassID")
        }
        $.analyzeHandler(param,function(data){
            // 获取图表ID
            var $table = $("#chart_chengjipm");
            if(data.status===1 && data.data){
                var list = data.data;
                // 文字信息概况
                $('[view-id="classPeopleNum"]').html("班级人数："+list.ClassCount+"人");
                // 获取图标参数函数
                var eachArr = function(num){
                    var arr = [];
                    var newList = list.ScoreList;
                    for(var i = 0 ; i < newList.length; i++){
                        var item = newList[i][num];
                        arr.push(item)
                    }
                    return arr;
                };
                // 图标参数
                var newdata = {};
                newdata.legend = ["班级排名","校级排名","总排名"];
                newdata.xAxis = eachArr("SubjectName");
                newdata.series = [];
                newdata.series[0] = eachArr("ClassTranscend");
                newdata.series[1] = eachArr("SchoolTranscend");
                newdata.series[2] = eachArr("TotalTranscend");

                var option = {
                    title:{
                        show:false,
                        text:"成绩排名图表",
                        x:"center"
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{b} <br />{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%'
                    },
                    legend:{
                        bottom:5,
                        data:newdata.legend
                    },
                    toolbox: {
                        // feature: {
                        //     saveAsImage: {}
                        // }
                    },
                    grid:{
                        containLabel:true,
                        top:40,
                        bottom:40,
                        right:0,
                        left:0,
                        backgroundColor:["#fff","#ddd"]
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: newdata.xAxis,
                            width:[40],
                            name:'后一名',
                            nameLocation:'start',
                            position:'bottom',
                            nameGap:5,
                            nameTextStyle:{
                                color:"#333"
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            min: 1,
                            max: 100,
                            axisLabel: {
                                formatter: '                '
                            },
                            name:'第一名            ',
                            nameLocation:'end',
                            position:'left',
                            nameGap:-10,
                            nameTextStyle:{
                                color:"#333"
                            }
                        }
                    ],
                    series: [
                        {
                            name:'班级排名',
                            type:'bar',
                            // barWidth:"20%",
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    formatter:"超{c}%"
                                }
                            },
                            data:newdata.series[0]
                        },
                        {
                            name:'校级排名',
                            type:'bar',
                            // barWidth:"20%",
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    formatter:"超{c}%"
                                }
                            },
                            data:newdata.series[1]
                        },
                        {
                            name:'总排名',
                            type:'bar',
                            // barWidth:"20%",
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    formatter:"超{c}%"
                                }
                            },
                            data:newdata.series[2]
                        }
                    ]
                };

                // 图标高度
                $table.height(300);
                $.chart(option,"#chart_chengjipm");
            }
            else{
                $table.subDataEmpty(0);
            }
        })

    };
});