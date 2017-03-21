define(function (require, exports) {
    var analy = require("analy");

    //分数段
    exports.fenshuduan = function(){
        var param={
            params:["fractionalSegment"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };

        $.analyzeHandler(param,function(data){
            var $fenshuduan = $("#j_fenshuduan");
            if(data.status===1){
                var list = data.data;
                var html = "";
                html += '<thead>'+
                    '<tr>'+
                    '<th width="60" rowspan="2"><b>分数段</b></th>';
                for(var i = 0; i < list.length; i++){
                    html += '<th colspan="2"><b>' + list[i].Proposition + '</b></th>'
                }
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
                for(var k = 0; k < list.length; k++){
                    var schoollist = list[k].School;
                    var classlist = list[k].Class;

                    html+= '<td>' + classlist.UserNum + '</td>';
                    html+= '<td>' + schoollist.UserNum + '</td>';
                }
                html +=  '</tr>'+
                    '<tr>'+
                    '<td><b>人数累计</b></td>';
                for(var l = 0; l < list.length; l++){
                    var schoollist = list[l].School;
                    var classlist = list[l].Class;

                    html+= '<td>' + classlist.UserSum + '</td>'+
                        '<td>' + schoollist.UserSum + '</td>';
                }
                html +=  '</tr>'+
                    '<tr>'+
                    '<td><b>百分比%</b></td>';
                for(var m = 0; m < list.length; m++){
                    var schoollist = list[m].School;
                    var classlist = list[m].Class;

                    html+= '<td>' + classlist.UserRate + '</td>'+
                        '<td>' + schoollist.UserRate + '</td>';
                }
                html +=  '</tr>';
                // 生成表格
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
                // 图表参数
                var opts = {};
                var json = data.data;
                opts.name = ["本校分数段","本班分数段"];
                opts.series = [];
                opts.series[0] = eachArr("School","UserRate");
                opts.series[1] = eachArr("Class","UserRate");
                opts.xAxis = [];
                for(var i = 0 ; i < json.length; i++){
                    opts.xAxis.push(json[i]["Proposition"])
                }
                $("#chart_fenshuduan").height(400);
                analy.chartScoreSection("#chart_fenshuduan",opts);
            }
            else{
                // 数据为空时
                $fenshuduan.subDataEmpty(0)
            }
        })
    };
});