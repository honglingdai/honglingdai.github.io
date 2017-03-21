define(function (require) {
    require("jquery");
    //分析系统请求数据
    $.analyzeHandler = function (opts, callback) {
        // 全局加载动画
        Pace.restart();

        if(!opts || !opts.params){
            return;
        }

        var param = opts.params;
        var opt = {},roleName,typ = "post";

        //教师权限增加2个参数
        if( role === "1"){
            opts.subjectID = $.cookie("analy_SubjectID");
            opts.classID = $.cookie("analy_ClassID")
        }

        var hasRolePrefix = $.inArray(param[0].split("_")[0],["student","teacher","rector"]) !==-1;

        // 如果参数正确，且未添加前缀，则为角色分配参数前缀
        if(param && !hasRolePrefix){
            switch(role){
                case "0":
                    roleName = "student";
                    break;
                case "1":
                    roleName = "teacher";
                    break;
                case "2":
                    roleName = "headmaster";
                    break;
                case "4":
                    roleName = "rector";
                    break;
                case "5":
                    roleName = "region";
                    break;
                default:roleName = "rector";
            }
            // 考试列表页面默认使用学生接口
            var params0 = opts.params[0];
            if(params0 === 'getExamList' || params0 === 'getPowerList'){
                opts.params[0] =  "student_" + params0;
            }else{
                opts.params[0] = roleName + "_" + params0;
            }

        }
        //默认参数
        opt.params = ["shunt"];
        opt.userCode = $.cookie("yj_front_UserCode");
        //如果包含type属性
        if (opts.type) {
            typ = opts.type;
            delete opts.type;
        }
        //合并参数
        for (var i in opts) {
            //参数是数组
            if ($.isArray(opts[i]) && opt[i]) {
                opt[i] = opt[i].concat(opts[i]);
            } else {
                opt[i] = opts[i];
            }
        }
        $.ajax({
            url:"/Analysis/Index/getApi.html",
            type: typ,
            data: opt,
            success: function(data){
                // var state = data.status;
                // if(state==1){
                    //更新UserCode
                    // $.cookie("yj_front_UserCode",data.code["UserCode"],{"path":"/"});
                // }
                callback && callback(data);
            }
        });
    };
});