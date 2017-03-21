define(function (require, exports) {

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
    }
    //查看高分试卷
    exports.heightPaper = function(){
        var param = {
            params: ["getMaxScorePaper"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID: $.cookie("analy_SubjectID"),
            studentID: $.cookie("analy_StudentID"),
            classID: $.cookie("analy_ClassID")
        }
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
                    '<select name="" class="w70" id="paperSelect">'
                for(var j = 0; j < Subject.length; j++){
                    tpl += '<option value="'+Subject[j].SubjectID+'">'+Subject[j].SubjectName+'</option>'
                }
                tpl += '</select>'+
                    '</div>'+
                    '</div>'+
                    '<div class="highc-layer">' +
                    '<div class="highc-opt">'+
                    '<a class="next un-select btn-opacity"><</a>'+
                    '<a class="prev un-select">></a>'+
                    '</div>'+
                    '<div class="highc-con">'+
                    '<ul class="highc-con-box">'
                for(var i = 0 ; i < UserList.length; i++){
                    var score = UserList[i].Score,
                        StudentCode = UserList[i].StudentCode,
                        SchoolName = UserList[i].SchoolName,
                        PaperUrl = UserList[i].PaperUrl,
                        name = UserList[i].RealName;
                    var datasrc = PaperUrl.join("|");
                    tpl += '<li class="highc-con-item">'+
                        '<div class="item-pic" id="paperUrl"  data-name="'+name+'" data-src="'+datasrc+'"><a target="_blank">' +
                        '<img src="'+UserList[i].PaperUrl[0]+'">'
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

                exports.fanYeEvent()

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
                                html += '<div class="paperscore">'+score+'</div>' +
                                    '<div class="item-pic"><img src="'+imgArr[i]+'"></div>';
                            }
                            $seePaper.html(html)
                        }
                    });
                })
            }else{
                $highscore.subDataEmpty(0)
            }
        })
    };
    //查看高分试卷
    exports.MaxComposition = function(){
        var param = {
            params: ["getMaxComposition"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID: $.cookie("analy_ClassID")
        }
        $.analyzeHandler(param,function(data){
            console.log(data)
            var $MaxCom = $("#gaofen-composition");
            if(data.status ===1){
                var json = data.data,
                    ExamName = data.ExamName,
                    UserList = json.UserList;
                console.log(json)
                // 获取高分试卷内容
                var tpl = '';
                tpl += '<div class="title">'+
                    '<h4 class="fl highc-tit">'+json.ExamName+'</h4>'+
                    '</div>'+
                    '<div class="highc-layer">' +
                    '<div class="highc-opt">'+
                    '<a class="next btn-opacity un-select"><</a>'+
                    '<a class="prev un-select">></a>'+
                    '</div>'+
                    '<div class="highc-con">'+
                    '<ul class="highc-con-box">'
                for(var i = 0 ; i < UserList.length; i++){
                    var score = UserList[i].Score,
                        StudentCode = UserList[i].StudentCode,
                        SchoolName = UserList[i].SchoolName,
                        PaperUrl = UserList[i].PaperUrl,
                        name = UserList[i].RealName;
                    tpl += '<li class="highc-con-item">'+
                        '<div class="item-pic" id="paperUrl"  data-name="'+name+'" data-src="'+PaperUrl+'"><a target="_blank">' +
                        '<img src="'+PaperUrl+'">'
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

                exports.fanYeEvent()

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
                        maxmin: 2,
                        area: ['600px', '800px'],
                        content: paperhtml,
                        success:function(){
                            var $seePaper = $("#seePaperLayer"),
                                html = "";
                                html += '<div class="paperscore">'+score+'</div>' +
                                    '<div class="item-pic"><img src="'+imgUrl+'"></div>';
                            $seePaper.html(html)
                        }
                    });
                })
            }else{
                $MaxCom.subDataEmpty(0)
            }
        })
    };
    // 查看原卷
    exports.seePaperEvent = function(){
        var $paperBtn = $(".see-paper");

        var param = {
            params: ["getStudentPaper"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            subjectID: $.cookie("analy_SubjectID"),
            studentID: $.cookie("analy_StudentID")
        }
        $.analyzeHandler(param,function(data){
            var  $seePaper = $("#seePaperLayer");
            if(data.status === 1){
                var json = data.data;
                // 获取弹窗内容
                var paperUrl= json.PaperUrl,
                    score = json.Score,
                    tpl = "";
                for(var i = 0 ; i < paperUrl.length;i++){
                    tpl += '<div class="paperscore">'+score+'</div>' +
                        '<div class="item-pic"><img src="'+paperUrl[i]+'"></div>';
                }
                $seePaper.html(tpl)
            }else{
                $seePaper.subDataEmpty(0)
            }
        })
    }
})