define(function (require, exports) {
    var analy = require("analy");
    var template = require("tmpl");
    /*最高分*/
    exports.liankaofenshuxian = function(){
        var param={
            params:["examScoreLine"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            var $tableID = $("#region-xianji-fenshuxian");
            if(data.status === 1){
                var list = data.data;
                $tableID.html(template("tpl_liankaofenshuxian",list));
                analy.outputHtmlToExcel($tableID);
            }else{
                $tableID.subDataEmpty(0);
            }

        })
    };
});