define(function (require, exports, module) {
    require("../getData");
    var analy = require("analy");

// 各小题得分分析
exports.kaodianfenxi =function(){
    // 定义参数
    var param = {
        params:["getSubjectAnalysis"],
        userID: $.cookie("yj_front_UserID"),
        examID: $.cookie("analy_ExamID"),
        subjectID:$.cookie("analy_SubjectID"),
        studentID: $.cookie("analy_StudentID")
    };
    if(role === "1"){
        // 老师权限参数
        param.subjectID = $.cookie("analy_SubjectID");
        param.classID = $.cookie("analy_ClassID")
    }else if(role === "2"){
        // 班主任权限参数
        param.classID = $.cookie("analy_ClassID")
    }
    $.analyzeHandler(param,function(data){
        var $table = $("#j_subTestAnalyTable");
        if(data.status === 1){
            var json = data.data;
            var table = "";
            var tr = json.length;
            table +='<thead>'+
                '<tr>'+
                '<th width=40"><b>题号</b></th>'+
                '<th width="60"><b>题型</b></th>'+
                '<th width="60"><b>分值</b></th>'+
                '<th><b>知识点</b></th>'+
                '<th width="60"><b>难度</b></th>'+
                '<th width="60"><b>校均得分</b></th>'+
                '<th width="60"><b>班均得分</b></th>'+
                '<th width="60"><b>个人得分</b></th>'+
                '<th width="60"><b>本人作答</b></th>'+
                '<th width="60"><b>正确答案</b></th>'+
                '<th width="60"><b>视频解析</b></th>   '+
                '</tr>'+
                '</thead>'+
                '<tbody>';
            for(var i =0; i < tr; i++){
                table+= '<tr>'+
                    '<td>'+ json[i].OrderID +'</td>'+
                    '<td>'+ json[i].TypesName +'</td>'+
                    '<td>'+ json[i].Score +'</td>'+
                    '<td>'+ json[i].KlName +'</td>'+
                    '<td>'+ json[i].Diff +'</td>'+
                    '<td>'+ json[i].SchoolAvg +'</td>'+
                    '<td>'+ json[i].ClassAvg +'</td>'+
                    '<td>'+ json[i].Mark +'</td>'+
                    '<td>'+ json[i].MyAnswer +'</td>'+
                    '<td>'+ json[i].Answer +'</td>'+
                    '<td>'+ json[i].Analytic +'</td>'+
                    '</tr>'
            }
            table+= '</tbody>';

            $table.html(table);
            // 表格最多显示几行
            analy.isShowMore($table,4);
            // 表头滚动时固定
            analy.theadfixed($table);
            // 导出Excel表格
            analy.outputHtmlToExcel($table);
        }else{
            $table.subDataEmpty(0);
        }
    })

}
});