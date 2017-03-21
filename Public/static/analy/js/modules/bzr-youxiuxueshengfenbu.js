define(function (require, exports) {
    var analy = require("analy");
    /*优秀学生分布*/
    exports.youxiuxuesheng = function(){
        var param={
            params:["examGoodUser"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){

            var $tableID = $("#j_youxiuxuesheng");
            if(data.status ===1){
                var json = data.data;
                //table
                var Count = json.Count;
                var ClassList = json.ClassList;
                var MinScore = json.MinScore;
                var html = "";
                html += '<thead>'+
                    '<tr>'+
                    '<th><b>本校（班级）</b></th>'+
                    '<th><b>前 10 名</th>'+
                    '<th><b>前 20 名</th>'+
                    '<th><b>前 30 名</th>'+
                    '<th><b>前 50 名</th>'+
                    '<th><b>前 100 名</th>';
                html += '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                    '<tr>'+
                    '<td><b>最低分</b></td>';
                for(var i = 0 ; i < MinScore.length; i++){
                    html += '<td>'+MinScore[i]+'</td>'
                }
                html += '</tr>';
                for(var i = 0; i < ClassList.length;i++){
                    var ClassNum = ClassList[i].ClassNum;
                    html += '<tr>' +
                        '<td><b>'+ClassList[i].ClassName+'</b></td>';
                    for(var j =0 ; j < ClassNum.length; j++){
                        html += '<td>'+ClassNum[j]+'</td>'
                    }
                    html += '</tr>'
                }
                html += '<tr>'+
                    '<td><b>总计</b></td>';
                for(var i = 0 ; i < Count.length; i++){
                    html += '<td>'+Count[i]+'</td>'
                }
                html += '</tr></tbody>';
                // 插入表格
                $tableID.html(html);
                // 表格显示行数
                analy.isShowMore($tableID);
                // 表格头部固定
                analy.theadfixed($tableID);
                // 导出excel
                analy.outputHtmlToExcel($tableID);
            }else{
                // 数据为空时
                $tableID.subDataEmpty(0);
            }
        })
    };
});