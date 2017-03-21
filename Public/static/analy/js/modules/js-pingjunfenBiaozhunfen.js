define(function (require, exports) {
    var analy = require("analy");
    // 平均分与标准分
    exports.pingjunfenBiaozhunfen = function(){
        var param={
            params:["teacherscoreAvg"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        $.analyzeHandler(param,function(data){
            var $tableid = $("#j_pingjunfenBiaozhunfen");
            if(data.status===1){
                var json = data.data;
                var SubjectInfo = json.SubjectInfo;
                //根据参数生成表格

                var table = "";
                table +='<thead>'+
                    '<tr>'+
                    '<th><b>学科名称</b></th>';
                for(var i = 0; i < SubjectInfo.length;i++){
                    table += '<th data-subject="'+SubjectInfo[i].SubjectID+'"><b>' + SubjectInfo[i].SubjectName + '</b></th>'
                }
                table += '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                    '<tr>'+
                    '<td><b>联考平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].ExamScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本校平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].SchoolScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本校标准分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].SchoolZScore+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本班平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].ClassScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本班标准分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].ClassZScore+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>一本上线平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].ExamAScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本校一本平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].SchoolAScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本班一本平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].ClassAScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>二本上线平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].ExamBScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本校二本平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].SchoolBScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本班二本平均分</b></td>';
                for(var i =0; i < SubjectInfo.length; i++){
                    table+= '<td data-subject="'+SubjectInfo[i].SubjectID+'">'+SubjectInfo[i].ClassBScoreAvg+'</td>'
                }
                table+= '</tr></tbody>';

                $tableid.html(table);
                analy.isShowMore($tableid);
                analy.theadfixed($tableid);
                analy.outputHtmlToExcel($tableid);

                // 学科老师标红
                var subjectID = json.SubjectID;
                $('[data-subject]').each(function(){
                    var $this = $(this);
                    if ($this.data('subject') === (subjectID - 0)) {
                        $this.css({
                            "color": "#ff4b4b",
                            "font-weight": 700
                        })
                    }
                });

                //图表
                /*echart表*/
                var eachArr = function(num){
                    var arr = [];
                    for(var i = 0 ; i < SubjectInfo.length; i++){
                        var item = SubjectInfo[i][num];
                        arr.push(item)
                    }
                    return arr;
                }
                var list = {
                    "name":["本班标准分","本校标准分"],
                    // "xAxis":["650-600", "600-550", "550-500", "500-450", "450-400", "400-350", "350-300"],
                    // "series":[[5, 10, 22, 30, 23, 12, 2],[4, 19, 24, 34, 20, 11, 2]]
                }
                list.xAxis = eachArr("SubjectName");
                list.series = [];
                list.series[0] = eachArr("ClassZScore");
                list.series[1] = eachArr("SchoolZScore");


                var option = {
                    title:{
                        text:"本校学科标准分比较图",
                        x:"center"
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    toolbox: {
                        feature: {
                            // dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data:list.name,
                        bottom:5
                    },
                    grid:{
                        top:55,
                        left:10,
                        right:10,
                        bottom:40,
                        borderColor:"#aaa",
                        containLabel:true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: list.xAxis
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            // min: -1,
                            // max:2,
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }
                    ],
                    series: [
                        {
                            name:list.name[0],
                            type:'bar',
                            barWidth:"40%",
                            data:list.series[0],
                            label: {
                                normal: {
                                    show: true,
                                    position: "top"
                                }
                            }
                        },
                        {
                            name:list.name[1],
                            type:'line',

                            data:list.series[1]
                        }
                    ]
                };
                $("#chart_pingjunfenBiaozhunfen").height(400).show();
                $.chart(option,"#chart_pingjunfenBiaozhunfen");
            }
            else{
                $tableid.subDataEmpty(0);
            }
        })
    };
});