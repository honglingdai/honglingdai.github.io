
define(function (require, exports) {
    var analy = require("analy");
    
    // 本校( 生物)各班级考试情况
    exports.classinfolist = function(){
        // 参数配置
        var param,
            baseParam = {
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                subjectID:$.cookie("analy_SubjectID")
            },
            // 学科老师权限参数
            param_Teacher = {
                params:["teacherclassInfoList"],
                classID:$.cookie("analy_ClassID")
            },
            // 校长权限
            param_Rector = {
                params:["classInfo"],
                schoolID: $.cookie("analy_SchoolID")
            };
        // 根据身份id 配置参数
        switch(role){
            case "1" : param = $.extend({},baseParam,param_Teacher);
                break;
            case "4" : param = $.extend({},baseParam,param_Rector);
                break;
        }
        $.analyzeHandler(param,function(data){

            var $table = $("#js-classinfo");
            if(data.status===1){
                var json = data.data;
                var subjectId = json.SubjectName;
                var ClassList = json.ClassList;
                var title = '本校（'+subjectId+'）各班级考试情况';
                $("#js-classinfo-title").html(title);
                var html = '';
                html += '<thead>'+
                    '<tr>'+
                    '<th><b>教学团体</b></th>'+
                    '<th><b>实考人数</b></th>'+
                    '<th><b>平均分</b></th>'+
                    '<th><b>最高分</b></th>'+
                    '<th><b>最低分</b></th>'+
                    '<th><b>优秀率</b></th>'+
                    '<th><b>优良率</b></th>'+
                    '<th><b>及格率</b></th>'+
                    '<th><b>差生人数</b></th>'+
                    '<th><b>标准偏差</b></th>'+
                    '<th><b>分化程度</b></th>'+
                    '<th><b>前100名分布</b></th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody>';
                for(var i = 0;i <ClassList.length;i++){
                    html += '<tr>'+
                        '<td><b>' + ClassList[i].GroupName + '</b></td>'+
                        '<td>' + ClassList[i].UserCount + '</td>'+
                        '<td>' + ClassList[i].ScoreAvg + '</td>'+
                        '<td>' + ClassList[i].ScoreMax + '</td>'+
                        '<td>' + ClassList[i].ScoreMin + '</td>'+
                        '<td>' + ClassList[i].ExcellentRate + '%</td>'+
                        '<td>' + ClassList[i].GoodRate + '%</td>'+
                        '<td>' + ClassList[i].PassRate + '%</td>'+
                        '<td>' + ClassList[i].PoorUserCount + '</td>'+
                        '<td>' + ClassList[i].Deviation + '</td>'+
                        '<td>' + ClassList[i].Distinguish + '</td>'+
                        '<td>' + ClassList[i].OrderCount + '</td>'+
                        '</tr>'
                }

                html += '</tbody>';

                $table.html(html);
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }else{
                // 数据为空时
                $table.subDataEmpty(0);
            }
        })

    };

});