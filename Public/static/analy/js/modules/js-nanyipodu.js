define(function (require, exports) {
    var analy = require("analy");

    //试卷难易坡度
    exports.nanyipodu = function(){
        // 参数配置
        var param,
            baseParam = {
                params:["testDiff"],
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
            var $nanyipodu = $("#chart_nanyipodu");
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
                    "name":['预计难度','实测难度']
                };
                list.xAxis = eachArr("OrderID");
                list.series1 = eachArr("Diff");
                list.series2 = eachArr("TrueDiff");
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
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
                    legend: {
                        data:list.name,
                        x:"center",
                        y:"bottom"
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
                            name:'单位：值数',
                            min: 0,
                            max: 1,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'预计难度',
                            type:'line',
                            data: list.series1
                        },
                        {
                            name:'实测难度',
                            type:'line',
                            data: list.series2
                        }
                    ]
                };
                $nanyipodu.height(400);
                $.chart(option,"#chart_nanyipodu");
            }else{
                $nanyipodu.subDataEmpty(0);
            }
        });
    };
});