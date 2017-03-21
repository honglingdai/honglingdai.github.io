define(function (require, exports, module) {
    var analy = require("analy");
    require("./units/analyhead.js");
    var m1 = require("./modules/alert-heightpaper");
    var CurrRoleID = $.cookie("analy_CurrRoleID"),
        classID= $.cookie("analy_ClassID");
    exports.xueshengInfo = function(){
        var param = {
            params:["getScoreList"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data) {
            var $table = $("#j_studentInfo");
            if (data.status === 1) {
                var json = data.data,
                    UserList = json.UserList,
                    subject = json.Subject.slice(1),
                    html = "";
                html += '<thead>'+
                    '<tr>'+
                    '<th width="60" rowspan="2"><b>学号</b></th>'+
                    '<th width="40" rowspan="2"><b>姓名</b></th>'+
                    '<th colspan="3"><b>总分</b></th>';
                for(var i = 0 ; i < subject.length; i++){
                    html += '<th colspan="2"><b>' + subject[i].SubjectName + '</b></th>'
                }
                html += '<th class="notOutputExcel" width="180" rowspan="2"><b>操作</b></th>'+
                    '</tr><tr>'+
                    '<th><b>成绩</b></th>'+
                    '<th><b>校名</b></th>'+
                    '<th><b>班名</b></th>';
                for(var j = 0 ; j < subject.length; j++){
                    html += '<th><b>成绩</b></th>'+
                        '<th><b>班名</b></th>'
                }

                html += '</tr>'+
                    '</thead>'+
                    '<tbody>';
                for(var k = 0 ;k <UserList.length; k++){
                    var SubjectList = UserList[k].SubjectList.slice(1);
                    var totle = UserList[k].SubjectList[0];
                    var StudentID = UserList[k].UserID;
                    var url = "/Analysis/Student/chengji.html?analy_StudentID=" + StudentID + "&analy_CurrRoleID=" + CurrRoleID + "&analy_ClassID=" + classID;
                    html += '<tr>'+
                        '<td>' + UserList[k].StudentCode + '</td>'+
                        '<td><b>' + UserList[k].UserName + '</b></td>'+
                        '<td>' + totle.Score + '</td>'+
                        '<td>' + totle.SchoolOrder + '</td>'+
                        '<td>' + totle.ClassOrder + '</td>';
                    for(var l = 0 ; l < SubjectList.length;l++){
                        html += '<td>' + SubjectList[l].Score + '</td>';
                        // html += '<td>' + SubjectList[j].SchoolOrder + '</td>'
                        html += '<td>' + SubjectList[l].ClassOrder + '</td>'
                    }

                    html += '<td class="chaxun-btn notOutputExcel">' +
                        '<a class="text-primary link" href="'+url+'" target="_blank"><i class="iconfont">&#xe660;</i>查看报告</a>' +
                        '<a class="text-primary link" id="bzr-seepaper" href="" data-student="'+StudentID+'"><i class="iconfont">&#xe660;</i>查看原卷</a>' +
                        '</td>'+
                        '</tr>'
                }
                html += '</tbody>';

                $table.html(html);
                analy.isShowMore($table, 6);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
                m1.bzrSeePaper();
            }
        })

    }
    exports.xueshengInfo();
});