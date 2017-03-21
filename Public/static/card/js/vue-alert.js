/**
 * @author 邵敬超
 * @date 2016/11/16
 */

/*========
 添加试题时自定义题号
 1. 激活题号设置功能
 2. 用户手动输入题号
 3. 输入同时检查题号合法性
 4. 合法即设置题号 否则不设置
 ========*/
Vue.component('set-ques-order', {
    template: '#tpl-set-ques-order',
    data: function () {
        return {
            suggestOrderID: '',//题号设置建议
            setterOrder: '',//题号设置建议
            layerTips: '',//题号设置建议tips
            toggleSetOrderID: false//手动设置是否激活
        }
    },
    props: ["selectedAddedTestNum"],
    computed: {
        computedOrderID: function () {
            return app.examOrderIDArray.max + 1;
        }
    },
    watch: {
        //传递题号设置激活状态
        "toggleSetOrderID": function () {
            Bus.$emit("toggleSetOrderID", this.toggleSetOrderID);
        }
    },
    methods: {
        // 题号设置建议
        showSuggestOrderID: function (e) {
            var thisTarget = e.target,
                examOrderID = app.examOrderIDArray,
                min = examOrderID.min,
                max = examOrderID.max,
                sugMsg = '';
            if (max == 0) {
                sugMsg += "还没有添加试题哦！"
            }
            if (0 < max) {
                if (!examOrderID.outOrder.length) {
                    sugMsg += '当前题号为：' + min + '-' + max + '！'
                } else {
                    sugMsg += "当前题号" + min + '-' + max + '中，';
                    sugMsg += '未使用的题号有：\n [ ' + (examOrderID.outOrder.join(", ")) + ' ].';
                }
            }
            this.layerTips = layer.tips(sugMsg, thisTarget, {
                tips: [1, '#3595CC'],
                time: 0
            });
        },
        // 隐藏提示信息
        hideSuggestOrderID: function () {
            layer.close(this.layerTips)
        },
        // 检查输入值合法性
        checkSetterOrderID: function (e) {
            var _this = this;
            var $currTarget = $(e.target);
            var setterOrder = $.trim($currTarget.val()) - 0;
            if (setterOrder > 0) {
                // 设置的试序号是否在试题序号数组中
                if ($.inArray(setterOrder, app.examOrderIDArray.order) !== -1) {
                    $currTarget.attr("able", 0);
                    $currTarget.val(_this.suggestOrderID);
                    layer.msg("试题序号<b> " + setterOrder + " </b>已存在 !", {time: 1500})
                    return
                }
                $currTarget.attr("able", 1);
                _this.suggestOrderID = setterOrder;
                $currTarget.val(_this.suggestOrderID);
                Bus.$emit("sendSetterOrderID", setterOrder);
            } else {
                $currTarget.val(_this.suggestOrderID);
                layer.msg("试题序号只能是大于 0 的数字！", {time: 2500});
            }
        }
    }
});
/*========
 添加到 ：选择分卷
 ========*/
Vue.component('select-part-to', {
    template: '<div class="itm-item">\
        <span class="item-name">添加到：</span><select class="w8em j_selectPartTo" v-model="selectPartTo">\
        <option value="0">第Ⅰ卷</option>\
        <option value="1">第Ⅱ卷</option>\
        </select></div>',
    data: function () {
        return {
            selectPartTo: 0 //默认添加到第Ⅰ卷
        }
    }
});

/*========
 编辑头部信息
 ========*/
var _iconShowStyle = {
    display: 1,
    showHtml: "<i class='iconfont'>&#xe608;</i>隐藏"
}, _iconHideStyle = {
    display: 0,
    showHtml: "<i class='iconfont'>&#xe609;</i>显示"
};
Vue.component("tpl-alert-title", {
    template: "#tpl-alert-title",
    props: ["modal", "title"],
    data: function () {
        return {
            paperName: _iconShowStyle,
            mainTitle: _iconShowStyle,
            subTitle: _iconShowStyle
        };
    },
    methods: {
        yesBtn: function () {
            var $form = $("#form-title-info").find('input:text');
            var objTitle = {};
            // 缓存设置状态
            $.each($form, function () {
                objTitle[this.name] = {};
                objTitle[this.name]["content"] = this.value;
                objTitle[this.name]["display"] = !this.disabled;
            });
            app.data.top = objTitle.paperName;
            app.data.title = objTitle.mainTitle;
            app.data.sub = objTitle.subTitle;
            app.dataState += 1;
            app.alert.state_alertTitle = false;
        },
        toggleShowState: function (event) {
            var $this = $(event.currentTarget).data("state");
            if (this[$this]["display"]) {
                this[$this] = _iconHideStyle
            } else {
                this[$this] = _iconShowStyle
            }
        },
        closeThisModal: function () {
            app.alert.state_alertTitle = false;
        }
    }
});

/*========
 编辑答题卡
 ========*/
Vue.component("alert-exam-info", {
    template: "#tpl-alert-exam-info",
    props: ["care", "modal", "data"],
    data: function () {
        return {}
    },
    methods: {
        yesBtn: function () {
            app.data.care.content = $("#examInfoNotice").val();
            app.dataState += 1;
            app.alert.state_alertExamInfo = false
        },
        closeThisModal: function () {
            app.alert.state_alertExamInfo = false
        }
    }
});


/*========
 编辑分卷信息
 ========*/

Vue.component("alert-part-info", {
    template: "#tpl-alert-part-info",
    props: ["examPart", "modal"],
    methods: {
        yesBtn: function () {
            var partInfoSetItem = $("#partInfoSet").find(".partInfoItem");
            partInfoSetItem.each(function (i) {
                var $this = $(this);
                // 更新数据
                app.data.paper[i].title = $this.find("[name=part-title-" + i + "]").val();
                app.data.paper[i].desc = $this.find("[name=part-desc-" + i + "]").val();
            });
            app.dataState += 1;
            app.alert.state_alertPartInfo = false
        },
        closeThisModal: function () {
            app.alert.state_alertPartInfo = false
        }
    }
});


/*========
 编辑-试题title
 ========*/
var currentTitleID = '';//记录当前点击的试题索引
Vue.component("alert-edit-ques-title", {
    template: "#tpl-alert-edit-ques-title",
    props: ["modal", "examPart"],
    data: function () {
        return {
            currentTitleID: '',
            currentPartID: ''
        }
    },
    beforeCreate: function () {
        var _this = this;
        Bus.$on("showAlertEditQuesTitle", function (pid, tid) {
            _this.currentPartID = pid;
            _this.currentTitleID = tid;
        });
    },
    methods: {
        yesBtn: function (pid, tid) {
            // 更新数据
            app.data.paper[pid].list[tid].title = $('[name=ques-title-' + pid + '-' + tid + ']').val();
            app.data.paper[pid].list[tid].display = $('[name=ques-title-display-' + pid + '-' + tid + ']:checked').val()-0;
            console.log(pid, tid);
            app.dataState += 1;
            app.alert.state_alertEditQuesTitle = false;
        },
        closeThisModal: function () {
            app.alert.state_alertEditQuesTitle = false
        }
    }
});


