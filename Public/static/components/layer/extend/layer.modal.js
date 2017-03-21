define(function(require, exports, module) {
    layer = require("../layer");
    require("/Public/static/components/layer/skin/layer.css");
    // layer默认配置
    layer.config({
        path: '/Public/static/components/layer/',
        shadeClose: true,
        // extend: [
        //     'extend/layer.ext.js',
        //     'skin/layer.css'
        // ],
        shift: 6,
        shade: [0.6, "#333"]
    });


    /*移动端弹框尺寸计算*/
    function layWidth() {
        var width = $(window).width();
        var mobileSet = {};

        if (width < 768) {
            width = width - 20;
            return mobileSet = {
                width: width + "px",
                move: false
            };
        } else {
            return mobileSet = {
                width: 'auto',
                move: '.layui-layer-title'
            }
        }
    }

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
            type: 0,
            shadeClose: false,
            shift: 0
        });
        layer.confirm.call(this, msg, opts);
    };
    // alert //icon: 0感叹号 1正确，2错误 3问号 4锁定 5伤心 6开心
    M.pt.alert = function(msg, opts) {
        layer.config({
            type: 0,
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
            // scrollbar:false,
            shift: 0,
            move:layWidth().move,
            area: [layWidth().width, "auto"]
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
});