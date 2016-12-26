/**
      * @file riot-component.js |基于riot的组件
      * @version 1.0.0
      * @author fsy0718 <fsy0718@gmail.com>
      * @license MIT
      * @copyright fsy0718 2016
      */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var version = 'v${version}';

var _slice = [].slice;
var each = function (dom, callback) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (dom.length > 1) {
        var _dom = _slice.call(dom);
        _dom.forEach(function (d) {
            callback.apply(d, args);
        });
    }
    else {
        callback.apply(dom[0], args);
    }
};
function pauseEvent(e) {
    e.preventDefault();
    e.stopPropagation();
    return this;
}
var elementClassListmethods = ['add', 'remove', 'toggle', 'contains'];
var elementClassmethods = ['addClass', 'removeClass', 'toggleClass', 'hasClass'];
var _eleClassListMethods = {};
elementClassmethods.forEach(function (method, index) {
    _eleClassListMethods[method] = function (dom, className) {
        var call = function (_className) {
            _className = _className.split(' ');
            for (var i = 0, len = _className.length; i < len; i++) {
                this.classList[elementClassListmethods[index]](_className[i]);
            }
        };
        return each(dom, call, className);
    };
});

/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}
function shouldUseNative() {
    try {
        if (!Object.assign) {
            return false;
        }
        // Detect buggy property enumeration order in older V8 versions.
        // https://bugs.chromium.org/p/v8/issues/detail?id=4118
        var test1 = new String('abc'); // eslint-disable-line
        test1[5] = 'de';
        if (Object.getOwnPropertyNames(test1)[0] === '5') {
            return false;
        }
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test2 = {};
        for (var i = 0; i < 10; i++) {
            test2['_' + String.fromCharCode(i)] = i;
        }
        var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
            return test2[n];
        });
        if (order2.join('') !== '0123456789') {
            return false;
        }
        // https://bugs.chromium.org/p/v8/issues/detail?id=3056
        var test3 = {};
        'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
            test3[letter] = letter;
        });
        if (Object.keys(Object.assign({}, test3)).join('') !==
            'abcdefghijklmnopqrst') {
            return false;
        }
        return true;
    }
    catch (e) {
        // We don't expect any of the above to throw, but better to be safe.
        return false;
    }
}
var objectAssign;
if (shouldUseNative()) {
    objectAssign = Object.assign;
}
else {
    objectAssign = function (target, source) {
        var from;
        var to = toObject(target);
        var symbols;
        for (var s = 1; s < arguments.length; s++) {
            from = Object(arguments[s]);
            for (var key in from) {
                if (hasOwnProperty.call(from, key)) {
                    to[key] = from[key];
                }
            }
            if (Object.getOwnPropertySymbols) {
                symbols = Object.getOwnPropertySymbols(from);
                for (var i = 0; i < symbols.length; i++) {
                    if (propIsEnumerable.call(from, symbols[i])) {
                        to[symbols[i]] = from[symbols[i]];
                    }
                }
            }
        }
        return to;
    };
}
var objectAssign$1 = objectAssign;