/*===================添加试题===================*/
/*Vue组件混合配置项------------------*/
var VueMixin_AddQuesOrderConfig = {
    data: function () {
        return {
            addFrom: '', //何种方式添加试题
            selectedAddedTestNum: 1,
            // computedOrderID: '',
            toggleSetOrderID: false,//是否设置题号
            getOrderID: ''
        }
    },
    created: function () {
        var _this = this;
        Bus.$on("toggleSetOrderID", function (val) {
            _this.toggleSetOrderID = val;
        })
        // 监听组件传递的值并更新
        Bus.$on("sendSetterOrderID", function (val) {
            _this.getOrderID = val;
        })
    },
    computed: {
        computedOrderID: function () {
            var _this = this;
            /*仅当添加题数为1，且设置题号为true时，使用自定义题号，否则使用自动题号*/
            if (_this.selectedAddedTestNum == 1) {
                if (_this.toggleSetOrderID) {
                    return _this.getOrderID
                }
            }
            return _this.examOrderIDArray.max + 1;
        }
    },
    watch: {
        "examOrderIDArray.max":function(){
            this.getOrderID = this.examOrderIDArray.max + 1;
        },
        "selectedAddedTestNum": function () {
            this.getOrderID = this.examOrderIDArray.max + 1;
        },
        "toggleSetOrderID": function () {
            this.getOrderID = this.examOrderIDArray.max + 1;
        }
    }
};
/*Vue组件混合配置项-END-----------------*/


/*========
 添加-选择题
 ========*/
Vue.component("alert-xuanzeti", {
    template: "#tpl-alert-xuanzeti",
    props: ["modal"],
    data: function () {
        return {
            addFrom: '', //何种方式添加试题
            selectedAddedTestNum: 1,//默认添加数量
            getOrderID: 0,
            choiceStyle: 1 //默认大写字母 客观题类型：1大写字母 2小写字母 3判断对错
        }
    },
    created: function () {
        var _this = this;
        // 监听添加事件
        Bus.$on("showAlertXuanzeti", function (data) {
            _this.addFrom = data;
            console.log(_this.addFrom);
        });
    },
    methods: {
        yesBtn: function () {
            var shouldOrderID = app.examOrderIDArray.max + 1;
            var choiceNum = $("#choice-num").val() - 0,
                choiceStyleForm = $("[name=choice-style]:checked").val() - 0,
                optionNum = $("#option-num").val() - 0;
            // 临时保存添加的题目数据
            var addItem = [];
            // 检查用户设置题号
            if (app.checkUserSetOrderID(shouldOrderID)) {
                if ($.isNumeric(app.checkUserSetOrderID(shouldOrderID))) {
                    shouldOrderID = app.checkUserSetOrderID(shouldOrderID)
                }
            }
            for (var i = 0; i < choiceNum; i++) {
                addItem.push({
                    order: shouldOrderID + i,
                    style: choiceStyleForm,
                    small: 0,//默认不包含小题
                    num: optionNum
                });
            }

            // 添加到何处
            var _this = this,
                addFrom = _this.addFrom;
            console.log(addFrom);
            if (addFrom === 'bar') {
                //来自侧边栏
                var newItem = {
                    title: "选择题",
                    display: 1,
                    type: 0,
                    style: 0,//默认竖版
                    content: addItem
                };
                var partIndex = $(".j_selectPartTo:visible").val() - 0;
                if (app.addToListNewTypeItem(newItem, partIndex)) {
                    app.alert.state_alertXuanzeti = false
                }
            } else {
                //来自页面
                if (app.addToListNewContentItem(addItem, addFrom)) {
                    app.alert.state_alertXuanzeti = false
                }
            }
        },
        closeThisModal: function () {
            app.alert.state_alertXuanzeti = false
        }
    }
});


/*========
 添加-填空题
 ========*/
/*填空题-小题*/
Vue.component("tiankongti-sub", {
    template: "#tpl-tiankongti-sub",
    props: [
        "selectedAddedTestNum",
        "itemIndex",
        "computedOrderID"
    ],
    data: function () {
        return {
            changeTestItemKong: 1
        }
    }
});
/*填空题*/
Vue.component("alert-tiankongti", {
    mixins: [VueMixin_AddQuesOrderConfig],
    template: "#tpl-alert-tiankongti",
    props: ["modal", "examPart", "examOrderIDArray"],
    data: function () {
        return {
            defValue: {
                title: "填空题"
            }
        }
    },
    created: function () {
        var _this = this;
        // 监听添加事件
        Bus.$on("showAlertTiankongti", function (data) {
            _this.addFrom = data;
            _this.computedOrderID = app.examOrderIDArray.max + 1;
        });
    },
    methods: {
        yesBtn: function () {
            var _this = this,
                addFrom = _this.addFrom,
                shouldOrderID = app.examOrderIDArray.max + 1,
                title = $("#lay_tiankongti").find("[role=title]").val(),
                selectedAddedTestFormItem = $("#add_tiankongti_form").find(".fillin-list-nub"),
                addItem = [];// 缓存新添加试题数组

            // 检查用户设置题号
            if (app.checkUserSetOrderID()) {
                if ($.isNumeric(app.checkUserSetOrderID())) {
                    shouldOrderID = app.checkUserSetOrderID()
                }
            }
            // 生成添加数据格式
            selectedAddedTestFormItem.each(function (i) {
                var $this = $(this);
                var itemHline = $this.find("[role=hline]").val() - 0,
                    itemKong = $this.find("[role=kong]").val() - 0,
                    itemHasSubOrder = $this.find("[role=hasSubOrder]").prop("checked"),
                    newItem = {
                        "order": shouldOrderID + i,
                        "small": 0,
                        "uline": 1,
                        'kong': 1,
                        'hline': itemHline,
                        "score": ''
                    };
                //无小题
                if (!itemHasSubOrder) {
                    addItem.push(
                        $.extend({}, newItem, {
                            'kong': itemKong
                        }))
                }
                // 有小题
                if (itemHasSubOrder) {
                    for (var j = 0; j < itemKong; j++) {
                        addItem.push(
                            $.extend({}, newItem, {
                                'small': j + 1
                            }))
                    }
                }
            });
            // 添加
            if (addFrom === 'bar') {// 来自添加
                var newType = {
                    'title': title,
                    'display': 1,
                    'type': 1,
                    'content': addItem
                };
                var partIndex = $(".j_selectPartTo:visible").val() - 0;
                if (app.addToListNewTypeItem(newType, partIndex)) {
                    app.alert.state_alertTiankongti = false
                }
            } else {
                if (app.addToListNewContentItem(addItem, addFrom)) {
                    app.alert.state_alertTiankongti = false
                }
            }

        },
        closeThisModal: function () {
            app.alert.state_alertTiankongti = false;
        }
    }
});



/*========
 添加-解答题
 ========*/
