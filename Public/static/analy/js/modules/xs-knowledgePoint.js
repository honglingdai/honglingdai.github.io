define(function (require, exports) {
    //知识点掌握情况
    require("../getData");
    var analy = require("analy");

    // var url_getKnowledgePoint = "/Analysis/Index/getApi.html?getKnowledgePoint";
    exports.knowledgePoint = function () {
        // 参数配置
        var param = {
            params: ["getKnowledgeAnalysis"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID: $.cookie("analy_SubjectID"),
            studentID: $.cookie("analy_StudentID")
        };
        if (role === "2") {
            // 班主任权限参数
            param.classID = $.cookie("analy_ClassID")
        }
        $.analyzeHandler(param, function (data) {

            //知识点容器
            var $tableID = $("#j_unHoldKnowledge-item"),
                $knowledge = $("#j_knowledge-item");

            if (data.status === 1) {
                var list = data.data;
                console.log(list)
                // 处理返回数据
                var eachArr = function (num, opt) {
                    var arr = [];
                    var newList = list.BadKnowledge;
                    for (var i = 0; i < newList.length; i++) {
                        var item = newList[i][num];
                        if (item === null) {
                            item = "--"
                        }
                        arr.push(item)
                    }
                    return arr;
                };
                // 生成表格参数
                var dataArray = {};
                dataArray.unHold = {};
                dataArray.unHold.pointName = eachArr("KnowledgeName");
                dataArray.unHold.score = eachArr("ScoreSum");
                dataArray.unHold.mineRatio = eachArr("MyAvg");
                dataArray.unHold.examRatio = eachArr("ExamAvg");
                var unHold = dataArray.unHold;

                //生成已掌握知识点列表
                var knowledge = '';
                if(list.GoodKnowledge.length > 0){
                    for (var i = 0; i < list.GoodKnowledge.length; i++) {
                        knowledge += '<li>' + list.GoodKnowledge[i] + '</li>'
                    }
                }else{
                    // 数据为空时 副标题内容也清空
                    knowledge += '<p>暂无</p>';
                    $knowledge.siblings().find('.text-muted').eq(0).html('')
                }
                $knowledge.html(knowledge);

                //生成未掌握的知识点列表
                function outUnHoldList() {
                    var tpl = '';
                    tpl += '<thead>\
                        <tr>\
                        <th width="50"><b>序号</b></th>\
                        <th width="250"><b>知识点</b></th>\
                        <th width="100"><b>分值</b></th>\
                        <th><b><span class="bar-tips bg-primary">&nbsp;</span>我的掌握率 vs 本次考试掌握率<span class="bar-tips bg-gray">&nbsp;</span></b>\
                    </th>\
                    </tr>\
                    </thead>';

                    tpl += '<tbody>';
                    for (var i = 0; i < unHold.pointName.length; i++) {
                        tpl += '<tr>\
                        <td>' + (i + 1) + '</td>\
                        <td>' + unHold.pointName[i] + '</td>\
                        <td>' + unHold.score[i] + '</td>\
                        <td>\
                        <div class="state-bar">\
                        <div class="bar-item clearfix">\
                        <span class="text">' + unHold.mineRatio[i] + '%\
                        </span>\
                        <div class="bar-bg">\
                        <div class="bg-primary" style="width:' + unHold.mineRatio[i] + '%;"></div>\
                        </div>\
                        </div>\
                        <div class="bar-item clearfix">\
                        <div class="bar-bg">\
                        <div class="bg-gray" style="width:' + unHold.examRatio[i] + '%;"></div>\
                        </div>\
                        <span class="text">' + unHold.examRatio[i] + '%\
                        </span>\
                        </div>\
                        </div>\
                        </td>\
                        </tr>';
                    }
                    tpl += '</tbody>';
                    return tpl;
                }
                $tableID.html(outUnHoldList());

                //按需添加显示更多按钮
                analy.isShowMore($tableID);
                // 表格头部固定
                analy.theadfixed($tableID);
                // 导出Excel表格
                analy.outputHtmlToExcel($tableID);
            }
            else{
                // 数据为空时显示
                $tableID.subDataEmpty(0);
                $knowledge.subDataEmpty(0);
            }
        })


    };
});