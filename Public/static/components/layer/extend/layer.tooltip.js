define(function(require, exports, module) {
    layer = require("../layer");
    require("../skin/layer.css");
    function toolTip(){
        var tipsIndex;
        $(document).on("mouseenter","[data-tip]",function(){
            var e = $(this);
            var tip = e.data("tip");
            tipsIndex = layer.tips(tip , e ,{
                shift:5,
                time:0
            });
        })
        $(document).on("mouseleave","[data-tip]",function(){
            layer.close(tipsIndex);
        })
    }
    toolTip();
});
