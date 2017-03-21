/**
 * @author 邵敬超
 * @date 2016/11/16
 */
// 答题卡头部信息
Vue.component("main-top", {
    template: "#tpl-main-top",
    props: ["title"],
    methods: {
        showTitleAlert: function () {
            app.alert.state_alertTitle = true;
        }
    }
});
// 试题头信息
Vue.component('ques-title-info', {
    template: '<p style="padding:15px 20px 8px;"><span v-if="item.display==1">{{item.title}}</span></p>',
    props: ["item", "score"]
})

//考试信息栏 A4
Vue.component("exam-info-a4", {
    template: "#tpl-exam-info-a4",
    props: ["care", "type", "data"],
    data: function () {
        return {}
    },
    methods: {
        showAlertExamInfo: function () {
            app.alert.state_alertExamInfo = true;
        }
    }
});

//考试信息栏 A3
Vue.component("exam-info-a3", {
    template: "#tpl-exam-info-a3",
    props: ["care", "type", "data"],
    methods: {
        showAlertExamInfo: function () {
            app.alert.state_alertExamInfo = true;
        }
    }
});
/*版式*/
Vue.component("paper-style", {
    template: "#tpl-paper-style",
    props: [
        "dataState",
        "layout",
        "data",
        "care",
        "title",
        "type",
        "examPart",
        "modal",
        "score"
    ],
    data: function () {
        return {
            hlineHeight: 48,
            quesTemp: {
                choice: ["A", "B", "C", "D", "E", "F", "G"],
                trueFalse: ["√", "x"]
            },
            autoOrderChoice: false,
            saveOldOrderID: []
        }
    },
    methods: {
        /*切换选择题版式*/
        changeTypeItemStyle: function (i, j) {
            var style = app.data.paper[i].list[j].style;
            if (style == 0) {
                app.data.paper[i].list[j].style = 1;
            } else {
                app.data.paper[i].list[j].style = 0;
            }
            app.dataState += 1;
        },
        /*编辑分卷标题*/
        showAlertEditPartTitle: function () {
            app.alert.state_alertPartInfo = true;
        },
        /*添加选择题*/
        showAlertXuanzeti: function (i, j) {
            Bus.$emit("showAlertXuanzeti", {part: i, block: j});
            app.alert.state_alertXuanzeti = true
        },
        /*添加填空题*/
        showAlertTiankongti: function (i,j) {
            Bus.$emit("showAlertTiankongti",{part: i, block: j});
            app.alert.state_alertTiankongti = true
        },
        /*添加解答题*/
        showAlertJiedati: function (i,j) {
            console.log("sdsds")
            Bus.$emit("showAlertJiedati",{part: i, block: j});
            app.alert.state_alertJiedati = true
        },
        /*添加英语作文*/
        showAlertEditEnZuowen: function (pid, tid) {
            Bus.$emit("showAlertEditEnZuowen", pid, tid);
            app.alert.state_alertEnZuowen = true
        },
        /*添加语文作文*/
        showAlertEditCnZuowen: function (pid, tid) {
            Bus.$emit("showAlertEditCnZuowen", pid, tid);
            app.alert.state_alertCnZuowen = true
        },
        /*下移*/
        moveDownThisQues: function (pid,tid) {
            app.moveDown(pid,tid);
        },
        /*上移*/
        moveUpThisQues: function (pid,tid) {
            app.moveUp(pid,tid);
        },
        /*删除*/
        delThisQues: function (pid,tid,oid) {
            console.log(pid,tid,oid);
            app.delQuesType(pid,tid,oid);
        },
        delThisQuesImg: function (pid,tid,oid,iid) {
            console.log(pid,tid,oid,iid);
            var _this = this;
            layer.confirm("删除此图片？", {icon: 3, title: '提示'},
                function () {
                var orderItem = _this.data.paper[pid].list[tid].content[oid];
                    _this.data.paper[pid].list[tid].content[oid].img.splice(iid, 1);
                    if(_this.data.paper[pid].list[tid].content[oid].img.length===0){
                        delete _this.data.paper[pid].list[tid].content[oid].img;
                    }
                    layer.msg('删除成功！', {icon: 1, time: 1000});
                    // app.dataState++;
                    app.updateDom();
                })
        },
        /*单题操作-鼠标移入*/
        hoverThisQues:function(over){
            var $findBtnGroup = $(event.target).find(".ques-handle-group");
            if(over === 1){
                $findBtnGroup.show();
            }else{
                $findBtnGroup.hide();
            }
        },
        /*单题编辑 - 监听编辑试题弹框*/
        showAlertEditJiedati:function(pid,tid,oid){
            app.$forceUpdate();
            Bus.$emit("showAlertEditJiedati",{
                pid:pid,
                tid:tid,
                oid:oid
            });
            app.alert.state_alertEditJiedati = true;
        }
    }
});

// 选答题
Vue.component("xuandati-template", {
    template: "#tpl-xuandati-template",
    props: ["dataState", "partItem", "partItemIndex", "typeItemIndex", "score","typeItem"],
    data: function () {
        return {
            "hlineHeight": 48,
            newType2: '',
            orderString: ''

        }
    },
    created: function () {
        this.updateData();
    },
    watch:{
        "dataState":function(){
            this.updateData();
            console.log(111)
        }
    },
    methods: {
        updateData:function(){
            var _this = this;
            _this.newType2 = _this.computedType2(this.typeItem);
        },
        /*下移*/
        moveDownThisQues: function (pid,tid) {
            app.moveDown(pid,tid);
        },
        /*上移*/
        moveUpThisQues: function (pid,tid) {
            app.moveUp(pid,tid);
        },
        /*删除*/
        delThisQues: function (pid,tid) {
            app.delQuesType(pid,tid);
        },
        // 获取数据中最大值
        getMaxNumber: function (i, obj, attr) {
            if (i == 0) {
                return obj[0][attr];
            }
            if (i > 0) {
                return Math.max(obj[i - 1][attr], obj[i][attr])
            }
        },
        showAlertEditQuesTitle: function (pid, tid) {
            Bus.$emit("showAlertEditQuesTitle", pid, tid);
            app.alert.state_alertEditQuesTitle = true
        },
        computedType2: function (data) {
            // 重新定义选答题数据
            var _this = this;
            console.log(data);
            var newType = $.parseJSON(JSON.stringify(data));//解除vue原数据绑定
            var newContent = {
                order: [],
                img: [],
                desc: [],
                small: 0,
                kong: 0,
                uline: 0,
                hline: 0,
                score: ''
            };
            var content = newType.content;
            for (var j = 0; j < content.length; j++) {
                var contentItem = content[j];
                newContent.order.push(contentItem.order);
                newContent.img.push(contentItem.img);
                newContent.hline = _this.getMaxNumber(j, content, 'hline');
                newContent.uline = _this.getMaxNumber(j, content, 'uline');
                newContent.score = _this.getMaxNumber(j, content, 'score');
            }
            newType.content = newContent;
            return newType;
        }

    }
})