define(function (require) {
    require("jquery");
    require("jquery_mousewheel");
    require("layer");
    // 图片缩放插件
    !function ($) {
        $.imgZoom = function (imgBox, opt) {

            var box = $(imgBox);
            var boxSize = {
                w: box.innerWidth(),
                h: box.innerHeight()
            };
            box.css({"width": boxSize.w, "height": boxSize.h});


            var imgObj;
            var defHeight;
            var defWidth;
            var rePosition = function (opts) {
                imgObj = box.find("img");

                //计算位置
                function updateSize() {
                    defHeight = imgObj.height();
                    defWidth = imgObj.width();
                }

                //初始化图片位置，居中显示
                imgObj.css({
                    "max-width": "none",
                    "max-height": "none",
                    "position": "absolute"
                });
                imgObj.attr({"draggable": false});
                updateSize(imgObj);
                //确定方向重新设定图片宽高
                var useWitch = defHeight / defWidth - boxSize.h / boxSize.w;
                var imgBiggerSize;
                var imgOuterMg = 40;
                if (useWitch > 0) {
                    imgBiggerSize = (defHeight > boxSize.h) ? boxSize.h : defHeight;
                    imgObj.css("height", imgBiggerSize - imgOuterMg + 'px');
                } else {
                    imgBiggerSize = defWidth > boxSize.w ? boxSize.w : defWidth;
                    imgObj.css("width", imgBiggerSize - imgOuterMg + 'px');
                }
                updateSize(imgObj);

                imgObj.css({
                    'margin-top': -defHeight / 2,
                    'margin-left': -defWidth / 2,
                    'top': (boxSize.h) / 2,
                    'left': (boxSize.w) / 2
                });


                //验证图片大小
                function checkSize(step) {
                    if (!imgObj.is(":animated")) {
                        updateSize(imgObj);
                        var maxScale = opts.maxScale,
                            minScale = opts.minScale;

                        //最小宽高不能小于minScale
                        if (step < 0) {
                            if ((defWidth * (1 + step) < minScale && (defHeight * (1 + step)) < minScale)) {
                                layer.msg("已缩放到最小", {time: 1000});
                                return false;
                            }
                        }

                        //最大宽高不能大于maxScale
                        if (step > 0) {
                            if ((defWidth * (1 + step)) > maxScale || (defHeight * (1 + step)) > maxScale) {
                                layer.msg("已缩放到最大", {time: 1000});
                                return false;
                            }
                        }

                        return true;
                    }

                }

                function zoomCore(btn, step) {
                    $(document).on("click.zoom", btn, function (e) {
                        e.preventDefault();
                        updateSize(imgObj);

                        // 检查图片是否可缩放
                        if (!checkSize(step)) {
                            return;
                        }
                        var currWidth = defWidth * (1 + step);
                        var currHeight = defHeight * (1 + step);

                        if (!imgObj.is(":animated")) {
                            imgObj.animate({
                                "width": currWidth,
                                "height": currHeight,
                                'margin-top': -(currHeight) / 2,
                                'margin-left': -(currWidth) / 2
                            }, 150)
                        }
                    })
                }


                //放大
                zoomCore(opts.big, opts.step);
                //缩小
                zoomCore(opts.small, -opts.step);
                //移动
                var pos;
                var isMouseDown = 0;
                var startX = 0, startY = 0;
                imgObj.on("mousedown.zoom",function (event) {
                    isMouseDown = 1;
                    var e = event || window.event;
                    e.preventDefault();
                    startX = e.pageX || e.clientX;
                    startY = e.pageY || e.clientY;
                    pos = imgObj.position();
                });
                $(document).on("mouseup.zoom",function () {
                    isMouseDown = 0;
                });
                $(document).on("mousemove.zoom", function (event) {
                    var e = event || window.event;
                    if (isMouseDown) {
                        imgObj.css({
                            "top": pos.top + e.pageY - startY,
                            "left": pos.left + e.pageX - startX
                        });
                    }
                });
                //鼠标滚轮事件
                box.on("mousewheel.zoom",function (event, delta) {
                    if (!checkSize()) {
                        return;
                    }
                    if (delta > 0) {
                        $(opts.big).click()
                    }
                    if (delta < 0) {
                        $(opts.small).click()
                    }
                })
            };
            //图片加载后执行
            var $img = $("#handleImg");
            $img.load(function () {
                // 事件绑定初始化
                box.unbind("mousewheel.zoom");
                $(document).unbind("click.zoom mouseup.zoom mousemove.zoom");

                var options = opt || {};
                var option = {
                    big: ".zoomBig",
                    small: ".zoomSmall",
                    zoomToggle: ".zoomToggle",
                    step: 0.3,
                    scale: 4.5,
                    maxScale: 3000,
                    minScale: 100
                };
                var initMax = Math.max($img.width(), $img.height()) * option.scale;
                option.maxScale = Math.max(initMax, 200);
                var opts = $.extend({}, option, options);
                rePosition(opts);
            });
        };
    }(jQuery);
});
