define(function (require, exports) {
    var analy = require("analy");
    /*优秀学生分布*/
    exports.youxiuxuesheng = function(){
        var param={
            params:["subjectGoodUser"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        $.analyzeHandler(param,function(data){
            var $tableID = $("#j_liankao-youxiuxuesheng");
            if(data.status ===1){
                var json = data.data;
                //table
                var Count = json.Count;
                var SchoolList = json.SchoolList;
                var MinScore = json.MinScore;
                var html = "";
                html += '<thead>'+
                    '<tr>'+
                    '<th><b>学校</b></th>'+
                    '<th><b>前 10 名</b></th>' +
                    '<th><b>前 20 名</b></th>'+
                    '<th><b>前 30 名</b></th>'+
                    '<th><b>前 50 名</b></th>'+
                    '<th><b>前 100 名</b></th>';
                html += '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                    '<tr>'+
                    '<td><b>最低分</b></td>';
                for(var i = 0 ; i < MinScore.length; i++){
                    html += '<td>'+MinScore[i]+'</td>'
                }
                html += '</tr>';
                for(var i = 0; i < SchoolList.length;i++){
                    var SchoolNum = SchoolList[i].SchoolNum;
                    html += '<tr>' +
                        '<td><b>'+SchoolList[i].SchoolName+'</b></td>';
                    for(var j =0 ; j < SchoolNum.length; j++){
                        html += '<td>'+SchoolNum[j]+'</td>'
                    }
                    html += '</tr>'
                }
                html += '<tr><td><b>总计</b></td>';
                for(var i = 0; i < Count.length;i++){
                    html += '<td>'+Count[i]+'</td>'
                }
                html += '</tr>'+
                    '</tbody>';
                $tableID.html(html);
                analy.isShowMore($tableID);
                analy.theadfixed($tableID);
                analy.outputHtmlToExcel($tableID);
            }else{
                // 数据为空时
                $tableID.subDataEmpty(0);

            }
        })
    };
});