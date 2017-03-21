define(["mock"], function(require, exports) {
    // 模拟数据
    Mock.setup({
        timeout: 100
    });
    /*请求地址*/
    var reg = /\/Analysis\/Index\/getApi\.html/;
    Mock.mock(reg, "post", function(opt) {
        var body = opt.body;
            // 登录
        if(body.indexOf("login")!= -1){
            if (body.indexOf("userName=qqqq&password=qqqq") != -1) {
                return Mock.mock({
                    'data': {
                        "status": 1,
                        'msg': '登录成功'
                    },
                    'info': 'success',
                    'status': 1
                })
            } else {
                return Mock.mock({
                    'data': {
                        "status": 0,
                        'msg': '用户名或密码错误'
                    },
                    'info': 'success',
                    'status': 1
                })
            }
        }
        // 首页列表
        if(body.indexOf("getExamList")!=-1){
            return Mock.mock({
                'data':  {
                "StartTime": "1970-01-01",
                "EndTime": "2017-03-10",
                "Page": 1,
                "UserName": "yang",
                "PageNum": 1,
                "ExamList": [{
                    "ExamName": "2016大联考一（理科）",
                    "ExamID": "15",
                    "AddTime": "2016-11-23",
                    "GradeName": "高三",
                    "Status": 1
                }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 首页弹窗
        if(body.indexOf("getPowerList")!=-1){
            return Mock.mock({
                'data':   [{
                    "RoleID": 0,
                    "RoleName": "学生",
                    "AttrList": [{
                        "AttrID": "6100",
                        "AttrName": "tUn"
                    }, {
                        "AttrID": "6153",
                        "AttrName": "vJQ"
                    }, {
                        "AttrID": "6076",
                        "AttrName": "rdr"
                    }, {
                        "AttrID": "6075",
                        "AttrName": "t02"
                    }, {
                        "AttrID": "6074",
                        "AttrName": "kU3"
                    }, {
                        "AttrID": "6073",
                        "AttrName": "2O3"
                    }, {
                        "AttrID": "6054",
                        "AttrName": "FAy"
                    }, {
                        "AttrID": "6053",
                        "AttrName": "QW5"
                    }, {
                        "AttrID": "6097",
                        "AttrName": "YBw"
                    }, {
                        "AttrID": "6098",
                        "AttrName": "XgE"
                    }, {
                        "AttrID": "6052",
                        "AttrName": "H3d"
                    }, {
                        "AttrID": "6051",
                        "AttrName": "Yp7"
                    }]
                }, {
                    "RoleID": 1,
                    "RoleName": "学科教师",
                    "AttrList": [{
                        "AttrID": "103",
                        "AttrName": "高三三班"
                    }, {
                        "AttrID": "102",
                        "AttrName": "高三二班"
                    }, {
                        "AttrID": "101",
                        "AttrName": "高三一班"
                    }],
                    "SubjectList": [{
                        "AttrID": "3",
                        "AttrName": "语文"
                    }, {
                        "AttrID": "4",
                        "AttrName": "理科数学"
                    }, {
                        "AttrID": "6",
                        "AttrName": "英语"
                    }, {
                        "AttrID": "9",
                        "AttrName": "物理"
                    }, {
                        "AttrID": "10",
                        "AttrName": "化学"
                    }, {
                        "AttrID": "11",
                        "AttrName": "生物"
                    }]
                }, {
                    "RoleID": 2,
                    "RoleName": "班主任",
                    "AttrList": [{
                        "AttrID": "102",
                        "AttrName": "高三二班"
                    }, {
                        "AttrID": "101",
                        "AttrName": "高三一班"
                    }]
                }, {
                    "RoleID": 3,
                    "RoleName": "教务主任",
                    "AttrList": [{
                        "AttrID": "41",
                        "AttrName": "开封市十三中"
                    }, {
                        "AttrID": "40",
                        "AttrName": "开封市七中"
                    }]
                }, {
                    "RoleID": 4,
                    "RoleName": "校长",
                    "AttrList": [{
                        "AttrID": "43",
                        "AttrName": "洛阳十中"
                    }, {
                        "AttrID": "42",
                        "AttrName": "洛阳六中"
                    }, {
                        "AttrID": "40",
                        "AttrName": "开封市七中"
                    }]
                }, {
                    "RoleID": 5,
                    "RoleName": "区域",
                    "AttrList": [{
                        "AttrID": "1360",
                        "AttrName": "老城区"
                    }, {
                        "AttrID": "1350",
                        "AttrName": "龙亭区"
                    }]
                }],
                'info': 'success',
                'status': 1
            })
        }
        // 学生头部
        if(body.indexOf("getSubjectTop")!=-1){
            return Mock.mock({
                'data':  {
                        "ExamName": "2016大联考一（理科）",
                "ExamAddTime": "2016-11-23",
                "GradeName": "高三",
                "SchoolName": "开封市七中",
                "ClassName": "高三一班",
                "SubjectList": [{
                    "SubjectID": "3",
                    "SubjectName": "语文"
                }, {
                    "SubjectID": "4",
                    "SubjectName": "理科数学"
                }, {
                    "SubjectID": "6",
                    "SubjectName": "英语"
                }, {
                    "SubjectID": "9",
                    "SubjectName": "物理"
                }, {
                    "SubjectID": "10",
                    "SubjectName": "化学"
                }, {
                    "SubjectID": "11",
                    "SubjectName": "生物"
                }],
                "SubjectID": "3"
            },
                'info': 'success',
                'status': 1
            })
        }
        // 学生成绩概况
        if(body.indexOf("getScoreList")!=-1){
            return Mock.mock({
                'data':  [{
                "SubjectID": "0",
                "SubjectName": "总分",
                "Score": 415,
                "TotalOrder": "445",
                "SchoolOrder": "57",
                "ClassOrder": "13",
                "ZScore": 0.2,
                "Level": "B"
            }, {
                "SubjectID": "3",
                "SubjectName": "语文",
                "Score": 84,
                "TotalOrder": "618",
                "SchoolOrder": "76",
                "ClassOrder": "15",
                "ZScore": 0.2,
                "Level": "B"
            }, {
                "SubjectID": "4",
                "SubjectName": "理科数学",
                "Score": 70,
                "TotalOrder": "1189",
                "SchoolOrder": "149",
                "ClassOrder": "31",
                "ZScore": -0.2,
                "Level": "C"
            }, {
                "SubjectID": "6",
                "SubjectName": "英语",
                "Score": 92,
                "TotalOrder": "458",
                "SchoolOrder": "56",
                "ClassOrder": "11",
                "ZScore": 0.5,
                "Level": "B"
            }, {
                "SubjectID": "9",
                "SubjectName": "物理",
                "Score": 60,
                "TotalOrder": "510",
                "SchoolOrder": "65",
                "ClassOrder": "12",
                "ZScore": 0.5,
                "Level": "B"
            }, {
                "SubjectID": "10",
                "SubjectName": "化学",
                "Score": 47,
                "TotalOrder": "1127",
                "SchoolOrder": "142",
                "ClassOrder": "28",
                "ZScore": -0.3,
                "Level": "C"
            }, {
                "SubjectID": "11",
                "SubjectName": "生物",
                "Score": 62,
                "TotalOrder": "456",
                "SchoolOrder": "61",
                "ClassOrder": "14",
                "ZScore": 0.6,
                "Level": "B"
            }],
                'info': 'success',
                'status': 1
            })
        }
        // 学生成绩排名
        if(body.indexOf("getScoreRank")!=-1){
            return Mock.mock({
                'data': {
                "ClassCount": "50",
                "SchoolCount": "250",
                "ExamCount": "2000",
                "ScoreList": [{
                    "SubjectID": "0",
                    "SubjectName": "总分",
                    "TotalOrder": "445",
                    "TotalPer": 22,
                    "SchoolOrder": "57",
                    "SchoolPer": 23,
                    "ClassOrder": "13",
                    "ClassPer": 26,
                    "ClassTranscend": 76,
                    "SchoolTranscend": 78,
                    "TotalTranscend": 78
                }, {
                    "SubjectID": "3",
                    "SubjectName": "语文",
                    "TotalOrder": "618",
                    "TotalPer": 31,
                    "SchoolOrder": "76",
                    "SchoolPer": 30,
                    "ClassOrder": "15",
                    "ClassPer": 30,
                    "ClassTranscend": 72,
                    "SchoolTranscend": 70,
                    "TotalTranscend": 69
                }, {
                    "SubjectID": "4",
                    "SubjectName": "理科数学",
                    "TotalOrder": "1189",
                    "TotalPer": 59,
                    "SchoolOrder": "149",
                    "SchoolPer": 60,
                    "ClassOrder": "31",
                    "ClassPer": 62,
                    "ClassTranscend": 40,
                    "SchoolTranscend": 41,
                    "TotalTranscend": 41
                }, {
                    "SubjectID": "6",
                    "SubjectName": "英语",
                    "TotalOrder": "458",
                    "TotalPer": 23,
                    "SchoolOrder": "56",
                    "SchoolPer": 22,
                    "ClassOrder": "11",
                    "ClassPer": 22,
                    "ClassTranscend": 80,
                    "SchoolTranscend": 78,
                    "TotalTranscend": 77
                }, {
                    "SubjectID": "9",
                    "SubjectName": "物理",
                    "TotalOrder": "510",
                    "TotalPer": 26,
                    "SchoolOrder": "65",
                    "SchoolPer": 26,
                    "ClassOrder": "12",
                    "ClassPer": 24,
                    "ClassTranscend": 78,
                    "SchoolTranscend": 74,
                    "TotalTranscend": 75
                }, {
                    "SubjectID": "10",
                    "SubjectName": "化学",
                    "TotalOrder": "1127",
                    "TotalPer": 56,
                    "SchoolOrder": "142",
                    "SchoolPer": 57,
                    "ClassOrder": "28",
                    "ClassPer": 56,
                    "ClassTranscend": 46,
                    "SchoolTranscend": 44,
                    "TotalTranscend": 44
                }, {
                    "SubjectID": "11",
                    "SubjectName": "生物",
                    "TotalOrder": "456",
                    "TotalPer": 23,
                    "SchoolOrder": "61",
                    "SchoolPer": 24,
                    "ClassOrder": "14",
                    "ClassPer": 28,
                    "ClassTranscend": 74,
                    "SchoolTranscend": 76,
                    "TotalTranscend": 77
                }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 最高分与平均分对比
        if(body.indexOf("getScoreMax")!=-1){
            return Mock.mock({
                'data': {
                "ExamScore": 750,
                "ScoreList": [{
                    "SubjectID": "0",
                    "SubjectName": "总分",
                    "Score": 415,
                    "ClassAvg": 393.9,
                    "ClassMax": 655,
                    "SchoolAvg": 392.7,
                    "SchoolMax": 667,
                    "ExamAvg": 391.3,
                    "ExamMax": 667
                }, {
                    "SubjectID": "3",
                    "SubjectName": "语文",
                    "Score": 84,
                    "ClassAvg": 79,
                    "ClassMax": 143,
                    "SchoolAvg": 79.4,
                    "SchoolMax": 144,
                    "ExamAvg": 78.7,
                    "ExamMax": 144
                }, {
                    "SubjectID": "4",
                    "SubjectName": "理科数学",
                    "Score": 70,
                    "ClassAvg": 79.7,
                    "ClassMax": 143,
                    "SchoolAvg": 78.6,
                    "SchoolMax": 143,
                    "ExamAvg": 78.3,
                    "ExamMax": 144
                }, {
                    "SubjectID": "6",
                    "SubjectName": "英语",
                    "Score": 92,
                    "ClassAvg": 79.8,
                    "ClassMax": 129,
                    "SchoolAvg": 78.4,
                    "SchoolMax": 135,
                    "ExamAvg": 78.6,
                    "ExamMax": 138
                }, {
                    "SubjectID": "9",
                    "SubjectName": "物理",
                    "Score": 60,
                    "ClassAvg": 51.2,
                    "ClassMax": 86,
                    "SchoolAvg": 51.6,
                    "SchoolMax": 87,
                    "ExamAvg": 51.8,
                    "ExamMax": 90
                }, {
                    "SubjectID": "10",
                    "SubjectName": "化学",
                    "Score": 47,
                    "ClassAvg": 52.4,
                    "ClassMax": 89,
                    "SchoolAvg": 52.2,
                    "SchoolMax": 89,
                    "ExamAvg": 52,
                    "ExamMax": 89
                }, {
                    "SubjectID": "11",
                    "SubjectName": "生物",
                    "Score": 62,
                    "ClassAvg": 51.7,
                    "ClassMax": 88,
                    "SchoolAvg": 52.4,
                    "SchoolMax": 93,
                    "ExamAvg": 51.9,
                    "ExamMax": 93
                }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 成绩进步程度
        if(body.indexOf("getScoreGrade")!=-1){
            return Mock.mock({
                'data': {
                "ExamScore": 750,
                "ExamList": [{
                    "ExamID": "15",
                    "ExamName": "2016大联考一（理科）",
                    "ExamPer": 22,
                    "SchoolPer": 23,
                    "ClassPer": 26,
                    "ExamGrade": 0,
                    "SchoolGrade": 0,
                    "ClassGrade": 0
                }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 各科考试情况
        if(body.indexOf("getSubjectSwot")!=-1){
            return Mock.mock({
                'data': {
                "ExamContent": "你本次联考的成绩大大低于预测成绩，要努力学习啦！",
                    "BadSubject": [{
                        "SubjectName": "语文",
                        "Content": "语文注重积累和感悟。平时注意多读多悟，积累写作材料，提高阅读理解与写作能力"
                    }],
                    "GoodSubject": [{
                        "SubjectName": "英语",
                        "Content": "英语注重单词积累、语法运用和翻译。平时注意词汇量的积累，提高阅读理解与写作能力"
                    }, {
                        "SubjectName": "生物",
                        "Content": "生物注重核心知识的理解和运用。平时注意提高从图表中获取信息进行分析与实验探究"
                    }],
                    "SubjectList": [{
                        "SubjectID": "3",
                        "SubjectName": "语文",
                        "Score": 23,
                        "ScoreLine": "下线",
                        "SubjectScore": 150,
                        "ALine": 126,
                        "BLine": 82
                    }, {
                        "SubjectID": "4",
                        "SubjectName": "理科数学",
                        "Score": 32,
                        "ScoreLine": "下线",
                        "SubjectScore": 150,
                        "ALine": 126,
                        "BLine": 82
                    }, {
                        "SubjectID": "6",
                        "SubjectName": "英语",
                        "Score": 54,
                        "ScoreLine": "下线",
                        "SubjectScore": 150,
                        "ALine": 126,
                        "BLine": 82
                    }, {
                        "SubjectID": "9",
                        "SubjectName": "物理",
                        "Score": 30,
                        "ScoreLine": "下线",
                        "SubjectScore": 100,
                        "ALine": 84,
                        "BLine": 54.7
                    }, {
                        "SubjectID": "10",
                        "SubjectName": "化学",
                        "Score": 27,
                        "ScoreLine": "下线",
                        "SubjectScore": 100,
                        "ALine": 84,
                        "BLine": 54.7
                    }, {
                        "SubjectID": "11",
                        "SubjectName": "生物",
                        "Score": 35,
                        "ScoreLine": "下线",
                        "SubjectScore": 100,
                        "ALine": 84,
                        "BLine": 54.7
                    }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 小结
        if(body.indexOf("studentsummary")!=-1){
            return Mock.mock({
                'data': {
                "ExamCount": "2000",
                "SchoolCount": "250",
                "ClassCount": "50",
                "UserName": "张大明",
                "Score": 201,
                "ExamOrder": "1699",
                "SchoolOrder": "212",
                "ClassOrder": "43",
                "SchoolPercent": "16%"
            },
                'info': 'success',
                'status': 1
            })
        }
        // 各小题得分分析
        if(body.indexOf("getSubjectAnalysis")!=-1){
            return Mock.mock({
                'data': [{
                "Answer": "A",
                "Analytic": "--",
                "TestID": "248",
                "OrderID": 1,
                "TypesName": "单选题",
                "KlName": "鉴赏环境描写；辨析并修改病句",
                "Score": "10",
                "MyAnswer": "B",
                "Mark": 0,
                "Diff": 0.49,
                "ClassAvg": 4.9,
                "SchoolAvg": 5.1
            }, {
                "Answer": "B",
                "Analytic": "--",
                "TestID": "249",
                "OrderID": 2,
                "TypesName": "单选题",
                "KlName": "分析表达技巧；分析作品结构，概括作品主题，把握文章思路",
                "Score": "10",
                "MyAnswer": "A",
                "Mark": 2,
                "Diff": 0.49,
                "ClassAvg": 4.9,
                "SchoolAvg": 5.3
            }, {
                "Answer": "D",
                "Analytic": "--",
                "TestID": "250",
                "OrderID": 3,
                "TypesName": "单选题",
                "KlName": "文言文阅读；小作文",
                "Score": "10",
                "MyAnswer": "D",
                "Mark": 2,
                "Diff": 0.54,
                "ClassAvg": 5.4,
                "SchoolAvg": 5.2
            }, {
                "Answer": "C",
                "Analytic": "--",
                "TestID": "251",
                "OrderID": 4,
                "TypesName": "单选题",
                "KlName": "评价诗歌的思想内容和作者的观点态度；探究文本中某些问题，提出自己的见解",
                "Score": "10",
                "MyAnswer": "C",
                "Mark": 0,
                "Diff": 0.53,
                "ClassAvg": 5.3,
                "SchoolAvg": 5.5
            }, {
                "Answer": "A",
                "Analytic": "--",
                "TestID": "252",
                "OrderID": 5,
                "TypesName": "单选题",
                "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                "Score": "10",
                "MyAnswer": "C",
                "Mark": 0,
                "Diff": 0.6,
                "ClassAvg": 6,
                "SchoolAvg": 5.5
            }, {
                "Answer": "--",
                "Analytic": "--",
                "TestID": "253",
                "OrderID": 6,
                "TypesName": "综合题",
                "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                "Score": "20",
                "MyAnswer": "--",
                "Mark": 4,
                "Diff": 0.53,
                "ClassAvg": 10.6,
                "SchoolAvg": 10.6
            }, {
                "Answer": "--",
                "Analytic": "--",
                "TestID": "254",
                "OrderID": 7,
                "TypesName": "综合题",
                "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                "Score": "20",
                "MyAnswer": "--",
                "Mark": 3,
                "Diff": 0.5,
                "ClassAvg": 10,
                "SchoolAvg": 10.5
            }, {
                "Answer": "--",
                "Analytic": "--",
                "TestID": "255",
                "OrderID": 8,
                "TypesName": "综合题",
                "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                "Score": "20",
                "MyAnswer": "--",
                "Mark": 5,
                "Diff": 0.55,
                "ClassAvg": 10.9,
                "SchoolAvg": 10.6
            }, {
                "Answer": "--",
                "Analytic": "--",
                "TestID": "256",
                "OrderID": 9,
                "TypesName": "综合题",
                "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                "Score": "20",
                "MyAnswer": "--",
                "Mark": 2,
                "Diff": 0.52,
                "ClassAvg": 10.4,
                "SchoolAvg": 10.5
            }, {
                "Answer": "--",
                "Analytic": "--",
                "TestID": "257",
                "OrderID": 10,
                "TypesName": "综合题",
                "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                "Score": "20",
                "MyAnswer": "--",
                "Mark": 5,
                "Diff": 0.53,
                "ClassAvg": 10.7,
                "SchoolAvg": 10.8
            }],
                'info': 'success',
                'status': 1
            })
        }
        // 各小题得分率对比
        if(body.indexOf("getScoreAverage")!=-1){
            return Mock.mock({
                'data': {
                "ClassCount": "50",
                    "TestList": [{
                        "Order": 1,
                        "UserAvg": 0,
                        "ClassAvg": 49,
                        "SchoolAvg": 51,
                        "ExamAvg": 53
                    }, {
                        "Order": 2,
                        "UserAvg": 20,
                        "ClassAvg": 49,
                        "SchoolAvg": 53,
                        "ExamAvg": 52
                    }, {
                        "Order": 3,
                        "UserAvg": 20,
                        "ClassAvg": 54,
                        "SchoolAvg": 52,
                        "ExamAvg": 53
                    }, {
                        "Order": 4,
                        "UserAvg": 0,
                        "ClassAvg": 53,
                        "SchoolAvg": 55,
                        "ExamAvg": 55
                    }, {
                        "Order": 5,
                        "UserAvg": 0,
                        "ClassAvg": 60,
                        "SchoolAvg": 55,
                        "ExamAvg": 53
                    }, {
                        "Order": 6,
                        "UserAvg": 20,
                        "ClassAvg": 53,
                        "SchoolAvg": 53,
                        "ExamAvg": 52
                    }, {
                        "Order": 7,
                        "UserAvg": 15,
                        "ClassAvg": 50,
                        "SchoolAvg": 52,
                        "ExamAvg": 52
                    }, {
                        "Order": 8,
                        "UserAvg": 25,
                        "ClassAvg": 55,
                        "SchoolAvg": 53,
                        "ExamAvg": 52
                    }, {
                        "Order": 9,
                        "UserAvg": 10,
                        "ClassAvg": 52,
                        "SchoolAvg": 52,
                        "ExamAvg": 52
                    }, {
                        "Order": 10,
                        "UserAvg": 25,
                        "ClassAvg": 53,
                        "SchoolAvg": 54,
                        "ExamAvg": 52
                    }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 章节达成度分析
        if(body.indexOf("getKnowledgefenxi")!=-1){
            return Mock.mock({
                'data':  [{
                "KlName": "语言知识基础",
                "Score": 0,
                "ScoreSum": 10,
                "ALine": 8.4,
                "BLine": 5.5,
                "Level": "D"
            }, {
                "KlName": "古诗文阅读",
                "Score": 2,
                "ScoreSum": 20,
                "ALine": 16.8,
                "BLine": 10.9,
                "Level": "D"
            }, {
                "KlName": "现代文阅读",
                "Score": 21,
                "ScoreSum": 140,
                "ALine": 117.6,
                "BLine": 76.5,
                "Level": "D"
            }, {
                "KlName": "作文",
                "Score": 2,
                "ScoreSum": 10,
                "ALine": 8.4,
                "BLine": 5.5,
                "Level": "D"
            }],
                'info': 'success',
                'status': 1
            })
        }
        // 单科成绩进步程度
        if(body.indexOf("getSubjectGrade")!=-1){
            return Mock.mock({
                'data':  {
                "SubjectScore": 150,
                "ExamList": [{
                    "ExamID": "15",
                    "ExamName": "2016大联考一（理科）",
                    "ExamPer": 7,
                    "SchoolPer": 5,
                    "ClassPer": 6,
                    "ExamGrade": 0,
                    "SchoolGrade": 0,
                    "ClassGrade": 0
                }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 知识点掌握情况
        if(body.indexOf("getKnowledgeAnalysis")!=-1){
            return Mock.mock({
                'data':  {
                "BadKnowledge": [{
                    "KnowledgeName": "语言知识基础",
                    "ScoreSum": 10,
                    "MyAvg": 70,
                    "ExamAvg": 53
                }, {
                    "KnowledgeName": "古诗文阅读",
                    "ScoreSum": 20,
                    "MyAvg": 90,
                    "ExamAvg": 54
                }, {
                    "KnowledgeName": "现代文阅读",
                    "ScoreSum": 140,
                    "MyAvg": 56,
                    "ExamAvg": 52
                }],
                "GoodKnowledge": ["作文","阅读理解"]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 教师头部
        if(body.indexOf("teacherexamSummaryTop")!=-1){
            return Mock.mock({
                'data':  {
                "ExamName": "2016大联考一（理科）",
                        "ExamAddTime": "2016-11-23",
                        "GradeName": "高三",
                        "ClassName": "高三三班",
                        "SchoolName": "开封市七中",
                        "SubjectName": "语文"
            },
                'info': 'success',
                'status': 1
            })
        }
        // 教师学科命题分析
        if(body.indexOf("teachersubjectProposition")!=-1){
            return Mock.mock({
                'data':  {
                "TestList": [{
                            "OrderID": 1,
                            "TypesName": "单选题",
                            "Score": "10",
                            "KlName": "鉴赏环境描写；辨析并修改病句",
                            "Answer": "A",
                            "KlPlate": "现代文阅读；语言知识基础",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.28,
                            "TrueDiff": 0.49,
                            "Distinguish": 0.88
                        }, {
                            "OrderID": 2,
                            "TypesName": "单选题",
                            "Score": "10",
                            "KlName": "分析表达技巧；分析作品结构，概括作品主题，把握文章思路",
                            "Answer": "B",
                            "KlPlate": "现代文阅读",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.72,
                            "TrueDiff": 0.58,
                            "Distinguish": 0.82
                        }, {
                            "OrderID": 3,
                            "TypesName": "单选题",
                            "Score": "10",
                            "KlName": "文言文阅读；小作文",
                            "Answer": "D",
                            "KlPlate": "古诗文阅读；作文",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.92,
                            "TrueDiff": 0.45,
                            "Distinguish": 0.84
                        }, {
                            "OrderID": 4,
                            "TypesName": "单选题",
                            "Score": "10",
                            "KlName": "评价诗歌的思想内容和作者的观点态度；探究文本中某些问题，提出自己的见解",
                            "Answer": "C",
                            "KlPlate": "古诗文阅读；现代文阅读",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.15,
                            "TrueDiff": 0.5,
                            "Distinguish": 0.85
                        }, {
                            "OrderID": 5,
                            "TypesName": "单选题",
                            "Score": "10",
                            "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                            "Answer": "A",
                            "KlPlate": "现代文阅读",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.4,
                            "TrueDiff": 0.53,
                            "Distinguish": 0.85
                        }, {
                            "OrderID": 6,
                            "TypesName": "综合题",
                            "Score": "20",
                            "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                            "Answer": "--",
                            "KlPlate": "现代文阅读",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.85,
                            "TrueDiff": 0.52,
                            "Distinguish": 0.46
                        }, {
                            "OrderID": 7,
                            "TypesName": "综合题",
                            "Score": "20",
                            "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                            "Answer": "--",
                            "KlPlate": "现代文阅读",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.42,
                            "TrueDiff": 0.53,
                            "Distinguish": 0.46
                        }, {
                            "OrderID": 8,
                            "TypesName": "综合题",
                            "Score": "20",
                            "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                            "Answer": "--",
                            "KlPlate": "现代文阅读",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.45,
                            "TrueDiff": 0.49,
                            "Distinguish": 0.55
                        }, {
                            "OrderID": 9,
                            "TypesName": "综合题",
                            "Score": "20",
                            "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                            "Answer": "--",
                            "KlPlate": "现代文阅读",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.32,
                            "TrueDiff": 0.52,
                            "Distinguish": 0.46
                        }, {
                            "OrderID": 10,
                            "TypesName": "综合题",
                            "Score": "20",
                            "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                            "Answer": "--",
                            "KlPlate": "现代文阅读",
                            "Cognition": "认知水平",
                            "TestAbility": "考查能力",
                            "Diff": 0.83,
                            "TrueDiff": 0.55,
                            "Distinguish": 0.45
                        }],
                        "DiffDistribution": [0, 10, 0, 0],
                        "Distinguish": [10, 0, 0, 0]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 客观题选项分析
        if(body.indexOf("teacheritemAnalysis")!=-1){
            return Mock.mock({
                'data':   [{
                    "OrderID": 1,
                    "KlName": "鉴赏环境描写；辨析并修改病句",
                    "TypesName": "单选题",
                    "Answer": "A",
                    "TrueDiff": 0.49,
                    "Distinguish": 0.88,
                    "RightRate": "30%",
                    "FirstAnswer": "D",
                    "FirstRate": "32%",
                    "SecondAnswer": "A",
                    "SecondRate": "30%",
                    "ThirdAnswer": "C",
                    "ThirdRate": "20%",
                    "OtherAnswer": "18%"
                }, {
                    "OrderID": 2,
                    "KlName": "分析表达技巧；分析作品结构，概括作品主题，把握文章思路",
                    "TypesName": "单选题",
                    "Answer": "B",
                    "TrueDiff": 0.58,
                    "Distinguish": 0.82,
                    "RightRate": "22%",
                    "FirstAnswer": "A",
                    "FirstRate": "28%",
                    "SecondAnswer": "D",
                    "SecondRate": "26%",
                    "ThirdAnswer": "C",
                    "ThirdRate": "24%",
                    "OtherAnswer": "22%"
                }, {
                    "OrderID": 3,
                    "KlName": "文言文阅读；小作文",
                    "TypesName": "单选题",
                    "Answer": "D",
                    "TrueDiff": 0.45,
                    "Distinguish": 0.84,
                    "RightRate": "30%",
                    "FirstAnswer": "D",
                    "FirstRate": "30%",
                    "SecondAnswer": "A",
                    "SecondRate": "30%",
                    "ThirdAnswer": "C",
                    "ThirdRate": "26%",
                    "OtherAnswer": "14%"
                }, {
                    "OrderID": 4,
                    "KlName": "评价诗歌的思想内容和作者的观点态度；探究文本中某些问题，提出自己的见解",
                    "TypesName": "单选题",
                    "Answer": "C",
                    "TrueDiff": 0.5,
                    "Distinguish": 0.85,
                    "RightRate": "32%",
                    "FirstAnswer": "A",
                    "FirstRate": "34%",
                    "SecondAnswer": "C",
                    "SecondRate": "32%",
                    "ThirdAnswer": "D",
                    "ThirdRate": "24%",
                    "OtherAnswer": "10%"
                }, {
                    "OrderID": 5,
                    "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                    "TypesName": "单选题",
                    "Answer": "A",
                    "TrueDiff": 0.53,
                    "Distinguish": 0.85,
                    "RightRate": "26%",
                    "FirstAnswer": "C",
                    "FirstRate": "30%",
                    "SecondAnswer": "B",
                    "SecondRate": "26%",
                    "ThirdAnswer": "A",
                    "ThirdRate": "26%",
                    "OtherAnswer": "18%"
                }],
                'info': 'success',
                'status': 1
            })
        }
        // 分数段
        if(body.indexOf("fractionalSegment")!=-1){
            return Mock.mock({
                'data': [{
                    "Proposition": "150--140",
                    "School": {
                        "UserNum": 8,
                        "UserRate": 3.2,
                        "UserSum": 8
                    },
                    "Class": {
                        "UserNum": 2,
                        "UserRate": 4,
                        "UserSum": 2
                    }
                }, {
                    "Proposition": "140--130",
                    "School": {
                        "UserNum": 42,
                        "UserRate": 16.8,
                        "UserSum": 50
                    },
                    "Class": {
                        "UserNum": 8,
                        "UserRate": 16,
                        "UserSum": 10
                    }
                }, {
                    "Proposition": "130--120",
                    "School": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 50
                    },
                    "Class": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 10
                    }
                }, {
                    "Proposition": "120--110",
                    "School": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 50
                    },
                    "Class": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 10
                    }
                }, {
                    "Proposition": "110--100",
                    "School": {
                        "UserNum": 1,
                        "UserRate": 0.4,
                        "UserSum": 51
                    },
                    "Class": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 10
                    }
                }, {
                    "Proposition": "100--90",
                    "School": {
                        "UserNum": 10,
                        "UserRate": 4,
                        "UserSum": 61
                    },
                    "Class": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 10
                    }
                }, {
                    "Proposition": "90--80",
                    "School": {
                        "UserNum": 48,
                        "UserRate": 19.2,
                        "UserSum": 109
                    },
                    "Class": {
                        "UserNum": 10,
                        "UserRate": 20,
                        "UserSum": 20
                    }
                }, {
                    "Proposition": "80--70",
                    "School": {
                        "UserNum": 52,
                        "UserRate": 20.8,
                        "UserSum": 161
                    },
                    "Class": {
                        "UserNum": 9,
                        "UserRate": 18,
                        "UserSum": 29
                    }
                }, {
                    "Proposition": "70--60",
                    "School": {
                        "UserNum": 32,
                        "UserRate": 12.8,
                        "UserSum": 193
                    },
                    "Class": {
                        "UserNum": 10,
                        "UserRate": 20,
                        "UserSum": 39
                    }
                }, {
                    "Proposition": "60--50",
                    "School": {
                        "UserNum": 7,
                        "UserRate": 2.8,
                        "UserSum": 200
                    },
                    "Class": {
                        "UserNum": 1,
                        "UserRate": 2,
                        "UserSum": 40
                    }
                }, {
                    "Proposition": "50--40",
                    "School": {
                        "UserNum": 1,
                        "UserRate": 0.4,
                        "UserSum": 201
                    },
                    "Class": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 40
                    }
                }, {
                    "Proposition": "40--30",
                    "School": {
                        "UserNum": 34,
                        "UserRate": 13.6,
                        "UserSum": 235
                    },
                    "Class": {
                        "UserNum": 5,
                        "UserRate": 10,
                        "UserSum": 45
                    }
                }, {
                    "Proposition": "30--20",
                    "School": {
                        "UserNum": 15,
                        "UserRate": 6,
                        "UserSum": 250
                    },
                    "Class": {
                        "UserNum": 5,
                        "UserRate": 10,
                        "UserSum": 50
                    }
                }, {
                    "Proposition": "20--10",
                    "School": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 250
                    },
                    "Class": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 50
                    }
                }, {
                    "Proposition": "10--0",
                    "School": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 250
                    },
                    "Class": {
                        "UserNum": 0,
                        "UserRate": 0,
                        "UserSum": 50
                    }
                }],
                'info': 'success',
                'status': 1
            })
        }
        // 各题考情
        if(body.indexOf("testConditions")!=-1){
            return Mock.mock({
                'data':  [{
                        "OrderID": 1,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "鉴赏环境描写；辨析并修改病句",
                        "Distinguish": 0.86,
                        "ScoreSum": "10",
                        "TrueDiff": 0.53,
                        "ClassDiff": 0.49,
                        "DiffDifference": -0.04,
                        "ClassPerformance": "需要提升",
                        "BError": "7PO,vJQ,qzZ,VJ1,ckB,QIB,yS5",
                        "OtherError": "Smk,tpq,V2a,mGb,AtL,2oI,1ep,hbF,3lv,9ZN,XDC,ZPV,4DP,7h6,pAB,2Ew,P2j,tlz,2l8,TAV,voZ,R3P,8X3,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 2,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "分析表达技巧；分析作品结构，概括作品主题，把握文章思路",
                        "Distinguish": 0.87,
                        "ScoreSum": "10",
                        "TrueDiff": 0.52,
                        "ClassDiff": 0.58,
                        "DiffDifference": 0.06,
                        "ClassPerformance": "很好",
                        "BError": "8lO,qzZ,VJ1,ckB",
                        "OtherError": "Smk,tpq,V2a,mGb,AtL,VcP,2oI,hbF,3lv,vuC,9ZN,XDC,ZPV,4DP,7h6,pAB,2Ew,P2j,tlz,2l8,TAV,voZ,R3P,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 3,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "文言文阅读；小作文",
                        "Distinguish": 0.86,
                        "ScoreSum": "10",
                        "TrueDiff": 0.53,
                        "ClassDiff": 0.45,
                        "DiffDifference": -0.08,
                        "ClassPerformance": "需要提升",
                        "BError": "8lO,vJQ,gO8,qzZ,ckB,QIB,wXT,yS5",
                        "OtherError": "Smk,tpq,eiB,V2a,AtL,VcP,2oI,1ep,hbF,3lv,vuC,9ZN,XDC,ZPV,4DP,7h6,pAB,2Ew,P2j,tlz,2l8,AWO,TAV,voZ,R3P,8X3,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 4,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "评价诗歌的思想内容和作者的观点态度；探究文本中某些问题，提出自己的见解",
                        "Distinguish": 0.85,
                        "ScoreSum": "10",
                        "TrueDiff": 0.55,
                        "ClassDiff": 0.5,
                        "DiffDifference": -0.05,
                        "ClassPerformance": "需要提升",
                        "BError": "7PO,8lO,VJ1,QIB,wXT,yS5",
                        "OtherError": "Smk,eiB,V2a,mGb,AtL,VcP,2oI,1ep,3lv,vuC,9ZN,XDC,ZPV,4DP,7h6,pAB,2Ew,P2j,2l8,AWO,TAV,voZ,R3P,8X3,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 5,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Distinguish": 0.86,
                        "ScoreSum": "10",
                        "TrueDiff": 0.53,
                        "ClassDiff": 0.53,
                        "DiffDifference": 0,
                        "ClassPerformance": "需要提升",
                        "BError": "7PO,qzZ,nuf,QIB,yS5",
                        "OtherError": "Smk,tpq,eiB,V2a,mGb,AtL,VcP,2oI,hbF,vuC,9ZN,XDC,ZPV,4DP,7h6,pAB,2Ew,P2j,tlz,2l8,TAV,voZ,R3P,8X3,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 6,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Distinguish": 0.46,
                        "ScoreSum": "20",
                        "TrueDiff": 0.52,
                        "ClassDiff": 0.52,
                        "DiffDifference": 0,
                        "ClassPerformance": "需要提升",
                        "BError": "8lO,gO8,qzZ,VJ1,nuf,ckB,wXT,yS5",
                        "OtherError": "Smk,tpq,eiB,V2a,mGb,AtL,VcP,2oI,1ep,hbF,3lv,vuC,ZPV,4DP,7h6,pAB,2Ew,tlz,2l8,AWO,TAV,voZ,R3P,8X3,YsW,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 7,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Distinguish": 0.46,
                        "ScoreSum": "20",
                        "TrueDiff": 0.52,
                        "ClassDiff": 0.53,
                        "DiffDifference": 0.01,
                        "ClassPerformance": "很好",
                        "BError": "7PO,8lO,gO8,qzZ,ckB,yS5",
                        "OtherError": "Smk,tpq,eiB,mGb,AtL,VcP,2oI,1ep,hbF,3lv,9ZN,ZPV,4DP,7h6,pAB,2Ew,P2j,tlz,2l8,AWO,TAV,voZ,R3P,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 8,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Distinguish": 0.46,
                        "ScoreSum": "20",
                        "TrueDiff": 0.52,
                        "ClassDiff": 0.49,
                        "DiffDifference": -0.03,
                        "ClassPerformance": "需要提升",
                        "BError": "7PO,vJQ,gO8,qzZ,VJ1,nuf,ckB,QIB,yS5",
                        "OtherError": "Smk,tpq,V2a,mGb,AtL,VcP,2oI,1ep,hbF,3lv,vuC,9ZN,XDC,ZPV,4DP,7h6,pAB,2Ew,P2j,tlz,2l8,AWO,TAV,voZ,R3P,8X3,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 9,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Distinguish": 0.45,
                        "ScoreSum": "20",
                        "TrueDiff": 0.52,
                        "ClassDiff": 0.52,
                        "DiffDifference": 0,
                        "ClassPerformance": "需要提升",
                        "BError": "7PO,8lO,vJQ,gO8,VJ1,nuf,yS5",
                        "OtherError": "Smk,tpq,mGb,VcP,1ep,hbF,3lv,vuC,4DP,7h6,pAB,2Ew,P2j,2l8,AWO,voZ,R3P,8X3,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }, {
                        "OrderID": 10,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Distinguish": 0.45,
                        "ScoreSum": "20",
                        "TrueDiff": 0.52,
                        "ClassDiff": 0.55,
                        "DiffDifference": 0.03,
                        "ClassPerformance": "很好",
                        "BError": "7PO,gO8,VJ1,QIB,wXT,yS5",
                        "OtherError": "Smk,eiB,mGb,AtL,VcP,2oI,1ep,3lv,vuC,9ZN,XDC,7h6,pAB,P2j,tlz,TAV,voZ,8X3,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                    }],
                'info': 'success',
                'status': 1
            })
        }
        // 教师小结
        if(body.indexOf("teacherssummary")!=-1){
            return Mock.mock({
                'data':  {
                "SchoolCount": 8,
                        "SchoolStyle": [{
                            "Num": 1,
                            "StyleName": "普通高中"
                        }, {
                            "Num": 1,
                            "StyleName": "省重点高中"
                        }, {
                            "Num": 2,
                            "StyleName": "市重点高中"
                        }, {
                            "Num": 4,
                            "StyleName": "重点高中"
                        }],
                        "ExamUserCount": "2000",
                        "SubjectUserCount": "2000",
                        "ClassUserCount": "50",
                        "ClassScoreAvg": "77.88",
                        "ASchoolCount": 50,
                        "ASchoolDob": 45,
                        "BSchoolCount": 92,
                        "BSchoolDob": 56,
                        "AClassCount": 10,
                        "AClassDob": 7,
                        "BClassCount": 15,
                        "BClassDob": 10,
                        "AEffectiveScore": 132.3,
                        "BEffectiveScore": 85.9
            },
                'info': 'success',
                'status': 1
            })
        }
        // 教师最高分
        if(body.indexOf("teacherscoreMax")!=-1){
            return Mock.mock({
                'data':  {
                "SubjectName": "语文",
                        "ExamScoreMax": 144,
                        "ExamMaxSchool": "开封市七中",
                        "SchoolScoreMax": 144,
                        "SchoolMaxClass": "高三二班",
                        "SchoolMaxUser": "673",
                        "SchoolList": [{
                            "SchoolOrder": "1",
                            "Score": 144,
                            "ClassName": "高三二班",
                            "UserName": "673"
                        }, {
                            "SchoolOrder": "2",
                            "Score": 143,
                            "ClassName": "高三一班",
                            "UserName": "Yub"
                        }, {
                            "SchoolOrder": "3",
                            "Score": 142,
                            "ClassName": "高三一班",
                            "UserName": "Yp7"
                        }, {
                            "SchoolOrder": "3",
                            "Score": 142,
                            "ClassName": "高三二班",
                            "UserName": "dRf"
                        }, {
                            "SchoolOrder": "3",
                            "Score": 142,
                            "ClassName": "高三二班",
                            "UserName": "8sr"
                        }],
                        "ClassList": [{
                            "ClassOrder": "1",
                            "UserName": "wXT",
                            "StudentCode": "40201403010",
                            "Score": 141
                        }, {
                            "ClassOrder": "1",
                            "UserName": "8lO",
                            "StudentCode": "40201403002",
                            "Score": 141
                        }, {
                            "ClassOrder": "3",
                            "UserName": "ckB",
                            "StudentCode": "40201403008",
                            "Score": 138
                        }, {
                            "ClassOrder": "3",
                            "UserName": "vJQ",
                            "StudentCode": "40201403003",
                            "Score": 138
                        }, {
                            "ClassOrder": "5",
                            "UserName": "qzZ",
                            "StudentCode": "40201403005",
                            "Score": 137
                        }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 平均分与标准分
        if(body.indexOf("teacherscoreAvg")!=-1){
            return Mock.mock({
                'data':  {
                "SubjectID": "3",
                        "SubjectInfo": [{
                            "SubjectID": "3",
                            "SubjectName": "语文",
                            "ExamScoreAvg": 78.7,
                            "SchoolScoreAvg": 79.4,
                            "SchoolZScore": "1.46",
                            "ClassScoreAvg": 77.9,
                            "ClassZScore": "-0.80",
                            "ExamAScoreAvg": 137.7,
                            "ExamBScoreAvg": 88.3,
                            "SchoolAScoreAvg": 137.7,
                            "SchoolBScoreAvg": 100.4,
                            "ClassAScoreAvg": 138.1,
                            "ClassBScoreAvg": 120.3
                        }, {
                            "SubjectID": "4",
                            "SubjectName": "理科数学",
                            "ExamScoreAvg": 78.3,
                            "SchoolScoreAvg": 78.6,
                            "SchoolZScore": "0.68",
                            "ClassScoreAvg": 77.3,
                            "ClassZScore": "-0.87",
                            "ExamAScoreAvg": 137.5,
                            "ExamBScoreAvg": 87.3,
                            "SchoolAScoreAvg": 137.9,
                            "SchoolBScoreAvg": 104.3,
                            "ClassAScoreAvg": 136.9,
                            "ClassBScoreAvg": 123
                        }, {
                            "SubjectID": "6",
                            "SubjectName": "英语",
                            "ExamScoreAvg": 78.6,
                            "SchoolScoreAvg": 78.4,
                            "SchoolZScore": "-0.38",
                            "ClassScoreAvg": 77.5,
                            "ClassZScore": "-0.92",
                            "ExamAScoreAvg": 125.1,
                            "ExamBScoreAvg": 87.8,
                            "SchoolAScoreAvg": 125.1,
                            "SchoolBScoreAvg": 95.5,
                            "ClassAScoreAvg": 126.1,
                            "ClassBScoreAvg": 114.3
                        }, {
                            "SubjectID": "9",
                            "SubjectName": "物理",
                            "ExamScoreAvg": 51.8,
                            "SchoolScoreAvg": 51.6,
                            "SchoolZScore": "-0.32",
                            "ClassScoreAvg": 50.8,
                            "ClassZScore": "-1.09",
                            "ExamAScoreAvg": 79.7,
                            "ExamBScoreAvg": 56.2,
                            "SchoolAScoreAvg": 80,
                            "SchoolBScoreAvg": 59.6,
                            "ClassAScoreAvg": 79,
                            "ClassBScoreAvg": 71.8
                        }, {
                            "SubjectID": "10",
                            "SubjectName": "化学",
                            "ExamScoreAvg": 52,
                            "SchoolScoreAvg": 52.2,
                            "SchoolZScore": "0.56",
                            "ClassScoreAvg": 53.5,
                            "ClassZScore": "1.54",
                            "ExamAScoreAvg": 79.9,
                            "ExamBScoreAvg": 56.3,
                            "SchoolAScoreAvg": 80.9,
                            "SchoolBScoreAvg": 63.1,
                            "ClassAScoreAvg": 80.4,
                            "ClassBScoreAvg": 74.5
                        }, {
                            "SubjectID": "11",
                            "SubjectName": "生物",
                            "ExamScoreAvg": 51.9,
                            "SchoolScoreAvg": 52.4,
                            "SchoolZScore": "1.53",
                            "ClassScoreAvg": 53.3,
                            "ClassZScore": "1.42",
                            "ExamAScoreAvg": 80.2,
                            "ExamBScoreAvg": 58.3,
                            "SchoolAScoreAvg": 81,
                            "SchoolBScoreAvg": 64.9,
                            "ClassAScoreAvg": 83.4,
                            "ClassBScoreAvg": 72
                        }, {
                            "SubjectID": 0,
                            "SubjectName": "总分",
                            "ExamScoreAvg": 391.3,
                            "SchoolScoreAvg": 392.7,
                            "SchoolZScore": "1.05",
                            "ClassScoreAvg": 390.2,
                            "ClassZScore": "-0.44",
                            "ExamAScoreAvg": 640,
                            "ExamBScoreAvg": 434.2,
                            "SchoolAScoreAvg": 642.6,
                            "SchoolBScoreAvg": 487.8,
                            "ClassAScoreAvg": 644,
                            "ClassBScoreAvg": 575.8
                        }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 有效分
        if(body.indexOf("effectiveScore")!=-1){
            return Mock.mock({
                'data':  {
                "ALine": 630,
                        "BLine": 410,
                        "ALineCount": "7",
                        "BLineCount": "11",
                        "AProportion": 14,
                        "ALevel": "A",
                        "BProportion": 22,
                        "BLevel": "B",
                        "SubjectList": [{
                            "SubjectID": "3",
                            "SubjectName": "语文",
                            "A": {
                                "EffectiveScore": 132.3,
                                "ALineCount": 9,
                                "ALineDobCount": 7,
                                "HitRate": 77.8,
                                "ContributionRate": 100,
                                "ContributionLevel": "A"
                            },
                            "B": {
                                "EffectiveScore": 85.9,
                                "BLineCount": 13,
                                "BLineDobCount": 10,
                                "HitRate": 76.9,
                                "ContributionRate": 90.9,
                                "ContributionLevel": "A"
                            }
                        }, {
                            "SubjectID": "4",
                            "SubjectName": "理科数学",
                            "A": {
                                "EffectiveScore": 132.2,
                                "ALineCount": 8,
                                "ALineDobCount": 6,
                                "HitRate": 75,
                                "ContributionRate": 85.7,
                                "ContributionLevel": "A"
                            },
                            "B": {
                                "EffectiveScore": 85.8,
                                "BLineCount": 11,
                                "BLineDobCount": 10,
                                "HitRate": 90.9,
                                "ContributionRate": 90.9,
                                "ContributionLevel": "A"
                            }
                        }, {
                            "SubjectID": "6",
                            "SubjectName": "英语",
                            "A": {
                                "EffectiveScore": 120.2,
                                "ALineCount": 8,
                                "ALineDobCount": 6,
                                "HitRate": 75,
                                "ContributionRate": 85.7,
                                "ContributionLevel": "A"
                            },
                            "B": {
                                "EffectiveScore": 78.9,
                                "BLineCount": 20,
                                "BLineDobCount": 11,
                                "HitRate": 55,
                                "ContributionRate": 100,
                                "ContributionLevel": "C"
                            }
                        }, {
                            "SubjectID": "9",
                            "SubjectName": "物理",
                            "A": {
                                "EffectiveScore": 76.6,
                                "ALineCount": 6,
                                "ALineDobCount": 4,
                                "HitRate": 66.7,
                                "ContributionRate": 57.1,
                                "ContributionLevel": "D"
                            },
                            "B": {
                                "EffectiveScore": 50.3,
                                "BLineCount": 21,
                                "BLineDobCount": 11,
                                "HitRate": 52.4,
                                "ContributionRate": 100,
                                "ContributionLevel": "C"
                            }
                        }, {
                            "SubjectID": "10",
                            "SubjectName": "化学",
                            "A": {
                                "EffectiveScore": 76.7,
                                "ALineCount": 9,
                                "ALineDobCount": 6,
                                "HitRate": 66.7,
                                "ContributionRate": 85.7,
                                "ContributionLevel": "C"
                            },
                            "B": {
                                "EffectiveScore": 50.4,
                                "BLineCount": 26,
                                "BLineDobCount": 11,
                                "HitRate": 42.3,
                                "ContributionRate": 100,
                                "ContributionLevel": "C"
                            }
                        }, {
                            "SubjectID": "11",
                            "SubjectName": "生物",
                            "A": {
                                "EffectiveScore": 77.1,
                                "ALineCount": 8,
                                "ALineDobCount": 7,
                                "HitRate": 87.5,
                                "ContributionRate": 100,
                                "ContributionLevel": "A"
                            },
                            "B": {
                                "EffectiveScore": 50.8,
                                "BLineCount": 26,
                                "BLineDobCount": 11,
                                "HitRate": 42.3,
                                "ContributionRate": 100,
                                "ContributionLevel": "C"
                            }
                        }],
                        "SubjectID": "3"
            },
                'info': 'success',
                'status': 1
            })
        }
        // 上线率
        if(body.indexOf("teacheronLineRate")!=-1){
            return Mock.mock({
                'data':  {
                    "SubjectID": "3",
                            "SubjectName": "语文",
                            "ALine": 630,
                            "BLine": 410,
                            "ASubjectLine": 126,
                            "BSubjectLine": 82,
                            "CSubjectLine": 64,
                            "AEffectiveScore": 132.3,
                            "BEffectiveScore": 85.9,
                            "ClassInfo": {
                                "TotalScore": {
                                    "AUserNum": "7",
                                    "ALineRate": 14,
                                    "BUserNum": "11",
                                    "BLineRate": 22,
                                    "BSingleNum": 4,
                                    "BSingleRate": 8,
                                    "CUserNum": "40",
                                    "CLineRate": 80,
                                    "CSingleNum": 29,
                                    "CSingleRate": 58,
                                    "OffLineNum": 10,
                                    "OffLineRate": 20
                                },
                                "SubjectEff": {
                                    "AUserNum": "9",
                                    "ALineRate": 18,
                                    "BUserNum": "13",
                                    "BLineRate": 26,
                                    "BSingleNum": 4,
                                    "BSingleRate": 8,
                                    "CUserNum": "34",
                                    "CLineRate": 68,
                                    "CSingleNum": 21,
                                    "CSingleRate": 42,
                                    "OffLineNum": 16,
                                    "OffLineRate": 32
                                },
                                "Double": {
                                    "AUserNum": "7",
                                    "ALineRate": 14,
                                    "BUserNum": "10",
                                    "BLineRate": 20
                                },
                                "Subject": {
                                    "AUserNum": "10",
                                    "ALineRate": 20,
                                    "BUserNum": "15",
                                    "BLineRate": 30,
                                    "BSingleNum": 5,
                                    "BSingleRate": 10,
                                    "CUserNum": "37",
                                    "CLineRate": 74,
                                    "CSingleNum": 22,
                                    "CSingleRate": 44,
                                    "OffLineNum": 13,
                                    "OffLineRate": 26
                                }
                            },
                            "SchoolInfo": {
                                "Subject": {
                                    "AUserNum": "50",
                                    "ALineRate": 20,
                                    "BUserNum": "92",
                                    "BLineRate": 36.8,
                                    "BSingleNum": 42,
                                    "BSingleRate": 16.8,
                                    "CUserNum": "186",
                                    "CLineRate": 74.4,
                                    "CSingleNum": 94,
                                    "CSingleRate": 37.6,
                                    "OffLineNum": 64,
                                    "OffLineRate": 100
                                }
                            }
            },
                'info': 'success',
                'status': 1
            })
        }
        // 一、二本上线率学校排名前10名
        if(body.indexOf("onLineSchoolOrder")!=-1){
            return Mock.mock({
                'data':  {
                    "SchoolID": "40",
                            "SubjectID": "3",
                            "SubjectName": "语文",
                            "SchoolList": [{
                                "SchoolID": 46,
                                "SchoolName": "金明中学",
                                "TotalScore": {
                                    "UserCount": "250",
                                    "ScoreAvg": 392.8,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "70",
                                    "BLineRate": 28,
                                    "PoorUserCount": "200",
                                    "OrderCount": 30
                                },
                                "Subject": {
                                    "UserCount": "250",
                                    "ScoreAvg": 79.2,
                                    "AUserCount": "51",
                                    "ALineRate": 20.4,
                                    "BUserCount": "100",
                                    "BLineRate": 40,
                                    "PoorUserCount": "187",
                                    "OrderCount": 27
                                },
                                "Double": {
                                    "AUserCount": "50",
                                    "BUserCount": "61"
                                }
                            }, {
                                "SchoolID": 42,
                                "SchoolName": "洛阳六中",
                                "TotalScore": {
                                    "UserCount": "250",
                                    "ScoreAvg": 391.4,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "64",
                                    "BLineRate": 25.6,
                                    "PoorUserCount": "200",
                                    "OrderCount": 27
                                },
                                "Subject": {
                                    "UserCount": "250",
                                    "ScoreAvg": 78.3,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "85",
                                    "BLineRate": 34,
                                    "PoorUserCount": "188",
                                    "OrderCount": 25
                                },
                                "Double": {
                                    "AUserCount": "50",
                                    "BUserCount": "56"
                                }
                            }, {
                                "SchoolID": 43,
                                "SchoolName": "洛阳十中",
                                "TotalScore": {
                                    "UserCount": "250",
                                    "ScoreAvg": 391.1,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "60",
                                    "BLineRate": 24,
                                    "PoorUserCount": "200",
                                    "OrderCount": 22
                                },
                                "Subject": {
                                    "UserCount": "250",
                                    "ScoreAvg": 78.6,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "92",
                                    "BLineRate": 36.8,
                                    "PoorUserCount": "192",
                                    "OrderCount": 24
                                },
                                "Double": {
                                    "AUserCount": "50",
                                    "BUserCount": "57"
                                }
                            }, {
                                "SchoolID": 47,
                                "SchoolName": "洛阳二十二中",
                                "TotalScore": {
                                    "UserCount": "250",
                                    "ScoreAvg": 390.4,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "55",
                                    "BLineRate": 22,
                                    "PoorUserCount": "200",
                                    "OrderCount": 22
                                },
                                "Subject": {
                                    "UserCount": "250",
                                    "ScoreAvg": 78.9,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "83",
                                    "BLineRate": 33.2,
                                    "PoorUserCount": "186",
                                    "OrderCount": 34
                                },
                                "Double": {
                                    "AUserCount": "50",
                                    "BUserCount": "53"
                                }
                            }, {
                                "SchoolID": 41,
                                "SchoolName": "开封市十三中",
                                "TotalScore": {
                                    "UserCount": "250",
                                    "ScoreAvg": 388.5,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "54",
                                    "BLineRate": 21.6,
                                    "PoorUserCount": "200",
                                    "OrderCount": 19
                                },
                                "Subject": {
                                    "UserCount": "250",
                                    "ScoreAvg": 77.9,
                                    "AUserCount": "51",
                                    "ALineRate": 20.4,
                                    "BUserCount": "70",
                                    "BLineRate": 28,
                                    "PoorUserCount": "187",
                                    "OrderCount": 20
                                },
                                "Double": {
                                    "AUserCount": "50",
                                    "BUserCount": "51"
                                }
                            }, {
                                "SchoolID": 45,
                                "SchoolName": "开封市二十八中",
                                "TotalScore": {
                                    "UserCount": "250",
                                    "ScoreAvg": 391.6,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "52",
                                    "BLineRate": 20.8,
                                    "PoorUserCount": "200",
                                    "OrderCount": 29
                                },
                                "Subject": {
                                    "UserCount": "250",
                                    "ScoreAvg": 78.6,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "78",
                                    "BLineRate": 31.2,
                                    "PoorUserCount": "189",
                                    "OrderCount": 30
                                },
                                "Double": {
                                    "AUserCount": "50",
                                    "BUserCount": "51"
                                }
                            }, {
                                "SchoolID": 44,
                                "SchoolName": "中原一中",
                                "TotalScore": {
                                    "UserCount": "250",
                                    "ScoreAvg": 392.1,
                                    "AUserCount": "49",
                                    "ALineRate": 19.6,
                                    "BUserCount": "55",
                                    "BLineRate": 22,
                                    "PoorUserCount": "200",
                                    "OrderCount": 24
                                },
                                "Subject": {
                                    "UserCount": "250",
                                    "ScoreAvg": 78.9,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "85",
                                    "BLineRate": 34,
                                    "PoorUserCount": "187",
                                    "OrderCount": 20
                                },
                                "Double": {
                                    "AUserCount": "49",
                                    "BUserCount": "54"
                                }
                            }, {
                                "SchoolID": 40,
                                "SchoolName": "开封市七中",
                                "TotalScore": {
                                    "UserCount": "250",
                                    "ScoreAvg": 392.7,
                                    "AUserCount": "45",
                                    "ALineRate": 18,
                                    "BUserCount": "60",
                                    "BLineRate": 24,
                                    "PoorUserCount": "200",
                                    "OrderCount": 27
                                },
                                "Subject": {
                                    "UserCount": "250",
                                    "ScoreAvg": 79.4,
                                    "AUserCount": "50",
                                    "ALineRate": 20,
                                    "BUserCount": "92",
                                    "BLineRate": 36.8,
                                    "PoorUserCount": "189",
                                    "OrderCount": 20
                                },
                                "Double": {
                                    "AUserCount": "45",
                                    "BUserCount": "56"
                                }
                            }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 各班级考试情况
        if(body.indexOf("teacherclassInfoList")!=-1){
            return Mock.mock({
                'data':  {
                    "ClassID": "103",
                            "SubjectID": "3",
                            "SubjectName": "语文",
                            "ClassList": [{
                                "GroupName": "我校整体",
                                "GroupID": "0",
                                "UserCount": "250",
                                "ScoreAvg": 79.4,
                                "ScoreMax": 144,
                                "ScoreMin": 20,
                                "ExcellentRate": 18,
                                "GoodRate": 2,
                                "PassRate": 4,
                                "PoorUserCount": "189",
                                "OrderCount": 100,
                                "Deviation": 34.7,
                                "Distinguish": 0.44
                            }, {
                                "GroupName": "高三一班",
                                "GroupID": "101",
                                "UserCount": "50",
                                "ScoreAvg": 79,
                                "ScoreMax": 143,
                                "ScoreMin": 23,
                                "ExcellentRate": 16,
                                "GoodRate": 4,
                                "PassRate": 2,
                                "PoorUserCount": "39",
                                "OrderCount": 22,
                                "Deviation": 35.2,
                                "Distinguish": 0.45
                            }, {
                                "GroupName": "高三二班",
                                "GroupID": "102",
                                "UserCount": "50",
                                "ScoreAvg": 81.6,
                                "ScoreMax": 144,
                                "ScoreMin": 20,
                                "ExcellentRate": 18,
                                "GoodRate": 2,
                                "PassRate": 10,
                                "PoorUserCount": "35",
                                "OrderCount": 20,
                                "Deviation": 34.4,
                                "Distinguish": 0.42
                            }, {
                                "GroupName": "高三三班",
                                "GroupID": "103",
                                "UserCount": "50",
                                "ScoreAvg": 77.9,
                                "ScoreMax": 141,
                                "ScoreMin": 23,
                                "ExcellentRate": 16,
                                "GoodRate": 4,
                                "PassRate": 0,
                                "PoorUserCount": "40",
                                "OrderCount": 18,
                                "Deviation": 34.7,
                                "Distinguish": 0.45
                            }, {
                                "GroupName": "高三四班",
                                "GroupID": "104",
                                "UserCount": "50",
                                "ScoreAvg": 78.9,
                                "ScoreMax": 138,
                                "ScoreMin": 25,
                                "ExcellentRate": 18,
                                "GoodRate": 2,
                                "PassRate": 6,
                                "PoorUserCount": "37",
                                "OrderCount": 20,
                                "Deviation": 34.3,
                                "Distinguish": 0.43
                            }, {
                                "GroupName": "高三五班",
                                "GroupID": "105",
                                "UserCount": "50",
                                "ScoreAvg": 79.5,
                                "ScoreMax": 139,
                                "ScoreMin": 28,
                                "ExcellentRate": 20,
                                "GoodRate": 0,
                                "PassRate": 4,
                                "PoorUserCount": "38",
                                "OrderCount": 20,
                                "Deviation": 34.5,
                                "Distinguish": 0.43
                            }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 联考成绩排名
        if(body.indexOf("teacherexamScoreOrder")!=-1){
            return Mock.mock({
                'data':  {
                    "SchoolID": "40",
                            "SubjectID": "3",
                            "SubjectName": "语文",
                            "ExamOrder50": [{
                                "SchoolID": "40",
                                "SchoolName": "开封市七中",
                                "UserCount": 8
                            }, {
                                "SchoolID": "41",
                                "SchoolName": "开封市十三中",
                                "UserCount": 2
                            }, {
                                "SchoolID": "42",
                                "SchoolName": "洛阳六中",
                                "UserCount": 9
                            }, {
                                "SchoolID": "43",
                                "SchoolName": "洛阳十中",
                                "UserCount": 5
                            }, {
                                "SchoolID": "44",
                                "SchoolName": "中原一中",
                                "UserCount": 8
                            }, {
                                "SchoolID": "45",
                                "SchoolName": "开封市二十八中",
                                "UserCount": 7
                            }, {
                                "SchoolID": "46",
                                "SchoolName": "金明中学",
                                "UserCount": 5
                            }, {
                                "SchoolID": "47",
                                "SchoolName": "洛阳二十二中",
                                "UserCount": 6
                            }],
                            "ExamOrder100": [{
                                "SchoolID": "40",
                                "SchoolName": "开封市七中",
                                "UserCount": 20
                            }, {
                                "SchoolID": "41",
                                "SchoolName": "开封市十三中",
                                "UserCount": 5
                            }, {
                                "SchoolID": "42",
                                "SchoolName": "洛阳六中",
                                "UserCount": 12
                            }, {
                                "SchoolID": "43",
                                "SchoolName": "洛阳十中",
                                "UserCount": 11
                            }, {
                                "SchoolID": "44",
                                "SchoolName": "中原一中",
                                "UserCount": 16
                            }, {
                                "SchoolID": "45",
                                "SchoolName": "开封市二十八中",
                                "UserCount": 13
                            }, {
                                "SchoolID": "46",
                                "SchoolName": "金明中学",
                                "UserCount": 11
                            }, {
                                "SchoolID": "47",
                                "SchoolName": "洛阳二十二中",
                                "UserCount": 12
                            }],
                            "ExamOrderList": [{
                                "SchoolID": "40",
                                "SchoolName": "开封市七中",
                                "UserName": "wXT",
                                "TotalScore": {
                                    "Score": 667,
                                    "TotalOrder": "1",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 141,
                                    "TotalOrder": "23",
                                    "SchoolOrder": "6"
                                }
                            }, {
                                "SchoolID": "41",
                                "SchoolName": "开封市十三中",
                                "UserName": "zPX",
                                "TotalScore": {
                                    "Score": 660,
                                    "TotalOrder": "2",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 139,
                                    "TotalOrder": "85",
                                    "SchoolOrder": "9"
                                }
                            }, {
                                "SchoolID": "43",
                                "SchoolName": "洛阳十中",
                                "UserName": "wbp",
                                "TotalScore": {
                                    "Score": 659,
                                    "TotalOrder": "3",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 143,
                                    "TotalOrder": "3",
                                    "SchoolOrder": "1"
                                }
                            }, {
                                "SchoolID": "44",
                                "SchoolName": "中原一中",
                                "UserName": "Gko",
                                "TotalScore": {
                                    "Score": 658,
                                    "TotalOrder": "4",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 141,
                                    "TotalOrder": "23",
                                    "SchoolOrder": "3"
                                }
                            }, {
                                "SchoolID": "46",
                                "SchoolName": "金明中学",
                                "UserName": "SJb",
                                "TotalScore": {
                                    "Score": 658,
                                    "TotalOrder": "4",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 140,
                                    "TotalOrder": "49",
                                    "SchoolOrder": "5"
                                }
                            }, {
                                "SchoolID": "47",
                                "SchoolName": "洛阳二十二中",
                                "UserName": "jFz",
                                "TotalScore": {
                                    "Score": 658,
                                    "TotalOrder": "4",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 139,
                                    "TotalOrder": "85",
                                    "SchoolOrder": "16"
                                }
                            }, {
                                "SchoolID": "44",
                                "SchoolName": "中原一中",
                                "UserName": "6g8",
                                "TotalScore": {
                                    "Score": 657,
                                    "TotalOrder": "7",
                                    "SchoolOrder": "2"
                                },
                                "Subject": {
                                    "Score": 136,
                                    "TotalOrder": "276",
                                    "SchoolOrder": "33"
                                }
                            }, {
                                "SchoolID": "42",
                                "SchoolName": "洛阳六中",
                                "UserName": "Lhz",
                                "TotalScore": {
                                    "Score": 656,
                                    "TotalOrder": "8",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 140,
                                    "TotalOrder": "49",
                                    "SchoolOrder": "5"
                                }
                            }, {
                                "SchoolID": "45",
                                "SchoolName": "开封市二十八中",
                                "UserName": "zEf",
                                "TotalScore": {
                                    "Score": 656,
                                    "TotalOrder": "8",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 141,
                                    "TotalOrder": "23",
                                    "SchoolOrder": "6"
                                }
                            }, {
                                "SchoolID": "47",
                                "SchoolName": "洛阳二十二中",
                                "UserName": "2ne",
                                "TotalScore": {
                                    "Score": 656,
                                    "TotalOrder": "8",
                                    "SchoolOrder": "2"
                                },
                                "Subject": {
                                    "Score": 137,
                                    "TotalOrder": "204",
                                    "SchoolOrder": "35"
                                }
                            }, {
                                "SchoolID": "40",
                                "SchoolName": "开封市七中",
                                "UserName": "Yub",
                                "TotalScore": {
                                    "Score": 655,
                                    "TotalOrder": "11",
                                    "SchoolOrder": "2"
                                },
                                "Subject": {
                                    "Score": 143,
                                    "TotalOrder": "3",
                                    "SchoolOrder": "2"
                                }
                            }, {
                                "SchoolID": "40",
                                "SchoolName": "开封市七中",
                                "UserName": "8sr",
                                "TotalScore": {
                                    "Score": 655,
                                    "TotalOrder": "11",
                                    "SchoolOrder": "2"
                                },
                                "Subject": {
                                    "Score": 142,
                                    "TotalOrder": "10",
                                    "SchoolOrder": "3"
                                }
                            }, {
                                "SchoolID": "46",
                                "SchoolName": "金明中学",
                                "UserName": "5BJ",
                                "TotalScore": {
                                    "Score": 655,
                                    "TotalOrder": "11",
                                    "SchoolOrder": "2"
                                },
                                "Subject": {
                                    "Score": 139,
                                    "TotalOrder": "85",
                                    "SchoolOrder": "13"
                                }
                            }, {
                                "SchoolID": "47",
                                "SchoolName": "洛阳二十二中",
                                "UserName": "r6R",
                                "TotalScore": {
                                    "Score": 655,
                                    "TotalOrder": "11",
                                    "SchoolOrder": "3"
                                },
                                "Subject": {
                                    "Score": 139,
                                    "TotalOrder": "85",
                                    "SchoolOrder": "16"
                                }
                            }, {
                                "SchoolID": "44",
                                "SchoolName": "中原一中",
                                "UserName": "ob7",
                                "TotalScore": {
                                    "Score": 654,
                                    "TotalOrder": "15",
                                    "SchoolOrder": "3"
                                },
                                "Subject": {
                                    "Score": 135,
                                    "TotalOrder": "325",
                                    "SchoolOrder": "38"
                                }
                            }, {
                                "SchoolID": "46",
                                "SchoolName": "金明中学",
                                "UserName": "fu4",
                                "TotalScore": {
                                    "Score": 654,
                                    "TotalOrder": "15",
                                    "SchoolOrder": "3"
                                },
                                "Subject": {
                                    "Score": 139,
                                    "TotalOrder": "85",
                                    "SchoolOrder": "13"
                                }
                            }, {
                                "SchoolID": "43",
                                "SchoolName": "洛阳十中",
                                "UserName": "1jj",
                                "TotalScore": {
                                    "Score": 649,
                                    "TotalOrder": "45",
                                    "SchoolOrder": "3"
                                },
                                "Subject": {
                                    "Score": 136,
                                    "TotalOrder": "276",
                                    "SchoolOrder": "31"
                                }
                            }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 各班级考试情况
        if(body.indexOf("SchoolScoreOrder")!=-1){
            return Mock.mock({
                'data':  {
                    "SubjectID": "3",
                            "SubjectName": "语文",
                            "SchoolOrder50": [{
                                "ClassID": "101",
                                "ClassName": "高三一班",
                                "UserCount": 10
                            }, {
                                "ClassID": "102",
                                "ClassName": "高三二班",
                                "UserCount": 10
                            }, {
                                "ClassID": "103",
                                "ClassName": "高三三班",
                                "UserCount": 10
                            }, {
                                "ClassID": "104",
                                "ClassName": "高三四班",
                                "UserCount": 10
                            }, {
                                "ClassID": "105",
                                "ClassName": "高三五班",
                                "UserCount": 10
                            }],
                            "SchoolOrder100": [{
                                "ClassID": "101",
                                "ClassName": "高三一班",
                                "UserCount": 19
                            }, {
                                "ClassID": "102",
                                "ClassName": "高三二班",
                                "UserCount": 22
                            }, {
                                "ClassID": "103",
                                "ClassName": "高三三班",
                                "UserCount": 22
                            }, {
                                "ClassID": "104",
                                "ClassName": "高三四班",
                                "UserCount": 17
                            }, {
                                "ClassID": "105",
                                "ClassName": "高三五班",
                                "UserCount": 20
                            }],
                            "SchoolOrderList": [{
                                "StudentCode": "40201403010",
                                "ClassID": "103",
                                "ClassName": "高三三班",
                                "UserName": "wXT",
                                "IfNow": "应届",
                                "TotalScore": {
                                    "Score": 667,
                                    "TotalOrder": "1",
                                    "SchoolOrder": "1"
                                },
                                "Subject": {
                                    "Score": 141,
                                    "TotalOrder": "23",
                                    "SchoolOrder": "6"
                                }
                            }, {
                                "StudentCode": "40201401009",
                                "ClassID": "101",
                                "ClassName": "高三一班",
                                "UserName": "Yub",
                                "IfNow": "应届",
                                "TotalScore": {
                                    "Score": 655,
                                    "TotalOrder": "11",
                                    "SchoolOrder": "2"
                                },
                                "Subject": {
                                    "Score": 143,
                                    "TotalOrder": "3",
                                    "SchoolOrder": "2"
                                }
                            }, {
                                "StudentCode": "40201402008",
                                "ClassID": "102",
                                "ClassName": "高三二班",
                                "UserName": "8sr",
                                "IfNow": "应届",
                                "TotalScore": {
                                    "Score": 655,
                                    "TotalOrder": "11",
                                    "SchoolOrder": "2"
                                },
                                "Subject": {
                                    "Score": 142,
                                    "TotalOrder": "10",
                                    "SchoolOrder": "3"
                                }
                            }, {
                                "StudentCode": "40201401001",
                                "ClassID": "101",
                                "ClassName": "高三一班",
                                "UserName": "Yp7",
                                "IfNow": "应届",
                                "TotalScore": {
                                    "Score": 653,
                                    "TotalOrder": "17",
                                    "SchoolOrder": "4"
                                },
                                "Subject": {
                                    "Score": 142,
                                    "TotalOrder": "10",
                                    "SchoolOrder": "3"
                                }
                            }, {
                                "StudentCode": "40201401003",
                                "ClassID": "101",
                                "ClassName": "高三一班",
                                "UserName": "QW5",
                                "IfNow": "应届",
                                "TotalScore": {
                                    "Score": 653,
                                    "TotalOrder": "17",
                                    "SchoolOrder": "4"
                                },
                                "Subject": {
                                    "Score": 137,
                                    "TotalOrder": "204",
                                    "SchoolOrder": "23"
                                }
                            }, {
                                "StudentCode": "40201403001",
                                "ClassID": "103",
                                "ClassName": "高三三班",
                                "UserName": "7PO",
                                "IfNow": "应届",
                                "TotalScore": {
                                    "Score": 626,
                                    "TotalOrder": "380",
                                    "SchoolOrder": "48"
                                },
                                "Subject": {
                                    "Score": 133,
                                    "TotalOrder": "383",
                                    "SchoolOrder": "48"
                                }
                            }, {
                                "StudentCode": "40201404007",
                                "ClassID": "104",
                                "ClassName": "高三四班",
                                "UserName": "Ozo",
                                "IfNow": "应届",
                                "TotalScore": {
                                    "Score": 624,
                                    "TotalOrder": "391",
                                    "SchoolOrder": "49"
                                },
                                "Subject": {
                                    "Score": 134,
                                    "TotalOrder": "362",
                                    "SchoolOrder": "45"
                                }
                            }, {
                                "StudentCode": "40201401008",
                                "ClassID": "101",
                                "ClassName": "高三一班",
                                "UserName": "RWd",
                                "IfNow": "应届",
                                "TotalScore": {
                                    "Score": 621,
                                    "TotalOrder": "396",
                                    "SchoolOrder": "50"
                                },
                                "Subject": {
                                    "Score": 134,
                                    "TotalOrder": "362",
                                    "SchoolOrder": "45"
                                }
                            }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 班级知识板块达成度分析      
        if(body.indexOf("knowledgeAchieve")!=-1){
            return Mock.mock({
                'data':  {
                    "ScoreRate": 0.4,
                            "KlInfo": [{
                                "KlName": "古诗文阅读；作文",
                                "Score": 10,
                                "SchoolAvg": 5.2,
                                "ClassAvg": 4.5,
                                "UserName": "Smk,eiB,AtL,VcP,yS5,hbF,3lv,ZPV,pAB,2Ew,tlz,TAV,voZ,R3P,8X3,ZXZ,WQp,gFi,VML,rXc,pla,VAg,TCC,qqm"
                            }, {
                                "KlName": "古诗文阅读；现代文阅读",
                                "Score": 10,
                                "SchoolAvg": 5.5,
                                "ClassAvg": 5,
                                "UserName": "Smk,eiB,AtL,yS5,1ep,vuC,XDC,ZPV,4DP,7h6,pAB,2l8,WQp,31u,VML,rXc,TCC,qqm"
                            }, {
                                "KlName": "现代文阅读",
                                "Score": 120,
                                "SchoolAvg": 63.7,
                                "ClassAvg": 63.5,
                                "UserName": "ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC,qqm"
                            }, {
                                "KlName": "现代文阅读；语言知识基础",
                                "Score": 10,
                                "SchoolAvg": 5.1,
                                "ClassAvg": 4.9,
                                "UserName": "Smk,mGb,AtL,3lv,9ZN,ZPV,7h6,2Ew,P2j,2l8,TAV,voZ,8X3,YsW,ZXZ,WQp,31u,gFi,VML,wB4,rXc,pla,VAg,TCC"
                            }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 临界生
        if(body.indexOf("CriticalUser")!=-1){
            return Mock.mock({
                'data':  {
                    "SubjectID": "3",
                            "UserList": [{
                                "UserID": "6158",
                                "UserName": "ckB",
                                "StudentCode": "40201403008",
                                "ClassName": "高三三班",
                                "BadSubject": "化学,生物",
                                "GoodSubject": "语文",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "成绩",
                                    "Score": 634,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 138,
                                    "Status": 1
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 132,
                                    "Status": 0
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 126,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 81,
                                    "Status": 0
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 77,
                                    "Status": 2
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 80,
                                    "Status": 2
                                }]
                            }, {
                                "UserID": "6153",
                                "UserName": "vJQ",
                                "StudentCode": "40201403003",
                                "ClassName": "高三三班",
                                "BadSubject": "物理,生物",
                                "GoodSubject": "语文,理科数学",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "成绩",
                                    "Score": 628,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 138,
                                    "Status": 1
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 132,
                                    "Status": 1
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 123,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 78,
                                    "Status": 2
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 80,
                                    "Status": 0
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 77,
                                    "Status": 2
                                }]
                            }, {
                                "UserID": "6156",
                                "UserName": "VJ1",
                                "StudentCode": "40201403006",
                                "ClassName": "高三三班",
                                "BadSubject": "化学,生物",
                                "GoodSubject": "理科数学",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "成绩",
                                    "Score": 627,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 132,
                                    "Status": 0
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 137,
                                    "Status": 1
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 124,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 83,
                                    "Status": 0
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 79,
                                    "Status": 2
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 72,
                                    "Status": 2
                                }]
                            }, {
                                "UserID": "6151",
                                "UserName": "7PO",
                                "StudentCode": "40201403001",
                                "ClassName": "高三三班",
                                "BadSubject": "英语,物理,化学",
                                "GoodSubject": "语文,理科数学",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "成绩",
                                    "Score": 626,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 133,
                                    "Status": 1
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 140,
                                    "Status": 1
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 116,
                                    "Status": 2
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 74,
                                    "Status": 2
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 79,
                                    "Status": 2
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 84,
                                    "Status": 0
                                }]
                            }],
                            "Subject": [{
                                "SubjectID": 0,
                                "SubjectName": "成绩"
                            }, {
                                "SubjectID": "3",
                                "SubjectName": "语文"
                            }, {
                                "SubjectID": "4",
                                "SubjectName": "理科数学"
                            }, {
                                "SubjectID": "6",
                                "SubjectName": "英语"
                            }, {
                                "SubjectID": "9",
                                "SubjectName": "物理"
                            }, {
                                "SubjectID": "10",
                                "SubjectName": "化学"
                            }, {
                                "SubjectID": "11",
                                "SubjectName": "生物"
                            }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 短板生
        if(body.indexOf("SortSubjectUser")!=-1){
            return Mock.mock({
                'data':  {
                    "SubjectID": "3",
                            "UserList": [{
                                "UserID": "6160",
                                "UserName": "wXT",
                                "StudentCode": "40201403010",
                                "ClassName": "高三三班",
                                "BadSubject": "物理,化学",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "总分",
                                    "Score": 667,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 141,
                                    "Status": 0
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 137,
                                    "Status": 0
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 135,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 81,
                                    "Status": 2
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 80,
                                    "Status": 2
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 93,
                                    "Status": 0
                                }]
                            }, {
                                "UserID": "6154",
                                "UserName": "gO8",
                                "StudentCode": "40201403004",
                                "ClassName": "高三三班",
                                "BadSubject": "化学",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "总分",
                                    "Score": 652,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 136,
                                    "Status": 0
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 138,
                                    "Status": 0
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 129,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 83,
                                    "Status": 0
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 82,
                                    "Status": 2
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 84,
                                    "Status": 0
                                }]
                            }, {
                                "UserID": "6152",
                                "UserName": "8lO",
                                "StudentCode": "40201403002",
                                "ClassName": "高三三班",
                                "BadSubject": "物理,生物",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "总分",
                                    "Score": 646,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 141,
                                    "Status": 0
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 138,
                                    "Status": 0
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 127,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 76,
                                    "Status": 2
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 83,
                                    "Status": 0
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 81,
                                    "Status": 2
                                }]
                            }, {
                                "UserID": "6155",
                                "UserName": "qzZ",
                                "StudentCode": "40201403005",
                                "ClassName": "高三三班",
                                "BadSubject": "英语,物理",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "总分",
                                    "Score": 637,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 137,
                                    "Status": 0
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 140,
                                    "Status": 0
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 120,
                                    "Status": 2
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 76,
                                    "Status": 2
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 83,
                                    "Status": 0
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 81,
                                    "Status": 0
                                }]
                            }, {
                                "UserID": "6157",
                                "UserName": "nuf",
                                "StudentCode": "40201403007",
                                "ClassName": "高三三班",
                                "BadSubject": "化学",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "总分",
                                    "Score": 636,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 137,
                                    "Status": 0
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 135,
                                    "Status": 0
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 124,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 81,
                                    "Status": 0
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 76,
                                    "Status": 2
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 83,
                                    "Status": 0
                                }]
                            }, {
                                "UserID": "6159",
                                "UserName": "QIB",
                                "StudentCode": "40201403009",
                                "ClassName": "高三三班",
                                "BadSubject": "物理",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "总分",
                                    "Score": 636,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 137,
                                    "Status": 0
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 138,
                                    "Status": 0
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 122,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 75,
                                    "Status": 2
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 82,
                                    "Status": 0
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 82,
                                    "Status": 0
                                }]
                            }, {
                                "UserID": "6158",
                                "UserName": "ckB",
                                "StudentCode": "40201403008",
                                "ClassName": "高三三班",
                                "BadSubject": "化学,生物",
                                "SubjectList": [{
                                    "SubjectID": 0,
                                    "SubjectName": "总分",
                                    "Score": 634,
                                    "Status": 0
                                }, {
                                    "SubjectID": "3",
                                    "SubjectName": "语文",
                                    "Score": 138,
                                    "Status": 0
                                }, {
                                    "SubjectID": "4",
                                    "SubjectName": "理科数学",
                                    "Score": 132,
                                    "Status": 0
                                }, {
                                    "SubjectID": "6",
                                    "SubjectName": "英语",
                                    "Score": 126,
                                    "Status": 0
                                }, {
                                    "SubjectID": "9",
                                    "SubjectName": "物理",
                                    "Score": 81,
                                    "Status": 0
                                }, {
                                    "SubjectID": "10",
                                    "SubjectName": "化学",
                                    "Score": 77,
                                    "Status": 2
                                }, {
                                    "SubjectID": "11",
                                    "SubjectName": "生物",
                                    "Score": 80,
                                    "Status": 2
                                }]
                            }],
                            "Subject": [{
                                "SubjectID": 0,
                                "SubjectName": "总分"
                            }, {
                                "SubjectID": "3",
                                "SubjectName": "语文"
                            }, {
                                "SubjectID": "4",
                                "SubjectName": "理科数学"
                            }, {
                                "SubjectID": "6",
                                "SubjectName": "英语"
                            }, {
                                "SubjectID": "9",
                                "SubjectName": "物理"
                            }, {
                                "SubjectID": "10",
                                "SubjectName": "化学"
                            }, {
                                "SubjectID": "11",
                                "SubjectName": "生物"
                            }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 学生详情
        if(body.indexOf("teacheruserList")!=-1){
            return Mock.mock({
                'data':  {
                    "SubjectID": "3",
                            "ExamID": "15",
                            "SubjectName": "语文",
                            "UserList": [{
                                "UserID": "6160",
                                "StudentCode": "40201403010",
                                "UserName": "wXT",
                                "TotalScore": {
                                    "Score": 667,
                                    "SchoolOrder": "1",
                                    "ClassOrder": "1"
                                },
                                "Subject": {
                                    "Score": 141,
                                    "SchoolOrder": "6",
                                    "ClassOrder": "1"
                                }
                            }, {
                                "UserID": "6157",
                                "StudentCode": "40201403007",
                                "UserName": "nuf",
                                "TotalScore": {
                                    "Score": 636,
                                    "SchoolOrder": "31",
                                    "ClassOrder": "5"
                                },
                                "Subject": {
                                    "Score": 137,
                                    "SchoolOrder": "23",
                                    "ClassOrder": "5"
                                }
                            }, {
                                "UserID": "6159",
                                "StudentCode": "40201403009",
                                "UserName": "QIB",
                                "TotalScore": {
                                    "Score": 636,
                                    "SchoolOrder": "31",
                                    "ClassOrder": "5"
                                },
                                "Subject": {
                                    "Score": 137,
                                    "SchoolOrder": "23",
                                    "ClassOrder": "5"
                                }
                            }, {
                                "UserID": "6158",
                                "StudentCode": "40201403008",
                                "UserName": "ckB",
                                "TotalScore": {
                                    "Score": 634,
                                    "SchoolOrder": "38",
                                    "ClassOrder": "7"
                                },
                                "Subject": {
                                    "Score": 138,
                                    "SchoolOrder": "13",
                                    "ClassOrder": "3"
                                }
                            }, {
                                "UserID": "6191",
                                "StudentCode": "40201403041",
                                "UserName": "WQp",
                                "TotalScore": {
                                    "Score": 171,
                                    "SchoolOrder": "249",
                                    "ClassOrder": "50"
                                },
                                "Subject": {
                                    "Score": 38,
                                    "SchoolOrder": "203",
                                    "ClassOrder": "41"
                                }
                            }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 命题质量概况
        if(body.indexOf("propositionQuality")!=-1){
            return Mock.mock({
                'data':  {
                    "Reliability": {
                                "Data": "0.500",
                                "Evaluate": "一般"
                            },
                            "Diff": {
                                "Data": "0.525",
                                "Evaluate": "中等"
                            },
                            "Distinguish": {
                                "Data": "0.581",
                                "Evaluate": "很好"
                            },
                            "GoodProposition": "1,2,3,4,5,6,7,8,9,10",
                            "DistinguishLow": "",
                            "HardTest": "",
                            "EasyTest": ""
            },
                'info': 'success',
                'status': 1
            })
        }
        // 客观题选项分析
        if(body.indexOf("subjectComposition")!=-1){
            return Mock.mock({
                'data':  [{
                        "OrderID": 1,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "鉴赏环境描写；辨析并修改病句",
                        "Answer": "A",
                        "KlPlate": "现代文阅读；语言知识基础",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.28,
                        "TrueDiff": 0.53,
                        "Distinguish": 0.86
                    }, {
                        "OrderID": 2,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "分析表达技巧；分析作品结构，概括作品主题，把握文章思路",
                        "Answer": "B",
                        "KlPlate": "现代文阅读",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.72,
                        "TrueDiff": 0.52,
                        "Distinguish": 0.87
                    }, {
                        "OrderID": 3,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "文言文阅读；小作文",
                        "Answer": "D",
                        "KlPlate": "古诗文阅读；作文",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.92,
                        "TrueDiff": 0.53,
                        "Distinguish": 0.86
                    }, {
                        "OrderID": 4,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "评价诗歌的思想内容和作者的观点态度；探究文本中某些问题，提出自己的见解",
                        "Answer": "C",
                        "KlPlate": "古诗文阅读；现代文阅读",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.15,
                        "TrueDiff": 0.55,
                        "Distinguish": 0.85
                    }, {
                        "OrderID": 5,
                        "TypesName": "单选题",
                        "Score": "10",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Answer": "A",
                        "KlPlate": "现代文阅读",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.4,
                        "TrueDiff": 0.53,
                        "Distinguish": 0.86
                    }, {
                        "OrderID": 6,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Answer": "--",
                        "KlPlate": "现代文阅读",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.85,
                        "TrueDiff": 0.52,
                        "Distinguish": 0.46
                    }, {
                        "OrderID": 7,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Answer": "--",
                        "KlPlate": "现代文阅读",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.42,
                        "TrueDiff": 0.52,
                        "Distinguish": 0.46
                    }, {
                        "OrderID": 8,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Answer": "--",
                        "KlPlate": "现代文阅读",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.45,
                        "TrueDiff": 0.52,
                        "Distinguish": 0.46
                    }, {
                        "OrderID": 9,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Answer": "--",
                        "KlPlate": "现代文阅读",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.32,
                        "TrueDiff": 0.52,
                        "Distinguish": 0.45
                    }, {
                        "OrderID": 10,
                        "TypesName": "综合题",
                        "Score": "20",
                        "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                        "Answer": "--",
                        "KlPlate": "现代文阅读",
                        "Cognition": "认知水平",
                        "TestAbility": "考查能力",
                        "Diff": 0.83,
                        "TrueDiff": 0.52,
                        "Distinguish": 0.45
                    }],
                'info': 'success',
                'status': 1
            })
        }
        // 命题质量概况
        if(body.indexOf("chooseAnalysis")!=-1){
            return Mock.mock({
                'data':   [{
                    "OrderID": 1,
                    "KlName": "鉴赏环境描写；辨析并修改病句",
                    "TypesName": "单选题",
                    "Answer": "A",
                    "TrueDiff": 0.53,
                    "Distinguish": 0.86,
                    "RightRate": "26%",
                    "FirstAnswer": "A",
                    "FirstRate": "26%",
                    "SecondAnswer": "D",
                    "SecondRate": "25%",
                    "ThirdAnswer": "B",
                    "ThirdRate": "25%",
                    "OtherAnswer": "24%"
                }, {
                    "OrderID": 2,
                    "KlName": "分析表达技巧；分析作品结构，概括作品主题，把握文章思路",
                    "TypesName": "单选题",
                    "Answer": "B",
                    "TrueDiff": 0.52,
                    "Distinguish": 0.87,
                    "RightRate": "26%",
                    "FirstAnswer": "D",
                    "FirstRate": "26%",
                    "SecondAnswer": "B",
                    "SecondRate": "26%",
                    "ThirdAnswer": "A",
                    "ThirdRate": "26%",
                    "OtherAnswer": "22%"
                }, {
                    "OrderID": 3,
                    "KlName": "文言文阅读；小作文",
                    "TypesName": "单选题",
                    "Answer": "D",
                    "TrueDiff": 0.53,
                    "Distinguish": 0.86,
                    "RightRate": "25%",
                    "FirstAnswer": "C",
                    "FirstRate": "26%",
                    "SecondAnswer": "D",
                    "SecondRate": "25%",
                    "ThirdAnswer": "B",
                    "ThirdRate": "25%",
                    "OtherAnswer": "24%"
                }, {
                    "OrderID": 4,
                    "KlName": "评价诗歌的思想内容和作者的观点态度；探究文本中某些问题，提出自己的见解",
                    "TypesName": "单选题",
                    "Answer": "C",
                    "TrueDiff": 0.55,
                    "Distinguish": 0.85,
                    "RightRate": "25%",
                    "FirstAnswer": "D",
                    "FirstRate": "25%",
                    "SecondAnswer": "C",
                    "SecondRate": "25%",
                    "ThirdAnswer": "B",
                    "ThirdRate": "25%",
                    "OtherAnswer": "25%"
                }, {
                    "OrderID": 5,
                    "KlName": "根据文章内容进行推断和想象；体会重要语句的丰富含意，品味精彩的语言艺术",
                    "TypesName": "单选题",
                    "Answer": "A",
                    "TrueDiff": 0.53,
                    "Distinguish": 0.86,
                    "RightRate": "27%",
                    "FirstAnswer": "A",
                    "FirstRate": "27%",
                    "SecondAnswer": "B",
                    "SecondRate": "25%",
                    "ThirdAnswer": "D",
                    "ThirdRate": "24%",
                    "OtherAnswer": "24%"
                }],
                'info': 'success',
                'status': 1
            })
        }
        // 试卷难度区分度分布
        if(body.indexOf("diffDistinguish")!=-1){
            return Mock.mock({
                'data':  {
                    "DiffDistribution": [1, 2, 3, 4],
                            "Distinguish": [3, 5, 1, 1]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 成绩分布
        if(body.indexOf("scoreDistribution")!=-1){
            return Mock.mock({
                'data':  [{
                        "Interval": "150--140",
                        "UserCount": 84
                    }, {
                        "Interval": "140--130",
                        "UserCount": 316
                    }, {
                        "Interval": "130--120",
                        "UserCount": 0
                    }, {
                        "Interval": "120--110",
                        "UserCount": 0
                    }, {
                        "Interval": "110--100",
                        "UserCount": 11
                    }, {
                        "Interval": "100--90",
                        "UserCount": 84
                    }, {
                        "Interval": "90--80",
                        "UserCount": 307
                    }, {
                        "Interval": "80--70",
                        "UserCount": 448
                    }, {
                        "Interval": "70--60",
                        "UserCount": 282
                    }, {
                        "Interval": "60--50",
                        "UserCount": 60
                    }, {
                        "Interval": "50--40",
                        "UserCount": 19
                    }, {
                        "Interval": "40--30",
                        "UserCount": 222
                    }, {
                        "Interval": "30--20",
                        "UserCount": 164
                    }, {
                        "Interval": "20--10",
                        "UserCount": 3
                    }, {
                        "Interval": "10--0",
                        "UserCount": 0
                    }],
                'info': 'success',
                'status': 1
            })
        }
        // 试卷难度区分度分布
        if(body.indexOf("testDiff")!=-1){
            return Mock.mock({
                'data':   [{
                        "OrderID": "1",
                        "Diff": "0.284",
                        "TrueDiff": "0.533"
                    }, {
                        "OrderID": "2",
                        "Diff": "0.716",
                        "TrueDiff": "0.522"
                    }, {
                        "OrderID": "3",
                        "Diff": "0.920",
                        "TrueDiff": "0.528"
                    }, {
                        "OrderID": "4",
                        "Diff": "0.149",
                        "TrueDiff": "0.545"
                    }, {
                        "OrderID": "5",
                        "Diff": "0.398",
                        "TrueDiff": "0.528"
                    }, {
                        "OrderID": "6",
                        "Diff": "0.851",
                        "TrueDiff": "0.523"
                    }, {
                        "OrderID": "7",
                        "Diff": "0.423",
                        "TrueDiff": "0.522"
                    }, {
                        "OrderID": "8",
                        "Diff": "0.449",
                        "TrueDiff": "0.524"
                    }, {
                        "OrderID": "9",
                        "Diff": "0.323",
                        "TrueDiff": "0.520"
                    }, {
                        "OrderID": "10",
                        "Diff": "0.827",
                        "TrueDiff": "0.520"
                    }],
                'info': 'success',
                'status': 1
            })
        }



        //用户反馈
        if (body.indexOf("getFeedback") != -1) {
            return Mock.mock({
                'data': {
                    "status": 0
                },
                'info': 'success',
                'status': 1
            })
        }

    });


    var review = /\/Review\/Index\/getApi\.html/;
    Mock.mock(review, "post", function(opt) {
        var body = opt.body;
        // 首页列表
        if(body.indexOf("reviewList")!=-1){
            return Mock.mock({
                'data':  {
                "PageNum": 1,
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
        // 试题评阅
        if(body.indexOf("userTestReview")!=-1){
            return Mock.mock({"data":"该科目所有试题已分配或已批改，请重新选择科目","status":70320,"url":null})
        }
        // 进度查询
        if(body.indexOf("subjectTestSpeed")!=-1){
            return Mock.mock({
                'data':  {
                    "ExamName": "2016年末月考测试",
                    "SubjectName": "文科数学",
                    "StudentNum": "2",
                    "ReviewNum": 2,
                    "AvgScore": 11,
                    "OrderStart": "27(0)",
                    "OrderEnd": "27(0)",
                    "Score": 12,
                    "DateList": [{
                        "Date": "2017-01-10",
                        "ReviewNum": 2
                    }],
                    "AvgSpeed": 1.5,
                    "ScoreList": [{
                        "Score": "10.0",
                        "Num": "1"
                    }, {
                        "Score": "12.0",
                        "Num": "1"
                    }]
            },
                'info': 'success',
                'status': 1
            })
        }
        // 试题评阅
        if(body.indexOf("testRecheckList")!=-1){
            return Mock.mock({
                'data':  {
                "TestNum": "35",
                "TestList": [{
                    "ListID": "118",
                    "Score": "0.0"
                }, {
                    "ListID": "157",
                    "Score": "0.0"
                }, {
                    "ListID": "96",
                    "Score": "0.0"
                }, {
                    "ListID": "168",
                    "Score": "50.0"
                }, {
                    "ListID": "156",
                    "Score": "0.0"
                }, {
                    "ListID": "167",
                    "Score": "6.0"
                }, {
                    "ListID": "117",
                    "Score": "0.0"
                }, {
                    "ListID": "95",
                    "Score": "0.0"
                }, {
                    "ListID": "155",
                    "Score": "0.0"
                }, {
                    "ListID": "166",
                    "Score": "6.0"
                }],
                "PageNum": 4,
                "ExamName": "2016年普通高招全国统一考试临考预测押题密卷考试",
                "SubjectName": "语文"
            },
                'info': 'success',
                'status': 1
            })
        }
        // 试题评阅
        if(body.indexOf("oneTestRecheck")!=-1){
            return Mock.mock({"data":"没有查到相关评分标准！","status":70323,"url":null})
        }
        if(body.indexOf("clickSearch")!=-1){
            return Mock.mock({
                'data':  [{
                "OrderID": "1",
                "StepNum": "0"
            }, {
                "OrderID": "3",
                "StepNum": "0"
            }, {
                "OrderID": "4",
                "StepNum": "0"
            }, {
                "OrderID": "5",
                "StepNum": "0"
            }, {
                "OrderID": "6",
                "StepNum": "0"
            }, {
                "OrderID": "7",
                "StepNum": "1"
            }, {
                "OrderID": "7",
                "StepNum": "2"
            }, {
                "OrderID": "8",
                "StepNum": "0"
            }, {
                "OrderID": "9",
                "StepNum": "0"
            }, {
                "OrderID": "10",
                "StepNum": "1"
            }, {
                "OrderID": "10",
                "StepNum": "2"
            }, {
                "OrderID": "10",
                "StepNum": "3"
            }, {
                "OrderID": "11",
                "StepNum": "1"
            }, {
                "OrderID": "11",
                "StepNum": "2"
            }, {
                "OrderID": "11",
                "StepNum": "3"
            }, {
                "OrderID": "11",
                "StepNum": "4"
            }, {
                "OrderID": "12",
                "StepNum": "1"
            }, {
                "OrderID": "12",
                "StepNum": "2"
            }, {
                "OrderID": "12",
                "StepNum": "3"
            }, {
                "OrderID": "12",
                "StepNum": "4"
            }, {
                "OrderID": "13",
                "StepNum": "0"
            }, {
                "OrderID": "14",
                "StepNum": "0"
            }, {
                "OrderID": "15",
                "StepNum": "0"
            }, {
                "OrderID": "16",
                "StepNum": "1"
            }, {
                "OrderID": "16",
                "StepNum": "2"
            }, {
                "OrderID": "16",
                "StepNum": "3"
            }, {
                "OrderID": "17",
                "StepNum": "0"
            }, {
                "OrderID": "18",
                "StepNum": "0"
            }],
                'info': 'success',
                'status': 1
            })
        }
        // 考试详情
        if(body.indexOf("reviewContent")!=-1){
            return Mock.mock({
                'data':   {
                "SubjectID": 3,
                "SubjectName": "语文",
                "IfSwitch": "0",
                "ExamTime": "2005-04-04 00:27:43",
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
                "ReviewNum": 0,
                "NoReviewNum": "1",
                "MissStudentNum": "0",
                "TrueStudentNum": 1,
                "EmptyStudentNum": 0,
                "ProblemStudentNum": "0",
                "ReviewStudentNum": "1"
            },
                'info': 'success',
                'status': 1
            })
        }
        // 样卷对比
        if(body.indexOf("testContrast")!=-1){
            return Mock.mock({
                'data': {
                "ExamName": "2016年末月考测试",
                "SubjectName": "文科数学",
                "TestList": [{
                    "OrderID": "27",
                    "Answer": "<p>解：(Ⅰ)由<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image925.png\" style=\"vertical-align:middle;\" />&nbsp;，得<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image931.png\" style=\"vertical-align:middle;\" />&nbsp;，即曲线<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image109.png\" style=\"vertical-align:middle;\" />&nbsp;的直角坐标方程为<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image109.png\" style=\"vertical-align:middle;\" />&nbsp;.</p>\r\n<p>(Ⅱ)将直线<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image109.png\" style=\"vertical-align:middle;\" />&nbsp;的方程代入<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image933.png\" style=\"vertical-align:middle;\" />&nbsp;，并整理得<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image935.png\" style=\"vertical-align:middle;\" />&nbsp;，<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image937.png\" style=\"vertical-align:middle;\" />&nbsp;，<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image939.png\" style=\"vertical-align:middle;\" />&nbsp;.</p>\r\n<p>所以<img src=\"http://192.168.211.204:8010/Uploads/word/2015/0720/55ac982a7c130275094.files/image941.png\" style=\"vertical-align:middle;\" />&nbsp;.</p>"
                    }],
                    "StudentAnswerImg": "http://192.168.211.204:9011/Uploads/yuejuan/201701/29/64/233/64201501002/5/04736da1e3f51ed1796cd9126583a195.jpg"
                    },
                'info': 'success',
                'status': 1
            })
        }
        // 评分标准
        if(body.indexOf("subjectTestStandard")!=-1){
            return Mock.mock({
                'data': {
                "ExamName": "2016年末月考测试",
                "SubjectName": "文科数学",
                "TypesList": [{
                    "TypesName": "解答题",
                    "TypesScore": 12,
                    "TestList": [{
                        "OrderID": "27",
                        "Answer": "<p>   解：(Ⅰ)由 <img src=\"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489146656169&di=b2b1e7b096aa7593b7d87563efc8d7ad&imgtype=0&src=http%3A%2F%2Fwww.zhx.e21.cn%2Fhtml%2Fupload%2F2015%2F11%2F02%2Ffile1446424945.jpg\" style=\"vertical-align:middle;\" ",
                        "Score": "12",
                        "Scoring": "<strong>第27题</strong>"
                    }]
                }]
            },
                'info': 'success',
                'status': 1
            })
        }
    });


    // var MOCK = {
    //     init: function() {
    //         var e = this;
    //         e.login();
    //         e.xuesheng.getExamHeadData();
    //         e.xuesheng.getXschengjigk();
    //         e.xuesheng.getXschengjipm();
    //         e.xuesheng.getXschengjizuigaofenPingjunfen();
    //         e.xuesheng.getXschengjijinbucd();
    //         e.xuesheng.getXschengjigekeqk();
    //         e.xuesheng.getXschengjixj();
    //         e.xuesheng.getAnalySubject();
    //         e.xuesheng.getSourcePaper();
    //         e.xuesheng.getSubTestAnaly();
    //         e.xuesheng.getKaodiandefenlv();
    //         e.xuesheng.getZhangjiedcd();
    //         e.xuesheng.getNenglijg();
    //         e.xuesheng.getKnowledgePoint();
    //         e.bzr.getClassTeyousheng();
    //         e.bzr.getClassAlinejiesheng();
    //         e.bzr.getClassBlinejiesheng();
    //         e.bzr.getClassADuanbansheng();
    //         e.bzr.getClassBDuanbansheng();

    //     },
    //     //登录验证
    //     login: function() {
    //         Mock.mock(/login/, "post", function(options) {
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
    //     xuesheng: {
    //         getExamHeadData: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getExamHeadData/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "examID": "282390",
    //                         "examName": "2016届高三年级全国九省大联考（一）",
    //                         "reportType": "班级学科报告(生物)",
    //                         "classes": "理科",
    //                         "time": "2016-09-13",
    //                         "gradeName": "高三",
    //                         "peopleNum": "99",
    //                         "school": "某某第一中学"
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getXschengjigk: function() {},
    //         getXschengjipm: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getXschengjipm/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "peopleNum": 90,
    //                         "legend": ["班级排名", "校级排名", "总排名"],
    //                         "xAxis": ['全科', '语文', '数学', '英语', '物理', '化学', '生物'],
    //                         "series": [
    //                             [75, 42, 42, 63, 92, 64, 36],
    //                             [70, 40, 39, 60, 90, 62, 32],
    //                             [71, 43, 32, 62, 91, 60, 30]
    //                         ]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 });
    //             })
    //         },
    //         getXschengjizuigaofenPingjunfen: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getXschengjizuigaofenPingjunfen/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "name": ["我的成绩", "班最高分", "班平均分", "校最高分", "校平均分", "总最高分", "总平均分"],
    //                         "xAxis": ['全科', '语文', '数学', '英语', '物理', '化学', '生物'],
    //                         "series": [
    //                             [680, 120, 119, 120, 90, 82, 92],
    //                             [700, 134, 145, 138, 97, 96, 100],
    //                             [480, 88, 90, 92, 50, 60, 45],
    //                             [700, 134, 145, 138, 97, 96, 100],
    //                             [450, 82, 90, 82, 40, 40, 35],
    //                             [630, 134, 140, 130, 91, 91, 90],
    //                             [440, 80, 90, 80, 30, 65, 40]
    //                         ],
    //                         "fullScore": 720
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 });
    //             })
    //         },
    //         getXschengjijinbucd: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getXschengjijinbucd/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "legend": ["班级进步程度", "校级进步程度", "总体进步程度"],
    //                         "xAxis": [
    //                             '2016届高三年级全国九省第一次大联考',
    //                             '2016届高三年级全国九省第二次大联考',
    //                             '2016届高三年级全国九省第三次大联考',
    //                             '2016届高三年级全国九省第四次大联考',
    //                             '2016届高三年级全国九省第五次大联考',
    //                             '2016届高三年级全国九省第六次大联考'
    //                         ],
    //                         "series": [
    //                             [42, 50, 45, 41, 52, 52],
    //                             [39, 49, 41, 42, 54, 55],
    //                             [45, 52, 44, 47, 53, 51]
    //                         ],
    //                         "fullScore": 720
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 });
    //             })
    //         },
    //         getXschengjigekeqk: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getXschengjigekeqk/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "xAxis": ['语文', '数学', '英语', '物理', '化学', '生物'],
    //                         "series": [
    //                             [130, 119, 120, 90, 82, 92],
    //                             [120, 120, 120, 80, 80, 80],
    //                             [110, 110, 110, 75, 75, 75]
    //                         ],
    //                         "name": ["我的分数", "一本分数线", "二本分数线"],
    //                         "goodSubject": ["语文", "语文注重积累和感悟。不能忽视这类学科的学习，否则备考时压力会很大。多读多积累最重要。"],
    //                         "badSubject": ["数学", "数学学科注重理解和运用，多做题，强化题型很重要，试题库成为你的秘密武器。"]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 });
    //             })
    //         },
    //         getXschengjixj: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getXschengjixj/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "studentName": "小名",
    //                         "total": "701",
    //                         "allSchool": "90.34%",
    //                         "classPeople": "76",
    //                         "classRank": "1",
    //                         "gradePeople": "1023",
    //                         "gradeRank": "10",
    //                         "liankaoPeople": "6957",
    //                         "liankaoRank": "21",
    //                         "desc": "请继续努力，希望你下次考出更好的成绩，不断超越自己！"
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getAnalySubject: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getAnalySubject/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "subjectID": [12, 13, 14, 15, 16, 17],
    //                         "subjectName": ['语文', '数学', '英语', '物理', '化学', '生物']
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getSourcePaper: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getSourcePaper/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "imageUrl": "@image(1800x1800)"
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getSubTestAnaly: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getSubTestAnaly/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         //题号    题型  分值  知识点 难度  校均得分    班均得分    个人得分    本人作答    正确答案    视频解析
    //                         "thead": [
    //                             [{ "cont": "题号" }, { "cont": "题型" }, { "cont": "分值" }, { "cont": "知识点" }, { "cont": "难度" }, { "cont": "校均得分" }, { "cont": "班均得分" }, { "cont": "个人得分" }, { "cont": "本人作答" }, { "cont": "正确答案" }, { "cont": "视频解析" }]
    //                         ],
    //                         "tbody": [
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }],
    //                             [{ "cont": "1" }, { "cont": "选择题" }, { "cont": "10" }, { "cont": "现代文阅读" }, { "cont": "0.5" }, { "cont": "7" }, { "cont": "7" }, { "cont": "6.5" }, { "cont": "-" }, { "cont": "B" }, { "cont": "-" }]
    //                         ]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getKaodiandefenlv: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getKaodiandefenlv/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "xAxis": ['1题', '2题', '3题', '4题', '5题', '6题', '7题', '8题', '9题', '10题', '11题', '12题', '13题'],
    //                         "series": [
    //                             [90, 19, 60, 90, 82, 92, 90, 19, 60, 90, 82, 92, 38],
    //                             [60, 50, 40, 50, 40, 60, 90, 82, 92, 38, 80, 80, 80],
    //                             [60, 90, 82, 92, 38, 80, 80, 80, 60, 60, 75, 75, 75],
    //                             [90, 19, 60, 90, 82, 92, 90, 19, 60, 90, 82, 92, 38],
    //                         ],
    //                         "name": ["我的得分率", "班平均得分率", "校平均得分率", "总平均得分率"]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getZhangjiedcd: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getZhangjiedcd/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         //知识点   总分  个人得分    A线达标分   B线达标分   等级
    //                         "thead": [
    //                             [{ "cont": "知识点" }, { "cont": "总分" }, { "cont": "个人得分" }, { "cont": "A线达标分" }, { "cont": "B线达标分" }, { "cont": "等级" }]
    //                         ],
    //                         "tbody": [
    //                             [{ "cont": "现代文阅读" }, { "cont": "10" }, { "cont": 7 }, { "cont": "8" }, { "cont": "7" }, { "cont": "B" }],
    //                             [{ "cont": "现代文阅读" }, { "cont": "10" }, { "cont": 7 }, { "cont": "8" }, { "cont": "7" }, { "cont": "B" }],
    //                             [{ "cont": "现代文阅读" }, { "cont": "10" }, { "cont": 7 }, { "cont": "8" }, { "cont": "7" }, { "cont": "B" }],
    //                             [{ "cont": "现代文阅读" }, { "cont": "10" }, { "cont": 7 }, { "cont": "8" }, { "cont": "7" }, { "cont": "B" }],
    //                             [{ "cont": "现代文阅读" }, { "cont": "10" }, { "cont": 7 }, { "cont": "8" }, { "cont": "7" }, { "cont": "B" }]
    //                         ]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getNenglijg: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getNenglijg/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "item": ['表达应用', '分析综合', '鉴赏评价', '理解', '识记'],
    //                         "min": [0, 0, 0, 0, 0],
    //                         "max": [150, 150, 150, 150, 150],
    //                         "series": [
    //                             [130, 119, 120, 90, 82],
    //                             [120, 120, 120, 80, 80],
    //                             [110, 110, 110, 75, 75]
    //                         ],
    //                         "name": ["我的能力分布", "A线达标能力分布", "B线达标能力分布"]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getKnowledgePoint: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getKnowledgePoint/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         "hold": ['表达应用', '分析综合', '鉴赏评价', '理解', '识记'],
    //                         "unHold": {
    //                             "pointName": ['表达应用', '分析综合', '鉴赏评价', '理解', '识记'],
    //                             "score": [4, 4, 4, 4, 4],
    //                             "mineRatio": [50, 50, 50, 50, 50],
    //                             "examRatio": [65, 65, 65, 65, 65]
    //                         }
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         }
    //     },
    //     bzr: {
    //         getClassTeyousheng: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getClassTeyousheng/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         //知识点   总分  个人得分    A线达标分   B线达标分   等级
    //                         "thead": [
    //                             [{ "cont": "学号", "rowspan": 2 }, { "cont": "姓名", "rowspan": 2 }, { "cont": "语文", "colspan": 3 }, { "cont": "数学", "colspan": 3 }, { "cont": "英语", "colspan": 3 }, { "cont": "物理", "colspan": 3 }, { "cont": "化学", "colspan": 3 }, { "cont": "生物", "colspan": 3 }, { "cont": "总分", "colspan": 3 }],
    //                             [{ "cont": "成绩" }, { "cont": "总名" }, { "cont": "校名" }, { "cont": "成绩" }, { "cont": "总名" }, { "cont": "校名" }, { "cont": "成绩" }, { "cont": "总名" }, { "cont": "校名" }, { "cont": "成绩" }, { "cont": "总名" }, { "cont": "校名" }, { "cont": "成绩" }, { "cont": "总名" }, { "cont": "校名" }, { "cont": "成绩" }, { "cont": "总名" }, { "cont": "校名" }, { "cont": "成绩" }, { "cont": "总名" }, { "cont": "校名" }]
    //                         ],
    //                         "tbody": [
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 600 }, { "cont": 1 }, { "cont": 1 }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 600 }, { "cont": 1 }, { "cont": 1 }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 600 }, { "cont": 1 }, { "cont": 1 }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 600 }, { "cont": 1 }, { "cont": 1 }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 600 }, { "cont": 1 }, { "cont": 1 }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 600 }, { "cont": 1 }, { "cont": 1 }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 600 }, { "cont": 1 }, { "cont": 1 }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 100 }, { "cont": 1 }, { "cont": 1 }, { "cont": 600 }, { "cont": 1 }, { "cont": 1 }]
    //                         ]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getClassAlinejiesheng: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getClassAlinejiesheng/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         //知识点   总分  个人得分    A线达标分   B线达标分   等级
    //                         "thead": [
    //                             [{ "cont": "学号" }, { "cont": "姓名" }, { "cont": "成绩" }, { "cont": "语文" }, { "cont": "数学" }, { "cont": "英语" }, { "cont": "物理" }, { "cont": "化学" }, { "cont": "生物" }, { "cont": "优势学科" }, { "cont": "劣势学科" }]
    //                         ],
    //                         "tbody": [
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }]
    //                         ]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getClassBlinejiesheng: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getClassBlinejiesheng/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         //知识点   总分  个人得分    A线达标分   B线达标分   等级
    //                         "thead": [
    //                             [{ "cont": "学号" }, { "cont": "姓名" }, { "cont": "成绩" }, { "cont": "语文" }, { "cont": "数学" }, { "cont": "英语" }, { "cont": "物理" }, { "cont": "化学" }, { "cont": "生物" }, { "cont": "优势学科" }, { "cont": "劣势学科" }]
    //                         ],
    //                         "tbody": [
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "语文、物理" }, { "cont": "生物" }]
    //                         ]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getClassADuanbansheng: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getClassADuanbansheng/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         //知识点   总分  个人得分    A线达标分   B线达标分   等级
    //                         "thead": [
    //                             [{ "cont": "学号" }, { "cont": "姓名" }, { "cont": "成绩" }, { "cont": "语文" }, { "cont": "数学" }, { "cont": "英语" }, { "cont": "物理" }, { "cont": "化学" }, { "cont": "生物" }, { "cont": "劣势学科" }]
    //                         ],
    //                         "tbody": [
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }]
    //                         ]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         },
    //         getClassBDuanbansheng: function() {
    //             var reg = /\/Analysis\/Index\/getApi\.html\?getClassBDuanbansheng/;
    //             Mock.mock(reg, "get", function() {
    //                 return Mock.mock({
    //                     'data': {
    //                         //知识点   总分  个人得分    A线达标分   B线达标分   等级
    //                         "thead": [
    //                             [{ "cont": "学号" }, { "cont": "姓名" }, { "cont": "成绩" }, { "cont": "语文" }, { "cont": "数学" }, { "cont": "英语" }, { "cont": "物理" }, { "cont": "化学" }, { "cont": "生物" }, { "cont": "劣势学科" }]
    //                         ],
    //                         "tbody": [
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }],
    //                             [{ "cont": "00000001" }, { "cont": "小明" }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 100 }, { "cont": 600 }, { "cont": "生物" }]
    //                         ]
    //                     },
    //                     'info': 'success',
    //                     'status': 1
    //                 })
    //             })
    //         }
    //     }
    // };
    // MOCK.init();
    //exports.MOCK = MOCK;
});