// 添加小题组件
Vue.component("jiedati-add-test-item", {
    template: '#tpl-jiedati-add-test-item',
    props: ["addItemContentIndex", "addSubItemContentIndex", "computedOrderID"],
    data: function () {
        return {
            isAddQuesDesc: 0,//是否添加描述
            isAddSubTest: 0,//是否添加小题
            currentSubItemIndex: 0,//当前题号
            selectedAddSubNum: 2 //默认添加数量
        }
    },
    methods: {
        //tab切换小题
        tabCurrentSubItem: function (tabid) {
            this.currentSubItemIndex = tabid - 0
        },
        //选择添加行事件
        selectItemHlineEvent: function (e) {
            var $target = e.currentTarget;
            console.log($target.value);
            if ($target.value - 0 >1) {
                $($target).next("select").prop({"disabled": "true"}).hide();
            } else {
                $($target).next("select").removeProp("disabled").show();
            }
        }
    }
})
//小题属性
Vue.component("jiedati-add-sub-test-item", {
    template: '#tpl-jiedati-add-sub-test-item',
    props: ["addItemContentIndex", "addSubItemContentIndex", "computedOrderID"],
    data: function () {
        return {
            isAddQuesImg: 0,//是否添加图片
            isAddQuesDesc: 0,//是否添加描述
            addQuesImgBy: '' //如何添加
        }
    },
    methods: {
        // 选择行数
        selectItemHlineEvent: function (e) {
            var $target = e.currentTarget;
            console.log($target.value);
            if ($target.value - 0 > 1) {// 行数大于1时 禁用空选项
                $($target).next("select").prop({"disabled": "true"}).hide();
            } else {
                $($target).next("select").removeProp("disabled").show();
            }
        }
    }
})
/*解答题*/
Vue.component("alert-jiedati", {
    mixins: [VueMixin_AddQuesOrderConfig],
    template: "#tpl-alert-jiedati",
    props: ["modal", "examOrderIDArray"],
    data: function () {
        return {
            defValue: {
                title: "解答题"
            },
            currentItemIndex: 0 //默认显示的试题标签索引
        }
    },
    created: function () {
        var _this = this;
        // 监听解答题弹出框事件
        Bus.$on("showAlertJiedati", function (data) {
            _this.addFrom = data; //弹框来源
            _this.computedOrderID = app.examOrderIDArray.max + 1;//计算题号
        });
    },
    methods: {
        // 解答题tab切换
        tabCurrentItem: function (tabid) {
            this.currentItemIndex = tabid - 0
        },
        // 获取试题属性配置 @$Item 试题对象 @hasSub  是否有小题
        getTestItemAttr: function ($Item,hasSub) {
            // ['order'=>11,'small'=>2,'uline'=>1,'kong'=>2,'hline'=>0.3,'score'=>3],
            var $order = $Item.attr("ques-id") - 0;
            var $small = hasSub === 0 ? 0 : $Item.attr("sub-test-id") - 0 + 1;
            var $score = $Item.find("[role=score]").val() - 0;
            var $uline = $Item.find("[role=uline]:checked").val() - 0;
            var $kong = $Item.find("[role=kong]:visible").val() - 0;
            var $hline = $Item.find("[role=hline]").val() - 0;
            // var $desc = $Item.find("[role=desc]:visible").val();
            return {
                order: $order,
                small: $small,
                uline: $uline,
                kong: $kong || 0,
                hline: $hline,
                score: $score
                // desc:$desc||'',
                // img:$img||[]
            };
        },
        yesBtn: function () {
            var _this = this,
                addFrom = _this.addFrom,
                addItem = [],//缓存试题属性
                title = $("#lay_jiedati").find("[role=title]").val(), // 获取表单试题属性
                $jiedatiAddedQuesContent = $("#jiedatiAddedQuesContent"),//要添加的解答题容器
                $jiedatiItem = $jiedatiAddedQuesContent.find("[jiedati-ques-id]");

            // 遍历新试题数据
            $jiedatiItem.each(function () {
                var $this = $(this),
                    $hasSmall = $this.find('[role="has-sub-test"]:checked').val() - 0,
                    $subTestItem = $this.find("[sub-test-id]");

                // 没有小题
                if ($hasSmall == 0) {
                    addItem.push(_this.getTestItemAttr($subTestItem,0));
                }
                // 有小题
                if ($hasSmall == 1) {
                    $subTestItem.each(function () {
                        var $subThis = $(this);
                        addItem.push(_this.getTestItemAttr($subThis,1));
                    })
                }
            });
            if (addFrom === 'bar') {// 来自添加新题型
                var newType = {
                    'title': title,
                    'display': 1,
                    'type': 1,
                    'content': addItem
                };
                var partIndex = $(".j_selectPartTo:visible").val() - 0;
                if (app.addToListNewTypeItem(newType, partIndex)) {
                    app.alert.state_alertJiedati = false
                }
            } else {//来自当前试题添加
                if (app.addToListNewContentItem(addItem, addFrom)) {
                    app.alert.state_alertJiedati = false
                }
            }
        },
        closeThisModal: function () {
            app.alert.state_alertJiedati = false
        }
    }
});

/*========
 编辑解答题
 ========*/
