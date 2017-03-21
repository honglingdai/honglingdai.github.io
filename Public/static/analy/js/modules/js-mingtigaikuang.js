define(function (require, exports) {
    var analy = require("analy");

    // 命题质量概况
    exports.mingtizhiliang = function(){
        // 参数配置
        var param,
            baseParam = {
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                subjectID:$.cookie("analy_SubjectID")
            },
            // 学科老师权限参数
            param_Teacher = {
                params:["propositionQuality"],
                classID:$.cookie("analy_ClassID")
            },
            // 班主任权限参数
            param_Bzr = {
                params:["proposition"],
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                params:["proposition"],
                schoolID: $.cookie("analy_SchoolID")
            },
            // 区域权限
            param_Region = {
                params:["proposition"],
                schoolID: $.cookie("analy_SchoolID"),
                areaID: $.cookie("analy_AreaID")
            };
        // 根据身份id 配置参数
        switch(role){
            case "1" : param = $.extend({},baseParam,param_Teacher);
                break;
            case "2" : param = $.extend({},baseParam,param_Bzr);
                break;
            case "4" : param = $.extend({},baseParam,param_Rector);
                break;
            case "5" : param = $.extend({},baseParam,param_Region);
                break;
        }
        $.analyzeHandler(param,function(data){
            var $table = $("#j_mingtizhilianggaikuang");
            if(data.status === 1){
                var html = exports.zhiliangtable(data);
                $table.html(html);
                analy.outputHtmlToExcel($table);
            }
            else{
                $table.subDataEmpty(0)
            }
        })
    };
    // 老师命题质量
    exports.zhiliangtable = function(data){
        var json = data.data;
        var html = '';
        html += '<thead>'+
            '<tr>'+
            '<th width="180"><b>分析指标</b></th>'+
            '<th><b>数据</b></th>'+
            '<th><b>评价</b></th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>'+
            '<tr>'+
            '<td><b>试卷信度</b></td>'+
            '<td>' + json.Reliability.Data + '</td>'+
            '<td>' + json.Reliability.Evaluate + '</td>'+
            '</tr>'+
            '<tr>'+
            '<td><b>试卷难度</b></td>'+
            '<td>' + json.Diff.Data + '</td>'+
            '<td>' + json.Diff.Evaluate + '</td>'+
            '</tr><tr>'+
            '<td><b>试卷区分度</b></td>'+
            '<td>' + json.Distinguish.Data + '</td>'+
            '<td>' + json.Distinguish.Evaluate + '</td>'+
            '</tr><tr>'+
            '<td><b>过于简单试题</b></td>'+
            '<td colspan="2">'+ json.EasyTest +'</td>'+
            '</tr><tr>'+
            '<td><b>命题太难试题</b></td>'+
            '<td colspan="2">' + json.HardTest + '</td>'+
            '</tr> <tr>'+
            '<td><b>区分度太低试题</b></td>'+
            '<td colspan="2">' + json.DistinguishLow + '</td>'+
            '</tr><tr>'+
            '<td><b>命题精彩题目</b></td>'+
            '<td colspan="2">' + json.GoodProposition + '</td>'+
            '</tr>'+
            '</tbody>';
        return html;
    }
});