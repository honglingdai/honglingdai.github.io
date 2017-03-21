define(function (require, exports, module) {
    //各科考试情况
    require("../getData");
    exports.gekeqk = function () {
        // 基本参数配置
        var param = {
            params: ["getSubjectSwot"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            studentID: $.cookie("analy_StudentID")
        };
        if (role === "1") {
            // 教师权限参数
            param.subjectID = $.cookie("analy_SubjectID");
            param.classID = $.cookie("analy_ClassID")
        } else if (role === "2") {
            // 班主任权限参数
            param.classID = $.cookie("analy_ClassID")
        }
        $.analyzeHandler(param, function (data) {
            if (data.status === 1) {
                var list = data.data;
                var newList = list.SubjectList;
                // 返回数据处理函数
                var eachArr = function (num) {
                    var arr = [];
                    for (var i = 0; i < newList.length; i++) {
                        var item = newList[i][num];
                        arr.push(item)
                    }
                    return arr;
                };
                // 图表参数
                var newdata = {};
                newdata.name = ["我的分数", "一本分数线", "二本分数线"];
                newdata.series = [];
                newdata.series.push(eachArr("Score"));
                newdata.series.push(eachArr("ALine"));
                newdata.series.push(eachArr("BLine"));
                newdata.scoreSubject = [];

                for (var j = 0; j < newList.length; j++) {
                    newdata.scoreSubject.push({
                        text: newList[j].SubjectName,
                        max: newList[j].SubjectScore
                    })
                }
                var option = {
                    title: {
                        show: false,
                        text: '各科考试情况'
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    tooltip: {},
                    legend: {
                        bottom: 0,
                        data: newdata.name
                    },
                    radar: [
                        {
                            indicator: newdata.scoreSubject,

                            name: {
                                textStyle: {
                                    fontSize: 14
                                }

                            },
                            axisLabel: {
                                textStyle: {
                                    color: "#e00"
                                }
                            },
                            center: ['50%', '45%'],
                            radius: "70%"
                        }
                    ],
                    series: [
                        {
                            type: 'radar',
                            data: [
                                {
                                    value: newdata.series[0],
                                    name: newdata.name[0]
                                }, {
                                    value: newdata.series[1],
                                    name: newdata.name[1],
                                    areaStyle: {
                                        normal: {
                                            opacity: 0
                                        }
                                    }
                                }, {
                                    value: newdata.series[2],
                                    name: newdata.name[2],
                                    areaStyle: {
                                        normal: {
                                            opacity: 0
                                        }
                                    }
                                }

                            ]
                        }
                    ]
                };
                // 生成图表
                $("#chart_gekeqingkuang").height(400);
                $.chart(option, "#chart_gekeqingkuang");

                var BadSubject = list.BadSubject;
                var GoodSubject = list.GoodSubject;
                var badhtml = '',
                    goodhtml = '',
                    $badSubject = $("#j_badSubject"),
                    $goodSubject =  $("#j_goodSubject");

                // 右侧标题
                var descript = '<h3 class="">'+list.ExamContent+'</h3>';

                // 顶部插入标题
                $goodSubject.before(descript);

                // 劣势学科
                if (BadSubject.length) {
                    for (var i = 0; i < BadSubject.length; i++) {
                        badhtml += '<div class="subject-item">' +
                            '<h3 class="text-danger"><b>劣势学科：' + BadSubject[i].SubjectName + '</b></h3>' +
                            '<p>' + BadSubject[i].Content + '</p>' +
                            '</div>'
                    }
                    badhtml += "<div class='more btn btn-second' data-on='1'>查看更多</div>";
                    $badSubject.html(badhtml);
                } else {
                    $badSubject.hide()
                }
                // 优势学科
                if (GoodSubject.length) {
                    for (var i = 0; i < GoodSubject.length; i++) {
                        goodhtml += '<div class="subject-item">' +
                            '<h3 class="text-primary"><b>优势学科：' + GoodSubject[i].SubjectName + '</b></h3>' +
                            '<p>' + GoodSubject[i].Content + '</p>' +
                            '</div>'
                    }
                    goodhtml += "<div class='more btn btn-second' data-on='1'>查看更多</div>";
                    $goodSubject.html(goodhtml);
                } else {
                    $goodSubject.hide()
                }
                $("#j_gekeqingkuang").find(".loading").remove();

                //超过一个显示隐藏
                var subjectMore = function (id) {
                    var subjectItem = id.find(".subject-item"),
                        Itemlen = subjectItem.eq(0).nextAll(".subject-item"),
                        $more = id.find(".more"),
                        itemSum = subjectItem.length;
                    if(itemSum > 1){
                        // subjectItem.(":gt(0)").hide();
                        Itemlen.hide();
                        $more.show();
                        $more.on("click",function(){
                            Itemlen.slideToggle("fast");
                            var $this = $(this);
                            if ($this.data("on") === 1) {
                                $this.html("收起").data("on", 0);
                            }
                            else {
                                $this.html("查看更多").data("on", 1);
                            }
                        });
                    }else{
                        $more.hide()
                    }
                };

                subjectMore($goodSubject);
                subjectMore($badSubject)
            }
            else {
                // 数据为空时
                $("#j_gekeqingkuang").subDataEmpty(0);
            }
        })

    };
});