define(function (require, exports) {
    var analy = require("analy");
    //班级知识板块达成度分析
    exports.zhishibankuaidcd = function(){
        var params = {
            params:['knowledgeAchieve'],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID"),
            subjectID:$.cookie("analy_SubjectID"),
            scoreRate:0.4
        };
        var $achieve = $("#achieve-sel");

        // var $val = $achieve.find("option:selected").val();
        // select改变时
        $achieve.on("change",function(){
            var $val = $(this).val();
            // params.params[0] = "knowledgeAchieve";
            // 重新获取参数
            params.scoreRate=$val - 0;
            $.analyzeHandler(params,function(data) {
                var tableID = $("#j_zhishibankuaidcd");
                if (data.status === 1) {
                    var json = data.data;
                    var KlInfo = json.KlInfo;
                    var html = '';
                    html += '<thead>'+
                        '<tr>'+
                        '<th width="180"><b>知识板块</b></th>'+
                        '<th width="100"><b>总分</b></th>'+
                        '<th width="100"><b>校平均分</b></th>'+
                        '<th width="100"><b>班平均分</b></th>'+
                        '<th><b>知识点得分率低于 <span class="text-primary"> '+ $val*100 +'%</span> 学生姓名</b></th>'+
                        '</tr>'+
                        '</thead>'+
                        '<tbody>';
                    for(var i = 0; i < KlInfo.length;i++){
                        html += '<tr>'+
                            '<td><b>' + KlInfo[i].KlName + '</b></td>'+
                            '<td><b>' + KlInfo[i].Score + '</b></td>'+
                            '<td>' + KlInfo[i].SchoolAvg + '</td>'+
                            '<td>' + KlInfo[i].ClassAvg + '</td>'+
                            '<td class="tr-maxw">' + KlInfo[i].UserName + '</td>'+
                            '</tr>'
                    }

                    html += '</tbody>';

                    tableID.html(html);
                    // 表格默认显示行数
                    analy.isShowMore(tableID,2);
                    // 表格头部固定
                    analy.theadfixed(tableID);
                    // 导出excel
                    analy.outputHtmlToExcel(tableID);
                }
                else{
                    // 数据为空时
                    tableID.subDataEmpty(0);
                }
            });
        }).trigger("change")

    };



    //班级能力板块达成度分析
    // exports.nenglibankuaidcd = function(){
    //
    // };
});