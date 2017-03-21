define(function (require, exports, module) {
    require("imgzoom");
    //腾讯触摸事件插件
    require("finger");
    //过度插件
    require("transform");
    require("to");
    var UI = {
        init: function () {
            var e = this;
            e.handlePanelEvent();
            if (e.detect() > 991) {
                e.base();
            }
            $(window).resize(function () {
                if (e.detect() > 991) {
                    e.base();
                }
            })
        },
        //窗口宽度
        detect: function () {
            var winWidth = $(window).width();
            $(window).resize(function () {
                winWidth = $(window).width();
            });
            return winWidth;
        },
        //收起按钮
        handlePanelEvent: function () {
            $(".j_close-panel").on("click", function () {
                var $this = $(this), $span = $this.find("span");
                $span.toggleClass("open");
                $(".er-sidebar").toggleClass("j_m-open");
                if ($this.data("mark") === 'open') {
                    $this.data("mark", "hide");
                } else {
                    $this.data("mark", "open");
                }
            })
        },
        //操作区域重新计算布局
        base: function (mid) {
            /*er-body:height = winHeight - headHeight - mainHeadHeight - mainPadding*/
            var mainID = mid || '#main';
            var winHeight = $(window).height();
            var headHeight = $(".header-wrap").outerHeight();
            var main = $(mainID);
            var mainTitleHeight = main.find(".content-title").outerHeight();
            var mainBody = main.find(".er-left");
            mainBody.css({
                'height': (winHeight - headHeight - mainTitleHeight - 24),
                'overflow': 'hidden'
            });

            var mainBodyHeight = mainBody.outerHeight();

            //试题评阅评分项
            var paperTagHeight = $("#j_paper-mark-opt").outerHeight();
            $("#j_ques-list-wrap").css({
                "height": mainBodyHeight - paperTagHeight - 100 - 100 - 1
            });
            //试题自检
            //记录列表高度
            var handleHeight = $("#j_review-handle").outerHeight();
            var listHeight = mainBodyHeight - handleHeight - 40 - 1;

            $("#j_marked-list").css({
                "height": listHeight
            })
        },
        //PC端执行图象缩放事件
        correctImgPC: function (callback) {
            if ($("#handleImg").length > 0 && UI.detect() > 991) {
                callback && callback()
            }
        },
        //手机端执行图象缩放事件
        correctImgMobile: function () {
            //要操作的试题图象
            var $PaperImg = $("#handleImg");
            $PaperImg.load(function () {
                $PaperImg.show();
                if (UI.detect() < 991) {
                    // 图象初始化
                    var handleImg = $PaperImg[0];
                    Transform(handleImg);
                    var tranInit = {};

                    // 默认缩放比例
                    var initScale = 1;
                    $PaperImg.css({
                        "max-height": "100%",
                        "max-width": "100%",
                        "margin-top": "50%",
                        "margin-left": "50%",
                        "transform": "translate(-50%,-50%)"
                    });

                    handleImg.translateX = -$PaperImg.width() / 2;
                    handleImg.translateY = -$PaperImg.height() / 2;
                    tranInit = {
                        X: handleImg.translateX,
                        Y: handleImg.translateY
                    };

                    // 实例化
                    new AlloyFinger(handleImg, {
                        multipointStart: function () {
                            initScale = handleImg.scaleX;
                        },
                        // 双指缩放
                        pinch: function (evt) {
                            handleImg.scaleX = handleImg.scaleY = initScale * evt.scale;
                        },
                        // 拖放
                        pressMove: function (evt) {
                            handleImg.translateX += evt.deltaX;
                            handleImg.translateY += evt.deltaY;
                            evt.preventDefault();
                        }
                    });
                    var handleImgWrap = $PaperImg.parent()[0];
                    new AlloyFinger(handleImgWrap, {
                        // 双击
                        doubleTap: function () {
                            // 过渡
                            function ease(x) {
                                return Math.sqrt(1 - Math.pow(x - 1, 2));
                            }
                            // 初始化图象位置
                            if ((handleImg.translateX != tranInit.X || handleImg.translateY != tranInit.Y)) {
                                new To(handleImg, "translateX", tranInit.X, 500, ease);
                                new To(handleImg, "translateY", tranInit.Y, 500, ease);
                                new To(handleImg, "scaleX", 1, 500, ease);
                                new To(handleImg, "scaleY", 1, 500, ease);
                                return;
                            }
                            if (handleImg.scaleX === 1) {
                                new To(handleImg, "scaleX", 4, 500, ease);
                                new To(handleImg, "scaleY", 4, 500, ease);
                            } else if (handleImg.scaleX === 4) {
                                new To(handleImg, "scaleX", 8, 500, ease);
                                new To(handleImg, "scaleY", 8, 500, ease);
                            }
                            else if (handleImg.scaleX === 8) {
                                new To(handleImg, "scaleX", 1, 500, ease);
                                new To(handleImg, "scaleY", 1, 500, ease);
                            } else {
                                new To(handleImg, "scaleX", 1, 500, ease);
                                new To(handleImg, "scaleY", 1, 500, ease);
                            }
                        }
                    })
                }
            })

        }
    };
    UI.init();
    exports.ui = UI;
});