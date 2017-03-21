define(function (require, exports) {
    //各科考试情况
    require("../getData");
    require("analy");
    exports.xiaojie=function(){
        var param={
            params:["getGaikuangXiaojie"]
        };
        $.analyzeHandler(param,function(data){
            if(data.status ===1){
                var tpl = '';
                tpl += '<p>本次考试，提交了考试成绩进行分析的学校有\
            <span class="text-primary">8</span> 所，总计有\
            <span class="text-primary">7262</span> 理科考生参与分析，参加 生物 学科考生人数\
            <span class="text-primary">7306</span> 人。其中普高中学\
            <span class="text-primary">8</span> 所。我校参加 生物 考试人数\
            <span class="text-primary">1181</span> 人，均分 70.4 分。</p>\
            <p>本次考试 生物 一本有效分\
            <span class="text-primary">78</span> 分；二本有效分\
            <span class="text-primary">64</span> 分。我校 生物 一本单上线人数\
            <span class="text-primary">401</span> 人 (上线率\
            <span class="text-primary">34%</span>)，双上线人数\
            <span class="text-primary">287</span>人；二本单上线人数\
            <span class="text-primary">846</span> 人(上线率\
            <span class="text-primary">72%</span>)，双上线人数\
            <span class="text-primary">755</span> 人。</p>';
                $("#j_desc").html(tpl);
            }
        });
    };
});