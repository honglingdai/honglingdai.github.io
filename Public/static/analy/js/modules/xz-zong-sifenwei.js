define(function (require, exports) {
    // 联考四分位分析
    var analy = require("analy");
    var template = {
        createtable:function(list){
            var html = "";
            html += '<thead>'+
                '<tr>'+
                '<th colspan="2"><b>学科</b></th>';
            for(var i = 0 ; i < list.length;i++){
                html += '<th><b>'+list[i].SubjectName+'</b></th>'
            }
            html += '</tr>'+
                '</thead>'+
                '<tbody>'+
                '<tr>'+
                '<td colspan="2">'+
                '<b>平均分</b>'+
                '</td>';
            for(var i = 0 ; i < list.length;i++){
                html += '<td>'+ list[i].AvgScore +'</td>'
            }
            html += '</tr><tr>' +
                '<td colspan="2"><b>标准差</b></td>'
            for(var i = 0 ; i < list.length;i++){
                html += '<td>'+ list[i].Deviation +'</td>'
            }
            html += '</tr><tr>' +
                '<td rowspan="4"><b>百分比%</b></td>' +
                '<td><b>90%</b></td>'
            for(var i = 0 ; i < list.length;i++){
                html += '<td>'+ list[i]["90AvgScore"] +'</td>'
            }
            html += '</tr><tr>' +
                '<td><b>75%</b></td>'
            for(var i = 0 ; i < list.length;i++){
                html += '<td>'+ list[i]["75AvgScore"] +'</td>'
            }
            html += '</tr><tr>' +
                '<td><b>50%</b></td>'
            for(var i = 0 ; i < list.length;i++){
                html += '<td>'+ list[i]["50AvgScore"] +'</td>'
            }
            html += '</tr><tr>' +
                '<td><b>25%</b></td>'
            for(var i = 0 ; i < list.length;i++){
                html += '<td>'+ list[i]["25AvgScore"] +'</td>'
            }
            html += '</tr></tbody>'
            return html;
        }
    };
    exports.sifenweifenxi = function(){
        //参数配置
        var param,
            baseParam = {
                params:["limitAvgScore"],
                userID: $.cookie("yj_front_UserID"),
                examID: $.cookie("analy_ExamID")
            },
            // 校长参数
            param_rector = {
                schoolID : $.cookie("analy_SchoolID")
            },
            // 区域参数
            param_region = {
                areaID : $.cookie("analy_AreaID")
            };
        // 根据身份id 配置参数
        switch (role){
            case "4" : param = $.extend({},baseParam,param_rector);
                break;
            case "5" : param = $.extend({},baseParam,param_region);
                break;
        }
        $.analyzeHandler(param,function(data){
            if(data.status===1){
                var $sifenweifenxi = $("#xz-sifenweifenxi");
                //表格
                $sifenweifenxi.html(template.createtable(data.data));
                analy.outputHtmlToExcel($sifenweifenxi);

            }else{
                // 数据为空时
                $sifenweifenxi.subDataEmpty(0);
            }
        })
    };

    //表格数据
    // exports.sifenweifenxi = function(){
    //     var params={
    //         params:["limitAvgScore"],
    //         userID: $.cookie("yj_front_UserID"),
    //         examID: $.cookie("analy_ExamID"),
    //         schoolID:$.cookie("analy_SchoolID")
    //     };
    //     $.analyzeHandler(params,function(data){
    //         var $sifenweifenxi = $("#xz-sifenweifenxi");
    //         if(data.status===1){
    //             var list = data.data;
    //             var html = "";
    //             html += '<thead>'+
    //                 '<tr>'+
    //                 '<th colspan="2"><b>学科</b></th>';
    //             for(var i = 0 ; i < list.length;i++){
    //                 html += '<th><b>'+list[i].SubjectName+'</b></th>'
    //             }
    //             html += '</tr>'+
    //                 '</thead>'+
    //                 '<tbody>'+
    //                 '<tr>'+
    //                 '<td colspan="2">'+
    //                 '<b>平均分</b>'+
    //                 '</td>';
    //             for(var i = 0 ; i < list.length;i++){
    //                 html += '<td>'+ list[i].AvgScore +'</td>'
    //             }
    //             html += '</tr><tr>' +
    //                 '<td colspan="2"><b>标准差</b></td>'
    //             for(var i = 0 ; i < list.length;i++){
    //                 html += '<td>'+ list[i].Deviation +'</td>'
    //             }
    //             html += '</tr><tr>' +
    //                 '<td rowspan="4"><b>百分比%</b></td>' +
    //                 '<td><b>90%</b></td>'
    //             for(var i = 0 ; i < list.length;i++){
    //                 html += '<td>'+ list[i]["90AvgScore"] +'</td>'
    //             }
    //             html += '</tr><tr>' +
    //                 '<td><b>75%</b></td>'
    //             for(var i = 0 ; i < list.length;i++){
    //                 html += '<td>'+ list[i]["75AvgScore"] +'</td>'
    //             }
    //             html += '</tr><tr>' +
    //                 '<td><b>50%</b></td>'
    //             for(var i = 0 ; i < list.length;i++){
    //                 html += '<td>'+ list[i]["50AvgScore"] +'</td>'
    //             }
    //             html += '</tr><tr>' +
    //                 '<td><b>25%</b></td>'
    //             for(var i = 0 ; i < list.length;i++){
    //                 html += '<td>'+ list[i]["25AvgScore"] +'</td>'
    //             }
    //             html += '</tr></tbody>'
    //
    //             $sifenweifenxi.html(html);
    //             analy.outputHtmlToExcel($sifenweifenxi);
    //         }
    //     })
    // };
});