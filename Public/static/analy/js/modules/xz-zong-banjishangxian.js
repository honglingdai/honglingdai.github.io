define(function (require, exports) {
    var analy = require("analy");
    // 各班级上线情况
    var $banjishangxian = $("#xz-banjishangxian");
    var template = {
        rector_createtable:function(json){
            var Subject = json.Subject,
                ClassInfo = json.ClassInfo,
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
            return html;
        },
        region_createtable:function(json){
            var Subject = json.Subject,
                GroupList = json.GroupList,
                html = "";
            html += '<thead>'+
                '<tr>'+
                '<th width="80" rowspan="2"><b>学校</b></th>'+
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
            for(var n = 0; n < GroupList.length; n++){
                var SubjectListTotle = GroupList[n].SubjectList;
                var SubjectList = SubjectListTotle.slice(0,-1);
                var totleScore = SubjectListTotle.pop();
                html += '<tr>'+
                    '<td rowspan="3" ><b>' + GroupList[n].GroupName + '<br />('+GroupList[n].GroupNum+'人)</b></td>'+
                    '<td><b>单上线</b></td>';
                for(var j = 0; j < SubjectList.length;j++){
                    html += '<td>'+SubjectList[j].ASingleNum+'<br/>('+SubjectList[j].ASingleRate+'%)</td>'+
                        '<td>'+SubjectList[j].BSingleNum+'<br/>('+SubjectList[j].BSingleRate+'%)</td>'
                }
                html += '<td rowspan="3">'+totleScore.ASingleNum+'<br/>('+totleScore.ASingleRate+'%)' + '</td>'+
                    '<td rowspan="3">'+totleScore.BSingleNum+'<br/>('+totleScore.BSingleRate+'%)' + '</td>'+
                    '</tr><tr>' +
                    '<td><b>双上线</b></td>';
                for(var k = 0; k < SubjectList.length;k++){
                    html += '<td>'+SubjectList[k].ADoubleNum+'<br/>('+SubjectList[k].ADoubleRate+'%)</td>'+
                        '<td>'+SubjectList[k].BDoubleNum+'<br/>('+SubjectList[k].BDoubleRate+'%)</td>'
                }
                html += '</tr>';
                html += '<tr>'+
                    '<td><b>单上线</b></td>';
                for(var j = 0; j < SubjectList.length;j++){
                    html += '<td>'+SubjectList[j].ALevel+'</td>'+
                        '<td>'+SubjectList[j].BLevel +'</td>'
                }
                html += '</tr>';
            }
            html += '</tbody>';
            return html;
        }
    };
    // 校长各班级上线情况
    exports.rector_banjishangxian = function(){
        //参数配置
        var param = {
                params:["getClassOnLine"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                schoolID : $.cookie("analy_SchoolID")
            };
        if(role == 5){
            //区域ID参数
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                console.log(data.data)
                //表格
                $banjishangxian.html(template.rector_createtable(data.data));
                analy.isShowMore($banjishangxian,4);
                analy.theadfixed($banjishangxian);
                analy.outputHtmlToExcel($banjishangxian);
            }else{
                $banjishangxian.subDataEmpty(0);
            }
        })
    };
    // 区域各班级上线情况
    exports.region_banjishangxian = function(){
        //参数配置
        var param = {
            params:["SchoolOnLine"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID : $.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            console.log(data.data)
            if(data.status===1){
                //表格
                $banjishangxian.html(template.region_createtable(data.data));
                analy.isShowMore($banjishangxian,3);
                analy.theadfixed($banjishangxian);
                analy.outputHtmlToExcel($banjishangxian);
            }else{
                $banjishangxian.subDataEmpty(0);
            }
        })
    };

    // //表格数据
    // exports.banjishangxian = function(){
    //     var params={
    //         params:["getClassOnLine"],
    //         userID: $.cookie("yj_front_UserID"),
    //         examID: $.cookie("analy_ExamID"),
    //         schoolID:$.cookie("analy_SchoolID")
    //     };
    //     $.analyzeHandler(params,function(data){
    //         var $banjishangxian = $("#xz-banjishangxian");
    //         if(data.status===1){
    //             var json = data.data;
    //             var Subject = json.Subject;
    //             var ClassInfo = json.ClassInfo;
    //             var html = "";
    //             html += '<thead>'+
    //                 '<tr>'+
    //                 '<th width="80" rowspan="2"><b>班级</b></th>'+
    //                 '<th rowspan="2"><b>指标</b></th>';
    //             for(var i= 0; i < Subject.length;i++){
    //                 html += '<th colspan="2"><b>' +Subject[i].SubjectName+ '</th>'
    //             }
    //             html += '</tr><tr>';
    //             for(var m= 0; m < Subject.length;m++){
    //                 html += '<th><b>一本</b></th>'+
    //                     '<th><b>二本</b></th>'
    //             }
    //             html += '</tr></thead>'+
    //                 '<tbody>';
    //             for(var n = 0; n <ClassInfo.length; n++){
    //                 var SubjectListTotle = ClassInfo[n].SubjectList;
    //                 var SubjectList = SubjectListTotle.slice(0,-1);
    //                 var totleScore = SubjectListTotle.pop();
    //                 html += '<tr>'+
    //                     '<td rowspan="2" ><b>' + ClassInfo[n].ClassName + '<br />('+ClassInfo[n].UserNum+'人)</b></td>'+
    //                     '<td><b>单上线</b></td>';
    //                 for(var j = 0; j < SubjectList.length;j++){
    //                     html += '<td>'+SubjectList[j].ASingleLineNum+'<br/>('+SubjectList[j].ASingleLineRate+'%)</td>'+
    //                         '<td>'+SubjectList[j].BSingleLineNum+'<br/>('+SubjectList[j].BSingleLineRate+'%)</td>'
    //                 }
    //                 html += '<td rowspan="2">'+totleScore.ADoubleLineNum+'<br/>('+totleScore.ADoubleLineRate+'%)' + '</td>'+
    //                     '<td rowspan="2">'+totleScore.BDoubleLineNum+'<br/>('+totleScore.BDoubleLineRate+'%)' + '</td>'+
    //                     '</tr><tr>' +
    //                     '<td><b>双上线</b></td>';
    //                 for(var k = 0; k < SubjectList.length;k++){
    //                     html += '<td>'+SubjectList[k].ADoubleLineNum+'<br/>('+SubjectList[k].ADoubleLineRate+'%)</td>'+
    //                         '<td>'+SubjectList[k].BDoubleLineNum+'<br/>('+SubjectList[k].BDoubleLineRate+'%)</td>'
    //                 }
    //                 html += '</tr>'
    //             }
    //             html += '</tbody>';
    //
    //             $banjishangxian.html(html);
    //             analy.isShowMore($banjishangxian,4);
    //             analy.theadfixed($banjishangxian);
    //             analy.outputHtmlToExcel($banjishangxian);
    //         }
    //     })
    // };
});