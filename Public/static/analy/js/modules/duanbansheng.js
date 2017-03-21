define(function (require, exports, module) {
    var analy = require("analy");

    // 本班A线短板生
    exports.AduanbanshengTable = function(){
        // 参数配置
        var param,
            baseParam = {
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID")
            },
            // 学科老师权限参数
            param_Teacher = {
                params:["ASortSubjectUser"],
                subjectID:$.cookie("analy_SubjectID"),
                classID:$.cookie("analy_ClassID")
            },
            // 班主任权限参数
            param_Bzr = {
                params:["AOnLine"],
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                params:["AOnLine"],
                schoolID: $.cookie("analy_SchoolID")
            },
            // 区域权限
            param_Region = {
                params:["AOnLine"],
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
        $.analyzeHandler(param,function(data) {
            var tableID = $("#j_Aline_duanbansheng");
            // 当 接口有数据 & 成员列表不为空时
            if (data.status === 1 && data.data.UserList) {
                var html = "";
                if(role == 4 || role == 5){
                    html = exports.duanbanTableRector(data);
                }else{
                    html = exports.duanbanTable(data);
                }
                tableID.html(html);
                analy.isShowMore(tableID,1);
                analy.theadfixed(tableID);
                analy.outputHtmlToExcel(tableID);
            }
            else{
                tableID.subDataEmpty(0)
            }
        });
    };

    // 本班B线短板生
    exports.BduanbanshengTable = function(){
        // 参数配置
        var param,
            baseParam = {
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID")
            },
            // 学科老师权限参数
            param_Teacher = {
                params:["BSortSubjectUser"],
                subjectID:$.cookie("analy_SubjectID"),
                classID:$.cookie("analy_ClassID")
            },
            // 班主任权限参数
            param_Bzr = {
                params:["BOnLine"],
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                params:["BOnLine"],
                schoolID: $.cookie("analy_SchoolID")
            },
            // 校长权限
            param_Region = {
                params:["BOnLine"],
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
        $.analyzeHandler(param,function(data) {
            console.log(data.data)
            var tableID = $("#j_Bline_duanbansheng");
            // 当 接口有数据 & 成员列表不为空时
            if (data.status === 1 && data.data.UserList) {
                var html = "";
                html = exports.duanbanTable(data);
                if(role == 4 || role == 5){
                    html = exports.duanbanTableRector(data);
                }

                tableID.html(html);
                analy.isShowMore(tableID,1);
                analy.theadfixed(tableID);
                analy.outputHtmlToExcel(tableID);
            }
            else{
                tableID.subDataEmpty(0)
            }
        });
    };

    // table
    exports.duanbanTable = function(data,tbody){
        var json = data.data,
            SubjectList = json.Subject,
            UserList = json.UserList,
            html = '';
        html += '<thead>'+
            '<tr>'+
            '<th width="100"><b>学号</b></th>'+
            '<th><b>姓名</b></th>';
        for(var i = 0; i < SubjectList.length; i++){
            html += '<th><b>' + SubjectList[i].SubjectName + '</b></th>'
        }
        html += '<th><b>短板学科</b></th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>';
        if(UserList){
            for(var k = 0; k < UserList.length;k++){
                var subjectscore = UserList[k].SubjectList;
                html += '<tr>'+
                    '<td><b>' + UserList[k].StudentCode + '</b></td>'+
                    '<td>' + UserList[k].UserName + '</td>';
                for(var j = 0;j < subjectscore.length; j++){
                    if(subjectscore[j].Status === 1){
                        html += '<td class="text-success">' + subjectscore[j].Score + '</td>'
                    }else if(subjectscore[j].Status === 0){
                        html += '<td>' + subjectscore[j].Score + '</td>'
                    }else{
                        html += '<td class="text-success">' + subjectscore[j].Score + '</td>'
                    }
                }
                if(UserList[k].BadSubject == undefined){
                    UserList[k].BadSubject = "--"
                }
                html += '<td width="120px"><b class="text-success">' + UserList[k].BadSubject + '</b></td>'+
                    '</tr>'

            }
        }else{
            // 数据为空时显示图片
            var trlength = SubjectList.length + 3;
            html += '<th colspan="'+trlength+'"><p class="loading data-empty-0"></p></th>'
        }

        html += '</tbody>';
        return html;
    };
    // 校长table
    exports.duanbanTableRector = function(data){
        var json = data.data,
            SubjectList = json.Subject,
            UserList = json.UserList,
            html = '';
        html += '<thead>'+
            '<tr>'+
            '<th width="100"><b>姓名</b></th>'+
            '<th width="80"><b>班级</b></th>';
        for(var i = 0; i < SubjectList.length; i++){
            html += '<th><b>' + SubjectList[i].SubjectName + '</b></th>'
        }
        html += '<th><b>短板学科</b></th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>';
            for(var k = 0; k < UserList.length;k++){
                var subjectscore = UserList[k].SubjectList;
                html += '<tr>'+
                    '<td><b>' + UserList[k].UserName + '</b></td>'+
                    '<td>' + UserList[k].ClassName + '</td>';
                for(var j = 0;j < subjectscore.length; j++){
                    if(subjectscore[j].Status === 1){
                        html += '<td class="text-danger">' + subjectscore[j].Score + '</td>'
                    }else if(subjectscore[j].Status === 0){
                        html += '<td>' + subjectscore[j].Score + '</td>'
                    }else{
                        html += '<td class="text-success">' + subjectscore[j].Score + '</td>'
                    }
                }
                // 数据为空时
                if(UserList[k].BadSubject == undefined){
                    UserList[k].BadSubject = "--"
                }
                html += '<td width="120px"><b class="text-success">' + UserList[k].BadSubject + '</b></td>'+
                    '</tr>'
            }

        html += '</tbody>';
        return html;
    }
});
