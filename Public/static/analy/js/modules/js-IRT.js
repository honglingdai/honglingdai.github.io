define(function (require, exports) {
    var analy = require("analy");

    exports.IRT = function(){
        //前5题，后5题绑定事件
        $("#IRT_table-nav").on("click","a",function(e){
            e.preventDefault();
            var $this = $(this),
                selector = $this.attr("href");
            $(selector).show().siblings().hide();
            $this.removeClass("btn-second").addClass("btn-primary");
            $this.siblings().removeClass("btn-primary").addClass("btn-second");
        });

                var json = {
                    "before":{
                        "thead":[
                            [{"cont":"题号A"},{"cont":"知识点"},{"cont":"bi"},{"cont":"ai"},{"cont":"应用信息量"},{"cont":"MAX实提供信息量"},{"cont":"试题题质量评价"}]
                        ],
                        "tbody":[
                            [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
                            [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
                            [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
                            [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
                            [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}]
                        ]},
                    "after":{
                        "thead":[
                            [{"cont":"题号B"},{"cont":"知识点"},{"cont":"bi"},{"cont":"ai"},{"cont":"应用信息量"},{"cont":"MAX实提供信息量"},{"cont":"试题题质量评价"}]
                        ],
                        "tbody":[
                            [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
                            [{"cont":"2"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
                            [{"cont":"3"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
                            [{"cont":"4"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
                            [{"cont":"5"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}]
                        ]},
                    "name":["第1题","第2题","第3题","第4题","第5题"],
                    "xAxis":["-3", "-2", "-1", "0", "1", "2", "3"],
                    "series":[[0.1, 0.12, 0.22, 0.30, 0.43, 0.62, 0.8],[0.11, 0.14, 0.24, 0.32, 0.41, 0.65, 0.78],[0.07, 0.1, 0.21, 0.16, 0.40, 0.60, 0.70],[0.03, 0.1, 0.2, 0.26, 0.43, 0.63, 0.73],[0.9, 0.8, 0.5, 0.46, 0.43, 0.33, 0.13]]
                };
                //table
                $("#j_IRT-before5").html(analy.createTable(json["before"]));
                $("#j_IRT-after5").html(analy.createTable(json["after"])).hide();
                /*echart表*/
                //成绩分布图
                var list = json;
                var option = {
                    title:{
                        text:"试题ICC曲线图",
                        x:"center"
                    },
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
                            name: 'XUnit',
                            data: list.xAxis
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: 'YUnit',
                            min: 0,
                            max: 1.5,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:list.name[0],
                            type:'line',
                            data:list.series[0]
                        },{
                            name:list.name[1],
                            type:'line',
                            data:list.series[1]
                        },{
                            name:list.name[2],
                            type:'line',
                            data:list.series[2]
                        },{
                            name:list.name[3],
                            type:'line',
                            data:list.series[3]
                        },{
                            name:list.name[4],
                            type:'line',
                            data:list.series[4]
                        }
                    ]
                };
                $.chart(option,"#chart_ICC");

    };

    //IRT理论典型错误答题
    // exports.IRT = function(){
    //     // 参数配置
    //     var param,
    //         baseParam = {
    //             params:["getIRT"],
    //             userID: $.cookie("yj_front_UserID"),
    //             examID: $.cookie("analy_ExamID"),
    //             subjectID:$.cookie("analy_SubjectID")
    //         },
    //         // 学科老师权限参数
    //         param_Teacher = {
    //             classID:$.cookie("analy_ClassID")
    //         },
    //         // 班主任权限参数
    //         param_Bzr = {
    //             classID:$.cookie("analy_ClassID")
    //         },
    //         // 校长权限
    //         param_Rector = {
    //             schoolID: $.cookie("analy_SchoolID")
    //         },
    //         // 区域权限
    //         param_Region = {
    //             schoolID: $.cookie("analy_SchoolID"),
    //             areaID: $.cookie("analy_AreaID")
    //         };
    //     // 根据身份id 配置参数
    //     switch(role){
    //         case "1" : param = $.extend({},baseParam,param_Teacher);
    //             break;
    //         case "2" : param = $.extend({},baseParam,param_Bzr);
    //             break;
    //         case "4" : param = $.extend({},baseParam,param_Rector);
    //             break;
    //         case "5" : param = $.extend({},baseParam,param_Region);
    //             break;
    //     }
    //     //前5题，后5题绑定事件
    //     $("#IRT_table-nav").on("click","a",function(e){
    //         e.preventDefault();
    //         var $this = $(this),
    //             selector = $this.attr("href");
    //         $(selector).show().siblings().hide();
    //         $this.removeClass("btn-second").addClass("btn-primary");
    //         $this.siblings().removeClass("btn-primary").addClass("btn-second");
    //     });
    //     $.analyzeHandler(param,function(data){
    //         if(data.status ===1){
    //             var json = {
    //                 "before":{
    //                     "thead":[
    //                         [{"cont":"题号A"},{"cont":"知识点"},{"cont":"bi"},{"cont":"ai"},{"cont":"应用信息量"},{"cont":"MAX实提供信息量"},{"cont":"试题题质量评价"}]
    //                     ],
    //                     "tbody":[
    //                         [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
    //                         [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
    //                         [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
    //                         [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
    //                         [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}]
    //                     ]},
    //                 "after":{
    //                     "thead":[
    //                         [{"cont":"题号B"},{"cont":"知识点"},{"cont":"bi"},{"cont":"ai"},{"cont":"应用信息量"},{"cont":"MAX实提供信息量"},{"cont":"试题题质量评价"}]
    //                     ],
    //                     "tbody":[
    //                         [{"cont":"1"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
    //                         [{"cont":"2"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
    //                         [{"cont":"3"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
    //                         [{"cont":"4"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}],
    //                         [{"cont":"5"},{"cont":"商品价格对供求的影响"},{"cont":"0.38"},{"cont":"0.97"},{"cont":"0.02"},{"cont":"0.21"},{"cont":"该题分值是2分，其预期难度是0.7，实测难度是0.69，难度参数属于中等"}]
    //                     ]},
    //                 "name":["第1题","第2题","第3题","第4题","第5题"],
    //                 "xAxis":["-3", "-2", "-1", "0", "1", "2", "3"],
    //                 "series":[[0.1, 0.12, 0.22, 0.30, 0.43, 0.62, 0.8],[0.11, 0.14, 0.24, 0.32, 0.41, 0.65, 0.78],[0.07, 0.1, 0.21, 0.16, 0.40, 0.60, 0.70],[0.03, 0.1, 0.2, 0.26, 0.43, 0.63, 0.73],[0.9, 0.8, 0.5, 0.46, 0.43, 0.33, 0.13]]
    //             };
    //             //table
    //             $("#j_IRT-before5").html(analy.createTable(json["before"]));
    //             $("#j_IRT-after5").html(analy.createTable(json["after"])).hide();
    //             /*echart表*/
    //             //成绩分布图
    //             var list = json;
    //             var option = {
    //                 title:{
    //                     text:"试题ICC曲线图",
    //                     x:"center"
    //                 },
    //                 tooltip: {
    //                     trigger: 'axis'
    //                 },
    //                 toolbox: {
    //                     feature: {
    //                         dataView: {show: true, readOnly: false},
    //                         magicType: {show: true, type: ['line', 'bar']},
    //                         restore: {show: true},
    //                         saveAsImage: {show: true}
    //                     }
    //                 },
    //                 grid:{
    //                     top:40,
    //                     left:10,
    //                     right:10,
    //                     bottom:40,
    //                     borderColor:"#aaa",
    //                     containLabel:true
    //                 },
    //                 legend: {
    //                     data:list.name,
    //                     x:"center",
    //                     y:"bottom"
    //                 },
    //                 xAxis: [
    //                     {
    //                         type: 'category',
    //                         name: 'XUnit',
    //                         data: list.xAxis
    //                     }
    //                 ],
    //                 yAxis: [
    //                     {
    //                         type: 'value',
    //                         name: 'YUnit',
    //                         min: 0,
    //                         max: 1.5,
    //                         axisLabel: {
    //                             formatter: '{value}'
    //                         }
    //                     }
    //                 ],
    //                 series: [
    //                     {
    //                         name:list.name[0],
    //                         type:'line',
    //                         data:list.series[0]
    //                     },{
    //                         name:list.name[1],
    //                         type:'line',
    //                         data:list.series[1]
    //                     },{
    //                         name:list.name[2],
    //                         type:'line',
    //                         data:list.series[2]
    //                     },{
    //                         name:list.name[3],
    //                         type:'line',
    //                         data:list.series[3]
    //                     },{
    //                         name:list.name[4],
    //                         type:'line',
    //                         data:list.series[4]
    //                     }
    //                 ]
    //             };
    //             $.chart(option,"#chart_ICC");
    //         }
    //     });
    // };
});