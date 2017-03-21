define(function (require, exports) {
    var analy = require("analy");

    /*平均分与标准分*/
    exports.pingjunfenBiaozhunfen = function(){
        var param={
            params:["getAvgScore"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        if(role === "4"){
            //校长参数
            param.schoolID = $.cookie("analy_SchoolID");
            delete param.classID;
        }
        if(role == 5){
            //区域权限参数
            param.schoolID = $.cookie("analy_SchoolID");
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param,function(data){

            //表格
            var $tableid = $("#j_pingjunfenBiaozhunfen");
            if(data.status===1){
                var SubjectInfo = data.data.Subject;
                var Schoolinfo = data.data.School;
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
                    '<td><b>我校平均分</b></td>';
                for(var n =0; n < SubjectInfo.length; n++){
                    table+= '<td>'+SubjectInfo[n].UserSchoolScoreAvg + '（第'+SubjectInfo[n].UserSchoolLimit+'名）'+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>标准分</b></td>';
                for(var x =0; x < SubjectInfo.length; x++){
                    table+= '<td>'+SubjectInfo[x].SchoolZScore+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>一本上线平均分</b></td>';
                for(var y =0; y < SubjectInfo.length; y++){
                    table+= '<td>'+SubjectInfo[y].ExamAScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本校一本平均分</b></td>';
                for(var z =0; z < SubjectInfo.length; z++){
                    table+= '<td>'+SubjectInfo[z].SchoolAScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>二本上线平均分</b></td>';
                for(var w =0; w < SubjectInfo.length; w++){
                    table+= '<td>'+SubjectInfo[w].ExamBScoreAvg+'</td>'
                }
                table += '</tr>'+
                    '<tr>'+
                    '<td><b>本校二本平均分</b></td>';
                for(var a =0; a < SubjectInfo.length; a++){
                    table+= '<td>'+SubjectInfo[a].SchoolBScoreAvg+'</td>'
                }
                table+= '</tr>';
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
                // 插入表格内容
                $tableid.html(table);
                // 表格默认显示行数
                analy.isShowMore($tableid);
                // 表格头部固定
                analy.theadfixed($tableid);
                // 导出excel
                analy.outputHtmlToExcel($tableid);
                //图表
                /*echart表*/
                var eachArr = function(num){
                    var arr = [];
                    for(var i = 0 ; i < SubjectInfo.length; i++){
                        var item = SubjectInfo[i][num];
                        arr.push(item)
                    }
                    return arr;
                };
                var list ={};
                if(role === "2"){
                    // 班主任图表
                    list.name = ["本班标准分","本校标准分"];
                        // "xAxis":["650-600", "600-550", "550-500", "500-450", "450-400", "400-350", "350-300"],
                        // "series":[[5, 10, 22, 30, 23, 12, 2],[4, 19, 24, 34, 20, 11, 2]]
                    list.xAxis = eachArr("SubjectName");
                    list.series = [];
                    list.series[0] = eachArr("ClassZScore");
                    list.series[1] = eachArr("SchoolZScore");
                    var optiondata = {
                        title:{
                            text:"本校学科标准分比较图",
                            x:"center"
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
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
                }else if(role == "4" || role == "5"){
                    // 校长图表 区域图表
                    list.name = ["本校标准分"];
                    list.xAxis = eachArr("SubjectName");
                    list.series = eachArr("SchoolZScore");
                    var optiondata = {
                        title:{
                            text:"本校学科标准分比较图",
                            x:"center"
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        // legend: {
                        //     data:list.name,
                        //     bottom:5
                        // },
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
                                name:list.name,
                                type:'bar',
                                barWidth:"40%",
                                data:list.series,
                                label: {
                                    normal: {
                                        show: true,
                                        position: "top"
                                    }
                                }
                            }
                        ]
                    };
                }

                $("#chart_pingjunfenBiaozhunfen").height(400).show();
                $.chart(optiondata,"#chart_pingjunfenBiaozhunfen");
            }
            else{
                $tableid.subDataEmpty(0);
            }
        })
    };

});