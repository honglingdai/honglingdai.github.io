define(function (require, exports) {
    var analy = require("analy");
    var $region_gexiaozuigaofen = $("#region_gexiaozuigaofen");

    var template = {
        createtable:function(json){
            var GroupList = json.GroupList,
                Subject = json.Subject,
                html = "";
            html += '<thead>'+
                '<tr>' +
                '<th><b>学科</b></th>';
            for(var i = 0 ; i < Subject.length; i++){
                html += '<th><b>'+Subject[i].SubjectName+'</b></th>';
            }
            html += '</tr>'+
                '</thead>'+
                '<tbody>';
            for(var j = 0 ; j < GroupList.length; j++){
                var SubjectList = GroupList[j].SubjectList;
                html += '<tr>' +
                    '<th><b>'+GroupList[j].GroupName+'</b></th>';
                for(var k = 0 ; k < SubjectList.length; k++){
                    html += '<th>'+SubjectList[k].Score +'</th>'
                }
                html +=  '</tr>'
            }
            html += '</tbody>';
            return html;
        }
    };

    // 校长联考优秀学生分布
    exports.region_zuigaofen = function(){
        var param={
            params:["areaScoreMax"],
            userID: $.cookie("yj_front_UserID"),
            examID: $.cookie("analy_ExamID"),
            areaID:$.cookie("analy_AreaID")
        };
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                //表格
                $region_gexiaozuigaofen.html(template.createtable(data.data));
                analy.isShowMore($region_gexiaozuigaofen);
                analy.outputHtmlToExcel($region_gexiaozuigaofen);
            }else{
                // 数据为空时
                $region_gexiaozuigaofen.subDataEmpty(0);
            }
        })
    };
});