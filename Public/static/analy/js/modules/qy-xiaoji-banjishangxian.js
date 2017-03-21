define(function (require, exports) {
    var analy = require("analy");
    //表格数据
    exports.banjishangxian = function(){
        var param={
            params:["areaOnLine"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            var $banjishangxian = $("#region-banjishangxian");
            if(data.status===1){
                var json = data.data,
                    Subject = json.Subject,
                    GroupList = json.GroupList,
                    html = "";
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
                for(var n = 0; n <GroupList.length; n++){
                    var SubjectListTotle = GroupList[n].SubjectList,
                        SubjectList = SubjectListTotle.slice(0,-1),
                        totleScore = SubjectListTotle.pop();
                    html += '<tr>'+
                        '<td rowspan="2" ><b>' + GroupList[n].GroupName + '<br />('+GroupList[n].GroupNum+'人)</b></td>'+
                        '<td><b>单上线</b></td>';
                    for(var j = 0; j < SubjectList.length;j++){
                        html += '<td>'+SubjectList[j].ASingleNum+'<br/>('+SubjectList[j].ASingleRate+'%)</td>'+
                            '<td>'+SubjectList[j].BSingleNum+'<br/>('+SubjectList[j].BSingleRate+'%)</td>'
                    }
                    html += '<td rowspan="2">'+totleScore.ADoubleNum+'<br/>('+totleScore.ADoubleRate+'%)' + '</td>'+
                        '<td rowspan="2">'+totleScore.BDoubleNum+'<br/>('+totleScore.BDoubleRate+'%)' + '</td>'+
                        '</tr><tr>' +
                        '<td><b>双上线</b></td>';
                    for(var k = 0; k < SubjectList.length;k++){
                        html += '<td>'+SubjectList[k].ADoubleNum+'<br/>('+SubjectList[k].ADoubleRate+'%)</td>'+
                            '<td>'+SubjectList[k].BDoubleNum+'<br/>('+SubjectList[k].BDoubleRate+'%)</td>'
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