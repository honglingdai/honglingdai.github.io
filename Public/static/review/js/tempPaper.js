define(function (require) {
    var logic = require("./logic");
    // 检查权限
    if (!logic.checkPower()) {
        return;
    }
    var tempJs = {
        init: function () {
            var e = this;

            e.getTempInfo();//获取数据
        },
        // 获取数据
        getTempInfo: function () {
            //生成样卷对比模版
            var param = {
                params: ["testContrast"],
                userID: $.cookie("yj_front_UserID"),
                listID: $.cookie("review_ListID")
            };
            $.handler(param, function (data) {
                var status = data.status;
                var $tempPaperContent = $("#tempPaperContent");
                if (status === 1) {
                    $tempPaperContent.html(tempJs.renderTempPaper(data.data));
                    $(".full-loading").fadeOut(100);
                }
                else {
                    $(".full-loading").addClass("data-empty-1");
                }
            });
        },
        // 生成模版

        renderTempPaper: function (data) {
            console.log(data);
            var temp = '';
            temp += '<h2 class="content-title">' + data.ExamName + $.getSubjectInfo() + '</h2>';

            //考试样卷
            temp += '<div class="panel-site">\
            <h3 class="bg-primary">考试样卷</h3>\
            <div class="panel-body panel-wall">';
            var TestList = data.TestList;
            var TestListLen = TestList.length,
                AnswerImg = data.StudentAnswerImg;
            for (var i = 0; i < TestListLen; i++) {
                var TestListItem = TestList[i];
                temp += '<div class="pc-item"><div class="text-primary">' + TestListItem.OrderID + '</div></div>\
                         <div class="pc-item"><b class="text-primary">答案</b> <div class="">' + TestListItem.Answer + '</div></div>';

                //样卷图象
                // temp += '<div class="pc-item"><b class="text-primary">图像</b> <div class="pc-img-size">';
                // temp += '<a href="' + AnswerImg + '" target="_blank">' +
                //     '<img class="resp-img img-site mt5" src="' + AnswerImg + '" alt="图像"/></a>';
                // temp += '</div></div>';

                //是否输出分界线
                if (TestListItem > 1 && TestListItem > (i + 1)) {
                    temp += '<div class="hr"></div>';
                }
            }
            temp += '</div></div>';
            //考试样卷

            //当前试卷
            temp += '<div class="panel-site">\
                     <h3 class="bg-primary">当前试卷</h3>\
                     <div class="panel-body panel-wall">';
            //样卷图象
            temp += '<div class="pc-item"><b class="text-primary">图像</b> <div class="pc-img-size">';
            temp += '<a class="dib" href="' + AnswerImg + '" target="_blank" title="查看大图">' +
                    '<img class="resp-img img-site mt5" src="' + AnswerImg + '" alt="图像"/></a>';
            temp += '</div></div>';
            //样卷图象end
            temp += '</div></div>';
            //当前试卷end
            return temp;
        }
    };
    tempJs.init()

});