define(function (require, exports, module) {
    require("./student");
    require("analy");
    var m1 = require("./modules/xs-chengjigk");
    var paiming = require("./modules/xs-chengjipm");
    var zuigaofen = require("./modules/xs-chengjizuigaofenPingjunfen");
    var jinbuchengdu = require("./modules/xs-chengjijinbucd");
    var gekeqingkuang = require("./modules/xs-chengjigekeqk");
    var m6 = require("./modules/xs-chengjixj");
    var chengjiJs = {
        init:function(){
            var e = this;
            e.gaikuang();
            e.paiming();
            e.zuigaofenPingjunfen();
            e.jinbuchengdu();
            e.gekeqingkuang();
        },
        //成绩概况
        gaikuang:function(){
            var subName = $.cookie("subjectName");
            m1.chengjigkTable(
                function(){
                    //获取学科Cookie
                    // 标记当前学科
                    if(subName){
                        var $table = $("#j_chengjigkTable");
                        var $th = $table.find("thead").find("th");
                        $th.each(function(i){
                            var $this = $(this);
                            if($this.text() == subName){
                                $this.addClass("text-danger");
                                $table.find("tr td:nth-child("+(i+1)+")").addClass("text-danger");
                            }
                        })
                    }
                }
            );
        },
        //成绩排名
        paiming:function(){
            paiming.paiming();
        },
        //最高分与平均分对比
        zuigaofenPingjunfen:function(){
            //本校学科标准分比较图
            zuigaofen.chengjizuigaofenPingjunfen()
        },
        //成绩进步程度
        jinbuchengdu:function(){
            jinbuchengdu.chengjijinbucd()
        },
        //各科考试情况
        gekeqingkuang:function(){
            gekeqingkuang.gekeqk()
        }
    }
    chengjiJs.init();
});