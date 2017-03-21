define(function (require, exports) {
    var analy = require("analy");
    // 本校各班级考试情况
    var template = {
        createTable:function(json){
            var GroupList = json.GroupList;
            var table = "";
            table +='<thead>'+
                '<tr>'+
                '<th rowspan="2" width="120"><b>教学团体</b></th>'+
                '<th rowspan="2"><b>实考人数</b></th>'+
                '<th rowspan="2"><b>平均分</b></th>'+
                '<th rowspan="2"><b>最高分</b></th>'+
                '<th colspan="3"><b>一本上线人数</b></th>'+
                '<th rowspan="2"><b>一本率</b></th>'+
                '<th colspan="3"><b>二本上线人数</b></th>'+
                '<th rowspan="2"><b>二本率</b></th>'+
                '<th rowspan="2"><b>一本临界</b></th>'+
                '<th rowspan="2"><b>二本临界</b></th>'+
                '<th rowspan="2"><b>分化程度</b></th>'+
                '<th rowspan="2"><b>优等生人数</b></th>'+
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
            for(var i = 0 ; i <GroupList.length;i++){
                table += '<tr>'+
                '<td><b>'+ GroupList[i].GroupName +'</b></td>'+
                '<td>'+GroupList[i].UserNum+'</td>'+
                '<td>'+GroupList[i].AvgScore+'</td>'+
                '<td>'+GroupList[i].MaxScore+'</td>'+
                '<td>'+GroupList[i].AOnLine.NowNum+'</td>'+
                '<td>'+GroupList[i].AOnLine.PreviousNum+'</td>'+
                '<td>'+GroupList[i].AOnLine.Count+'</td>'+
                '<td>'+GroupList[i].ALineRate+'</td>'+
                '<td>'+GroupList[i].BOnLine.NowNum+'</td>'+
                '<td>'+GroupList[i].BOnLine.PreviousNum+'</td>'+
                '<td>'+GroupList[i].BOnLine.Count+'</td>'+
                '<td>'+GroupList[i].BLineRate+'</td>'+
                '<td>'+GroupList[i].ACritical+'</td>'+
                '<td>'+GroupList[i].BCritical+'</td>'+
                '<td>'+GroupList[i].Differentiation+'</td>'+
                '<td>'+GroupList[i].SUserNum+'</td>'+
                '</tr>'
            }
            table += '</tbody>';
            return table;
        }
    };

    // 校级主管报告-本校各班级考试情况
    exports.region_gebanqingkuang = function(){
        var param={
            params:["areaSchoolInfo"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                var $table = $("#qy_xiaoji_shangxian");
                console.log(data.data)
                //表格
                $table.html(template.createTable(data.data));
                analy.isShowMore($table);
                analy.outputHtmlToExcel($table);

            }else{
                // 数据为空时
                $table.subDataEmpty(0);
            }
        })
    };
});