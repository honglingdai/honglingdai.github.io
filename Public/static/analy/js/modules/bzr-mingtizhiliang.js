define(function (require, exports) {
    var analy = require("analy");
    // 命题质量概况
    exports.mingtizhiliang = function(){
        var param = {
            params:["propositionQuality"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };

        $.analyzeHandler(param,function(data){
            var $table = $("#j_mingtizhilianggaikuang");
            if(data.status === 1){
                // 动态生成内容
                var html = exports.bzrzhiliangtable(data);
                $table.html(html);
                // 导出excel
                analy.outputHtmlToExcel($table);
            }else{
                // 数据为空时
                $table.subDataEmpty(0)
            }
        })
    };
    // 班主任命题质量
    exports.bzrzhiliangtable = function(data){
        var json = data.data;
        var html = '';
        html += '<thead>'+
            '<tr>'+
            '<th width="180"><b>分析指标</b></th>';
        for(var i = 0; i< json.length;i++){
            html += '<th><b>' + json[i].SubjectName + '</b></th>'
        }
        html += '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td><b>试卷信度</b></td>';
        for(var j = 0; j< json.length;j++){
            html += '<td>' + json[j].Reliability + '</td>'
        }
        html += '</tr><tr>'+
            '<td><b>试卷信度</b></td>';
        for(var k = 0; k< json.length;k++){
            html += '<td>' + json[k].Diff + '</td>'
        }
        html += '</tr><tr>'+
            '<td><b>试卷区分度</b></td>';
        for(var m = 0; m< json.length;m++){
            html += '<td>' + json[m].Distinguish + '</td>'
        }
        html += '</tr><tr>'+
            '<td><b>满分人数</b></td>';
        for(var n = 0; n< json.length;n++){
            html += '<td>' + json[n].TotalNum + '</td>'
        }
        html += '</tr><tr>'+
            '<td><b>命题评价</b></td>';
        for(var l = 0; l< json.length;l++){
            html += '<td>' + json[l].Evaluate + '</td>'
        }
        html += '</tbody>';
        return html;
    }
});