var riotCalendarTmpl = "<div class=\"riot-calendar__box {(mutipleItems > 1 && 'riot-calendar--multiple riot-calendar--multiple-i' + mutipleItems)}\"> <a class=\"prev {prevMonthDisable && 'disable'}\" href=\"javascript:;\" onclick=\"{prevMonth}\"><i></i></a> <a class=\"next {nextMonthDisable && 'disable'}\" href=\"javascript:;\" onclick=\"{nextMonth}\"><i></i></a> <div class=\"riot-calendar__items\" each=\"{items, index in viewDatas}\"> <div class=\"riot-calendar__head\"> <div class=\"control title\"> <div if=\"{otherViewDatas}\" class=\"title__other\">{otherViewDatas[index].title}</div> <div class=\"title__cur\">{items.title}</div> </div> <div class=\"pure-g weeks\"> <div class=\"pure-u-1-8\" each=\"{week in weekTitles}\">{week}</div> </div> </div> <div class=\"riot-calendar__body\"> <div if=\"{otherViewDatas}\" class=\"riot-calendar__body--other\"> <div class=\"pure-g\" each=\"{weekdates in otherViewDatas[index].weekdates}\"> <div class=\"pure-u-1-8 {parseDateBoxClass(date)}\" each=\"{date in weekdates}\"> <div class=\"{date.disable === 0 && 'enable' || 'disable'} {date.select === 1 && 'choice' || ''}\"> <riot-date date=\"{date}\"></riot-date> </div> </div> </div> </div> <div class=\"riot-calendar__body--cur\"> <div class=\"pure-g\" each=\"{weekdates in items.weekdates}\"> <div class=\"pure-u-1-8 {parseDateBoxClass(date)}\" each=\"{date in weekdates}\"> <span class=\"date-placeholder\" if=\"{!showOtherMonthDates && date.current}\"></span> <div if=\"{showOtherMonthDates || (showOtherMonthDates===false && date.current===0 )}\" class=\"{date.disable === 0 && 'enable' || 'disable'} {date._change && 'change'} {date.select === 1 && 'choice' || ''}\" onclick=\"{checkDate}\"> <riot-date date=\"{date}\"></riot-date> </div> </div> </div> </div> </div> </div> <div class=\"riot-calendar__foot\"></div>";

var calendar = (function (Tag) {
    var defaultOpts = {
        showOtherMonthDates: true,
        switchWithAnimation: true,
        animationTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        animationDuration: 0.45,
        numberOfMonths: 1,
        firstDay: 0
    };
    var leapYearCache = {};
    var weekTitles = ['日', '一', '二', '三', '四', '五', '六'];
    var initConfig = function (opts) {
        return objectAssign$1({}, defaultOpts, opts);
    };
    var initState = function (ctx) {
        return {};
    };
    var initProps = function (ctx) {
        var config = ctx.config;
        var firstDay = config.firstDay, rangeLimit = config.rangeLimit, minDate = config.minDate, maxDate = config.maxDate;
        return {
            weekTitles: weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay))
        };
    };
    var RiotCalendar = (function (_super) {
        __extends(RiotCalendar, _super);
        function RiotCalendar() {
            return _super.apply(this, arguments) || this;
        }
        Object.defineProperty(RiotCalendar.prototype, "name", {
            get: function () {
                return 'riot-calendar';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RiotCalendar.prototype, "tmpl", {
            get: function () {
                return riotCalendarTmpl;
            },
            enumerable: true,
            configurable: true
        });
        RiotCalendar.prototype.onCreate = function (opts) {
            this.config = initConfig(opts);
            this.props = initProps(this);
            this.state = initState(this);
        };
        return RiotCalendar;
    }(riot.Tag));
})(riot.Tag);

;
function addEventListener(target, eventType, callback) {
    if (target.addEventListener) {
        target.addEventListener(eventType, callback, false);
        return {
            remove: function () {
                target.removeEventListener(eventType, callback, false);
            }
        };
    }
    else if (target.attachEvent) {
        target.attachEvent('on' + eventType, callback);
        return {
            remove: function () {
                target.detachEvent('on' + eventType, callback);
            }
        };
    }
}
;

