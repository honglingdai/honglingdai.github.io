define(function (require) {
    var logic = require("./logic");
    // 检查权限
    if (!logic.checkPower()) {
        return;
    }
    // var changeNum = require("./units/num2chinese");

    var currentBtn = $("#j_show-current-ques"),
        showAllBtn = $("#j_show-all");

    var standardJs = {
        init: function () {
            var e = this;

            // 默认获取当前试题
            var quesHash = location.hash;
            if(quesHash === "#all"){
                e.getDataInfo();
            }else{
                e.getDataInfo("listID");
            }
            standardJs.showQuesEvent();
        },
        // 获取评分标准
        getDataInfo: function (listID) {
            //获取数据的参数
            var param = {
                params: ["subjectTestStandard"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("review_ExamID"),
                subjectID: $.cookie("review_SubjectID")
            };

            // 获取当前试题
            listID && $.extend(param,{listID: $.cookie("review_ListID")});

            //获取数据
            $.handler(param, function (data) {
                var status = data.status;
                var $standardContentTitle = $("#standardContent").find(".content-title");
                var $standardDetail = $("#standardDetail");
                if (status === 1) {

                    $standardContentTitle.html(data.data.ExamName + $.getSubjectInfo());
                    var hasTypesList = data.data.TypesList && data.data.TypesList.length>0;

                    if(hasTypesList){
                        $standardDetail.html(standardJs.renderStandard(data.data));
                    }else{
                        $standardDetail.subDataEmpty(0);
                    }
                    standardJs.showCurrentBtnStyle();
                    $(".full-loading").fadeOut(100);
                }
                else {
                    $(".full-loading").addClass("data-empty-1");
                }
            });
        },

        //全部试题&当前试题
        showQuesEvent: function () {

            // 显示当前试题
            currentBtn.on("click", function () {
                standardJs.getDataInfo("listID");
            });

            // 显示全部
            showAllBtn.on("click", function () {
                standardJs.getDataInfo();

            })
        },

        // 设置当前按钮样式
        showCurrentBtnStyle:function(){
            var quesHash = location.hash;
            if(quesHash === "#all"){
                currentBtn.addClass("btn-second").removeClass("btn-primary");
                showAllBtn.addClass("btn-primary").removeClass("btn-second");
            }
            if(quesHash === ("#current" || "")){
                currentBtn.addClass("btn-primary").removeClass("btn-second");
                showAllBtn.addClass("btn-second").removeClass("btn-primary");
            }
        },
        // 生成评分标准html
        renderStandard: function (data) {
            var temp = '';
            // temp += '<div class="panel-head">\
            // <h2 class="content-title">' + data.ExamName + '</h2>\
            // <div class="panel-handle tr">\
            // <a class="btn btn-second btn-lg mr10 btn-md-w" id="j_show-all" href="#all">全部试题</a>\
            // <a class="btn btn-primary btn-lg btn-md-w" id="j_show-current-ques" href="#current">当前试题</a>\
            // </div>\
            // </div>\
            // <div class="panel-content pt30">';
            for (var i = 0; i < data.TypesList.length; i++) {
                var TypesList = data.TypesList[i];
                    // _num = changeNum.change((i + 1).toString()) + '、';
                temp += '<div class="panel-site j_ques-type-item">\
                <h3 class="bg-primary">' + TypesList.TypesName + '（' + TypesList.TypesScore + '分）</h3>\
                <div class="panel-body panel-wall">';

                var TestList = TypesList.TestList,
                    TestListLen = TestList.length;
                if (TestListLen > 0) {
                    temp += '<div class="j_ques-type ques-type2">';
                    for (var k = 0; k < TestListLen; k++) {
                        var TestListItem = TestList[k];
                        temp += '<div class="pc-item" id="orderid-' + TestListItem.OrderID + '"><b class="text-primary">' + TestListItem.OrderID + '.</b></div>\
                            <div class="pc-item"><b class="text-primary">答案</b> <div class="">' + TestListItem.Answer + '</div></div>\
                            <div class="pc-item"><b class="text-primary">评分细则</b>\
                            <div class="standard-desc">' + (TestListItem.Scoring ? TestListItem.Scoring : '未填写') + '</div>\
                            </div>';
                        if (TestListLen > 1) {
                            //order += 1;
                            if (k < TestListLen - 1) {
                                temp += '<div class="hr"></div>';
                            }
                        }
                    }
                    temp += '</div>';
                }
                temp += '</div></div>';
            }
            // temp += '</div>';
            return temp;
        }

    };
    standardJs.init();
});