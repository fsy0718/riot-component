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
function zeroFill(number, targetLength, forceSign) {
    if (targetLength === void 0) { targetLength = 2; }
    if (forceSign === void 0) { forceSign = false; }
    var absNumber = '' + Math.abs(number), zerosToFill = targetLength - absNumber.length, sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
}
;
function isNumber(str) {
    return _toString.call(str) === '[object Number]';
}
function isDate(str) {
    return _toString.call(str) === '[object Date]';
}
function isArray(str) {
    return _toString.call(str) === '[object Array]';
}
function isFunction(str) {
    return _toString.call(str) === '[object Function]';
}
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

var datesOfMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function getFirstDateInMonth(y, m) {
    return new Date(y, m - 1, 1);
}
;
//是否为闰年
function isLeapYear(y) {
    return !(y % 4) && !!(y % 100) || !(y % 400);
}
;
function getDatesInPrevMonth(y, m, firstDay) {
    if (firstDay === void 0) { firstDay = 0; }
    var firstDayInMonth = getFirstDateInMonth(y, m).getDay();
    var dates = 0;
    if (~firstDayInMonth) {
        if (firstDayInMonth > firstDay) {
            dates = firstDayInMonth - firstDay;
        }
        else if (firstDayInMonth === firstDay) {
            dates = 0;
        }
        else {
            dates = 6 - firstDay + 1 + firstDayInMonth;
        }
    }
    return dates;
}
;
function getDatesInNextMonth(y, m, firstDay, weekMode) {
    return weekMode ? 6 : getWeeksInMonth(y, m, firstDay) * 7 - getDatesInPrevMonth(y, m, firstDay) - getDatesInMonth(y, m);
}
;
function getDatesInMonth(y, m) {
    --m;
    return m === 1 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m];
}
;
function getWeeksInMonth(y, m, firstDay) {
    var datesInMonth = getDatesInMonth(y, m) - 7 + getDatesInPrevMonth(y, m, firstDay);
    return Math.ceil(datesInMonth / 7) + 1 || 0;
}
;
function getDatesInYear(y, m, d) {
    var _d = 0;
    var i = 1;
    while (i < m) {
        _d = _d + (i === 2 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m - 1]);
        i++;
    }
    _d += d;
    return _d;
}
;
function getWeeksInYear(y, m, d) {
    var _d = getDatesInYear(y, m, d);
    return Math.round(_d / 7);
}
;

var _get = function (d, unit) {
    return d._d['get' + unit]();
};
var _set = function (d, unit, value) {
    return d._d['set' + unit](value);
};
var _makeGetSet = function (unit, keepTime) {
    return function (value) {
        if (value != null) {
            _set(this, unit, value);
            return this;
        }
        else {
            return _get(this, unit);
        }
    };
};
var _getsetYear = _makeGetSet('FullYear');
var _getsetMonth = _makeGetSet('Month');
var _getsetDate = _makeGetSet('Date');
var _getsetDay = _makeGetSet('Day');
var _getsetHour = _makeGetSet('Hours');
var _getsetMinute = _makeGetSet('Minutes');
var _getsetSecond = _makeGetSet('Seconds');
var _getsetMillisecond = _makeGetSet('Milliseconds');
/**
 * 基础date对象
 */
var RiotDateBase = (function () {
    function RiotDateBase(y, m, d) {
        this.isRiotDate = true;
        if (isDate(y)) {
            this._d = y;
        }
        else if (arguments.length >= 3) {
            this._d = new Date(y, m - 1, d);
        }
        else {
            this._d = new Date();
        }
    }
    RiotDateBase.prototype.year = function (value) {
        return _getsetYear.call(this, value);
    };
    RiotDateBase.prototype.month = function (value) {
        return _getsetMonth.call(this, value);
    };
    RiotDateBase.prototype.date = function (value) {
        return _getsetDate.call(this, value);
    };
    RiotDateBase.prototype.day = function () {
        return _getsetDay.call(this, null);
    };
    RiotDateBase.prototype.hour = function (value) {
        return _getsetHour.call(this, value);
    };
    RiotDateBase.prototype.minute = function (value) {
        return _getsetMinute.call(this, value);
    };
    RiotDateBase.prototype.second = function (value) {
        return _getsetSecond.call(this, value);
    };
    RiotDateBase.prototype.millisecond = function (value) {
        return _getsetMillisecond.call(this, value);
    };
    RiotDateBase.prototype.clone = function () {
        var _d = this._d;
        return new RiotDateBase(_d);
    };
    return RiotDateBase;
}());

