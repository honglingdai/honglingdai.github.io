define(function (require) {
    var logic = require("./logic");
    // 检查权限
    if (!logic.checkPower()) {
        return;
    }
    var paperSeeProcess = {
        init: function () {
            var e = this;
            e.renderTotalIndex();//进度查询
        },
        renderTotalIndex: function () {
            //进度查询
            var descSite = $("#j_ed-desc-info");
            var param = {
                params: ["subjectTestSpeed"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("review_ExamID"),
                subjectID: $.cookie("review_SubjectID"),
                cutID: $.cookie("review_CutID")
            };
            $.handler(param, function (data) {
                var status = data.status;
                var list = data.data;
                if (status === 1) {
                    $("#j_contentTitle").html(list.ExamName + $.getSubjectInfo());

                    //生成统计信息
                    descSite.html(paperSeeProcess.renderTotalInfo(list));

                    // 每日阅卷量统计
                    paperSeeProcess.createTotalChart(list.DateList);

                    //var myScoreData = [[2,0],[22,0.5], [33,1],[40,1.5],[50,2],[200,3],[230,4]];
                    //分数分布统计
                    console.log(list.ScoreList);
                    paperSeeProcess.scoreLayoutChart(paperSeeProcess.output2arr(list.ScoreList));

                    $(".full-loading").fadeOut(100);
                }
                else {
                    $(".full-loading").addClass("data-empty-1");
                }
            });
        },
        // 生成统计信息
        renderTotalInfo: function (data) {
            var temp = '';
            temp += '<ul>\
                <li>科目：<span class="text-danger">' + data.SubjectName + '</span></li>\
                <li>题目：第 ' + paperSeeProcess.testSubOrder(data.OrderStart, data.OrderEnd) + ' 题</li>\
                <li>已阅试卷：<span class="text-second">' + data.ReviewNum + ' 份</span></li>\
                <li>考试人数：' + data.StudentNum + ' 人</li>\
                <li>平均分：<span class="text-second">' + data.AvgScore + ' 分</span></li>\
                <li>满分：' + data.Score + ' 分</li>\
                <li>平均速度：' + data.AvgSpeed + ' 秒/份</li>\
                </ul>';
            return temp;
        },

        // 处理题目序号显示
        testSubOrder: function (startOrder, endOrder) {
            var orderStartEnd = ((startOrder === endOrder) ? endOrder : (startOrder + '~' + endOrder));
            var reg = /\(0\)/g;
            return orderStartEnd.replace(reg, "");
        },

        //二维数组 echart数据格式
        output2arr: function (scoreList) {
            var arr = [];
            $.each(scoreList, function (i) {
                var _this = this;
                arr[i] = [];
                arr[i][0] = _this["Num"] - 0;
                arr[i][1] = _this["Score"] - 0
            });
            return arr;
        },

        //每日阅卷量统计
        createTotalChart: function (data) {

            // 格式化时间
            var dataEchart = {
                time: function (data) {
                    var time = [];
                    for (var i = 0; i < data.length; i++) {
                        time[i] = data[i]['Date'];
                    }
                    return time;
                },
                total: function (data) {
                    var total = [];
                    for (var j = 0; j < data.length; j++) {
                        total[j] = data[j]['ReviewNum'];
                    }
                    return total;
                }
            };

            var res = {time: dataEchart.time(data), total: dataEchart.total(data)};
            var option = {
                title: {
                    show: false,
                    text: '每日阅卷量统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: '时间：{b}<br/>{a}：{c}份'
                },
                toolbox: {
                    feature: {
                        magicType: {
                            type: ['line', 'bar']
                        },
                        saveAsImage: {}

                    }
                },
                grid: {
                    left: 2,
                    right: 40,
                    bottom: 6,
                    containLabel: true
                },
                yAxis: [
                    {
                        name: '时间',
                        type: 'category',
                        data: res['time'],
                        fontSize: '10px',
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                xAxis: [
                    {
                        name: '总量',
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '总量',
                        type: 'bar',
                        barWidth: '50%',
                        data: res['total']
                    }
                ]
            };
            $.chart(option, "#markingPaperTotal", data);
        },
        // 分数分布统计
        scoreLayoutChart: function (data) {
            var option = {
                title: {
                    show: false,
                    text: '分数分布统计'
                },
                grid: {
                    left: '10',
                    right: '50',
                    bottom: '10',
                    containLabel: true
                },
                tooltip: {
                    trigger: 'axis',
                    showDelay: 0,
                    formatter: function (params) {
                        if (params.value.length > 1) {
                            return params.value[1] + '分  ' + params.value[0] + '人';
                        }
                        else {
                            return params.name + ' : '
                                + params.value + '分'
                        }
                    },
                    axisPointer: {
                        show: true,
                        type: 'cross',
                        lineStyle: {
                            type: 'dashed',
                            width: 1
                        }
                    }
                },
                xAxis: [
                    {
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value}人'
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        scale: true,
                        axisLabel: {
                            formatter: '{value}分'
                        },
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: {
                    type: 'scatter',
                    data: data,
                    markArea: {
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: 'transparent',
                                borderWidth: 1,
                                borderType: 'dashed'
                            }
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最高分'},
                            {type: 'min', name: '最低分'}
                        ]
                    },
                    markLine: {
                        lineStyle: {
                            normal: {
                                type: 'solid',
                                color: '#3398DB'
                            }
                        },
                        data: [
                            {type: 'average', name: '平均分'},
                            {xAxis: 3}
                        ]
                    }
                }
            };
            $.chart(option, "#scoreLayoutTotal", data);
        }
    };
    paperSeeProcess.init();
});


