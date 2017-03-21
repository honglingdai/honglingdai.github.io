define(function (require, exports) {
    var analy = require("analy");

    var $onlineRateDesc = $("#j_desc-shangxianlv");// 上线率小结
    var $onlineRateTable = $("#j_shangxianlv");// 上线率表格
    var $subject_onlineRateDesc = $("#j_js-desc-shangxianlv");// 上线率小结（分学科）
    var $subject_onlineRateTable = $("#j_js-shangxianlv");// 上线率表格（分学科）

    // 模板
    var template = {
        // 小结（班主任）
        master_desc:function(data){
            return '本次我校联考模拟划线A类分数线\
                <span class="text-primary"> '+ data.AOnLine.ScoreLine +' </span> 分，上线人数\
                <span class="text-primary">'+ data.AOnLine.SchoolNum +'</span> 人，比例\
                <span class="text-primary">'+ data.AOnLine.SchoolRate +'%</span>；B类分数线\
                <span class="text-primary">'+ data.BOnLine.ScoreLine +'</span> 分,上线人数\
                <span class="text-primary">'+ data.BOnLine.SchoolNum +'</span> 人，比例\
                <span class="text-primary">'+ data.BOnLine.SchoolRate +'%</span>。本班A线上线人数\
                <span class="text-primary">'+ data.AOnLine.CLassNum +'</span> 人（\
                <span class="text-primary">'+ data.AOnLine.ClassRate +'%</span>），B线上线人数\
                <span class="text-primary">'+ data.BOnLine.CLassNum +'</span> 人 （\
                <span class="text-primary">'+ data.BOnLine.ClassRate +'%</span>），情况如下：';
        },
        // 表格（班主任）
        master_table:function(data){
            return '<thead>'+
                '<tr>'+
                '<th rowspan="2" width="240"><b>分析指标</th>'+
                '<th colspan="2"><b>一本（'+data.AOnLine.ScoreLine+'）</b></th>'+
                '<th colspan="2"><b>二本（'+data.BOnLine.ScoreLine+'）</b></th>'+
                '<th colspan="2"><b>三本（'+data.COnLine.ScoreLine+'）</b></th>'+
                '</tr>'+
                '<tr>'+
                '<th><b>本校</b></th>'+
                '<th><b>本班</b></th>'+
                '<th><b>本校</b></th>'+
                '<th><b>本班</b></th>'+
                '<th><b>本校</b></th>'+
                '<th><b>本班</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>上线人数</b></td>'+
                '<td>'+ data.AOnLine.SchoolNum +'</td>'+
                '<td>'+ data.AOnLine.CLassNum +'</td>'+
                '<td>'+ data.BOnLine.SchoolNum +'</td>'+
                '<td>'+ data.BOnLine.CLassNum +'</td>'+
                '<td>'+ data.COnLine.SchoolNum +'</td>'+
                '<td>'+ data.COnLine.CLassNum +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td><b>上线比例</b></td>'+
                '<td>'+ data.AOnLine.SchoolRate +'%</td>'+
                '<td>'+ data.AOnLine.ClassRate +'%</td>'+
                '<td>'+ data.BOnLine.SchoolSingleRate +'%</td>'+
                '<td>'+ data.BOnLine.ClassSingleRate +'%</td>'+
                '<td>'+ data.COnLine.SchoolSingleRate +'%</td>'+
                '<td>'+ data.COnLine.ClassSingleRate +'%</td>'+
                '</tr>'+
                '</tbody>';
        },
        // 小结（学科老师）
        teacher_desc:function(data){
            return '本次联考划线一本\
                <span class="text-primary"> '+ data.ALine +' </span> 分，二本\
                <span class="text-primary">'+ data.BLine +'</span> 分；\
                <span class="text-primary">'+ data.SubjectName +'</span> 一本有效分\
                <span class="text-primary">'+ data.AEffectiveScore +'</span> 分，二本有效分\
                <span class="text-primary">'+ data.BEffectiveScore +'</span> 分。';
        },
        // 表格（学科老师）
        teacher_table:function(data){
            return '<thead>'+
                '<tr>'+
                '<th rowspan="2" width="240"><b>分析指标<br/>学校VS班级</b></th>'+
                '<th colspan="2"><b>一本（'+ data.ASubjectLine +'）</b></th>'+
                '<th colspan="2"><b>二本（'+ data.BSubjectLine +'）</b></th>'+
                '<th colspan="2"><b>三本（'+ data.CSubjectLine +'）</b></th>'+
                '</tr>'+
                '<tr>'+
                '<th><b>本校</b></th>'+
                '<th><b>本班</b></th>'+
                '<th><b>本校</b></th>'+
                '<th><b>本班</b></th>'+
                '<th><b>本校</b></th>'+
                '<th><b>本班</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>上线人数</b></td>'+
                '<td>'+ data.SchoolInfo.Subject.AUserNum +'</td>'+
                '<td>'+ data.ClassInfo.Subject.AUserNum +'</td>'+
                '<td>'+ data.SchoolInfo.Subject.BUserNum +'</td>'+
                '<td>'+ data.ClassInfo.Subject.BUserNum +'</td>'+
                '<td>'+ data.SchoolInfo.Subject.CUserNum +'</td>'+
                '<td>'+ data.ClassInfo.Subject.CUserNum +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td><b>上线比例</b></td>'+
                '<td>'+ data.SchoolInfo.Subject.ALineRate +'%</td>'+
                '<td>'+ data.ClassInfo.Subject.ALineRate +'%</td>'+
                '<td>'+ data.SchoolInfo.Subject.BLineRate +'%</td>'+
                '<td>'+ data.ClassInfo.Subject.BLineRate +'%</td>'+
                '<td>'+ data.SchoolInfo.Subject.CLineRate +'%</td>'+
                '<td>'+ data.ClassInfo.Subject.CLineRate +'%</td>'+
                '</tr>'+
                '</tbody>';
        },
        // 小结（学科老师）
        teacher_table_school:function(data){
            return '<thead>'+
                '<tr>'+
                '<th rowspan="2" width="240"><b>分析指标<br/>总分VS' + data.SubjectName + '（班级）</b></th>'+
                '<th colspan="3"><b>一本</b></th>'+
                '<th colspan="3"><b>二本</b></th>'+
                '</tr>'+
                '<tr>'+
                '<th><b>总分（'+ data.ALine +'）</b></th>'+
                '<th><b>生物（' + data.AEffectiveScore + '）</b></th>'+
                '<th><b>双上线</b></th>'+
                '<th><b>总分（'+data.BLine+'）</b></th>'+
                '<th><b>生物（' + data.BEffectiveScore + '）</b></th>'+
                '<th><b>双上线</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>班级上线人数</b></td>'+
                '<td> '+ data.ClassInfo.TotalScore.AUserNum +' </td>'+
                '<td> '+ data.ClassInfo.SubjectEff.AUserNum +' </td>'+
                '<td> '+ data.ClassInfo.Double.AUserNum +' </td>'+
                '<td> '+ data.ClassInfo.TotalScore.BUserNum +' </td>'+
                '<td> '+ data.ClassInfo.SubjectEff.BUserNum +' </td>'+
                '<td> '+ data.ClassInfo.Double.BUserNum +' </td>'+
                '</tr>'+
                '<tr>'+
                '<td><b>班级上线比例</b></td>'+
                '<td> '+ data.ClassInfo.TotalScore.ALineRate +'%</td>'+
                '<td> '+ data.ClassInfo.SubjectEff.ALineRate +'%</td>'+
                '<td> '+ data.ClassInfo.Double.ALineRate +'%</td>'+
                '<td> '+ data.ClassInfo.TotalScore.BSingleRate +'%</td>'+
                '<td> '+ data.ClassInfo.SubjectEff.BSingleRate +'%</td>'+
                '<td> '+ data.ClassInfo.Double.BLineRate +'%</td>'+
                '</tr>'+
                '</tbody>';
        },
        // 小结（校长）
        rector_desc:function(data){
            return '本次我校联考模拟划线A类分数线\
                <span class="text-primary"> '+ data.AOnLine.ScoreLine +' </span> 分，上线人数\
                <span class="text-primary">'+ data.AOnLine.ExamNum +'</span> 人，比例\
                <span class="text-primary">'+ data.AOnLine.ExamRate +'%</span>；B类分数线\
                <span class="text-primary">'+ data.BOnLine.ScoreLine +'</span> 分,上线人数\
                <span class="text-primary">'+ data.BOnLine.ExamNum +'</span> 人，比例\
                <span class="text-primary">'+ data.BOnLine.ExamRate +'%</span>；C类分数线\
                <span class="text-primary">'+ data.BOnLine.ScoreLine +'</span> 分,上线人数\
                <span class="text-primary">'+ data.BOnLine.ExamNum +'</span> 人，比例\
                <span class="text-primary">'+ data.BOnLine.ExamRate +'%</span>。我校 A 类上线人数\
                <span class="text-primary">'+ data.AOnLine.SchoolNum +'</span> 人（\
                <span class="text-primary">'+ data.AOnLine.SchoolRate +'%</span>），其中应届生上线\
                <span class="text-primary">'+ data.AOnLine.SchoolNowNum +'</span> 人，往届生上线\
                <span class="text-primary">'+ data.AOnLine.SchoolNoNowNum +'</span> 人；B 类上线人数\
                <span class="text-primary">'+ data.BOnLine.SchoolNum +'</span> 人 （\
                <span class="text-primary">'+ data.BOnLine.SchoolRate +'%</span>），其中应届生上线\
                <span class="text-primary">'+ data.BOnLine.SchoolNowNum +'</span> 人，往届生上线\
                <span class="text-primary">'+ data.BOnLine.SchoolNoNowNum +'</span> 人；C 类上线人数\
                <span class="text-primary">'+ data.COnLine.SchoolNum +'</span> 人 （\
                <span class="text-primary">'+ data.COnLine.SchoolRate +'%</span> ），其中应届生上线\
                <span class="text-primary">'+ data.COnLine.SchoolNowNum +'</span> 人，往届生上线\
                <span class="text-primary">'+ data.COnLine.SchoolNoNowNum +'</span> 人，情况如下：';
        },
        // 表格（校长）
        rector_table:function(data){
            return '<thead>'+
                '<tr>'+
                '<th rowspan="2" width="240"><b>分析指标</th>'+
                '<th colspan="2"><b>一本（'+data.AOnLine.ScoreLine+'）</b></th>'+
                '<th colspan="2"><b>二本（'+data.BOnLine.ScoreLine+'）</b></th>'+
                '<th colspan="2"><b>三本（'+data.COnLine.ScoreLine+'）</b></th>'+
                '</tr>'+
                '<tr>'+
                '<th><b>总体</b></th>'+
                '<th><b>本校</b></th>'+
                '<th><b>总体</b></th>'+
                '<th><b>本校</b></th>'+
                '<th><b>总体</b></th>'+
                '<th><b>本校</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>上线人数</b></td>'+
                '<td>'+ data.AOnLine.ExamNum +'</td>'+
                '<td>'+ data.AOnLine.SchoolNum +'</td>'+
                '<td>'+ data.BOnLine.ExamNum +'</td>'+
                '<td>'+ data.BOnLine.SchoolNum +'</td>'+
                '<td>'+ data.COnLine.ExamNum +'</td>'+
                '<td>'+ data.COnLine.SchoolNum +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td><b>上线比例</b></td>'+
                '<td>'+ data.AOnLine.ExamRate +'%</td>'+
                '<td>'+ data.AOnLine.SchoolRate +'%</td>'+
                '<td>'+ data.BOnLine.ExamRate +'%</td>'+
                '<td>'+ data.BOnLine.SchoolRate +'%</td>'+
                '<td>'+ data.COnLine.ExamRate +'%</td>'+
                '<td>'+ data.COnLine.SchoolRate +'%</td>'+
                '</tr>'+
                '</tbody>';
        },
        // 单科描述（校长）
        rector_subject_desc:function(data){
            return '本次联考划线一本\
                <span class="text-primary"> '+ data.ALine +' </span> 分，二本\
                <span class="text-primary">'+ data.BLine +'</span> 分；\
                <span class="text-primary">'+ data.SubjectName +'</span> 一本有效分\
                <span class="text-primary">'+ data.AEffectiveScore +'</span> 分，二本有效分\
                <span class="text-primary">'+ data.BEffectiveScore +'</span> 分。';

        },
        // 总分VS单科表格（校长）
        rector_subject_table_sub:function(data){
            return '<thead>'+
                '<tr>'+
                '<th rowspan="2" width="240"><b>分析指标<br/>总分VS' + data.SubjectName + '（班级）</b></th>'+
                '<th colspan="2"><b>一本</b></th>'+
                '<th colspan="2"><b>二本</b></th>'+
                '</tr>'+
                '<tr>'+
                '<th><b>总分（'+ data.ALine +'）</b></th>'+
                '<th><b>生物（' + data.AEffectiveScore + '）</b></th>'+
                '<th><b>总分（'+data.BLine+'）</b></th>'+
                '<th><b>生物（' + data.BEffectiveScore + '）</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>班级上线人数</b></td>'+
                '<td> '+ data.SchoolInfo.TotalScore.AUserNum +' </td>'+
                '<td> '+ data.SchoolInfo.Subject.AUserNum +' </td>'+
                '<td> '+ data.SchoolInfo.TotalScore.BUserNum +' </td>'+
                '<td> '+ data.SchoolInfo.Subject.BUserNum +' </td>'+
                '</tr>'+
                '<tr>'+
                '<td><b>班级上线比例</b></td>'+
                '<td> '+ data.SchoolInfo.TotalScore.ALineRate +'%</td>'+
                '<td> '+ data.SchoolInfo.Subject.ALineRate +'%</td>'+
                '<td> '+ data.SchoolInfo.TotalScore.ALineRate +'%</td>'+
                '<td> '+ data.SchoolInfo.Subject.BSingleRate +'%</td>'+
                '</tr>'+
                '</tbody>';
        },
        // 总分VS学校表格（校长）
        rector_subject_table_school:function(data){
            return '<thead>'+
                '<tr>'+
                '<th rowspan="2" width="240"><b>分析指标<br/>学校VS班级</b></th>'+
                '<th colspan="2"><b>一本（'+ data.ASubjectLine +'）</b></th>'+
                '<th colspan="2"><b>二本（'+ data.BSubjectLine +'）</b></th>'+
                '<th colspan="2"><b>三本（'+ data.CSubjectLine +'）</b></th>'+
                '</tr>'+
                '<tr>'+
                '<th><b>总体</b></th>'+
                '<th><b>本校</b></th>'+
                '<th><b>总体</b></th>'+
                '<th><b>本校</b></th>'+
                '<th><b>总体</b></th>'+
                '<th><b>本校</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>上线人数</b></td>'+
                '<td>'+ data.SchoolInfo.TotalScore.AUserNum +'</td>'+
                '<td>'+ data.SchoolInfo.Subject.AUserNum +'</td>'+
                '<td>'+ data.SchoolInfo.TotalScore.BUserNum +'</td>'+
                '<td>'+ data.SchoolInfo.Subject.BUserNum +'</td>'+
                '<td>'+ data.SchoolInfo.TotalScore.CUserNum +'</td>'+
                '<td>'+ data.SchoolInfo.Subject.CUserNum +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td><b>上线比例</b></td>'+
                '<td>'+ data.SchoolInfo.TotalScore.ALineRate +'%</td>'+
                '<td>'+ data.SchoolInfo.Subject.ALineRate +'%</td>'+
                '<td>'+ data.SchoolInfo.TotalScore.BLineRate +'%</td>'+
                '<td>'+ data.SchoolInfo.Subject.BLineRate +'%</td>'+
                '<td>'+ data.SchoolInfo.TotalScore.CLineRate +'%</td>'+
                '<td>'+ data.SchoolInfo.Subject.CLineRate +'%</td>'+
                '</tr>'+
                '</tbody>';
        },
        // 区域校级主管报告文档
        region_xiaoji_desc:function(data){
            return '本次联考模拟划线A类分数线\
                <span class="text-primary"> '+ data.AOnLine.ScoreLine +' </span> 分，上线人数\
                <span class="text-primary">'+ data.AOnLine.ExamNum +'</span> 人，比例\
                <span class="text-primary">'+ data.AOnLine.ExamRate +'%</span>；B类分数线\
                <span class="text-primary">'+ data.BOnLine.ScoreLine +'</span> 分,上线人数\
                <span class="text-primary">'+ data.BOnLine.ExamNum +'</span> 人，比例\
                <span class="text-primary">'+ data.BOnLine.ExamRate +'%</span>。我区A线上线人数\
                <span class="text-primary">'+ data.AOnLine.AreaNum +'</span> 人（\
                <span class="text-primary">'+ data.AOnLine.AreaRate +'%</span>），B线上线人数\
                <span class="text-primary">'+ data.BOnLine.AreaNum +'</span> 人 （\
                <span class="text-primary">'+ data.BOnLine.AreaRate +'%</span>），情况如下：';
        },
        // 区域校级主管报告表格
        region_table:function(data){
            return '<thead>'+
                '<tr>'+
                '<th rowspan="2" width="240"><b>分析指标</th>'+
                '<th colspan="2"><b>一本（'+data.AOnLine.ScoreLine+'）</b></th>'+
                '<th colspan="2"><b>二本（'+data.BOnLine.ScoreLine+'）</b></th>'+
                '<th colspan="2"><b>三本（'+data.COnLine.ScoreLine+'）</b></th>'+
                '</tr>'+
                '<tr>'+
                '<th><b>总体</b></th>'+
                '<th><b>本区</b></th>'+
                '<th><b>总体</b></th>'+
                '<th><b>本区</b></th>'+
                '<th><b>总体</b></th>'+
                '<th><b>本区</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td><b>上线人数</b></td>'+
                '<td>'+ data.AOnLine.ExamSingleNum +'</td>'+
                '<td>'+ data.AOnLine.ExamSingleRate +'</td>'+
                '<td>'+ data.BOnLine.ExamSingleNum +'</td>'+
                '<td>'+ data.BOnLine.ExamSingleRate +'</td>'+
                '<td>'+ data.COnLine.ExamSingleNum +'</td>'+
                '<td>'+ data.COnLine.ExamSingleRate +'</td>'+
                '</tr>'+
                '<tr>'+
                '<td><b>上线比例</b></td>'+
                '<td>'+ data.AOnLine.ExamRate +'%</td>'+
                '<td>'+ data.AOnLine.AreaSingleRate +'%</td>'+
                '<td>'+ data.BOnLine.ExamRate +'%</td>'+
                '<td>'+ data.BOnLine.AreaSingleRate +'%</td>'+
                '<td>'+ data.COnLine.ExamRate +'%</td>'+
                '<td>'+ data.COnLine.AreaSingleRate +'%</td>'+
                '</tr>'+
                '</tbody>';
        },
    };

    /*上线率*/
    exports.master = function(){
        var param = {
            params:["onLineInfo"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status === 1){
                // 小结
                $onlineRateDesc.html(template.master_desc(data.data));
                //学校VS班级表格
                $onlineRateTable.html(template.master_table(data.data));
                analy.outputHtmlToExcel($onlineRateTable);
            }else{
                $onlineRateDesc.html("");
                $onlineRateTable.subDataEmpty(0);
            }
            //总上线图表
            analy.chartPie_v2({
                el:"#chart_shangxianlv1",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"本校上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.AOnLine.SchoolNum, name:'一本上线人数'},
                            {value:d.DOnLine.SchoolSingleNum, name:'下线人数'},
                            {value:d.BOnLine.SchoolSingleNum, name:'二本上线人数'},
                            {value:d.COnLine.SchoolSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            analy.chartPie_v2({
                el:"#chart_shangxianlv2",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"本班上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.AOnLine.CLassNum, name:'一本上线人数'},
                            {value:d.DOnLine.ClassSingleNum, name:'下线人数'},
                            {value:d.BOnLine.ClassSingleNum, name:'二本上线人数'},
                            {value:d.COnLine.ClassSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
        })
    };
    // 教师上线率
    exports.teacher = function(){
        var param = {
            params:["teacheronLineRate"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status === 1){
                // 上线率小结
                $subject_onlineRateDesc.html(template.teacher_desc(data.data));

                // 总分VS生物表格
                $subject_onlineRateTable.html(template.teacher_table_school(data.data));

                //学校VS班级表格
                $onlineRateTable.html(template.teacher_table(data.data));
                // 导出Excel表格
                analy.outputHtmlToExcel("#j_js-shangxianlv,#j_shangxianlv");
            }else{
                // 数据为空时
                $subject_onlineRateDesc.html("");
                $subject_onlineRateTable.subDataEmpty(0);
                $onlineRateTable.html("");
            }

            //总上线图表
            analy.chartPie_v2({
                el:"#chart_shangxianlv1",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"总分上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.ClassInfo.TotalScore.AUserNum, name:'一本上线人数'},
                            {value:d.ClassInfo.TotalScore.OffLineNum, name:'下线人数'},
                            {value:d.ClassInfo.TotalScore.BSingleNum, name:'二本上线人数'},
                            {value:d.ClassInfo.TotalScore.CSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            analy.chartPie_v2({
                el:"#chart_shangxianlv2",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"学科上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.ClassInfo.SubjectEff.AUserNum, name:'一本上线人数'},
                            {value:d.ClassInfo.SubjectEff.OffLineNum, name:'下线人数'},
                            {value:d.ClassInfo.SubjectEff.BSingleNum, name:'二本上线人数'},
                            {value:d.ClassInfo.SubjectEff.CSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            //本校上线
            analy.chartPie_v2({
                el:"#chart_shangxianlv3",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"本校上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.SchoolInfo.Subject.AUserNum, name:'一本上线人数'},
                            {value:d.SchoolInfo.Subject.OffLineNum, name:'下线人数'},
                            {value:d.SchoolInfo.Subject.BSingleNum, name:'二本上线人数'},
                            {value:d.SchoolInfo.Subject.CSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            analy.chartPie_v2({
                el:"#chart_shangxianlv4",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"本班上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.ClassInfo.Subject.AUserNum, name:'一本上线人数'},
                            {value:d.ClassInfo.Subject.OffLineNum, name:'下线人数'},
                            {value:d.ClassInfo.Subject.BSingleNum, name:'二本上线人数'},
                            {value:d.ClassInfo.Subject.CSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
        })
    };

    exports.rector = function(){
        var param = {
            params:["getOnLineInfo"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        if(role == 5){
            //区域ID参数
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param,function(data){
            if(data.status === 1){
                // 小结
                $onlineRateDesc.html(template.rector_desc(data.data));
                //学校VS班级表格
                $onlineRateTable.html(template.rector_table(data.data));
                analy.outputHtmlToExcel("#j_js-shangxianlv,#j_shangxianlv");
            }else{
                $onlineRateDesc.html("");
                $onlineRateTable.subDataEmpty(0);
            }
            //总上线图表
            analy.chartPie_v2({
                el:"#chart_shangxianlv1",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"总体上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.AOnLine.ExamNum, name:'一本上线人数'},
                            {value:d.DOnLine.ExamNum, name:'下线人数'},
                            {value:d.BOnLine.ExamSingleNum, name:'二本上线人数'},
                            {value:d.COnLine.ExamSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            analy.chartPie_v2({
                el:"#chart_shangxianlv2",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"本校上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.AOnLine.SchoolNum, name:'一本上线人数'},
                            {value:d.DOnLine.SchoolNum, name:'下线人数'},
                            {value:d.BOnLine.SchoolSingleNum, name:'二本上线人数'},
                            {value:d.COnLine.SchoolSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
        })
    };

    exports.rector_subject = function(){
        var param = {
            params:["subjectOnLine"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID:$.cookie("analy_SubjectID"),
            schoolID:$.cookie("analy_SchoolID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status === 1){
                // 小结
                $subject_onlineRateDesc.html(template.rector_subject_desc(data.data));

                //总分VS生物
                $subject_onlineRateTable.html(template.rector_subject_table_sub(data.data));

                //学校VS班级表格
                $onlineRateTable.html(template.rector_subject_table_school(data.data));
                analy.outputHtmlToExcel("#j_js-shangxianlv,#j_shangxianlv");
            }else{
                $subject_onlineRateDesc.html("");
                $subject_onlineRateTable.subDataEmpty(0);
                $onlineRateTable.html("");
            }
            //总上线图表
            analy.chartPie_v2({
                el:"#chart_shangxianlv1",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"总分上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.SchoolInfo.TotalScore.AUserNum, name:'一本上线人数'},
                            {value:d.SchoolInfo.TotalScore.OffLineNum, name:'下线人数'},
                            {value:d.SchoolInfo.TotalScore.BSingleNum, name:'二本上线人数'},
                            {value:d.SchoolInfo.TotalScore.CSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            analy.chartPie_v2({
                el:"#chart_shangxianlv2",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"学科上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.ExamInfo.Subject.AUserNum, name:'一本上线人数'},
                            {value:d.ExamInfo.Subject.OffLineNum, name:'下线人数'},
                            {value:d.ExamInfo.Subject.BSingleNum, name:'二本上线人数'},
                            {value:d.ExamInfo.Subject.CSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            //本校上线 图表
            analy.chartPie_v2({
                el:"#chart_shangxianlv3",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"本校上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.SchoolInfo.TotalScore.AUserNum, name:'一本上线人数'},
                            {value:d.SchoolInfo.TotalScore.OffLineNum, name:'下线人数'},
                            {value:d.SchoolInfo.TotalScore.BSingleNum, name:'二本上线人数'},
                            {value:d.SchoolInfo.TotalScore.CSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            analy.chartPie_v2({
                el:"#chart_shangxianlv4",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"本班上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.SchoolInfo.Subject.AUserNum, name:'一本上线人数'},
                            {value:d.SchoolInfo.Subject.OffLineNum, name:'下线人数'},
                            {value:d.SchoolInfo.Subject.BSingleNum, name:'二本上线人数'},
                            {value:d.SchoolInfo.Subject.CSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
        })
    };

    exports.region_shangxianlv = function(){
        var param = {
            params:["areaLineRate"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status === 1){
                // 小结
                $onlineRateDesc.html(template.region_xiaoji_desc(data.data));
                //学校VS班级表格
                $onlineRateTable.html(template.region_table(data.data));
                analy.outputHtmlToExcel("#j_js-shangxianlv,#j_shangxianlv");
            }else{
                $onlineRateDesc.html("");
                $onlineRateTable.subDataEmpty(0);
            }
            //总上线图表
            analy.chartPie_v2({
                el:"#chart_shangxianlv1",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"总体上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.AOnLine.ExamNum, name:'一本上线人数'},
                            {value:d.DOnLine.ExamNum, name:'下线人数'},
                            {value:d.BOnLine.ExamSingleNum, name:'二本上线人数'},
                            {value:d.COnLine.ExamSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
            analy.chartPie_v2({
                el:"#chart_shangxianlv2",
                height:400,
                data:data,
                callback:function(d){
                    return {
                        title:"本区上线人数分布",
                        legend:['一本上线人数','二本上线人数','三本上线人数','下线人数'],
                        series:[
                            {value:d.AOnLine.AreaNum, name:'一本上线人数'},
                            {value:d.DOnLine.AreaNum, name:'下线人数'},
                            {value:d.BOnLine.AreaSingleNum, name:'二本上线人数'},
                            {value:d.COnLine.AreaSingleNum, name:'三本上线人数'}
                        ]
                    }
                }
            });
        })
    };
});