var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
var formatFunctions = {};
var formatTokenFunctions = {};
var addFormatToken = function (token, padded, ordinal, callback) {
    var func = callback;
    if (typeof callback === 'string') {
        func = function () {
            return this[callback]();
        };
    }
    if (token) {
        formatTokenFunctions[token] = func;
    }
    if (padded) {
        formatTokenFunctions[padded[0]] = function () {
            return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
    }
    //TODO 不考虑ordinal
    /*if (ordinal) {
      formatTokenFunctions[ordinal] = function () {
        return this.localeData().ordinal(func.apply(this, arguments), token);
      };
    }*/
};
var makeFormatFunction = function (format) {
    var array = format.match(formattingTokens), i, length;
    for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
            array[i] = formatTokenFunctions[array[i]];
        }
        else {
            array[i] = removeFormattingTokens(array[i]);
        }
    }
    return function (mom) {
        var output = '', i;
        for (i = 0; i < length; i++) {
            output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
        }
        return output;
    };
};
// format date using native date object
var formatRiotDate = function (m, format) {
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
};
var removeFormattingTokens = function (input) {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
};
addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this._d.getMonth() + 1;
});
addFormatToken(0, ['YY', 2], 0, 'year');
addFormatToken(0, ['YYYY', 4], 0, 'year');
addFormatToken('w', ['ww', 2], 'wo', 'week');
addFormatToken('D', ['DD', 2], 'DD', 'date');
addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'date');
addFormatToken('e', 0, 0, 'day');
addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('m', ['mm', 2], 0, 'minute');
addFormatToken('s', ['ss', 2], 0, 'second');
addFormatToken(0, ['SSS', 3], 0, 'millisecond');
function _formatRiotDate(date, format) {
    if (!format) {
        format = 'YYYY-MM-DD';
    }
    if (isFunction(format)) {
        return format(date);
    }
    return formatRiotDate(date, format);
}
var RiotDate = (function (_super) {
    __extends(RiotDate, _super);
    function RiotDate() {
        return _super.apply(this, arguments) || this;
    }
    //TODO week计算有错误
    RiotDate.prototype.week = function () {
        return getWeeksInYear(this.year(), this.month() + 1, this.date());
    };
    RiotDate.prototype.format = function (arg) {
        return _formatRiotDate(this, arg);
    };
    return RiotDate;
}(RiotDateBase));

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

var riotCalendarTmpl = "<div class=\"riot-calendar__box\"> <div class=\"riot-calendar__main {(props.mutipleItems > 1 && 'riot-calendar--multiple riot-calendar--multiple-i' + props.mutipleItems)}\"> <a class=\"prev {state.prevMonthDisable && 'disable'}\" href=\"javascript:;\" onclick=\"{prevMonth}\"><i></i></a> <a class=\"next {state.nextMonthDisable && 'disable'}\" href=\"javascript:;\" onclick=\"{nextMonth}\"><i></i></a> <div class=\"riot-calendar__items\" each=\"{items, index in state.viewDatas}\"> <div class=\"riot-calendar__head\"> <div class=\"control title\"> <div if=\"{otherViewDatas}\" class=\"title__other\">{otherViewDatas[index].title}</div> <div class=\"title__cur\">{items.title}</div> </div> <div class=\"riot-component__row weeks\"> <div class=\"riot-component__col\" each=\"{week in props.weekTitles}\">{week}</div> </div> </div> <div class=\"riot-calendar__body\"> <div class=\"riot-calendar__body--cur\"> <div class=\"riot-component__row\"> <div class=\"riot-component__col\" each=\"{date in items.dates}\"> <span class=\"date-placeholder\" if=\"{!config.showOtherMonthDates && date.current}\"></span> <div if=\"{config.showOtherMonthDates || (config.showOtherMonthDates === false && date.current === 0)}\" class=\"{date.disable === 0 && 'enable' || 'disable'} {date.change && 'change'} {date.select === 1 && 'choice' || ''}\" onclick=\"{checkDate}\"> <riot-date date=\"{date}\">{date.date()}</riot-date> </div> </div> </div> </div> </div> </div> </div> <div class=\"riot-calendar__foot\"></div> </div>";

