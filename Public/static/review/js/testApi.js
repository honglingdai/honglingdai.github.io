define(function (require) {
    require("./logic");

    /*jsonFormat;*/
    var formatJson = function(json, options) {
        var reg = null,
            formatted = '',
            pad = 0,
            PADDING = '    '; // one can also use '\t' or a different number of spaces

        // optional settings
        options = options || {};
        // remove newline where '{' or '[' follows ':'
        options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
        // use a space after a colon
        options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

        // begin formatting...
        if (typeof json !== 'string') {
            // make sure we start with the JSON as a string
            json = JSON.stringify(json);
        } else {
            // is already a string, so parse and re-stringify in order to remove extra whitespace
            json = JSON.parse(json);
            json = JSON.stringify(json);
        }

        // add newline before and after curly braces
        reg = /([\{\}])/g;
        json = json.replace(reg, '\r\n$1\r\n');

        // add newline before and after square brackets
        reg = /([\[\]])/g;
        json = json.replace(reg, '\r\n$1\r\n');

        // add newline after comma
        reg = /(\,)/g;
        json = json.replace(reg, '$1\r\n');

        // remove multiple newlines
        reg = /(\r\n\r\n)/g;
        json = json.replace(reg, '\r\n');

        // remove newlines before commas
        reg = /\r\n\,/g;
        json = json.replace(reg, ',');

        // optional formatting...
        if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
            reg = /\:\r\n\{/g;
            json = json.replace(reg, ':{');
            reg = /\:\r\n\[/g;
            json = json.replace(reg, ':[');
        }
        if (options.spaceAfterColon) {
            reg = /\:/g;
            json = json.replace(reg, ':');
        }

        $.each(json.split('\r\n'), function(index, node) {
            var i = 0,
                indent = 0,
                padding = '';

            if (node.match(/\{$/) || node.match(/\[$/)) {
                indent = 1;
            } else if (node.match(/\}/) || node.match(/\]/)) {
                if (pad !== 0) {
                    pad -= 1;
                }
            } else {
                indent = 0;
            }

            for (i = 0; i < pad; i++) {
                padding += PADDING;
            }

            formatted += padding + node + '\r\n';
            pad += indent;
        });

        return formatted;
    };


    var i = 0;
    function testApi(param){
        $.handler(param,function(data){
            i++;
            var str = JSON.stringify(data);
            $(".body").append("<h3 class='text-primary f18'>"+i+
            '.&nbsp;&nbsp;'+(param.params).toString()+"</h3><div><pre" +
            " style='font-family: Consolas, Monaco, monospace'>"+formatJson(str)+"</pre></div><hr/><br>");
        })
    }
    $.testApi = testApi;


    //$.cookie("ListID",103);
    //$.cookie("SubjectID",3);
    //$.cookie("ExamID",9);
    //$.cookie("CutID",9);

    //不需要登录的验证
    $.testApi({
        params:["checkNoLoginPower_no"]
    });
    //验证登录状态
    $.testApi({
        params:["checkReviewPower_no"],
        userID: $.cookie("UserID")
    });
    //验证码
    //$.testApi({
    //    params:["verify_no"],
    //    width:100,
    //    height:50,
    //    ifMobile:0
    //});
    //reviewLogin_no
    $.testApi({
        params:["reviewLogin_no"],
        userName:'yang',
        password:'111111'
    });

    //reviewList
    $.testApi({
        params:["reviewList"],
        userID: $.cookie("UserID"),
        page: 1

    });
    //reviewContent
    $.testApi({
        params:["reviewContent"],
        userID: $.cookie("UserID"),
        examID: $.cookie("ExamID"),
        subjectID: $.cookie("SubjectID")
    });
    //subjectTestStandard
    $.testApi({
        params:["subjectTestStandard"],
        userID: $.cookie("UserID"),
        examID: $.cookie("ExamID"),
        subjectID: $.cookie("SubjectID")
    });
    //testContrast
    $.testApi({
        params:["subjectTestSpeed"],
        userID: $.cookie("UserID"),
        examID: $.cookie("ExamID"),
        subjectID: $.cookie("SubjectID"),
        cutID: $.cookie("CutID")
    });
    //testContrast
    $.testApi({
        params:["testContrast"],
        userID: $.cookie("UserID"),
        listID: $.cookie("ListID")

    });
    //testRecheckList
    $.testApi({
        params:["testRecheckList"],
        userID: $.cookie("UserID"),
        examID: $.cookie("ExamID"),
        subjectID: $.cookie("SubjectID"),
        page: 1

    });
    //oneTestRecheck
    $.testApi({
        params:["oneTestRecheck"],
        userID: $.cookie("UserID"),
        examID: $.cookie("ExamID"),
        subjectID: $.cookie("SubjectID"),
        listID: $.cookie("ListID")

    });
    //customTestRecheckList
    $.testApi({
        params:["customTestRecheckList"],
        userID: $.cookie("UserID"),
        examID: $.cookie("ExamID"),
        subjectID: $.cookie("SubjectID"),
        page: 1

    });
    //userTestReview
    //$.testApi({
    //    params:["userTestReview"],
    //    userID: $.cookie("UserID"),
    //    examID: $.cookie("ExamID"),
    //    subjectID: $.cookie("SubjectID")
    //});

    //testReviewAgain
    //$.testApi({
    //    params:["testReviewAgain"],
    //    userID: $.cookie("UserID"),
    //    listID: $.cookie("ListID")
    //
    //});

     //clickSearch
    $.testApi({
        params:["clickSearch"],
        userID: $.cookie("UserID"),
        examID: $.cookie("ExamID"),
        subjectID: $.cookie("SubjectID")
    });

    //submitReviewResult
    //$.testApi({
    //    params:["submitReviewResult"],
    //    userID: $.cookie("UserID"),
    //    listID: $.cookie("ListID"),
    //    status: 1,
    //    testList: '{"试题序号id":{"步骤序号":得分,"步骤序号":得分},{"试题序号id":"步骤序号":得分,"步骤序号":得分}}'
    //
    //});
});

