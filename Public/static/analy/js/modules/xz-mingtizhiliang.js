define(function (require, exports) {
    var analy = require("analy");

    // 命题质量概况
    exports.mingtizhiliang = function(){
        var param = {
            params:["subjectQuality"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        if(role == 5){
            param.params = ["proQuality"];
            param.areaID = $.cookie("analy_AreaID");
            // delete param.schoolID
        }
        $.analyzeHandler(param,function(data){
            var $table = $("#j_mingtizhiliang");
            if(data.status === 1){
                var html = exports.xzzhiliangtable(data);
                $table.html(html);
                analy.outputHtmlToExcel($table);
            }else{
                $table.subDataEmpty(0)
            }
        })
    };
    // 校长命题质量
    exports.xzzhiliangtable = function(data){
        var json = data.data;
        var html = '';
        html += '<thead>'+
            '<tr>'+
            '<th><b>分析指标</b></th>';
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
        for(var l = 0; l< json.length;l++){
            html += '<td>' + json[l].Distinguish + '</td>'
        }
        html += '</tr><tr>'+
            '<td><b>满分人数</b></td>';
        for(var m = 0; m< json.length;m++){
            html += '<td>' + json[m].TotalNum + '</td>'
        }
        html += '</tr><tr>'+
            '<td><b>命题评价</b></td>';
        for(var n = 0; n< json.length;n++){
            html += '<td>' + json[n].Evaluate + '</td>'
        }
        html += '</tbody>';
        return html;
    }
});