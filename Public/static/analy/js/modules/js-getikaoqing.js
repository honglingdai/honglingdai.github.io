define(function (require, exports) {

    // 各题考情
    var analy = require("analy");
    exports.getikaoqing = function () {
        var param = {
            params: ["testConditions"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID: $.cookie("analy_ClassID"),
            subjectID: $.cookie("analy_SubjectID")
        };
        $.analyzeHandler(param, function (data) {
            var $getikaoqing = $("#j_getikaoqing");
            if (data.status === 1) {
                var table = "";
                var json = data.data;
                table += '<thead>' +
                    '<tr>' +
                    '<th width="40"><b>题号</b></th>' +
                    '<th width="70"><b>题型</b></th>' +
                    '<th width="70"><b>分值</b></th>' +
                    '<th width="140"><b>知识点</b></th>' +
                    '<th width="70"><b>实测区分度</b></th>' +
                    '<th width="70"><b>实测难度</b></th>' +
                    '<th width="70"><b>班级难度</b></th>' +
                    '<th width="70"><b>难度差</b></th>' +
                    '<th width="70"><b>本班表现</b></th>' +
                    '<th width="100"><b>B上线<br />错题人员</br></th>' +
                    '<th><b>其他错题人员</b></th>' +
                    '</tr>' +
                    '</thead>'+
                    '<tbody>';
                for (var i = 0; i < json.length; i++) {
                    table += '<tr>'+
                        '<td rowspan="2">' + json[i].OrderID + '</td>'+
                        '<td rowspan="2">' + json[i].TypesName + '</td>'+
                        '<td rowspan="2">' + json[i].ScoreSum + '</td>'+
                        '<td rowspan="2">' + json[i].KlName + '</td>'+
                        '<td rowspan="2">' + json[i].Distinguish + '</td>'+
                        '<td rowspan="2">' + json[i].TrueDiff + '</td>'+
                        '<td rowspan="2">' + json[i].ClassDiff + '</td>'+
                        '<td rowspan="2" id="diff">' + json[i].DiffDifference + '</td>'+
                        '<td rowspan="2">' + json[i].ClassPerformance + '</td>'+
                        '<td>B上线<br />错题人员</td>'+
                        '<td class="tr-maxw">' + json[i].BError + '</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>其他</td>'+
                        '<td class="tr-maxw">' + json[i].OtherError + '</td>'+
                        '</tr>'
                }
                table += '</tbody>';
                $getikaoqing.html(table);
                // 判断标红
                $('[id=diff]').each(function(){
                    var val = $(this).html();
                    if(val <= 0){

                        this.style.color = "#f03b19";
                        this.style.fontWeight = "600";
                        this.nextElementSibling.style.color = "#f03b19";
                        this.nextElementSibling.style.fontWeight = "600";
                        // $(this).css({
                        //     "color":"#f03b19",
                        //     "fontWeight":"600"
                        // });
                        // $(this).next('td').css({
                        //     "color":"#f03b19",
                        //     "fontWeight":"600"
                        // })
                    }
                });
                // 表格最多显示行数
                analy.isShowMore($getikaoqing, 4);
                // 表格头部固定
                analy.theadfixed($getikaoqing);
                // 导出excel
                analy.outputHtmlToExcel($getikaoqing);

            }
            else {
                $getikaoqing.subDataEmpty(0);
            }
        })
    };
});