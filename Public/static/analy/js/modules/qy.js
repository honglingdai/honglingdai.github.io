define(function (require, exports) {
    //各科考试情况
    require("../getData");
    require("analy");
    exports.xiaojie=function(){
        var param={
            params:["introduction"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                $(".summary,.summary-hide").show();
                var json = data.data;
                var scrollnum = json.SchoolList;
                var tpl = '';
                tpl += '<p>本次考试，提交了考试成绩进行分析的学校有\
                    <span class="text-primary"> '+ json.ExamSchoolNum +' </span>所，总计有\
                    <span class="text-primary"> '+ json.ExamUserNum +' </span> 考生参与分析，其中';
                for(var i = 0; i  < scrollnum.length; i++){
                    tpl += scrollnum[i].StyleName + ' <span class="text-primary">' + scrollnum[i].SchoolNum + '</span> 所；'
                }
                tpl +=  '我校参加考试人数\
                    <span class="text-primary"> '+ json.SchoolUserNum +' </span> 人。A类模拟上线\
                    （<span class="text-primary"> '+ json.ScoreALine +' 分</span>） 人数\
                    <span class="text-primary"> '+ json.ALineNum +' </span> 人，B类模拟上线\
                    （<span class="text-primary"> '+ json.ScoreBLine +' 分</span> ）人数\
                    <span class="text-primary"> '+ json.BLineNum +' </span> 人。\
                     </p>';
                $("#j_desc").html(tpl);
            }
        })
    };
});