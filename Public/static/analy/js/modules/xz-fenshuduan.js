define(function (require, exports) {
    var analy = require("analy");
    //表格数据
    exports.fenshuduan = function(){
        var param={
            params:["fractionalSegment"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        $.analyzeHandler(param,function(data){

            var $fenshuduan = $("#j_fenshuduan");

            if(data.status===1){
                var json = data.data
                // 分数段总结
                var tpl = '本次考试高分段（'+
                    '<span class="text-primary">'+json.HighScore+'分</span>）人数总计 '+
                    '<span class="text-primary">'+json.ExamHighScoreNum+'</span> 人，占考生人数 '+
                    '<span class="text-primary">'+json.ExamHighScoreRate+'%</span>；我校高分段人数 '+
                    '<span class="text-primary">'+json.SchoolHighScoreNum+'</span> 人，占全校考生人数的 '+
                    '<span class="text-primary">'+json.SchoolHighScoreRate+'%</span> 。其他分数段分布图如下：'
                $("#j_fenshuduanDesc").html(tpl);

                var list = data.data.ScoreList;
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
                    var classlist = list[i].Exam;

                    html+= '<td>' + classlist.UserNum + '</td>';
                    html+= '<td>' + schoollist.UserNum + '</td>';
                }
                html +=  '</tr>'
                html += '<tr>'+
                    '<td><b>人数累计</b></td>'
                for(var i = 0; i < list.length; i++){
                    var schoollist = list[i].School;
                    var classlist = list[i].Exam;

                    html+= '<td>' + classlist.UserSum + '</td>';
                    html+= '<td>' + schoollist.UserSum + '</td>';
                }
                html +=  '</tr>';
                html += '<tr>'+
                    '<td><b>百分比%</b></td>'
                for(var i = 0; i < list.length; i++){
                    var schoollist = list[i].School;
                    var classlist = list[i].Exam;

                    html+= '<td>' + classlist.UserRate + '%</td>';
                    html+= '<td>' + schoollist.UserRate + '%</td>';
                }
                html +=  '</tr>';

                $fenshuduan.html(html);
                analy.outputHtmlToExcel($fenshuduan);

                /*echart表*/
                var eachArr = function(num,opt){
                    var arr = [];
                    var newList = data.data.ScoreList;
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
                var json = data.data.ScoreList;
                opts.name = ["总体分数段","本校分数段"]
                opts.series = [];
                opts.series[0] = eachArr("Exam","UserRate")
                opts.series[1] = eachArr("School","UserRate")
                opts.xAxis = [];
                for(var i = 0 ; i < json.length; i++){
                    opts.xAxis.push(json[i]["Proposition"])
                }
                analy.chartScoreSection("#chart_fenshuduan",opts);
            }
            else{
                // 数据为空时
                $fenshuduan.subDataEmpty(0);
            }
        })
    };
});