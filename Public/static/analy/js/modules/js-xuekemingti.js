define(function (require, exports) {
    var analy = require("analy");
    //学科命题分析
    exports.xuekemingti = function(){
        // 参数配置
        var param,
            baseParam = {
                params:["subjectComposition"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                subjectID:$.cookie("analy_SubjectID")
            },
            // 学科老师权限参数
            param_Teacher = {
            },
            // 班主任权限参数
            param_Bzr = {
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                schoolID: $.cookie("analy_SchoolID")
            },
            // 区域权限
            param_Region = {
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
            var $j_xuekemingti = $("#j_xuekemingti");
            if(data.status===1){
                var table = "",
                    tr = data.data;
                table +='<thead>'+
                    '<tr>'+
                    '<th width="40"><b>题号</b></th>'+
                    '<th width="80"><b>题型</b></th>'+
                    '<th width="40"><b>分值</b></th>'+
                    '<th width="150"><b>所属知识板块</b></th>'+
                    '<th><b>知识点</b></th>'+
                    '<th width="80"><b>认知水平</b></th>'+
                    '<th width="80"><b>考查能力</b></th>'+
                    '<th width="80"><b>预计难度</b></th>'+
                    '<th width="80"><b>实测难度</b></th>'+
                    '<th width="80"><b>实测区分度</b></th>'+
                    '<th width="40"><b>答案</b></th>'+
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
                // 默认显示行数
                analy.isShowMore( $j_xuekemingti,1);
                // 表格头部固定
                // analy.theadfixed( $j_xuekemingti);
                analy.outputHtmlToExcel($j_xuekemingti);
            }else{
                $j_xuekemingti.subDataEmpty(0)
            }
        })


    };
});