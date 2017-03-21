define(function (require) {
    require("jquery");
    require("cookie");
    var headerJs = {
        init: function () {
            var e = this;
            e.loginShowState();//设置登录显示状态
            e.navCurrentState();//设置导航当前页状态
            e.phoneNavEvent();//导航-phone
        },

        //设置登录显示状态
        loginShowState:function () {
            var isLogin = $.cookie("yj_front_UserCode");
            var loginState = $("#user-login-state");

            // 已登录
            if (isLogin) {
                var realName = $.cookie("yj_front_RealName");
                var userName = realName ? decodeURI(realName) : $.cookie("yj_front_UserName");
                loginState.find(".isLogin").show().siblings(".isExit").hide();
                loginState.find(".user-name").html(userName).attr("title", userName);
            }
            else {
                loginState.find(".isLogin").hide().siblings(".isExit").show();
            }
        },

        //设置导航当前页状态
        navCurrentState:function(){
            var pathname  = window.location.pathname;
            var $pageTag = $(".header-nav").find("a");
            $pageTag.each(function(){
                var $thisHref = $(this).attr("href");
                if(pathname.indexOf($thisHref.split(".")[0]) === 0){
                    $(this).parent("li").addClass("currentPage");
                }
            })

        },
        //导航-phone
        phoneNavEvent: function () {
            var $navItem = $(".header-nav").find("li");

            // 导航逐项添加动画延时
            $navItem.each(function (i) {
                $(this).css({"transition-delay": 0.025 * Math.pow((i + 1), 1.25) + "s"});
            });

            // 导航显示隐藏
            $("#nav-toggle,#mask-layer").on("click", function () {
                $("#nav-toggle").toggleClass(" toggle-animate");
                $("body").toggleClass("open-nav");
            });
        }
    };
    headerJs.init();
});