Vue.component("alert-edit-jiedati", {
    template: "#tpl-alert-edit-jiedati",
    props: ["modal"],
    data:function(){
        return {
            editWhich:'',
            editData:{
                "order": '', "small": '', "uline": '', 'kong': '', 'hline': '', "score": '','desc':'',
                img:[]
            }, //声明要编辑的试题数据
            isAddQuesDesc: 0,
            isAddQuesImg: '',
            addQuesImgBy: ''
        }
    },
    created: function () {
        var _this = this;
        Bus.$on("showAlertEditJiedati", function (data) {
            _this.editWhich = data;
            // 解除数据绑定
            var saveQuesData = JSON.parse(JSON.stringify(_this.handleOldData(_this.editWhich)));
            console.log(saveQuesData);
            // 合并数据
            _this.editData = $.extend({},_this.editData,saveQuesData);
        });
    },
    methods: {
        // 获取原数据
        handleOldData:function(p,changeData){
            // 如果有第二个参数修改数据
            if(changeData){
                app.data.paper[p.pid].list[p.tid].content.splice(p.oid,1,changeData);
                app.dataState++;
                return;
            }
            return app.data.paper[p.pid].list[p.tid].content[p.oid];
        },
        // 选用试题图片
        selectServerImage:function(e){
            var _this = this;

            // 获取题库图片参数
            // var params = {
            //     // saveID:editData.getAttr(1),
            //     testID:editData.getTestIDByOrder(_this.editData.order)
            // };
            // console.log(_this.editData.order);
            // console.log(editData.getTestIDByOrder(_this.editData.order));
            // $.get(U("/Home/Index/testImageChoose"),params,function(data){
            //     console.log(data);
            //     // if(data.data && data.data.length>0){
            //     //
            //     // }else{
            //     //     layer.msg("没有图片可用！")
            //     // }
            // })

            var imgList = [
                "/Public/default/image/answer/pic.jpg",
                "/Public/default/image/answer/pic.jpg",
                "/Public/default/image/answer/pic.jpg"
            ];
            // 将数据生成图片列表
            function outputImgList(data){
                var tmp = "<ul id='layer_serverImgList'>";
                for(var i = 0;i<imgList.length;i++){
                    tmp += "<li><div class='img-box'><img src="+imgList[i]+"></div>";
                }
                tmp +="</ul>";
                return tmp;
            };
            //弹出选择框
            layer.open({
                type:0,
                shift:-1,
                area:["700px","500px"],
                title:"请选择图片",
                btn:["确定","取消"],
                content:outputImgList(imgList),//得到图片列表
                yes:function(){
                    var imgSrc = $("#layer_serverImgList").find("li.selected").find("img").attr("src");
                    console.log(imgSrc);
                },success:function(){
                    //为图片绑定选择事件
                    $("#layer_serverImgList").on("click","li",function(){
                        var $this =$(this);
                        $this.addClass("selected").siblings("li").removeClass("selected");
                    });
                }
            });
        },
        //图片上传
        uploadThisImage:function(){
            var _this = this;
            var addedImgList = [];// 缓存图片
            var uploaderHtml = '<div id="uploader" class="wu-example">\
                    <div class="queueList">\
                    <div id="dndArea" class="placeholder">\
                    <div id="filePicker"></div>\
                    <p>或将照片拖到这里，单次最多可选3张</p>\
                </div>\
                </div>\
                <div class="statusBar" style="display:none;">\
                    <div class="progress">\
                    <span class="text">0%</span>\
                    <span class="percentage"></span>\
                    </div><div class="info"></div>\
                    <div class="btns">\
                    <div id="filePicker2"></div><div class="uploadBtn">开始上传</div>\
                    </div>\
                    </div>\
                    </div>';
            var layerUpImg = layer.open({
                type:0,
                shift:-1,
                title:false,
                closeBtn:false,
                area:["600px","auto"],
                // title:"添加图片",
                btn:["确定","取消"],
                content:uploaderHtml,
                yes:function () {
                    var editData =_this.editData;
                    if(editData.img && editData.img !== undefined){
                        if($.isArray(editData.img)){
                            _this.editData.img = editData.img.concat(addedImgList);//添加图片到缓存数据
                        }
                    }else{
                        console.log("添加图片到缓存数据");
                        _this.editData.img = addedImgList;//添加图片到缓存数据
                    }
                    console.log(_this.editData.img,".img");
                    console.log(_this.editData,".editData");
                    app.updateDom();
                    layer.close(layerUpimg);
                },
                btn2:function(){
                    layer.close()
                },
                success:function(layero){
                    layero.find(".layui-layer-btn").css({"text-align":"center","padding-bottom":"20px"})
                }
            });
            $("#uploader").ready(function () {
                var $ = jQuery,
                    $wrap = $('#uploader'),
                    // 图片容器
                    $queue = $('<ul class="filelist"></ul>')
                        .appendTo($wrap.find('.queueList')),

                    // 状态栏，包括进度和控制按钮
                    $statusBar = $wrap.find('.statusBar'),

                    // 文件总体选择信息。
                    $info = $statusBar.find('.info'),

                    // 上传按钮
                    $upload = $wrap.find('.uploadBtn'),

                    // 没选择文件之前的内容。
                    $placeHolder = $wrap.find('.placeholder'),

                    // 总体进度条
                    $progress = $statusBar.find('.progress').hide(),

                    // 添加的文件数量
                    fileCount = 0,

                    // 添加的文件总大小
                    fileSize = 0,

                    // 优化retina, 在retina下这个值是2
                    ratio = window.devicePixelRatio || 1,

                    // 缩略图大小
                    thumbnailWidth = 110 * ratio,
                    thumbnailHeight = 110 * ratio,

                    // 可能有pedding, ready, uploading, confirm, done.
                    state = 'pedding',

                    // 所有文件的进度信息，key为file id
                    percentages = {},

                    supportTransition = (function () {
                        var s = document.createElement('p').style,
                            r = 'transition' in s ||
                                'WebkitTransition' in s ||
                                'MozTransition' in s ||
                                'msTransition' in s ||
                                'OTransition' in s;
                        s = null;
                        return r;
                    })(),

                    // WebUploader实例
                    uploader;

                if (!WebUploader.Uploader.support()) {
                    alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
                    throw new Error('WebUploader does not support the browser you are using.');
                }

                // 实例化
                uploader = WebUploader.create({
                    pick: {
                        id: '#filePicker',
                        label: '点击选择图片'
                    },
                    dnd: '#uploader .queueList',
                    paste: document.body,
                    // 文件类型
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: 'image/jpg,image/jpeg,image/png'
                    },
                    // swf文件路径
                    swf: '__PUBLIC__/plugin/webuploader/js/Uploader.swf',
                    disableGlobalDnd: true,
                    chunked: true,
                    server: '/Home/Index/upload.html?dir=bbs&action=uploadimage',
                    fileNumLimit: 3, //文件数量
                    fileSizeLimit: 2 * 1024 * 1024,    // 2 M
                    fileSingleSizeLimit: 2 * 1024 * 1024    // 2 M
                });

                // 添加“添加文件”的按钮，
                uploader.addButton({
                    id: '#filePicker2',
                    label: '继续添加'
                });
                // 当有文件添加进来时执行，负责view的创建
                function addFile(file) {
                    var $li = $('<li id="' + file.id + '">' +
                            '<p class="title">' + file.name + '</p>' +
                            '<p class="imgWrap"></p>' +
                            '<p class="progress"><span></span></p>' +
                            '</li>'),

                        $btns = $('<div class="file-panel">' +
                            '<span class="cancel">删除</span>' +
                            '<span class="rotateRight">向右旋转</span>' +
                            '<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
                        $prgress = $li.find('p.progress span'),
                        $wrap = $li.find('p.imgWrap'),
                        $info = $('<p class="error"></p>'),

                        showError = function (code) {
                            switch (code) {
                                case 'exceed_size':
                                    text = '文件大小超出';
                                    break;

                                case 'interrupt':
                                    text = '上传暂停';
                                    break;

                                default:
                                    text = '上传失败，请重试';
                                    break;
                            }

                            $info.text(text).appendTo($li);
                        };

                    if (file.getStatus() === 'invalid') {
                        showError(file.statusText);
                    } else {
                        // @todo lazyload
                        $wrap.text('预览中');
                        uploader.makeThumb(file, function (error, src) {
                            if (error) {
                                $wrap.text('不能预览');
                                return;
                            }

                            var img = $('<img src="' + src + '">');
                            $wrap.empty().append(img);
                        }, thumbnailWidth, thumbnailHeight);

                        percentages[file.id] = [file.size, 0];
                        file.rotation = 0;
                    }

                    file.on('statuschange', function (cur, prev) {
                        if (prev === 'progress') {
                            $prgress.hide().width(0);
                        } else if (prev === 'queued') {
                            $li.off('mouseenter mouseleave');
                            $btns.remove();
                        }

                        // 成功
                        if (cur === 'error' || cur === 'invalid') {
                            console.log(file.statusText);
                            showError(file.statusText);
                            percentages[file.id][1] = 1;
                        } else if (cur === 'interrupt') {
                            showError('interrupt');
                        } else if (cur === 'queued') {
                            percentages[file.id][1] = 0;
                        } else if (cur === 'progress') {
                            $info.remove();
                            $prgress.css('display', 'block');
                        } else if (cur === 'complete') {
                            $li.append('<span class="success"></span>');
                        }

                        $li.removeClass('state-' + prev).addClass('state-' + cur);
                    });

                    $li.on('mouseenter', function () {
                        $btns.stop().animate({height: 30});
                    });

                    $li.on('mouseleave', function () {
                        $btns.stop().animate({height: 0});
                    });

                    $btns.on('click', 'span', function () {
                        var index = $(this).index(),
                            deg;

                        switch (index) {
                            case 0:
                                uploader.removeFile(file);
                                return;

                            case 1:
                                file.rotation += 90;
                                break;

                            case 2:
                                file.rotation -= 90;
                                break;
                        }

                        if (supportTransition) {
                            deg = 'rotate(' + file.rotation + 'deg)';
                            $wrap.css({
                                '-webkit-transform': deg,
                                '-mos-transform': deg,
                                '-o-transform': deg,
                                'transform': deg
                            });
                        } else {
                            $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
                            // use jquery animate to rotation
                            // $({
                            //     rotation: rotation
                            // }).animate({
                            //     rotation: file.rotation
                            // }, {
                            //     easing: 'linear',
                            //     step: function( now ) {
                            //         now = now * Math.PI / 180;

                            //         var cos = Math.cos( now ),
                            //             sin = Math.sin( now );

                            //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
                            //     }
                            // });
                        }


                    });

                    $li.appendTo($queue);
                }
                // 负责view的销毁
                function removeFile(file) {
                    var $li = $('#' + file.id);

                    delete percentages[file.id];
                    updateTotalProgress();
                    $li.off().find('.file-panel').off().end().remove();
                }
                // 更新进度
                function updateTotalProgress() {
                    var loaded = 0,
                        total = 0,
                        spans = $progress.children(),
                        percent;

                    $.each(percentages, function (k, v) {
                        total += v[0];
                        loaded += v[0] * v[1];
                    });

                    percent = total ? loaded / total : 0;

                    spans.eq(0).text(Math.round(percent * 100) + '%');
                    spans.eq(1).css('width', Math.round(percent * 100) + '%');
                    updateStatus();
                }
                // 更新状态
                function updateStatus() {
                    var text = '', stats;

                    if (state === 'ready') {
                        text = '选中' + fileCount + '张图片，共' +
                            WebUploader.formatSize(fileSize) + '。';
                    } else if (state === 'confirm') {
                        stats = uploader.getStats();
                        if (stats.uploadFailNum) {
                            text = '已成功上传' + stats.successNum + '张照片至XX相册，' +
                                stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
                        }

                    } else {
                        stats = uploader.getStats();
                        text = '共' + fileCount + '张（' +
                            WebUploader.formatSize(fileSize) +
                            '），已上传' + stats.successNum + '张';

                        if (stats.uploadFailNum) {
                            text += '，失败' + stats.uploadFailNum + '张';
                        }
                    }

                    $info.html(text);
                }
                // 设置状态
                function setState(val) {
                    var file, stats;

                    if (val === state) {
                        return;
                    }

                    $upload.removeClass('state-' + state);
                    $upload.addClass('state-' + val);
                    state = val;

                    switch (state) {
                        case 'pedding':
                            $placeHolder.removeClass('element-invisible');
                            $queue.parent().removeClass('filled');
                            $queue.hide();
                            $statusBar.addClass('element-invisible');
                            uploader.refresh();
                            break;

                        case 'ready':
                            $placeHolder.addClass('element-invisible');
                            $('#filePicker2').removeClass('element-invisible');
                            $queue.parent().addClass('filled');
                            $queue.show();
                            $statusBar.removeClass('element-invisible');
                            uploader.refresh();
                            break;

                        case 'uploading':
                            $('#filePicker2').addClass('element-invisible');
                            $progress.show();
                            $upload.text('暂停上传');
                            break;

                        case 'paused':
                            $progress.show();
                            $upload.text('继续上传');
                            break;

                        case 'confirm':
                            $progress.hide();
                            $upload.text('开始上传').addClass('disabled');

                            stats = uploader.getStats();
                            if (stats.successNum && !stats.uploadFailNum) {
                                setState('finish');
                                return;
                            }
                            break;
                        case 'finish':
                            stats = uploader.getStats();
                            if (stats.successNum) {
                                // alert('上传成功');
                            } else {
                                // 没有成功的图片，重设
                                state = 'done';
                                location.reload();
                            }
                            break;
                    }

                    updateStatus();
                }

                uploader.onUploadProgress = function (file, percentage) {
                    var $li = $('#' + file.id),
                        $percent = $li.find('.progress span');

                    $percent.css('width', percentage * 100 + '%');
                    percentages[file.id][1] = percentage;
                    updateTotalProgress();
                };

                uploader.onFileQueued = function (file) {
                    fileCount++;
                    fileSize += file.size;

                    if (fileCount === 1) {
                        $placeHolder.addClass('element-invisible');
                        $statusBar.show();
                    }

                    addFile(file);
                    setState('ready');
                    updateTotalProgress();
                };

                uploader.onFileDequeued = function (file) {
                    fileCount--;
                    fileSize -= file.size;

                    if (!fileCount) {
                        setState('pedding');
                    }

                    removeFile(file);
                    updateTotalProgress();

                };

                uploader.on('all', function (type) {
                    var stats;
                    switch (type) {
                        case 'uploadFinished':
                            setState('confirm');
                            break;

                        case 'startUpload':
                            setState('uploading');
                            break;

                        case 'stopUpload':
                            setState('paused');
                            break;

                    }
                });
                // 上传完成 添加新图片路径
                uploader.onUploadSuccess = function(file,res){
                    if(res.state =="SUCCESS"){
                        addedImgList.push([res.url]);
                    }
                };
                // 错误
                uploader.onError = function (code) {
                    alert('错误: ' + code);
                };
                // 上传
                $upload.on('click', function () {
                    if ($(this).hasClass('disabled')) {
                        return false;
                    }
                    if (state === 'ready') {
                        uploader.upload();
                    } else if (state === 'paused') {
                        uploader.upload();
                    } else if (state === 'uploading') {
                        uploader.stop();
                    }
                });
                // 重试
                $info.on('click', '.retry', function () {
                    uploader.retry();
                });
                // 忽略
                $info.on('click', '.ignore', function () {
                    alert('todo');
                });
                $upload.addClass('state-' + state);
                updateTotalProgress();
            })
        },
        // 删除缓存图片
        delThisQuesImg: function (iid) {
            var _this = this;
            _this.editData.img.splice(iid, 1);
            layer.msg('删除成功！', {icon: 1, time: 1000});
        },
        yesBtn: function () {
            this.$forceUpdate();//组件数据初始化
            var _this = this;
            _this.handleOldData(_this.editWhich,_this.editData);
            app.alert.state_alertEditJiedati = false
        },
        closeThisModal: function () {
            this.$forceUpdate();//组件数据初始化
            app.alert.state_alertEditJiedati = false
        }
    }
});
/*========
 添加-描述
 ========*/
