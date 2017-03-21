define(function (require, exports) {
    var roleID = $.getRoleID();
    // 查看图片左右翻页效果
    exports.fanYeEvent = function(){
        var pNum = 0,
            $highcBox = $(".highc-con-box"),
            $li = $highcBox.find("li"),
            $next = $(".highc-opt .next");
        // 图片小于3个  翻页隐藏
        if($li.length <= 3){
            $(".highc-opt").css("display","none");
        }

        $(".highc-opt .prev").on("click", function () {
            pNum++;
            var $this = $(this);
            var move = pNum * (-232);
            var item = $(".highc-con-item").length - 3;
            if (!$highcBox.is(":animated")) {
                $(".highc-con-box").animate({"left": +move + "px"}, 500);
            }
            if (item < pNum) {
                $highcBox.animate({"left": "0"}, 500);
                pNum = 0;
            }
            // 左边翻页到头时 显示灰色
            if(pNum < 1){
                $next.addClass("btn-opacity")
            }else{
                $next.removeClass("btn-opacity")
            }
        });
        $next.on("click", function (event) {
            pNum--;
            var move = pNum * (-232);
            if (!$highcBox.is(":animated")) {
                if (pNum >= 0) {
                    $(".highc-con-box").animate({"left": +move + "px"}, 500);
                } else {
                    pNum = 0;
                }
            }
            // 左边翻页到头时 显示灰色
            if(pNum < 1){
                $next.addClass("btn-opacity")
            }else{
                $next.removeClass("btn-opacity")
            }
        })
    };
    // 教师 查看原卷
    exports.jsSeePaper = function () {
        $("[id^=js-seepaper]").on("click",function(e){
            e.preventDefault();
            var studentID = $(this).data("student");
            $.cookie("analy_StudentID",studentID);
            var paperhtml = "<!-- 查看原卷 -->\r\n<div class=\"layer-seePaper\" id=\"seePaperLayer\">\r\n    <p class=\"loading\"></p>\r\n    <!--<div class=\"paperscore\">100</div>-->\r\n    <!--<div class=\"item-pic\"><img src=\"http://192.168.211.204:9011/Uploads/yuejuan/201612/19/54/222/54201501002/3/e136945d8363960504b8565e76ba4f79.jpg\"></div>-->\r\n</div>\r\n";
            // 图片弹窗
            layer.open({
                type: 0,
                title: "查看试卷",
                shade: 0.6,
                btn:false,
                scrollbar:false,
                area: ["800px","600px"],
                content: paperhtml,
                success:function(){
                    exports.seePaperEvent()
                }
            });
        })
    };
    // 班主任 查看原卷
    exports.bzrSeePaper = function () {
        $("[id^=bzr-seepaper]").on("click",function(e){
            e.preventDefault();
            var studentID = $(this).data("student");
            $.cookie("analy_StudentID",studentID);
            var paperhtml = "<!-- 高分试卷 -->\r\n<div class=\"layer-box\">\r\n    <div class=\"layer-box-con highscore\" id=\"highscore\">\r\n        <p class=\"loading\"></p>\r\n        <!--<div class=\"title\">-->\r\n            <!--<h4 class=\"fl highc-tit\">2016届高三年级全国九省三年级全国九三年级全国九三年级全国九三年级全国九大联考（一） 理科-数学</h4>-->\r\n            <!--<div class=\"fr form\">-->\r\n                <!--<select name=\"\" class=\"w70\">-->\r\n                     <!--<option value=\"\">数学</option>-->\r\n                     <!--<option value=\"\">语文</option>-->\r\n                     <!--<option value=\"\">英语</option>-->\r\n                     <!--<option value=\"\">物理</option>-->\r\n                     <!--<option value=\"\">生物</option>-->\r\n                     <!--<option value=\"\">化学</option>-->\r\n                 <!--</select>-->\r\n            <!--</div>-->\r\n        <!--</div>-->\r\n        <!--<div class=\"highc-layer\">-->\r\n            <!--<div class=\"highc-opt\">-->\r\n                <!--<a class=\"next un-select\"><</a>-->\r\n                <!--<a class=\"prev un-select\">></a>-->\r\n            <!--</div>-->\r\n            <!--<div class=\"highc-con\">-->\r\n                <!--<ul class=\"highc-con-box\">-->\r\n                    <!--<li class=\"highc-con-item\">-->\r\n                        <!--<div class=\"item-pic\"><a href=\"\" target=\"_blank\"><img src=\"/app/analy/img/test-paper.jpg\" alt=\"\"></a></div>-->\r\n                        <!--<div class=\"item-text\">-->\r\n                            <!--<p class=\"infotitle\">某第一中学1</p>-->\r\n                            <!--<div class=\"infotext\">-->\r\n                                <!--<span class=\"fl\">分数：720分</span>-->\r\n                                <!--<span class=\"fr\">学号：00000001</span>-->\r\n                            <!--</div>-->\r\n                        <!--</div>-->\r\n                    <!--</li>-->\r\n                    <!--<li class=\"highc-con-item\">-->\r\n                        <!--<div class=\"item-pic\"><a href=\"\" target=\"_blank\"><img src=\"/app/analy/img/test-paper.jpg\" alt=\"\"></a></div>-->\r\n                        <!--<div class=\"item-text\">-->\r\n                            <!--<p class=\"infotitle\">某第一中学2</p>-->\r\n                            <!--<div class=\"infotext\">-->\r\n                                <!--<span class=\"fl\">分数：720分</span>-->\r\n                                <!--<span class=\"fr\">学号：00000001</span>-->\r\n                            <!--</div>-->\r\n                        <!--</div>-->\r\n                    <!--</li>-->\r\n                    <!--<li class=\"highc-con-item\">-->\r\n                        <!--<div class=\"item-pic\"><a href=\"\" target=\"_blank\"><img src=\"/app/analy/img/test-paper.jpg\" alt=\"\"></a></div>-->\r\n                        <!--<div class=\"item-text\">-->\r\n                            <!--<p class=\"infotitle\">某第一中学3</p>-->\r\n                            <!--<div class=\"infotext\">-->\r\n                                <!--<span class=\"fl\">分数：720分</span>-->\r\n                                <!--<span class=\"fr\">学号：00000001</span>-->\r\n                            <!--</div>-->\r\n                        <!--</div>-->\r\n                    <!--</li>-->\r\n                <!--</ul>-->\r\n            <!--</div>-->\r\n        <!--</div>-->\r\n    </div>\r\n</div>\r\n";
            // 图片弹窗
            layer.open({
                type: 0,
                title: "查看试卷",
                shade: 0.6,
                btn:false,
                scrollbar:false,
                area: ["auto"],
                content: paperhtml,
                success:function(){
                    exports.bzrSeePaperURL()
                }
            });
        })
    };

    // 班主任查看原卷链接
    exports.bzrSeePaperURL = function(){
        var param = {
            params: ["getUserPaper"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID: $.cookie("analy_ClassID"),
            studentID: $.cookie("analy_StudentID"),
            subjectID: $.cookie("analy_SubjectID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status ===1){
                var json = data.data,
                    ExamName = json.ExamName,
                    Subject = json.Subject,
                    UserList = json.UserList;
                // 获取高分试卷内容
                var tpl = '';
                tpl += '<div class="title">'+
                    '<h4 class="fl highc-tit">'+ExamName+'</h4>'+
                    '<div class="fr form">'+
                    '<select name="" class="w70" id="paperSelect">';
                for(var j = 0; j < Subject.length; j++){
                    tpl += '<option value="'+Subject[j].SubjectID+'">'+Subject[j].SubjectName+'</option>'
                }
                tpl += '</select>'+
                    '</div></div>'+
                    '<div class="highc-layer">' +
                    '<div class="highc-con">'+
                    '<ul class="highc-con-box">';
                    var score = UserList.Score,
                        StudentCode = UserList.StudentCode,
                        SchoolName = UserList.SchoolName,
                        PaperUrl = UserList.PaperUrl,
                        name = UserList.RealName;
                    tpl += '<li class="highc-con-item">'+
                        '<div class="item-pic" id="paperUrl"  data-name="'+name+'" data-src="'+PaperUrl+'"><a target="_blank">' +
                        '<img src="'+PaperUrl[0]+'">';
                    tpl += '</a></div>'+
                        '<div class="item-text">'+
                        '<p class="infotitle">'+SchoolName+'</p>'+
                        '<div class="infotext">'+
                        '<span class="fl">分数：'+score+'分</span>'+
                        '<span class="fr">学号：'+StudentCode+'</span>'+
                        '</div>'+
                        '</div>'+
                        '</li>';
                tpl += '</ul>'+
                    '</div>' +
                    '</div>';
                $("#highscore").html(tpl);
                exports.changePaperEvent();

                $("[id^=paperUrl]").on("click",function(){
                    var paperhtml = "<!-- 查看原卷 -->\r\n<div class=\"layer-seePaper\" id=\"seePaperLayer\">\r\n    <p class=\"loading\"></p>\r\n    <!--<div class=\"paperscore\">100</div>-->\r\n    <!--<div class=\"item-pic\"><img src=\"http://192.168.211.204:9011/Uploads/yuejuan/201612/19/54/222/54201501002/3/e136945d8363960504b8565e76ba4f79.jpg\"></div>-->\r\n</div>\r\n",
                        $this = $(this),
                        tltle = $this.data("name"),
                        imglist = $this.data("src");
                    // 获取图片url地址
                    var imgArr = imglist.split(",");

                    // 图片弹窗
                    layer.open({
                        type: 1,
                        title: tltle,
                        shade: 0.6,
                        maxmin: 2,
                        area: ['800px', '600px'],
                        content: paperhtml,
                        success:function(){
                            var $seePaper = $("#seePaperLayer"),
                                html = "";
                            for(var i = 0 ; i < imgArr.length;i++){
                                html += '<div class="item-pic"><img src="'+imgArr[i]+'"></div>';
                            }
                            $seePaper.html(html)
                        }
                    });
                })

            }
        })
    };

    //查看高分试卷
    exports.heightPaper = function(){
        var param = {
            params: ["getMaxScorePaper"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID: $.cookie("analy_SubjectID"),
            classID: $.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){
            var $highscore = $("#highscore");
            if(data.status ===1){
                var json = data.data,
                    Subject = json.Subject,
                    UserList = json.UserList;
                // 获取高分试卷内容
                var tpl = '';
                tpl += '<div class="title">'+
                    '<h4 class="fl highc-tit">'+json.ExamName+'</h4>'+
                    '<div class="fr form">'+
                    '<select name="" class="w70" id="paperSelect">';
                for(var j = 0; j < Subject.length; j++){
                    tpl += '<option value="'+Subject[j].SubjectID+'">'+Subject[j].SubjectName+'</option>'
                }
                tpl += '</select>'+
                    '</div>'+
                    '</div>';
                tpl += '<div class="highc-layer">' +
                    '<div class="highc-con">'+
                    '<ul class="highc-con-box">';
                for(var i = 0 ; i < UserList.length; i++){
                    var score = UserList[i].Score,
                        StudentCode = UserList[i].StudentCode,
                        SchoolName = UserList[i].SchoolName,
                        PaperUrl = UserList[i].PaperUrl,
                        name = UserList[i].RealName;
                    var datasrc = PaperUrl.join("|");
                    tpl += '<li class="highc-con-item">'+
                        '<div class="item-pic" id="paperUrl"  data-name="'+name+'" data-src="'+datasrc+'"><a target="_blank">' +
                        '<img src="'+UserList[i].PaperUrl[0]+'">';
                    tpl += '</a></div>'+
                        '<div class="item-text">'+
                        '<p class="infotitle">'+SchoolName+'</p>'+
                        '<div class="infotext">'+
                        '<span class="fl">分数：'+score+'分</span>'+
                        '<span class="fr">学号：'+StudentCode+'</span>'+
                        '</div>'+
                        '</div>'+
                        '</li>'
                }
                tpl += '</ul>'+
                    '</div>' +
                    '</div>';
                $highscore.html(tpl);

                exports.changePaperEvent();

                // 学科老师 切换学科隐藏
                if(role === "1"){
                    $("#paperSelect").hide()
                }

                // 点击试卷
                $("[id^=paperUrl]").on("click",function(){
                    var paperhtml = "<!-- 查看原卷 -->\r\n<div class=\"layer-seePaper\" id=\"seePaperLayer\">\r\n    <p class=\"loading\"></p>\r\n    <!--<div class=\"paperscore\">100</div>-->\r\n    <!--<div class=\"item-pic\"><img src=\"http://192.168.211.204:9011/Uploads/yuejuan/201612/19/54/222/54201501002/3/e136945d8363960504b8565e76ba4f79.jpg\"></div>-->\r\n</div>\r\n",
                        $this = $(this),
                        tltle = $this.data("name"),
                        imglist = $this.data("src");
                    // 获取图片url地址
                    var imgArr = imglist.split("|");

                    // 图片弹窗
                    layer.open({
                        type: 1,
                        title: tltle,
                        shade: 0.6,
                        maxmin: 2,
                        area: ['800px', '600px'],
                        content: paperhtml,
                        success:function(){
                            var $seePaper = $("#seePaperLayer"),
                                html = "";
                            for(var i = 0 ; i < imgArr.length;i++){
                                html += '<div class="item-pic"><img src="'+imgArr[i]+'"></div>';
                            }
                            $seePaper.html(html)
                        }
                    });
                })
            }else{
                // 数据为空时
                $highscore.subDataEmpty(0)
            }
        })
    };
    // 高分试卷切换学科
    exports.changePaperEvent = function(){
        $("#paperSelect").on("change",function(){
            var $val = $(this).val();
            $.cookie("analy_SubjectID",$val);
            exports.heightPaper();
        })
    };
    //查看高分作文
    exports.MaxComposition = function(){
        var param = {
            params: ["getMaxComposition"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID: $.cookie("analy_ClassID")
        };

        var url = location.href;
        // 判断是班主任的查询页面
        if(url.match(/Bzr\/chaxun/i)){
            param.params = ["getStudentPaper"];
            param.subjectID = $.cookie("analy_SubjectID");
            param.studentID = $.cookie("analy_StudentID")
        }

        $.analyzeHandler(param,function(data){
            var $MaxCom = $("#gaofen-composition");
            if(data.status ===1){
                var json = data.data,
                    ExamName = json.ExamName,
                    UserList = json.UserList;
                // 获取高分试卷内容
                var tpl = '';
                tpl += '<div class="title">'+
                    '<h4 class="fl highc-tit">'+ExamName+'</h4>'+
                    '</div>'+
                    '<div class="highc-layer">' +
                    '<div class="highc-opt">'+
                    '<a class="next btn-opacity un-select"><</a>'+
                    '<a class="prev un-select">></a>'+
                    '</div>'+
                    '<div class="highc-con">'+
                    '<ul class="highc-con-box">';
                for(var i = 0 ; i < UserList.length; i++){
                    var score = UserList[i].Score,
                        StudentCode = UserList[i].StudentCode,
                        SchoolName = UserList[i].SchoolName,
                        PaperUrl = UserList[i].PaperUrl,
                        name = UserList[i].RealName;
                    tpl += '<li class="highc-con-item">'+
                        '<div class="item-pic" id="paperUrl"  data-name="'+name+'" data-src="'+PaperUrl+'"><a target="_blank">' +
                        '<img src="'+PaperUrl+'">';
                    tpl += '</a></div>'+
                        '<div class="item-text">'+
                        '<p class="infotitle">'+SchoolName+'</p>'+
                        '<div class="infotext">'+
                        '<span class="fl">分数：'+score+'分</span>'+
                        '<span class="fr">学号：'+StudentCode+'</span>'+
                        '</div>'+
                        '</div>'+
                        '</li>'
                }
                tpl += '</ul>'+
                    '</div>' +
                    '</div>';
                $("#composition").html(tpl);

                exports.fanYeEvent();

                // 学科老师 切换学科隐藏
                if(role === "1"){
                    $("#paperSelect").hide()
                }

                // 点击试卷
                $("[id^=paperUrl]").on("click",function(){
                    var paperhtml = "<!-- 查看原卷 -->\r\n<div class=\"layer-seePaper\" id=\"seePaperLayer\">\r\n    <p class=\"loading\"></p>\r\n    <!--<div class=\"paperscore\">100</div>-->\r\n    <!--<div class=\"item-pic\"><img src=\"http://192.168.211.204:9011/Uploads/yuejuan/201612/19/54/222/54201501002/3/e136945d8363960504b8565e76ba4f79.jpg\"></div>-->\r\n</div>\r\n",
                        $this = $(this),
                        tltle = $this.data("name"),
                        imgUrl = $this.data("src");


                    // 图片弹窗
                    layer.open({
                        type: 1,
                        title: tltle,
                        shade: 0.6,
                        scrollbar:false,
                        maxmin: 2,
                        area: ['600px', '800px'],
                        content: paperhtml,
                        success:function(){
                            var $seePaper = $("#seePaperLayer"),
                                html = "";
                                html += '<div class="item-pic"><img src="'+imgUrl+'"></div>';
                            $seePaper.html(html)
                        }
                    });
                })
            }else{
                // 数据为空时
                $MaxCom.subDataEmpty(0)
            }
        })
    };
    // 查看原卷
    exports.seePaperEvent = function(){
        var param = {
            params: ["getStudentPaper"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID: $.cookie("analy_SubjectID"),
            studentID: $.cookie("analy_StudentID")
        };
        if(roleID == 1){
            param.params = ["getUserPaper"];
        }
        $.analyzeHandler(param,function(data){
            var $seePaper = $("#seePaperLayer");
            // 获取弹窗内容
            if(data.status === 1){
                $(".layui-layer-min").hide();
                var json = data.data,
                    User = json.UserList,
                    tpl = "",
                    aperUrl;
                if(roleID == 0){
                    aperUrl= json.PaperUrl;
                }else{
                    aperUrl = json.UserList.PaperUrl;
                }
                for(var i = 0 ; i < aperUrl.length;i++){
                    tpl += '<div class="item-pic"><img src="'+aperUrl[i]+'"></div>';
                }
                $seePaper.html(tpl)
            }else{
                // 数据为空时
                $seePaper.subDataEmpty(0)
            }
        })
    }
})