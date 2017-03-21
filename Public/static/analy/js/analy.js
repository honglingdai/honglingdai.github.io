define(function (require, exports) {
    require("jquery");

    // 导出Excel插件
    require("components/jquery-table2excel/dist/jquery.table2excel");
    require("./getData");
    var m1 = require("./modules/alert-heightpaper");

    // 全局角色信息
    window.role = $.getRoleID();

    // 创建表格
    exports.createTable = function (json) {
        var thead = json.thead;
        var tbody = json.tbody;
        var table = "";
        if (thead) {
            table += "<thead>";
            for (var i = 0; i < thead.length; i++) {
                table += "<tr>";
                for (var j = 0; j < thead[i].length; j++) {
                    var item1 = thead[i][j];
                    table += '<th class="fw6"'
                        + (item1.colspan ? 'colspan="' + item1.colspan + '"' : ' ')
                        + (item1.rowspan ? 'rowspan="' + item1.rowspan + '"' : ' ')
                        + '">' + item1.cont + '</th>';
                }
                table += "</tr>";
            }
            table += "</thead>";
        }
        if (tbody) {
            table += "<tbody>";
            for (var l = 0; l < tbody.length; l++) {
                table += "<tr>";
                for (var m = 0; m < tbody[l].length; m++) {
                    var item2 = tbody[l][m];
                    table += '<td ' + (m === 0 ? 'class="fw6"' : ' ')
                        + (item2.colspan ? 'colspan="' + item2.colspan + '"' : ' ')
                        + (item2.rowspan ? 'rowspan="' + item2.rowspan + '"' : ' ')
                        + '">' + item2.cont + '</td>';
                }
                table += "</tr>";
            }
            table += "</tbody>";
        }
        return table;
    };
    //默认显示的行数
    exports.isShowMore = function (table, trLength) {
        var $tb = table;

        //默认显示表格行数
        var defShowRowsItem = trLength || 5;
        var $tr = $tb.find("tbody tr");
        var trLen = $tr.length;
        var $trNext = $tr.eq(defShowRowsItem - 1).nextAll("tr");

        //超出行数的表格默认不显示
        if (trLen > defShowRowsItem) {

            var trShowMsg = "收起内容";
            var trHideMsg = "显示全部内容";
            $trNext.hide();

            // 移除后再添加
            $tb.next(".show-all-info").empty().remove();
            $tb.after('<a class="btn btn-link show-all-info mt15" data-on="1">' + trHideMsg + '</a>');

            //显示更多表格数据

            var $showAllInfo = $tb.next(".show-all-info");
            $showAllInfo.on("click", function () {

                // 定位到当前表格
                var tableTop = $("#" + $tb.attr("id")).offset().top,   //当前表格距离顶部的距离
                    tableH = $("#" + $tb.attr("id")).height(),  //当前表格的高度
                    windowH = $(window).height();   //窗口的高度

                // 当表格高度大于窗口高度时
                if(tableH > windowH){
                    $("html,body").animate({
                        scrollTop: tableTop - 15
                    }, 300);
                }
                // 切换显示状态
                var $this = $(this);
                $trNext.toggle();
                if ($this.data("on") === 1) {
                    $this.html(trShowMsg).data("on", 0);
                }
                else {
                    $this.html(trHideMsg).data("on", 1);
                }
            });
        }
    };

    /**
     * 表格表头高度滚动固定
     * @param {object} $dom 表格
     * @param {int}    width 表格宽度
     */
    exports.theadfixed = function ($dom,width) {

        var $table = $dom,
            fixedWidth = width || 1100;

        // 防止重复创建如果有先移除
        var $prevTable = $table.prev("table");
        if ($prevTable.length > 0 && $prevTable.data("role") == "head-fixed") {
            $prevTable.empty().remove();
        }

        // 计算尺寸
        var $th = $table.find("th");
        $th.each(function () {
            var $this = $(this);
            $this.width(Math.round($this.width()));
        });

        var WHeight = $(window).height();

        // 复制固定头
        var $thead = $table.find("thead");
        var $newThead = $thead.clone();
        $newThead.find("tr").addClass("notOutputExcel");

        // 创建新表格并插入到 $table 之前
        var $newTable = $("<table class='" + $table.attr("class") + "'></table>")
            .addClass("j_tableHeadFixed")
            .css({"width":fixedWidth,"margin-top":0,"padding-top":0,"top":0})
            .attr("data-role", "head-fixed")
            .html($newThead);

        $table.before($newTable);

        var listenScroll = function () {

            // 获取表格高度
            var tableHeight = $table.height();

            // 表格距离顶部高度
            var tableOffset = $table.offset();
            var tableTop = tableOffset.top;
            var tableLeft = tableOffset.left;

            // 滚动高度
            var $window = $(window);
            var scrollHeight = $window.scrollTop();
            var scrollLeft = $window.scrollLeft();

            // 横向滚动时重新计算left值
            $newTable.css({"left":tableLeft-scrollLeft});

            // 表格底部距顶部高度
            var tableBottom = tableHeight + tableTop - $newThead.height();

            // 滚动高度 > 表格距离顶部高度  && 表格底部距顶部高度 > 表格距离顶部高度
            if ((scrollHeight > tableTop) && (tableBottom > scrollHeight ) && (tableHeight > WHeight)) {
                $newTable.addClass("animated");
            }
            else {
                $newTable.removeClass("animated");
            }
        };

        $(window).on("scroll resize", function () {
            listenScroll();
        })
    };

    /**
     * @param {object} $obj jquery对象  导出Excel表格
     */
    exports.outputHtmlToExcel = function ($dom) {
        var $table = (typeof $dom === "string") ? $($dom) : $dom,
            $tableParent = $table.parents(".j_output-excel-block"),
            $outputBtn = $tableParent.find(".output-excel"),

            // 下载文件名称
            $tableName = $tableParent.find(".head").find("b").text();
        $outputBtn.removeClass("disabled");
        $outputBtn.click(function () {
            $table.table2excel({
                exclude: ".notOutputExcel",
                filename: $tableName,
                name: $tableName +"-Excel"
            });
        })
    };

    /*!*创建饼图
     * @opt
     * opt.el {string} querySelector
     * opt.data {object} ajaxData
     * opt.height {number} 图表高度
     * @callback 返回预处理数据配置项
     * */
    exports.chartPie_v2 = function (opt, unit) {
        var id = opt.el,
            data = opt.data,
            chartHeight = opt.height || 400;
        var dataunit = ["人", "题"];
        var paramunit = dataunit[unit] || dataunit[0];

        // 数据状态正常
        var $id = $(id);
        if (data.status === 1) {

            // 设置图表高度
            $(id).height(chartHeight).show();

            // 回调函数预处理数据，并返回配置项
            var opts = opt.callback(data.data);
            console.log(opts)

            // 配置项
            var option = {
                title: {
                    text: opts.title,
                    x: 'center'
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    // width:"400px",
                    data: opts.legend
                },
                label: {
                    normal: {
                        formatter: '{b} （{c} ' + paramunit + '）'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: opts.title,
                        type: 'pie',
                        radius: [35, 110],
                        center: ['50%', '50%'],
                        data: opts.series
                    }
                ]
            };

            // 不显示图例
            if (!opts.legend) {
                $.each(option.series, function () {
                    var _this = this;
                    _this.center = ["50%", "63%"];
                });
            }

            // 创建图表
            $.chart(option, id);
        }else{
            $id.subDataEmpty(0);
        }
    };

    //分数段图表
    exports.chartScoreSection = function (id, opts, height) {
        var chartHeight = height || 400;
        $(id).css({"height": chartHeight + "px"});
        var option = {
            title: {
                show: false,
                text: "分数段图表",
                x: "center"
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
                data: opts.name,
                bottom: 5
            },
            grid: {
                top: 40,
                left: 10,
                right: 10,
                bottom: 40,
                borderColor: "#aaa",
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: opts.xAxis
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    //max: 100,
                    //interval: 100,
                    axisLabel: {
                        formatter: '{value}%'
                    }
                }
            ],
            series: [
                {
                    name: opts.name[0],
                    type: 'bar',
                    barWidth: "40%",
                    data: opts.series[0],
                    label: {
                        normal: {
                            show: true,
                            position: "top",
                            formatter: function(obj) {
                                if (obj.value === 0) {
                                    return obj.value;
                                } else {
                                    return obj.value + '%';
                                }
                            }
                        }
                    }
                },
                {
                    name: opts.name[1],
                    type: 'line',
                    data: opts.series[1]
                }
            ]
        };
        $.chart(option, id);
    };
    // 老师权限查看学生页面导航改变
    exports.studentNav = function () {
        if (role !== "0") {
            // 学生导航
            var studentNav = "    <a class=\"tab-itm\" href=\"/Analysis/Student/chengji.html\" data-href=\"chengji\">成绩分析</a>\r\n    <a class=\"tab-itm\" href=\"/Analysis/Student/kaodian.html\" data-href=\"kaodian\">考点分析</a>\r\n    <a class=\"go-back\">返回成绩查询</a>\r\n    <!--<link rel=\"import\" href=\"/app/analy/view/include/change-ident.tpl?__inline\">-->\r\n";

            $(".head-nav").html(studentNav);
            if (role === "1") {
                var roleUrl = "Teacher";
            }
            else {
                var roleUrl = "Bzr";
            }
            // 导航链接
            $(".head-nav .go-back").attr("href", "/Analysis/" + roleUrl + "/chaxun.html");

            // 面包屑导航
            var url = location.href;
            var crumbsOn;
            if (url.match("/chengji")) {
                crumbsOn = "成绩分析"
            }
            else {
                crumbsOn = "考点分析"
            }
            var crumbsHtml = '<a href="">首页</a><i class="icon">/</i>' +
                '<a href="/Analysis/Index/index.html">考试列表</a><i class="icon">/</i>' +
                '<a href="/Analysis/' + roleUrl + '/chaxun.html">学生成绩查询</a><i class="icon">/</i>' +
                '<span id="crumbs_on">' + crumbsOn + '</span>'
            $("#j_main-crumbs").html(crumbsHtml)
        }
        // 导航切换
        var pageNavTab = $(".head-nav").find(".tab-itm");
        pageNavTab.each(function () {
            var $this = $(this);
            var pageArr = $this.data("href").split("&");
            for (var i = 0; i < pageArr.length; i++) {
                if (window.location.href.indexOf(pageArr[i]) != -1) {
                    $this.addClass("on");
                }
            }
        });
    };
    // 获取学科名称
    exports.getSubjectName = function (id) {
        var subjectList = ["语文", "理科数学", "文科数学", "英语", "理综", "文综", "物理", "化学", "生物", "政治", "历史", "地理"];
        return subjectList[id - 3];
    };
    var analy = {
        init: function () {
            var e = this;
            e.checkUserPower();//检查用户是否已选择报告
            e.selectRoleEvent(); //考试列表弹窗事件
            e.reportFeedbackState();   //用户反馈状态
            // e.reportFeedbackEvent();   //用户反馈事件
            e.alertFeedbackEvent();//用户反馈弹窗事件
            e.alertHighEvent();//高分试卷弹窗事件
            e.alertZuowenEvent();//查看高分作文弹窗事件
            e.toggleSummaryEvent();// 小结显示隐藏事件
            e.goTopEvent();//回顶部事件
            e.scrollListenEvent(); //添加左侧导航滚动事件
        },

        /*
        * 检查用户是否已选择报告
        * 如果未选择提示返回报告列表
        */
        checkUserPower:function(){
            var ExamID = $.cookie("analy_ExamID");
            if($.getLocalPath() === ("student" || "bzr" || "teacher" || "rector" || "regional")){
                if(!ExamID){
                    layer.open({
                        type:0,
                        closeBtn:false,
                        icon:0,
                        scrollbar:false,
                        btn:["去选择"],
                        content:"请先选择要查看的报告！",
                        btn1:function(){
                            window.location.href="/Analysis/index/index.html"
                        }
                    })
                }
            }
        },
        // 考试列表弹窗
        selectRoleEvent: function () {
            if ($.cookie("analy_RoleIDNum") != "1") {
                $("#change-ident").show();
            }
            $("[id^=change-ident]").on("click", function () {
                var $this = $(this);
                var dataHref = $this.data("href");
                $.removeCookie("analy_RoleIDNum", {"path": "/Analysis"});

                // 如果只有一个身份
                if (dataHref) {
                    $.cookie("analy_RoleIDNum", 1, {"path": "/Analysis"});
                    window.open(dataHref);
                }
                else {
                    var examID = $(this).data("exam") || $.cookie("analy_ExamID");
                    $.cookie("analy_ExamID", examID, {"path": "/Analysis"});
                    var authorityTpl = "<!-- 权限弹窗 -->\r\n    <div class=\"identity-box\">\r\n        <table class=\"identity pct100 table-fixed table\" style=\"height: 100%\">\r\n            <tbody id=\"identity\">\r\n            <tr>\r\n                <td>\r\n                    <p class=\"loading\"></p>\r\n                </td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>";
                    layer.open({
                        type: 0,
                        title: '选择权限',
                        btn: false,
                        area: ["580px", "430px"],
                        content: authorityTpl,
                        success: function () {
                            analy.createRoleList(examID, $this)
                        }
                    });

                }
            });
        },
        /**
         * @param {int} roleID
         */
        getBaseRoleUrl:function(id){
            var roleUrllist = [
                "/Analysis/Student/chengji.html",  //学生
                "/Analysis/Teacher/gaikuang.html",  //老师
                "/Analysis/Bzr/gaikuang.html",  //班主任
                "/Analysis/Bzr/gaikuang.html",  //教务主任
                "/Analysis/Rector/zong_gaikuang.html",   //校长
                "/Analysis/Region/xianji.html"   //区域
            ];
            return roleUrllist[parseInt(id)];
        },

        // 获取权限名称与图标
        getIdentityIcon:function (id) {
            var icon = [
                {
                    ID: 0,
                    cont: "&#xe662;|学生"
                },
                {
                    ID: 1,
                    cont: "&#xe665;|学科教师"
                },
                {
                    ID: 2,
                    cont: "&#xe667;|班主任"
                },
                {
                    ID: 3,
                    cont: "&#xe664;|教务主任"
                },
                {
                    ID: 4,
                    cont: "&#xe666;|校长"
                },
                {
                    ID: 5,
                    cont: "&#xe66a;|区域"
                }
            ];
            var identityInfo = icon[id].cont.split('|');
            var iconstr = '<i class="iconfont">' + identityInfo[0] + '</i>' + identityInfo[1];
            return iconstr;
        },
        // 角色ID生成列表
        getRoleListItem:function (RoleID,AttrList,roleUrl) {

            var html = '<tr class="iden-wrap">' +
                '<th class="iden-key">' + analy.getIdentityIcon(RoleID) + '</th>' +
                '<td class="iden-value">';

            for (var j = 0; j < AttrList.length; j++) {
                html += '<a class="a-link" href="' + roleUrl + AttrList[j].AttrID + '">' + AttrList[j].AttrName + '</a>'
            }

            html += '</td></tr>';
            return html;
        },

        // 获取角色权限列表
        createRoleList: function (examID, $examDom) {
            var examID = examID;
            var Params = {
                params: "getPowerList",
                // userID: $.cookie("yj_front_UserID"),
                // examID: examID
            };
            $.analyzeHandler(Params, function (data) {

                var $identity = $("#identity");
                if (data.status === 1) {
                    var json = data.data;

                    // 生成url列表

                    // function setRoleHref(json) {
                    //     for (var i = 0; i < json.length; i++) {
                    //         var RoleID = json[i].RoleID,       //角色ID
                    //             AttrList = json[i].AttrList,      //列表
                    //             urllist = roleUrllist[RoleID] + "?ExamID=",   //链接地址
                    //             SubjectList = json[i].SubjectList;    //学科列表
                    //
                    //         //学生列表 链接
                    //         if (RoleID === 0) {
                    //             roleUrl = urllist + examID + "&StudentID=";
                    //         }
                    //         if (RoleID === 1) {
                    //             for (var k = 0; k < SubjectList.length; k++) {
                    //                 for (var m = 0; m < AttrList.length; m++) {
                    //                     var classID = AttrList[m].AttrID;
                    //                     var subjectID = SubjectList[k].AttrID;
                    //                     roleUrl = urllist + examID + "&SubjectID=" + subjectID + "&ClassID=" + classID;
                    //                 }
                    //             }
                    //         }
                    //         //班主任列表
                    //         if (RoleID === 2) {
                    //             roleUrl = urllist + examID + "&ClassID=";
                    //         }
                    //         //校长列表 区域列表
                    //         if (RoleID === (4 || 5)) {
                    //             roleUrl = urllist + examID + "&analy_SchoolID=";
                    //         }
                    //     }
                    //     return roleUrl;
                    // }

                    // 生成切换角色列表
                    function setRoleHtml(json) {
                        var html = '';
                        for (var i = 0; i < json.length; i++) {

                            var roleUrl = '';
                            var RoleID = json[i].RoleID,       //角色ID
                                AttrList = json[i].AttrList,      //列表
                                baseUrl = analy.getBaseRoleUrl(RoleID) + "?analy_CurrRoleID="+ RoleID +"&analy_ExamID=",   //链接地址
                                SubjectList = json[i].SubjectList;    //学科列表

                            //学生列表 链接
                            if (RoleID === 0) {
                                roleUrl = baseUrl + examID + "&analy_StudentID=";
                                html += analy.getRoleListItem(RoleID,AttrList,roleUrl);
                            }

                            //学科老师列表 链接
                            if (RoleID === 1) {

                                html += '<tr class="iden-wrap">' +
                                    '<th class="iden-key">' + analy.getIdentityIcon(RoleID) + '</th>' +
                                    '<td class="iden-value">';

                                for (var k = 0; k < SubjectList.length; k++) {

                                    html += '<div class="iden-subject">' +
                                        '<h4>' + SubjectList[k].AttrName + '</h4>' +
                                        '<div class="iden-subject-list">';

                                    for (var m = 0; m < AttrList.length; m++) {

                                        var classID = AttrList[m].AttrID;
                                        var subjectID = SubjectList[k].AttrID;

                                        // 学科老师url
                                        roleUrl = baseUrl + examID + "&analy_SubjectID=" + subjectID + "&analy_ClassID=";
                                        html += '<a href=" ' + roleUrl + classID + ' " class="a-link">' + AttrList[m].AttrName + '</a>';
                                    }
                                    html += '</div></div>';
                                }

                                html += '</td></tr> ';
                            }

                            //班主任列表
                            if (RoleID === 2) {
                                roleUrl = baseUrl + examID + "&analy_ClassID=";
                                html += analy.getRoleListItem(RoleID,AttrList,roleUrl);
                            }
                            if (RoleID === 4) {
                                roleUrl = baseUrl + examID + "&analy_SchoolID=";
                                html += analy.getRoleListItem(RoleID,AttrList,roleUrl);
                            }
                            if (RoleID === 5) {
                                roleUrl = baseUrl + examID + "&analy_AreaID=";
                                html += analy.getRoleListItem(RoleID,AttrList,roleUrl);
                            }

                            // 教务主任，校长，区域列表
                            // if (RoleID === 3 || RoleID === 4 || RoleID === 5) {
                            //     roleUrl = baseUrl + examID + "&analy_SchoolID=";
                            //     html += analy.getRoleListItem(RoleID,AttrList,roleUrl);
                            // }
                        }
                        return html;
                    }

                    // 数据加载完之后按钮才可点击
                    $examDom.removeClass("disabled");

                    // 考试没有数据时
                    var datastatus = $examDom.data("status");
                    if(datastatus == "0"){
                        $examDom.addClass("disabled").unbind("click");
                        $examDom.append("<small>（整理中...）</small>")
                    }
                    // 如果该考试权限只有一个
                    // if (json.length === 1 && json[0].AttrList.length === 1) {
                    //     var RoleID = json[0].RoleID;
                    //     // 教师权限链接
                    //     var $thisHref = "";
                    //     if (RoleID == "1") {
                    //         $thisHref = setRoleHref(json);
                    //     } else {
                    //         $thisHref = setRoleHref(json) + json[0].AttrList[0].AttrID;
                    //     }
                    //     $examDom.attr({"data-href": $thisHref});
                    // }

                    // 如果该考试权限有多个
                    $examDom.show();
                    $identity.html(setRoleHtml(json));
                }else{
                    $identity.subDataEmpty(0);
                }
            })
        },
        // 小结显示隐藏
        toggleSummaryEvent: function () {
            var summaryhide = $(".summary-btn");
            summaryhide.on("click", function () {
                // 向上的图标
                var up = '<i class="iconfont">&#xe66c;</i>';
                // 向下的图标
                var down = '<i class="iconfont">&#xe66d;</i>';
                var summary = $(".summary").css("display");
                if (summary == "block") {
                    $(".summary").slideUp(200);
                    $(this).html(down)
                }
                else {
                    $(".summary").slideDown(200);
                    $(this).html(up)
                }

            })
        },
        // 获取报告反馈状态
        reportFeedbackState: function () {
            var tpl = "<div class=\"analy-lay-item report-feedback mt30\" id=\"j_report-feedback\">\r\n    <div class=\"feedback-site\">\r\n        看完报告您的感受是\r\n        <a class=\"btn btn-second\" href=\"javascript:;\" data-val=\"2\">满意</a>\r\n        <a class=\"btn btn-second\" href=\"javascript:;\" data-val=\"1\">一般</a>\r\n        <a class=\"btn btn-second\" href=\"javascript:;\" data-val=\"0\">不满意</a>\r\n    </div>\r\n</div>";
            // 所有需要添加的页面 权限
            var reportPage = ["student","bzr","teacher","rector","region"];
            // 根据链接判断 是否在上面数组中
            if($.inArray($.getLocalPath(),reportPage) != -1){
                $(".analy-body").append(tpl);
                analy.reportFeedbackEvent();
            }

            // var param = {};
            // $.analyzeHandler(param, function (data) {
            //
            //     // 未反馈时
            //     if (data.status === 1) {
            //         var info = data.data;
            //         var status = info.status;
            //         if (status === 0) {
            //             var tpl = __inline("/app/analy/view/include/report-feedback.tpl");
            //             $(".analy-body").append(tpl);
            //             analy.reportFeedbackEvent();
            //         }
            //     }
            // })
        },

        //提交反馈信息
        reportFeedbackEvent: function () {
            var $feedback = $("#j_report-feedback");
            $feedback.on("click", "a", function () {
                var val = $(this).data("val");
                var loading = layer.load(2);
                setTimeout(function(){
                    layer.close(loading);
                    layer.msg("提交成功，感谢您的参与！", {shade: 0.5, time: 2000});
                    setTimeout(function () {
                        $feedback.slideUp(300, function () {
                            $feedback.remove()
                        });
                    }, 1000);
                },500);

                // var params = {};
                // $.analyzeHandler(params, function (data) {
                //     var state = data.status;
                //     if (state === 1) {
                //         layer.msg("感谢您的参与！", {icon: 6, shade: 0.5, time: 1500});
                //         setTimeout(function () {
                //             $feedback.slideUp(300, function () {
                //                 $feedback.remove()
                //             });
                //         }, 1000)
                //     }
                //     if (state === 0) {
                //         layer.msg("sorry! 提交失败...", { shade: 0.5, time: 1500})
                //     }
                // })
            })
        },
        //用户反馈
        alertFeedbackEvent: function () {
            var feedback = "<!-- 用户反馈 -->\r\n<div class=\"layer-box\">\r\n    <div class=\"layer-box-con\">\r\n        <div class=\"form\">\r\n            <div class=\"iem-item\">\r\n                <textarea class=\"large-text required\" placeholder=\"请描述您的意见或建议，我们会尽快参考您的想法来优化我们的产品和服务......\"></textarea>\r\n            </div>\r\n            <div class=\"iem-item\">为方便回访，请您留下你的联系方式:</div>\r\n            <div class=\"iem-item\">\r\n                <span class=\"item-name\">联系方式：</span>\r\n                <span class=\"item-block\"><input class=\"large-input required\" type=\"text\" placeholder=\"手机号码/固定电话/QQ\" value=\"\"></span>\r\n            </div>\r\n            <div class=\"iem-item feedback-btn\">\r\n                <a href=\"javascript:;\" id=\"j_sidebar-feedback-btn\" class=\"btn btn-primary\">提交反馈</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
            $("#feedback").on("click", function () {
                layer.open({
                    type: 0,
                    title: "用户反馈",
                    area: ["510px", "370px"],
                    btn: false,
                    content: feedback,
                    success: function () {
                        $("#j_sidebar-feedback-btn").on("click", function () {
                            var $required = $(this).parents(".form").find(".required");//必填项
                            if ($required.eq(0).val().trim() === "") {
                                layer.tips("请填写反馈内容 ^_^！", $required.eq(0), {
                                    tips: [1, '#3595CC'],
                                    time: 4000
                                });
                                return false;
                            }
                            if ($required.eq(1).val().trim() === "") {
                                layer.tips("请您留下你的联系方式 ^_^！", $required.eq(1), {
                                    tips: [1, '#3595CC'],
                                    time: 4000
                                });
                                return false;
                            }
                            layer.msg("感谢您的参与！", {shade: 0.5, time: 2000});
                        })
                    }
                });
            });
        },
        //高分试卷
        alertHighEvent: function () {
            var alertHigh = "<!-- 高分试卷 -->\r\n<div class=\"layer-box\">\r\n    <div class=\"layer-box-con highscore\" id=\"highscore\">\r\n        <p class=\"loading\"></p>\r\n        <!--<div class=\"title\">-->\r\n            <!--<h4 class=\"fl highc-tit\">2016届高三年级全国九省三年级全国九三年级全国九三年级全国九三年级全国九大联考（一） 理科-数学</h4>-->\r\n            <!--<div class=\"fr form\">-->\r\n                <!--<select name=\"\" class=\"w70\">-->\r\n                     <!--<option value=\"\">数学</option>-->\r\n                     <!--<option value=\"\">语文</option>-->\r\n                     <!--<option value=\"\">英语</option>-->\r\n                     <!--<option value=\"\">物理</option>-->\r\n                     <!--<option value=\"\">生物</option>-->\r\n                     <!--<option value=\"\">化学</option>-->\r\n                 <!--</select>-->\r\n            <!--</div>-->\r\n        <!--</div>-->\r\n        <!--<div class=\"highc-layer\">-->\r\n            <!--<div class=\"highc-opt\">-->\r\n                <!--<a class=\"next un-select\"><</a>-->\r\n                <!--<a class=\"prev un-select\">></a>-->\r\n            <!--</div>-->\r\n            <!--<div class=\"highc-con\">-->\r\n                <!--<ul class=\"highc-con-box\">-->\r\n                    <!--<li class=\"highc-con-item\">-->\r\n                        <!--<div class=\"item-pic\"><a href=\"\" target=\"_blank\"><img src=\"/app/analy/img/test-paper.jpg\" alt=\"\"></a></div>-->\r\n                        <!--<div class=\"item-text\">-->\r\n                            <!--<p class=\"infotitle\">某第一中学1</p>-->\r\n                            <!--<div class=\"infotext\">-->\r\n                                <!--<span class=\"fl\">分数：720分</span>-->\r\n                                <!--<span class=\"fr\">学号：00000001</span>-->\r\n                            <!--</div>-->\r\n                        <!--</div>-->\r\n                    <!--</li>-->\r\n                    <!--<li class=\"highc-con-item\">-->\r\n                        <!--<div class=\"item-pic\"><a href=\"\" target=\"_blank\"><img src=\"/app/analy/img/test-paper.jpg\" alt=\"\"></a></div>-->\r\n                        <!--<div class=\"item-text\">-->\r\n                            <!--<p class=\"infotitle\">某第一中学2</p>-->\r\n                            <!--<div class=\"infotext\">-->\r\n                                <!--<span class=\"fl\">分数：720分</span>-->\r\n                                <!--<span class=\"fr\">学号：00000001</span>-->\r\n                            <!--</div>-->\r\n                        <!--</div>-->\r\n                    <!--</li>-->\r\n                    <!--<li class=\"highc-con-item\">-->\r\n                        <!--<div class=\"item-pic\"><a href=\"\" target=\"_blank\"><img src=\"/app/analy/img/test-paper.jpg\" alt=\"\"></a></div>-->\r\n                        <!--<div class=\"item-text\">-->\r\n                            <!--<p class=\"infotitle\">某第一中学3</p>-->\r\n                            <!--<div class=\"infotext\">-->\r\n                                <!--<span class=\"fl\">分数：720分</span>-->\r\n                                <!--<span class=\"fr\">学号：00000001</span>-->\r\n                            <!--</div>-->\r\n                        <!--</div>-->\r\n                    <!--</li>-->\r\n                <!--</ul>-->\r\n            <!--</div>-->\r\n        <!--</div>-->\r\n    </div>\r\n</div>\r\n";
            $("#gaofen-paper").on("click", function () {
                layer.open({
                    type: 0,
                    btn: false,
                    title: "高分试卷",
                    content: alertHigh,
                    area: ["auto"],
                    success: function () {
                        m1.heightPaper()
                    }
                });
            });

        },
        // 高分作文
        alertZuowenEvent: function () {
            // 高分作文隐藏
            var subject = $.cookie("analy_SubjectID");   // 学科ID
            // 教师和班主任权限  语文学科显示
            if(role == 1 || role == 2){
                if(subject === "3"){
                    $("#gaofen-composition").css("display","block")
                }else{
                    $("#gaofen-composition").css("display","none")
                }

            }
            // 弹窗
            var alertZuowen = "<!-- 高分作文 -->\r\n<div class=\"layer-box\">\r\n    <div class=\"layer-box-con highscore\" id=\"composition\">\r\n        <!--<div class=\"title\">-->\r\n            <!--<h4 class=\"fl highc-tit\">2016届高三年级全国九省三年级全国九三年级全国九三年级全国九三年级全国九大联考（一） 理科-数学</h4>-->\r\n        <!--</div>-->\r\n        <!--<div class=\"highc-layer\">-->\r\n            <!--<div class=\"highc-opt\">-->\r\n                <!--<a class=\"next\"><</a>-->\r\n                <!--<a class=\"prev\">></a>-->\r\n            <!--</div>-->\r\n            <!--<div class=\"highc-con\">-->\r\n                <!--<ul class=\"highc-con-box\">-->\r\n                    <!--<li class=\"highc-con-item\">-->\r\n                        <!--<div class=\"item-pic\"><a href=\"\" target=\"_blank\"><img src=\"/app/analy/img/test-paper.jpg\" alt=\"\"></a></div>-->\r\n                        <!--<div class=\"item-text\">-->\r\n                            <!--<p class=\"infotitle\">某第一中学1</p>-->\r\n                            <!--<div class=\"infotext\">-->\r\n                                <!--<span class=\"fl\">分数：720分</span>-->\r\n                                <!--<span class=\"fr\">学号：00000001</span>-->\r\n                            <!--</div>-->\r\n                        <!--</div>-->\r\n                    <!--</li>-->\r\n                    <!--<li class=\"highc-con-item\">-->\r\n                        <!--<div class=\"item-pic\"><a href=\"\" target=\"_blank\"><img src=\"/app/analy/img/test-paper.jpg\" alt=\"\"></a></div>-->\r\n                        <!--<div class=\"item-text\">-->\r\n                            <!--<p class=\"infotitle\">某第一中学2</p>-->\r\n                            <!--<div class=\"infotext\">-->\r\n                                <!--<span class=\"fl\">分数：720分</span>-->\r\n                                <!--<span class=\"fr\">学号：00000001</span>-->\r\n                            <!--</div>-->\r\n                        <!--</div>-->\r\n                    <!--</li>-->\r\n                <!--</ul>-->\r\n            <!--</div>-->\r\n        <!--</div>-->\r\n    </div>\r\n</div>\r\n";
            $("#gaofen-composition").on("click", function () {
                layer.open({
                    type: 0,
                    btn: false,
                    title: "高分作文",
                    content: alertZuowen,
                    area: ["auto"],
                    success: function () {
                        m1.MaxComposition()
                    }
                });
            });
        },
        // 返回顶部
        goTopEvent: function () {
            var $goTop = $("#goTop");
            var backTop;
            $(window).scroll(function () {
                // 滚动高度
                backTop = $(window).scrollTop();
                // 窗口高度大于400才显示
                if (backTop > 400) {
                    $goTop.show();
                    $goTop.css({"height": "42px", "border-bottom-width": "1px"});
                }
                else {
                    $goTop.css({"height": 0, "border-bottom-width": "0"});
                }
            });

            $goTop.on("click", function (e) {
                e.preventDefault();
                $("html,body").animate({
                    "scrollTop": 0
                }, 500)
            })
        },
        // 添加右侧导航滚动事件
        scrollListenEvent: function(){
            var sectionItem = $(".analy-body .head"),  // 获取左侧标题
                sectionMenu = $(".panelNav-body"),  //右侧导航
                scrollTop = $(document).scrollTop();  //滚动高度
            // 添加右侧导航
            var addPanelNav =  function(){
                var num = 0,
                    attrLi = [];
                for(var i = 0; i < sectionItem.length;i++){
                    // 模块标题创建ID
                    num ++;
                    var index = "section-item" + num;
                    sectionItem.eq(i).attr("id",index);

                    // 创建右侧导航
                    var navtext = sectionItem.eq(i).find("b").text(),
                        navId = sectionItem.eq(i).attr("id");
                    attrLi.push('<li href=""><a href="#'+navId+'" title="'+navtext+'">'+navtext+'</a></li>')
                }
                // 创建右侧导航
                var navHtml = attrLi.join("");
                var panelNav = '<div class="panelNav-wrap">' +
                    '<div class="panelBox">' +
                    '<div class="panelNav">' +
                    '<div class="panelNav-head">目录</div>' +
                    '<ul class="panelNav-body"></ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $(".analy-head").after(panelNav);
                $(".panelNav-body").html(navHtml);
                // 默认第一个选中
                $(".panelNav-body li").eq(0).addClass("active")
            };
            // 窗口滚动右侧图标改变
            var scrollListen = function(){
                var liMenu = $(".panelNav-body li"),
                    aMenu = $(".panelNav-body li a");
                var currentId = '';
                $(window).scroll(function(){
                    // 获取左侧滚动距顶部高度
                    var scrollTop = $(document).scrollTop();
                    var sectionItem = $(".analy-body .head");
                    sectionItem.each(function(){
                        var e = $(this);
                        if(scrollTop > e.offset().top -100){
                            currentId = "#" + e.attr("id")
                        }else {
                            return false
                        }
                    });
                    var currentLoft = liMenu.find(".active").children("a");
                    if(currentId && currentLoft.attr("href") != currentId){
                        liMenu.removeClass("active");
                        liMenu.find("[href='"+currentId+"']").closest("li").addClass("active");
                    }
                    // 滚动到最底部时，最后一个选中

                        // 文档高度
                    var documentH = $(document).height(),
                        // 窗口高度
                        windowH = $(window).height();
                    if(documentH - (scrollTop + windowH) < 50){
                        liMenu.removeClass("active");
                        $(".panelNav-body li:last").addClass("active");
                    }

                    // 设置当前楼层样式

                    // aMenu.each(function(){
                    //     //窗口滚动距离
                    //     var scrollTop = $(document).scrollTop();
                    //
                    //
                    //     // 获取左侧栏目的ID
                    //     var currObj = $("[id='"+$(this).attr('href').replace(/#/,'')+"']");
                    //     //左侧栏目滚动距离
                    //     var offsetTop = currObj.offset().top;
                    //     if(scrollTop > offsetTop){
                    //         liMenu.removeClass('active');
                    //         $(this).parent('li').addClass('active');
                    //         // return;
                    //     }
                    // });
                });
                // 点击导航跳转
                aMenu.on("click",function(e){
                    e.preventDefault();
                    var $this = $(this);
                    liMenu.removeClass("active");
                    $this.parent("li").addClass("active");
                    // $this.siblings().removeClass("active");
                    var currObj = $("[id='"+$(this).attr('href').replace(/#/,'')+"']");
                    var offsetTop = currObj.offset().top;
                    $('html,body').animate({
                        scrollTop:offsetTop
                    },200);
                });
                // aMenu.last().click(function () {
                //     aMenu.last().parent("li").addClass("active");
                // })
            };
            if(sectionItem.length  > 2){
                addPanelNav();    //添加右侧导航
                setTimeout(function(){
                    scrollListen(); //滚动事件
                },1000)
            }
        }
    };
    analy.init();
    exports.selectRoleEvent = analy.selectRoleEvent;
    exports.createRoleList = analy.createRoleList;

});