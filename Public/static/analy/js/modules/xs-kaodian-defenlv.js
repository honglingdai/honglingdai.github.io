define(function (require, exports, module) {
    require("../getData");
    // 各小题得分率对比
    var analy = require("analy");
    exports.kaodiandefenlv = function () {
        // 定义参数
        var param = {
            params:["getScoreAverage"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID:$.cookie("analy_SubjectID"),
            studentID: $.cookie("analy_StudentID")
        };
        // 班主任身份时参数
        if(role ==="2"){
            param.classID = $.cookie("analy_ClassID")
        }

        $.analyzeHandler(param,function(data){
            if(data.status === 1){
                var json = data.data;
                var list = json.TestList;
                // 班级人数
                $('[view-id="classPeopleNum"]').html("班级人数："+json.ClassCount+"人");
                // 参数处理
                var eachArr = function(num){
                    var arr = [];
                    for(var i = 0 ; i < list.length; i++){
                        var numList  = list[i][num];
                        arr.push(numList)
                    }
                    return arr;
                };
                var eachArrti = function(num){
                    var arr = [];

                    for(var i = 0 ; i < list.length; i++){
                        var numList  = "第" + list[i][num] + "题";
                        // var item =(num =='Order')
                        //     ?numList+'题':numList.slice(0,-1);
                        arr.push(numList)
                    }
                    return arr;
                };
                // 生成图标
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
                    dataZoom: [
                        {
                            show: true,
                            height: 30,
                            type: 'slider',
                            bottom: 42,
                            xAxisIndex: [0],
                            start: 0
                            // end: 50
                        }
                    ],
                    legend: {
                        // data:list.name,
                        data:["我的得分率","班平均得分率","校平均得分率","总平均得分率"],
                        bottom:2
                    },
                    grid:{
                        top:40,
                        left:10,
                        right:10,
                        bottom:80,
                        borderColor:"#aaa",
                        containLabel:true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            // data: ['1题','2题','3题','4题','5题','6题','7题','8题','9题','10题','11题','12题','13题']
                            data:eachArrti("Order")
                        }
                    ],
                    yAxis: [
                        {
                            // name:"得分率 %",
                            type: 'value',
                            min: 0,
                            max: 100,
                            //interval: 100,
                            axisLabel: {
                                formatter: '{value}%'
                            }
                        }
                    ],
                    series: [
                        {
                            name:"我的得分率",
                            type:'bar',
                            barWidth:"40%",
                            data:eachArr("UserAvg")
                        },{
                            name:"班平均得分率",
                            type:'line',
                            data:eachArr("ClassAvg")
                        },
                        {
                            name:"校平均得分率",
                            type:'line',
                            data:eachArr("SchoolAvg")
                        },
                        {
                            name:"总平均得分率",
                            type:'line',
                            data:eachArr("ExamAvg")
                        }
                    ]
                };
                //图表高度
                $("#chart_scoringRate").height(430);
                // 生成图标
                $.chart(option, "#chart_scoringRate");
            }else{
                // 数据为空时
                $("#chart_scoringRate").subDataEmpty(0);
            }
        })



    }


});