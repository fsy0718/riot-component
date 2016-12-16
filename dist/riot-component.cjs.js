'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var version = 'v${version}';

var _slice = [].slice;
var _toString = Object.prototype.toString;
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
function isUndefined(str) {
    return _toString.call(str) === '[object Undefined]';
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

var riotCalendarTmpl = "<div class=\"riot-calendar__box {(mutipleItems > 1 && 'riot-calendar--multiple riot-calendar--multiple-i' + mutipleItems)}\">\r\n  <a class=\"prev {prevMonthDisable && 'disable'}\" href=\"javascript:;\" onclick={prevMonth}><i></i></a>\r\n  <a class=\"next {nextMonthDisable && 'disable'}\" href=\"javascript:;\" onclick={nextMonth}><i></i></a>\r\n  <div class=\"riot-calendar__items\" each={items, index in viewDatas}>\r\n    <div class=\"riot-calendar__head\">\r\n      <div class=\"control title\">\r\n        <div if={otherViewDatas} class=\"title__other\">{otherViewDatas[index].title}</div>\r\n        <div class=\"title__cur\">{items.title}</div>\r\n      </div>\r\n      <div class=\"pure-g weeks\">\r\n        <div class=\"pure-u-1-8\" each={week in weekTitles}>{week}</div>\r\n      </div>\r\n    </div>\r\n    <div class=\"riot-calendar__body\">\r\n      <div if={otherViewDatas} class=\"riot-calendar__body--other\">\r\n        <div class=\"pure-g\" each={weekdates in otherViewDatas[index].weekdates}>\r\n          <div class=\"pure-u-1-8 {parseDateBoxClass(date)}\" each={date in weekdates}>\r\n            <div class=\"{date.disable === 0 && 'enable' || 'disable'} {date.select === 1 && 'choice' || ''}\">\r\n              <riot-date date={date}></riot-date>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    <div class=\"riot-calendar__body--cur\">\r\n      <div class=\"pure-g\" each={weekdates in items.weekdates}>\r\n        <div class=\"pure-u-1-8 {parseDateBoxClass(date)}\" each={date in weekdates}>\r\n          <span class=\"date-placeholder\" if={!showOtherMonthDates && date.current}></span>\r\n          <div if={showOtherMonthDates || (showOtherMonthDates===false && date.current===0 )} class=\"{date.disable === 0 && 'enable' || 'disable'} {date._change && 'change'} {date.select === 1 && 'choice' || ''}\" onclick={checkDate}>\r\n            <riot-date date={date}></riot-date>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div class=\"riot-calendar__foot\"></div>";

var calendar = (function (Tag) {
    var RiotCalendar = (function (_super) {
        __extends(RiotCalendar, _super);
        function RiotCalendar(el, opts) {
            if (opts === void 0) { opts = {}; }
            _super.call(this, el, opts);
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
        return RiotCalendar;
    }(riot.Tag));
})(riot.Tag);

var riotSlideTmpl = "  <div class=\"riot-slider {config.disabled && 'riot-slider--disable'} {!config.included && 'riot-slider--independent'}\"  onmousedown=\"{config.disabled ? noop : onMouseDown}\" ontouchstart=\"{config.disabled ? noop : onTouchStart}\">\r\n    <div class=\"riot-slider__track\"></div>\r\n    <div class=\"riot-slider__track--select\" if={config.included} style=\"left:{state.track.left + '%'};width:{state.track.width + '%'}\"></div>\r\n    <div class=\"riot-slider__handler riot-slider__handler--1\" style=\"left:{(config.range ?state.track.left : state.track.width) + '%'}\" data-key={state.track.left}></div>\r\n    <div class=\"riot-slider__handler riot-slider__handler--2\" if={config.range} style=\"left: {(state.track.left + state.track.width) + '%'}\" data-key={state.track.left + state.track.width}></div>\r\n    <div class=\"riot-slider__marks\" if={config.marks || config.showAllDots}>\r\n      <div each={mark,index in marks} class=\"riot-slider__marks--items {parseMarkItemClass(mark)}\">\r\n        <span class=\"riot-slider__marks--items-dot\" data-key={index} style=\"left:{mark.precent + '%'}\" if={mark.dot}></span>\r\n        <span class=\"riot-slider__marks--items-tip\" data-key={index} style=\"width:{mark.width + '%'};margin-left:{(-0.5 * mark.width) + '%'};left:{mark.precent + '%'}\" if={mark.tip}>{mark.label}</span>\r\n      </div>\r\n    </div>\r\n  </div>";

var riotSlideCss = "[data-is=\"riot-slider\"] .riot-slider {\r\n  position: relative; }\r\n\r\n[data-is=\"riot-slider\"] .riot-slider__track--select, [data-is=\"riot-slider\"] .riot-slider__handler, [data-is=\"riot-slider\"] .riot-slider__marks, [data-is=\"riot-slider\"] .riot-slider__marks--items-dot, [data-is=\"riot-slider\"] .riot-slider__marks--items-tip {\r\n  position: absolute; }\r\n\r\n[data-is=\"riot-slider\"] .riot-slider__marks--items-tip {\r\n  text-align: center; }\r\n\r\n[data-is=\"riot-slider\"] .riot-slider__handler, [data-is=\"riot-slider\"] .riot-slider__marks--items-dot, [data-is=\"riot-slider\"] .riot-slider__marks--items-tip {\r\n  cursor: pointer; }\r\n\r\n[data-is=\"riot-slider\"] .riot-slider {\r\n  width: 100%;\r\n  height: 0.3125rem;\r\n  padding: 0.3125rem 0; }\r\n  [data-is=\"riot-slider\"] .riot-slider__track {\r\n    height: 100%;\r\n    border-radius: 0.15625rem;\r\n    background-color: #eeeaea;\r\n    z-index: 2; }\r\n    [data-is=\"riot-slider\"] .riot-slider__track--select {\r\n      z-index: 3;\r\n      background-color: #7f1f59;\r\n      top: 0.3125rem;\r\n      bottom: 0.3125rem;\r\n      border-radius: 0.15625rem; }\r\n  [data-is=\"riot-slider\"] .riot-slider__handler {\r\n    width: 0.75rem;\r\n    height: 0.75rem;\r\n    border-radius: 50%;\r\n    background-color: #fff;\r\n    box-shadow: 0 0 0.15625rem 1px rgba(195, 195, 195, 0.25);\r\n    top: 0.0625rem;\r\n    z-index: 10;\r\n    margin-left: -0.375rem; }\r\n  [data-is=\"riot-slider\"] .riot-slider__marks {\r\n    background-color: transparent;\r\n    z-index: 4;\r\n    top: 0.3125rem;\r\n    bottom: 0.3125rem;\r\n    width: 100%; }\r\n    [data-is=\"riot-slider\"] .riot-slider__marks--items-dot {\r\n      width: 0.5625rem;\r\n      height: 0.5625rem;\r\n      border-radius: 50%;\r\n      background: #fff;\r\n      border: solid 1px #eeeaea;\r\n      top: -0.25rem;\r\n      margin-left: -0.28125rem; }\r\n    [data-is=\"riot-slider\"] .riot-slider__marks--items-tip {\r\n      font-size: 0.75rem;\r\n      line-height: 1;\r\n      top: 0.625rem;\r\n      color: #bfbfbf; }\r\n    [data-is=\"riot-slider\"] .riot-slider__marks--items-select .riot-slider__marks--items-dot {\r\n      border-color: #7f1f59; }\r\n    [data-is=\"riot-slider\"] .riot-slider__marks--items-select .riot-slider__marks--items-tip {\r\n      color: #651c4d; }\r\n  [data-is=\"riot-slider\"] .riot-slider--independent .riot-slider__handler {\r\n    background-color: #7f1f59; }\r\n  [data-is=\"riot-slider\"] .riot-slider--disable .riot-slider__track--select {\r\n    background-color: #d7cece; }\r\n  [data-is=\"riot-slider\"] .riot-slider--disable .riot-slider__handler {\r\n    cursor: not-allowed;\r\n    background-color: #eeeaea; }\r\n  [data-is=\"riot-slider\"] .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-dot {\r\n    border: solid 1px #eeeaea; }\r\n  [data-is=\"riot-slider\"] .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-tip {\r\n    color: #bfbfbf; }\r\n";

var slider = (function (Tag) {
    //初始化配置
    var initConfig = function (opts) {
        var step = opts.step, _a = opts.min, min = _a === void 0 ? 0 : _a, _b = opts.max, max = _b === void 0 ? 100 : _b, value = opts.value;
        min = Math.max(0, min);
        if (!(opts.marks || step) || (step && step <= 0) || !step) {
            step = 1;
        }
        var _value = parseValue(value, min, max);
        return {
            control: opts.control || false,
            vertical: opts.vertical || false,
            disabled: opts.disabled || false,
            allowCross: isUndefined(opts.allowCross) && true || opts.allowCross,
            rangeValueShouldEqual: isUndefined(opts.rangeValueShouldEqual) && true || opts.rangeValueShouldEqual,
            included: isUndefined(opts.included) && true || opts.included,
            min: min,
            max: max,
            showMarkTips: isUndefined(opts.showMarkTips) && true || opts.showMarkTips,
            showMarkDots: isUndefined(opts.showMarkDots) && true || opts.showMarkDots,
            range: opts.range || false,
            step: step,
            marks: opts.marks,
            value: _value,
            dots: opts.dots || false,
            showAllTips: opts.showAllTips || false,
            showAllDots: opts.showAllDots || false,
            rangeGapFixed: opts.rangeGapFixed || false,
            onChange: opts.onChange,
            onAfterChange: opts.onAfterChange,
            onBeforeChange: opts.onBeforeChange
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
    //初始化state
    var initState = function (tag) {
        var pointAndMarks = getEnablePoint(tag.config);
        return {
            points: pointAndMarks.points,
            marks: pointAndMarks.marks,
            track: getTrack(tag.config)
        };
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
    var getTrack = function (config) {
        var value = config.value, min = config.min, max = config.max;
        return {
            left: parseNumber((value[0] - min) / (max - min) * 100),
            width: parseNumber((value[1] - value[0]) / (max - min) * 100)
        };
    };
    var RiotSlider = (function (_super) {
        __extends(RiotSlider, _super);
        function RiotSlider(dom, opts) {
            _super.call(this, dom, opts);
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
        RiotSlider.prototype.parseMarkItemClass = function (mark) {
            if (mark) {
                //mark元素与handler重叠会有问题，浏览器对4.5px处理方式不一样
                if (this.config.included && mark.precent > this.state.track.left && mark.precent < (this.state.track.left + this.state.track.width)) {
                    return 'riot-slider__marks--items-select';
                }
            }
        };
        RiotSlider.prototype.onCreate = function (opts) {
            this.config = initConfig(opts);
            this.state = initState(this);
            console.log(this);
        };
        return RiotSlider;
    }(Tag));
    ;
    return RiotSlider;
})(riot.Tag);

exports.version = version;
exports.RiotCalendar = calendar;
exports.RiotSlider = slider;