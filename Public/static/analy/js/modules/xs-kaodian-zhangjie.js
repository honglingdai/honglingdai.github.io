define(function (require, exports, module) {
    require("../getData");
    var analy = require("analy");
    var roleID = $.getRoleID();
    // 章节达成度分析
    exports.zhangjiedacheng =function(){
        // 参数配置
        var param = {
            params:["getKnowledgefenxi"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID:$.cookie("analy_SubjectID"),
            studentID: $.cookie("analy_StudentID")
        };
        if(roleID === "2"){
            // 班主任身份时参数
            param.classID = $.cookie("analy_ClassID")
        }

        $.analyzeHandler(param,function(data){
            // 表格ID
            var $table = $('#j_zhangjiedcdTable');
            if(data.status === 1){
                var json = data.data;
                var table = "";
                var tr = json.length;
                table +='<thead>'+
                    '<tr>'+
                    '<th><b>知识点</b></th>'+
                    '<th width="100"><b>总分</b></th>'+
                    '<th width="100"><b>个人得分</b></th>'+
                    '<th width="100"><b>A线达标分</b></th>'+
                    '<th width="100"><b>B线达标分</b></th>'+
                    '<th width="100"><b>等级</b></th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody>';
                for(var i =0; i < tr; i++){
                    table+= '<tr>'+
                        '<td>'+ json[i].KlName +'</td>'+
                        '<td>'+ json[i].ScoreSum +'</td>'+
                        '<td>'+ json[i].Score +'</td>'+
                        '<td>'+ json[i].ALine +'</td>'+
                        '<td>'+ json[i].BLine +'</td>'+
                        '<td>'+ json[i].Level +'</td>'+
                        '</tr>'
                }
                table+= '</tbody>';
                $table.html(table);
                // 展示5行，多出隐藏
                analy.isShowMore($table,5);
                // 表头固定
                analy.theadfixed($table);
                // 导出Excel表格
                analy.outputHtmlToExcel($table);
            }else{
                // 数据为空时显示
                $table.subDataEmpty(0);
            }
        })

    };
});