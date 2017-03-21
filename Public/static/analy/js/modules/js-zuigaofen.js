define(function (require, exports) {
    var analy = require("analy");
    var template = require("tmpl");
    //最高分
    exports.zuigaofen = function(){
        // 参数配置
        var param = {
            params:["teacherscoreMax"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID:$.cookie("analy_SubjectID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){
            var $xiaoZuigaofen = $("#j_xiaoZuigaofen");
            var $banZuigaofen = $("#j_banZuigaofen");
            if(data.status === 1){
            var json = data.data;
            //描述性内容
            var sumHtml= "";
            sumHtml += '本次考试，全体参考学校中，' +
                '<span class="text-primary">'+json.SubjectName+'</span> 学科最高分为' +
                '<span class="text-primary">'+json.ExamScoreMax+'</span> 分' +
                ' (<span class="text-primary">'+json.ExamMaxSchool+'</span>)；我校 ' +
                '<span class="text-primary">'+json.SubjectName+'</span>  学科最高分 ' +
                '<span class="text-primary">'+json.SchoolScoreMax+' </span>分（' +
                '<span class="text-primary">'+json.SchoolMaxClass+ json.SchoolMaxUser + ' </span>）。'
            $("#j_zuigaofen-desc").html(sumHtml);
            //联考前5
            // $("#j_lianZuigaofen").html(template("tpl_liankao-zuigaofen",data.data.LianKao));
            // 本校前5名表格
            var BenXiao = [];
            var cllist = json.SchoolList;
            for(var i = 0 ; i < cllist.length; i++){
                BenXiao[i] = {};
                BenXiao[i].Score = cllist[i].Score;
                BenXiao[i].School = cllist[i].ClassName;
                BenXiao[i].Name = cllist[i].UserName;
            };
            // 本班前5名
            var BenBan = [];
            var sllist = json.ClassList;
            for(var i = 0 ; i < sllist.length; i++){
                BenBan[i] = {};
                BenBan[i].Score = sllist[i].Score;
                BenBan[i].School = sllist[i].StudentCode;
                BenBan[i].Name = sllist[i].UserName;
            }
            // 本校前5
                $xiaoZuigaofen.html(template("tpl_benxiao-zuigaofen",BenXiao));
                // 本班前5
                $banZuigaofen.html(template("tpl_benban-zuigaofen",BenBan));

                analy.outputHtmlToExcel("#j_xiaoZuigaofen,#j_banZuigaofen");
            }
            else{
                $xiaoZuigaofen.subDataEmpty(0);
                $banZuigaofen.subDataEmpty(0);
            }
        })
    };
    exports.zuigaofenRector = function(){
        var param = {
            params:["subjectScoreMax"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID:$.cookie("analy_SubjectID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        $.analyzeHandler(param,function(data){
            var $liankaoZuigaofen = $("#liankao_Zuigaofen"),
                $banZuigaofen = $("#j_banZuigaofen");
            if(data.status === 1){
                var json = data.data;
                //小结
                var sumHtml= "";
                sumHtml += '本次考试，全体参考学校中，' +
                    '<span class="text-primary">'+json.SubjectName+'</span> 学科最高分为' +
                    '<span class="text-primary">'+json.ExamScoreMax+'</span> 分' +
                    ' (<span class="text-primary">'+json.ExamMaxSchool+'</span>)；我校 ' +
                    '<span class="text-primary">'+json.SubjectName+'</span>  学科最高分 ' +
                    '<span class="text-primary">'+json.SchoolScoreMax+' </span>分（' +
                    '<span class="text-primary">'+json.SchoolMaxClass+ json.SchoolMaxUser + ' </span>）。';
                $("#j_zuigaofen-desc").html(sumHtml);

                // 联考前5
                var lianKao = [];
                var ExamList = json.ExamList;
                for(var i = 0 ; i < ExamList.length; i++){
                    lianKao[i] = {};
                    lianKao[i].Score = ExamList[i].Score;
                    lianKao[i].School = ExamList[i].SchoolName;
                };
                // 本校前5
                var BenXiao = [];
                var SchoolList = json.SchoolList;
                for(var i = 0 ; i < SchoolList.length; i++){
                    BenXiao[i] = {};
                    BenXiao[i].Score = SchoolList[i].Score;
                    BenXiao[i].School = SchoolList[i].ClassName;
                    BenXiao[i].Name = SchoolList[i].UserName;
                }
                // 联考前5
                $liankaoZuigaofen.html(template("tpl_liankao-zuigaofen",lianKao));
                // 本校前5
                $banZuigaofen.html(template("tpl_benxiao-zuigaofen",BenXiao));

                analy.outputHtmlToExcel("#liankao_Zuigaofen,#j_banZuigaofen");
            }else{
                $liankaoZuigaofen.subDataEmpty(0);
                $banZuigaofen.subDataEmpty(0);
            }
        })
    };
});