// Vue.component("alert-add-desc", {
//     template: '#tpl-alert-add-desc',
//     props: ["modal"],
//     data: function () {
//         return {
//             isAddQuesDesc: 0
//         }
//     },
//     created:function(){
//         // 初始化编辑数据
//         // if(_this.editData.desc !== undefined){
//         //     _this.isAddQuesDesc = 1;
//         // }
//     },
//     methods: {
//         yesBtn: function () {
//             var _this = this;
//             app.alert.state_alertAddImg = false
//         },
//         closeThisModal: function () {
//             app.alert.state_alertAddImg = false
//         }
//     }
// })
// /*========
//  添加-图片
//  ========*/
// Vue.component("alert-add-img", {
//     template: '#tpl-alert-add-img',
//     props: ["modal"],
//     data: function () {
//         return {
//             isAddQuesImg: '',
//             addQuesImgBy: ''
//         }
//     },
//     created:function(){
//         // 如果数据中有图片
//         // if(saveQuesData.img && saveQuesData.img.length>0){
//         //     _this.editData.img = saveQuesData.img;
//         // }
//     },
//     methods: {
//         // 选用试题图片
//         selectServerImage:function(e){
//             var imgList = [
//                 "/Public/default/image/answer/pic.jpg",
//                 "/Public/default/image/answer/pic.jpg",
//                 "/Public/default/image/answer/pic.jpg"
//             ];
//             function outputImgList(data){
//                 var tmp = "<ul id='layer_serverImgList'>";
//                 for(var i = 0;i<imgList.length;i++){
//                     tmp += "<li><div class='img-box'><img src="+imgList[i]+"></div>";
//                 }
//                 tmp +="</ul>";
//                 return tmp;
//             };
//
//             layer.open({
//                 type:0,
//                 shift:-1,
//                 area:["700px","500px"],
//                 title:"请选择图片",
//                 btn:["确定","取消"],
//                 content:outputImgList(imgList),
//                 yes:function(){
//                     console.log("yes");
//                     var imgSrc = $("#layer_serverImgList").find("li.selected").find("img").attr("src");
//                     console.log(imgSrc);
//                 }
//             });
//             $("#layer_serverImgList").on("click","li",function(){
//                 var $this =$(this);
//                 $this.addClass("selected").siblings("li").removeClass("selected");
//             });
//             var orderID = $(e.currentTarget).parents("[jiedati-ques-id]").attr("jiedati-ques-id");
//             // 获取题库图片参数
//             // var params = {
//             //     // saveID:editData.getAttr(1),
//             //     testID:editData.getTestIDByOrder(orderID)
//             // };
//             // $.get(U("/Home/Index/testImageChoose"),params,function(data){
//             //     console.log(data);
//             //     // if(data.data && data.data.length>0){
//             //     //
//             //     // }else{
//             //     //     layer.msg("没有图片可用！")
//             //     // }
//             // })
//         },
//         //图片上传
//         uploadThisImage:function(){
//             var _this = this;
//             var addedImgList = [];
//             var uploaderHtml = '<div id="uploader" class="wu-example">\
//                     <div class="queueList">\
//                     <div id="dndArea" class="placeholder">\
//                     <div id="filePicker"></div>\
//                     <p>或将照片拖到这里，单次最多可选3张</p>\
//                 </div>\
//                 </div>\
//                 <div class="statusBar" style="display:none;">\
//                     <div class="progress">\
//                     <span class="text">0%</span>\
//                     <span class="percentage"></span>\
//                     </div><div class="info"></div>\
//                     <div class="btns">\
//                     <div id="filePicker2"></div><div class="uploadBtn">开始上传</div>\
//                     </div>\
//                     </div>\
//                     </div>';
//             var layerUpimg = layer.open({
//                 type:0,
//                 shift:-1,
//                 title:false,
//                 closeBtn:false,
//                 area:["600px","auto"],
//                 // title:"添加图片",
//                 btn:["确定","取消"],
//                 content:uploaderHtml,
//                 yes:function () {
//                     if(_this.editData.img && _this.editData.img !== undefined){
//                         if($.isArray(_this.editData.img)){
//                             console.log(_this.editData.img,1);
//                             _this.editData.img = _this.editData.img.concat(addedImgList);//添加图片到缓存数据
//                             console.log(_this.editData.img,2);
//                         }
//                     }else{
//                         console.log("添加图片到缓存数据")
//                         _this.editData.img = addedImgList;//添加图片到缓存数据
//                     }
//                     layer.close(layerUpimg);
//                 },
//                 btn2:function(){
//                     layer.close()
//                 },
//                 success:function(layero){
//                     layero.find(".layui-layer-btn").css({"text-align":"center","padding-bottom":"20px"})
//                 }
//             })
//             $("#uploader").ready(function () {
//                 var $ = jQuery,
//                     $wrap = $('#uploader'),
//                     // 图片容器
//                     $queue = $('<ul class="filelist"></ul>')
//                         .appendTo($wrap.find('.queueList')),
//
//                     // 状态栏，包括进度和控制按钮
//                     $statusBar = $wrap.find('.statusBar'),
//
//                     // 文件总体选择信息。
//                     $info = $statusBar.find('.info'),
//
//                     // 上传按钮
//                     $upload = $wrap.find('.uploadBtn'),
//
//                     // 没选择文件之前的内容。
//                     $placeHolder = $wrap.find('.placeholder'),
//
//                     // 总体进度条
//                     $progress = $statusBar.find('.progress').hide(),
//
//                     // 添加的文件数量
//                     fileCount = 0,
//
//                     // 添加的文件总大小
//                     fileSize = 0,
//
//                     // 优化retina, 在retina下这个值是2
//                     ratio = window.devicePixelRatio || 1,
//
//                     // 缩略图大小
//                     thumbnailWidth = 110 * ratio,
//                     thumbnailHeight = 110 * ratio,
//
//                     // 可能有pedding, ready, uploading, confirm, done.
//                     state = 'pedding',
//
//                     // 所有文件的进度信息，key为file id
//                     percentages = {},
//
//                     supportTransition = (function () {
//                         var s = document.createElement('p').style,
//                             r = 'transition' in s ||
//                                 'WebkitTransition' in s ||
//                                 'MozTransition' in s ||
//                                 'msTransition' in s ||
//                                 'OTransition' in s;
//                         s = null;
//                         return r;
//                     })(),
//
//                     // WebUploader实例
//                     uploader;
//
//                 if (!WebUploader.Uploader.support()) {
//                     alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
//                     throw new Error('WebUploader does not support the browser you are using.');
//                 }
//
//                 // 实例化
//                 uploader = WebUploader.create({
//                     pick: {
//                         id: '#filePicker',
//                         label: '点击选择图片'
//                     },
//                     dnd: '#uploader .queueList',
//                     paste: document.body,
//                     // 文件类型
//                     accept: {
//                         title: 'Images',
//                         extensions: 'gif,jpg,jpeg,bmp,png',
//                         mimeTypes: 'image/jpg,image/jpeg,image/png'
//                     },
//                     // swf文件路径
//                     swf: '__PUBLIC__/plugin/webuploader/js/Uploader.swf',
//                     disableGlobalDnd: true,
//                     chunked: true,
//                     server: '/Home/Index/upload.html?dir=bbs&action=uploadimage',
//                     fileNumLimit: 3, //文件数量
//                     fileSizeLimit: 2 * 1024 * 1024,    // 2 M
//                     fileSingleSizeLimit: 2 * 1024 * 1024    // 2 M
//                 });
//
//                 // 添加“添加文件”的按钮，
//                 uploader.addButton({
//                     id: '#filePicker2',
//                     label: '继续添加'
//                 });
//                 // 当有文件添加进来时执行，负责view的创建
//                 function addFile(file) {
//                     var $li = $('<li id="' + file.id + '">' +
//                             '<p class="title">' + file.name + '</p>' +
//                             '<p class="imgWrap"></p>' +
//                             '<p class="progress"><span></span></p>' +
//                             '</li>'),
//
//                         $btns = $('<div class="file-panel">' +
//                             '<span class="cancel">删除</span>' +
//                             '<span class="rotateRight">向右旋转</span>' +
//                             '<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
//                         $prgress = $li.find('p.progress span'),
//                         $wrap = $li.find('p.imgWrap'),
//                         $info = $('<p class="error"></p>'),
//
//                         showError = function (code) {
//                             switch (code) {
//                                 case 'exceed_size':
//                                     text = '文件大小超出';
//                                     break;
//
//                                 case 'interrupt':
//                                     text = '上传暂停';
//                                     break;
//
//                                 default:
//                                     text = '上传失败，请重试';
//                                     break;
//                             }
//
//                             $info.text(text).appendTo($li);
//                         };
//
//                     if (file.getStatus() === 'invalid') {
//                         showError(file.statusText);
//                     } else {
//                         // @todo lazyload
//                         $wrap.text('预览中');
//                         uploader.makeThumb(file, function (error, src) {
//                             if (error) {
//                                 $wrap.text('不能预览');
//                                 return;
//                             }
//
//                             var img = $('<img src="' + src + '">');
//                             $wrap.empty().append(img);
//                         }, thumbnailWidth, thumbnailHeight);
//
//                         percentages[file.id] = [file.size, 0];
//                         file.rotation = 0;
//                     }
//
//                     file.on('statuschange', function (cur, prev) {
//                         if (prev === 'progress') {
//                             $prgress.hide().width(0);
//                         } else if (prev === 'queued') {
//                             $li.off('mouseenter mouseleave');
//                             $btns.remove();
//                         }
//
//                         // 成功
//                         if (cur === 'error' || cur === 'invalid') {
//                             console.log(file.statusText);
//                             showError(file.statusText);
//                             percentages[file.id][1] = 1;
//                         } else if (cur === 'interrupt') {
//                             showError('interrupt');
//                         } else if (cur === 'queued') {
//                             percentages[file.id][1] = 0;
//                         } else if (cur === 'progress') {
//                             $info.remove();
//                             $prgress.css('display', 'block');
//                         } else if (cur === 'complete') {
//                             $li.append('<span class="success"></span>');
//                         }
//
//                         $li.removeClass('state-' + prev).addClass('state-' + cur);
//                     });
//
//                     $li.on('mouseenter', function () {
//                         $btns.stop().animate({height: 30});
//                     });
//
//                     $li.on('mouseleave', function () {
//                         $btns.stop().animate({height: 0});
//                     });
//
//                     $btns.on('click', 'span', function () {
//                         var index = $(this).index(),
//                             deg;
//
//                         switch (index) {
//                             case 0:
//                                 uploader.removeFile(file);
//                                 return;
//
//                             case 1:
//                                 file.rotation += 90;
//                                 break;
//
//                             case 2:
//                                 file.rotation -= 90;
//                                 break;
//                         }
//
//                         if (supportTransition) {
//                             deg = 'rotate(' + file.rotation + 'deg)';
//                             $wrap.css({
//                                 '-webkit-transform': deg,
//                                 '-mos-transform': deg,
//                                 '-o-transform': deg,
//                                 'transform': deg
//                             });
//                         } else {
//                             $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
//                             // use jquery animate to rotation
//                             // $({
//                             //     rotation: rotation
//                             // }).animate({
//                             //     rotation: file.rotation
//                             // }, {
//                             //     easing: 'linear',
//                             //     step: function( now ) {
//                             //         now = now * Math.PI / 180;
//
//                             //         var cos = Math.cos( now ),
//                             //             sin = Math.sin( now );
//
//                             //         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
//                             //     }
//                             // });
//                         }
//
//
//                     });
//
//                     $li.appendTo($queue);
//                 }
//                 // 负责view的销毁
//                 function removeFile(file) {
//                     var $li = $('#' + file.id);
//
//                     delete percentages[file.id];
//                     updateTotalProgress();
//                     $li.off().find('.file-panel').off().end().remove();
//                 }
//                 // 更新进度
//                 function updateTotalProgress() {
//                     var loaded = 0,
//                         total = 0,
//                         spans = $progress.children(),
//                         percent;
//
//                     $.each(percentages, function (k, v) {
//                         total += v[0];
//                         loaded += v[0] * v[1];
//                     });
//
//                     percent = total ? loaded / total : 0;
//
//                     spans.eq(0).text(Math.round(percent * 100) + '%');
//                     spans.eq(1).css('width', Math.round(percent * 100) + '%');
//                     updateStatus();
//                 }
//                 // 更新状态
//                 function updateStatus() {
//                     var text = '', stats;
//
//                     if (state === 'ready') {
//                         text = '选中' + fileCount + '张图片，共' +
//                             WebUploader.formatSize(fileSize) + '。';
//                     } else if (state === 'confirm') {
//                         stats = uploader.getStats();
//                         if (stats.uploadFailNum) {
//                             text = '已成功上传' + stats.successNum + '张照片至XX相册，' +
//                                 stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
//                         }
//
//                     } else {
//                         stats = uploader.getStats();
//                         text = '共' + fileCount + '张（' +
//                             WebUploader.formatSize(fileSize) +
//                             '），已上传' + stats.successNum + '张';
//
//                         if (stats.uploadFailNum) {
//                             text += '，失败' + stats.uploadFailNum + '张';
//                         }
//                     }
//
//                     $info.html(text);
//                 }
//                 // 设置状态
//                 function setState(val) {
//                     var file, stats;
//
//                     if (val === state) {
//                         return;
//                     }
//
//                     $upload.removeClass('state-' + state);
//                     $upload.addClass('state-' + val);
//                     state = val;
//
//                     switch (state) {
//                         case 'pedding':
//                             $placeHolder.removeClass('element-invisible');
//                             $queue.parent().removeClass('filled');
//                             $queue.hide();
//                             $statusBar.addClass('element-invisible');
//                             uploader.refresh();
//                             break;
//
//                         case 'ready':
//                             $placeHolder.addClass('element-invisible');
//                             $('#filePicker2').removeClass('element-invisible');
//                             $queue.parent().addClass('filled');
//                             $queue.show();
//                             $statusBar.removeClass('element-invisible');
//                             uploader.refresh();
//                             break;
//
//                         case 'uploading':
//                             $('#filePicker2').addClass('element-invisible');
//                             $progress.show();
//                             $upload.text('暂停上传');
//                             break;
//
//                         case 'paused':
//                             $progress.show();
//                             $upload.text('继续上传');
//                             break;
//
//                         case 'confirm':
//                             $progress.hide();
//                             $upload.text('开始上传').addClass('disabled');
//
//                             stats = uploader.getStats();
//                             if (stats.successNum && !stats.uploadFailNum) {
//                                 setState('finish');
//                                 return;
//                             }
//                             break;
//                         case 'finish':
//                             stats = uploader.getStats();
//                             if (stats.successNum) {
//                                 // alert('上传成功');
//                             } else {
//                                 // 没有成功的图片，重设
//                                 state = 'done';
//                                 location.reload();
//                             }
//                             break;
//                     }
//
//                     updateStatus();
//                 }
//
//                 uploader.onUploadProgress = function (file, percentage) {
//                     var $li = $('#' + file.id),
//                         $percent = $li.find('.progress span');
//
//                     $percent.css('width', percentage * 100 + '%');
//                     percentages[file.id][1] = percentage;
//                     updateTotalProgress();
//                 };
//
//                 uploader.onFileQueued = function (file) {
//                     fileCount++;
//                     fileSize += file.size;
//
//                     if (fileCount === 1) {
//                         $placeHolder.addClass('element-invisible');
//                         $statusBar.show();
//                     }
//
//                     addFile(file);
//                     setState('ready');
//                     updateTotalProgress();
//                 };
//
//                 uploader.onFileDequeued = function (file) {
//                     fileCount--;
//                     fileSize -= file.size;
//
//                     if (!fileCount) {
//                         setState('pedding');
//                     }
//
//                     removeFile(file);
//                     updateTotalProgress();
//
//                 };
//
//                 uploader.on('all', function (type) {
//                     var stats;
//                     switch (type) {
//                         case 'uploadFinished':
//                             setState('confirm');
//                             break;
//
//                         case 'startUpload':
//                             setState('uploading');
//                             break;
//
//                         case 'stopUpload':
//                             setState('paused');
//                             break;
//
//                     }
//                 });
//                 // 上传完成 添加新图片路径
//                 uploader.onUploadSuccess = function(file,res){
//                     if(res.state =="SUCCESS"){
//                         addedImgList.push([res.url]);
//                     }
//                 };
//                 // 错误
//                 uploader.onError = function (code) {
//                     alert('错误: ' + code);
//                 };
//                 // 上传
//                 $upload.on('click', function () {
//                     if ($(this).hasClass('disabled')) {
//                         return false;
//                     }
//                     if (state === 'ready') {
//                         uploader.upload();
//                     } else if (state === 'paused') {
//                         uploader.upload();
//                     } else if (state === 'uploading') {
//                         uploader.stop();
//                     }
//                 });
//                 // 重试
//                 $info.on('click', '.retry', function () {
//                     uploader.retry();
//                 });
//                 // 忽略
//                 $info.on('click', '.ignore', function () {
//                     alert('todo');
//                 });
//                 $upload.addClass('state-' + state);
//                 updateTotalProgress();
//             })
//         },
//         yesBtn: function () {
//             var _this = this;
//             app.alert.state_alertAddImg = false
//         },
//         closeThisModal: function () {
//             app.alert.state_alertAddImg = false
//         }
//     }
// })
/*========
 添加-选答题
 ========*/
