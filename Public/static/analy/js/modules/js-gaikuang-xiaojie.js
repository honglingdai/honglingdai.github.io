define(function (require, exports) {

    //教师概况小结
    require("../getData");
    var analy = require("analy");
    exports.xiaojie=function(){
        // 参数配置
        var param={
            params:["teacherssummary"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        $.analyzeHandler(param,function(data){
            var $desc = $("#j_desc");
            if(data.status===1){
                // 数据正常时 显示
                $(".summary,.summary-hide").show();
                var json = data.data;
                // 获取学科名称
                var subjectID = $.cookie("analy_SubjectID"),
                    subjectName = analy.getSubjectName(subjectID),
                    scrollnum = json.SchoolStyle,
                    tpl = '';
                tpl += '<p>本次考试，提交了考试成绩进行分析的学校有\
                    <span class="text-primary"> '+ json.SchoolCount +' </span>所，总计有\
                    <span class="text-primary"> '+ json.ExamUserCount +' </span> 考生参与分析，参加\
                    <span class="text-primary">'+subjectName+' </span> 考生人数\
                    <span class="text-primary"> '+ json.SubjectUserCount +' </span> 人。其中';
                for(var i = 0; i  < scrollnum.length; i++){
                    tpl += scrollnum[i].StyleName + ' <span class="text-primary">' + scrollnum[i].Num + '</span> 所；'
                }

                tpl += '</p><p>本次考试\
                    <span class="text-primary"> '+subjectName+'</span> 一本有效分\
                    <span class="text-primary"> '+ json.AEffectiveScore +' </span> 分；二本有效分\
                    <span class="text-primary"> '+ json.BEffectiveScore +' </span> 分。我校\
                    <span class="text-primary"> '+subjectName+' </span> 一本单上线人数\
                    <span class="text-primary"> '+ json.ASchoolCount +' </span> 人，双上线人数\
                    <span class="text-primary"> '+ json.ASchoolDob +' </span> 人；二本单上线人数\
                    <span class="text-primary"> '+ json.BSchoolCount +' </span> 人，双上线人数\
                    <span class="text-primary"> '+ json.BSchoolDob +' </span> 人。本班考生\
                    <span class="text-primary"> '+ json.ClassUserCount +' </span> 人，均分\
                    <span class="text-primary"> '+ json.ClassScoreAvg +' </span> 分 。其中一本单上线人数\
                    <span class="text-primary"> '+ json.AClassCount +' </span> 人，双上线人数\
                    <span class="text-primary"> '+ json.AClassDob +' </span> 人；二本单上线人数\
                    <span class="text-primary"> '+ json.BClassCount +' </span> 人，二本双上线人数\
                    <span class="text-primary"> '+ json.BClassDob +' </span> 人。更多详情分析建议查看班级、学生报告。\
                     </p>';
                $desc.html(tpl);
            }
        })
    };
    exports.xiaojieRector=function(){
        var param={
            params:["subjectIntro"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        $.analyzeHandler(param,function(data){
            var $desc = $("#j_desc");
            if(data.status===1){
                $(".summary,.summary-hide").show();
                var json = data.data;
                var scrollnum = json.SchoolList;
                var tpl = '';
                tpl += '<p>本次考试，提交了考试成绩进行分析的学校有\
                    <span class="text-primary"> '+ json.ExamSchoolNum +' </span>所，总计有\
                    <span class="text-primary"> '+ json.ExamUserNum +' </span> 考生参与分析，参加\
                    <span class="text-primary">'+json.SubjectName+' </span> 考生人数\
                    <span class="text-primary"> '+ json.ExamSubjectNum +' </span> 人。其中';
                for(var i = 0; i  < scrollnum.length; i++){
                    tpl += scrollnum[i].StyleName + ' <span class="text-primary">' + scrollnum[i].SchoolNum + '</span> 所；'
                }

                tpl += '我校参加 <span class="text-primary">'+json.SubjectName+' </span> 考试人数\
                    <span class="text-primary"> '+ json.SchoolSubjectNum +' </span> 人，均分\
                    <span class="text-primary"> '+ json.SchoolAvgScore +' </span>分。\
                    </p><p>本次考试\
                    <span class="text-primary"> '+json.SubjectName+'</span> 一本有效分\
                    <span class="text-primary"> '+ json.AEffectiveScore +' </span> 分；二本有效分\
                    <span class="text-primary"> '+ json.BEffectiveScore +' </span> 分。我校\
                    <span class="text-primary"> '+json.SubjectName+' </span> 一本单上线人数\
                    <span class="text-primary"> '+ json.ASingleLine +' </span> 人（上线率\
                    <span class="text-primary"> '+ json.ASingleRate +' %</span> ），双上线人数\
                    <span class="text-primary"> '+ json.ADoubleLine +' </span> 人，二本单上线人数\
                    <span class="text-primary"> '+ json.BSingleLine +' </span> 人（上线率\
                    <span class="text-primary"> '+ json.BSingleRate +' %</span>  ），双上线人数\
                    <span class="text-primary"> '+ json.BDoubleLine +' </span> 人 。\
                     </p>';
                $desc.html(tpl);
            }
        })
    };
});