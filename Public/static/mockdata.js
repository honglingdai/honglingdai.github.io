define(["mock"], function (require, exports) {
    // 模拟数据
    Mock.setup({
        timeout: 200
    });
        /*请求地址*/
    var reg = /\/Review\/Index\/getApi\.html/;
    Mock.mock(reg, "post", function(opt) {
        var body = opt.body;
        // 首页列表
        if(body.indexOf("reviewList")!=-1){
            return Mock.mock({
                'data':  {
                "PageNum": 2,
                "FirstSubList": [{
                    "SubjectID": "3",
                    "SubjectName": "语文",
                    "IfSwitch": "0",
                    "ExamTime": "2016-11-02 09:00:01",
                    "ExamID": 9,
                    "ExamState": 2,
                    "SubjectList": [{
                        "SubjectID": "3",
                        "OrderID": "0",
                        "SubjectName": "语文",
                        "IfSwitch": "0",
                        "ExamTime": "2016-11-02 09:00:01"
                    }],
                    "ExamName": "2016年普通高招全国统一考试临考预测押题密卷考试",
                    "GradeName": "高三",
                    "StudentNum": "148",
                    "ReviewNum": 144
                }, {
                    "SubjectID": 3,
                    "SubjectName": "语文",
                    "IfSwitch": "0",
                    "ExamTime": "2005-04-04 00:27:43",
                    "ExamID": 5,
                    "ExamState": 2,
                    "SubjectList": [{
                        "SubjectID": 3,
                        "OrderID": "0",
                        "SubjectName": "语文",
                        "IfSwitch": "0",
                        "ExamTime": "2005-04-04 00:27:43"
                    }, {
                        "SubjectID": 4,
                        "OrderID": "0",
                        "SubjectName": "理科数学",
                        "IfSwitch": "0",
                        "ExamTime": "1970-01-01 08:00:00"
                    }],
                    "ExamName": "河南省郑州市联考 2016",
                    "GradeName": "高二",
                    "StudentNum": "1",
                    "ReviewNum": 0
                }]
            },
                'info': 'success',
                'status': 1
            })
        }
    });
    // var MOCK = {
    //     init: function () {
    //         var e = this;
    //         e.login();
    //         e.progress.totalInfo();
    //         e.progress.paperTotal();
    //         e.progress.markingPaperTotal();
    //         e.markingTaskList();
    //         e.markingTaskDetail();
    //         e.stuInfoTotal();
    //         e.markingStatus();
    //         e.markingTaskAboutSubject();
    //         //样卷对比
    //         e.tempPaperCompare();
    //         //评分标准
    //         e.markingStandard();
    //         //批阅
    //         e.marking.getQuesItem();
    //         e.marking.getMarkingState();
    //         e.marking.getMarkedList();
    //         //自检
    //         e.review.getDetails();
    //         e.review.getRecordList();
    //         e.review.getQuesImg();
    //     },
    //     //登录验证
    //     login: function () {
    //         Mock.mock(/login/, "post", function (options) {
    //             var opt = options || {};
    //             var bd = opt.body;
    //             console.log(bd);
    //             if (bd.indexOf("userName=qqqq&password=qqqq") != -1) {
    //                 return Mock.mock({
    //                     'data': {
    //                         "status": 1,
    //                         'msg': '登录成功'
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             } else {
    //                 return Mock.mock({
    //                     'data': {
    //                         "status": 0,
    //                         'msg': '用户名或密码错误'
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             }
    //         })
    //     },
    //     //进度查询
    //     progress:{//考试统计

    //         markingPaperTotal: function () {
    //             var reg = /\/getApi\.html\?markingPaperTotal/;
    //             Mock.mock(reg,"get",function(){
    //                 return Mock.mock({
    //                     'data|3': [{
    //                         'time': '@date("MM-dd")',
    //                         'total|200-300': 200
    //                     }],
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         //阅卷统计
    //         paperTotal: function () {
    //             var reg = /\/getApi\.html\?paperTotal/;
    //             Mock.mock(reg,"get",function(){
    //                 return Mock.mock({
    //                     'data': {
    //                         'series':[[2,0],[0.5,22], [1,25],[1.5,40],[2,50],[3,200],[4,230]],
    //                         'average':3
    //                         //'Score': ['0', '0.5', '1.5', '2', '2.5', '3', '3.5'],
    //                         //'PeoTotal': [2, 33, 45, 56, 200, 268, 34]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         totalInfo: function () {
    //             var reg = /\/getApi\.html\?totalInfo/;
    //             Mock.mock(reg,"get",function(){
    //                 return Mock.mock({
    //                     'data': {
    //                         'subjectName':'语文',
    //                         'quesNum': 2,
    //                         'markedNum': 239,
    //                         'peopleNum': 500,
    //                         'averageScore': 3.54,
    //                         'fullScore': 10,
    //                         'averageSpeed': '120/份'
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         }
    //     },
    //     //阅卷详情
    //     //考生情况统计
    //     stuInfoTotal: function () {
    //         var reg = /\/getApi\.html\?stuInfoTotal/;
    //         Mock.mock(reg,"get",function(){
    //             return Mock.mock({
    //                 'data': {
    //                     'category': ['异常卷', '空白卷', '缺考', '实际人数', '考生人数'],
    //                     'total': [1, 2, 2, 490, 500][1, 2, 2, 490, 500],
    //                     'totalAll': 500
    //                 },
    //                 'info': 'success',
    //                 'status': 1
    //             })
    //         })

    //     },
    //     //阅卷情况统计
    //     markingStatus: function () {
    //         var reg = /\/getApi\.html\?markingStatus/;
    //         Mock.mock(reg,"get",function(){
    //             return Mock.mock({
    //                 'data': {
    //                     'peopleNum': 500,
    //                     'markedNum|0-200': 0,
    //                     'scannedNum|200-500': 0
    //                 },
    //                 'info': 'success',
    //                 'status': 1
    //             })
    //         })

    //     },
    //     //试卷批阅任务列表
    //     markingTaskList: function () {
    //         Mock.mock(/\/getApi\.html\/getTaskList/, function () {
    //             return Mock.mock({
    //                 'data|6': [{
    //                     'taskID|+1': 0,
    //                     'statusInfo|0-1': 0,
    //                     'taskName': '2017-@city(true)第一中学高三上学期第一阶段考试',
    //                     'subjectList': [
    //                         {
    //                             'subjectName': '语文',
    //                             'subjectID': 12,
    //                             'finished|150-300': 201
    //                         }, {
    //                             'subjectName': '数学',
    //                             'subjectID': 13,
    //                             'finished': 216
    //                         }, {
    //                             'subjectName': '英语',
    //                             'subjectID': 14,
    //                             'finished': 232
    //                         }
    //                     ],
    //                     'time': '@date()',
    //                     'gradeName': '高三',
    //                     'peopleNum': 500
    //                 }],
    //                 'info': "success",
    //                 'status': 1
    //             })
    //         })
    //     },
    //     //学科对应信息
    //     markingTaskAboutSubject: function () {
    //         Mock.mock(/\/getApi\.html\/taskID\/subjectID/, function () {
    //             return Mock.mock({
    //                 'data': {
    //                     'finished|150-300': 201
    //                 },
    //                 'info': "success",
    //                 'status': 1
    //             })
    //         });
    //     },
    //     //考试详情
    //     markingTaskDetail: function () {
    //         var reg = /\getApi\.html\?markingTaskDetail/;
    //         Mock.mock(reg, "get", function () {
    //             return Mock.mock({
    //                 'data': {
    //                     'taskID': 0,
    //                     'statusInfo|0-1': 0,
    //                     'taskName': '2017-@city(true)第一中学高三上学期第一阶段考试',
    //                     'subjectList': [{
    //                         'subjectName': '语文',
    //                         'subjectID': 1,
    //                         'finished|150-300': 201
    //                     }, {'subjectName': '数学', 'subjectID': 2, 'finished': 216}, {
    //                         'subjectName': '英语',
    //                         'subjectID': 3,
    //                         'finished': 232
    //                     }],
    //                     'time': '@date()',
    //                     'gradeName': '高三',
    //                     'peopleNum': 500,
    //                     'realNum|488-495': 490,
    //                     'missingNum|1-3': 2,
    //                     'blankNum|1-3': 2,
    //                     'abnormalNum|1-3': 2,
    //                     'markingTotal': 490,
    //                     'markedNum': 200,
    //                     'scannedNum': 488
    //                 },
    //                 'info': "success",
    //                 'status': 1
    //             })
    //         })

    //     },
    //     //评分标准
    //     markingStandard: function () {
    //         var reg = /\getApi\.html\?markingStandard/;
    //         Mock.mock(reg, "get", function () {
    //             return Mock.mock({
    //                 data: {
    //                     'examid': '293844',
    //                     'examTitle': '2017届湖南省岳阳第一中学高三上学期第一阶段考试语文',
    //                     'quesName': ['一、论述类文本阅读（15分）', '二、古诗文阅读（15分）', '三、文言文阅读（20分）', '四、古代诗歌阅读（12分）', '五、名句默写（12分）', '六、古代诗歌阅读（12分）', '七、名句默写（12分）'],
    //                     'quesAnswer': [
    //                         [
    //                             {'quesid': '00001', 'answer': 'A'},
    //                             {'quesid': '00002', 'answer': 'A'},
    //                             {'quesid': '00003', 'answer': 'A'},
    //                             {'quesid': '00004', 'answer': 'A'},
    //                             {'quesid': '00005', 'answer': 'A'}
    //                         ], [
    //                             {'quesid': '00006', 'answer': 'A'},
    //                             {'quesid': '00007', 'answer': 'A'},
    //                             {'quesid': '00008', 'answer': 'A'},
    //                             {'quesid': '00009', 'answer': 'A'},
    //                             {'quesid': '00010', 'answer': 'A'}
    //                         ], [
    //                             {
    //                                 'quesid': '00011',
    //                                 'answer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                                 'rules': ''
    //                             }, {
    //                                 'quesid': '00012',
    //                                 'answer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                                 'rules': 'A、“班列”指“朝廷”“ 朝廷官员”不包括地方官员。因此答为“朝廷官员”“朝中官员”“朝堂之上的官员”“朝廷中大臣”、“大臣们”均可，如果答成“群臣”“众臣”“官员”“官吏”“百官”、“文武百官”等不得分； B 、推心：“诚心诚意”“全心”“一心”“推心置腹”“真心真意”均可。如答成“放心”“变心”“安心”“衷心”不得分；（说明：答出“诚”、“真”的意思，未答出者不得分。） C、莫：“没有人”“没有谁”如答成“没有”“不能”不得分；（说明：必须将否定代词翻译出来。） D、大意分：句意完整2分，句意对但不完整，内容有缺项者得一分，句意与原文无关者不得分； E、句意翻译与关键词不重复扣分。'
    //                             }]
    //                         , [
    //                             {
    //                                 'quesid': '00013',
    //                                 'answer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                                 'rules': 'A、“班列”指“朝廷”“ 朝廷官员”不包括地方官员。因此答为“朝廷官员”“朝中官员”“朝堂之上的官员”“朝廷中大臣”、“大臣们”均可，如果答成“群臣”“众臣”“官员”“官吏”“百官”、“文武百官”等不得分； B 、推心：“诚心诚意”“全心”“一心”“推心置腹”“真心真意”均可。如答成“放心”“变心”“安心”“衷心”不得分；（说明：答出“诚”、“真”的意思，未答出者不得分。） C、莫：“没有人”“没有谁”如答成“没有”“不能”不得分；（说明：必须将否定代词翻译出来。） D、大意分：句意完整2分，句意对但不完整，内容有缺项者得一分，句意与原文无关者不得分； E、句意翻译与关键词不重复扣分。'
    //                             }, {
    //                                 'quesid': '00014',
    //                                 'answer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                                 'rules': 'A、“班列”指“朝廷”“ 朝廷官员”不包括地方官员。因此答为“朝廷官员”“朝中官员”“朝堂之上的官员”“朝廷中大臣”、“大臣们”均可，如果答成“群臣”“众臣”“官员”“官吏”“百官”、“文武百官”等不得分； B 、推心：“诚心诚意”“全心”“一心”“推心置腹”“真心真意”均可。如答成“放心”“变心”“安心”“衷心”不得分；（说明：答出“诚”、“真”的意思，未答出者不得分。） C、莫：“没有人”“没有谁”如答成“没有”“不能”不得分；（说明：必须将否定代词翻译出来。） D、大意分：句意完整2分，句意对但不完整，内容有缺项者得一分，句意与原文无关者不得分； E、句意翻译与关键词不重复扣分。'
    //                             }],
    //                         [{
    //                             'quesid': '00015',
    //                             'answer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                             'rules': 'A、“班列”指“朝廷”“ 朝廷官员”不包括地方官员。因此答为“朝廷官员”“朝中官员”“朝堂之上的官员”“朝廷中大臣”、“大臣们”均可，如果答成“群臣”“众臣”“官员”“官吏”“百官”、“文武百官”等不得分； B 、推心：“诚心诚意”“全心”“一心”“推心置腹”“真心真意”均可。如答成“放心”“变心”“安心”“衷心”不得分；（说明：答出“诚”、“真”的意思，未答出者不得分。） C、莫：“没有人”“没有谁”如答成“没有”“不能”不得分；（说明：必须将否定代词翻译出来。） D、大意分：句意完整2分，句意对但不完整，内容有缺项者得一分，句意与原文无关者不得分； E、句意翻译与关键词不重复扣分。'
    //                         }],
    //                         [{
    //                             'quesid': '00016',
    //                             'answer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                             'rules': 'A、“班列”指“朝廷”“ 朝廷官员”不包括地方官员。因此答为“朝廷官员”“朝中官员”“朝堂之上的官员”“朝廷中大臣”、“大臣们”均可，如果答成“群臣”“众臣”“官员”“官吏”“百官”、“文武百官”等不得分； B 、推心：“诚心诚意”“全心”“一心”“推心置腹”“真心真意”均可。如答成“放心”“变心”“安心”“衷心”不得分；（说明：答出“诚”、“真”的意思，未答出者不得分。） C、莫：“没有人”“没有谁”如答成“没有”“不能”不得分；（说明：必须将否定代词翻译出来。） D、大意分：句意完整2分，句意对但不完整，内容有缺项者得一分，句意与原文无关者不得分； E、句意翻译与关键词不重复扣分。'
    //                         }],
    //                         [{
    //                             'quesid': '00017',
    //                             'answer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                             'rules': 'A、“班列”指“朝廷”“ 朝廷官员”不包括地方官员。因此答为“朝廷官员”“朝中官员”“朝堂之上的官员”“朝廷中大臣”、“大臣们”均可，如果答成“群臣”“众臣”“官员”“官吏”“百官”、“文武百官”等不得分； B 、推心：“诚心诚意”“全心”“一心”“推心置腹”“真心真意”均可。如答成“放心”“变心”“安心”“衷心”不得分；（说明：答出“诚”、“真”的意思，未答出者不得分。） C、莫：“没有人”“没有谁”如答成“没有”“不能”不得分；（说明：必须将否定代词翻译出来。） D、大意分：句意完整2分，句意对但不完整，内容有缺项者得一分，句意与原文无关者不得分； E、句意翻译与关键词不重复扣分。'
    //                         }]
    //                     ]
    //                 },
    //                 'info': "success",
    //                 'status': 1

    //             })
    //         })

    //     },
    //     //样卷对比
    //     tempPaperCompare: function () {
    //         var reg = /\getApi\.html\?tempPaperCompare/;
    //         Mock.mock(reg, "get", function () {
    //             return Mock.mock({
    //                 'data': {
    //                     'quesTitle': '2017届湖南省岳阳第一中学高三上学期第一阶段考试语文(第7题)',
    //                     'quesTemp': [
    //                         {
    //                             'quesNum': '7',
    //                             'quesAnswer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                             'quesImg|1-2': [Mock.Random.image('800x100')]
    //                         }, {
    //                             'quesNum': '7',
    //                             'quesAnswer': '于是暗中结交亲戚及好友数十户人家，想要去东南避难。',
    //                             'quesImg|1-2': [Mock.Random.image('900x100')]
    //                         }
    //                     ],
    //                     'quesCurrent': [
    //                         {
    //                             'quesImg|2': [Mock.Random.image('800x100')]
    //                         }
    //                     ]
    //                 },
    //                 'info': "success",
    //                 'status': 1

    //             })

    //         })


    //     },
    //     //-----评卷-----
    //     marking: {
    //         //获取试题
    //         getQuesItem: function () {
    //             var reg = /\/getApi\.html\?getQuesItem/;
    //             Mock.mock(reg,"get",function(){
    //                 return Mock.mock({
    //                     'data': {
    //                         'subjectID': '12',
    //                         'quesID': '29323',
    //                         'quesTitle': '2017届湖南省岳阳第一中学高三上学期第一阶段考试语文(第7题)',
    //                         'quesNum': '7',
    //                         'score': '10',
    //                         'quesImg': Mock.Random.image(),
    //                         'subNum|1-20': 0,
    //                         'subScore|20': ['5']
    //                     },
    //                     'info': "success",
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         //获取试题
    //         getMarkingState: function () {
    //             var reg =/\/getApi\.html\?getMarkingState/;
    //             Mock.mock(reg,"get",function(){
    //                 return Mock.mock({
    //                     'data': {
    //                         'examID': 2732929948272,
    //                         'subjectID': '12',
    //                         'currentQues': '7',
    //                         'subNum|1-20': 1,
    //                         'marked': '104',
    //                         'total': '493',
    //                         'averageScore': '2.34'
    //                     },
    //                     'info': "success",
    //                     'status': 1
    //                 })
    //             })

    //         },
    //         getMarkedList: function () {
    //             var reg =/\/getApi\.html\?getMarkedList/;
    //             Mock.mock(reg,"get",function(){
    //                 return Mock.mock({
    //                     'data': {
    //                         'subjectID': '12',
    //                         'list|10': [
    //                             {'subjectID': '12', 'quesID|+1': '00001', 'score': '3'}
    //                         ]
    //                     },
    //                     'info': "success",
    //                     'status': 1
    //                 })
    //             })
    //         }
    //     },
    //     review: {
    //         //获取批阅历史列表
    //         getRecordList: function () {
    //             var reg =/\/getApi\.html\?getRecordList/;
    //             Mock.mock(reg,"get",function(){
    //                 return Mock.mock({
    //                     'data': {
    //                         'subjectID': '12',
    //                         'list|39': [
    //                             {
    //                                 'subjectID': 12,
    //                                 'quesID': '000001',
    //                                 'score|0-10': 3
    //                             }
    //                         ]
    //                     },
    //                     'info': "success",
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         //获取试题
    //         getQuesImg: function () {
    //             var reg =/\/getApi\.html\?getQuesImg/;
    //             Mock.mock(reg,"get",function(){
    //                 return Mock.mock({
    //                     'data': {
    //                         'quesImg': Mock.Random.image()
    //                     },
    //                     'info': "success",
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         //获取试题
    //         getDetails: function () {
    //             var reg = /\getApi\.html\?getDetails/;
    //             Mock.mock(reg, "get", function () {
    //                 return Mock.mock({
    //                     'data': {
    //                         'subjectID': '12',
    //                         'quesID': '29323',
    //                         'quesNum': '7',
    //                         'score': '10',
    //                         'subScore|1-20': ['3']
    //                     },
    //                     'info': "success",
    //                     'status': 1
    //                 })
    //             })
    //         }
    //     }
    // };
    // //MOCK.init();
    // exports.MOCK = MOCK;
});