var riotCalendarCss = ".riot-component__row{letter-spacing:-.31em;text-rendering:optimizeSpeed;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-ms-flex-line-pack:start;align-content:flex-start;font-family:FreeSans,Arimo,Droid Sans,Helvetica,Arial,sans-serif}.riot-component__row .riot-component__col{display:inline-block;zoom:1;letter-spacing:normal;word-spacing:normal;vertical-align:top;text-rendering:auto}[data-is=riot-calendar]{display:block}[data-is=riot-calendar] riot-date{display:block;height:100%}[data-is=riot-calendar] .riot-calendar__main{position:relative}[data-is=riot-calendar] .riot-calendar__main .next,[data-is=riot-calendar] .riot-calendar__main .prev{width:20%;position:absolute;top:0;height:1.625rem;line-height:2;z-index:2}[data-is=riot-calendar] .riot-calendar__main .next i,[data-is=riot-calendar] .riot-calendar__main .prev i{position:absolute;width:.5rem;height:.5rem;top:50%;left:50%;margin-top:-.40625rem;margin-left:-.25rem;border-top:none;border-right:none;border-left:2px solid #7f1f59;border-bottom:2px solid #7f1f59}[data-is=riot-calendar] .riot-calendar__main .next.disable i,[data-is=riot-calendar] .riot-calendar__main .prev.disable i{border-left-color:#b8b8b8;border-bottom-color:#b8b8b8}[data-is=riot-calendar] .riot-calendar__main .prev{left:0}[data-is=riot-calendar] .riot-calendar__main .prev i{-webkit-transform:rotate(45deg);transform:rotate(45deg)}[data-is=riot-calendar] .riot-calendar__main .next{right:0}[data-is=riot-calendar] .riot-calendar__main .next i{-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}[data-is=riot-calendar] .riot-calendar--multiple:after,[data-is=riot-calendar] .riot-calendar--multiple:before{content:\"\";display:table}[data-is=riot-calendar] .riot-calendar--multiple:after{clear:both}[data-is=riot-calendar] .riot-calendar--multiple .riot-calendar__items{float:left;box-sizing:border-box}[data-is=riot-calendar] .riot-calendar--multiple .next,[data-is=riot-calendar] .riot-calendar--multiple .prev{width:15%}[data-is=riot-calendar] .riot-calendar--multiple-i2 .riot-calendar__items{width:49%;padding:0 1%}[data-is=riot-calendar] .riot-calendar--multiple-i3 .riot-calendar__items{width:32.33333%;padding:0 1%}[data-is=riot-calendar] .riot-calendar--multiple-i4 .riot-calendar__items{width:24%;padding:0 1%}[data-is=riot-calendar] .riot-calendar--multiple-i5 .riot-calendar__items{width:19%;padding:0 1%}[data-is=riot-calendar] .riot-calendar--multiple-i6 .riot-calendar__items{width:15.66667%;padding:0 1%}[data-is=riot-calendar] .riot-component__col{width:14.285%;text-align:center;position:relative}[data-is=riot-calendar] .weeks{font-size:.8125rem;color:#333;line-height:2.1875rem;position:relative}[data-is=riot-calendar] .weeks:after{position:absolute;content:\"\";width:90.625%;height:1px;background-color:#efebea;opacity:.97;left:4.6875%;bottom:0;z-index:2}[data-is=riot-calendar] .title{text-align:center;color:#333;font-size:.8125rem;line-height:2;position:relative;height:1.625rem;overflow:hidden;margin:0 20% .5rem}[data-is=riot-calendar] .title--cur{z-index:2}[data-is=riot-calendar] .title--other{z-index:1;pointer-events:none}[data-is=riot-calendar] .riot-calendar__body{padding:.40625rem 0;position:relative;min-height:15rem;overflow:hidden}[data-is=riot-calendar] .riot-calendar__body .pure-g{margin-top:.5rem}[data-is=riot-calendar] .riot-calendar__body--cur{z-index:2}[data-is=riot-calendar] .riot-calendar__body--other{z-index:1;pointer-events:none}[data-is=riot-calendar] .riot-calendar__body--cur,[data-is=riot-calendar] .riot-calendar__body--other,[data-is=riot-calendar] .title__cur,[data-is=riot-calendar] .title__other{will-change:transform,opacity;position:absolute;width:100%;left:0;background:#fff;-webkit-animation-play-state:paused;animation-play-state:paused;-webkit-animation-duration:.45s;animation-duration:.45s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-timing-function:cubic-bezier(.23,1,.32,1);animation-timing-function:cubic-bezier(.23,1,.32,1)}[data-is=riot-calendar] .riot-calendar__body--cur.calendar-fadeInLeft,[data-is=riot-calendar] .riot-calendar__body--other.calendar-fadeInLeft,[data-is=riot-calendar] .title__cur.calendar-fadeInLeft,[data-is=riot-calendar] .title__other.calendar-fadeInLeft{-webkit-animation-name:a;animation-name:a}[data-is=riot-calendar] .riot-calendar__body--cur.calendar-fadeInRight,[data-is=riot-calendar] .riot-calendar__body--other.calendar-fadeInRight,[data-is=riot-calendar] .title__cur.calendar-fadeInRight,[data-is=riot-calendar] .title__other.calendar-fadeInRight{-webkit-animation-name:c;animation-name:c}[data-is=riot-calendar] .riot-calendar__body--cur.calendar-fadeOutLeft,[data-is=riot-calendar] .riot-calendar__body--other.calendar-fadeOutLeft,[data-is=riot-calendar] .title__cur.calendar-fadeOutLeft,[data-is=riot-calendar] .title__other.calendar-fadeOutLeft{-webkit-animation-name:b;animation-name:b}[data-is=riot-calendar] .riot-calendar__body--cur.calendar-fadeOutRight,[data-is=riot-calendar] .riot-calendar__body--other.calendar-fadeOutRight,[data-is=riot-calendar] .title__cur.calendar-fadeOutRight,[data-is=riot-calendar] .title__other.calendar-fadeOutRight{-webkit-animation-name:d;animation-name:d}[data-is=riot-calendar] .riot-calendar__body--cur.animation,[data-is=riot-calendar] .riot-calendar__body--other.animation,[data-is=riot-calendar] .title__cur.animation,[data-is=riot-calendar] .title__other.animation{-webkit-animation-play-state:running;animation-play-state:running}[data-is=riot-calendar] .riot-calendar__body--cur,[data-is=riot-calendar] .riot-calendar__body--other{top:.25rem;height:100%}[data-is=riot-calendar] .date-placeholder{display:block}[data-is=riot-calendar] .date,[data-is=riot-calendar] .date-placeholder{height:2rem;line-height:2rem;text-align:center;cursor:default}[data-is=riot-calendar] .date-placeholder i,[data-is=riot-calendar] .date i{font-style:normal}[data-is=riot-calendar] .disable{color:#c5c5c5}[data-is=riot-calendar] .enable{color:#393836}[data-is=riot-calendar] .change .date,[data-is=riot-calendar] .choice .date{width:32px;height:32px;position:absolute;z-index:2;left:50%;margin-left:-16px;-ms-box-sizing:border-box;box-sizing:border-box;line-height:2rem;display:inline-block}[data-is=riot-calendar] .change .date .riot-date--bg,[data-is=riot-calendar] .choice .date .riot-date--bg{width:100%;height:100%;border-radius:50%;content:\"\";background-color:#7f1f59;position:absolute;top:0;left:0;z-index:-1;-webkit-animation-duration:.45s;animation-duration:.45s;-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-timing-function:cubic-bezier(.23,1,.32,1);animation-timing-function:cubic-bezier(.23,1,.32,1);will-change:transform,opacity}[data-is=riot-calendar] .change .date.riot-calendar-in .riot-date--bg,[data-is=riot-calendar] .choice .date.riot-calendar-in .riot-date--bg{-webkit-animation-name:e;animation-name:e}[data-is=riot-calendar] .change .date.riot-calendar-out .riot-date--bg,[data-is=riot-calendar] .choice .date.riot-calendar-out .riot-date--bg{-webkit-animation-name:f;animation-name:f}[data-is=riot-calendar] .choice.enable{color:#fff}[data-is=riot-calendar] .range--area{background-color:#eee2e9}[data-is=riot-calendar] .range--area .enable .date{color:#fff}[data-is=riot-calendar] .checkoutrange{font-weight:700}[data-is=riot-calendar] .range--end:before,[data-is=riot-calendar] .range--start:before{width:50%;height:32px;position:absolute;top:0;background-color:#eee2e9;content:\" \"}[data-is=riot-calendar] .range--start:before{right:0}[data-is=riot-calendar] .range--end:before{left:0}@-webkit-keyframes a{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes a{0%{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes b{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}}@keyframes b{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}}@-webkit-keyframes c{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@keyframes c{0%{-webkit-transform:translateX(100%);transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}}@-webkit-keyframes d{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:1}}@keyframes d{0%{-webkit-transform:translateX(0);transform:translateX(0);opacity:1}to{-webkit-transform:translateX(-100%);transform:translateX(-100%);opacity:1}}@-webkit-keyframes e{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacith:1}}@keyframes e{0%{-webkit-transform:scale(0);transform:scale(0);opacity:0}to{-webkit-transform:scale(1);transform:scale(1);opacith:1}}@-webkit-keyframes f{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(0);transform:scale(0);opacity:0}}@keyframes f{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(0);transform:scale(0);opacity:0}}";

