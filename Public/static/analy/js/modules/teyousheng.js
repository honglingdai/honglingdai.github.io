define(function (require, exports) {
    var analy = require("analy");
    // 特优生
    var $table = $("#j_teyousheng");
    var template = {
        baz_Table : function(json){
            var subject = json.Subject,
                UserList = json.UserList,
                html = '';
            html += '<thead>'+
                '<tr>'+
                '<th rowspan="2" width="90"><b>学号</b></th>'+
                '<th rowspan="2" width="45"><b>姓名</b></th>';
            for(var i = 0 ; i < subject.length;i++){
                html += '<th colspan="3"><b>'+ subject[i].SubjectName +'</b></th>'
            }
            html += '</tr>'+
                '<tr>';
            for(var k = 0 ; k < subject.length;k++){
                html += '<th><b>成绩</b></th>'+
                    '<th><b>总名</b></th>'+
                    '<th><b>校名</b></th>'
            }
            html += '</tr>'+
                '</thead>'+
                '<tbody>';

            for(var l = 0 ; l < UserList.length;l++){
                var SubjectList = UserList[l].SubjectList;
                html += '<tr>'+
                    '<td>'+ UserList[l].StudentCode +'</td>'+
                    '<td>'+ UserList[l].UserName +'</td>';
                for(var j = 0 ; j < SubjectList.length;j++){
                    html += '<td>'+SubjectList[j].Score+'</td>'+
                        '<td>'+SubjectList[j].TotalOrder+'</td>'+
                        '<td>'+SubjectList[j].SchoolOrder+'</td>'
                }
                html += '</tr>'
            }
            html += '</tbody>';
            return html;
        },
        rector_table: function(json){
            var subject = json.Subject,
                UserList = json.UserList,
                html = '';
                html += '<thead>'+
                    '<tr>'+
                    '<th width="60" rowspan="2"><b>姓名</b></th>'+
                    '<th width="60" rowspan="2"><b>班级</b></th>';
                for(var i = 0 ; i < subject.length;i++){
                    html += '<th colspan="2"><b>'+ subject[i].SubjectName +'</b></th>'
                }
                html += '</tr>'+
                    '<tr>';
                for(var k = 0 ; k < subject.length;k++){
                    html += '<th><b>成绩</b></th>'+
                        '<th><b>总名</b></th>'
                }
                html += '</tr>'+
                    '</thead>'+
                    '<tbody>';
                for(var l = 0 ; l < UserList.length;l++){
                    var SubjectList = UserList[l].SubjectList;
                    html += '<tr>'+
                        '<td>'+ UserList[l].UserName +'</td>'+
                        '<td>'+ UserList[l].ClassName +'</td>';
                    for(var j = 0 ; j < SubjectList.length;j++){
                        html += '<td>'+SubjectList[j].Score+'</td>'+
                            '<td>'+SubjectList[j].TotalOrder+'</td>'
                    }
                    html += '</tr>'
                }
                html += '</tbody>';
            return html;
        },
        region_table: function(json){
            var subject = json.Subject,
                UserList = json.UserList,
                html = '';
            html += '<thead>'+
                '<tr>'+
                '<th width="100" rowspan="2"><b>学校</b></th>'+
                '<th width="60" rowspan="2"><b>姓名</b></th>';
            for(var i = 0 ; i < subject.length;i++){
                html += '<th colspan="2"><b>'+ subject[i].SubjectName +'</b></th>'
            }
            html += '</tr>'+
                '<tr>';
            for(var k = 0 ; k < subject.length;k++){
                html += '<th><b>成绩</b></th>'+
                    '<th><b>总名</b></th>'
            }
            html += '</tr>'+
                '</thead>'+
                '<tbody>';
            for(var l = 0 ; l < UserList.length;l++){
                var SubjectList = UserList[l].SubjectList;
                html += '<tr>'+
                    '<td>'+ UserList[l].SchoolName +'</td>'+
                    '<td>'+ UserList[l].RealName +'</td>';
                for(var j = 0 ; j < SubjectList.length;j++){
                    html += '<td>'+SubjectList[j].Score+'</td>'+
                        '<td>'+SubjectList[j].TotalOrder+'</td>'
                }
                html += '</tr>'
            }
            html += '</tbody>';
            return html;
        }
    };

    // 本班特优生（模拟分数线 +60 分）--班主任
    exports.teyoushengTable = function(){
        var param = {
            params:["classSpecial"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                $table.html(template.baz_Table(data.data));
                analy.isShowMore($table,1);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }else{
                $table.subDataEmpty(0)
            }
        })
    };

    // 本校特优生--校长
    exports.teyoushengTableRector = function(){
        var param = {
            params:["getSchoolSUser"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        if(role == 5){
            //区域ID参数
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param,function(data){
            if(data.status===1 && data.data.UserList){
                $table.html(template.rector_table(data.data));
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }else{
                $table.subDataEmpty(0)
            }
        })
    };

    // 本区特优生--区域
    exports.teyoushengTableRegion = function(){
        var param = {
            params:["areaSUser"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                console.log(data.data)
                $table.html(template.region_table(data.data));
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }else{
                $table.subDataEmpty(0)
            }
        })
    };



    // 本班特优生（模拟分数线 +60 分）
    // exports.teyoushengTable = function(){
    //     var param = {
    //         params:["classSpecial"],
    //         userID: $.cookie("yj_front_UserID"),
    //         examID: $.cookie("analy_ExamID"),
    //         classID:$.cookie("analy_ClassID")
    //     };
    //     $.analyzeHandler(param,function(data){
    //         if(data.status===1 && data.data.UserList){
    //             var json = data.data,
    //                 subject = json.Subject,
    //                 UserList = json.UserList,
    //                 html = '';
    //             html += '<thead>'+
    //                 '<tr>'+
    //                 '<th rowspan="2" width="90"><b>学号</b></th>'+
    //                 '<th rowspan="2" width="45"><b>姓名</b></th>';
    //             for(var i = 0 ; i < subject.length;i++){
    //                 html += '<th colspan="3"><b>'+ subject[i].SubjectName +'</b></th>'
    //             }
    //             html += '</tr>'+
    //                 '<tr>';
    //             for(var k = 0 ; k < subject.length;k++){
    //                 html += '<th><b>成绩</b></th>'+
    //                     '<th><b>总名</b></th>'+
    //                     '<th><b>校名</b></th>'
    //             }
    //             html += '</tr>'+
    //                 '</thead>'+
    //                 '<tbody>';
    //
    //             for(var l = 0 ; l < UserList.length;l++){
    //                 var SubjectList = UserList[l].SubjectList;
    //                 html += '<tr>'+
    //                     '<td>'+ UserList[l].StudentCode +'</td>'+
    //                     '<td>'+ UserList[l].UserName +'</td>';
    //                 for(var j = 0 ; j < SubjectList.length;j++){
    //                     html += '<td>'+SubjectList[j].Score+'</td>'+
    //                         '<td>'+SubjectList[j].TotalOrder+'</td>'+
    //                         '<td>'+SubjectList[j].SchoolOrder+'</td>'
    //                 }
    //                 html += '</tr>'
    //             }
    //                 // 数据为空时显示图片
    //                 // var trlength = subject.length*3 + 2;
    //                 // html += '<th colspan="'+trlength+'"><p class="loading data-empty-0"></p></th>'
    //
    //             html += '</tbody>';
    //             $table.html(html);
    //             analy.isShowMore($table);
    //             analy.theadfixed($table);
    //             analy.outputHtmlToExcel($table);
    //         }else{
    //             $table.subDataEmpty(0)
    //         }
    //     })
    // };
    // 本校特优生  校长
    // exports.teyoushengTableRector = function(){
    //     var param = {
    //         params:["getSchoolSUser"],
    //         userID: $.cookie("yj_front_UserID"),
    //         examID: $.cookie("analy_ExamID"),
    //         schoolID:$.cookie("analy_SchoolID")
    //     };
    //     $.analyzeHandler(param,function(data){
    //         if(data.status===1){
    //             var json = data.data,
    //                 subject = json.Subject,
    //                 UserList = json.UserList,
    //                 html = '';
    //             if(UserList){
    //                 html += '<thead>'+
    //                     '<tr>'+
    //                     '<th width="60" rowspan="2"><b>姓名</b></th>'+
    //                     '<th width="60" rowspan="2"><b>班级</b></th>';
    //                 for(var i = 0 ; i < subject.length;i++){
    //                     html += '<th colspan="2"><b>'+ subject[i].SubjectName +'</b></th>'
    //                 }
    //                 html += '</tr>'+
    //                     '<tr>';
    //                 for(var k = 0 ; k < subject.length;k++){
    //                     html += '<th><b>成绩</b></th>'+
    //                         '<th><b>总名</b></th>'
    //                 }
    //                 html += '</tr>'+
    //                     '</thead>'+
    //                     '<tbody>';
    //                 for(var l = 0 ; l < UserList.length;l++){
    //                     var SubjectList = UserList[l].SubjectList;
    //                     html += '<tr>'+
    //                         '<td>'+ UserList[l].UserName +'</td>'+
    //                         '<td>'+ UserList[l].ClassName +'</td>';
    //                     for(var j = 0 ; j < SubjectList.length;j++){
    //                         html += '<td>'+SubjectList[j].Score+'</td>'+
    //                             '<td>'+SubjectList[j].TotalOrder+'</td>'
    //                     }
    //                     html += '</tr>'
    //                 }
    //                 html += '</tbody>';
    //                 $table.html(html);
    //                 analy.isShowMore($table);
    //                 analy.theadfixed($table);
    //                 analy.outputHtmlToExcel($table);
    //             }else{
    //                 $table.subDataEmpty(0)
    //             }
    //
    //             // if(UserList){
    //             //     for(var l = 0 ; l < UserList.length;l++){
    //             //         var SubjectList = UserList[l].SubjectList;
    //             //         html += '<tr>'+
    //             //             '<td>'+ UserList[l].UserName +'</td>'+
    //             //             '<td>'+ UserList[l].ClassName +'</td>';
    //             //         for(var j = 0 ; j < SubjectList.length;j++){
    //             //             html += '<td>'+SubjectList[j].Score+'</td>'+
    //             //                 '<td>'+SubjectList[j].TotalOrder+'</td>'
    //             //         }
    //             //         html += '</tr>'
    //             //     }
    //             // }else{
    //             //     // 数据为空时显示图片
    //             //     var trlength = subject.length*2 + 2;
    //             //     html += '<th colspan="'+trlength+'"><p class="loading data-empty-0"></p></th>'
    //             // }
    //         }else{
    //             $table.subDataEmpty(0)
    //         }
    //     })
    // };
});