define(function (require, exports, module) {
    $(".table-msg tr").hover(function(){
        $(this).children().find(".msg-close").show()
    },function(){
        $(this).children().find(".msg-close").hide()
    });
    $(".msg-close").on("click",function(){
        $(this).parents(".table-msg tr").hide()
    })

});