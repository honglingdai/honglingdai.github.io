define(function (require) {
    var logic = require("./logic");

    // 加载更多按钮
    var $loadmore = $("#task-loadmore");
    //列表首次加载标记
    var isLoaded = false;
    var taskJs = {
        init: function () {
            var e = this;
            e.loadTaskListEvent();//加载数据
            e.changeSubjectEvent();//切换学科
        },
        //生成学科图标
        outputSubjectIcon: function (id) {
            return '<i class="iconfont">' + $.getSubjectInfo(id,0) + '</i><br>' + $.getSubjectInfo(id,1);;
        },

        // 考试任务模版
        renderTpl: function (data) {
            console.log(data)
            var data = data.FirstSubList;
            var temp = '';
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                temp += ' <div class="col-md-4">\
                            <div class="task-item">';
                temp += '<div class="tag">';

                var ExamState = dataItem.ExamState;//考试状态
                if(ExamState == 0 || ExamState == 2){
                    temp += '<span class="bg-danger">进行中</span>';

                }else if(ExamState == 1){
                    temp += '<span class="bg-gray">未开始</span>';
                }else{
                    temp += '<span class="bg-gray">已结束</span>';
                }

                temp += '</div>';
                temp += '<h4 class="bbc pb10 pt10 elli text-primary" title="' + dataItem.ExamName + '">' + dataItem.ExamName + '</h4>\
                            <div class="form subject-opt">\
                            <select>';

                // 学科列表
                var SubjectList = dataItem.SubjectList,
                    examID = dataItem.ExamID;
                for (var j = 0; j < SubjectList.length; j++) {
                    temp += '<option data-ifswitch="'+SubjectList[j].IfSwitch+'" data-examid="'+examID+'" value="' + SubjectList[j].SubjectID + '">' + SubjectList[j].SubjectName + '</option>';
                }
                temp += '</select>';
                temp += '<table class="task-itm-table pct100">\
                    <tbody>\
                    <tr>\
                    <td><div class="tb-itm-inner">考试时间<br/><span class="exam-time">' + (dataItem.ExamTime).toString().substr(0, 10) + '</span><br/><br/><i class="iconfont">&#xe64f;</i></div></td>\
                    <td><div class="tb-itm-inner tr">年级<br/>' + dataItem.GradeName + '<br/><br/><i class="iconfont">&#xe61b;</i></div></td>\
                    </tr>\
                    <tr>\
                    <td colspan="2"><div class="subject-icon-wrap">\
                    <div class="subject-icon ' + ((ExamState == 1) ? "text-doing" : "") + '">' + taskJs.outputSubjectIcon(dataItem.SubjectList[0].SubjectID) + '</div>\
                    </div></td>\
                    </tr>\
                    <tr>\
                    <td><div class="tb-itm-inner"><i class="iconfont">&#xe614;</i><br/><br/>考生人数<br/><span class="student-num">' + dataItem.StudentNum + '</span>人</div></td>\
                    <td><div class="tb-itm-inner tr ' + ((ExamState == 1) ? "text-second" : "") + '">' +
                    '<i class="iconfont">&#xe620;</i><br/><br/>已阅试卷<br/> <span class="finished-info">' +
                    dataItem.ReviewNum + '</span>份</div></td>\
                    </tr>\
                    </tbody>\
                    </table>';

                temp += '<div class="task-handle">';

                // 创建按钮
                temp += taskJs.outputTaskItemHandle(dataItem.IfSwitch,{
                            review_ExamID:dataItem.ExamID,
                            review_SubjectID:dataItem.SubjectID
                });

                temp += '</div></div></div></div>';
            }

            return temp;
        },

        /**
         * @param {int} ifSwitch 考试状态
         * @param {object} urlParam url参数
         */
        outputTaskItemHandle: function (ifSwitch, urlParam) {
            var url = $.param(urlParam);
            var markUrl = '/Review/Index/mark.html?' + url;
            var progressUrl = '/Review/progress/progress.html?' + url;
            var examDetailUrl = '/Review/Index/examDetail.html?' + url;

            var temp = '';

            // 按钮状态绑定学科
            if (ifSwitch == 0 || ifSwitch == 2) {
                temp += '<a class="btn btn-primary" href="' + markUrl + '">我要阅卷</a>\
                         <a class="btn btn-primary" href="' + progressUrl + '">进度查询</a>';
            }
            else {
                temp += '<a class="btn btn-primary btn-disabled" href="javascript:">我要阅卷</a>\
                         <a class="btn btn-primary btn-disabled" href="javascript:">进度查询</a>';
            }
            temp += ' <a class="btn btn-primary" href="' + examDetailUrl + '">考试详情</a>';
            return temp;
        },

        /*!*
        获取考试列表
        * @opt
        * opt.param 请求参数
        * opt.before 请求前函数
        * opt.success 请成功回调
        * */
        getReviewList: function (opt) {

            opt.before && opt.before();

            $.handler(opt.param, function (data) {

                opt.success && opt.success(data);
                taskJs.loadMoreState(data,opt.param);

                var $taskListContent = $("#taskListContent");
                if (data.status === 1) {
                    if (!isLoaded) {
                        $taskListContent.empty();
                        isLoaded = true;
                    }
                    //默认执行
                    $taskListContent.append(taskJs.renderTpl(data.data));

                    $(".full-loading").fadeOut(100);
                }
                else {
                    $(".full-loading").addClass("data-empty-1");
                }
            });
        },
        loadTaskListEvent: function () {
            //请求参数
            var param = {
                params: ["reviewList"],
                userID: $.cookie("yj_front_UserID"),
                page: 1
            };
            taskJs.getReviewList({param:param});
            //加载更多
            $loadmore.on("click", function () {
                var $this = $(this);
                var loadmore = '<span class="text-muted">加载中...</span>';
                console.log($this.data("currpage"))
                param.page = parseInt($this.data("currpage")) + 1;
                taskJs.getReviewList({
                    param:param,
                    before:function () {
                        $this.html(loadmore);
                    },
                    success:function (data) {
                        taskJs.loadMoreState(data,param);
                    }
                });
            })
        },

        // 加载更多按钮状态设置
        loadMoreState:function(data,param){
            var PageNum;
            if(data.status === 1 ){
                PageNum = data.data.PageNum;
                if (PageNum) {
                    //当前页码小于页码总数
                    $(".task-loadmore").show();
                    $loadmore.data({currpage: param.page, pagenum: data.data.PageNum});
                    console.log(data.status);

                }
            }
            if (PageNum === param.page || data.status !== 1) {
                $loadmore.html('<span class="text-muted">加载完毕</span>');
                $loadmore.unbind("click");
                $loadmore.addClass("cur-def");
            }
        },

        //切换学科
        changeSubjectEvent: function () {

            $(document).on("change", ".subject-opt select", function () {
                var param = {
                    params: ["reviewListChangeSubject"],
                    userID: $.cookie("yj_front_UserID")
                };
                var $this = $(this);
                var $checkedOpt = $this.find("option:checked");

                // 添加参数
                param.examID = $checkedOpt.data("examid");
                param.subjectID = $this.val();

                $.handler(param, function (data) {

                    var status = data.status,
                        info = data.data;
                    if (status === 1) {

                        // 修改学科cookie
                        $.cookie("review_SubjectID",$this.val(),{"path":"/Review"});
                        $.cookie("review_SubjectName",$checkedOpt.text(),{"path":"/Review"});
                        $.removeCookie("review_ListID",{"path":"/Review"});

                        // 添加切换效果
                        var $item = $this.parents(".task-item");
                        $item.hide().fadeIn(50);

                        // 更新按钮
                        var $examBtn = $item.find(".task-handle");
                        var newTaskHandle = taskJs.outputTaskItemHandle($this.find("option:checked").data("ifswitch"),{
                            review_ExamID:param.examID,
                            review_SubjectID:param.subjectID
                        });
                        $examBtn.html(newTaskHandle);

                        // 修改学科图标
                        $item.find(".subject-icon").html(taskJs.outputSubjectIcon(param.subjectID));
                        $item.find(".exam-time").html((info.ExamTime).toString().substr(0, 10));
                        $item.find(".student-num").html(info.StudentNum);
                        $item.find(".finished-info").html(info.ReviewNum);
                    }
                    else {
                        layer.msg(info.toString());
                    }
                });
            });
        }
    };
    taskJs.init();
})