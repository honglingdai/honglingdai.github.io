define(function (require) {
    var analy = require("analy");
    var m1 = require("../modules/alert-heightpaper");
    require("../getData");
    // 身份id

    //学科老师隐藏学科分类
    if(role == "1"){
        $("#j_filter-xueke").parents(".class-filter").hide();
    }
    var subject = $.cookie("analy_SubjectID");   // 学科ID

    // 获取标题前缀学科名
    var subjectName = "（"+ $.getSubjectInfo(Math.floor(subject),1) +"）";
    // 页面title信息
    var titleData = [
        {
            "path": /Analysis\/Student\/chengji/i,
            "PageName": "成绩分析报告"
        },
        {"path": /Analysis\/Student\/kaodian/i, "PageName": "考点分析报告", "subjectList": subjectName},
        {
            "path": /Analysis\/Teacher\/(gaikuang|miaoshu|shangxian|chengji|xueqing)/i,
            "PageName": "班级学科报告",
            "subjectList": subjectName
        },
        {"path": /Analysis\/Teacher\/mingtizhiliang/i, "PageName": "命题质量报告", "subjectList": subjectName},
        {"path": /Analysis\/Teacher\/chaxun/i, "PageName": "学生报告查询", "subjectList": subjectName},
        {"path": /Analysis\/Bzr\/(gaikuang|miaoshu|shangxian|chengji|xueqing)/i, "PageName": "班级报告"},
        {"path": /Analysis\/Bzr\/chaxun/i, "PageName": "学生报告查询"},
        {"path": /Analysis\/Bzr\/mingtizhiliang/i, "PageName": "命题质量报告","subjectList": subjectName},
        {"path": /Analysis\/Bzr\/chaxun/i, "PageName": "学生报告查询"},
        {"path": /Analysis\/Rector\/zong_(gaikuang|miaoshu|shangxian|chengji|xueqing)/i, "PageName": "总报告"},
        {"path": /Analysis\/Rector\/xueke_(gaikuang|miaoshu|shangxian|chengji|xueqing)/i, "PageName": "学科报告", "subjectList": subjectName},
        {"path": /Analysis\/Rector\/mingtizhiliang/i, "PageName": "命题质量报告","subjectList": subjectName},
        {"path": /Analysis\/Region\/xianji/i, "PageName": "县级主管报告"},
        {"path": /Analysis\/Region\/xiaoji_(gaikuang|miaoshu|shangxian|chengji|xueqing)/i, "PageName": "校级主管报告"},
        {"path": /Analysis\/Region\/xiaqu_(gaikuang|miaoshu|shangxian|chengji|xueqing)/i, "PageName": "辖区学校报告"},
        {"path": /Analysis\/Region\/mingtizhiliang/i, "PageName": "命题质量报告"}

    ];
    // 生成报告URL
    var reportPdfUrl = function(){
        var studentID = $.cookie("analy_StudentID"),
            examID = $.cookie("analy_ExamID"),
            subjectID = $.cookie("analy_SubjectID"),
            classID =  $.cookie("analy_ClassID"),
            url = location.href,
            reportUrl;
        if(url.match(/Student\/chengji/)){
            // 学生成绩分析url
            reportUrl = '/mark/public/downloadPDF?StudentID='+studentID+'&ExamID='+examID+'&Style=student';
        }else if(url.match(/Student\/kaodian/)){
            // 学生考点分析url
            reportUrl = '/mark/public/downloadPDF?StudentID='+studentID+'&ExamID='+examID+'&Style=examination';
        }else if(url.match(/Teacher\/(gaikuang|miaoshu|shangxian|chengji|xueqing)/)){
            // 教师班级学科报告url
            reportUrl = '/mark/public/downloadPDF?ExamID='+examID+'&ClassID='+classID+'&SubjectID'+ subjectID +'&Style=classSubject';
        }else if(url.match(/Teacher\/chaxun/)){
            // 教师学生报告查询url
            reportUrl = '/mark/public/downloadPDF?ExamID='+examID+'&ClassID='+classID+'&SubjectID'+ subjectID +'&Style=teacherQuery';
        }else if(url.match(/Teacher\/mingtizhiliang/)){
            // 教师命题质量报告url
            reportUrl = '/mark/public/downloadPDF?ExamID='+examID+'&ClassID='+classID+'&SubjectID'+ subjectID +'&Style=teacherQuality';
        }else if(url.match(/Bzr\/(gaikuang|miaoshu|shangxian|chengji|xueqing)/)){
            // 班主任班级报告url
            reportUrl = '/mark/public/downloadPDF?ExamID='+examID+'&ClassID='+classID+'&SubjectID'+ subjectID +'&Style=bzrClass';
        }else if(url.match(/Bzr\/chaxun/)){
            // 班主任学生报告url
            reportUrl = '/mark/public/downloadPDF?ExamID='+examID+'&ClassID='+classID+'&SubjectID'+ subjectID +'&Style=bzrQuery';
        }
        else if(url.match(/Bzr\/mingtizhiliang/)){
            // 班主任命题质量报告url
            reportUrl = '/mark/public/downloadPDF?ExamID='+examID+'&ClassID='+classID+'&SubjectID'+ subjectID +'&Style=bzrQuality';
        }
        return reportUrl;
    };


    var analyHeadJs = {
        init:function(){
            var e = this;
            e.createCrumbs();  //创建面包屑导航
            e.setCurrPageNav(); //设置当前标签页样式
            if(role == "0" || role == "2" || role == "4" || role == "5"){   //当角色为学生和班主任和校长时
                e.getSubjectInfo();  //学科基本信息
            }
            if(role == 5){    //辖区学校头部生成 学校
                e.getSchoolInfo();
            }
            e.getExamHeadData();  //获取考试基本信息
            e.pdfHelperAlert();  //pdf帮助信息显示
            e.seePaperEvent();     //查看原卷

            // ajax 请求完成后
            var $outputExcel = $("#report-pdf");
            Pace.on("done",function(){

                // 防止重复绑定事件
                if($outputExcel.attr("isReady") != 1){
                    $outputExcel.removeClass("btn-disabled");
                    e.reportPdfEvent();  //学生报告PDF
                    $outputExcel.attr("isReady",1);
                }
            })
        },

        //学生报告PDF
        reportPdfEvent:function(){
            // 伪造form表单
            var studentID = $.cookie("analy_StudentID");
            var examID = $.cookie("analy_ExamID");
            // var downUrl = '/mark/public/downloadPDF?StudentID='+studentID+'&ExamID='+examID+'&Style=student';
            var downUrl = reportPdfUrl();
            var formdata = "<form id='form-data' method='post' name='echartsImg' target='_blank' action='"+downUrl+"'></form>";
            $(".analy-lay").wrap(formdata);
            var $btn = $("#report-pdf");

            var url = location.href;
            var loadingGetPdf;//定时器
            $btn.on("click",function(e){
                // e.preventDefault();
                var $this = $(this);
                // $this.addClass("btn-disabled");
                // loadingGetPdf = setTimeout(function(){
                //     $("#form-data").submit();
                //     $this.removeClass("btn-disabled");
                // },1500);
                var text = $this.html();
                if(!$this.hasClass("btn-disabled")){
                    clearTimeout(loadingGetPdf);
                    loadingGetPdf = setTimeout(function(){
                        $this.removeClass("btn-disabled").html(text);
                        $("#form-data").submit();
                    },1500);
                }
                $this.addClass("btn-disabled").html("报告导出中...");

                // 防止重复点击
                // if(!$this.hasClass("isLoading")){
                //     clearTimeout(loadingGetPdf);
                //     loadingGetPdf = setTimeout(function(){
                //         $this.removeClass("isLoading");
                //         $("#form-data").submit();
                //     },1500)
                // }
                // $this.addClass("isLoading");
            })

        },
        //创建面包屑导航
        createCrumbs:function(){
            function setCurrCrumbs(url,crumbs){
                var pageName = '';
                for(var i=0;i<crumbs.length;i++){
                    var crumbsData = crumbs[i];
                    if(url.match(crumbsData.path)){
                        pageName = crumbsData.PageName;
                        break;
                    }
                }
                return pageName;
            }
            var crumbsHtml = '<a href="">首页</a>\
            <i class="icon">/</i>\
            <a href="/Analysis/Index/index.html">考试列表</a>\
            <i class="icon">/</i>\
            <span id="crumbs_on">'+setCurrCrumbs(location.href,titleData)+'</span>';
            $("#j_main-crumbs").html(crumbsHtml);
        },
        //设置当前标签页样式
        setCurrPageNav:function(){
            var pageNavTab = $(".head-nav").find(".tab-itm");
            pageNavTab.each(function(){
                var $this = $(this);
                var pageArr = $this.data("href").split("&");
                for(var i = 0;i<pageArr.length;i++){
                    if(window.location.href.indexOf(pageArr[i])!=-1){
                        $this.addClass("on");
                    }
                }
            });
            var $category =$("#j_filter-fenlei").find("li");
            $category.each(function(){
                var $this = $(this).find("a");
                var pageTarget = $this.data("target");
                if(pageTarget && window.location.href.indexOf(pageTarget)!=-1){
                    $this.parents("li").addClass("on");
                }
            });
        },
        //获取考试基本信息
        getExamHeadData:function(){
            // 根据路径设置页面标题
            function setCurrTitle(url,title){
                var pageName = '';
                for(var i=0;i<title.length;i++){
                    var titleData = title[i];
                    if(url.match(titleData.path)){
                        pageName = titleData.PageName;
                        //如果有学科
                        if(titleData.subjectList){
                            pageName += titleData.subjectList;
                        }
                        break;
                    }
                }
                return pageName;
            }
            // 参数配置
                var param,
                baseParam = {
                    userID: $.cookie("yj_front_UserID"),
                    examID: $.cookie("analy_ExamID")
                },
                // 学生权限参数
                param_student = {
                    params: ["getSubjectTop"],
                    studentID: $.cookie("analy_StudentID")
                },
                // 学科老师权限参数
                param_teacher = {
                    params: ["teacherexamSummaryTop"],
                    classID: $.cookie("analy_ClassID"),
                    subjectID: $.cookie("analy_SubjectID")
                },
                // 班主任权限参数
                param_master = {
                    params: ["getPageTop"],
                    classID: $.cookie("analy_ClassID"),
                    subjectID: $.cookie("analy_SubjectID"),
                    status: 1
                },
                // 校长权限
                param_rector = {
                    params: ["paperTop"],
                    schoolID: $.cookie("analy_SchoolID")
                },
                // 区域权限
                param_region = {
                    params: ["getPageTop"],
                    areaID: $.cookie("analy_AreaID")
                };
            // 根据身份id 配置参数
            switch(role){
                case "0":param = $.extend({},baseParam,param_student);
                    break;
                case "1":param = $.extend({},baseParam,param_teacher);
                    break;
                case "2":param = $.extend({},baseParam,param_master);
                    break;
                case "4":param = $.extend({},baseParam,param_rector);
                    break;
                case "5":param = $.extend({},baseParam,param_region);
                    break;
                default :param = $.extend({},baseParam,param_teacher);
            }
            $.analyzeHandler(param,function(data){
                if(data.status === 1){
                    var list = data.data;
                    var titleFre = setCurrTitle(location.pathname,titleData);
                    var title = "<b>"+ titleFre +"</b> - " + list.ExamName;
                    $("#j_exam-title").html(title);
                    var tpl = "";
                    tpl += '<span class="desc-item">考试创建时间：<em class="j_exam-time">'+list.ExamAddTime+'</em></span>'+
                        '<span class="desc-item">班级：<em class="j_exam-banji">'+list.ClassName+'</em></span>'+
                        '<span class="desc-item">年级：<em class="j_exam-nianji">'+list.GradeName+'</em></span>'+
                        '<span class="desc-item">学校：<em class="j_exam-school">'+list.SchoolName+'</em></span>'+
                        '<span class="desc-item">区域：<em class="j_exam-region">'+list.AreaName+'</em></span>';
                    $("#j_exam-item").html(tpl);
                    // $(".j_exam-time").html(list.ExamAddTime);
                    // $(".j_exam-banji").html(list.ClassName);
                    // $(".j_exam-school").html(list.SchoolName);
                    // $(".j_exam-nianji").html(list.GradeName);
                    // $(".j_exam-region").html(list.AreaName);
                    if(role === "0"){
                        // 学生头部
                        $(".j_exam-nianji").parent(".desc-item").css("display","none");
                        $(".j_exam-region").parent(".desc-item").css("display","none");
                    }else if(role === "1"){
                        // 教师头部
                        // $(".j_exam-time").html(list.AddTime);
                        $(".j_exam-region").parent(".desc-item").css("display","none");
                    }else if(role === "2"){
                        // 班主任头部
                        $(".j_exam-time").html(list.AddTime);
                        $(".j_exam-region").parent(".desc-item").css("display","none");
                    }else if(role === "4"){
                        // 校长头部
                        $(".j_exam-banji").parent(".desc-item").css("display","none");
                        $(".j_exam-region").parent(".desc-item").css("display","none");
                    }else if(role === "5"){
                        // 区域头部
                        $(".j_exam-banji").parent(".desc-item").css("display","none");
                        $(".j_exam-school").parent(".desc-item").css("display","none");
                    }
                    // $.cookie("SubjectID",list.SubjectID,{"path":"/Analysis"})
                }
            })
        },
        //班级基本信息
        // getClassInfogetClassInfo:function(){
        //     var param = {
        //         params:["getSubjectTop"],
        //         userID: $.cookie("yj_front_UserID"),
        //         examID:$.cookie("ExamID"),
        //         studentID: $.cookie("StudentID")
        //     };
        //     $.analyzeHandler(param,function(data){
        //         var status = data.status;
        //         if(status===1){
        //             var gradeData = data.data.GradeList;
        //             var gradeHtml = '<li class="category-name"><b>班级：</b></li>';
        //             $.each(gradeData,function(i,n){
        //                 gradeHtml+=' <li gid="GradeID'+i+'"><a href="?GradeID='+i+'" >'+n+'</a></li>';
        //             });
        //             var $Class = $("#j_filter-banji");
        //             $Class.html(gradeHtml);
        //             $Class.find("[gid='GradeID"+ $.cookie("GradeID")+"']").addClass("on");
        //             $Class.on("click","a",function(){
        //                 location.reload()
        //             });
        //         }
        //     })
        // },
        // 学科基本信息
        getSubjectInfo:function(){

            //获取学科-生成学科选项
            //设置默认学科为第一个学科
            //切换学科后记录当前学科，重新加载后设置当前学科样式
            //获取学科
                        // 参数配置
            var param,
                baseParam = {
                    userID: $.cookie("yj_front_UserID"),
                    examID: $.cookie("analy_ExamID"),
                    subjectID:$.cookie("analy_SubjectID")
                },
                // 学生权限
                param_Student = {
                    params:["getSubjectTop"],
                    studentID: $.cookie("analy_StudentID")
                },
                // 学科老师权限参数
                param_Teacher = {
                    params:["getSubjectTop"],
                    studentID: $.cookie("analy_StudentID")
                },
                // 班主任权限参数
                param_Bzr = {
                    params:["getPageTop"],
                    classID:$.cookie("analy_ClassID"),
                    studentID: $.cookie("analy_StudentID"),
                    status:1
                },
                // 校长权限
                param_Rector = {
                    params:["paperTop"],
                    schoolID: $.cookie("analy_SchoolID"),
                    status : 1
                },
                // 区域权限
                param_Region = {
                    params:["getPageTop"],
                    schoolID: $.cookie("analy_SchoolID"),
                    areaID: $.cookie("analy_AreaID"),
                    status : 2
                };
            // 根据身份id 配置参数
            switch(role){
                case "0" : param = $.extend({},baseParam,param_Student);
                    break;
                case "1" : param = $.extend({},baseParam,param_Teacher);
                    break;
                case "2" : param = $.extend({},baseParam,param_Bzr);
                    break;
                case "4" : param = $.extend({},baseParam,param_Rector);
                    break;
                case "5" : param = $.extend({},baseParam,param_Region);
                    break;
            }
            $.analyzeHandler(param,function(data){
                if(data.status === 1){
                    var list = data.data;
                    var eachArr = function(num){
                        var arr = [];
                        var newList = list.SubjectList;
                        for(var i = 0 ; i < newList.length; i++){
                            var item = newList[i][num];
                            arr.push(item)
                        }
                        return arr;
                    };
                    var subInfo = {};
                    subInfo.subjectID = eachArr("SubjectID");
                    subInfo.subjectName = eachArr("SubjectName");

                    var CurrSubject = $.cookie("analy_CurrSubject");


                    // 没有学科cookie时，从数据中读取
                    if(subject == undefined){
                        $.cookie("analy_SubjectID",list.SubjectID,{"path":"/Analysis"});
                        $("[curr-subject="+list.SubjectID+"]").addClass("on");
                    }
                    //当学科cookie 和 切换cookie 不相等时
                    if(subject !== CurrSubject){
                        $.removeCookie("analy_CurrSubject",{"path":"/Analysis"});
                        $.cookie("analy_CurrSubject",subject,{"path":"/Analysis"});
                    }

                    //切换学科后记录当前学科
                    if(!$.cookie("analy_CurrSubject")){
                        $.cookie("analy_CurrSubject",subInfo.subjectID[0],{"path":"/Analysis"});
                    }
                    //生成学科选项
                    var subjectTpl = '';
                    subjectTpl +='<li class="category-name"><b>学科类型：</b></li>';
                    for(var i=0;i<subInfo.subjectID.length;i++){
                        subjectTpl += ' <li curr-subject='+subInfo.subjectID[i]+
                            '><a href="?analy_SubjectID='+subInfo.subjectID[i]+'">'+
                            subInfo.subjectName[i]+'</a></li>';
                    }
                    var $xuekeList = $("#j_filter-xueke");
                    $xuekeList.html(subjectTpl);
                    $xuekeList.on("click","li",function(){
                        $.cookie("analy_CurrSubject",$(this).attr("curr-subject"),{"path":"/Analysis"});
                    });
                    //重新加载后设置当前学科样式
                    var currSubject = $.cookie("analy_CurrSubject");
                    $("[curr-subject="+currSubject+"]").addClass("on");
                    // $.cookie("SubjectID",currSubject,{"path":"/Analysis"})

                    //判断当学科ID没有时 切换学科默认为第一个
                    var hascurrsubject = $.inArray(currSubject,subInfo.subjectID);
                    if(hascurrsubject == -1){
                        var newSubject = subInfo.subjectID[0];
                        $("[curr-subject="+newSubject+"]").addClass("on");
                    }

                    // //判断当学科ID没有时  默认读取第一个数据
                    // var hasSubject = $.inArray(subject,subInfo.subjectID);
                    // if(hasSubject == -1){
                    //     var newSubject = subInfo.subjectID[0];
                    //     $("[curr-subject="+newSubject+"]").addClass("on");
                    //     $.cookie("analy_SubjectID",newSubject,{"path":"/Analysis"})
                    // }
                }

                //查看试卷
                // $xuekeList.parent().after('<a class="fr see-paper btn btn-second" href="javascript:;" id="j_see-paper">' +
                //     '<i class="iconfont">&#xe60b;</i>查看原卷</a>');
                // $("#j_see-paper").on("click",function(){
                //     $.get(url_getSourcePaper,{},function(data){
                //         var dataImg = $.parseJSON(data).data;
                //         window.open(dataImg.imageUrl);
                //     })
                // })

            })
        },

        // 区域-辖区学校 生成学校
        getSchoolInfo:function(){

            //获取学校-生成学科选项
            //设置默认学科为第一个学科
            // 参数配置
            var param = {
                    params:["getPageTop"],
                    userID: $.cookie("yj_front_UserID"),
                    examID: $.cookie("analy_ExamID"),
                    subjectID:$.cookie("analy_SubjectID"),
                    schoolID: $.cookie("analy_SchoolID"),
                    areaID: $.cookie("analy_AreaID"),
                    status : 1
                };
            $.analyzeHandler(param,function(data){
                if(data.status === 1){
                    var list = data.data;
                    var eachArr = function(num){
                        var arr = [];
                        var newList = list.SchoolList;
                        for(var i = 0 ; i < newList.length; i++){
                            var item = newList[i][num];
                            arr.push(item)
                        }
                        return arr;
                    };
                    var subInfo = {};
                    subInfo.SchoolID = eachArr("SchoolID");
                    subInfo.SchoolName = eachArr("SchoolName");

                    //当没有学校ID时，默认为第一个
                    if($.cookie("analy_SchoolID") == undefined){
                        $.cookie("analy_SchoolID",list.SchoolList[0].SchoolID,{"path":"/Analysis"})
                    }

                    //切换学科后记录当前学科
                    if(!$.cookie("analy_CurrSubject")){
                        $.cookie("analy_CurrSubject",subInfo.subjectID[0],{"path":"/Analysis"});
                    }
                    //生成学科选项
                    var schoolTpl = '<div class="category-name school-name"><b>区域学校：</b></div>'+
                        '<ul class="school-item"  id="qy-xiaoqu-school">';
                    for(var i=0;i<subInfo.SchoolID.length;i++){
                        schoolTpl += ' <li curr-school='+subInfo.SchoolID[i]+ '><a href="?analy_SchoolID='+subInfo.SchoolID[i]+'">'+
                            subInfo.SchoolName[i]+'</a></li>';
                    }
                    schoolTpl += '</ul>'+
                        '<div  class="school-more">'+
                        '<a href="" data-on="0">更多>></a>'+
                        '</div>';
                    $("#qy-xiaoqu-item").html(schoolTpl);
                    var $schoolList = $("#qy-xiaoqu-school");
                    // $schoolList.html(schoolTpl);
                    $schoolList.on("click","li",function(){
                        $.cookie("analy_CurrSchool",$(this).attr("curr-school"),{"path":"/Analysis"});
                    });
                    //重新加载后设置当前学校
                    var currSchool = $.cookie("analy_CurrSchool");
                    $("[curr-school="+currSchool+"]").addClass("on");

                    //判断当学校ID没有时 默认为第一个
                    var hascurrsubject = $.inArray(currSchool,subInfo.SchoolID);
                    if(hascurrsubject == -1){
                        var newSubject = subInfo.SchoolID[0];
                        $("[curr-school="+newSubject+"]").addClass("on");
                    }

                    // 显示更多隐藏
                    var $more = $(".school-more a");
                    if($schoolList.height() < 37){
                        $(".school-more").hide();
                    }else{
                        $schoolList.height(36);
                        $more.on("click",function (e) {
                            e.preventDefault();
                            var $this = $(this);
                            if($this.data("on") == 0){
                                $this.html("收起>>");
                                $schoolList.css({height:"auto"});
                                $this.data("on",1)
                            }else{
                                $this.html("更多>>");
                                $schoolList.css("height","36px");
                                $this.data("on",0)
                            }
                        })
                    }
                }

                //查看试卷
                // $xuekeList.parent().after('<a class="fr see-paper btn btn-second" href="javascript:;" id="j_see-paper">' +
                //     '<i class="iconfont">&#xe60b;</i>查看原卷</a>');
                // $("#j_see-paper").on("click",function(){
                //     $.get(url_getSourcePaper,{},function(data){
                //         var dataImg = $.parseJSON(data).data;
                //         window.open(dataImg.imageUrl);
                //     })
                // })

            })
        },

        // pdf帮助信息显示
        pdfHelperAlert:function(){
            $(".j_pdf-alert").on("click",function () {
                layer.open({
                    type:0,
                    area:["510px","326px"],
                    btn:false,
                    content:"<!-- PDF-帮助 -->\r\n<div class=\"lay-pdf-helper\">\r\n    <div class=\"pdf-icon\"></div>\r\n    <h4 class=\"f16 fw6 tc mt10\">PDF文件打不开怎么办？</h4>\r\n    <div class=\"f13 mt10\">\r\n        <p>如需要阅读pdf格式的文件时，发现电脑没有用来打开的应用程序，应下载专门的阅读器。\r\n            <span class=\"text-muted\">（如：福昕、Adobe Reader XI 11、极速、WPS）</span>\r\n        </p>\r\n        <p class=\"text-primary mt10\">\r\n            温馨提示：百度搜索关键字下载相应PDF阅读器\r\n        </p>\r\n    </div>\r\n</div>\r\n"
                })
            })
        },
        // 学生查看原卷
        seePaperEvent:function(){
            var $paperBtn = $(".see-paper");
            $paperBtn.removeClass("disabled");
            $paperBtn.on("click",function(){
                var paperhtml = "<!-- 查看原卷 -->\r\n<div class=\"layer-seePaper\" id=\"seePaperLayer\">\r\n    <p class=\"loading\"></p>\r\n    <!--<div class=\"paperscore\">100</div>-->\r\n    <!--<div class=\"item-pic\"><img src=\"http://192.168.211.204:9011/Uploads/yuejuan/201612/19/54/222/54201501002/3/e136945d8363960504b8565e76ba4f79.jpg\"></div>-->\r\n</div>\r\n";
                // 图片弹窗
                layer.open({
                    type: 1,
                    title: "查看试卷",
                    shade: 0.6,
                    closeBtn:1,
                    scrollbar:false,
                    maxmin: true,
                    area: ['800px','600px'],
                    content: paperhtml,
                    success:function(){
                        $(".layui-layer-min").hide();
                        m1.seePaperEvent()
                    }
                });
            })
        }
    };
    analyHeadJs.init();


});