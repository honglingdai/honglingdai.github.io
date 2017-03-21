define(function(require, exports, module) {
    layer = require("../layer");
    require("/static/components/layer/skin/layer.css");
    // layer默认配置
    layer.config({
        path: '/static/components/layer/',
        shadeClose: true,
        extend: [
            'extend/layer.ext.js',
            'skin/layer.css'
        ],
        shift: 0,
        shade: [0.6, "#333"]
            // ,skin: 'layui-layer-molv'
    });

    // 常用弹框配置
    var modal = function() {
        this.name = "modal";
    };
    var M = modal;
    M.pt = modal.prototype;

    // loading
    M.pt.load = function(opts) {
        layer.config({
            type: 3,
            shadeClose: false,
            shift: 2,
            icon: 2,
            shade: [0.9, "#fff"]
        });
        layer.open.call(this, opts);
    };
    // confirm
    M.pt.confirm = function(msg, opts) {
        layer.config({
            type:0,
            shadeClose: false,
            shift: 0
        });
        layer.confirm.call(this, msg, opts);
    };
    // alert //icon: 0感叹号 1正确，2错误 3问号 4锁定 5伤心 6开心
    M.pt.alert = function(msg, opts) {
        layer.config({
            type:0,
            shadeClose: false,
            shift: 0
        });
        layer.alert.call(this, msg, opts);
    };
    // 通用弹出框
    M.pt.normal = function(opts) {
            layer.config({
                type: 1,
                title: "提示",
                shadeClose: true,
                scrollbar:false,
                shift: 0,
                area:["auto","auto"]
            });
            layer.open.call(this, opts);
        };
        // Iframe弹出框
    M.pt.iframe = function(opts) {
        layer.config({
            type: 2,
            title: '信息',
            shadeClose: true,
            shade: false,
            maxmin: true, //开启最大化最小化按钮
            area: ['890px', '600px'],
            shift: 2
        });
        layer.open.call(this, opts);
    };


    $.dialog = new modal();



    // 全屏loading
    $("#demo1").click(function() {
            $.dialog.load();
        });
        // confirm
    $("#demo2").click(function() {
        $.dialog.confirm("您是如何看待前端开发？", {
            // btn: ["btn1", "btn2"],
            yes: function() {
                alert(11);
            },
            cancel: function() {
                alert(22);
            }
        });
    });

    //alert
    $("#demo3").click(function() {
        $.dialog.alert("请输入你的姓名！", {
            icon: 0 //0感叹号 1正确，2错误 3问号 4锁定 5伤心 6开心
                ,
            yes: function() {
                $.dialog.alert("请输入你的姓名！", {
                    icon: 2,
                    yes: function() {
                        $.dialog.alert("请输入你的姓名！", {
                            icon: 3,
                            yes: function() {
                                $.dialog.alert("请输入你的姓名！", {
                                    icon: 4,
                                    yes: function() {
                                        $.dialog.alert("请输入你的姓名！", {
                                            icon: 5,
                                            yes: function() {
                                                $.dialog.alert("请输入你的姓名！", {
                                                    icon: 6,
                                                    yes: function() {
                                                        $.dialog.alert("请输入你的姓名！", {
                                                            icon: 1
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })

    //normal
    $("#demo4").click(function() {
            $.dialog.normal({
                btn: ['确定', '取消'],
                content: $("#normal1").html(),
                btn1: function() {
                    $.dialog.normal({
                        btn: ['确定', '取消'],
                        content: $("#normal1").html(),
                        yes: function() {
                            $.dialog.normal({})
                        },
                        cancel: function() {
                            alert(22);
                        }
                    });
                },
                btn2: function() {
                    alert(22);
                }
            });
        })
        //confirm
    $("#demo5").click(function() {
            var index = $.dialog.normal({
                area: ["500px", "300px"],
                btn: ["btn1", "btn2"],
                content: "您是如何看待前端开发？",
                yes: function() {
                    // alert(111);

                },
                cancel: function() {
                    // alert(222);
                }
            });
        })
        //捕获页
    $("#demo6").click(function() {
        var index = $.dialog.normal({
            type: 1,
            shade: false,
            title: false, //不显示标题
            content: $('#normal2'), //捕获的元素
            cancel: function(index) {
                layer.close(index);
                this.content.show();
                layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
            }
        });

    });
    //iframe
    $("#demo7").click(function() {
        //iframe窗
        $.dialog.iframe({
            title: '很多时候，我们想最大化看，比如像这个页面。',
            content: 'http://www.wln100.com/'
        })
    });

    $("#demo11").on("click", function() {
        //询问框
        layer.confirm('您是如何看待前端开发？', {
            btn: ['重要', '奇葩'] //按钮
        }, function() {
            layer.msg('的确很重要', { icon: 1 });
        }, function() {
            layer.msg('也可以这样', {
                time: 20000, //20s后自动关闭
                btn: ['明白了', '知道了']
            });
        });
    })



})
