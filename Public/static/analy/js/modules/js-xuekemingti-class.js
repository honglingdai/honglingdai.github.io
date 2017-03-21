define(function (require, exports) {
    var analy = require("analy");

    //学科命题分析
    exports.xuekemingti = function(){
        // 参数配置
        var param = {
            params:['teachersubjectProposition'],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        //校长权限参数
        if(role === "4"){
            param.params = ["subjectProposition"];
            param.schoolID = $.cookie("analy_SchoolID")
        }
        $.analyzeHandler(param,function(data){
            // 获取表格ID
            var $j_xuekemingti = $("#j_xuekemingti");
            if(data.status===1){
                var table = "";
                var json = data.data;
                var tr = json.TestList;
                // 动态生成内容
                table +='<thead>'+
                    '<tr>'+
                    '<th width="40"><b>题号</b></th>'+
                    '<th width="60"><b>题型</b></th>'+
                    '<th width="40"><b>分值</b></th>'+
                    '<th width="120"><b>所属知识板块</b></th>'+
                    '<th><b>知识点</b></th>'+
                    '<th width="80"><b>认知水平</b></th>'+
                    '<th width="80"><b>考查能力</b></th>'+
                    '<th width="80"><b>预计难度</b></th>'+
                    '<th width="80"><b>实测难度</b></th>'+
                    '<th width="80"><b>实测区分度</b></th>'+
                    '<th width="80"><b>答案</b></th>'+
                    '</tr>'+
                    '</thead>'+
                     '<tbody>';
                for(var i =0; i < tr.length; i++){
                    table+= '<tr>'+
                        '<td>'+ tr[i].OrderID +'</td>'+
                        '<td>'+ tr[i].TypesName +'</td>'+
                        '<td>'+ tr[i].Score +'</td>'+
                        '<td>'+ tr[i].KlPlate +'</td>'+
                        '<td>'+ tr[i].KlName +'</td>'+
                        '<td>'+ tr[i].Cognition +'</td>'+
                        '<td>'+ tr[i].TestAbility +'</td>'+
                        '<td>'+ tr[i].Diff +'</td>'+
                        '<td>'+ tr[i].TrueDiff +'</td>'+
                        '<td>'+ tr[i].Distinguish +'</td>'+
                        '<td>'+ tr[i].Answer +'</td>'+
                        '</tr>'
                }
                table+= '</tbody>';
                $j_xuekemingti.html(table);
                // 表格默认显示1行
                analy.isShowMore( $j_xuekemingti,1);
                // 头部高度固定
                analy.theadfixed( $j_xuekemingti);
                // 导出Excel
                analy.outputHtmlToExcel( $j_xuekemingti);
            }else{
                $j_xuekemingti.subDataEmpty(0);
            }
        })
    };
});