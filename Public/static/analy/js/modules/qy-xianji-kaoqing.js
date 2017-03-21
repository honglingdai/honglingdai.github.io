define(function (require, exports) {
    var analy = require("analy");
    var template = require("tmpl");
    /*各县考情分析*/
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
                var list = data.data.GroupList;
                $tableID.html(template("tpl_gexiaokaoqing",list));
                analy.isShowMore($tableID,2);
                analy.outputHtmlToExcel($tableID);
            }else{
                $tableID.subDataEmpty(0);
            }
        })
    };
});