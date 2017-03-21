define(function (require, exports) {
    //各科考试情况
    require("../getData");
    require("analy");
    exports.xiaojie=function(){
        var param = {
            params:["introduction"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status ===1){
                $(".summary,.summary-hide").show();
                var json = data.data;
                var school = json.SchoolStyle;
                var tpl = '';
                tpl += '<p>\
                    本次考试，提交了考试成绩进行分析的学校有\
                    <span class="text-primary">'+ json.SchoolNum +'</span> 所，总计有\
                    <span class="text-primary">'+ json.ExamUserNum +'</span> 考生参与分析，本班参加考试考生人数\
                    <span class="text-primary">'+ json.ClassUserNum +'</span> 人。其中';
                for(var i = 0 ; i < school.length; i++){
                    tpl += school[i].StyleName + ' <span class="text-primary">' + school[i].Num + '</span> 所;'
                }
                tpl += '</p>\
                    <p>\
                    本校参加考试人数 \
                    <span class="text-primary">'+ json.SchoolUserNum +'</span> 人；本校 \
                    <span class="text-primary">A类</span> 上线人数 \
                    <span class="text-primary">'+ json.SchoolALineNum +'</span> 人；占总人数\
                    <span class="text-primary">'+ json.SchoolALineRate + "%" +'</span>；\
                    <span class="text-primary">B类</span>上线人数 \
                    <span class="text-primary">'+ json.SchoolBLineNum +'</span> 人；占总人数 \
                    <span class="text-primary">'+ json.SchoolBLineRate+ "%" +'</span>；本班 \
                    <span class="text-primary">A类</span>上线人数 \
                    <span class="text-primary">'+ json.ClassALineNum +'</span> 人；占总人数\
                    <span class="text-primary">'+ json.ClassALineRate + "%" +'</span>；\
                    <span class="text-primary">B类</span>上线人数 \
                    <span class="text-primary">'+ json.ClassBLineNum +'</span> 人；占总人数 \
                    <span class="text-primary">'+ json.ClassBLineRate + "%" +'</span>。\
                    </p>';
                $("#j_desc").html(tpl);
            }
        });
    };
});