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
                        _point.dot = !isUndefined(opts.showMarkDots) ? opts.showMarkDots : true;
                        _point.tip = !isUndefined(opts.showMarkTips) ? opts.showMarkTips : true;
                    }
                    else {
                        _point.dot = mark.dot !== undefined ? mark.dot : !isUndefined(opts.showMarkDots) ? opts.showMarkDots : true;
                        _point.tip = mark.tip !== undefined ? mark.tip : !isUndefined(opts.showMarkTips) ? opts.showMarkTips : true;
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
    var RiotSlider = (function (_super) {
        __extends(RiotSlider, _super);
        function RiotSlider(dom, opts) {
            if (opts === void 0) { opts = {}; }
            _super.call(this, dom, opts);
            this.state = {};
            var sliderRootEle;
            this.on('mount', function () {
                sliderRootEle = this.root.querySelector('.riot-slider');
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
        RiotSlider.prototype.initState = function (opts) {
            this.state = {
                control: opts.control || false,
                isVertical: opts.vertical || false,
                allowCross: isUndefined(opts.allowCross) ? true : opts.allowCross,
                rangeValueShouldEqual: isUndefined(opts.rangeValueShouldEqual) ? true : opts.rangeValueShouldEqual,
                included: isUndefined(opts.included) ? true : opts.included
            };
        };
        RiotSlider.prototype.onCreate = function (opts) {
            this.initState(opts);
        };
        return RiotSlider;
    }(Tag));
    return RiotSlider;
})(riot.Tag);

export { version, calendar as RiotCalendar, slider as RiotSlider };