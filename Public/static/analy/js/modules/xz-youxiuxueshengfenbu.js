define(function (require, exports) {
    var analy = require("analy");
    var $j_youxiuxuesheng = $("#j_youxiuxuesheng");

    var template = {
        createtable:function(json){
            var SchoolList = json.SchoolList,
                MinScore = json.MinScore,
                html = "";
            html += '<thead>'+
                '<tr>'+
                '<th><b>联考</b></th>'+
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
            for(var j = 0 ; j < MinScore.length; j++){
                html += '<td>'+MinScore[j]+'</td>'
            }
            html += '</tr>';
            for(var m = 0; m < SchoolList.length;m++){
                var SchoolNum = SchoolList[m].SchoolNum;
                html += '<tr>' +
                    '<td><b>'+SchoolList[m].SchoolName+'</b></td>';
                for(var n =0 ; n < SchoolNum.length; n++){
                    html += '<td>'+SchoolNum[n]+'</td>'
                }
                html += '</tr>'
            }
            html += '</tbody>';
            return html;
        }
    };

    // 校长联考优秀学生分布
    exports.rector_youxiuxuesheng = function(){
        var param={
            params:["examGoodUser"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        if(role == 5){
            //区域ID参数
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                //表格
                $j_youxiuxuesheng.html(template.createtable(data.data));
                analy.isShowMore($j_youxiuxuesheng);
                analy.outputHtmlToExcel($j_youxiuxuesheng);
            }else{
                $j_youxiuxuesheng.subDataEmpty(0);
            }
        })
    };
    // 区域联考优秀学生分布
    exports.region_youxiuxuesheng = function(){
        var param={
            params:["areaGoodUser"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID: $.cookie("analy_AreaID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                //表格
                $j_youxiuxuesheng.html(template.createtable(data.data));
                analy.isShowMore($j_youxiuxuesheng);
                analy.outputHtmlToExcel($j_youxiuxuesheng);
            }else{
                $j_youxiuxuesheng.subDataEmpty(0);
            }
        })
    };

    /*优秀学生分布*/
    // exports.youxiuxuesheng = function(){
    //     var param={
    //         params:["examGoodUser"],
    //         userID: $.cookie("yj_front_UserID"),
    //         examID: $.cookie("analy_ExamID"),
    //         schoolID:$.cookie("analy_SchoolID")
    //     };
    //     $.analyzeHandler(param,function(data){
    //
    //         var $tableID = $("#j_youxiuxuesheng");
    //         if(data.status ===1){
    //             var json = data.data;
    //             var Count = json.Count;
    //             var SchoolList = json.SchoolList;
    //             var MinScore = json.MinScore;
    //             var html = "";
    //             html += '<thead>'+
    //                 '<tr>'+
    //                 '<th><b>联考</b></th>'+
    //                 '<th><b>前 10 名</th>'+
    //                 '<th><b>前 20 名</th>'+
    //                 '<th><b>前 30 名</th>'+
    //                 '<th><b>前 50 名</th>'+
    //                 '<th><b>前 100 名</th>';
    //             html += '</tr>'+
    //                 '</thead>'+
    //                 '<tbody>'+
    //                 '<tr>'+
    //                 '<td><b>最低分</b></td>';
    //             for(var j = 0 ; j < MinScore.length; j++){
    //                 html += '<td>'+MinScore[j]+'</td>'
    //             }
    //             html += '</tr>';
    //             for(var m = 0; m < SchoolList.length;m++){
    //                 var SchoolNum = SchoolList[m].SchoolNum;
    //                 html += '<tr>' +
    //                     '<td><b>'+SchoolList[m].SchoolName+'</b></td>';
    //                 for(var n =0 ; n < SchoolNum.length; n++){
    //                     html += '<td>'+SchoolNum[n]+'</td>'
    //                 }
    //                 html += '</tr>'
    //             }
    //             html += '</tbody>';
    //
    //             $tableID.html(html);
    //             analy.isShowMore($tableID);
    //             analy.theadfixed($tableID);
    //             analy.outputHtmlToExcel($tableID);
    //         }else{
    //             $tableID.subDataEmpty(0)
    //         }
    //     })
    // };
});