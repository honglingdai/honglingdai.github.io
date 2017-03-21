define(function (require, exports) {
    var analy = require("analy");

    /*本校各班级考试情况*/
    exports.gebanqingkuang = function(){
        var param = {
            params:["getClassInfo"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){
            var $tableID = $("#j_gebanqingkuang");
            if(data.status ===1){
                //table
                var json = data.data;
                var ClassList = json.ClassList;

                var html = '';
                html += '<thead>'+
                    '<tr>'+
                    '<th rowspan="2"><b>教学团体</b></th>'+
                    '<th rowspan="2"><b>实考人数</b></th>'+
                    '<th rowspan="2"><b>平均分</b></th>'+
                    '<th rowspan="2"><b>最高分</b></th>'+
                    '<th colspan="3"><b>一本上线人数</b></th>'+
                    '<th rowspan="2"><b>一本率</b></th>'+
                    '<th colspan="3"><b>二本上线人数（含一本）</b></th>'+
                    '<th rowspan="2"><b>二本率</b></th>'+
                    '<th rowspan="2"><b>一本临界</b></th>'+
                    '<th rowspan="2"><b>二本临界</b></th>'+
                    '<th rowspan="2"><b>分化程度</b></th>'+
                    '<th rowspan="2"><b>特优生人数</b></th>'+
                    '</tr>'+
                    '<tr>'+
                    '<th><b>应届</b></th>'+
                    '<th><b>往届</b></th>'+
                    '<th><b>总计</b></th>'+
                    '<th><b>应届</b></th>'+
                    '<th><b>往届</b></th>'+
                    '<th><b>总计</b></th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody>';
                for(var i = 0; i <ClassList.length; i++){
                    var AOnLine = ClassList[i].AOnLine;
                    var BOnLine = ClassList[i].BOnLine;
                    html += '<tr>'+
                        '<td><b>' + ClassList[i].GroupName + '</b></td>'+
                        '<td>' + ClassList[i].UserNum + ' </td>'+
                        '<td>' + ClassList[i].AvgScore + '</td>'+
                        '<td>' + ClassList[i].MaxScore + '</td>'+
                        '<td>' + AOnLine.NowNum + '</td>'+
                        '<td>' + AOnLine.PreviousNum + '</td>'+
                        '<td>' + AOnLine.Count + '</td>'+
                        '<td>' + ClassList[i].ALineRate + '</td>'+
                        '<td>' + BOnLine.NowNum + '</td>'+
                        '<td>' + BOnLine.PreviousNum + '</td>'+
                        '<td>' + BOnLine.Count + '</td>'+
                        '<td>' + ClassList[i].BLineRate + '</td>'+
                        '<td>' + ClassList[i].ACritical + '</td>'+
                        '<td>' + ClassList[i].BCritical + '</td>'+
                        '<td>' + ClassList[i].Differentiation + '</td>'+
                        '<td>' + ClassList[i].SUserNum + '</td>'+
                        '</tr>'
                }
                html += '</tbody>';

                $tableID.html(html);
                analy.isShowMore($tableID);
                analy.theadfixed($tableID);
                analy.outputHtmlToExcel($tableID);
            }else{
                $tableID.subDataEmpty(0)
            }
        })
    };

    /*校长--本校各班级考试情况*/
    exports.gebanqingkuangRector = function(){
        var param = {
            params:["getClassInfo"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        if(role == 5){
            //区域ID参数
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param,function(data){
            var $tableID = $("#j_gebanqingkuang");
            if(data.status === 1){
                //table
                var json = data.data;
                var html = '';
                html += '<thead>'+
                    '<tr>'+
                    '<th><b>教学团体</b></th>'+
                    '<th><b>实考人数</b></th>'+
                    '<th><b>平均分</b></th>'+
                    '<th><b>最高分</b></th>'+
                    '<th><b>一本率</b></th>'+
                    '<th><b>二本率</b></th>'+
                    '<th><b>差生人数</b></th>'+
                    '<th><b>分化程度</b></th>'+
                    '<th><b>前100名分布</b></th>'+
                    '</tr>'+
                    '</thead><tbody>';
                for(var i = 0; i <json.length; i++){
                    html += '<tr>'+
                        '<td><b>' + json[i].GroupName + '</b></td>'+
                        '<td>' + json[i].ClassNum + ' </td>'+
                        '<td>' + json[i].AvgScore + '</td>'+
                        '<td>' + json[i].MaxScore + '</td>'+
                        '<td>' + json[i].AOnLineRate + '%</td>'+
                        '<td>' + json[i].BOnLineRate + '%</td>'+
                        '<td>' + json[i].BadUserNum + '</td>'+
                        '<td>' + json[i].Differentiation + '</td>'+
                        '<td>' + json[i].OrderNum100 + '</td>'+
                        '</tr>'
                }
                html += '</tbody>';



                $tableID.html(html);
                analy.isShowMore($tableID);
                analy.theadfixed($tableID);
                analy.outputHtmlToExcel($tableID);
            }else{
                $tableID.subDataEmpty(0)
            }


        })
    };
});