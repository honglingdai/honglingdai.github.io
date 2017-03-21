define(function (require) {

    require("./wow.min");

    var $toggleSystem = $("#toggleSystem");//切换系统
    var $systemName = $("#systemName");//系统名称
    var $loginBtn = $("#login-btn");//登录
    var $passWord = $('#passWord');//密码

    var userLoginJs = {
        init: function () {

            // 登录光标移入移出
            $("#userName,#passWord").on({
                focusin: function () {
                    $(this).parent().css("border-color", "#4b88e6")
                },
                focusout: function () {
                    $(this).parent().css("border-color", "#ccc")
                }
            });

            $("#id").on({
                focusin:function(){}
            })
            var _this = this;
            _this.headerFixed();//头部导航固定
            _this.toggleSys();//切换系统
            _this.loginEvent();//登录事件
            _this.bannerPlay();//banner轮播图
            _this.bannermove();// banner滑动
            _this.scrollBtn(); //返回顶部模块
            _this.alertFeedbackEvent();
        },
        // 头部导航固定
        headerFixed: function(){
            $(window).scroll(function(){
                var scrollH = $(document).scrollTop();
                if(scrollH > 10){
                    $(".header-wrap").addClass("header-fixd")
                }else{
                    $(".header-wrap").removeClass("header-fixd")
                }
            })
        },
        // banner滑动
        bannermove:function(){
            $('.moveBanner').on('mousemove', function(e) {
                var offsetX = e.clientX / window.innerWidth - 0.5,
                    offsetY = e.clientY / window.innerHeight - 0.5;
                var _left = -40 * offsetX;    //如果想动的幅度更大，可以调整 -40 的值
                var _top = -40 * offsetY;     //如果想动的幅度更大，可以调整 -40 的值
                //应用公式
                $('.moveBanner .banner-bg img').css('left',_left*1.2+10).css('bottom',_top*0.2);  //将您的left值和top值先+此数值，*的小数越大，动的越大，否则越小
            });
        },
        // 首页轮播图
        bannerPlay: function () {
            var IntervalName;
            var $banner = $("#bannerPlay");
            var imgList = $banner.find(".imgList li");
            var bannerIndex = 0;
            var bannerCount = imgList.length;
            for (var i = 0; i < bannerCount; i++) {
                if (i == 0) {
                    $(imgList[i]).show();
                }
                else {
                    $(imgList[i]).hide();
                }
            }
            if (bannerCount > 1) {
                var html = "";
                for (var i = 0; i < bannerCount; i++) {
                    if (i == 0) {
                        html += '<dd><a tag=' + i + ' class="active" href="javascript:void(0);"></a></dd>';
                    }
                    else {
                        html += '<dd><a tag=' + i + ' href="javascript:void(0);"></a></dd>';
                    }
                }
                $banner.find(".btnList").html(html);
                var btnList = $banner.find(".btnList a");
                bindBannerTime();
                btnList.click(function () {
                    var _this = $(this);
                    clearInterval(IntervalName);
                    bindBannerTime();
                    if (_this.hasClass("active")) {
                        return;
                    }
                    bannerIndex = _this.attr("tag");
                    switchBanner(bannerIndex);
                });
            }
            function bindBannerTime() {
                IntervalName = setInterval(function () {
                    bannerIndex++;
                    if (bannerIndex >= bannerCount) {
                        bannerIndex = 0;
                    }
                    switchBanner(bannerIndex);
                }, 4000);
            }

            function switchBanner(index) {
                imgList.fadeOut();
                $(imgList[index]).fadeIn();
                btnList.removeClass("active");
                $(btnList[index]).addClass("active");
            }
        },

        // 系统切换函数
        readCookieSysContent: function (way) {
            $.cookie("yj_SystemID", way, {path: "/"});
            if (way == 1) {
                $toggleSystem.html("分析").attr("way", "0");
                $systemName.html("阅卷系统");
            }
            else {
                $toggleSystem.html("阅卷").attr("way", "1");
                $systemName.html("成绩分析系统");
            }
        },
        toggleSys: function () {

            // 读取系统id缓存数据
            var sysID = $.cookie("yj_SystemID");
            if (sysID) {
                userLoginJs.readCookieSysContent(sysID)
            }

            // 系统切换
            $toggleSystem.on("click", function () {
                var way = $(this).attr("way");
                userLoginJs.readCookieSysContent(way);
            })
        },
        loginSystem: function (user, who, goto) {
            var isWho = who || "analysisLogin_no";
            var goToUrl = goto || "Analysis";
            $.ajax({
                url: "/Analysis/Index/getApi.html",
                type:"post",
                dataType: 'json',
                data: {
                    params: "login",
                    userName: user.username,
                    password: user.passWord,
                },
                success: function (data) {
                    console.log(data)
                    var status = data.data.status;
                    var info = data.data.msg;
                    if (status === 1 && info) {

                        // 记录用户真实姓名
                        // if (info.RealName) {
                        //     $.cookie("yj_front_RealName", encodeURI(info.RealName), {"path": "/"});
                        // }

                        // // 分析系统记录角色ID
                        // if (info.WhoIs) {
                        //     $.cookie("analy_RoleID", info.WhoIs, {"path": "/Analysis"});
                        // }
                        $.cookie("yj_front_UserCode", 'qqqq', {"path": "/"});
                        $.cookie("yj_front_UserName", user.username, {"path": "/"});
                        $.cookie("yj_front_UserID", info.UserID, {"path": "/"});

                        layer.msg("登录成功！");
                        setTimeout(function () {
                            location.href = "/" + goToUrl + "/Index/index.html";
                        }, 100)
                    }
                    else {
                        layer.msg(info);
                        $loginBtn.removeClass("btn-disabled").val("登 录");
                    }
                }
            })
        },
        // 登录事件
        loginEvent: function () {
            $loginBtn.on("click", function () {
                // 登录前清除cookie
                var cookieList = ["yj_front_UserName", "yj_front_UserCode", "yj_front_UserID"];
                $.each(cookieList, function (i, n) {
                    $.removeCookie(n);
                });
                var username = $("#userName").val();
                var passWord = $("#passWord").val();
                var ifSave = $("#ifSave").prop('checked') ? 1 :0;
                if (!$.trim(username).length > 0) {
                    layer.msg("请输入用户名");
                    return;
                }
                if (!$.trim(passWord).length > 0) {
                    layer.msg("请输入密码");
                    return;
                }
                $loginBtn.addClass("btn-disabled").val("正在登录...");

                // 登录系统
                var way = $(".tab-btn").attr("way"),
                    userInfo = {
                        username: username,
                        passWord: passWord
                    };
                if (way == 1) {
                    userLoginJs.loginSystem(userInfo);
                }
                else {
                    userLoginJs.loginSystem(userInfo, "reviewLogin_no", "Review");
                }
            });
            // 回车键登录
            $passWord.keydown(function (e) {
                if (e.keyCode == 13) {
                    $loginBtn.click()
                }
            })
        },
        //返回顶部模块
        scrollBtn: function(){
            var scrollhtml = "<div class=\"sidebar-tool-wrap\">\r\n    <div class=\"sidebar-tool\">\r\n        <ul class=\"func-list\">\r\n            <li class=\"item1\">\r\n                <a href=\"javascript:;\"><span class=\"tips-title\">在线<br/>客服</span></a>\r\n                <div class=\"service-tell\">\r\n                    <div class=\"icon\">客服电话</div>\r\n                    <p><b>400-0371-657</b></p>\r\n                </div>\r\n            </li>\r\n            <li class=\"item2\"><a href=\"javascript:;\" id=\"feedback\"><span class=\"tips-title\">用户<br/>反馈</span></a></li>\r\n            <!--<li class=\"item3\">-->\r\n                <!--<a href=\"javascript:;\"><span class=\"tips-title\">下载<br/>体验</span></a>-->\r\n                <!--<div class=\"show-ewm clearfix\">-->\r\n                    <!--<ul class=\"app-ewm\">-->\r\n                        <!--<li>-->\r\n                            <!--<img src=\"/app/analy/img/sidebar/ewm.png\" alt=\"安卓版下载\"/>-->\r\n                            <!--<p>Android下载</p>-->\r\n                        <!--</li>-->\r\n                        <!--<li>-->\r\n                            <!--<img src=\"/app/analy/img/sidebar/ewm.png\" alt=\"IOS版下载\"/>-->\r\n                            <!--<p>IOS下载</p>-->\r\n                        <!--</li>-->\r\n                    <!--</ul>-->\r\n                <!--</div>-->\r\n            <!--</li>-->\r\n            <li class=\"item4\" id=\"goTop\"><a href=\"#\"><span class=\"tips-title\" >返回<br/>顶部</span></a></li>\r\n        </ul>\r\n    </div>\r\n</div>";
            $(".footer-wrap").before(scrollhtml);
            var $goTop = $("#goTop");
            var backTop;
            $(window).scroll(function () {
                backTop = $(window).scrollTop();
                if (backTop > 400) {
                    $goTop.show();
                    $goTop.css({"height": "54px", "border-bottom-width": "1px"});
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
        // 用户反馈
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
                            var $required = $(this).parents(".iem-item").find(".required");//必填项

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
        }
    };
    userLoginJs.init();
    new WOW().init();
});