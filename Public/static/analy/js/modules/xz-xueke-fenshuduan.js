define(function (require, exports) {
    var analy = require("analy");
    // var template = require("tmpl");

    //表格数据
    exports.fenshuduan = function(){
        var param={
            params:["subjectSegment"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        $.analyzeHandler(param,function(data){
            var $fenshuduan = $("#j_fenshuduan");
            if(data.status===1){
                var list = data.data;
                var html = "";
                html += '<thead>'+
                    '<tr>'+
                    '<th rowspan="2" width="60"><b>分数段</b></th>';
                for(var i = 0; i < list.length; i++){
                    html += '<th colspan="2"><b>' + list[i].Proposition + '</b></th>'
                };
                html += '</tr>'+
                    '<tr>';
                for(var j = 0; j < list.length; j++){
                    html += '<th><b>本校</b></th>'+
                        '<th><b>本班</b></th>'
                }
                html += '</thead>'+
                    '<tbody>'+
                    '<tr>'+
                    '<td><b>人数</b></td>';
                for(var i = 0; i < list.length; i++){
                    var schoollist = list[i].School;
                    var classlist = list[i].Exam;

                    html+= '<td>' + classlist.UserNum + '</td>';
                    html+= '<td>' + schoollist.UserNum + '</td>';
                }
                html +=  '</tr>'+
                    '<tr>'+
                    '<td><b>人数累计</b></td>';
                for(var i = 0; i < list.length; i++){
                    var schoollist = list[i].School;
                    var classlist = list[i].Exam;

                    html+= '<td>' + classlist.UserSum + '</td>';
                    html+= '<td>' + schoollist.UserSum + '</td>';
                }
                html +=  '</tr>';
                html += '<tr>'+
                    '<td><b>百分比%</b></td>';
                for(var i = 0; i < list.length; i++){
                    var schoollist = list[i].School;
                    var classlist = list[i].Exam;

                    html+= '<td>' + classlist.UserRate + '</td>'+
                        '<td>' + schoollist.UserRate + '</td>';
                }
                html +=  '</tr>';

                $fenshuduan.html(html);
                analy.outputHtmlToExcel($fenshuduan);


                /*echart表*/
                var eachArr = function(num,opt){
                    var arr = [];
                    var newList = data.data;
                    for(var i = 0 ; i < newList.length; i++){
                        var item = newList[i][num][opt];
                        if(item === null){
                            item = "--"
                        }
                        arr.push(item)
                    }
                    return arr;
                };
                var opts = {};
                var json = data.data;
                opts.name = ["本校分数段","本班分数段"];
                opts.series = [];
                opts.series[0] = eachArr("School","UserRate");
                opts.series[1] = eachArr("Exam","UserRate");
                opts.xAxis = [];
                for(var i = 0 ; i < json.length; i++){
                    opts.xAxis.push(json[i]["Proposition"])
                }
                analy.chartScoreSection("#chart_fenshuduan",opts);
            }
        })
    };
});