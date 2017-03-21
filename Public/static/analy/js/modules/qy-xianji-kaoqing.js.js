define(function (require, exports) {
    var analy = require("analy");
    var template = require("tmpl");
    /*最高分*/
    exports.xianjikaoqing = function(){
        var param={
            params:["getGroupInfo"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            var $tableID = $("#region-xianji-kaoqing");
            if(data.status === 1){
                var list = data.data;
                console.log(list);
                // $tableID.html(template("tpl_liankaofenshuxian",list));
            }else{
                $tableID.subDataEmpty(0);
            }

        })
    };
});