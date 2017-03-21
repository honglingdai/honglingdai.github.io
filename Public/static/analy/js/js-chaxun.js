define(function (require, exports, module) {
    // 学生报告查询
    var analy = require("analy");
    require("./units/analyhead.js");
    var m1 = require("./modules/alert-heightpaper");
    var CurrRoleID = $.cookie("analy_CurrRoleID"),
        classID= $.cookie("analy_ClassID");
    exports.xueshengInfo = function(){
        var param = {
            params:["teacheruserList"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID")
        };

        $.analyzeHandler(param,function(data) {
            var $table = $("#j_studentInfo");
            if (data.status === 1) {
                var json = data.data;
                var UserList = json.UserList;
                var subjectID = json.SubjectID;
                var html = "";
                html += '<thead>'+
                    '<tr>'+
                    '<th width="96" rowspan="2"><b>学号</b></th>'+
                    '<th width="96" rowspan="2"><b>姓名</b></th>'+
                    '<th width="282" colspan="3"><b>' + json.SubjectName + '</b></th>'+
                    '<th width="282" colspan="3"><b>总分</b></th>'+
                    '<th class="notOutputExcel" rowspan="2"><b>操作</b></th>'+
                    '</tr><tr>'+
                    '<th width="94"><b>成绩</b></th>'+
                    '<th width="94"><b>校名</b></th>'+
                    '<th width="94"><b>班名</b></th>'+
                    '<th width="94"><b>成绩</b></th>'+
                    '<th width="94"><b>校名</b></th>'+
                    '<th width="94"><b>班名</b></th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody>';
                for(var i = 0 ;i <UserList.length; i++){
                    var Subject = UserList[i].Subject;
                    var TotalScore = UserList[i].TotalScore;
                    var studentID = UserList[i].UserID;
                    var url = "/Analysis/Student/chengji.html?analy_StudentID=" + studentID + "&analy_SubjectID=" +
                        subjectID + "&analy_CurrRoleID=" + CurrRoleID + "&analy_ClassID=" +classID;
                    html += '<tr>'+
                        '<td><b>' + UserList[i].StudentCode + '</b></td>'+
                        '<td><b>' + UserList[i].UserName + '</b></td>'+
                        '<td>' + Subject.Score + '</td>'+
                        '<td>' + Subject.SchoolOrder + '</td>'+
                        '<td>' + Subject.ClassOrder + '</td>'+
                        '<td>' + TotalScore.Score + '</td>'+
                        '<td>' + TotalScore.SchoolOrder + '</td>'+
                        '<td>' + TotalScore.ClassOrder + '</td>'+
                        '<td class="chaxun-btn notOutputExcel">' +
                        '<a class="text-primary link" href="'+url+'" target="_blank"><i class="iconfont">&#xe660;</i>查看报告</a>' +
                        '<a class="text-primary link" id="js-seepaper" href="" data-student="'+studentID+'"><i class="iconfont">&#xe660;</i>查看原卷</a>' +
                        '</td>'+
                        '</tr>'
                }
                html += '</tbody>';

                $table.html(html);
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
                m1.jsSeePaper();
            }
            else{
                $table.subDataEmpty(0)
            }
        })
    };
    exports.xueshengInfo();
});