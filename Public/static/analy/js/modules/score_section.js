define(function (require, exports) {
    var analy = require("analy");
    var $fenshuduan = $("#j_fenshuduan");

    // 模板
    var template = {
        teacher_table:function(list){
            var html = "";
            html += '<thead>'+
                '<tr>'+
                '<th rowspan="2"><b>分数段</b></th>';
            for(var i = 0; i < list.length; i++){
                html += '<th colspan="2"><b>' + list[i].Proposition + '</b></th>'
            }
            html += '</tr>'+
                '<tr>';
            for(var j = 0; j < list.length; j++){
                html += '<th><b>本校</b></th>'+
                    '<th><b>本班</b></th>'
            }
            html += '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>人数</b></td>';
            for(var k = 0; k < list.length; k++){
                var schoollist = list[k].School;
                var classlist = list[k].Class;

                html+= '<td>' + schoollist.UserNum + '</td>';
                html+= '<td>' + classlist.UserNum + '</td>';
            }
            html +=  '</tr>'+
                '<tr>'+
                '<td><b>人数累计</b></td>';
            for(var f = 0; f < list.length; f++){
                var schoollist = list[f].School;
                var classlist = list[f].Class;

                html+= '<td>' + schoollist.UserSum + '</td>'+
                    '<td>' + classlist.UserSum + '</td>';
            }
            html +=  '</tr>'+
                '<tr>'+
                '<td><b>百分比%</b></td>';
            for(var g = 0; g < list.length; g++){
                var schoollist = list[g].School;
                var classlist = list[g].Class;

                html+= '<td>' + schoollist.UserRate + '</td>'+
                    '<td>' + classlist.UserRate + '</td>';
            }
            html +=  '</tr></tbody>';
            return html;
        },
        rector_desc:function(data){
            return '本次考试高分段（'+
            '<span class="text-primary">'+data.HighScore+'分</span>）人数总计 '+
            '<span class="text-primary">'+data.ExamHighScoreNum+'</span> 人，占考生人数 '+
            '<span class="text-primary">'+data.ExamHighScoreRate+'%</span>；我校高分段人数 '+
            '<span class="text-primary">'+data.SchoolHighScoreNum+'</span> 人，占全校考生人数的 '+
            '<span class="text-primary">'+data.SchoolHighScoreRate+'%</span> 。其他分数段分布图如下：';
        },
        rector_table:function(list){
            var html = "";
            html += '<thead>' +
                '<tr>' +
                '<th rowspan="2"><b>分数段</b></th>';
            for (var m = 0; m < list.length; m++) {
                html += '<th colspan="2"><b>' + list[m].Proposition + '</b></th>'
            }
            ;
            html += '</tr>' +
                '<tr>';
            for (var n = 0; n < list.length; n++) {
                html += '<th><b>本校</b></th>' +
                    '<th><b>本班</b></th>'
            }
            html += '</thead>'+
                '<tbody>' +
                '<tr>' +
                '<td><b>人数</b></td>';
            for (var x = 0; x < list.length; x++) {
                var schoollist = list[x].School;
                var classlist = list[x].Exam;

                html += '<td>' + classlist.UserNum + '</td>'+
                    '<td>' + schoollist.UserNum + '</td>';
            }
            html += '</tr><tr>' +
                '<td><b>人数累计</b></td>';
            for (var y = 0; y < list.length; y++) {
                var schoollist = list[y].School;
                var classlist = list[y].Exam;

                html += '<td>' + classlist.UserSum + '</td>'+
                    '<td>' + schoollist.UserSum + '</td>';
            }

            html += '</tr>';
            html += '<tr>' +
                '<td><b>百分比%</b></td>';
            for (var i = 0; i < list.length; i++) {
                var schoollist = list[i].School;
                var classlist = list[i].Exam;

                html += '<td>' + classlist.UserRate + '</td>';
                html += '<td>' + schoollist.UserRate + '</td>';
            }
            html += '</tr>';
            return html;
        },
        region_desc:function(data){
            return '本次考试高分段（'+
                '<span class="text-primary">'+data.SScoreLine+'分</span>）人数总计 '+
                '<span class="text-primary">'+data.ExamUserNum+'</span> 人，占考生人数 '+
                '<span class="text-primary">'+data.ExamUserRate+'%</span>；我署管辖区高分段人数 '+
                '<span class="text-primary">'+data.AreaUserNum+'</span> 人，占全校考生人数的 '+
                '<span class="text-primary">'+data.AreaUserRate+'%</span> 。其他分数段分布图如下：';
        },
        region_table:function(list){
            var html = "";
            html += '<thead>' +
                '<tr>' +
                '<th rowspan="2"><b>分数段</b></th>';
            for (var m = 0; m < list.length; m++) {
                html += '<th colspan="2"><b>' + list[m].Proposition + '</b></th>'
            }
            html += '</tr>' +
                '<tr>';
            for (var n = 0; n < list.length; n++) {
                html += '<th><b>总体</b></th>' +
                    '<th><b>本区</b></th>'
            }
            html += '</thead>'+
                '<tbody>' +
                '<tr>' +
                '<td><b>人数</b></td>';
            for (var x = 0; x < list.length; x++) {
                var examlist = list[x].Exam;
                var arealist = list[x].Area;

                html += '<td>' + examlist.UserNum + '</td>'+
                    '<td>' + arealist.UserNum + '</td>';
            }
            html += '</tr><tr>' +
                '<td><b>人数累计</b></td>';
            for (var y = 0; y < list.length; y++) {
                var examlist = list[y].Exam;
                var arealist = list[y].Area;

                html += '<td>' + examlist.UserSum + '</td>'+
                    '<td>' + arealist.UserSum + '</td>';
            }

            html += '</tr>';
            html += '<tr>' +
                '<td><b>百分比%</b></td>';
            for (var i = 0; i < list.length; i++) {
                var examlist = list[i].Exam;
                var arealist = list[i].Area;

                html += '<td>' + examlist.UserRate + '</td>';
                html += '<td>' + arealist.UserRate + '</td>';
            }
            html += '</tr>';
            return html;
        }
    };

    // 学科老师
    exports.teacher = function(){
        var params={
            params:["fractionalSegment"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        $.analyzeHandler(params,function(data){
            if(data.status===1){

                //表格
                $fenshuduan.html(template.teacher_table(data.data));
                analy.outputHtmlToExcel($fenshuduan);

                /*echart表*/
                var eachArr = function(num,opt){
                    var arr = [];
                    var newList = data.data;
                    for(var i = 0 ; i < newList.length; i++){
                        var item = newList[i][num][opt];
                        if(item === null){
                            item = "--"
                        }
                        arr.push(item)
                    }
                    return arr;
                };
                var opts = {};
                var list = data.data;
                opts.name = ["本校分数段","本班分数段"];
                opts.series = [];
                opts.series[0] = eachArr("School","UserRate");
                opts.series[1] = eachArr("Class","UserRate");
                opts.xAxis = [];
                for(var i = 0 ; i < list.length; i++){
                    opts.xAxis.push(list[i]["Proposition"])
                }
                analy.chartScoreSection("#chart_fenshuduan",opts);
            }else{
                $fenshuduan.subDataEmpty(0);
            }
        })
    };
    // 校长数据
    exports.rector = function(){
        var param;
        if(role == 4){  //校长参数
            param={
                params:["fractionalSegment"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                schoolID:$.cookie("analy_SchoolID")
            };
        }else if(role == 5){
            param={
                params:["schoolScoreSegment"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                areaID: $.cookie("analy_AreaID"),
                schoolID:$.cookie("analy_SchoolID")
            };
        }
        $.analyzeHandler(param,function(data){
            console.log(data)
            if(data.status===1){
                // 分数段总结
                $("#j_fenshuduanDesc").html(template.rector_desc(data.data));
                //表格
                $fenshuduan.html(template.rector_table(data.data.ScoreList));
                analy.outputHtmlToExcel($fenshuduan);

                //echart表
                var eachArr = function(num,opt){
                    var arr = [];
                    var newList = data.data.ScoreList;
                    for(var i = 0 ; i < newList.length; i++){
                        var item = newList[i][num][opt];
                        if(item === null){
                            item = "--"
                        }
                        arr.push(item)
                    }
                    return arr;
                };
                var opts = {};
                var json = data.data.ScoreList;
                opts.name = ["总体分数段","本校分数段"];
                opts.series = [];
                opts.series[0] = eachArr("Exam","UserRate");
                opts.series[1] = eachArr("School","UserRate");
                opts.xAxis = [];
                for(var i = 0 ; i < json.length; i++){
                    opts.xAxis.push(json[i]["Proposition"])
                }
                analy.chartScoreSection("#chart_fenshuduan",opts);
            }
            else{
                $fenshuduan.subDataEmpty(0);
            }
        })
    };
    //区域数据
    exports.region = function(){
        var param={
            params:["ScoreSegment"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){

                // 分数段总结
                $("#j_fenshuduanDesc").html(template.region_desc(data.data));
                //表格
                $fenshuduan.html(template.region_table(data.data.ProList));
                analy.outputHtmlToExcel($fenshuduan);
                //echart表
                var eachArr = function(num,opt){
                    var arr = [];
                    var newList = data.data.ProList;
                    for(var i = 0 ; i < newList.length; i++){
                        var item = newList[i][num][opt];
                        if(item === null){
                            item = "--"
                        }
                        arr.push(item)
                    }
                    return arr;
                };
                var opts = {};
                var json = data.data.ProList;
                opts.name = ["总体分数段","本区分数段"];
                opts.series = [];
                opts.series[0] = eachArr("Exam","UserRate");
                opts.series[1] = eachArr("Area","UserRate");
                opts.xAxis = [];
                for(var i = 0 ; i < json.length; i++){
                    opts.xAxis.push(json[i]["Proposition"])
                }
                analy.chartScoreSection("#chart_fenshuduan",opts);
            }
            else{
                $fenshuduan.subDataEmpty(0);
            }
        })
    };
});