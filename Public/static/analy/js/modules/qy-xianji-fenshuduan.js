define(function (require, exports) {
    var analy = require("analy");
    var template = require("tmpl");
    /*最高分*/
    exports.fenshuduan = function(){
        var param={
            params:["fractionalSegment"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            var $tableID = $("#region-xianji-fenshuduan");
            if(data.status === 1){
                var list = data.data.AreaList,
                    Proposition = list[0].ProList;
                var html = "";
                html += '<thead>'+
                    '<tr>'+
                    '<th rowspan="2" width="60"><b>县（区）</b></th>';
                for(var i = 0; i < Proposition.length; i++){
                    html += '<th colspan="2"><b>' + Proposition[i].Proposition + '</b></th>'
                }
                html += '</tr>'+
                    '<tr>';
                for(var j = 0; j < Proposition.length; j++){
                    html += '<th><b>人数</b></th>'+
                        '<th><b>累计</b></th>'
                }
                html += '</thead>'+
                    '<tbody>';
                for(var k = 0; k < list.length; k++){
                    html += '<tr>' +
                        '<th>'+list[k].AreaName+'</th>';
                    var scoreList = list[k].ProList;
                    for(var f = 0 ; f < scoreList.length; f++){
                        html += '<th>'+scoreList[f].UserNum+'</th>'+
                            '<th>'+scoreList[f].UserSum+'</th>'
                    }
                    html +='</tr>'
                }
                html +=  '</tbody>';

                $tableID.html(html);
                analy.isShowMore($tableID,2);
                analy.outputHtmlToExcel($tableID);
            }else{
                $tableID.subDataEmpty(0);
            }
        })
    };
});