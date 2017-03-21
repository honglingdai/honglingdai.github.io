/**
 * @author 邵敬超
 * @date 2016/11/16
 */
//选择版式
Vue.component("type-style", {
    template: "#tpl-type-style",
    props: ["layout"],
    data: function () {
        return {
            typeA4: {
                src: "/Public/default/image/answer/formatA4.png"
            },
            typeA3: {
                src: "/Public/default/image/answer/formatA3.png"
            }
        }
    },
    methods: {
        chooseTypeA3: function () {
            this.typeA3.checked = true;
            this.typeA4.checked = false;
            app.data.layout.style = 'A3';
            app.dataState += 1;
        },
        chooseTypeA4: function () {
            this.typeA3.checked = false;
            this.typeA4.checked = true;
            app.data.layout.style = 'A4';
            app.dataState += 1;
        }
    }
});
/*考试类型*/
Vue.component("exam-type", {
    template: "#tpl-exam-type",
    props: ["type"],
    data: function () {
        return {}
    },
    methods: {
        toggleExamType: function (event) {
            app.data.type.display = $(event.currentTarget).data("examtype");
            app.dataState += 1;
        }
    }
});

/*添加试题*/
Vue.component("add-test", {
    template: "#tpl-add-test",
    props: ["modal"],
    data: function () {
        return {
            comeFrom: "bar"
        }
    },
    methods: {
        showAlertTiankongti: function (come) {
            Bus.$emit("showAlertTiankongti", come);
            app.alert.state_alertTiankongti = true
        },
        showAlertXuanzeti: function (come) {
            Bus.$emit("showAlertXuanzeti", come);
            app.alert.state_alertXuanzeti = true
        },
        showAlertJiedati: function (come) {
            Bus.$emit("showAlertJiedati", come);
            app.alert.state_alertJiedati = true
        },
        showAlertXuandati: function (come) {
            Bus.$emit("showAlertXuandati", come);
            app.alert.state_alertXuandati = true
        },
        showAlertEnZuowen: function (come) {
            Bus.$emit("showAlertEnZuowen", come);
            app.alert.state_alertEnZuowen = true
        },
        showAlertCnZuowen: function (come) {
            Bus.$emit("showAlertCnZuowen", come);
            app.alert.state_alertCnZuowen = true
        }
    }
});
/*是否显示分数*/
Vue.component("score-view", {
    template: "#tpl-score-view",
    props: ["score"],
    watch: {
        "score.display": function (val) {
            app.dataState += 1;
            console.log(val);
        }
    }
});
/*是否显示禁答区*/
Vue.component("forbid-view", {
    template: "#tpl-forbid-view",
    data: function () {
        return {
            display: 1
        }
    },
    watch: {
        "display": function (val) {
            if (app.noWritable.display = (val - 0)) {
                layer.msg("已启用！", {time: 1000})
            } else {
                layer.msg("已禁用！", {time: 1000})
            }
            app.dataState += 1;
        }
    }
});
/*已添加试题*/
Vue.component("test-list", {
    template: "#tpl-test-list",
    props: ["modal","examPart"],
    methods: {
        /*删除试题*/
        barDelThisQuesType: function (pid, tid) {
            app.delQuesType(pid, tid);
        },
        /*删除所有试题*/
        delAllQues: function (pid) {
            app.delAllQues(pid);
        },
        /*编辑标题*/
        showAlertEditQuesTitle: function (pid, tid) {
            Bus.$emit("showAlertEditQuesTitle", pid, tid)
            app.alert.state_alertEditQuesTitle = true
        }
    }
});
/*底部操作按钮*/
Vue.component("side-btm-handle", {
    template: "#tpl-side-btm-handle",
    methods:{
            // 保存答题卡
            saveAnswerJson:function(){
                var params = {
                    Json:JSON.stringify(app.data),
                    SaveID:editData.getAttr(1) || 0
                };
                $.post(U("Home/Index/saveAnswerJson"),params,function(data){
                    if(data.info==='success'){
                        layer.msg("保存成功！",{icon:6,shade:0.3})
                    }else{
                        layer.msg("保存失败！"+JSON.stringify(data.data),{icon:5,shade:0.3})
                    }
                })
            },
            // 下载答题卡
            answerDown: function() {
                // 字符串答题卡数据
                var answerData = $.parseJSON(JSON.stringify(app.data));
                // 下载答题卡接口
                function answerDownFunc(data){
                    var params = {
                        sheetxml: JSON.stringify(data)
                    };
                    // 创建div接收程序返回js代码
                    function createDiv(data){
                        $("body").append("<div id='dtktishi'></div>" + data);
                    }

                    $.post(U("Home/Index/arswerMyDown"), params, function(data) {
                        //错误提示
                        if (typeof data.data === 'string') {
                            createDiv(data.data);
                            layer.alert($("#dtktishi").find("b").removeAttr("style").html(), {
                                icon: 5
                            })
                        }
                        //获取成功
                        if(typeof data.data === 'object'){
                            createDiv(data.data);
                            layer.alert($("#dtktishi").html(), {
                                icon: 6
                            });
                            setTimeout(function(){
                                window.open($("#dtktishi").find("a").attr("href"));
                            },1000)
                        }
                    });
                };
                // AB卷切换
                function toggleABPaper(type, data) {
                    var ansPaper = data.paper;
                    $.each(ansPaper, function(i) {
                        var ansList = ansPaper[i].list;
                        $.each(ansList, function(j) {
                            if (ansList[j].type == 0) {//是客观题
                                if (type == "B") {
                                    if (ansList[j].style == 1) {
                                        ansList[j].style = 0;
                                    } else {
                                        ansList[j].style = 1;
                                    }
                                }
                            }
                        });
                    });
                    answerDownFunc(data);
                }
                // 获取答题卡版式，如果是AB卷弹出AB卷选择框，否则下载统一版式
                if(editData.getAttr(2) == '2'){
                    layer.open({
                        type: 0,
                        icon:0,
                        content: "请选择AB卷！",
                        area:["240px","160px"],
                        btn: ["A卷", "B卷"],
                        btn1: function() {
                            toggleABPaper("A",answerData);
                        },
                        btn2: function() {
                            toggleABPaper("B",answerData);
                        }
                    });
                }else{
                    answerDownFunc(answerData);
                }
            }
    }
});