define(function (require, exports, module) {
//echarts
    !function(){
        if($("#chart_nandufenbu").length>0){
            //难度分布
            var Echarts = echarts.init($("#chart_nandufenbu")[0]);
            var option = {
                title:{
                    text:"难度分布图",
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
        if($("#chart_qufendufenbu").length>0){
            //区分度分布
            var Echarts = echarts.init($("#chart_qufendufenbu")[0]);
            var option = {
                title:{
                    text:"区分度分布图",
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
});