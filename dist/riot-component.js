(function (exports) {
'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var version = 'v${version}';

var camelize = function (str) {
    return str.replace(/-+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
};
var dasherize = function (str) {
    return str.replace(/::/g, '/')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        .replace(/_/g, '-')
        .toLowerCase();
};
var prefixProps = {
    animation: true
};
var maybePrefix = function (key, value) {
    var css = '';
    var key = dasherize(key);
    var _key = key.split('-');
    if (prefixProps[_key[0]]) {
        css += '-webkit-' + key + ':' + value + ';';
    }
    css += key + ':' + value + ';';
    return css;
};
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






//'String', 'Number', 'Object', 'Date', 'Array', 'Function', 'Undefined'




function isArray(str) {
    _toString.call(str) === '[object Array]';
}

function isUndefined(str) {
    _toString.call(str) === '[object Undefined]';
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

var riotCalendarTmpl = "<div class=\"riot-calendar__box {(mutipleItems > 1 && 'riot-calendar--multiple riot-calendar--multiple-i' + mutipleItems)}\">\n  <a class=\"prev {prevMonthDisable && 'disable'}\" href=\"javascript:;\" onclick={prevMonth}><i></i></a>\n  <a class=\"next {nextMonthDisable && 'disable'}\" href=\"javascript:;\" onclick={nextMonth}><i></i></a>\n  <div class=\"riot-calendar__items\" each={items, index in viewDatas}>\n    <div class=\"riot-calendar__head\">\n      <div class=\"control title\">\n        <div if={otherViewDatas} class=\"title__other\">{otherViewDatas[index].title}</div>\n        <div class=\"title__cur\">{items.title}</div>\n      </div>\n      <div class=\"pure-g weeks\">\n        <div class=\"pure-u-1-8\" each={week in weekTitles}>{week}</div>\n      </div>\n    </div>\n    <div class=\"riot-calendar__body\">\n      <div if={otherViewDatas} class=\"riot-calendar__body--other\">\n        <div class=\"pure-g\" each={weekdates in otherViewDatas[index].weekdates}>\n          <div class=\"pure-u-1-8 {parseDateBoxClass(date)}\" each={date in weekdates}>\n            <div class=\"{date.disable === 0 && 'enable' || 'disable'} {date.select === 1 && 'choice' || ''}\">\n              <riot-date date={date}></riot-date>\n            </div>\n          </div>\n        </div>\n      </div>\n    <div class=\"riot-calendar__body--cur\">\n      <div class=\"pure-g\" each={weekdates in items.weekdates}>\n        <div class=\"pure-u-1-8 {parseDateBoxClass(date)}\" each={date in weekdates}>\n          <span class=\"date-placeholder\" if={!showOtherMonthDates && date.current}></span>\n          <div if={showOtherMonthDates || (showOtherMonthDates===false && date.current===0 )} class=\"{date.disable === 0 && 'enable' || 'disable'} {date._change && 'change'} {date.select === 1 && 'choice' || ''}\" onclick={checkDate}>\n            <riot-date date={date}></riot-date>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<div class=\"riot-calendar__foot\"></div>";

/// <reference path="../riot.d.ts" />
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

var riotSlideTmpl = "<div class=\"riot-slider {opts.disabled && 'riot-slider--disable'} {!included && 'riot-slider--independent'}\"  onmousedown={opts.disabled ? noop : onMouseDown} ontouchstart={opts.disabled ? noop : onTouchStart}>\n    <div class=\"riot-slider__track\"></div>\n    <div class=\"riot-slider__track--select\" if={included} style=\"left:{selectTrack.left + '%'};width:{selectTrack.width + '%'}\"></div>\n    <div class=\"riot-slider__handler riot-slider__handler--1\" style=\"left:{(opts.range ?selectTrack.left : selectTrack.width) + '%'}\" data-key={selectTrack.left}></div>\n    <div class=\"riot-slider__handler riot-slider__handler--2\" if={opts.range} style=\"left: {(selectTrack.left + selectTrack.width) + '%'}\" data-key={selectTrack.left + selectTrack.width}></div>\n    <div class=\"riot-slider__marks\" if={opts.marks || opts.showAllDots}>\n      <div each={mark,index in marks} class=\"riot-slider__marks--items {parseMarkItemClass(mark)}\">\n        <span class=\"riot-slider__marks--items-dot\" data-key={index} style=\"left:{mark.precent + '%'}\" if={mark.dot}></span>\n        <span class=\"riot-slider__marks--items-tip\" data-key={index} style=\"width:{mark.width + '%'};margin-left:{(-0.5 * mark.width) + '%'};left:{mark.precent + '%'}\" if={mark.tip}>{mark.label}</span>\n      </div>\n    </div>\n  </div>";

/// <reference path="../riot.d.ts" />
var slider = (function (Tag) {
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
    var getEnablePoint = function (marks, state, opts) {
        var min = state.min, max = state.max;
        var points = [];
        var markPoints;
        var length = max - min;
        var w;
        var step = opts.range ? opts.step : opts.step || 1;
        if (step > 0) {
            opts.showAllTips ? w = parseNumber(getMarkWidth(Math.ceil((max - min) / step))) : '';
            var i = min;
            while (i <= max) {
                if (!(marks && marks[i])) {
                    var _point = {
                        key: i,
                        label: '' + i,
                        precent: parseNumber((i - min) / length * 100)
                    };
                    if (opts.showAllTips) {
                        _point.width = w;
                        _point.tip = true;
                    }
                    if (opts.showAllDots) {
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
            var optShowMarkDotsNoUndefined = !isUndefined(opts.showMarkDots);
            var optShowMarkTipsNoUndefined = !isUndefined(opts.showMarkTips);
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
                        _point.dot = optShowMarkDotsNoUndefined ? opts.showMarkDots : true;
                        _point.tip = optShowMarkTipsNoUndefined ? opts.showMarkTips : true;
                    }
                    else {
                        _point.dot = mark.dot !== undefined ? mark.dot : optShowMarkDotsNoUndefined ? opts.showMarkDots : true;
                        _point.tip = mark.tip !== undefined ? mark.tip : optShowMarkTipsNoUndefined ? opts.showMarkTips : true;
                    }
                    points.push(_point);
                    _markPoints.push(_point);
                }
                else {
                    console.warn('riot-slider实例类名为%s中有key为%s的mark由于不在opts.min和opts.max之间被移除', opts.class, key);
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
            marks: opts.showAllDots ? points : markPoints
        };
    };
    var getMousePosition = function (e, isVertical) {
        if (isVertical === void 0) { isVertical = false; }
        return isVertical ? e.clientY : e.pageX;
    };
    var getTouchPosition = function (e, isVertical) {
        if (isVertical === void 0) { isVertical = false; }
        return isVertical ? e.touches[0].clientY : e.touches[0].pageX;
    };
    //通过长度获取值
    var getPrecentByPosition = function (pos, rect, isVertical) {
        if (isVertical === void 0) { isVertical = false; }
        var v;
        if (isVertical) {
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
        var marks = opts.marks, value = opts.value, _a = opts.min, min = _a === void 0 ? 0 : _a, _b = opts.max, max = _b === void 0 ? 100 : _b;
        min = Math.max(0, min);
        return {
            control: opts.control || false,
            isVertical: opts.vertical || false,
            allowCross: isUndefined(opts.allowCross) ? true : opts.allowCross,
            rangeValueShouldEqual: isUndefined(opts.rangeValueShouldEqual) ? true : opts.rangeValueShouldEqual,
            included: isUndefined(opts.included) ? true : opts.included,
            min: min,
            max: max
        };
    };
    var RiotSlider = (function (_super) {
        __extends(RiotSlider, _super);
        function RiotSlider(dom, opts) {
            if (opts === void 0) { opts = {}; }
            _super.call(this, dom, opts);
            this.state = {};
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
        };
        return RiotSlider;
    }(Tag));
    return RiotSlider;
})(riot.Tag);

exports.version = version;
exports.RiotCalendar = calendar;
exports.RiotSlider = slider;

}((this.riotComponent = this.riotComponent || {})));
