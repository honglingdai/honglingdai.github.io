define(function (require, exports) {
    var analy = require("analy");
    var roleID = $.getRoleID();

    // 考试排名
    var template = {

        // 本校（前50）
        benxiao: function (data) {
            var Orderlist = data.SchoolOrderList;
            if(roleID === "2"){
                Orderlist = data.UserList;
            }
            var tpl = "";
            tpl += '<thead>'+
                '<tr>'+
                '<th rowspan="2"><b>学号</b></th>'+
                '<th width="95" rowspan="2"><b>班级</b></th>'+
                '<th width="95" rowspan="2"><b>姓名</b></th>'+
                '<th width="95" rowspan="2"><b>类型</b></th>'+
                '<th width="315" colspan="3"><b>' +data.SubjectName+ '</b></th>'+
                '<th width="315" colspan="3"><b>总分</b></th>'+
                '</tr>'+
                '<tr>'+
                '<th width="105"><b>成绩</b></th>'+
                '<th width="105"><b>总排名</b></th>'+
                '<th width="105"><b>校排名</b></th>'+
                '<th width="105"><b>成绩</b></th>'+
                '<th width="105"><b>总排名</b></th>'+
                '<th width="105"><b>校排名</b></th>'+
                '</tr>'+
                '</thead>'+
                '<tbody>';
            for(var i = 0; i <Orderlist.length;i++){
                tpl += '<tr>'+
                    '<td><b>'+ Orderlist[i].StudentCode +'</b></td>'+
                    '<td>'+ Orderlist[i].ClassName +'</td>'+
                    '<td>'+ Orderlist[i].UserName +'</td>'+
                    '<td>'+ Orderlist[i].IfNow +'</td>'+
                    '<td>'+ Orderlist[i].Subject.Score +'</td>'+
                    '<td>'+ Orderlist[i].Subject.TotalOrder +'</td>'+
                    '<td>'+ Orderlist[i].Subject.SchoolOrder +'</td>'+
                    '<td>'+ Orderlist[i].TotalScore.Score +'</td>'+
                    '<td>'+ Orderlist[i].TotalScore.TotalOrder +'</td>'+
                    '<td>'+ Orderlist[i].TotalScore.SchoolOrder +'</td>'+
                    '</tr>'
            }
            tpl += '</tbody>';
            return tpl;
        },

        /*联考（前100名-校长*/
        rector_liankao100: function (data) {
            var tpl = '';
            tpl += '<thead>' +
                '<tr>' +
                '<th width="160" rowspan="2"><b>学校</b></th>' +
                '<th width="60" rowspan="2"><b>姓名</b></th>';
            for (var i = 0; i < data.Subject.length; i++) {
                tpl += '<th colspan="2"><b>' + data.Subject[i].SubjectName + '</b></th>'
            }
            tpl += '</tr><tr>';
            for (var j = 0; j < data.Subject.length; j++) {
                tpl += '<th><b>成绩</b></th>' +
                    '<th><b>排名</b></th>'
            }

            tpl += '</tr>' +
                '</thead>' +
                '<tbody>';
            for (var k = 0; k < data.UserList.length; k++) {
                var SubjectList = data.UserList[k].SubjectList;
                tpl += '<tr>' +
                    '<td data-school="'+data.UserList[k].SchoolID+'">' + data.UserList[k].SchoolName + '</td>' +
                    '<td data-school="'+data.UserList[k].SchoolID+'">' + data.UserList[k].UserName + '</td>';
                for (var m = 0; m < SubjectList.length; m++) {
                    tpl += '<td data-school="'+data.UserList[k].SchoolID+'">' + SubjectList[m].Score + '</td>' +
                        '<td data-school="'+data.UserList[k].SchoolID+'">' + SubjectList[m].TotalOrder + '</td>'
                }
                tpl += '</tr>';
            }
            tpl += '</tbody>';

            return tpl;
        },

        /*本校（前50名-校长*/
        rector_benxiao50: function (data) {
            var tpl = '';
            tpl += '<thead>' +
                '<tr>' +
                '<th width="90" rowspan="2"><b>学号</b></th>' +
                '<th width="45" rowspan="2"><b>姓名</b></th>'+
                '<th width="30" rowspan="2"><b>学生类型</b></th>';
            for (var i = 0; i < data.Subject.length; i++) {
                tpl += '<th colspan="3"><b>' + data.Subject[i].SubjectName + '</b></th>'
            }
            tpl += '</tr><tr>';
            for (var k = 0; k < data.Subject.length; k++) {
                tpl += '<th><b>成绩</b></th>' +
                    '<th><b>总名</b></th>'+
                    '<th><b>校名</b></th>'
            }

            tpl += '</tr>' +
                '</thead>' +
                '<tbody>';
            for (var m = 0; m < data.UserList.length; m++) {
                var SubjectList = data.UserList[m].SubjectList;
                tpl += '<tr>' +
                    '<td>' + data.UserList[m].StudentCode + '</td>' +
                    '<td>' + data.UserList[m].UserName + '</td>' +
                    '<td>' + data.UserList[m].IfNow + '</td>';
                for (var j = 0; j < SubjectList.length; j++) {
                    tpl += '<td>' + SubjectList[j].Score + '</td>' +
                        '<td>' + SubjectList[j].TotalOrder + '</td>' +
                        '<td>' + SubjectList[j].SchoolOrder + '</td>'
                }
                tpl += '</tr>';
            }
            tpl += '</tbody>';

            return tpl;
        },

        // 联考前50
        liankao50: function (data) {
            var tpl = '';
            tpl += '<thead>' +
                '<tr>' +
                '<th width="180" rowspan="2"><b>学校</b></th>' +
                '<th rowspan="2" width="100"><b>姓名</b></th>' +
                '<th colspan="3"><b>' + data.SubjectName + '</b></th>' +
                '<th colspan="3"><b>总分</b></th>' +
                '</tr>' +
                '<tr>' +
                '<th><b>成绩</b></th>' +
                '<th><b>总排名</b></th>' +
                '<th><b>校排名</b></th>' +
                '<th><b>成绩</b></th>' +
                '<th><b>总排名</b></th>' +
                '<th><b>校排名</b></th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';
            for (var i = 0; i < data.ExamOrderList.length; i++) {
                tpl += '<tr>' +
                    '<td data-school="'+data.ExamOrderList[i].SchoolID+'"><b>' + data.ExamOrderList[i].SchoolName + '</b></td>' +
                    '<td data-school="'+data.ExamOrderList[i].SchoolID+'">' + data.ExamOrderList[i].UserName + '</td>' +
                    '<td data-school="'+data.ExamOrderList[i].SchoolID+'">' + data.ExamOrderList[i].Subject.Score + '</td>' +
                    '<td data-school="'+data.ExamOrderList[i].SchoolID+'">' + data.ExamOrderList[i].Subject.TotalOrder + '</td>' +
                    '<td data-school="'+data.ExamOrderList[i].SchoolID+'">' + data.ExamOrderList[i].Subject.SchoolOrder + '</td>' +
                    '<td data-school="'+data.ExamOrderList[i].SchoolID+'">' + data.ExamOrderList[i].TotalScore.Score + '</td>' +
                    '<td data-school="'+data.ExamOrderList[i].SchoolID+'">' + data.ExamOrderList[i].TotalScore.TotalOrder + '</td>' +
                    '<td data-school="'+data.ExamOrderList[i].SchoolID+'">' + data.ExamOrderList[i].TotalScore.SchoolOrder + '</td>' +
                    '</tr>'
            }
            tpl += '</tbody>';
            return tpl;
        },

        // 本区前50
        benqu50: function (data) {
            var tpl = '';
            tpl += '<thead>' +
                '<tr>' +
                '<th rowspan="2" width="90"><b>学校</b></th>' +
                '<th rowspan="2" width="45"><b>姓名</b></th>' +
                '<th rowspan="2" width="30"><b>学生类型</b></th>';
            for (var i = 0; i < data.Subject.length; i++) {
                tpl += '<th colspan="3"><b>' + data.Subject[i].SubjectName + '</b></th>'
            }
            tpl += '</tr><tr>';
            for (var k = 0; k < data.Subject.length; k++) {
                tpl += '<th><b>成绩</b></th>' +
                    '<th><b>总名</b></th>' +
                    '<th><b>校名</b></th>'
            }

            tpl += '</tr>' +
                '</thead>' +
                '<tbody>';
            for (var m = 0; m < data.UserList.length; m++) {
                tpl += '<tr>' +
                    '<td><b>' + data.UserList[m].SchoolName + '</b></td>' +
                    '<td>' + data.UserList[m].UserName + '</td>' +
                    '<td>' + data.UserList[m].IfNow + '</td>';

                var SubjectList = data.UserList[m].SubjectList;
                for (var j = 0; j < SubjectList.length; j++) {
                    tpl += '<td>' + SubjectList[j].Score + '</td>' +
                        '<td>' + SubjectList[j].TotalOrder + '</td>' +
                        '<td>' + SubjectList[j].SchoolOrder + '</td>'
                }
                tpl += '</tr>';
            }
            tpl += '</tbody>';
            return tpl;
        },

        /*本区学生成绩（前50名-区域*/
        region_benqu50: function (data) {
            var tpl = '';
            tpl += '<thead>' +
                '<tr>' +
                '<th width="90" rowspan="2"><b>学校</b></th>' +
                '<th width="45" rowspan="2"><b>姓名</b></th>'+
                '<th width="30" rowspan="2"><b>学生类型</b></th>';
            for (var i = 0; i < data.Subject.length; i++) {
                tpl += '<th colspan="3"><b>' + data.Subject[i].SubjectName + '</b></th>'
            }
            tpl += '</tr><tr>';
            for (var k = 0; k < data.Subject.length; k++) {
                tpl += '<th><b>成绩</b></th>' +
                    '<th><b>总名</b></th>'+
                    '<th><b>校名</b></th>'
            }

            tpl += '</tr>' +
                '</thead>' +
                '<tbody>';
            for (var m = 0; m < data.UserList.length; m++) {
                var SubjectList = data.UserList[m].SubjectList;
                tpl += '<tr>' +
                    '<td>' + data.UserList[m].SchoolName + '</td>' +
                    '<td>' + data.UserList[m].UserName + '</td>' +
                    '<td>' + data.UserList[m].IfNow + '</td>';
                for (var j = 0; j < SubjectList.length; j++) {
                    tpl += '<td>' + SubjectList[j].Score + '</td>' +
                        '<td>' + SubjectList[j].TotalOrder + '</td>' +
                        '<td>' + SubjectList[j].SchoolOrder + '</td>'
                }
                tpl += '</tr>';
            }
            tpl += '</tbody>';

            return tpl;
        }

    };

    var rankingController = {
        /*!*
         *opt.el {string} css选择器
         opt.params {array} 请求参数
         opt.chartId {string} css选择器
         opt.chartTitle {string} 图表标题
         */
        benxiao:function(opt){

            var $table = $(opt.el);
            var param = {
                params: opt.params,
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                classID: $.cookie("analy_ClassID")
            };
            $.analyzeHandler(param, function (data) {
                if (data.status === 1) {

                    // 表格
                    $table.html(template.rector_benxiao50(data.data));
                    analy.isShowMore($table);
                    analy.theadfixed($table);
                    analy.outputHtmlToExcel($table);
                }
                else {
                    $table.html("");
                }

                // 图表
                analy.chartPie_v2({
                    el: opt.chartId,
                    data: data,
                    callback: function (d) {
                        var list = [];
                        for (var i = 0; i < d.ClassNum.length; i++) {
                            list[i] = {};
                            list[i].value = d.ClassNum[i].UserNum;
                            list[i].name = d.ClassNum[i].ClassName;
                        }
                        return {
                            title: opt.chartTitle,
                            series: list
                        }
                    }
                });
            })

        }
    };

    // 本校学生成绩（前100名）
    exports.benxiaoQian100 = function () {
        rankingController.benxiao({
            el:"#j_benxiaoQian100",
            params:["getSchoolOrder"],
            chartId:"#chart_benxiaoQian100",
            chartTitle:"本校前100名班级分布图"
        });
    };

    // 联考成绩排名（前100名-校长
    exports.liankaoQian100 = function () {
        var $table = $("#j_liankaoQian100");
        var param = {
                params: ["getExamLimit"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                schoolID: $.cookie("analy_SchoolID")
        };
        if(role == 5){
            //区域ID参数
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param, function (data) {
            if (data.status === 1) {
                // 表格
                $table.html(template.rector_liankao100(data.data));
                exports.OwnSchoolRed(data.data);
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }
            else {
                $table.html("");
            }
            // 图表
            analy.chartPie_v2({
                el: "#chart_liankaoQian100",
                data: data,
                callback: function (d) {
                    var list100 = [];
                    for (var i = 0; i < d.School.length; i++) {
                        list100[i] = {};
                        list100[i].value = d.School[i].UserNum;
                        list100[i].name = d.School[i].SchoolName;
                    }
                    return {
                        title: "联考前100名学校分布图",
                        series: list100
                    }
                }
            });
        })
    };

    // 联考成绩排名（前100名-区域--校级主管报告
    exports.liankaoQian100Region = function () {
        var $table = $("#j_liankaoQian100");
        var param = {
                params: ["examLimit100"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID"),
                areaID: $.cookie("analy_AreaID")
        };
        $.analyzeHandler(param, function (data) {
            if (data.status === 1) {
                // 表格
                $table.html(template.rector_liankao100(data.data));
                exports.OwnSchoolRed(data.data);
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }
            else {
                $table.html("");
            }
            // 图表
            analy.chartPie_v2({
                el: "#chart_liankaoQian100",
                data: data,
                callback: function (d) {
                    var list100 = [];
                    for (var i = 0; i < d.School.length; i++) {
                        list100[i] = {};
                        list100[i].value = d.School[i].UserNum;
                        list100[i].name = d.School[i].SchoolName;
                    }
                    return {
                        title: "联考前100名学校分布图",
                        series: list100
                    }
                }
            });
        })
    };

    // 联考成绩排名（前50名）
    exports.liankaoQian50 = function () {
        var param = {
            params: ['teacherexamScoreOrder'],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID: $.cookie("analy_ClassID"),
            subjectID: $.cookie("analy_SubjectID")
        };
        // 校长权限参数
        if (roleID === "4") {
            param.params = ['getExamOrder50'];
            param.schoolID = $.cookie("analy_SchoolID");
            delete param.classID
        }
        $.analyzeHandler(param, function (data) {
            var $table = $("#j_liankaoQian50");
            if (data.status === 1) {

                // 表格
                $table.html(template.liankao50(data.data));
                // 表格本校加红
                exports.OwnSchoolRed(data.data);
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }
            else {
                $table.subDataEmpty(0);
            }

            // 图表
            analy.chartPie_v2({
                el: "#chart_liankaoQian50",
                data: data,
                callback: function (d) {
                    var list50 = [],
                        classlist = [];
                    for (var i = 0; i < d.ExamOrder50.length; i++) {
                        list50[i] = {};
                        list50[i].value = d.ExamOrder50[i].UserCount;
                        list50[i].name = d.ExamOrder50[i].SchoolName;
                        classlist.push(d.ExamOrder50[i].SchoolName);
                    }
                    return {
                        title: "联考前50名学校分布图",
                        legend:classlist,
                        series: list50
                    }
                }
            });

            analy.chartPie_v2({
                el: "#chart_liankaoQian100",
                data: data,
                callback: function (d) {
                    var list100 = [],
                        schoollist = [];
                    for (var i = 0; i < d.ExamOrder100.length; i++) {
                        list100[i] = {};
                        list100[i].value = d.ExamOrder100[i].UserCount;
                        list100[i].name = d.ExamOrder100[i].SchoolName;
                        schoollist.push(d.ExamOrder100[i].SchoolName);
                    }
                    return {
                        title: "联考前100名学校分布图",
                        legend:schoollist,
                        series: list100
                    }
                }
            });
        })
    };

    //本区学生成绩（前50名）
    exports.benquQian50 = function(){
        var param = {
            params:["getAreaOrder"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID:$.cookie("analy_ClassID")
        };
        $.analyzeHandler(param,function(data){
            var $table = $("#j_benquQian50");

            if(data.status===1){

                // 表格
                $table.html(template.benqu50(data.data));
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }
            else{
                $table.html("");
            }

            // 图表
            analy.chartPie_v2({
                el:"#chart_benquQian50",
                data:data,
                callback:function(d){
                    var list50 = [];
                    for(var i= 0; i < d.SchoolNum.length;i++){
                        list50[i] = {};
                        list50[i].value = d.SchoolNum[i].UserNum;
                        list50[i].name = d.SchoolNum[i].SchoolName;
                    }
                    return {
                        title:"本区前50名学校分布图",
                        series:list50
                    }
                }
            });
        })
    };

    /*本校学生成绩（前50名）*/
    exports.benxiaoQian50 = function () {
        var param = {
            params: ['SchoolScoreOrder'],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            classID: $.cookie("analy_ClassID"),
            subjectID: $.cookie("analy_SubjectID")
        };
        // 校长权限参数
        if (roleID === "4") {
            param.params = ['getSchoolOrder50'];
            param.schoolID = $.cookie("analy_SchoolID");
            delete param.classID
        }
        $.analyzeHandler(param, function (data) {
            var $table = $("#j_benxiaoQian50");
            if (data.status === 1) {

                // 表格
                $table.html(template.benxiao(data.data));
                // 表格显示行数
                analy.isShowMore($table);
                // 表格头部固定
                analy.theadfixed($table);
                // 导出excel
                analy.outputHtmlToExcel($table);
            }
            else {
                $table.subDataEmpty(0);
            }

            // 图表
            analy.chartPie_v2({
                el: "#chart_benxiaoQian50",
                data: data,
                callback: function (d) {
                    var list50 = [],
                        Classlist = [];
                    for (var i = 0; i < d.SchoolOrder50.length; i++) {
                        list50[i] = {};
                        list50[i].value = d.SchoolOrder50[i].UserCount;
                        list50[i].name = d.SchoolOrder50[i].ClassName;
                        Classlist.push(d.SchoolOrder50[i].ClassName);
                    }
                    return {
                        title: "本校前50名班级分布图",
                        legend:Classlist,
                        series: list50
                    }
                }
            });

            analy.chartPie_v2({
                el: "#chart_benxiaoQian100",
                data: data,
                callback: function (d) {
                    var list100 = [],
                        Classlist = [];
                    for (var i = 0; i < d.SchoolOrder100.length; i++) {
                        list100[i] = {};
                        list100[i].value = d.SchoolOrder100[i].UserCount;
                        list100[i].name = d.SchoolOrder100[i].ClassName;
                        Classlist.push(d.SchoolOrder100[i].ClassName);
                    }
                    return {
                        title: "本校前100名班级分布图",
                        legend:Classlist,
                        series: list100
                    }
                }
            });
        })
    };

    // 本校学生成绩（前50名-校长
    exports.benxiao100Rector = function () {
        var $table = $("#j_benxiaoQian100");
        var param = {
            params: ["getSchoolLimit"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            schoolID: $.cookie("analy_SchoolID")
        };
        if(role == 5){
            //区域ID参数
            param.areaID = $.cookie("analy_AreaID")
        }
        $.analyzeHandler(param, function (data) {
            if (data.status === 1) {
                // 表格
                $table.html(template.rector_benxiao50(data.data));
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }
            else {
                $table.subDataEmpty(0);
            }
            // 图表
            analy.chartPie_v2({
                el: "#chart_benxiaoQian100",
                data: data,
                callback: function (d) {
                    var list100 = [],
                        Classlist = [];
                    for (var i = 0; i < d.ClassNum.length; i++) {
                        list100[i] = {};
                        list100[i].value = d.ClassNum[i].UserNum;
                        list100[i].name = d.ClassNum[i].ClassName;
                        Classlist.push(d.ClassNum[i].ClassName);
                    }
                    return {
                        title: "本校前50名班级分布图",
                        legend:Classlist,
                        series: list100
                    }
                }
            });
        })
    };

    // 本区学生成绩（前50名-区域
    exports.benqu50Region = function () {
        var $table = $("#j_benxiaoQian100");
        var param = {
            params: ["areaLimit50"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID: $.cookie("analy_AreaID")
        };
        $.analyzeHandler(param, function (data) {
            if (data.status === 1) {
                // 表格
                $table.html(template.region_benqu50(data.data));
                analy.isShowMore($table);
                analy.theadfixed($table);
                analy.outputHtmlToExcel($table);
            }
            else {
                $table.subDataEmpty(0);
            }
            // 图表
            analy.chartPie_v2({
                el: "#chart_benxiaoQian100",
                data: data,
                callback: function (d) {
                    var list100 = [],
                        schoollist = [];
                    for (var i = 0; i < d.School.length; i++) {
                        list100[i] = {};
                        list100[i].value = d.School[i].UserNum;
                        list100[i].name = d.School[i].SchoolName;
                        schoollist.push(d.School[i].ClassName);
                    }
                    return {
                        title: "本区前50名学校分布图",
                        legend:schoollist,
                        series: list100
                    }
                }
            });
        })
    };

    // 表格本校加红
    exports.OwnSchoolRed = function(data){
        var SchoolID = data.SchoolID;
        if(SchoolID){
            $('[data-school]').each(function(){
                var $this = $(this);
                if ($this.data('school') === (SchoolID - 0)) {
                    $this.css({
                        "color": "#ff4b4b",
                        "font-weight": 700
                    })
                }
            })
        }
    };
});