var riotSlideTmpl = "<div class=\"riot-slider {config.disabled && 'riot-slider--disable'} {!config.included && 'riot-slider--independent'}\" onmousedown=\"{config.disabled ? noop : onMousedown}\" ontouchstart=\"{config.disabled ? noop : onTouchstart}\"> <div class=\"riot-slider__track\"></div> <div class=\"riot-slider__track--select\" if=\"{config.included}\" riot-style=\"left:{state.track.left + '%'};width:{state.track.width + '%'}\"></div> <div class=\"riot-slider__handler riot-slider__handler--1\" riot-style=\"left:{(config.range ? state.track.left : state.track.width) + '%'}\" data-key=\"{state.track.left}\"></div> <div class=\"riot-slider__handler riot-slider__handler--2\" if=\"{config.range}\" riot-style=\"left: {(state.track.left + state.track.width) + '%'}\" data-key=\"{state.track.left + state.track.width}\"></div> <div class=\"riot-slider__marks\" if=\"{config.marks || config.showAllDots}\"> <div each=\"{mark,index in props.marks}\" class=\"riot-slider__marks--items {parent.parseMarkItemClass(mark)}\"> <span class=\"riot-slider__marks--items-dot\" data-key=\"{index}\" riot-style=\"left:{mark.precent + '%'}\" if=\"{mark.dot}\"></span> <span class=\"riot-slider__marks--items-tip\" data-key=\"{index}\" riot-style=\"width:{mark.width + '%'};margin-left:{(-0.5 * mark.width) + '%'};left:{mark.precent + '%'}\" if=\"{mark.tip}\">{mark.label}</span> </div> </div> </div>";

var riotSlideCss = "[data-is=riot-slider] .riot-slider{position:relative}[data-is=riot-slider] .riot-slider__handler,[data-is=riot-slider] .riot-slider__marks,[data-is=riot-slider] .riot-slider__marks--items-dot,[data-is=riot-slider] .riot-slider__marks--items-tip,[data-is=riot-slider] .riot-slider__track--select{position:absolute}[data-is=riot-slider] .riot-slider__marks--items-tip{text-align:center}[data-is=riot-slider] .riot-slider__handler,[data-is=riot-slider] .riot-slider__marks--items-dot,[data-is=riot-slider] .riot-slider__marks--items-tip{cursor:pointer}[data-is=riot-slider] .riot-slider{width:100%;height:.3125rem;padding:.3125rem 0}[data-is=riot-slider] .riot-slider__track{height:100%;border-radius:.15625rem;background-color:#eeeaea;z-index:1}[data-is=riot-slider] .riot-slider__track--select{z-index:2;background-color:#7f1f59;top:.3125rem;bottom:.3125rem;border-radius:.15625rem}[data-is=riot-slider] .riot-slider__handler{width:.75rem;height:.75rem;border-radius:50%;background-color:#fff;box-shadow:0 0 .15625rem 1px hsla(0,0%,76%,.25);top:.0625rem;z-index:4;margin-left:-.375rem}[data-is=riot-slider] .riot-slider__marks{background-color:transparent;z-index:3;top:.3125rem;bottom:.3125rem;width:100%}[data-is=riot-slider] .riot-slider__marks--items-dot{width:.5625rem;height:.5625rem;border-radius:50%;background:#fff;border:1px solid #eeeaea;top:-.25rem;margin-left:-.28125rem}[data-is=riot-slider] .riot-slider__marks--items-tip{font-size:.75rem;line-height:1;top:.625rem;color:#bfbfbf}[data-is=riot-slider] .riot-slider__marks--items-select .riot-slider__marks--items-dot{border-color:#7f1f59}[data-is=riot-slider] .riot-slider__marks--items-select .riot-slider__marks--items-tip{color:#651c4d}[data-is=riot-slider] .riot-slider--independent .riot-slider__handler{background-color:#7f1f59}[data-is=riot-slider] .riot-slider--disable .riot-slider__track--select{background-color:#d7cece}[data-is=riot-slider] .riot-slider--disable .riot-slider__handler{cursor:not-allowed;background-color:#eeeaea}[data-is=riot-slider] .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-dot{border:1px solid #eeeaea}[data-is=riot-slider] .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-tip{color:#bfbfbf}";

