define(function (require) {
    // 拖动组件
    var drag = require("components/dragMove/drag_move");
    var logic = require("./logic");
    // 检查权限
    if (!logic.checkPower()) {
        return;
    }

    // 批阅&自检页面布局
    var UI = require("./layout/markUI");
    require("laydate");

    // 自检列表参数
    var recordListParam;

    // 记录试题序号
    var testOrderSave = 0;
    reviewJs = {
        init: function () {
            var e = this;
            e.getRecordList();//获取试题自检列表
            e.searchQues();//检索试题
        },

        //获取试题自检列表
        getRecordList: function () {
            recordListParam = {
                params: ["testRecheckList"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("review_ExamID"),
                subjectID: $.cookie("review_SubjectID"),
                page: 1
            };
            $.handler(recordListParam, function (data) {
                var status = data.status;
                var info = data.data;

                var $contentTitle = $("#j_contentTitle");

                //获取试题自检列表成功
                if (status === 1) {
                    //1.考试标题
                    $contentTitle.html(info.ExamName + $.getSubjectInfo());
                    //2.生成列表html
                    var listData = data.data;
                    reviewJs.recordListInit(listData);

                    $(".full-loading").fadeOut(100);
                }
                else {
                    $(".full-loading").addClass("data-empty-1");
                }
            });
        },

        // 生成自检列表
        recordListInit: function (data) {

            // 记录
            $("#j_testNum").html("共" + data.TestNum + "条记录");

            //列表
            var $markedList = $("#j_marked-list");
            $markedList.html(reviewJs.renderRecordTpl(data));

            //为每一项绑定查询事件
            reviewJs.testItemBindEvent();

            //加载更多
            var $loadMore = $("#j_loadmore"),
                pageNum = data.PageNum;
            $loadMore.on("click", function () {
                var e = $(this);
                e.children('a').html("加载中...");
                recordListParam.page += 1;
                $.handler(recordListParam, function (data) {
                    e.before(reviewJs.ListLoop(data.data));
                    reviewJs.checkPageNum(pageNum, recordListParam.page);
                });
            });

            reviewJs.checkPageNum(pageNum, recordListParam.page);
        },

        //是否需要加载更多
        checkPageNum: function (pageNum, page) {
            var $loadMore = $("#j_loadmore");

            // 服务器页码 大于 当前页码
            if (pageNum > recordListParam.page) {
                $loadMore.children('a').html("加载更多");
            }
            else {
                $loadMore.unbind("click");
                $loadMore.children('a').removeClass("text-primary btn btn-block").addClass("text-muted cur-def").html("加载完毕");
            }
        },
        //处理自检列表循环
        ListLoop: function (data) {
            var list = data.TestList;
            var len = list.length;
            var liTemp = '';
            for (var i = 0; i < len; i++) {
                testOrderSave++;
                var listItem = list[i];
                liTemp += '<li class="item rl-itm" listID="' + listItem.ListID + '">\
                    <div class="order-num">' + testOrderSave + '</div>\
                    <div class="order-score">' + parseFloat(listItem.Score) + ' 分</div></li>';
            }
            return liTemp;
        },
        //生成自检列表
        renderRecordTpl: function (data) {
            //记录已加载数量
            var TestNumCount = data.TestNum;
            var renderedItemCount = 0;
            //模版
            var rTemp = '';
            rTemp += '<ul class="clearfix" id="j_loadedQuesList">\
                <li class="item legend">\
                <div class="order-num">序号</div>\
                <div class="order-score">分数</div>\
                </li>';
            rTemp += reviewJs.ListLoop(data);

            if (TestNumCount == renderedItemCount) {
            }
            else if (TestNumCount > renderedItemCount) {
                rTemp += '<li class="load-itm pct100 tc mt10 mb10" id="j_loadmore" data-page="1">' +
                    '<a class="text-primary btn btn-block" href="javascript:">加载更多</a></li></ul>';
            }
            return rTemp;
        },

        //查看试题得分详情事件
        testItemBindEvent: function () {
            var quesList = $("#j_marked-list");

            // 初始化事件绑定
            quesList.unbind("click.quesList");

            // 试题得分详情显示次数
            var _tipsNum = 0;
            quesList.on("click.quesList", "li.rl-itm", function () {
                var e = $(this);
                var id = e.attr("listID");

                //记录当前ListID
                $.cookie("review_ListID", id, {"path": "/Review"});
                e.addClass("active").siblings("li").removeClass("active");

                //获取数据
                reviewJs.getQuesDetailsTips(id, _tipsNum);

                // 图像绑定缩放事件

                _tipsNum++;
            });

            // 默认显示第一道题的的分析案情
            quesList.find("li.rl-itm:first").click().addClass("active");

            //关闭得分详情
            $(document).on("click", "#j_sd-close", function () {
                $(".j_tips-score-details").hide();
            });
        },
        //获取试题得分详情
        getQuesDetailsTips: function (listID, tipNum) {
            $testDetailsTips = $("#ques-score-details");
            //单条已批阅试题自检参数
            var param = {
                params: ["oneTestRecheck"],
                subjectID: $.cookie("review_SubjectID"),
                examID: $.cookie("review_ExamID"),
                userID: $.cookie("yj_front_UserID"),
                listID: listID
            };
            // 图像加载
            var viewImgArea = $("#j_view-ques-img");
            viewImgArea.html('<p class="loading"></p>');
            $.handler(param, function (data) {
                var status = data.status,
                    tipsHtml = $testDetailsTips.find(".sd-content");
                if (status === 1) {

                    var info = data.data;
                    //生成图象
                    var Img = new Image();
                    Img.src = info.AnswerImg;
                    $(Img).attr("id", "handleImg").css({"display": "none","cursor":"move"}).addClass("resp-img");
                    viewImgArea.html(Img);

                    //生成得分详情
                    $testDetailsTips.fadeIn(100);
                    tipsHtml.html(reviewJs.renderScoreDetail(info));

                    // pc端初始化图象
                    UI.ui.correctImgPC(function(){
                        $.imgZoom("#j_view-ques-img");
                    });
                    // 移动端初始化图象
                    UI.ui.correctImgMobile();
                    reviewJs.reviewPaperAlertDrag();

                }
                else {
                    $testDetailsTips.fadeOut(100);
                    viewImgArea.html("<h1 class='f20 tc text-muted' style='line-height:" + viewImgArea.height() + "px'>暂无图象</h1>");
                }
            });
        },
        // 得分详情
        renderScoreDetail: function (data) {
            var data = data;
            var temp = '';
            var TestScore = data.ScoreList;
            temp += '<h4>得分详情<small>（共 ' + logic.countScore(TestScore) + ' 分）</small>\
            <i class="iconfont btn btn-close" id="j_sd-close">&#xe645;</i></h4>\
                    <ul class="sd-scroll">';

            var orderIDArray = [], CurrOrderID;
            //处理orderID，生成试题详情试题序号
            for (var i = 0; i < TestScore.length; i++) {
                var TestScoreItem = TestScore[i];
                var score = parseFloat(TestScoreItem.Score);

                //记录已生成的试题序号的orderID
                orderIDArray.push(TestScoreItem.OrderID);
                CurrOrderID = TestScoreItem.OrderID;

                //没有小题
                if (TestScoreItem.StepNum === 0) {
                    temp += '<li class="sd-itm">' + TestScoreItem.OrderID + ' 题：' +
                        '<span class="text-danger"> ' + score + ' </span>分</li>';
                }
                //有小题
                else {
                    temp += '<li class="sd-itm">' + TestScoreItem.OrderID + logic.showTestSubOrder(TestScoreItem.StepNum) + ' 题：<span class="text-danger"> ' +
                        score + ' </span>分</li>';
                }
            }
            temp += '</ul><a class="btn btn-primary btn-block j_review-btn" href="/Review/Index/mark.html#from_review">重新阅卷</a>';
            return temp;
        },
        // 得分详情拖动
        reviewPaperAlertDrag:function () {
            var $thisDrag = $("#ques-score-details");
            var $dragTitle = $thisDrag.find("h4");
            $dragTitle.css({"cursor":"move"});
            $thisDrag.addClass("un-select");
            var move = drag.drag;
            new move($dragTitle[0],$thisDrag[0]);
        },
        //查找试题
        searchQues: function () {

            //试题列表搜索事件
            //弹出框ID
            var layerId1;

            // 搜索模版
            var searchTpl = "<div class=\"j_search form\">\r\n    <!-- <div class=\"search-tab tab-nav tc radio-beautify\">\r\n        <label class=\"nav-itm on\">\r\n            <input type=\"radio\" name=\"j_search-type\">分值1</label>\r\n        <label class=\"nav-itm\">\r\n            <input type=\"radio\" name=\"j_search-type\">标志</label>\r\n        <label class=\"nav-itm\">\r\n            <input type=\"radio\" name=\"j_search-type\">序号</label>\r\n    </div> -->\r\n    <div class=\"control-group pb10 pt5\">\r\n        <div class=\"item-opt clearfix\">\r\n            <label class=\"fl db p5\" id=\"search_checkAll\"><input class=\"v-2\" checked=\"checked\" type=\"checkbox\"/><span class=\"pl5\">全部</span></label>\r\n        </div>\r\n        <div class=\"item-opt\">\r\n            <div class=\"clearfix\">\r\n                <label class=\"fl db p5\" id=\"search_byScore\"><input class=\"v-2\" checked=\"checked\" type=\"checkbox\"/><span class=\"pl5\">分值查询</span></label>\r\n                <select id=\"j_selectQuesOrder\" name=\"orderID\" class=\"fr db w220\">\r\n                    <option>...</option>\r\n                </select>\r\n            </div>\r\n            <div class=\"score-site tr pt10\">\r\n                <input class=\"w120\" type=\"number\" name=\"scoreStart\" id=\"scoreStart\" placeholder=\"开始分数\" value=\"\">\r\n                -\r\n                <input class=\"w120\" type=\"number\" name=\"scoreEnd\" id=\"scoreEnd\" placeholder=\"结束分数\" value=\"\">\r\n            </div>\r\n        </div>\r\n        <div class=\"item-opt clearfix\">\r\n            <label class=\"fl p5\" id=\"search_byOrder\"><input class=\"v-2\" checked=\"checked\" type=\"checkbox\"/><span class=\"pl5\">序号查询</span></label>\r\n            <span class=\"fr\">\r\n                <input class=\"w120\" type=\"number\" name=\"limitStart\" id=\"limitStart\" placeholder=\"开始序号\" value=\"\">\r\n                -\r\n                <input class=\"w120\" type=\"number\" name=\"limitEnd\" id=\"limitEnd\" placeholder=\"结束序号\" value=\"\">\r\n            </span>\r\n        </div>\r\n        <div class=\"item-opt clearfix\">\r\n            <label class=\"fl db p5\" id=\"search_byTag\"><input class=\"v-2\" checked=\"checked\" type=\"checkbox\"/><span class=\"pl5\">标记查询</span></label>\r\n            <span class=\"fr db pr30\">\r\n                <label class=\"dib ml10\"><input class=\"v-2\" type=\"radio\" checked=\"checked\" name=\"status\" value=\"2\"><span class=\"pl5\">满分</span></label>\r\n            <label class=\"dib ml10\"><input class=\"v-2\" type=\"radio\" name=\"status\" value=\"1\"><span class=\"pl5\">零分</span></label>\r\n            <label class=\"dib ml10\"><input class=\"v-2\" type=\"radio\" name=\"status\" value=\"3\"><span class=\"pl5\">异常</span></label>\r\n            </span>\r\n        </div>\r\n        <div class=\"item-opt clearfix\">\r\n            <label class=\"fl db p5\" id=\"search_byTime\"><input class=\"v-2\" checked=\"checked\" type=\"checkbox\"/><span class=\"pl5\">时间查询</span></label>\r\n            <span class=\"fr db\">\r\n                <input class=\"w120\" type=\"text\" name=\"addTimeStart\" id=\"addTimeStart\" placeholder=\"开始时间\" value=\"\">\r\n            -\r\n            <input class=\"w120\" type=\"text\" name=\"addTimeEnd\" id=\"addTimeEnd\" placeholder=\"结束时间\" value=\"\">\r\n            </span>\r\n        </div>\r\n    </div>\r\n    <div class=\"control-group tc\">\r\n        <a class=\"btn btn-primary btn-lg-w\" href=\"javascript:;\" id=\"layerSearchQues\">确定</a>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n<!--$orderID\t试题序号id\r\nint\t$stepNum\t小题序号\r\nint\t$scoreStart\t试题得分区间开始值\r\nint\t$scoreEnd\t试题得分区间结束值\r\nint\t$limitStart\t查询序号开始值\r\nint\t$limitEnd\t查询序号结束值\r\nint\t$addTimeStart\t试题批阅时间区间开始值\r\nint\t$addTimeEnd\t试题批阅时间区间结束值\r\nint\t$status\t试题状态 1零分 2满分 3异常\r\nint\t$page-->";

            // 显示搜索框
            $("#j_search-btn").on("click", function (e) {
                e.stopPropagation();

                var layArea = ["460px", "auto"];
                var layOffset = "auto";

                // 移动端适配
                if (UI.ui.detect() < 500) {
                    layArea = ["320px", "auto"];
                    layOffset = ["0"];
                }
                layerId1 = layer.open({
                    type: 1,
                    title: '查找试题',
                    area: layArea,
                    offset: layOffset,
                    content: searchTpl,
                    success: function () {
                        reviewJs.getSelectOptionsHtml();
                        setTimeout(function () {
                            var start = {
                                elem: "#addTimeStart",
                                event: "focus",
                                format: 'YYYY-MM-DD',
                                max: '2099-06-16 23:59:59', //最大日期
                                istoday: true,
                                festival: true,
                                choose: function (datas) {
                                    end.min = datas; //开始日选好后，重置结束日的最小日期
                                    end.start = datas; //将结束日的初始值设定为开始日
                                }
                            };
                            var end = {
                                elem: "#addTimeEnd",
                                format: 'YYYY-MM-DD',
                                event: "focus",
                                max: '2099-06-16 23:59:59',
                                istoday: true,
                                festival: true,
                                choose: function (datas) {
                                    start.max = datas; //结束日选好后，重置开始日的最大日期
                                }
                            };
                            laydate(start);
                            laydate(end);
                        }, 100)
                    }
                });
            });

            //搜索项全选反选
            $(document).on("click", "#search_checkAll", function (e) {
                var $this = $(this).find("input:checkbox");
                var _checked = $this.prop("checked");
                var _search_by = $("[id^='search_by']");
                var $Ipt = _search_by.parents(".item-opt").find("select,input").not("[id^='search_by'] input");

                // 勾选项
                if (_checked === true) {
                    _search_by.each(function () {
                        $(this).find("input:checkbox").prop({"checked": true})
                    })
                }
                else {
                    _search_by.each(function () {
                        $(this).find("input:checkbox").prop({"checked": false})
                    })
                }
                reviewJs.resetSearchItem(_checked, $Ipt)
            });

            //搜索项自定义
            $(document).on("click", "[id^=search_by]", function () {
                var $this = $(this).find("input:checkbox");
                var _checked = $this.prop("checked");
                var $ctrlIpt = $this.parents(".item-opt").find("select,input").not($this);
                var _search_by = $("[id^='search_by']");
                var _checkItemLen = _search_by.length;
                var _checkedLen = _search_by.find("input:checkbox").filter(":checked").length;
                var $checkedAll = $("#search_checkAll");

                // 全部选中
                if (_checkItemLen == _checkedLen) {
                    $checkedAll.find("input:checkbox").prop({"checked": true})
                }
                else {
                    $checkedAll.find("input:checkbox").prop({"checked": false})
                }
                reviewJs.resetSearchItem(_checked, $ctrlIpt);
            });
            reviewJs.getSelectOptionsHtml();

            //弹出框搜索提交事件
            $(document).on("click", "#layerSearchQues", function () {

                //提交请求获取搜索数据
                var param = {
                    params: ["customTestRecheckList"],
                    userID: $.cookie("yj_front_UserID"),
                    examID: $.cookie("review_ExamID"),
                    subjectID: $.cookie("review_SubjectID")
                };
                var params = $.extend(param, reviewJs.getFormParams());
                console.log(params);
                $.handler(params, function (data) {
                    $("#j_testNum").html("共?条记录");
                    var status = data.status;

                    // 初始化试题显示区域
                    $("#j_marked-list,#j_view-ques-img").empty();
                    $("#ques-score-details").find(".sd-content").empty();
                    var layeridLoad = layer.msg("努力加载中", {shade: 0.2});

                    if (status === 1) {
                        layer.close(layerId1);

                        //2.生成列表html
                        var listData = data.data;
                        layer.close(layeridLoad);
                        reviewJs.recordListInit(listData);
                    }
                    else {
                        layer.msg(data.data.toString())
                    }
                });
            });
        },
        //禁用formItem
        resetSearchItem: function (check, ipt) {
            if (check) {
                ipt.removeClass("disabled").prop({"disabled": false})
            }
            else {
                ipt.addClass("disabled").prop({"disabled": true});
            }
        },
        //获取可筛选试题题号选项
        getSelectOptionsHtml: function () {
            var paramSearch = {
                params: ["clickSearch"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("review_ExamID"),
                subjectID: $.cookie("review_SubjectID")
            };
            $.handler(paramSearch, function (data) {
                var testList = data.data;
                if ($.isArray(testList)) {
                    reviewJs.outputSelectOption(testList)
                }
            })
        },

        // 生成试题序号列表
        outputSelectOption: function (testList) {
            var optHtml = '';
            $.each(testList, function (i) {
                var stepNum = testList[i].StepNum - 0,//-0转为数字
                    orderID = testList[i].OrderID;
                // 有小题
                if (stepNum > 0) {
                    optHtml += '<option value="' + orderID + '" data-subid=' + stepNum + '>第 ' + orderID + '（' + stepNum + '）题</option>';
                }
                // 没有小题
                if (stepNum === 0) {
                    optHtml += '<option value="' + orderID + '">第 ' + orderID + ' 题</option>';
                }
            });
            $("#j_selectQuesOrder").html(optHtml);
        },

        //获取表单参数
        getFormParams: function () {
            var $form = $(".j_search").find("[name]");
            // 缓存请求参数
            var formParams = {};

            // 获取参数
            var initParams = $form.serializeArray();
            $.each(initParams,function (i,n) {
                formParams[n.name] = n.value;
            });
            // 获取小题号
            var stepNum = {"stepNum": $("#j_selectQuesOrder").find("option:selected").data("subid")};

            // 开始时间
            reviewJs.formatTime(formParams, "addTimeStart");

            // 结束时间
            reviewJs.formatTime(formParams, "addTimeEnd");
            return $.extend(formParams, stepNum);
        },

        //时间格式化
        formatTime: function (obj, key) {
            var times = obj[key];
            if (times) {
                obj[key] = new Date(times).getTime() / 1000
            }
        }
    };
    reviewJs.init();
});


