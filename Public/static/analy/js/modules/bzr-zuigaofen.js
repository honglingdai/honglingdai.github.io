define(function (require, exports) {
    var analy = require("analy");
    var $j_zuigaofen = $("#j_zuigaofen");
    //模板
    var template= {
        bzr_dec:function(json){
            var html = "";
            html +='此次参与测评的考生中，理科第一名总分为\
                    <span class="text-primary">'+json.ExamNo1+' </span>分，归属于\
                    <span class="text-primary">'+json.SchoolNo1+'</span>，第二名\
                    <span class="text-primary">'+json.ExamNo2+'</span> 分，归属于\
                    <span class="text-primary">'+json.SchoolNo2+'</span>，第三名\
                    <span class="text-primary">'+json.ExamNo3+'</span> 分，归属于\
                    <span class="text-primary">'+json.SchoolNo3+'</span>；我校理科最高总分\
                    <span class="text-primary">'+json.UserSchoolNo1+'</span> 分（\
                    <span class="text-primary">'+json.UserClassNo1 +json.UserName+'</span>）；单科 最高分如下表：';
            return html;
        },
        bzr_table:function(subject){
            var html = "";
            html += '<thead>'+
                '<tr>'+
                '<th><b>学科名称</b></th>';
            for(var i= 0;i<subject.length;i++){
                html += '<th><b>'+subject[i].SubjectName+'</b></th>'
            }
            html += '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>最高分</b></td>';
            for(var j= 0;j<subject.length;j++){
                html += '<td>'+subject[j].ExamScoreMax+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>人数</b></td>';
            for(var k= 0;k<subject.length;k++){
                html += '<td>'+subject[k].ExamScoreNum+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>归属学校</b></td>';
            for(var l= 0;l<subject.length;l++){
                html += '<td>'+subject[l].SchoolName+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>本校最高分</b></td>';
            for(var m= 0;m<subject.length;m++){
                html += '<td>'+subject[m].SchoolScoreMax+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>归属班级</b></td>';
            for(var m= 0;m<subject.length;m++){
                html += '<td>'+subject[m].ClassName+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>本班最高分</b></td>';
            for(var p= 0;p<subject.length;p++){
                html += '<td>'+subject[p].ClassScoreMax+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>归属姓名</b></td>';
            for(var q= 0;q<subject.length;q++){
                html += '<td>'+subject[q].UserName+'</td>'
            }
            return html;
        },
        rector_table:function(subject){
            var html = "";
            html += '<thead>'+
                '<tr>'+
                '<th><b>学科名称</b></th>';
            for(var i= 0;i<subject.length;i++){
                html += '<th><b>'+subject[i].SubjectName+'</b></th>'
            }
            html += '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>最高分</b></td>';
            for(var j= 0;j<subject.length;j++){
                html += '<td>'+subject[j].ExamScoreMax+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>人数</b></td>';
            for(var k= 0;k<subject.length;k++){
                html += '<td>'+subject[k].ExamScoreNum+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>归属学校</b></td>';
            for(var l= 0;l<subject.length;l++){
                html += '<td>'+subject[l].SchoolName+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>本校最高分</b></td>';
            for(var m= 0;m<subject.length;m++){
                html += '<td>'+subject[m].SchoolScoreMax+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>归属班级</b></td>';
            for(var m= 0;m<subject.length;m++){
                html += '<td>'+subject[m].ClassName+'</td>'
            }
            return html;
        },
        region_dec:function(json){
            var html = "";
            html +='此次参与测评的考生中，理科第一名总分为\
                    <span class="text-primary">'+json.ExamNo1+' </span>分，归属于\
                    <span class="text-primary">'+json.SchoolNo1+'</span>，第二名\
                    <span class="text-primary">'+json.ExamNo2+'</span> 分，归属于\
                    <span class="text-primary">'+json.SchoolNo2+'</span>，第三名\
                    <span class="text-primary">'+json.ExamNo3+'</span> 分，归属于\
                    <span class="text-primary">'+json.SchoolNo3+'</span>；我署管辖区域理科最高总分\
                    <span class="text-primary">'+json.AreaNo1+'</span> 分（\
                    <span class="text-primary">'+json.AreaSchoolNo1 +json.UserName+'</span>）；单科 最高分如下表：';
            return html;
        },
        region_table:function(subject){
            var html = "";
            html += '<thead>'+
                '<tr>'+
                '<th><b>学科名称</b></th>';
            for(var i= 0;i<subject.length;i++){
                html += '<th><b>'+subject[i].SubjectName+'</b></th>'
            }
            html += '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>最高分</b></td>';
            for(var j= 0;j<subject.length;j++){
                html += '<td>'+subject[j].ExamScoreMax+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>人数</b></td>';
            for(var k= 0;k<subject.length;k++){
                html += '<td>'+subject[k].ExamScoreNum+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>归属学校</b></td>';
            for(var l= 0;l<subject.length;l++){
                html += '<td>'+subject[l].SchoolName+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>本辖区最高分</b></td>';
            for(var m= 0;m<subject.length;m++){
                html += '<td>'+subject[m].AreaScoreMax+'</td>'
            }
            html +='</tr>'+
                '<tr>'+
                '<td><b>归属班级</b></td>';
            for(var m= 0;m<subject.length;m++){
                html += '<td>'+subject[m].AreaSchoolName+'</td>'
            }
            return html;
        }
    };

    // 班主任最高分
    exports.bzr_zuigaofen = function(){
        var param={
            params:["getScoreMax"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                //表格
                $("#j_zuigaofenDesc").html(template.bzr_dec(data.data));
                $("#j_zuigaofen").html(template.bzr_table(data.data.SubjectList));
            }else{
                $j_zuigaofen.subDataEmpty(0);
            }
        })
    };
    // 校长最高分
    exports.rector_zuigaofen = function(){
        var param={
            params:["getScoreMax"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        if(role == 5){
            //区域ID参数
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                //表格
                $("#j_zuigaofenDesc").html(template.bzr_dec(data.data));
                $("#j_zuigaofen").html(template.rector_table(data.data.SubjectList));
                analy.outputHtmlToExcel($("#j_zuigaofen"));
            }else{
                $j_zuigaofen.subDataEmpty(0);
            }
        })
    };
    // 区域最高分
    exports.region_zuigaofen = function(){
        var param={
            params:["examScoreMax"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                //表格
                $("#j_zuigaofenDesc").html(template.region_dec(data.data));
                $("#j_zuigaofen").html(template.region_table(data.data.SubjectList));
                analy.outputHtmlToExcel($("#j_zuigaofen"));
            }else{
                $j_zuigaofen.subDataEmpty(0);
            }
        })
    };

    // /*最高分*/
    // exports.zuigaofen = function(){
    //     var param={
    //         params:["getScoreMax"],
    //         userID: $.cookie("yj_front_UserID"),
    //         examID: $.cookie("analy_ExamID"),
    //         classID:$.cookie("analy_ClassID")
    //     };
    //     if(role === "4"){
    //         // 校长权限
    //         param.schoolID = $.cookie("analy_SchoolID");
    //         delete param.classID;
    //     }
    //     $.analyzeHandler(param,function(data){
    //         var $tableID = $("#j_zuigaofen");
    //         if(data.status === 1){
    //             var json = data.data;
    //             //小结
    //             var tpl = '';
    //             tpl +='此次参与测评的考生中，理科第一名总分为\
    //                 <span class="text-primary">'+json.ExamNo1+' </span>分，归属于\
    //                 <span class="text-primary">'+json.SchoolNo1+'</span>，第二名\
    //                 <span class="text-primary">'+json.ExamNo2+'</span> 分，归属于\
    //                 <span class="text-primary">'+json.SchoolNo2+'</span>，第三名\
    //                 <span class="text-primary">'+json.ExamNo3+'</span> 分，归属于\
    //                 <span class="text-primary">'+json.SchoolNo3+'</span>；我校理科最高总分\
    //                 <span class="text-primary">'+json.UserSchoolNo1+'</span> 分（\
    //                 <span class="text-primary">'+json.UserClassNo1 +json.UserName+'</span>）；单科 最高分如下表：';
    //             $("#j_zuigaofenDesc").html(tpl);
    //             //table
    //             var subject = json.SubjectList;
    //             var html = "";
    //             html += '<thead>'+
    //                 '<tr>'+
    //                 '<th><b>学科名称</b></th>';
    //             for(var i= 0;i<subject.length;i++){
    //                 html += '<th><b>'+subject[i].SubjectName+'</b></th>'
    //             }
    //             html += '</tr>'+
    //                 '</thead>'+
    //                 '<tbody>'+
    //                 '<tr>'+
    //                 '<td><b>最高分</b></td>';
    //             for(var j= 0;j<subject.length;j++){
    //                 html += '<td>'+subject[j].ExamScoreMax+'</td>'
    //             }
    //             html +='</tr>'+
    //                 '<tr>'+
    //                 '<td><b>人数</b></td>';
    //             for(var k= 0;k<subject.length;k++){
    //                 html += '<td>'+subject[k].ExamScoreNum+'</td>'
    //             }
    //             html +='</tr>'+
    //                 '<tr>'+
    //                 '<td><b>归属学校</b></td>';
    //             for(var l= 0;l<subject.length;l++){
    //                 html += '<td>'+subject[l].SchoolName+'</td>'
    //             }
    //             html +='</tr>'+
    //                 '<tr>'+
    //                 '<td><b>本校最高分</b></td>';
    //             for(var m= 0;m<subject.length;m++){
    //                 html += '<td>'+subject[m].SchoolScoreMax+'</td>'
    //             }
    //             html +='</tr>'+
    //                 '<tr>'+
    //                 '<td><b>归属班级</b></td>';
    //             for(var m= 0;m<subject.length;m++){
    //                 html += '<td>'+subject[m].ClassName+'</td>'
    //             }
    //             if(role === "2"){
    //                 html +='</tr>'+
    //                     '<tr>'+
    //                     '<td><b>本班最高分</b></td>';
    //                 for(var p= 0;p<subject.length;p++){
    //                     html += '<td>'+subject[p].ClassScoreMax+'</td>'
    //                 }
    //                 html +='</tr>'+
    //                     '<tr>'+
    //                     '<td><b>归属姓名</b></td>';
    //                 for(var q= 0;q<subject.length;q++){
    //                     html += '<td>'+subject[q].UserName+'</td>'
    //                 }
    //             }
    //             html +='</tr></tbody>';
    //             $tableID.html(html);
    //             analy.outputHtmlToExcel($tableID);
    //         }else{
    //             $tableID.subDataEmpty(0);
    //         }
    //
    //     })
    // };

});