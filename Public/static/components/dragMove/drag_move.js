/**
 * @author 邵敬超
 * @date 2016/12/30
 */
define(function (require, exports, module) {
    require("jquery");
    /*!*
     *拖动组件
     *@param bar dom 触发拖动部位
     * @param target dom 拖动单元
     */

    exports.drag = function (bar, target, callback) {
        var _this = this, _target = target;
        _this.name = "dragMove";

        // 默认参数
        _this.params = {
            left: 0,
            top: 0,
            currentX: 0,
            currentY: 0,
            flag: false
        };

        // 计算css属性
        _this.getCss = function (o, key) {
            return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
        };

        // 初始化位置
        if (_this.getCss(_target, "left") !== "auto") {
            _this.params.left = _this.getCss(_target, "left");
        }
        if (_this.getCss(_target, "top") !== "auto") {
            _this.params.top = _this.getCss(_target, "top");
        }
        _this._event = function (event) {
            if (event.touches) {
                return event.touches[0];
            }
            else {
                return event || window.event
            }
        };
        // 开始
        _this.down = function (event) {
            _this.params.flag = true;
            var touch = _this._event(event);

            _this.params.currentX = touch.clientX;
            _this.params.currentY = touch.clientY;
        };
        // 移动
        _this.move = function (event) {
            event.preventDefault();
            if (_this.params.flag) {
                var touch = _this._event(event);
                var nowX = touch.clientX,
                    nowY = touch.clientY;
                var disX = nowX - _this.params.currentX,
                    disY = nowY - _this.params.currentY;
                _target.style.left = parseInt(_this.params.left) + disX + "px";
                _target.style.top = parseInt(_this.params.top) + disY + "px";
            }

        };
        // 结束
        _this.end = function () {
            _this.params.flag = false;

            // 计算移动结束位置
            if (_this.getCss(_target, "left") !== "auto") {
                _this.params.left = _this.getCss(_target, "left");
            }
            if (_this.getCss(_target, "top") !== "auto") {
                _this.params.top = _this.getCss(_target, "top");
            }
        };

        // 初始化事件绑定
        $(bar).unbind("mousedown.drag");
        $(document).unbind("mousemove.drag mouseup.drag");

        // pc端事件
        $(bar).on("mousedown.drag", function (e) {
            _this.down(e);
        });
        $(document).on("mouseup.drag", function (e) {
            _this.end(e);
        });
        $(document).on("mousemove.drag", function (e) {
            _this.move(e);
        });

        // 移动端事件
        bar.addEventListener("touchstart", function (e) {
            _this.down(e);
        }, false);

        bar.addEventListener("touchmove", function (e) {
            _this.move(e);
        }, false);
        bar.addEventListener("touchend", function (e) {
            _this.end(e);
        }, false);
    }
});