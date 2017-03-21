define(function (require, exports) {
    var analy = require("analy");
    var template = {
        createtable:function(json){
            var sublength = json.SubjectList,
                html = "";
            html += '<thead>'+
                '<tr>'+
                '<th colspan="2" width="300"><b>分析指标</b></th>';
            for(var i = 0; i < sublength.length; i++){
                html += '<th data-subject="'+sublength[i].SubjectID+'"><b>' + sublength[i].SubjectName + '</b></th>'
            }
            html +=  '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td rowspan="6"><b class="dib tl pl10"><span class="dib f16 mb5">一本</span>'+
                '<br/>'+
                '分数线（'+json.ALine+'）<br/>'+
                '上线人数（'+json.ALineCount+'）<br/>'+
                '上线比例（'+json.AProportion+'%）<br/>'+
                '等级（A）</b></td>'+
                '<td><b>有效分</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.EffectiveScore + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>单上线人数</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.ALineCount + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>双上线人数</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.ALineDobCount + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>命中率</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.HitRate + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>贡献率</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.ContributionRate + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>贡献等级</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.ContributionLevel + '</td>'
            }

            html+= '</tr><tr>'+
                '<td rowspan="6"><b class="dib tl pl10"><span class="dib f16 mb5">二本</span>'+
                '<br/>'+
                '分数线（'+json.BLine+'）<br/>'+
                '上线人数（'+json.BLineCount+'）<br/>'+
                '上线比例（'+json.BProportion+'%）<br/>'+
                '等级（A）</b></td>'+
                '<td><b>有效分</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.EffectiveScore + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>单上线人数</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.BLineCount + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>双上线人数</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.BLineDobCount + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>命中率</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.HitRate + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>贡献率</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.ContributionRate + '</td>'
            }
            html +=  '</tr><tr>'+
                '<td><b>贡献等级</b></td>';
            for(var i = 0;i < sublength.length;i++){
                html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.ContributionLevel + '</td>'
            }

            html += '</tr>'+
                '</tbody>';
            return html;
        }
    };
    // 教师有效分
    exports.youxiaofen = function(){
        //参数配置
        var param,
            baseParam = {
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID")
            },
            // 教师参数
            param_Teacher = {
                params:["effectiveScore"],
                subjectID:$.cookie("analy_SubjectID"),
                classID:$.cookie("analy_ClassID")
            },
            // 班主任参数
            param_bzr = {
                params:["effectiveScore"],
                classID:$.cookie("analy_ClassID")
            },
            // 校长参数
            param_rector = {
                params:["effectiveScore"],
                schoolID : $.cookie("analy_SchoolID")
            },
            // 区域参数
            param_region = {
                params:["effScore"],
                areaID : $.cookie("analy_AreaID")
            };
        // 根据身份id 配置参数
        switch (role){
            case "1" : param = $.extend({},baseParam,param_Teacher);
                break;
            case "2" : param = $.extend({},baseParam,param_bzr);
                break;
            case "4" : param = $.extend({},baseParam,param_rector);
                break;
            case "5" : param = $.extend({},baseParam,param_region);
                break;
        }
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                var $table = $("#j_youxiaofen");
                //表格
                $table.html(template.createtable(data.data));
                analy.outputHtmlToExcel($table);

                // 学科老师标红
                var SubjectID = data.data.SubjectID;
                if(SubjectID){
                    $('[data-subject]').each(function(){
                        var $this = $(this);
                        if ($this.data('subject') === (SubjectID - 0)) {
                            $this.css({
                                "color": "#ff4b4b",
                                "font-weight": 700
                            })
                        }
                    });
                }
            }else{
                $table.subDataEmpty(0);
            }
        })
    };

    // exports.youxiaofen = function(){
    //     var param = {
    //         params:["effectiveScore"],
    //         userID: $.cookie("yj_front_UserID"),
    //         examID: $.cookie("analy_ExamID"),
    //         classID:$.cookie("analy_ClassID"),
    //         subjectID:$.cookie("analy_SubjectID")
    //     };
    //
    //     if(role === "2"){
    //         // 班主任权限
    //         delete param.subjectID
    //     }else if(role === "4"){
    //         // 校长权限
    //         param.schoolID = $.cookie("analy_SchoolID");
    //         delete param.classID;
    //         delete param.subjectID;
    //     }
    //     $.analyzeHandler(param,function(data){
    //
    //         var $table = $("#j_youxiaofen");
    //         if(data.status === 1){
    //             var json = data.data,
    //                 sublength = json.SubjectList,
    //                 html = "";
    //             html += '<thead>'+
    //                 '<tr>'+
    //                 '<th colspan="2" width="300"><b>分析指标</b></th>';
    //             for(var i = 0; i < sublength.length; i++){
    //                 html += '<th data-subject="'+sublength[i].SubjectID+'"><b>' + sublength[i].SubjectName + '</b></th>'
    //             }
    //             html +=  '</tr>'+
    //                 '</thead>'+
    //                 '<tbody>'+
    //                     '<tr>'+
    //                     '<td rowspan="6"><b class="dib tl pl10"><span class="dib f16 mb5">一本</span>'+
    //                     '<br/>'+
    //                     '分数线（'+json.ALine+'）<br/>'+
    //                     '上线人数（'+json.ALineCount+'）<br/>'+
    //                     '上线比例（'+json.AProportion+'%）<br/>'+
    //                     '等级（A）</b></td>'+
    //                     '<td><b>有效分</b></td>';
    //                     for(var i = 0;i < sublength.length;i++){
    //                         html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.EffectiveScore + '</td>'
    //                     }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>单上线人数</b></td>';
    //                 for(var i = 0;i < sublength.length;i++){
    //                     html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.ALineCount + '</td>'
    //                 }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>双上线人数</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.ALineDobCount + '</td>'
    //             }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>命中率</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.HitRate + '</td>'
    //             }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>贡献率</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.ContributionRate + '</td>'
    //             }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>贡献等级</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].A.ContributionLevel + '</td>'
    //             }
    //
    //             html+= '</tr><tr>'+
    //                 '<td rowspan="6"><b class="dib tl pl10"><span class="dib f16 mb5">二本</span>'+
    //                 '<br/>'+
    //                 '分数线（'+json.BLine+'）<br/>'+
    //                 '上线人数（'+json.BLineCount+'）<br/>'+
    //                 '上线比例（'+json.BProportion+'%）<br/>'+
    //                 '等级（A）</b></td>'+
    //                 '<td><b>有效分</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.EffectiveScore + '</td>'
    //             }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>单上线人数</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.BLineCount + '</td>'
    //             }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>双上线人数</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.BLineDobCount + '</td>'
    //             }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>命中率</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.HitRate + '</td>'
    //             }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>贡献率</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.ContributionRate + '</td>'
    //             }
    //             html +=  '</tr><tr>'+
    //                 '<td><b>贡献等级</b></td>';
    //             for(var i = 0;i < sublength.length;i++){
    //                 html += '<td data-subject="'+sublength[i].SubjectID+'">' + sublength[i].B.ContributionLevel + '</td>'
    //             }
    //
    //             html += '</tr>'+
    //             '</tbody>';
    //
    //             $table.html(html);
    //             analy.outputHtmlToExcel($table);
    //
    //             // 学科老师标红
    //             var SubjectID = json.SubjectID;
    //             if(SubjectID){
    //                 $('[data-subject]').each(function(){
    //                     var $this = $(this);
    //                     if ($this.data('subject') === (SubjectID - 0)) {
    //                         $this.css({
    //                             "color": "#ff4b4b",
    //                             "font-weight": 700
    //                         })
    //                     }
    //                 });
    //             }
    //         }else{
    //             $table.subDataEmpty(0);
    //         }
    //     })
    // };
});