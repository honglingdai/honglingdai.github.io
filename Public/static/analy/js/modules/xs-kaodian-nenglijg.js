define(function (require, exports, module) {
    //各科考试情况
    require("../getData");
    // var url_getNenglijg = "/Analysis/Index/getApi.html?getNenglijg";

    exports.skillAnalysis=function(){
        var data = {
            "item":['表达应用','分析综合','鉴赏评价','理解','识记'],
            "min":[0,0,0,0,0],
            "max":[150,150,150,150,150],
            "series":[[130, 119, 120, 90, 82],[120, 120, 120, 80, 80],[110, 110, 110, 75, 75]],
            "name":["我的能力分布","A线达标能力分布","B线达标能力分布"]
        };

            var list = data;
            //生成指标
            function outIndicator(list){
                var arr=[],item = list.item,max = list.max,min=list.min;
                for(var i=0;i<max.length;i++){
                    var ind = {};
                    ind.text=item[i];
                    ind.max=max[i];
                    ind.min=min[i];
                    arr.push(ind);
                }
                return arr;
            }
            var option = {
                title: {
                    show:false,
                    text: '各科考试情况'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                tooltip: {},
                legend: {
                    right:"15%",
                    top:"5%",
                    orient:"vertical",
                    data:list.name
                },
                radar: [
                    {
                        indicator: outIndicator(list),
                        name:{
                            textStyle: {
                                fontSize:14
                            }

                        },
                        axisLabel:{
                            textStyle:{
                                color:"#e00"
                            }
                        },
                        center: ['35%','50%'],
                        radius: "80%"
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        data: [
                            {
                                value: list.series[0],
                                name:list.name[0]
                            },{
                                value: list.series[1],
                                name:list.name[1],
                                areaStyle:{
                                    normal:{
                                        opacity:0
                                    }
                                }
                            },{
                                value: list.series[2],
                                name:list.name[2],
                                areaStyle:{
                                    normal:{
                                        opacity:0
                                    }
                                }
                            }

                        ]
                    }
                ]
            };
            // $("#chart_skillAnalysis").height(400);
            // $.chart(option,"#chart_skillAnalysis");
    };
});