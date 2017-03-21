define(function (require, exports) {
    require("jquery");

    /**
     * 批阅系统请求数据方法
     * @param opts [object]
     **/
    $.handler = function (opts, callback) {

        // 全局加载动画
        Pace.restart();

        var opt = {},
            typ = "post";
        //设置默认参数
        opt.params = ["shunt"];
        opt.userCode = $.cookie("yj_front_UserCode");
        //如果包含type属性[请求方法]
        if (opts.type) {
            typ = opts.type;
            delete opts.type;
        }
        //合并参数
        for (var key in opts) {
            //参数是数组
            if ($.isArray(opts[key]) && opt[key]) {
                opt[key] = opt[key].concat(opts[key]);
            } else {
                opt[key] = opts[key];
            }
        }
        $.ajax({
            url: "/Review/Index/getApi.html",
            type: typ,
            data: opt,
            success: function (data) {
                // var state = data.status;
                // if (state === 1) {
                //     //更新UserCode
                //     if(data.code && data.code["UserCode"]){
                //         $.cookie("yj_front_UserCode", data.code["UserCode"], {"path": "/"});
                //     }
                // }
                callback && callback(data)
            }
        });
    };
    /**教师试题评阅-计算总分
     * @score {array} TestList
     * ....
     * "TestList":[{
         "OrderID":"3",
         "Score":"4.0",
         "StepList":[]
     }]
     *...
     * */
    exports.countScore = function (score) {
        var currScore = 0;
        $.each(score, function (testNum) {
            currScore += score[testNum].Score - 0;
        });
        return currScore;
    };
    /**
     * 检查是否已参加批阅任务
     * */
    exports.checkPower = function () {
        if (!$.cookie("review_ExamID") || !$.cookie("review_SubjectID")) {
            layer.open({
                icon: 0,
                btn:["去参加","取消"],
                content:"请参加批阅任务后查看！",
                btn1:function(){
                    location.href = "/Review/index/index.html"
                }
            });
            $(".loading").eq(0).addClass("data-empty-0");
            return false;
        }
        return true;
    };
    /**
     * 是否显示小题号
     * @sub {number} 小题号
     * */
    exports.showTestSubOrder = function (sub) {
        return (sub != 0) ? "( " + sub + " )" : "";
    };

    var reviewJs ={
        init:function(){
            //创建面包屑导航
            if(location.pathname.match(/Review\/Index\/examDetail/i)){
                var pageName = "考试详情";
                var crumbsHtml = '<a href="">首页</a>\
            <i class="icon">/</i>\
            <a href="/Review/Index/index.html">考试列表</a>\
            <i class="icon">/</i>\
            <span id="crumbs_on">'+pageName+'</span>';
                $("#j_main-crumbs").html(crumbsHtml);
            }

        }
    };
    reviewJs.init()

});