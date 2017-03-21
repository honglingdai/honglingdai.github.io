define(function (require, exports) {
    var analy = require("analy");

    //本区学科标准分比较图
    exports.xuekebiaozhunfen = function(){

        option = {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:['语文', '英语', '数学','物理'],
                bottom:2
            },
            grid:{
                top:40,
                left:10,
                right:10,
                bottom:80,
                borderColor:"#aaa",
                containLabel:true
            },
            xAxis : [
                {
                    type : 'value',
                    max:1,
                    min:-1
                }
            ],
            yAxis : [
                {
                    type : 'category',
                    axisTick : {show: false},
                    data : ['某第一中学','某第二中学','某第二中学','某第二中学','某第二中学','某第二中学','某第二中学']
                }
            ],
            dataZoom: [
                {
                    show: true,
                    type: 'slider',
                    right:20,
                    yAxisIndex: [0],
                    start: 0
                }
            ],
            series : [
                {
                    name:'语文',
                    type:'bar',
                    label: {
                        // normal: {
                        //     show: true,
                        //     position: 'left'
                        // }
                    },
                    data:[0.22, 0.45, 0.56, -0.5, 0.11, 0.23, 0.55]
                },
                {
                    name:'英语',
                    type:'bar',
                    stack: '总量',
                    label: {
                        // normal: {
                        //     show: true,
                        //     position: 'left'
                        // }
                    },
                    data:[0.23, -0.5, 0.56, -0.23, 0.48, 0.65, 0.26]
                },{
                    name:'数学',
                    type:'bar',
                    label: {
                        // normal: {
                        //     show: true,
                        //     position: 'left'
                        // }
                    },
                    data:[0.22, 0.45, 0.56, -0.5, 0.11, 0.23, 0.55]
                },{
                    name:'物理',
                    type:'bar',
                    label: {
                        // normal: {
                        //     show: true,
                        //     position: 'left'
                        // }
                    },
                    data:[0.23, -0.5, 0.56, -0.23, 0.48, 0.65, 0.26]
                }
            ]
        };
        $("#chart_xuekebiaozhunfen").height(800);
        $.chart(option,"#chart_xuekebiaozhunfen");
    };
});