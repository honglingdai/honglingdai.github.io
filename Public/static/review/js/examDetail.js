define(function (require) {
    var logic = require("./logic");

    // 检查权限
    if(!logic.checkPower()){
        return;
    }
    var template = require("template");
    //考生情况统计
    var examDetailJs = {
        init: function () {
            var e = this;
            e.loadDetail();//加载考试详情
            e.changeSubjectEvent();//切换学科
        },

        //加载考试详情
        loadDetail: function () {
            var param = {
                params: ["reviewContent"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("review_ExamID"),
                subjectID: $.cookie("review_SubjectID")
            };
            $.handler(param, function (data) {
                var resData = data.data;
                var state = data.status;
                var $examDetailContent = $("#examDetailContent");
                if(state === 1){
                    $("#j_examTitle").html(resData.ExamName);
                    $examDetailContent.html(template('examDetailTmpl', data));

                    // 设置按钮状态
                    <!--考试/学科批阅状态值为0或2表示进行中 1未开始 3已结束-->
                    var btnUrl = "/Review/Index/mark.html",
                        $markBtn = $(".goMarking");
                    var ifSwitch = resData.IfSwitch;
                    if (ifSwitch == 0 || ifSwitch == 2){
                        $markBtn.removeClass("btn-disabled").attr({"href":btnUrl});
                    }
                    else {
                        $markBtn.addClass("btn-disabled").removeAttr("href");
                        if(ifSwitch == 1){
                            $markBtn.html("未开始");
                        }
                        if(ifSwitch == 3){
                            $markBtn.html("已结束");
                        }
                    }

                    // 设置学科
                    $examDetailContent.find(".select-subject").val(resData.SubjectID);

                    /**预处理考生情况统计图表
                     * @category ['异常卷', '空白卷', '缺考', '实际人数', '考生人数']
                     * @series [1, 2, 2, 490, 500]
                     * */
                    var chartData = {};
                    chartData.category = ['异常卷', '空白卷', '缺考', '实际人数', '考生人数'];
                    chartData.series = [
                        resData.ProblemStudentNum,
                        resData.EmptyStudentNum,
                        resData.MissStudentNum,
                        resData.TrueStudentNum,
                        resData.StudentNum];

                    examDetailJs.echartStuInfo(chartData);

                    // 阅卷情况统计
                    var countData = {
                        scannedNum: resData.ReviewStudentNum,
                        markedNum: resData.ReviewNum,
                        StudentNum: resData.StudentNum
                    };
                    examDetailJs.examProgressInfo(countData);

                    $(".full-loading").fadeOut(100);
                }else{
                    $(".full-loading").addClass("data-empty-1");
                }
            });
        },

        //切换学科
        changeSubjectEvent:function(){
            $(document).on("change", ".select-subject", function () {
                var $this = $(this);
                var subject_id = $this.find("option:checked").val();
                location.href = "/Review/Index/examDetail.html?review_ExamID="+$.cookie("review_ExamID")+"&review_SubjectID="+subject_id;
            })
        },

        //生成考生情况统计图表
        echartStuInfo: function (data) {
            var option = {
                title: {
                    show: false,
                    text: '考生情况统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
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
                        type: 'category',
                        fontSize: '10px',
                        data: data.category,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                xAxis: [
                    {
                        name: '人数',
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '人数',
                        type: 'bar',
                        barWidth: '50%',
                        data: data.series
                    }
                ]
            };
            $.chart(option, "#echartStuInfo");
        },

        //生成阅卷情况统计图表
        examProgressInfo: function (data) {
            var res = data,
                $markedBar = $("#markedBar"),
                $scannedBar = $("#scannedBar");

            // 计算宽度比例
            var markedRatio = res.markedNum / res.StudentNum,
                scannedRatio = res.scannedNum / res.StudentNum;
            $markedBar.css({
                width: markedRatio * 100 + '%'
            });
            $scannedBar.css({
                width: scannedRatio * 100 + '%'
            });
            //考试人数
            $("#stuNum").text('考生人数：' + res.StudentNum + '人');
            $markedBar.find(".text-mark").html('已评阅试卷：' + res.markedNum).parent().fadeIn();
            $scannedBar.find(".text-scan").html('已扫描试卷：' + res.scannedNum).parent().fadeIn();
        }
    };
    examDetailJs.init();
});