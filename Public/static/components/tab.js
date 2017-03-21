define(function(require,exports,module){
    // 选项卡切换
        function Jtab(opts) {

            var def = {
                main: ".J_tab",
                hd: ".J_hd",
                bd: ".J_bd",
                onClass: "on",
                trigger: "click"
            };

            var opt = $.extend({}, def, opts);

            var main = opt.main,
                head = opt.hd,
                body = opt.bd,
                cls = opt.onClass,
                trigger = opt.trigger;

            var tabs = $(main),
                hd = tabs.find(head),
                bd = tabs.find(body),
                childName = hd.children(":first-child").prop("tagName"),
                navItem = main + " " + head + ">" + childName;

            hd.children(":first-child").addClass(cls).show();
            bd.children(":first-child").show().siblings().removeClass(cls).hide();

            $(document).on(trigger, navItem, function() {
                var e = $(this),
                    index = e.index();

                e.addClass(cls).siblings().removeClass(cls);
                bd.children().eq(index).show().siblings().hide();
            });
        }
        Jtab();
        exports.tab = Jtab;
})