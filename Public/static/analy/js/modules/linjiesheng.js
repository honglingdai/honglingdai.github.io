define(function (require, exports) {
    var analy = require("analy");

    //本班模拟A线临界生（+5，-5）
    exports.AlineLinjieshengTable = function(){
        // 参数配置
        var param,
            baseParam = {
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID")
            },
            // 学科老师权限参数
            param_Teacher = {
                params:["ACriticalUser"],
                subjectID:$.cookie("analy_SubjectID"),
                classID:$.cookie("analy_ClassID")
            },
            // 班主任权限参数
            param_Bzr = {
                params:["ACritical"],
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                params:["ACritical"],
                schoolID: $.cookie("analy_SchoolID")
            },
            // 区域权限
            param_Region = {
                params:["ACritical"],
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
            var tableID = $("#j_Aline_linjieisheng");
            // 当 接口有数据 & 成员列表不为空时
            if (data.status === 1 && data.data.UserList) {
                var html = "";
                if(role == "4" || role == "5"){
                    // 校长和区域 权限表格
                    html += exports.linjieshengTableRector(data);
                }else{
                    html += exports.linjieshengTable(data);
                }
                tableID.html(html);
                // 表格默认显示行数
                analy.isShowMore(tableID,1);
                // 表格头部固定
                analy.theadfixed(tableID);
                // 导出excel
                analy.outputHtmlToExcel(tableID);
            }else{
                // 数据为空时
                tableID.subDataEmpty(0)
            }
        });
    };
    // 本班模拟B线临界生（+10，-10）
    exports.BlineLinjieshengTable = function(){
        // 参数配置
        var param,
            baseParam = {
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID")
            },
            // 学科老师权限参数
            param_Teacher = {
                params:["BCriticalUser"],
                subjectID:$.cookie("analy_SubjectID"),
                classID:$.cookie("analy_ClassID")
            },
            // 班主任权限参数
            param_Bzr = {
                params:["BCritical"],
                // subjectID:$.cookie("analy_SubjectID"),
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                params:["BCritical"],
                schoolID: $.cookie("analy_SchoolID")
            },
            // 区域权限
            param_Region = {
                params:["BCritical"],
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
            var tableID = $("#j_Bline_linjieisheng");
            // 当 接口有数据 & 成员列表不为空时
            if (data.status === 1  && data.data.UserList) {
                var html = "";
                if(role == 4 || role == 5){
                    html += exports.linjieshengTableRector(data);
                }else{
                    html += exports.linjieshengTable(data);
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

    // 短板生、临界生table
    exports.linjieshengTable = function(data){
        var json = data.data;
        var SubjectList = json.Subject;
        var UserList = json.UserList;
        var html = '';
        html += '<thead>'+
            '<tr>'+
            '<th width="120"><b>学号</b></th>'+
            '<th><b>姓名</b></th>';
        for(var m = 0; m < SubjectList.length; m++){
            html += '<th><b>' + SubjectList[m].SubjectName + '</b></th>'
        }
        html += '<th><b>优势学科</b></th>'+
            '<th><b>劣势学科</b></th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>';
        if(UserList){
            for(var i = 0; i < UserList.length;i++){
                var subjectscore = UserList[i].SubjectList;
                html += '<tr>'+
                    '<td><b>' + UserList[i].StudentCode + '</b></td>'+
                    '<td>' + UserList[i].UserName + '</td>';
                for(var j = 0;j < subjectscore.length; j++){
                    if(subjectscore[j].Status === 1){
                        html += '<td class="text-success">' + subjectscore[j].Score + '</td>'
                    }else if(subjectscore[j].Status === 0){
                        html += '<td>' + subjectscore[j].Score + '</td>'
                    }else{
                        html += '<td class="text-danger">' + subjectscore[j].Score + '</td>'
                    }
                }
                var BadSubject = UserList[i].BadSubject;
                var GoodSubject = UserList[i].GoodSubject;
                if((BadSubject == "") || (BadSubject == null)){
                    BadSubject = "--"
                }
                if((GoodSubject == "") || (GoodSubject == null)){
                    GoodSubject = "--"
                }
                html += '<td width="120px"><b class="text-success">' + GoodSubject + '</b></td>'+
                    '<td width="120px"><b class="text-danger">' + BadSubject + '</b></td>'+
                    '</tr>'

            }
        }else{
            // 数据为空时显示图片
            var trlength = SubjectList.length + 4;
            html += '<th colspan="'+trlength+'"><p class="loading data-empty-0"></p></th>'
        }
        html += '</tbody>';
        return html;
    };

    // 短板生、临界生table- 校长
    exports.linjieshengTableRector = function(data){
        var json = data.data,
            SubjectList = json.Subject,
            UserList = json.UserList,
            html = '';
        html += '<thead>'+
            '<tr>'+
            '<th width="100"><b>姓名</b></th>'+
            '<th><b>班级</b></th>';
        for(var i = 0; i < SubjectList.length; i++){
            html += '<th><b>' + SubjectList[i].SubjectName + '</b></th>'
        }
        html += '<th><b>优势学科</b></th>'+
            '<th><b>劣势学科</b></th>'+
            '</tr>'+
            '</thead>'+
            '<tbody>';
        if(UserList != ''){
            for(var n = 0; n < UserList.length;n++){
                var subjectscore = UserList[n].SubjectList;
                html += '<tr>'+
                    '<td><b>' + UserList[n].UserName + '</b></td>'+
                    '<td>' + UserList[n].ClassName + '</td>';
                for(var j = 0;j < subjectscore.length; j++){
                    if(subjectscore[j].Status === 1){
                        html += '<td class="text-danger">' + subjectscore[j].Score + '</td>'
                    }else if(subjectscore[j].Status === 0){
                        html += '<td>' + subjectscore[j].Score + '</td>'
                    }else{
                        html += '<td class="text-success">' + subjectscore[j].Score + '</td>'
                    }
                }
                var BadSubject = UserList[n].BadSubject;
                var GoodSubject = UserList[n].GoodSubject;
                if((BadSubject == "") || (BadSubject == null)){
                    BadSubject = "--"
                }
                if((GoodSubject == "") || (GoodSubject == null)){
                    GoodSubject = "--"
                }
                html += '<td width="120px"><b class="text-success">' + GoodSubject + '</b></td>'+
                    '<td width="120px"><b class="text-danger">' + BadSubject + '</b></td>'+
                    '</tr>'

            }
        }else{
            // 数据为空时显示图片
            var trlength = SubjectList.length + 4;
            html += '<th colspan="'+trlength+'"><p class="loading data-empty-0"></p></th>'
        }
        html += '</tbody>';
        return html;
    }




});