// 添加小题组件
// Vue.component("xuandati-add-test-item", {
//     template: '#tpl-xuandati-add-test-item',
//     props: ["addItemContentIndex", "addSubItemContentIndex", "computedOrderID"],
//     data: function () {
//         return {
//             isAddQuesDesc: 0,
//             isAddSubTest: 0,
//             currentSubItemIndex: 0,
//             selectedAddSubNum: 2
//         }
//     }
// })
//小题属性
// Vue.component("xuandati-add-sub-test-item", {
//     template: '#tpl-xuandati-add-sub-test-item',
//     props: ["addItemContentIndex", "addSubItemContentIndex", "computedOrderID"],
//     data: function () {
//         return {
//             isAddQuesImg: 0,
//             isAddQuesDesc: 0,
//             addQuesImgBy: ''
//         }
//     }
// })

Vue.component("alert-xuandati", {
    template: "#tpl-alert-xuandati",
    props: ["modal", "examOrderIDArray"],
    data: function () {
        return {
            defValue: {
                title: "选答题"
            },
            addFrom: '', //何种方式添加试题
            computedOrderID: '',//声明计算试题ID
            selectedAddedTestNum: 2,//默认添加1道
            currentItemIndex: 0 //默认显示的试题标签索引
        }
    },
    computed: {
        computedOrderID: function () {
            return this.examOrderIDArray.max + 1;
        }
    },
    created: function () {
        var _this = this;
        Bus.$on("showAlertXuandati", function (data) {
            _this.addFrom = data;
            console.log(_this.addFrom)
        });
    },
    methods: {
        selectItemHlineEvent: function (e) {
            var $target = $(e.currentTarget);
            if ($target.value - 0 >= 2) {
                $target.next("select").prop({"disabled": "true"}).hide();
            } else {
                $target.next("select").removeProp("disabled").show();
            }
        },
        tabCurrentItem: function (tabid) {
            this.currentItemIndex = tabid - 0
        },
        yesBtn: function () {
            var _this = this,
                addFrom = _this.addFrom;
            // 获取表单试题属性
            var $xuandati = $("#lay_xuandati"),
                title = $xuandati.find("[role=title]").val(),
                $quesDo = $xuandati.find("[role=ques-do]").val() - 0,
                $hline = $xuandati.find("[role=hline]").val() - 0,
                $score = $xuandati.find("[role=score]").val() - 0;
                // $xuandatiItem = $("#xuandatiAddedQuesContent").find("[xuandati-ques-id]");

            // 缓存新试题
            var addItem = [];// ['order'=>11,'small'=>2,'uline'=>1,'kong'=>2,'hline'=>0.3,'score'=>3],
            // $xuandatiItem.each(function () {
            //     var $this = $(this),
            //         $order = $this.attr("xuandati-ques-id") - 0;
            //     addItem.push({
            //         order: computedOrderID+1,
            //         small: 0,
            //         uline: 0,
            //         kong: 0,
            //         hline: $hline,
            //         score: $score
            //     });
            // });
            for(var o=0;o<this.selectedAddedTestNum;o++){
                addItem.push({
                            order: this.computedOrderID+o,
                            small: 0,
                            uline: 0,
                            kong: 0,
                            hline: $hline,
                            score: $score
                        });
            }
            console.log(addItem);
            if (addFrom === 'bar') {// 来自添加
                var newType = {
                    'title': title,
                    'display': 1,
                    'type': 2,
                    'do': $quesDo,
                    'content': addItem
                };
                console.log(JSON.stringify(newType));
                var partIndex = $(".j_selectPartTo:visible").val() - 0;
                if (app.addToListNewTypeItem(newType, partIndex)) {
                    app.alert.state_alertXuandati = false
                }
            } else {
                if (app.addToListNewContentItem(addItem, addFrom)) {
                    app.alert.state_alertXuandati = false
                }
            }
        },
        closeThisModal: function () {
            app.alert.state_alertXuandati = false
        }
    }
});


