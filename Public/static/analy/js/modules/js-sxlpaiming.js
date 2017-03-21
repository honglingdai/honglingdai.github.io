
define(function (require, exports) {
    var analy = require("analy");

    // 一、二本上线率学校排名前10名
    exports.sxlschool = function(){
        // 参数配置
        var param = {
            params:['onLineSchoolOrder'],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        // 校长权限参数
        if(role === "4"){
            param.params = ['getSchoolOrder'];
            param.schoolID = $.cookie("analy_SchoolID");
            delete param.classID
        }
        $.analyzeHandler(param,function(data){
            var $table = $("#js-onLineSchool");
            if(data.status===1){
                var json = data.data;
                var subjectId = json.SubjectName;
                var SchoolList = json.SchoolList;
                // 标题学科
                var title = '一、二本上线率学校排名前10名（' + subjectId + '）';
                $("#js-onLineSchool-title").html(title);
                var html = '';
                html += '<thead>'+
                    '<tr>'+
                        '<th rowspan="2" width="120"><b>教学团体</b></th>'+
                        '<th colspan="2"><b>实考人数</b></th>'+
                        '<th colspan="2"><b>平均分</b></th>'+
                        '<th colspan="2"><b>一本人数</b></th>'+
                        '<th colspan="2"><b>一本率</b></th>'+
                        '<th rowspan="2"><b>一本双上线人数</b></th>'+
                        '<th colspan="2"><b>二本人数</b></th>'+
                        '<th colspan="2"><b>二本率</b></th>'+
                        '<th rowspan="2"><b>二本双上线人数</b></th>'+
                        '<th colspan="2"><b>差生人数</b></th>'+
                        '<th colspan="2"><b>前200名分布</b></th>'+
                        '</tr>'+
                        '<tr>'+
                        '<th><b>全部</b></th>'+
                        '<th><b> '+subjectId+' </b></th>'+
                        '<th><b>总分</b></th>'+
                        '<th><b> '+subjectId+' </b></th>'+
                        '<th><b>总分</b></th>'+
                        '<th><b> '+subjectId+' </b></th>'+
                        '<th><b>总分</b></th>'+
                        '<th><b> '+subjectId+' </b></th>'+
                        '<th><b>总分</b></th>'+
                        '<th><b> '+subjectId+' </b></th>'+
                        '<th><b>总分</b></th>'+
                        '<th><b> '+subjectId+' </b></th>'+
                        '<th><b>总分</b></th>'+
                        '<th><b> '+subjectId+' </b></th>'+
                        '<th><b>总分</b></th>'+
                        '<th><b> '+subjectId+' </b></th>'+
                        '</tr>'+
                        '</thead>'+
                        '<tbody>';
                for(var i = 0; i <SchoolList.length; i++){
                    var Doublelist = SchoolList[i].Double;
                    var Subjectlist = SchoolList[i].Subject;
                    var Totallist = SchoolList[i].TotalScore;
                    html += '<tr>'+
                        '<td><b>' + SchoolList[i].SchoolName + '</b></td>'+
                        '<td>' + Totallist.UserCount + ' </td>'+
                        '<td>' + Subjectlist.UserCount + '</td>'+
                        '<td>' + Totallist.ScoreAvg + '</td>'+
                        '<td>' + Subjectlist.ScoreAvg + '</td>'+
                        '<td>' + Totallist.AUserCount + '</td>'+
                        '<td>' + Subjectlist.AUserCount + '</td>'+
                        '<td>' + Totallist.ALineRate + '%</td>'+
                        '<td>' + Subjectlist.ALineRate + '%</td>'+
                        '<td>' + Doublelist.AUserCount + '</td>'+
                        '<td>' + Totallist.BUserCount + '</td>'+
                        '<td>' + Subjectlist.BUserCount + '</td>'+
                        '<td>' + Totallist.BLineRate + '%</td>'+
                        '<td>' + Subjectlist.BLineRate + '%</td>'+
                        '<td>' + Doublelist.BUserCount + '</td>'+
                        '<td>' + Totallist.PoorUserCount + '</td>'+
                        '<td>' + Subjectlist.PoorUserCount + '</td>'+
                        '<td>' + Totallist.OrderCount + '</td>'+
                        '<td>' + Subjectlist.OrderCount + '</td>'+
                        '</tr>'
                }
                html += '</tbody>';

                $table.html(html);
                // 表格默认显示5行
                analy.isShowMore($table);
                // 表格头部固定
                analy.theadfixed($table);
                // 导出excel
                analy.outputHtmlToExcel($table);
            }
            else{
                // 数据为空时
                $table.subDataEmpty(0);
            }
        })

    };

});