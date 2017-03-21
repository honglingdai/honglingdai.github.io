define(function (require, exports, module) {

    var msgJs = {
        init:function () {
            var e = this;
            e.getMsgList();
        },
        template:{
            msg:function(data){
                var html = '';
                html +='<table class="table-msg">'+
                    '<tbody>';
                var msgListLen = data.data.length;
                for(var i = 0;i< msgListLen; i++){
                    var listItem = data.data[i];
                    html += '<tr>'+
                        '<td>'+
                        '<div class="msg-user">'+
                        '<span class="user-pic"><img src="'+ listItem.icon.src+'" alt="" width="53" height="53"></span>'+
                        '<span class="user-name">系统消息</span>'+
                        '</div>'+
                        '</td>'+
                        '<td class="dot-td">'+
                        '<span class="dotted"></span>'+
                        '</td>'+
                        '<td>'+
                        '<div class="msg-con">'+
                        '<p class="msg-time">'+listItem.time+'</p>'+
                        '<div class="msg-info">'+
                        '<p class="msg-info-name">'+listItem.name+'</p>'+
                        '<p class="msg-info-title">'+listItem.title+'</p>'+
                        '<p class="msg-info-text">'+listItem.content+'</p>'+
                        '</div>'+
                        '<p><span class="msg-close"><i class="iconfont">&#xe643;</i></span></p>'+
                        '</div>'+
                        '</td>'+
                        '</tr>';

                }
                html += '</tbody>'+
                    '</table>';

                return html;
            }
        },
        getMsgList:function () {
            var json = {
                data:[
                    {
                        icon:{
                            src:"/Public/static/analy/img/user-header.png",
                            name:"系统消息"
                        },
                        time:"10月21日  10:17",
                        name:"亲爱的未来脑用户，您好：",
                        title:"未来脑阅卷应用APP更新提醒",
                        content:"本次未来脑阅卷应用APP更新至10.20.1版本，优化xxxx系统；更新xxxx功能，请尽快下载更新享受最新的体验！网址：www.wln100.com"
                    },
                    {
                        icon:{
                            src:"/Public/static/analy/img/user-header.png",
                            name:"系统消息"
                        },
                        time:"10月21日  10:17",
                        name:"亲爱的未来脑用户，您好：",
                        title:"未来脑阅卷应用APP更新提醒",
                        content:"本次未来脑阅卷应用APP更新至10.20.1版本，优化xxxx系统；更新xxxx功能，请尽快下载更新享受最新的体验！网址：www.wln100.com"
                    }
                ],
                status:0
            };

            var $message = $("#j_message");
            if(json.status === 1){
                $message.html(msgJs.template.msg(json));
            }else{
                $message.subDataEmpty(0)
            }
        },
        delMsgEvent:function () {
            $(".table-msg tr").hover(function(){
                $(this).children().find(".msg-close").show()
            },function(){
                $(this).children().find(".msg-close").hide()
            });
            $(".msg-close").on("click",function(){
                $(this).parents(".table-msg tr").hide()
            })
        }
    };
    msgJs.init();
});