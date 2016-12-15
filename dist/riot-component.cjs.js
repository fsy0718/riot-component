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

var riotSlideTmpl = "<div class=\"riot-slider {opts.disabled && 'riot-slider--disable'} {!included && 'riot-slider--independent'}\"  onmousedown={opts.disabled ? noop : onMouseDown} ontouchstart={opts.disabled ? noop : onTouchStart}>\r\n    <div class=\"riot-slider__track\"></div>\r\n    <div class=\"riot-slider__track--select\" if={included} style=\"left:{selectTrack.left + '%'};width:{selectTrack.width + '%'}\"></div>\r\n    <div class=\"riot-slider__handler riot-slider__handler--1\" style=\"left:{(opts.range ?selectTrack.left : selectTrack.width) + '%'}\" data-key={selectTrack.left}></div>\r\n    <div class=\"riot-slider__handler riot-slider__handler--2\" if={opts.range} style=\"left: {(selectTrack.left + selectTrack.width) + '%'}\" data-key={selectTrack.left + selectTrack.width}></div>\r\n    <div class=\"riot-slider__marks\" if={opts.marks || opts.showAllDots}>\r\n      <div each={mark,index in marks} class=\"riot-slider__marks--items {parseMarkItemClass(mark)}\">\r\n        <span class=\"riot-slider__marks--items-dot\" data-key={index} style=\"left:{mark.precent + '%'}\" if={mark.dot}></span>\r\n        <span class=\"riot-slider__marks--items-tip\" data-key={index} style=\"width:{mark.width + '%'};margin-left:{(-0.5 * mark.width) + '%'};left:{mark.precent + '%'}\" if={mark.tip}>{mark.label}</span>\r\n      </div>\r\n    </div>\r\n  </div>";

var RiotSlider = (function (Tag) {
    var getHandleRect = function (handle) {
        return handle.getBoundingClientRect();
    };
    var isNotTouchEvent = function (e) {
        return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
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
    var parseValue = function (value, min, max, opts) {
        var _value = [min, min];
        if (value && value.length) {
            var _v_1 = [];
            value.forEach(function (v) {
                if (v >= min && v <= max) {
                    _v_1.push(+v);
                }
                else {
                    console.warn('riot-slider实例类名为%s的opts.value由于不在opts.min与opts.max之间被移动', opts.class || 'riot-slider', v);
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
    var getEnablePoint = function (marks, config) {
        var min = config.min, max = config.max, step = config.step, showAllTips = config.showAllTips, showAllDots = config.showAllDots, showMarkTips = config.showMarkTips, showMarkDots = config.showMarkDots;
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
                        label: markIsString ? mark : (mark.label || ''),
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
            points: points,
            marks: showAllDots ? points : markPoints
        };
    };
    var getMousePosition = function (e, vertical) {
        if (vertical === void 0) { vertical = false; }
        return vertical ? e.clientY : e.pageX;
    };
    var getTouchPosition = function (e, vertical) {
        if (vertical === void 0) { vertical = false; }
        return vertical ? e.touches[0].clientY : e.touches[0].pageX;
    };
    //通过长度获取值
    var getPrecentByPosition = function (pos, rect, vertical) {
        if (vertical === void 0) { vertical = false; }
        var v;
        if (vertical) {
            v = (pos - rect.top) / rect.height;
        }
        else {
            v = (pos - rect.left) / rect.width;
        }
        return v > 1 ? 1 : v < 0 ? 0 : v;
    };
    var getClosetPointByPosition = function (position, rect, config, marks, points) {
        var range = config.range, dots = config.dots, vertical = config.vertical, max = config.max, min = config.min, step = config.step;
        //precent需要先乘100并保留四位有效数字，求_value时再除以100,否则会造成3 => 2.999999999999999999999999的情况
        var precent = getPrecentByPosition(position, rect, vertical);
        var _value = precent * (max - min) + min;
        if (range && !step) {
            _value = getClosetValueByDichotomy(marks, _value);
        }
        else if (dots) {
            _value = getClosetValueByDichotomy(points, _value);
        }
        else {
            _value = {
                key: parseInt('' + _value),
            };
        }
        return {
            //precent小数点后可能不止四位，不用对外提供，不进行优化
            precent: precent * 100,
            point: _value
        };
    };
    //二分法查换值
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
    var initConfig = function (opts) {
        var marks = opts.marks, step = opts.step, _a = opts.min, min = _a === void 0 ? 0 : _a, _b = opts.max, max = _b === void 0 ? 100 : _b, value = opts.value;
        min = Math.max(0, min);
        if (!(marks || step) || (step && step <= 0) || !step) {
            step = 1;
        }
        var _value = parseValue(value, min, max, opts);
        return {
            control: opts.control || false,
            vertical: opts.vertical || false,
            allowCross: isUndefined(opts.allowCross) && true || opts.allowCross,
            rangeValueShouldEqual: isUndefined(opts.rangeValueShouldEqual) && true || opts.rangeValueShouldEqual,
            included: isUndefined(opts.included) && true || opts.included,
            min: min,
            max: max,
            showMarkTip: isUndefined(opts.showMarkTip) && true || opts.showMarkTip,
            showMarkDot: isUndefined(opts.showMarkDot) && true || opts.showMarkDot,
            range: opts.range || false,
            step: step,
            marks: marks,
            value: _value,
            dots: opts.dots || false,
            showAllTips: opts.showAllTips || false,
            showAllDots: opts.showAllDots || false,
            rangeGapFixed: opts.rangeGapFixed || false,
            onChange: opts.onChange
        };
    };
    var RiotSlider = (function (_super) {
        __extends(RiotSlider, _super);
        function RiotSlider(dom, opts) {
            if (opts === void 0) { opts = {}; }
            _super.call(this, dom, opts);
            console.log(opts);
            var $eventRoot;
            this.on('mount', function () {
                $eventRoot = this.root.querySelector('.riot-slider');
            });
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
        RiotSlider.prototype.onCreate = function (opts) {
            this.config = initConfig(opts);
            console.log(this.config);
        };
        return RiotSlider;
    }(Tag));
    return RiotSlider;
})(riot.Tag);

var dom = document.querySelector('.demo');
var riotSlider = new RiotSlider(dom, {
    marks: {
        '1': '50%',
        '20': {
            label: '60'
        }
    },
    step: 3
});

exports.version = version;
exports.RiotCalendar = calendar;