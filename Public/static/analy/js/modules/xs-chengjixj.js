define(function (require, exports) {
    //小结
    require("../getData");
    exports.xiaojie=function(){

        var param = {      //学生参数
            params:["studentsummary"],
            userID: $.cookie("yj_front_UserID"),
            examID:$.cookie("analy_ExamID"),
            studentID: $.cookie("analy_StudentID")
        };
        if(role === "1"){   //教师权限参数
            param.params = ["studentSummary"];
            param.subjectID = $.cookie("analy_SubjectID");
            param.classID = $.cookie("analy_ClassID")
        }else if(role ==="2"){    //班主任权限参数
            param.params = ["studentSummary"];
            param.classID = $.cookie("analy_ClassID")
        }

        $.analyzeHandler(param,function(data){
            $xiaojie = $("#j_xiaojie");
            if(data.status===1){
                $(".summary,.summary-hide").show();
                var desc = data.data;
                var tpl = '';
                tpl += '<span class="text-primary">'+desc.UserName+'</span> 同学，你本次考试的总成绩为\
                    <span class="text-primary">'+desc.Score+'</span> 分,超过了全校\
                    <span class="text-primary">'+desc.SchoolPercent+'</span> 的同学；在全班\
                    <span class="text-primary">'+desc.ClassCount+'</span> 人中，排名第\
                    <span class="text-primary">'+desc.ClassOrder+'</span>；在全年级\
                    <span class="text-primary">'+desc.SchoolCount+'</span> 人中，排名第\
                    <span class="text-primary">'+desc.SchoolOrder+'</span>；在联考\
                    <span class="text-primary">'+desc.ExamCount+'</span> 人中，排名第\
                    <span class="text-primary">'+desc.ExamOrder+'</span>；'+ '请继续努力，希望你下次考出更好的成绩，不断超越自己！';

                $("#j_xiaojie").html(tpl)
            }else{
                $xiaojie.parents().find(".summary,.summary-hide").hide();
            }
        });
    };
});