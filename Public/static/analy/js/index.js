define(function (require, exports, module) {
    require("jquery");
    var analy = require("analy");
    require("./getData");
    var laydate = require("laydate");
    var laypage = require("laypage");
    require("/Public/static/components/laypage/skin/laypage.css");
    var examList = {
        init: function () {
            var e = this;
            e.getExamList();// 获取考试列表
            e.filterExamDate();//考试查询
            e.filterExamByMonthsEvent();//考试查询通过月份
        },
        // 获取考试列表
        getExamList: function (setParam) {

            // 列表初始化
            var $examList = $("#js_exam-list");
            $examList.html('<p class="loading" style="padding:150px 0;"></p>');

            var baseParams = {
                params: ["getExamList"],
                userID: $.cookie("yj_front_UserID"),
                page: 1
            };
            var setP = setParam || {};
            var params = $.extend({}, baseParams, setP);
            $.analyzeHandler(params, function (data) {
                console.log(data)
                var info = data.data,
                    status = data.status;
                if (status === 1) {
                    // 返回的页码
                    var page = info.PageNum;
                    // 时间筛选区域显示
                    $("#j_examFilter").show();
                    var windowHeight = $(window).height();
                    // 设置容器最小高度
                    $examList.css({"min-height":windowHeight-333});
                    // 生成考试列表
                    var list = info.ExamList;
                    if(!list){
                        // 无数据时显示
                        $examList.html('<p class="ls0 tc" style="padding-top:190px">未找到相关考试信息！</p>');
                    }else{
                        $examList.html(examList.renderExamList(list));
                    }

                    // 获取用户各个考试权限
                    examList.getPowerList();
                    // 生成分页
                    examList.examPage(page);
                    // 绑定选择身份事件
                    analy.selectRoleEvent();
                } else {
                    $examList.subDataEmpty(1);
                }
            })
        },

        // 获取各个考试权限列表 弹窗
        getPowerList:function(){
            var $examList = $("#js_exam-list").find("[id^=change-ident]");
            $examList.each(function(){
                var $this = $(this);
                var examID = $this.data("exam");
                analy.createRoleList(examID,$this);
            })
        },
        // 分页
        examPage: function () {
            laypage({
                cont: 'pager',//分页id
                pages: "page",//总页数
                curr: 1,
                jump: function (obj, first) {
                    if (!first) {
                        examList.getExamList({page:obj.curr});
                    }
                }
            });
        },
        //考试查询
        filterExamDate: function () {
            var start = {
                elem: "#addTimeStart",
                format: 'YYYY-MM-DD',  //日期格式
                max: laydate.now(), //最大日期
                festival: true,  //显示节日
                choose: function (data) {
                    end.min = data; //开始日选好后，重置结束日的最小日期
                    end.start = data; //将结束日的初始值设定为开始日
                    examList.filterExamByDates();
                }
            };
            var end = {
                elem: "#addTimeEnd",
                format: 'YYYY-MM-DD',  //日期格式
                max: laydate.now(),  //最大日期
                festival: true,  //显示节日
                choose: function (data) {
                    start.max = data; //结束日选好后，重置开始日的最大日期
                    examList.filterExamByDates();
                }
            };
            setTimeout(function(){
                laydate(start);
                laydate(end);
            },100);
        },

        // 筛选考试 通过日期
        filterExamByDates:function(){
            var $startTime = $("#addTimeStart"), //开始时间ID
                $endTime = $("#addTimeEnd"),  //结束时间ID
                startTimeValue = $.trim($startTime.val()),  //开始时间值
                endTimeValue = $.trim($endTime.val());  //结束时间值
            if( endTimeValue !="" && startTimeValue !=""){
                var param = {
                    // 格式化时间
                    startTime:+new Date(startTimeValue)/1000,
                    endTime: +new Date(endTimeValue)/1000
                };
                // 重新生成考试列表
                examList.getExamList(param);
            }
        },
        // 筛选考试 通过月份
        filterExamByMonthsEvent:function(){
            $("#j_filterExamByMonths").on("change",function(){
                var checkedValue = $(this).find("option:checked").val(),
                    beforeTimes = 30*24*3600 * checkedValue,
                    nowTimes = +new Date()/1000,
                    param = {};

                // 大于一个月选项 一个月=1 三个月=3 半年 =6
                if(checkedValue > 0){
                    param = {
                        startTime:nowTimes - beforeTimes,
                        endTime: nowTimes
                    };
                }
                // 重新生成考试列表
                examList.getExamList(param);
            })
        },

        //考试列表
        renderExamList: function (list) {
            // 动态生成HTML
            var tpl = '';
            for (var i = 0; i < list.length; i++) {
                var examID = list[i].ExamID;
                tpl += '<div class="inline_three">\
                        <div class="exam-item">\
                        <h3>' + list[i].ExamName + '</span></h3>\
                        <div class="clearfix">\
                        <span class="fl text-muted">时间：' + list[i].AddTime + '</span>\
                        <span class="fr text-muted">年级：' + list[i].GradeName + '</span>\
                        </div>\
                        <div class="btn-site">';
                tpl += '<a class="btn-block btn btn-lg btn-primary disabled" ' +
                    'data-status="'+list[i].Status+'" ' +
                    'id="change-ident-'+examID+'" ' +
                    'data-exam="'+ examID +'"><i class="iconfont">&#xe630;</i>分析报告</a>';
                tpl += '</div>\
                        </div>\
                        </div>';
            }
            return tpl;
        }
    };
    examList.init();
});