define(function (require, exports, module) {
    var studentJs = {
        init:function(){
            var e = this;
            e.chartSelectOption();
        },
        //考试概括
        chartSelectOption:function(){
            var opt = '<option value="0">本班</option>\
            <option value="1">本校</option>\
            <option value="2">联考</option>';
            $("[view-id='j_chartSelectOption']").html(opt);
        }
    };
    studentJs.init();

});