/*========
 添加-语文作文
 ========*/

Vue.component("alert-cn-zuowen", {
    mixins: [VueMixin_AddQuesOrderConfig],
    template: "#tpl-alert-cn-zuowen",
    props: ["modal", "examOrderIDArray"],
    data: function () {
        return {
            isEdit: 0,
            defValue: {
                title: "作文",
                char: 800
            },
            addFor: {}
        }
    },
    created: function () {
        var _this = this;
        Bus.$on("showAlertEditCnZuowen", function (pid, tid) {
            _this.addFor.pid = pid;
            _this.addFor.tid = tid;
            _this.isEdit = 1;
        });
        Bus.$on("showAlertCnZuowen", function (data) {
            _this.isEdit = 0;
            _this.computedOrderID = app.examOrderIDArray.max + 1;
        })
    },
    methods: {
        yesBtn: function () {
            var _this = this,
                pid = _this.addFor.pid,
                tid = _this.addFor.tid;
            var $zuowenForm = $("#CN_zuowenForm"),
                title = $zuowenForm.find("[name=cn-zuowen-title]").val(),
                char = $zuowenForm.find("[name=cn-zuowen-char]").val() - 0,
                partIndex = $(".j_selectPartTo:visible").val() - 0;
            _this.defValue.title = title;
            _this.defValue.char = char;
            // 来自添加
            if (_this.isEdit == 0) {
                var newOrder = _this.computedOrderID;
                var newType = {
                    'title': title,
                    'display': 1,
                    'type': 3,
                    'content': [
                        {'order': newOrder, 'char': char, 'score': 60, 'desc': ''}
                    ]
                };
                app.data.paper[partIndex].list.push(newType);
            }
            // 来自编辑
            if (_this.isEdit == 1) {
                app.data.paper[pid].list[tid].title = title;
                app.data.paper[pid].list[tid].content[0].char = char - 0;
            }
            app.updateDom();
            app.alert.state_alertCnZuowen = false
        },
        closeThisModal: function () {
            app.alert.state_alertCnZuowen = false
        }
    }
});

