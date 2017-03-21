define(function (require, exports) {
    var analy = require("analy");
    //表格数据
    exports.fenshuduan = function(){
        var params={
            params:["fractionalSegment"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        $.analyzeHandler(params,function(data){
            var $fenshuduan = $("#j_fenshuduan");
            if(data.status===1){
                var list = data.data;
                console.log(data)
                var html = "";
                html += '<thead>'+
                    '<tr>'+
                    '<th rowspan="2"><b>分数段</b></th>'
                for(var i = 0; i < list.length; i++){
                    html += '<th colspan="2"><b>' + list[i].Proposition + '</b></th>'
                };
                html += '</tr>'+
                    '<tr>';
                for(var i = 0; i < list.length; i++){
                    html += '<th><b>本校</b></th>'+
                        '<th><b>本班</b></th>'
                }
                html += '</thead>'
                html += '<tbody>'+
                    '<tr>'+
                    '<td><b>人数</b></td>'
                for(var i = 0; i < list.length; i++){
                    var schoollist = list[i].School;
                    var classlist = list[i].Class;

                    html+= '<td>' + schoollist.UserNum + '</td>';
                    html+= '<td>' + classlist.UserNum + '</td>';
                }
                html +=  '</tr>'
                html += '<tr>'+
                    '<td><b>人数累计</b></td>'
                for(var i = 0; i < list.length; i++){
                    var schoollist = list[i].School;
                    var classlist = list[i].Class;

                    html+= '<td>' + schoollist.UserSum + '</td>';
                    html+= '<td>' + classlist.UserSum + '</td>';
                }
                html +=  '</tr>';
                html += '<tr>'+
                    '<td><b>百分比%</b></td>'
                for(var i = 0; i < list.length; i++){
                    var schoollist = list[i].School;
                    var classlist = list[i].Class;

                    html+= '<td>' + schoollist.UserRate + '%</td>';
                    html+= '<td>' + classlist.UserRate + '%</td>';
                }
                html +=  '</tr></tbody>'



                $fenshuduan.html(html);
                analy.outputHtmlToExcel($fenshuduan);


                /*echart表*/
                var eachArr = function(num,opt){
                    var arr = [];
                    var newList = data.data;;
                    for(var i = 0 ; i < newList.length; i++){
                        var item = newList[i][num][opt];
                        if(item === null){
                            item = "--"
                        }
                        arr.push(item)
                    }
                    return arr;
                }
                var opts = {};
                opts.name = ["本校分数段","本班分数段"]
                opts.series = [];
                opts.series[0] = eachArr("School","UserRate")
                opts.series[1] = eachArr("Class","UserRate")
                opts.xAxis = [];
                for(var i = 0 ; i < list.length; i++){
                    opts.xAxis.push(list[i]["Proposition"])
                }
                analy.chartScoreSection("#chart_fenshuduan",opts);
            }
        })
    };
});