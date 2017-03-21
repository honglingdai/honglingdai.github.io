define(function (require, exports) {
    var analy = require("analy");
    /*一本上线率学校排名（前10位以及我区各校上线率）*/

    var $tableID = $("#j_shangxianlvRanking");
    var template = {
        createTable: function (json) {
            var html = '';
            html += '<thead>'+
                '<tr>'+
                '<th><b>学校</b></th>'+
                '<th><b>名次</b></th>'+
                '<th><b>参考人数</b></th>'+
                '<th><b>平均分</b></th>'+
                '<th><b>一本率</b></th>'+
                '<th><b>二本率</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'
            for(var i = 0; i <json.length; i++){
                html += '<tr>'+
                    '<td><b>' + json[i].SchoolName + '</b></td>'+
                    '<td>' + json[i].OrderID + ' </td>'+
                    '<td>' + json[i].SchoolNum + '</td>'+
                    '<td>' + json[i].ScoreAvg + '</td>'+
                    '<td>' + json[i].ALineRate + '%</td>'+
                    '<td>' + json[i].BLineRate + '%</td>'+
                    '</tr>'
            }
            html += '</tbody>';
            return html;
        }
    };
    exports.shangxianlvPangming = function(){
        var param  = {
                params:["schoolLimit"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status === 1){
                $tableID.html(template.createTable(data.data));
                analy.isShowMore($tableID);
                analy.theadfixed($tableID);
                analy.outputHtmlToExcel($tableID);
            }else{
                $tableID.subDataEmpty(0)
            }
        })
    };
});