/*========
 添加-英语作文
 ========*/

Vue.component("alert-en-zuowen", {
    mixins: [VueMixin_AddQuesOrderConfig],
    template: "#tpl-alert-en-zuowen",
    props: ["modal", "examOrderIDArray"],
    data: function () {
        return {
            isEdit: 0,
            defValue: {
                title: "书面表达",
                hline: 10
            },
            addFor: {}
        }
    },
    created: function () {
        var _this = this;
        Bus.$on("showAlertEditEnZuowen", function (pid, tid) {
            _this.addFor.pid = pid;
            _this.addFor.tid = tid;
            _this.isEdit = 1;
        });
        Bus.$on("showAlertEnZuowen", function (data) {
            _this.isEdit = 0;
            _this.computedOrderID = app.examOrderIDArray.max + 1;
            console.log("_this.computedOrderID",_this.computedOrderID,app.examOrderIDArray.max);
        })
    },
    methods: {
        yesBtn: function () {
            var _this = this,
                pid = _this.addFor.pid,
                tid = _this.addFor.tid;
            var $zuowenForm = $("#EN_zuowenForm"),
                title = $zuowenForm.find("[name=en-zuowen-title]").val(),
                hline = $zuowenForm.find("[name=en-zuowen-hline]").val() - 0;
            _this.defValue.title = title;
            _this.defValue.hline = hline;
            // 来自添加
            if (_this.isEdit == 0) {
                var newOrder = _this.computedOrderID;
                var newType = {
                    'title': title,
                    'display': 1,
                    'type': 4,
                    'content': [
                        {'order': newOrder, 'uline': 1, 'hline': hline, 'score': 20, 'desc': ''}
                    ]
                };
                var partLen = app.data.paper.length;
                app.data.paper[partLen - 1].list.push(newType);
            }
            // 来自编辑
            if (_this.isEdit == 1) {
                app.data.paper[pid].list[tid].title = title;
                app.data.paper[pid].list[tid].content[0].hline = hline - 0;
            }
            app.updateDom();
            app.alert.state_alertEnZuowen = false
        },
        closeThisModal: function () {
            app.alert.state_alertEnZuowen = false
        }
    }
});