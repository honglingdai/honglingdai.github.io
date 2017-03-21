define(function (require, exports) {
    var analy = require("analy");

    var template = {
        table_pingjunfen:function(json){
            var SubjectInfo = json.Subject;
            var Schoolinfo = json.School;
            var table = "";
            table +='<thead>'+
                '<tr>'+
                '<th><b>学科名称</b></th>';
            for(var i = 0; i < SubjectInfo.length;i++){
                table += '<th><b>' + SubjectInfo[i].SubjectName + '</b></th>'
            }
            table += '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>联考平均分</b></td>';
            for(var k =0; k < SubjectInfo.length; k++){
                table+= '<td>'+SubjectInfo[k].ExamAvgScore+'</td>'
            }
            table += '</tr>'+
                '<tr>'+
                '<td><b>最高平均分（校）</b></td>';
            for(var l =0; l < SubjectInfo.length; l++){
                table+= '<td>'+SubjectInfo[l].MaxSchoolScoreAvg+'</td>'
            }
            table += '</tr>'+
                '<tr>'+
                '<td><b>所属学校</b></td>';
            for(var m =0; m < SubjectInfo.length; m++){
                table+= '<td>'+SubjectInfo[m].MaxAvgScoreSchool+'</td>'
            }
            table += '</tr>'+
                '<tr>'+
                '<td><b>区域平均分</b></td>';
            for(var n =0; n < SubjectInfo.length; n++){
                table+= '<td>'+SubjectInfo[n].AreaAvgScore + '</td>'
            }
            table += '</tr>';
            for(var b =0; b < Schoolinfo.length; b++){
                var subject = Schoolinfo[b];
                table += '<tr>'+
                    '<td><b>'+ Schoolinfo[b].SchoolName+'</b></td>';
                for(var c =0; c < subject.SchoolAvgScore.length; c++){
                    table += '<td>'+ subject.SchoolAvgScore[c]+ "（第"+subject.SchoolLimit[c]+ "名）" +'</td>'
                }
                table +=  '</tr>';
            }
            table+= '</tbody>';
            return table;
        },
        chart_pingjunfen:function(opts){
            console.log(opts)
            option = {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data:opts.legend,
                    bottom:2
                },
                grid:{
                    top:40,
                    left:10,
                    // right:20,
                    bottom:80,
                    borderColor:"#aaa",
                    containLabel:true
                },
                legend: {
                    data:["1语文","英语","数学","物理"],
                    x:"center",
                    y:"bottom"
                },
                xAxis : [
                    {
                        type : 'value',
                        max:1,
                        min:-1,
                        axisLine:{show:true}
                    }
                ],
                yAxis : [
                    {
                        type : 'category',
                        axisTick : {show: true},
                        splitLine : {show: true},
                        axisLine:{show:true,onZero:true},
                        data : opts.name
                    }
                ],
                dataZoom: [
                    {
                        type:'slider',
                        show: true,
                        right:20,
                        yAxisIndex: [0],
                        start: 0
                    }
                ],
                series : [
                    {
                        name:"1语文",
                        type:'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'left'
                            }
                        },
                        data:[0.23, -0.5, -0.23]
                    },
                    {
                        name:'英语',
                        type:'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'left'
                            }
                        },
                        data:[0.23, -0.5, 0.56]
                    },{
                        name:'数学',
                        type:'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'left'
                            }
                        },
                        data:[0.22, 0.56, -0.5]
                    },{
                        name:'物理',
                        type:'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'left'
                            }
                        },
                        data:[0.23, -0.5, -0.23]
                    }
                ]
            };
            return option;
        }

    };

    // 平均分与标准分
    exports.region_zuigaofen = function(){
        var param={
            params:["AvgScore"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                var $table = $("#j_pingjunfenBiaozhunfen");
                //表格
                $table.html(template.table_pingjunfen(data.data));
                analy.isShowMore($table);
                analy.outputHtmlToExcel($table);

                $("#chart_xuekebiaozhunfen").height(800);

                var opts = {};
                opts.name = [];
                opts.series = [];
                opts.legend = [];
                var arr = [];
                for(var j = 0 ; j < data.data.Subject.length; j++){
                    arr.push(data.data.Subject[j].SubjectName)
                }
                for(var i = 0 ; i < data.data.School.length; i++){
                    opts.name.push(data.data.School[i].SchoolName);
                    opts.series.push(data.data.School[i].SchoolZScore);
                    opts.legend.push(arr)

                }

                $.chart(template.chart_pingjunfen(opts),"#chart_xuekebiaozhunfen");
            }else{
                $table.subDataEmpty(0);
            }
        })
    };
});