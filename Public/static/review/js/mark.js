define(function (require) {
    var logic = require("./logic");
    // 拖动组件
    var drag = require("components/dragMove/drag_move");

    // 检查权限
    if (!logic.checkPower()) {
        return;
    }

    //兼容ie8
    if (!JSON.stringify) {
        require.async("lib/JSON-js/json2");
    }
    var UI = require("./layout/markUI");

    // 记录来源 批阅或回评
    var sourceUrl = window.location.hash;

    //已存在数据标记
    var hasTagData = 0;

    // 当前题号
    var getCurrOrder = [];

    var currectJs = {
        init: function () {
            var e = this;
            e.markingUIEvent();//交互
            e.getQuesData();//获取要批阅的试题
            e.reviewPaperEvent();//试题回评
        },

        //交互
        markingUIEvent: function () {

            //收起操作区域
            //试题评阅操作区域适配小屏幕设备
            var $j_tab = $("#j_m-tab");
            $j_tab.on("click", function (e) {
                var tar = $(e.target);
                if (tar.hasClass("tab-itm")) {
                    tar.addClass("current").siblings(".tab-itm").removeClass("current");
                    var fid = tar.attr("data-link");
                    var $formSubmit = $("#j_form-submit");
                    $("[data-id=" + fid + "]").show().siblings(".j_m-tab-fieldset").hide();
                    if (fid == 'fid3') {
                        if (!hasTagData) {
                            currectJs.getReviewPaperList();
                        }
                        $formSubmit.hide();
                    }
                    else {
                        $formSubmit.show();
                    }
                }
            });

            //统计信息收起展开事件
            $(".j_status-info-toggle").on("click", function () {
                var e = $(this),
                    $prev = e.prev("#j_statusInfo");
                $prev.toggleClass("j_statusInfoClose");
                if ($prev.hasClass("j_statusInfoClose")) {
                    e.html('<<');
                }
                else {
                    e.html('>>');
                }
            });
        },

        //获取要批阅的试题
        getQuesData: function () {
            var param = {
                params: ["userTestReview"],
                examID: $.cookie("review_ExamID"),
                subjectID: $.cookie("review_SubjectID"),
                userID: $.cookie("yj_front_UserID")
            };

            //判断批阅来源，提交后需重新配置
            if (sourceUrl === "#from_review") {
                param = $.extend(param, {
                    listID: $.cookie("review_ListID")
                })
            }

            //获取试题数据
            $.handler(param, function (data) {
                var status = data.status;
                if (status === 1) {

                    //记录当前试题id
                    $.cookie("review_ListID", data.data.ListID, {path: "/Review"});
                    //生成图象
                    currectJs.renderMarkingArea(data.data);
                    //生成试题打分区
                    currectJs.renderQuesAttr(data.data);
                    //生成试题总分
                    currectJs.renderTotalScore(data.data);
                    // 生成试题信息
                    currectJs.renderMarkingInfo(data.data);
                    // 绑定事件
                    currectJs.reviewPaperAlertDrag();
                    currectJs.currentQuesMarkingEvent();
                    $(".full-loading").fadeOut(100);
                }
                else {
                    $(".full-loading").addClass("data-empty-1");
                    layer.alert(data.data.toString(), {icon: 0, area: ["300px", "auto"]});
                }
            });
        },

        // 生成试题信息
        renderMarkingInfo: function (data) {
            var state = data;

            //小题
            var subNum = state.subNum || 1;
            var subNumTpl = (subNum > 1) ? ('(' + state.subNum + '小题)') : '';

            /*!*
             * pc
             * */
            var pcTemp = '<span class="fl ml10">已阅试题/考生人数：<span class="text-danger">' +
                state.ReviewNum + '</span>/' +
                state.StudentNum + '</span><span class="fl ml20">已阅试题平均分：<span class="text-danger">' +
                state.AvgScore + '</span>分</span>';
            $("#j_statusInfo").html(pcTemp);

            //处理题号
            var CurrOrder = $.unique(getCurrOrder).join("、");

            $("[data-view=quesNum]").html('第 ' + CurrOrder + ' 题 ' + subNumTpl);

            /*!*
             * phone
             * */
            var mobileTemp = '第 ' + CurrOrder + ' 题 ' + subNumTpl +
                '<small class="text-muted fr">已阅试题：<span class="text-danger">' +
                state.ReviewNum + '</span><span class="grayc"> / </span><span class="text-primary">' +
                state.StudentNum + '</span>&nbsp;&nbsp;平均分：<span class="text-danger">' +
                state.AvgScore + '</span></small>';
            $('[data-view="markingState"]').html(mobileTemp);
        },

        //试题总分
        renderTotalScore: function (data) {
            // 计算总分
            var totalScore = logic.countScore(data.TestList),
                totalScoreTpl = '';
            totalScoreTpl += '<span class="dib mr5">总分</span>\
                    <input class="w70 tc disabled" style="opacity:0.8" type="text" role="currTestIpt" id="iptTotalScore" data-full="' + totalScore + '" value=""/>\
                    <span class="dib ml5"><=' + totalScore + '</span>';
            $('[ data-view="totalScoreIpt"]').html(totalScoreTpl);
        },

        //试题图象
        renderMarkingArea: function (data) {
            var quesTitle = data.ExamName,
                Img = new Image();
            Img.src = data.StudentImg;
            $(Img).attr("id", "handleImg").css("display", "none").addClass("resp-img");
            $("#j_contentTitle").html(quesTitle + $.getSubjectInfo());
            $("#j_quesImg").html(Img);
            // pc端初始化图象
            UI.ui.correctImgPC(function () {
                $.imgZoom("#j_quesImg");
            });
            // 移动端初始化图象
            UI.ui.correctImgMobile();
        },

        //试题打分区
        renderQuesAttr: function (data) {
            var TestList = data.TestList,
                TestListLen = TestList.length,
                quesAttr = '';
            for (var i = 0; i < TestListLen; i++) {
                var TestListItem = TestList[i],
                    allScore = currectJs.setMayScore(TestListItem).allScore,
                    stepScore = currectJs.setMayScore(TestListItem).stepScore;
                getCurrOrder.push(TestListItem.OrderID.toString());

                console.log(TestListItem);

                quesAttr += '<li class="rvt-item">\
                    <span class="dib tc w50 mr5">' + TestListItem.OrderID + '. ' +
                    logic.showTestSubOrder(TestListItem.StepNum) + '</span>\
                    <input class="w70" required type="number" min="0" max="' + TestListItem.Score + '"' +
                    ' title="可选分值：' + allScore.join(", ") + '"' +
                    ' data-may-score="' + allScore.join(",") + '"' +
                    ' step="'+stepScore+'" data-orderid=' + TestListItem.OrderID +
                    ' data-stepnum=' + TestListItem.StepNum +
                    ' role="currTestIpt" data-role="subQues" data-full="' + (TestListItem.Score - 0) + '"/>\
                    <span class="dib w50 tl ml5"><=' + (TestListItem.Score - 0) + '</span>\
                    </li>';
            }
            $("#j_ques-list").html(quesAttr);
        },

        // 配置可选分值
        setMayScore: function (listItem) {
            var item = listItem,
                scoreData ={
                    allScore:[0],
                    stepScore:0.5
                },
                mayScore = item.MayScore,
                itemScore = parseFloat(item.Score);

            // MayScore可用
            if (typeof mayScore === "string" && mayScore.length > 0) {

                // 可能分值为枚举
                if (mayScore.indexOf(",") !== -1) {
                    scoreData.allScore = mayScore.split(",")
                }

                // 可能分值为0 或 步骤分
                else {
                    // 分值为0
                    if (mayScore == "0") {
                        scoreData.allScore.push(itemScore)
                    }
                    // 分值!0
                    else {

                        // 设置为步骤分
                        scoreData.stepScore = mayScore;

                        // 计算allScore
                        var scoreLen = parseInt(parseFloat(itemScore) / mayScore);
                        for (var i = 0; i < scoreLen; i++) {
                            scoreData.allScore.push(mayScore * (i + 1))
                        }

                        // 可能分值不等于满分
                        // if (mayScore != itemScore) {
                        //     scoreData.allScore.push(itemScore)
                        // }
                    }
                }
            } else {
                return false;
            }
            // allScore排重
            $.unique(scoreData.allScore);

            return scoreData;
        },

        //标志试卷
        checkScore: function (ipt) {
            var isPass = true;

            //需要统计分数的小题
            var $this = ipt,
                fullVal = parseFloat($this.data("full")),
                thisVal = $this.val(),
                mayScore = $this.data("may-score").split(",");

            //分值设定最高分
            if (thisVal != parseFloat(thisVal)) {
                // $this.val(parseFloat(thisVal));
                layer.msg('请输入有效分数！', {time: 1000});
                $this.addClass("num-error");
                return isPass = false;
            }
            //分值设定最高分
            if (thisVal > fullVal) {
                // $this.val(fullVal);
                layer.msg('最高分为 ' + fullVal + ' 分！', {time: 1000});
                $this.addClass("num-error");
                return isPass = false;
            }
            if (thisVal < 0) {
                // $this.val(0);
                $this.addClass("num-error");
                layer.msg('不能小于 0 分！', {time: 1000});
                return isPass = false;
            }
            if ($.inArray(thisVal, mayScore) === -1) {
                // $this.val(mayScore[0]);
                layer.msg('分值只能为：' + mayScore.join(", "), {time: 1000});
                $this.addClass("num-error");
                return isPass = false;
            }
            $this.removeClass("num-error");
            return isPass;
        },

        // 提交批阅回调函数
        submitCallback: function (data) {
            var status = data.status;
            layer.msg(data.data);
            if (status === 1) {

                // 来自回评
                if (sourceUrl === "#from_review") {
                    layer.open({
                        type: 1,
                        title: false,
                        closeBtn: false,
                        icon: 1,
                        area: ["280px", "auto"],
                        btn: ["继续批阅", "返回回评"],
                        content: "<div class='pt30 pb20 tc' style='border-bottom:1px solid #ececec'>试题已回评！<br>是否继续进行批阅任务？</div>",
                        yes: function () {
                            location.href = "/Review/Index/mark.html";
                        },
                        btn2: function () {
                            location.href = "/Review/Review/review.html";
                        },
                        success: function (layero) {
                            var btn = layero.find('.layui-layer-btn');
                            btn.css('text-align', 'center');
                        }
                    });
                    return;
                }
                location.reload();
            }
        },

        //试题打分
        currentQuesMarkingEvent: function () {
            $("#j_form").on("input", "[role='currTestIpt']", function () {

                //计算分值
                var $ipt = $('[data-role="subQues"]'),
                    scoreArr = [],
                    totalScore = 0,
                    flag = 1;


                // 验证
                if(!currectJs.checkScore($(this))){
                    flag = 0;
                }

                //计算前验证
                for (var j = 0; j < $ipt.length; j++) {
                    var val = $ipt[j].value;
                    if (!val || $ipt.hasClass(".num-error")) {
                        flag = 0;
                    }
                    scoreArr[j] = val || 0;
                }

                //计算分数
                for (var i = 0; i < scoreArr.length; i++) {
                    totalScore += (scoreArr[i] - 0);
                }

                // 显示总分
                $("#iptTotalScore").val(totalScore);
                var $submitScore = $("#submit-btn");

                // 通过验证
                if (flag) {
                    $submitScore.removeAttr("disabled");
                }
                else {
                    $submitScore.attr("disabled", "disabled");
                }
            });

            //评阅提交-参数
            var submitParam = {
                params: ["submitReviewResult"],
                userID: $.cookie("yj_front_UserID"),
                listID: $.cookie("review_ListID"),
                examID: $.cookie("review_ExamID"),
                subjectID: $.cookie("review_SubjectID"),
                status: 0 //默认0正常 1零分 2满分 3异常
            };

            //标志试卷
            $("#j_paper-mark-opt").on("click", "a", function (e) {
                e.preventDefault();
                var $this = $(this),
                    tagValue = $this.data("tag"),
                    confirmMsg = '标记这道题？',
                    //标记status
                    paperTag = '';
                switch (tagValue) {
                    case 1:
                        confirmMsg = '标记为零分？';
                        break;
                    case 2:
                        confirmMsg = '标记为满分？';
                        break;
                    case 3:
                        confirmMsg = '标记为异常？';
                        break;
                }
                layer.confirm(confirmMsg, {
                    icon: 0,
                    yes: function () {
                        //提交参数
                        submitParam.status = tagValue;
                        $.handler(submitParam, function (data) {
                            currectJs.submitCallback(data);
                        });
                    },
                    cancel: function () {
                        paperTag = '';
                    }
                })
            });

            //提交
            $("#submit-btn").on("click", function (e) {
                e.preventDefault();

                // 复查分值
                var pass = true;
                $('[data-role="subQues"]').each(function () {
                    if(!currectJs.checkScore($(this))){
                        pass = false;
                    }
                });

                //复查通过
                if(pass){
                    //获取试题已评分数
                    //testList:{"试题序号id":{"步骤序号":1,"步骤序号":1},{"试题序号id":"步骤序号":1,"步骤序号":1}}
                    var testList = {};
                    var $quesList = $("#j_ques-list");
                    var $orderid = $quesList.find("input[data-orderid]");

                    // 获取批阅分值
                    $.each($orderid, function (i, value) {
                        var $this = $(this);
                        var order = $this.data("orderid");
                        testList[order] = $.extend({}, testList[order]);
                        var stepnum = $this.data("stepnum");
                        testList[order][stepnum] = $this.val();
                    });

                    // 参数转字符串
                    submitParam.testList = JSON.stringify(testList);
                    $.handler(submitParam, function (data) {
                        currectJs.submitCallback(data);
                    })
                }
            });

            // 回车提交
            $(document).on("keydown", function (e) {
                if (e.keyCode === 13) {
                    $("#submit-btn").click();
                }
            })
        },

        //复查分数
        // recheckScore: function () {
        //     var pass = 0;
        //     $('[data-role="subQues"]').each(function () {
        //         if (currectJs.checkScore($(this))) {
        //             pass = 1;
        //         }else{
        //             pass = 0;
        //         }
        //     });
        //     return pass;
        // },

        //获取试题回评数据
        getReviewPaperList: function () {
            var param = {
                params: ["testRecheckList"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("review_ExamID"),
                subjectID: $.cookie("review_SubjectID"),
                page: 1
            };
            $.handler(param, function (data) {

                //已返回数据
                hasTagData = 1;
                var listData = data.data,
                    status = data.status,
                    $recheckList = $("#j_res-list");

                if (status === 1) {

                    //回评列表
                    $recheckList.html(currectJs.renderMarkedList(listData));
                    $recheckList.prev("h3").find("small").html("（最近" + listData.TestNum + "份试卷）");
                }
                else {
                    $recheckList.html("<p class='tc p20 text-muted bg-white'>" + listData + "</p>");
                }
            });
        },

        //生成回评列表html
        renderMarkedList: function (data) {
            var TestList = data.TestList,
                TestListLLen = TestList.length,
                rTemp = '';
            rTemp += '<ul class="clearfix">\
                <li class="item legend">\
                <div class="order-num">序号</div>\
                <div class="order-score">分数</div>\
                </li>';
            for (var i = 0; i < TestListLLen; i++) {
                var TestListItem = TestList[i];
                rTemp += '<li class="item rl-itm"><a href="./mark.html?review_ListID=' +
                    TestListItem.ListID + '#from_review">\
                    <div class="order-num">' + (i + 1) + '</div>\
                    <div class="order-score">' + parseFloat(TestListItem.Score) + ' 分</div>\
                    </a></li>';
            }
            rTemp += '<li class="item rl-itm" id="j_go-review" title="转到试题回评">\
                <a class="" href="/Review/Review/review.html"><i class="iconfont">&#xe63d;</i></a>\
                </li></ul>';
            return rTemp;
        },

        //试题回评
        reviewPaperEvent: function () {

            //PC试题回评
            $(".j_closeLayer,#j_review-paper").on("click", function () {
                //没有获取过数据时
                if (!hasTagData) {
                    currectJs.getReviewPaperList();
                }
                $("#reviewPaperLayer").toggle();
            });
        },
        // 回评拖动
        reviewPaperAlertDrag: function () {
            var $thisDrag = $("#reviewPaperLayer");
            var $dragTitle = $thisDrag.find("h3");
            $dragTitle.css({"cursor": "move"});
            $thisDrag.addClass("un-select");
            var move = drag.drag;
            new move($dragTitle[0], $thisDrag[0]);
        }
    };
    currectJs.init();
});

