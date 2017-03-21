define(function (require, exports) {
    var analy = require("analy");

    // 客观题选项分析
    exports.keguantifenxi = function(){
        // 参数配置
        var param,
            baseParam = {
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                subjectID:$.cookie("analy_SubjectID")
            },
            // 学科老师权限参数
            param_teacher = {
                params:["teacheritemAnalysis"],
                classID:$.cookie("analy_ClassID")
            },
            // 班主任权限参数
            param_master = {
                params:["chooseAnalysis"],
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                params:["itemAnalysis"],
                schoolID: $.cookie("analy_SchoolID")
            },
            // 区域权限
            param_Region = {
                params:["chooseAnalysis"],
                schoolID: $.cookie("analy_SchoolID"),
                areaID: $.cookie("analy_AreaID")
            };
        // 根据身份id 配置参数
        var roleID = $.getRoleID();
        switch(roleID){
            case "1" : param = $.extend({},baseParam,param_teacher);
                break;
            case "2" : param = $.extend({},baseParam,param_master);
                break;
            case "4" : param = $.extend({},baseParam,param_Rector);
                break;
            case "5" : param = $.extend({},baseParam,param_Region);
                break;
            default: param = $.extend({},baseParam,param_Rector)
        }

        $.analyzeHandler(param,function(data){
            var $j_keguantifenxi = $("#j_keguantifenxi");
            if(data.status===1){
                var table = "",
                    tr = data.data;
                table +='<thead>'+
                    '<tr>'+
                    '<th width="40"><b>题号</b></th>'+
                    '<th width="85"><b>题型</b></th>'+
                    '<th><b>知识点</b></th>'+
                    '<th width="85"><b>预计难度</b></th>'+
                    '<th width="85"><b>区分度</b></th>'+
                    '<th width="85"><b>正确答案</b></th>'+
                    '<th width="85"><b>最高<br />选项率</b></th>'+
                    '<th width="85"><b>第二<br />选项率</b></th>'+
                    '<th width="85"><b>第三<br />选项率</b></th>'+
                    '<th width="85"><b>其他<br />选项率</b></th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody>';
                for(var i =0; i < tr.length; i++){
                    table+= '<tr>'+
                        '<td>'+ tr[i].OrderID +'</td>'+
                        '<td>'+ tr[i].TypesName +'</td>'+
                        '<td>'+ tr[i].KlName +'</td>'+
                        '<td>'+ tr[i].TrueDiff +'</td>'+
                        '<td>'+ tr[i].Distinguish +'</td>'+
                        '<td><b style="color:#f03b19;font-weight:700">'+ tr[i].Answer +'（'+ tr[i].RightRate +'）</b></td>'+
                        '<td>'+ tr[i].FirstAnswer +'（'+ tr[i].FirstRate +'）</td>'+
                        '<td>'+ tr[i].SecondAnswer +'（'+ tr[i].SecondRate +'）</td>'+
                        '<td>'+ tr[i].ThirdAnswer +'（'+ tr[i].ThirdRate +'）</td>'+
                        '<td>'+ tr[i].OtherAnswer +'</td>'+
                        '</tr>'
                }
                table+= '</tbody>';

                $j_keguantifenxi.html(table);
                analy.isShowMore( $j_keguantifenxi,1);
                analy.theadfixed( $j_keguantifenxi);
                analy.outputHtmlToExcel($j_keguantifenxi);
            }else{
                $j_keguantifenxi.subDataEmpty(0);
            }
        })
    };
});