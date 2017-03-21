define(function (require, exports) {
    //各科考试情况
    require("../getData");
    require("analy");
    exports.xianji_xiaojie=function(){
        var param={
            params:["introduction"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                $(".summary,.summary-hide").show();
                var json = data.data,
                    scrollnum = json.SchoolList,
                    tpl = '';
                tpl +='<p>' +
                    '本次考试，提交了考试成绩进行分析的学校有<span class="text-primary"> '+ json.ExamSchoolNum +' </span> 所，' +
                    '总计有 <span class="text-primary"> '+ json.ExamUserNum +' </span> 考生参与分析。' +
                    '我署管辖区域参加学校 <span class="text-primary"> '+ json.AreaSchoolNum +' </span> 所，' +
                    '考试人数总计 <span class="text-primary"> '+ json.AreaUserNum +' </span> 人。' +
                    '此次参与测评的考生中，理科最高总分为 <span class="text-primary"> '+ json.ExamScoreNo1 +' </span> 分 (<span class="text-primary"> '+ json.ExamAreaNo1+ ' ' + json.ExamSchoolNo1 +' </span>)，' +
                    '第二名 <span class="text-primary"> '+ json.ExamScoreNo2 +' </span> 分 (<span class="text-primary"> '+ json.ExamAreaNo2+ ' ' + json.ExamSchoolNo2 +' </span>)，' +
                    '第三名 <span class="text-primary"> '+ json.ExamScoreNo3 +' </span> 分 (<span class="text-primary"> '+ json.ExamAreaNo3+ ' ' + json.ExamSchoolNo3 +' </span>)。' +
                    '</p>'
                $("#j_desc").html(tpl);
            }
        })
    };
    exports.xiaojie_xiaoji=function(){
        var param={
            params:["introduction"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                $(".summary,.summary-hide").show();
                var json = data.data,
                    scrollnum = json.SchoolList,
                    StyleNum = json.StyleNum,
                    tpl = '';
                tpl +='<p>' +
                    '本次考试，提交了考试成绩进行分析的学校有<span class="text-primary"> '+ json.ExamSchoolNum +' </span> 所，' +
                    '总计有 <span class="text-primary"> '+ json.ExamUserNum +' </span> 考生参与分析。其中';
                for(var i = 0; i < StyleNum.length;i++){
                    tpl += StyleNum[i].StyleName + '<span class="text-primary"> '+ StyleNum[i].SchoolNum +' </span> 所；'
                }
                tpl +='我署管辖区域参加学校 <span class="text-primary"> '+ json.AreaSchoolNum +' </span> 所，' +
                    '考试人数总计 <span class="text-primary"> '+ json.AreaUserNum +' </span> 人。' +
                    '</p>';
                $("#j_desc").html(tpl);
            }
        })
    };
});