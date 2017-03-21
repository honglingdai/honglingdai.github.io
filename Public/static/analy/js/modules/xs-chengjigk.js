define(function (require, exports) {
    //学生成绩概况
    var analy = require("analy");
    require("../getData");

    // 表格数据
    var $chengjigkTable = $("#j_chengjigkTable");

    exports.chengjigkTable = function () {
        var param = {
            params: ["getScoreList"]
        };
        if (role === "2") {
            // 班主任权限参数
            param.params = ["getStudentScore"];
            param.classID = $.cookie("analy_ClassID")
        }
        $.analyzeHandler(param, function (data) {
            console.log(data)
            if (data.status === 1) {
                var list = data.data;
                var table = "";
                var tr = list.length;
                table += '<thead>'+
                    '<tr><th><b>分析指标</b></th>';
                for (var i = 0; i < tr; i++) {
                    table += '<th><b>' + list[i].SubjectName + '</b></th>';
                }
                table += '</tr></thead>'+
                    '<tbody>';
                function creattr(tit, ele, subject) {
                    table += "<tr>"+
                         "<th><b>" + tit + "</b></th>";
                    for (var j = 0; j < tr; j++) {
                        table += '<td data-sub=' + list[j][subject] + '>' + list[j][ele] + '</td>';
                    }
                    table += "</tr>"
                }

                creattr("分数", "Score", "SubjectID");
                creattr("班级排名", "ClassOrder", "SubjectID");
                creattr("年级排名", "SchoolOrder", "SubjectID");
                creattr("总排名", "TotalOrder", "SubjectID");
                creattr("标准分", "ZScore", "SubjectID");
                creattr("等级", "Level", "SubjectID");
                table += '</tbody>';
                $chengjigkTable.html(table);
            }
            else {
                $chengjigkTable.subDataEmpty(0);
            }
        })


    };

    // 学科老师查看学生
    exports.jschengjigkTable = function () {
        var param = {
            params: ["getScoreList"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            studentID: $.cookie("analy_StudentID"),
            subjectID: $.cookie("analy_SubjectID"),
            classID: $.cookie("analy_ClassID")
        };
        $.analyzeHandler(param, function (data) {
            if (data.status === 1) {
                var list = data.data.SubjectList;
                var table = "";
                var tr = list.length;
                table += '<thead>';
                table += '<tr><th><b>分析指标</b></th>';
                for (var i = 0; i < tr; i++) {
                    table += '<th data-sub=' + list[i].SubjectID + '><b>' + list[i].SubjectName + '</b></th>'
                }
                table += '</tr></thead>'+
                    '<tbody>';
                function creattr(tit, ele, subject) {
                    table += "<tr>"+
                        "<th><b>" + tit + "</b></th>";
                    for (var j = 0; j < tr; j++) {
                        table += '<td data-sub=' + list[j][subject] + '>' + list[j][ele] + '</td>';
                    }
                    table += "</tr>"
                }

                creattr("分数", "Score", "SubjectID");
                creattr("班级排名", "ClassOrder", "SubjectID");
                creattr("年级排名", "SchoolOrder", "SubjectID");
                creattr("总排名", "TotalOrder", "SubjectID");
                creattr("标准分", "ZScore", "SubjectID");
                creattr("等级", "Level", "SubjectID");
                table += '</tbody>';

                $chengjigkTable.html(table);

                //学科老师查看学生，学科加红
                var subjectID = data.data.SubjectID;
                $('[data-sub]').each(function () {
                    var $this = $(this);
                    if ($this.data('sub') === (subjectID - 0)) {
                        $this.css({
                            "color": "#ff4b4b",
                            "font-weight": 700
                        })
                    }
                })
            }
            else {
                $chengjigkTable.subDataEmpty(0);
            }
        })


    }
});