var calendar = (function (Tag) {
    var defaultOpts = {
        showOtherMonthDates: true,
        switchWithAnimation: true,
        animationTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        animationDuration: 0.45,
        numberOfMonths: 1,
        firstDay: 0
    };
    function format(date) {
        if (isDate(date)) {
            return '' + date.getFullYear() + zeroFill(date.getMonth() + 1) + zeroFill(date.getDate());
        }
        return '';
    }
    var viewDatesCache = {};
    var weekTitles = ['日', '一', '二', '三', '四', '五', '六'];
    var initSelectDates = function (ctx) {
        var _a = ctx.config, isRange = _a.isRange, isMultiple = _a.isMultiple, _b = _a.selectDates, selectDates = _b === void 0 ? [] : _b;
        var _e = ctx.props, rls = _e.rls, rle = _e.rle, mis = _e.mis, mas = _e.mas;
        var selectDatesClone = [];
        selectDates.forEach(function (d) {
            var s = format(d);
            if (isRange && ((rls && rls > s) || (rle && rle < s))) {
                console.warn('riot-calendr组件value中%s由于不符合rangeLimit条件而被移除', d);
            }
            else if ((mis && mis > s) || (mas && mas < s)) {
                console.warn('riot-calendr组件value中%s由于不符合minDate与maxDate条件而被移除', d);
            }
            selectDatesClone.push(new RiotDate(d));
        });
        selectDatesClone.sort(function (a, b) {
            return +a._d - +b._d;
        });
        if (isRange) {
            selectDatesClone = selectDatesClone.slice(0, 2);
        }
        else if (!isMultiple) {
            selectDatesClone = selectDatesClone.slice(0, 1);
        }
        return selectDatesClone;
    };
    var getViewItems = function (y, m, ctx) {
        var viewItems = [{ y: y, m: m }];
        var n = ctx.props.numberOfMonths;
        if (n > 1) {
            var i = 1;
            while (i < n) {
                ++m;
                if (m > 12) {
                    m = 1;
                    y += 1;
                }
                viewItems.push({
                    y: y,
                    m: m
                });
                i++;
            }
        }
        return viewItems;
    };
    var parseRiotDateProps = function (date, ctx, rangeStartInOtherMonth, rangeEndInOtherMonth) {
        date.disable = 0;
        var _a = ctx.config, isRange = _a.isRange, dateTimeFormat = _a.dateTimeFormat, disabledOverRangeGap = _a.disabledOverRangeGap, minRangeGap = _a.minRangeGap, maxRangeGap = _a.maxRangeGap, disabledDate = _a.disabledDate, isMultiple = _a.isMultiple;
        var _b = ctx.props, rs = _b.rs, re = _b.re, rls = _b.rls, rle = _b.rle, mis = _b.mis, mas = _b.mas;
        var _e = ctx.state, selectDates = _e.selectDates, selectDatesFormat = _e.selectDatesFormat, curChangeDateFormat = _e.curChangeDateFormat, lastSelectDatesFormat = _e.lastSelectDatesFormat;
        if (dateTimeFormat) {
            date.dateformat = date.format(dateTimeFormat);
        }
        var _format = date.format('YYYYMMDD');
        if (isRange) {
            if (rs) {
                if (rs === _format) {
                    date.range = -1;
                    date.select = 1;
                    if (date.current !== 0) {
                        rangeStartInOtherMonth = true;
                    }
                }
                else if (re) {
                    if (_format === re) {
                        date.range = 1;
                        date.select = 1;
                        if (date.current !== 0) {
                            rangeEndInOtherMonth = true;
                        }
                    }
                    else if (_format > rs && _format < re) {
                        date.range = 0;
                    }
                }
            }
        }
        else if (selectDatesFormat.indexOf(_format) > -1) {
            date.select = 1;
        }
        if (date.current) {
            date.disable = 1;
        }
        else if (isRange && (rls && rls > _format) || (rle && rle < _format)) {
            date.disable = 2;
        }
        else if ((mis && mis > _format) || (mas && mas < _format)) {
            date.disable = 3;
        }
        else if (isRange && disabledOverRangeGap && selectDates && selectDates.length === 1) {
            var diff = +_format - +selectDates[0].format('YYYYMMDD');
            if (diff > 0) {
                if (minRangeGap && diff < minRangeGap) {
                    date.disable = 4;
                }
                if (maxRangeGap && diff >= maxRangeGap) {
                    date.disable = 5;
                }
            }
        }
        disabledDate && disabledDate(date);
        if (curChangeDateFormat) {
            if (curChangeDateFormat === _format) {
                date.animation = date.select === 1 ? 1 : -1;
                date.change = 1;
            }
            else if (lastSelectDatesFormat.indexOf(_format) > -1) {
                if (isRange) {
                    if (selectDatesFormat.length === 1) {
                        if (lastSelectDatesFormat.length === 1 || (lastSelectDatesFormat.length === 2 && (selectDatesFormat[0] !== lastSelectDatesFormat[0] || selectDatesFormat[0] !== lastSelectDatesFormat[1]))) {
                            date.animation = -1;
                            date.change = 1;
                        }
                    }
                }
                else if (isMultiple) {
                    date.animation = -1;
                    date.change = 1;
                }
            }
        }
    };
    var _getViewDatas = function (y, m, ctx) {
        var _a = ctx.config, weekMode = _a.weekMode, firstDay = _a.firstDay;
        var reiom = false;
        var rsiom = false;
        var cache = [];
        var viewDatas;
        var viewDates = [];
        var weekNum = weekMode ? 6 : getWeeksInMonth(y, m, firstDay);
        var datesInPrevMonth = getDatesInPrevMonth(y, m, firstDay);
        var datesInNextMonth = getDatesInNextMonth(y, m, firstDay, weekMode);
        var d = getDatesInMonth(y, m);
        var i = 0;
        var y1 = y;
        var y3 = y;
        var m1 = m;
        var m3 = m;
        var d1 = d;
        var d3 = d;
        if (datesInPrevMonth) {
            if (m1 === 1) {
                --y1;
                m1 = 13;
            }
            --m1;
            d1 = getDatesInMonth(y1, m1);
        }
        if (datesInNextMonth) {
            if (m3 === 12) {
                ++y3;
                m3 = 0;
            }
            ++m3;
        }
        var c2 = 0;
        var c3 = 0;
        while (i < weekNum) {
            var j = 0;
            while (j < 7) {
                var _y = void 0, _m = void 0, _d = void 0, _c = 0;
                if (datesInPrevMonth) {
                    _y = y1;
                    _m = m1;
                    _d = d1 - datesInPrevMonth + 1;
                    _c = -1;
                    --datesInPrevMonth;
                }
                else if (c2 < d) {
                    _y = y;
                    _m = m;
                    _d = ++c2;
                }
                else if (c3 < datesInNextMonth) {
                    _y = y3;
                    _m = m3;
                    _d = ++c3;
                    _c = 1;
                }
                //添加到缓存
                cache.push(_c + '/' + _y + '/' + _m + '/' + _d);
                var riotdate = new RiotDate(_y, _m, _d);
                riotdate.current = _c;
                parseRiotDateProps(riotdate, ctx, rsiom, reiom);
                viewDates.push(riotdate);
                j++;
            }
            i++;
        }
        viewDatesCache[ctx.props.idx][y + '-' + m] = cache;
        return {
            dates: viewDates,
            rangeEndInOtherMonth: reiom,
            rangeStartInOtherMonth: rsiom
        };
    };
    var _parseViewDatasFromCache = function (data, ctx) {
        var viewDatas;
        var reiom = false;
        var rsiom = false;
        var viewDates = data.map(function (d) {
            var _d = d.split('/');
            var riotdate = new RiotDate(+_d[1], +_d[2], +_d[3]);
            riotdate.current = +_d[0];
            parseRiotDateProps(riotdate, ctx, rsiom, reiom);
            return riotdate;
        });
        return {
            dates: viewDates,
            rangeEndInOtherMonth: reiom,
            rangeStartInOtherMonth: rsiom
        };
    };
    var getSingleViewDatas = function (y, m, ctx) {
        var idx = ctx.props.idx;
        var key = y + '-' + m;
        var viewDatas;
        if (!viewDatesCache[idx]) {
            viewDatesCache[idx] = {};
        }
        if (!viewDatesCache[idx][key]) {
            viewDatas = _getViewDatas(y, m, ctx);
        }
        else {
            viewDatas = _parseViewDatasFromCache(viewDatesCache[idx][key], ctx);
        }
        viewDatas.title = y + '年' + m + '月';
        viewDatas.year = y;
        viewDatas.month = m;
        return viewDatas;
    };
    var getViewDatas = function (viewItems, ctx) {
        var viewDatas = viewItems.map(function (item, index) {
            return getSingleViewDatas(item.y, item.m, ctx);
        });
        return viewDatas;
    };
    var changeView = function (direction, ctx) {
        var isPrev = direction === -1;
        var item = ctx.state.viewDatas[isPrev ? 0 : ctx.state.viewDatas.length - 1];
        var m = item.month + direction;
        var y = item.year;
    };
    var checkViewSwitchStatus = function (ctx) {
        var _a = ctx.config, switchViewOverLimit = _a.switchViewOverLimit, isRange = _a.isRange;
        var preMonthDisable = false, nextMonthDisable = false;
        if (switchViewOverLimit) {
            var _b = ctx.props, rls = _b.rls, mis = _b.mis, rle = _b.rle, mas = _b.mas;
            var viewDatas = ctx.state.viewDatas;
            var y1 = viewDatas[0].year;
            var m1 = viewDatas[0].month;
            var l = viewDatas.length - 1;
            var y2 = viewDatas[l].year;
            var m2 = viewDatas[l].month;
            var firstDateFormat = y1 + zeroFill(m1) + '01';
            var lastDateFormat = y2 + zeroFill(m2) + zeroFill(getDatesInMonth(y2, m2));
            if (isRange && firstDateFormat <= rls || firstDateFormat <= mis) {
                preMonthDisable = true;
            }
            else {
                preMonthDisable = false;
            }
            if ((isRange && rle && lastDateFormat >= rle) || (mas && lastDateFormat >= mas)) {
                nextMonthDisable = true;
            }
            else {
                nextMonthDisable = false;
            }
        }
        return { nextMonthDisable: nextMonthDisable, preMonthDisable: preMonthDisable };
    };
    var initConfig = function (opts) {
        return objectAssign$1({}, defaultOpts, opts);
    };
    var initState = function (ctx) {
        var selectDates = initSelectDates(ctx);
        var selectDatesFormat = [];
        selectDates.forEach(function (d) {
            selectDatesFormat.push(d.format('YYYYMMDD'));
        });
        var state = {
            selectDates: selectDates,
            selectDatesFormat: selectDatesFormat
        };
        return state;
    };
    var initProps = function (ctx) {
        var config = ctx.config;
        var firstDay = config.firstDay, _a = config.rangeLimit, rangeLimit = _a === void 0 ? [] : _a, minDate = config.minDate, maxDate = config.maxDate, isRange = config.isRange, isMultiple = config.isMultiple, defaultDate = config.defaultDate, weekMode = config.weekMode, numberOfMonths = config.numberOfMonths;
        var rls = format(rangeLimit[0]);
        var rle = format(rangeLimit[1]);
        var mis = format(minDate);
        var mas = format(maxDate);
        if (isRange) {
            //判断rangeLimit与misDate|masDate的大小
            mis && rls && rls < mis ? rls = mis : '';
            mas && rle && rle > mas ? rle = mas : '';
        }
        var props = {
            weekTitles: weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay)),
            rls: rls,
            rle: rle,
            mis: mis,
            mas: mas,
            idx: '' + firstDay + '/' + (weekMode ? 1 : 0)
        };
        if (numberOfMonths) {
            var col = void 0, row = 1;
            if (isNumber(numberOfMonths)) {
                col = parseInt('' + numberOfMonths);
            }
            else if (isArray(numberOfMonths)) {
                row = parseInt(numberOfMonths[0]) || 0;
                col = parseInt(numberOfMonths[1]) || 0;
            }
            props.numberOfMonths = row * col;
            props.mutipleItems = col;
        }
        return props;
    };
    var updateProps = function (ctx) {
        var selectDates = ctx.state.selectDates;
        var _a = ctx.config, isMultiple = _a.isMultiple, isRange = _a.isRange, defaultDate = _a.defaultDate;
        var rs = '';
        var re = '';
        if (selectDates[0] && !isMultiple) {
            rs = selectDates[0].format('YYYYMMDD');
        }
        if (selectDates[1] && isRange) {
            re = selectDates[1].format('YYYYMMDD');
        }
        ctx.props.rs = rs;
        ctx.props.re = re;
        ctx.props.defaultDate = isDate(defaultDate) ? new RiotDate(defaultDate) : selectDates && selectDates[0] || new RiotDate();
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
        Object.defineProperty(RiotCalendar.prototype, "css", {
            get: function () {
                return riotCalendarCss;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RiotCalendar.prototype, "attrs", {
            get: function () {
                return 'data-is="riot-calendar"';
            },
            enumerable: true,
            configurable: true
        });
        RiotCalendar.prototype.onCreate = function (opts) {
            var self = this;
            self.config = initConfig(opts);
            self.props = initProps(self);
            self.state = initState(self);
            updateProps(self);
            var date = self.props.defaultDate;
            var m = date.month() + 1;
            var y = date.year();
            var viewItems = getViewItems(y, m, self);
            self.state.viewDatas = getViewDatas(viewItems, self);
            objectAssign$1(self.state, checkViewSwitchStatus(self));
            console.log(viewDatesCache);
        };
        RiotCalendar.prototype.prevMonth = function (e) {
            var self = this;
            if (self.state.preMonthDisable) {
                e ? e.preventUpdate = true : '';
                return;
            }
            changeView(-1, self);
        };
        RiotCalendar.prototype.getSelectDates = function (sort) {
            if (sort && this.config.isMultiple) {
                this.state.selectDates.sort(function (a, b) {
                    return +a._d - +b._d;
                });
            }
            return this.state.selectDates;
        };
        return RiotCalendar;
    }(riot.Tag));
    return RiotCalendar;
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