var slider = (function (Tag) {
    var defaultConfig = {
        allowCross: true,
        rangeValueShouldEqual: true,
        included: true,
        showMarkTips: true,
        showMarkDots: true,
        min: 0,
        max: 100
    };
    //初始化配置
    var initConfig = function (opts) {
        var config = objectAssign$1({}, defaultConfig, opts);
        var step = config.step, min = config.min, max = config.max;
        min = Math.max(0, min);
        step = config.range ? config.marks ? config.step : config.step || 1 : config.step || 1;
        config.min = min;
        config.max = max;
        config.step = step;
        return config;
    };
    //初始化props
    var initProps = function (ctx) {
        var pointAndMarks = getEnablePoint(ctx.config);
        var props = {
            points: pointAndMarks.points,
            marks: pointAndMarks.marks
        };
        if (ctx.config.range && ctx.config.rangeGapFixed) {
            var rangeGap = ctx.state.value[1] - ctx.state.value[0];
            if (!rangeGap) {
                console.warn('riot-slider的rangeGap为0，会变为类似include=false的效果');
            }
            else {
                props.rangeGap = rangeGap;
            }
        }
        return props;
    };
    var initState = function (ctx) {
        var _a = ctx.config, min = _a.min, max = _a.max, value = _a.value;
        var _value = parseValue(value, min, max);
        var track = getTrack(_value, min, max);
        return {
            value: _value,
            track: track
        };
    };
    //检测值
    var parseValue = function (value, min, max) {
        var _value = [min, min];
        if (value && value.length) {
            var _v_1 = [];
            value.forEach(function (v) {
                if (v >= min && v <= max) {
                    _v_1.push(+v);
                }
                else {
                    console.warn('riot-slider参数value中的%s由于不在参数min与参数max之间被移除', v);
                }
            });
            _value = _v_1.sort();
        }
        var _valen = _value.length;
        if (_valen > 2) {
            _value = _value.slice(0, 2);
        }
        else if (_valen < 2) {
            _value.unshift(min);
        }
        return _value;
    };
    var getValue = function (value, range) {
        return range ? value.concat() : value.slice(1, 2);
    };
    var setValue = function (val, state, config, props) {
        var rangeValueShouldEqual = config.rangeValueShouldEqual, rangeGapFixed = config.rangeGapFixed, allowCross = config.allowCross;
        var value = state.value, rangeChangeHandle = state.rangeChangeHandle, rangeStableValue = state.rangeStableValue;
        if (!rangeValueShouldEqual && val === rangeStableValue) {
            return false;
        }
        //如果固定range的差值
        if (rangeGapFixed) {
            //滑动方向 1表示向右 -1向左
            var direction = val - value[rangeChangeHandle];
            if (direction > 0) {
                direction = 1;
            }
            else if (direction < 0) {
                direction = -1;
            }
            else {
                //如果为0 直接不更新
                return false;
            }
            var newVal_1 = value[rangeChangeHandle ? 0 : 1] + direction * props.rangeGap;
            var newValInPoint = props.points.some(function (point) {
                return point.key === newVal_1;
            });
            if (newValInPoint) {
                state.value = rangeChangeHandle === 0 ? [val, newVal_1] : [newVal_1, val];
                return true;
            }
            return false;
        }
        state.value = [val, rangeStableValue].sort(function (a, b) {
            return a - b;
        });
        var diff = val - rangeStableValue;
        if (!allowCross && (rangeChangeHandle === 0 && val > rangeStableValue || rangeChangeHandle === 1 && val < rangeStableValue)) {
            return false;
        }
        return true;
    };
    var updateValue = function (point, ctx) {
        ctx.state.changePointKey = point.key;
        var config = ctx.config, state = ctx.state, props = ctx.props;
        var shouldUpdate;
        if (config.range) {
            shouldUpdate = setValue(point.key, state, config, props);
        }
        else {
            state.value = [config.min, point.key];
            shouldUpdate = true;
        }
        return shouldUpdate;
    };
    //计算可用的point和mark
    var getEnablePoint = function (config) {
        var marks = config.marks, min = config.min, max = config.max, step = config.step, showAllTips = config.showAllTips, showAllDots = config.showAllDots, showMarkTips = config.showMarkTips, showMarkDots = config.showMarkDots;
        var points = [];
        var markPoints;
        var length = max - min;
        var w;
        if (step > 0) {
            showAllTips ? w = parseNumber(getMarkWidth(Math.ceil((max - min) / step))) : '';
            var i = min;
            while (i <= max) {
                if (!(marks && marks[i])) {
                    var _point = {
                        key: i,
                        label: '' + i,
                        precent: parseNumber((i - min) / length * 100)
                    };
                    if (showAllTips) {
                        _point.width = w;
                        _point.tip = true;
                    }
                    if (showAllDots) {
                        _point.dot = true;
                    }
                    points.push(_point);
                }
                i += step;
            }
        }
        if (marks) {
            var _markPoints = [];
            var markCount = Object.keys(marks).length;
            w = getMarkWidth(markCount);
            for (var key in marks) {
                var _key = parseFloat(key);
                var mark = marks[key];
                if (_key >= min && _key <= max) {
                    var markIsString = typeof marks[key] === 'string';
                    var _point = {
                        key: _key,
                        mark: true,
                        label: (markIsString ? mark : (mark.label || '')),
                        width: markIsString ? w : parseNumber(mark.width || w),
                        precent: parseNumber((_key - min) / length * 100)
                    };
                    if (markIsString) {
                        _point.dot = showMarkDots;
                        _point.tip = showMarkTips;
                    }
                    else {
                        _point.dot = mark.dot !== undefined ? mark.dot : showMarkDots;
                        _point.tip = mark.tip !== undefined ? mark.tip : showMarkTips;
                    }
                    points.push(_point);
                    _markPoints.push(_point);
                }
            }
            //筛选出错误的mark
            if (_markPoints.length !== markCount) {
                w = getMarkWidth(_markPoints.length);
                _markPoints.forEach(function (_mark) {
                    _mark.width = w;
                });
            }
            markPoints = _markPoints.sort(function (a, b) {
                return +a.key - +b.key;
            });
        }
        points.sort(function (a, b) {
            return +a.key - +b.key;
        });
        return {
            points: (points),
            marks: (showAllDots ? points : markPoints)
        };
    };
    //保留四位有效数字
    var floatReg = /\./;
    var parseNumber = function (num, dot) {
        if (dot === void 0) { dot = 4; }
        var result = num;
        if (floatReg.test(num)) {
            result = num.toFixed(dot);
        }
        return +result;
    };
    var getMarkWidth = function (len) {
        //算法来自https://github.com/react-component/slider/blob/master/src/Marks.jsx
        return parseNumber(100 / (len - 1) * 0.9);
    };
    var isNotTouchEvent = function (e) {
        return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
    };
    var getTrack = function (value, min, max) {
        return {
            left: parseNumber((value[0] - min) / (max - min) * 100),
            width: parseNumber((value[1] - value[0]) / (max - min) * 100)
        };
    };
    var getRootSliderBoundingRect = function (ele) {
        return ele.getBoundingClientRect();
    };
    var getHandleIndex = function (precent, track) {
        var index;
        var d1 = precent - track.left;
        var d2 = track.left + track.width - precent;
        if (d1 <= 0) {
            index = 0;
        }
        else if (d2 <= 0) {
            index = 1;
        }
        else {
            index = d1 > d2 ? 1 : 0;
        }
        return index;
    };
    var getClosetValueByDichotomy = function (source, val) {
        var len = source.length;
        if (val <= source[0].key) {
            return source[0];
        }
        if (val >= source[len - 1].key) {
            return source[len - 1];
        }
        var _source = source.slice(0);
        var _len;
        var i = 0;
        while ((_len = _source.length) > 0) {
            var _l = void 0;
            ++i;
            if (_len === 1) {
                return _source[0];
            }
            else {
                _l = Math.floor(_len / 2);
            }
            var d1 = val - _source[_l - 1].key;
            var d2 = _source[_l].key - val;
            if (d1 < 0) {
                //说明在右边
                _source = _source.slice(0, _l);
            }
            else if (d2 < 0) {
                //说明在左边
                _source = _source.slice(_l);
            }
            else {
                return d1 > d2 ? _source[_l] : _source[_l - 1];
            }
            if (i > len) {
                console.warn('由于算法原因，已进入死循环');
                return;
            }
        }
    };
    var getClosetPointByPosition = function (pos, ctx) {
        var config = ctx.config, props = ctx.props;
        var rect = getRootSliderBoundingRect(props.root);
        var precent = getPrecentByPosition(pos, rect, config.vertical);
        var _value = precent * (config.max - config.min) + config.min;
        var point;
        if (config.range && !config.step) {
            point = getClosetValueByDichotomy(props.marks, _value);
        }
        else if (config.dots) {
            point = getClosetValueByDichotomy(props.points, _value);
        }
        else {
            point = {
                key: parseInt('' + _value)
            };
        }
        return {
            precent: precent * 100,
            point: point
        };
    };
    var getPrecentByPosition = function (pos, rect, vertical) {
        var v;
        if (vertical) {
            v = (pos - rect.top) / rect.height;
        }
        else {
            v = (pos - rect.left) / rect.width;
        }
        return v > 1 ? 1 : v < 0 ? 0 : v;
    };
    var onMove = function (pos, ctx) {
        var closetPoint = getClosetPointByPosition(pos, ctx);
        var point = closetPoint.point;
        if (ctx.state.changePointKey !== point.key) {
            var shouldUpdate = updateValue(point, ctx);
            if (shouldUpdate) {
                ctx.update();
                ctx.config.onChange && ctx.config.onChange(getValue(ctx.state.value, ctx.config.range));
            }
        }
    };
    var addDocumentEvents = function (type, ctx) {
        if (type === 'touch') {
            // just work for chrome iOS Safari and Android Browser
            ctx.state.onTouchMoveListener =
                addEventListener(document, 'touchmove', onTouchMove.bind(ctx));
            ctx.state.onTouchUpListener =
                addEventListener(document, 'touchend', eventEnd.bind(ctx, 'touch'));
        }
        else if (type === 'mouse') {
            ctx.state.onMouseMoveListener =
                addEventListener(document, 'mousemove', onMouseMove.bind(ctx));
            ctx.state.onMouseUpListener =
                addEventListener(document, 'mouseup', eventEnd.bind(ctx, 'mouse'));
        }
    };
    var removeDocumentEvents = function (type, ctx) {
        if (type === 'touch') {
            ctx.state.onTouchMoveListener.remove();
            ctx.state.onTouchUpListener.remove();
        }
        else if (type === 'mouse') {
            ctx.state.onMouseMoveListener.remove();
            ctx.state.onMouseUpListener.remove();
        }
    };
    var getMousePosition = function (e, vertical) {
        return vertical ? e.clientY : e.pageX;
    };
    var getTouchPosition = function (e, vertical) {
        return vertical ? e.touches[0].clientY : e.touches[0].pageX;
    };
    var onEventStart = function (pos, ctx) {
        var state = ctx.state, config = ctx.config;
        var closetPoint = getClosetPointByPosition(pos, ctx);
        state.changePointKey = closetPoint.point.key;
        if (config.range) {
            state.rangeChangeHandle = getHandleIndex(closetPoint.precent, state.track);
            state.rangeStableValue = state.value[state.rangeChangeHandle === 0 ? 1 : 0];
        }
        config.onBeforeChange && config.onBeforeChange(getValue(state.value, config.range));
        //如果点击的位置不在选中的结束或开始，则更新state.value
        if (state.value.indexOf(state.changePointKey) === -1) {
            var shouldUpdate = updateValue(closetPoint.point, ctx);
            if (shouldUpdate) {
                config.onChange && config.onChange(getValue(state.value, config.range));
            }
            return shouldUpdate;
        }
        else {
            return false;
        }
    };
    var onMouseMove = function (e) {
        pauseEvent(e);
        var self = this;
        var pos = getMousePosition(e, self.config.vertical);
        onMove(pos, self);
    };
    var onTouchMove = function (e) {
        if (isNotTouchEvent(e)) {
            eventEnd('touch');
            e.preventUpdate = true;
            return;
        }
        pauseEvent(e);
        var self = this;
        var pos = getTouchPosition(e, self.config.vertical);
        onMove(pos, self);
    };
    var eventEnd = function (type) {
        var self = this;
        delete self.state.rangeChangeHandle;
        delete self.state.rangeStableValue;
        self.config.onAfterChange && self.config.onAfterChange(getValue(self.state.value, self.config.range));
        removeDocumentEvents(type, self);
    };
    var RiotSlider = (function (_super) {
        __extends(RiotSlider, _super);
        function RiotSlider() {
            return _super.apply(this, arguments) || this;
        }
        Object.defineProperty(RiotSlider.prototype, "name", {
            get: function () {
                return 'riot-slider';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RiotSlider.prototype, "tmpl", {
            get: function () {
                return riotSlideTmpl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RiotSlider.prototype, "css", {
            get: function () {
                return riotSlideCss;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RiotSlider.prototype, "attrs", {
            get: function () {
                return 'data-is="riot-slider"';
            },
            enumerable: true,
            configurable: true
        });
        RiotSlider.prototype.noop = function () {
        };
        ;
        RiotSlider.prototype.onTouchstart = function (e) {
            var self = this;
            if (isNotTouchEvent(e) || self.config.control) {
                e.preventUpdate = true;
                return;
            }
            pauseEvent(e);
            var pos = getTouchPosition(e, self.config.vertical);
            var shouldUpdate = onEventStart(pos, self);
            addDocumentEvents('touch', self);
            e.preventUpdate = shouldUpdate;
        };
        RiotSlider.prototype.onMousedown = function (e) {
            var self = this;
            var _a = self.config, control = _a.control, vertical = _a.vertical;
            if (e.button !== 0 || control) {
                e.prevendUpdate = true;
                return;
            }
            pauseEvent(e);
            var pos = getMousePosition(e, vertical);
            var shouldUpdate = onEventStart(pos, self);
            addDocumentEvents('mouse', self);
            e.preventUpdate = shouldUpdate;
        };
        RiotSlider.prototype.parseMarkItemClass = function (mark) {
            if (mark) {
                //mark元素与handler重叠会有问题，浏览器对4.5px处理方式不一样
                if (this.config.included && mark.precent > this.state.track.left && mark.precent < (this.state.track.left + this.state.track.width)) {
                    return 'riot-slider__marks--items-select';
                }
            }
        };
        //创建RiotSlider时
        RiotSlider.prototype.onCreate = function (opts) {
            this.config = initConfig(opts);
            this.state = initState(this);
            this.props = initProps(this);
            this.on('mount', function () {
                this.props.root = this.root.querySelector('.riot-slider');
            });
            this.on('update', function () {
                this.state.track = getTrack(this.state.value, this.config.min, this.config.max);
            });
            console.log(this);
        };
        RiotSlider.prototype.setValue = function (value) {
            var _value = parseValue(value, this.config.min, this.config.max);
            //TODO 需要考虑从setValue进入
            this.state.value = _value;
            this.update();
        };
        RiotSlider.prototype.setControl = function (control) {
            this.config.control = control;
        };
        return RiotSlider;
    }(riot.Tag));
    ;
    return RiotSlider;
})(riot.Tag);

exports.version = version;
exports.RiotCalendar = calendar;
exports.RiotSlider = slider;