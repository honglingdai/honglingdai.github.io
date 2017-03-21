define(function (require, exports) {
    var analy = require("analy");
    //表格数据
    exports.banjishangxian = function(){
        var param={
            params:["getClassOnLine"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        if(role === 5){
            param.params = ["areaOnLine"];
            param.areaID = $.cookie("analy_AreaID");
            delete param.schoolID;
        }
        $.analyzeHandler(param,function(data){
            var $banjishangxian = $("#xz-banjishangxian");
            if(data.status===1){
                var json = data.data;
                var Subject = json.Subject;
                var ClassInfo = json.ClassInfo;
                var html = "";
                console.log()
                html += '<thead>'+
                    '<tr>'+
                    '<th width="80" rowspan="2"><b>班级</b></th>'+
                    '<th rowspan="2"><b>指标</b></th>';
                for(var i= 0; i < Subject.length;i++){
                    html += '<th colspan="2"><b>' +Subject[i].SubjectName+ '</th>'
                }
                html += '</tr><tr>';
                for(var m= 0; m < Subject.length;m++){
                    html += '<th><b>一本</b></th>'+
                        '<th><b>二本</b></th>'
                }
                html += '</tr></thead>'+
                    '<tbody>';
                for(var n = 0; n <ClassInfo.length; n++){
                    var SubjectListTotle = ClassInfo[n].SubjectList;
                    var SubjectList = SubjectListTotle.slice(0,-1);
                    var totleScore = SubjectListTotle.pop();
                    html += '<tr>'+
                        '<td rowspan="2" ><b>' + ClassInfo[n].ClassName + '<br />('+ClassInfo[n].UserNum+'人)</b></td>'+
                        '<td><b>单上线</b></td>';
                    for(var j = 0; j < SubjectList.length;j++){
                        html += '<td>'+SubjectList[j].ASingleLineNum+'<br/>('+SubjectList[j].ASingleLineRate+'%)</td>'+
                            '<td>'+SubjectList[j].BSingleLineNum+'<br/>('+SubjectList[j].BSingleLineRate+'%)</td>'
                    }
                    html += '<td rowspan="2">'+totleScore.ADoubleLineNum+'<br/>('+totleScore.ADoubleLineRate+'%)' + '</td>'+
                        '<td rowspan="2">'+totleScore.BDoubleLineNum+'<br/>('+totleScore.BDoubleLineRate+'%)' + '</td>'+
                        '</tr><tr>' +
                        '<td><b>双上线</b></td>';
                    for(var k = 0; k < SubjectList.length;k++){
                        html += '<td>'+SubjectList[k].ADoubleLineNum+'<br/>('+SubjectList[k].ADoubleLineRate+'%)</td>'+
                            '<td>'+SubjectList[k].BDoubleLineNum+'<br/>('+SubjectList[k].BDoubleLineRate+'%)</td>'
                    }
                    html += '</tr>'
                }
                html += '</tbody>';

                $banjishangxian.html(html);
                analy.isShowMore($banjishangxian,4);
                analy.theadfixed($banjishangxian);
                analy.outputHtmlToExcel($banjishangxian);
            }
        })
    };
});