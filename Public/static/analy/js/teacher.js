define(function (require, exports, module) {

    var teacherJs = {
        init:function(){
            var e = this;
            e.chengji();
        },
        //考试概括
        kaodianJs:function(){},
        //描述性统计
        descTongji:function(){},
        //上线情况
        shangxian:function(){},
        //成绩分析
        chengji:function(){
            !function(){
                if($("#chart_liankaoqian50").length>0){
                    //联考成绩排名（前50名）
                    var Echarts = echarts.init($("#chart_liankaoqian50")[0]);
                    var option = {
                        title:{
                            text:"联考前50名学校分布图",
                            x:'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                        },
                        series: [
                            {
                                name:'访问来源',
                                type:'pie',
                                radius: ['30%', '60%'],
                                center: ['50%', '63%'],

                                data:[
                                    {value:335, name:'直达'},
                                    {value:310, name:'邮件营销'},
                                    {value:234, name:'联盟广告'},
                                    {value:135, name:'视频广告'},
                                    {value:1048, name:'百度'},
                                    {value:251, name:'谷歌'},
                                    {value:147, name:'必应'},
                                    {value:102, name:'其他'}
                                ]
                            }
                        ]
                    };
                    Echarts.setOption(option);
                    $(window).resize(Echarts.resize);
                }

            }()
            !function(){
                if($("#chart_liankaoqian100").length>0){
                    //联考成绩排名（前100名）
                    var Echarts = echarts.init($("#chart_liankaoqian100")[0]);
                    var option = {
                        title:{
                            text:"联考前100名学校分布图",
                            x:'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                        },
                        series: [
                            {
                                name:'访问来源',
                                type:'pie',
                                radius: ['30%', '60%'],
                                center: ['50%', '63%'],

                                data:[
                                    {value:335, name:'直达'},
                                    {value:310, name:'邮件营销'},
                                    {value:234, name:'联盟广告'},
                                    {value:135, name:'视频广告'},
                                    {value:1048, name:'百度'},
                                    {value:251, name:'谷歌'},
                                    {value:147, name:'必应'},
                                    {value:102, name:'其他'}
                                ]
                            }
                        ]
                    };
                    Echarts.setOption(option);
                    $(window).resize(Echarts.resize);
                }

            }()


            //本校
            !function(){
                if($("#chart_benxiaoqian50").length>0){
                    //本校学生成绩排名（前50名）
                    var Echarts = echarts.init($("#chart_benxiaoqian50")[0]);
                    var option = {
                        title:{
                            text:"本校前50名学校分布图",
                            x:'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                        },
                        series: [
                            {
                                name:'访问来源',
                                type:'pie',
                                radius: ['30%', '60%'],
                                center: ['50%', '63%'],

                                data:[
                                    {value:335, name:'直达'},
                                    {value:310, name:'邮件营销'},
                                    {value:234, name:'联盟广告'},
                                    {value:135, name:'视频广告'},
                                    {value:1048, name:'百度'},
                                    {value:251, name:'谷歌'},
                                    {value:147, name:'必应'},
                                    {value:102, name:'其他'}
                                ]
                            }
                        ]
                    };
                    Echarts.setOption(option);
                    $(window).resize(Echarts.resize);
                }

            }()
            !function(){
                if($("#chart_benxiaoqian100").length>0){
                    //本校学生成绩排名（前100名）
                    var Echarts = echarts.init($("#chart_benxiaoqian100")[0]);
                    var option = {
                        title:{
                            text:"本校前100名学校分布图",
                            x:"center"
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['直达','营销广告','搜索引擎','邮件营销','联盟广告','视频广告','百度','谷歌','必应','其他']
                        },
                        series: [
                            {
                                name:'访问来源',
                                type:'pie',
                                radius: ['30%', '60%'],
                                center: ['50%', '63%'],

                                data:[
                                    {value:335, name:'直达'},
                                    {value:310, name:'邮件营销'},
                                    {value:234, name:'联盟广告'},
                                    {value:135, name:'视频广告'},
                                    {value:1048, name:'百度'},
                                    {value:251, name:'谷歌'},
                                    {value:147, name:'必应'},
                                    {value:102, name:'其他'}
                                ]
                            }
                        ]
                    };
                    Echarts.setOption(option);
                    $(window).resize(Echarts.resize);
                }

            }()

        },
        //本班学情分析
        benban:function(){}
    }
    teacherJs.init();

});