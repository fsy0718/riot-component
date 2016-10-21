'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var riot = _interopDefault(require('riot'));

riot.tag2('riot-popver', '<yield></yield>', 'riot-popver,[riot-tag="riot-popver"],[data-is="riot-popver"]{ background-color: #fff; border-radius: 0 0 7px 7px; }', '', function (opts) {
  var tag = this;
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

riot.tag2('riot-calendar', '<div class="riot-calendar"> <div class="riot-calendar__head"> <div class="pure-g control"> <a class="pure-u-1-5 prev {prevMonthDisable && \'disable\'}" href="javascript:;" onclick="{prevMonth}"><i></i></a> <div class="pure-u-3-5 title"> <div if="{otherData}" class="title__other">{otherData.title}</div> <div class="title__cur">{curData.title}</div> </div> <a class="pure-u-1-5 next {nextMonthDisable && \'disable\'}" href="javascript:;" onclick="{nextMonth}"><i></i></a> </div> <div class="pure-g weeks"> <div class="pure-u-1-8" each="{week in weekTitles}">{week}</div> </div> </div> <div class="riot-calendar__body"> <div if="{otherData}" class="riot-calendar__body--other"> <div class="pure-g" each="{weekdates in otherData.weekdates}"> <div class="pure-u-1-8 {parseDateBoxClass(date)}" each="{date in weekdates}"> <div class="day {parseDateClass(date)}" onclick="{checkDate}">{date.d}</div> </div> </div> </div> <div class="riot-calendar__body--cur"> <div class="pure-g" each="{weekdates in curData.weekdates}"> <div class="pure-u-1-8 {parseDateBoxClass(date)}" each="{date in weekdates}"> <div class="day {parseDateClass(date)}" onclick="{checkDate}">{date.d}</div> </div> </div> </div> </div> <div class="riot-calendar__foot"></div> </div>', 'riot-calendar,[riot-tag="riot-calendar"],[data-is="riot-calendar"]{ display: block; } riot-calendar .pure-u-1-8,[riot-tag="riot-calendar"] .pure-u-1-8,[data-is="riot-calendar"] .pure-u-1-8{ width: 14.285%; text-align: center; } riot-calendar .weeks,[riot-tag="riot-calendar"] .weeks,[data-is="riot-calendar"] .weeks{ font-size: 0.8125rem; color: #333333; line-height: 2.1875rem; position: relative; } riot-calendar .weeks:after,[riot-tag="riot-calendar"] .weeks:after,[data-is="riot-calendar"] .weeks:after{ position: absolute; content: \'\'; width: 90.625%; height: 1px; background-color: #efebea; opacity: 0.97; left: 4.6875%; bottom: 0; z-index: 2; } riot-calendar .control,[riot-tag="riot-calendar"] .control,[data-is="riot-calendar"] .control{ text-align: center; margin-bottom: 0.5rem; } riot-calendar .control .title,[riot-tag="riot-calendar"] .control .title,[data-is="riot-calendar"] .control .title{ color: #333333; font-size: 0.8125rem; line-height: 2; position: relative; height: 1.625rem; overflow: hidden; } riot-calendar .control .prev,[riot-tag="riot-calendar"] .control .prev,[data-is="riot-calendar"] .control .prev,riot-calendar .control .next,[riot-tag="riot-calendar"] .control .next,[data-is="riot-calendar"] .control .next{ position: relative; } riot-calendar .control .prev i,[riot-tag="riot-calendar"] .control .prev i,[data-is="riot-calendar"] .control .prev i,riot-calendar .control .next i,[riot-tag="riot-calendar"] .control .next i,[data-is="riot-calendar"] .control .next i{ position: absolute; width: 0.5rem; height: 0.5rem; top: 50%; left: 50%; margin-top: -0.25rem; margin-left: -0.25rem; border-top: none; border-right: none; border-left: 2px solid #7f1f59; border-bottom: 2px solid #7f1f59; } riot-calendar .control .prev.disable i,[riot-tag="riot-calendar"] .control .prev.disable i,[data-is="riot-calendar"] .control .prev.disable i,riot-calendar .control .next.disable i,[riot-tag="riot-calendar"] .control .next.disable i,[data-is="riot-calendar"] .control .next.disable i{ border-left-color: #b8b8b8; border-bottom-color: #b8b8b8; } riot-calendar .control .prev i,[riot-tag="riot-calendar"] .control .prev i,[data-is="riot-calendar"] .control .prev i{ -webkit-transform: rotate(45deg); transform: rotate(45deg); } riot-calendar .control .next i,[riot-tag="riot-calendar"] .control .next i,[data-is="riot-calendar"] .control .next i{ -webkit-transform: rotate(-135deg); transform: rotate(-135deg); } riot-calendar .riot-calendar__body,[riot-tag="riot-calendar"] .riot-calendar__body,[data-is="riot-calendar"] .riot-calendar__body{ padding: 0.40625rem 0; position: relative; min-height: 15rem; overflow: hidden; } riot-calendar .riot-calendar__body .pure-g,[riot-tag="riot-calendar"] .riot-calendar__body .pure-g,[data-is="riot-calendar"] .riot-calendar__body .pure-g{ margin-top: 0.5rem; } riot-calendar .riot-calendar__body--cur,[riot-tag="riot-calendar"] .riot-calendar__body--cur,[data-is="riot-calendar"] .riot-calendar__body--cur,riot-calendar .riot-calendar__body--other,[riot-tag="riot-calendar"] .riot-calendar__body--other,[data-is="riot-calendar"] .riot-calendar__body--other,riot-calendar .title__cur,[riot-tag="riot-calendar"] .title__cur,[data-is="riot-calendar"] .title__cur,riot-calendar .title__other,[riot-tag="riot-calendar"] .title__other,[data-is="riot-calendar"] .title__other{ will-change: transform, opacity; position: absolute; width: 100%; left: 0; background: #fff; -webkit-animation-play-state: paused; animation-play-state: paused; -webkit-animation-duration: 0.45s; animation-duration: 0.45s; -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards; -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); } riot-calendar .riot-calendar__body--cur.calendar-fadeInLeft,[riot-tag="riot-calendar"] .riot-calendar__body--cur.calendar-fadeInLeft,[data-is="riot-calendar"] .riot-calendar__body--cur.calendar-fadeInLeft,riot-calendar .riot-calendar__body--other.calendar-fadeInLeft,[riot-tag="riot-calendar"] .riot-calendar__body--other.calendar-fadeInLeft,[data-is="riot-calendar"] .riot-calendar__body--other.calendar-fadeInLeft,riot-calendar .title__cur.calendar-fadeInLeft,[riot-tag="riot-calendar"] .title__cur.calendar-fadeInLeft,[data-is="riot-calendar"] .title__cur.calendar-fadeInLeft,riot-calendar .title__other.calendar-fadeInLeft,[riot-tag="riot-calendar"] .title__other.calendar-fadeInLeft,[data-is="riot-calendar"] .title__other.calendar-fadeInLeft{ -webkit-animation-name: riot-calendar-fadeInFromLeft; animation-name: riot-calendar-fadeInFromLeft; } riot-calendar .riot-calendar__body--cur.calendar-fadeInRight,[riot-tag="riot-calendar"] .riot-calendar__body--cur.calendar-fadeInRight,[data-is="riot-calendar"] .riot-calendar__body--cur.calendar-fadeInRight,riot-calendar .riot-calendar__body--other.calendar-fadeInRight,[riot-tag="riot-calendar"] .riot-calendar__body--other.calendar-fadeInRight,[data-is="riot-calendar"] .riot-calendar__body--other.calendar-fadeInRight,riot-calendar .title__cur.calendar-fadeInRight,[riot-tag="riot-calendar"] .title__cur.calendar-fadeInRight,[data-is="riot-calendar"] .title__cur.calendar-fadeInRight,riot-calendar .title__other.calendar-fadeInRight,[riot-tag="riot-calendar"] .title__other.calendar-fadeInRight,[data-is="riot-calendar"] .title__other.calendar-fadeInRight{ -webkit-animation-name: riot-calendar-fadeInFromRight; animation-name: riot-calendar-fadeInFromRight; } riot-calendar .riot-calendar__body--cur.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .riot-calendar__body--cur.calendar-fadeOutLeft,[data-is="riot-calendar"] .riot-calendar__body--cur.calendar-fadeOutLeft,riot-calendar .riot-calendar__body--other.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .riot-calendar__body--other.calendar-fadeOutLeft,[data-is="riot-calendar"] .riot-calendar__body--other.calendar-fadeOutLeft,riot-calendar .title__cur.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .title__cur.calendar-fadeOutLeft,[data-is="riot-calendar"] .title__cur.calendar-fadeOutLeft,riot-calendar .title__other.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .title__other.calendar-fadeOutLeft,[data-is="riot-calendar"] .title__other.calendar-fadeOutLeft{ -webkit-animation-name: riot-calendar-fadeOutFromLeft; animation-name: riot-calendar-fadeOutFromLeft; } riot-calendar .riot-calendar__body--cur.calendar-fadeOutRight,[riot-tag="riot-calendar"] .riot-calendar__body--cur.calendar-fadeOutRight,[data-is="riot-calendar"] .riot-calendar__body--cur.calendar-fadeOutRight,riot-calendar .riot-calendar__body--other.calendar-fadeOutRight,[riot-tag="riot-calendar"] .riot-calendar__body--other.calendar-fadeOutRight,[data-is="riot-calendar"] .riot-calendar__body--other.calendar-fadeOutRight,riot-calendar .title__cur.calendar-fadeOutRight,[riot-tag="riot-calendar"] .title__cur.calendar-fadeOutRight,[data-is="riot-calendar"] .title__cur.calendar-fadeOutRight,riot-calendar .title__other.calendar-fadeOutRight,[riot-tag="riot-calendar"] .title__other.calendar-fadeOutRight,[data-is="riot-calendar"] .title__other.calendar-fadeOutRight{ -webkit-animation-name: riot-calendar-fadeOutFromRight; animation-name: riot-calendar-fadeOutFromRight; } riot-calendar .riot-calendar__body--cur.animation,[riot-tag="riot-calendar"] .riot-calendar__body--cur.animation,[data-is="riot-calendar"] .riot-calendar__body--cur.animation,riot-calendar .riot-calendar__body--other.animation,[riot-tag="riot-calendar"] .riot-calendar__body--other.animation,[data-is="riot-calendar"] .riot-calendar__body--other.animation,riot-calendar .title__cur.animation,[riot-tag="riot-calendar"] .title__cur.animation,[data-is="riot-calendar"] .title__cur.animation,riot-calendar .title__other.animation,[riot-tag="riot-calendar"] .title__other.animation,[data-is="riot-calendar"] .title__other.animation{ -webkit-animation-play-state: running; animation-play-state: running; } riot-calendar .riot-calendar__body--cur,[riot-tag="riot-calendar"] .riot-calendar__body--cur,[data-is="riot-calendar"] .riot-calendar__body--cur,riot-calendar .riot-calendar__body--other,[riot-tag="riot-calendar"] .riot-calendar__body--other,[data-is="riot-calendar"] .riot-calendar__body--other{ top: 0.25rem; height: 100%; } riot-calendar .day,[riot-tag="riot-calendar"] .day,[data-is="riot-calendar"] .day{ height: 2rem; line-height: 2rem; text-align: center; cursor: default; } riot-calendar .day i,[riot-tag="riot-calendar"] .day i,[data-is="riot-calendar"] .day i{ font-style: normal; } riot-calendar .day span,[riot-tag="riot-calendar"] .day span,[data-is="riot-calendar"] .day span{ display: none; } riot-calendar .disable,[riot-tag="riot-calendar"] .disable,[data-is="riot-calendar"] .disable{ color: #c5c5c5; } riot-calendar .enable,[riot-tag="riot-calendar"] .enable,[data-is="riot-calendar"] .enable{ color: #393836; } riot-calendar .pure-u-1-8,[riot-tag="riot-calendar"] .pure-u-1-8,[data-is="riot-calendar"] .pure-u-1-8{ position: relative; } riot-calendar .choice,[riot-tag="riot-calendar"] .choice,[data-is="riot-calendar"] .choice,riot-calendar .riot-calendar-scaleOut,[riot-tag="riot-calendar"] .riot-calendar-scaleOut,[data-is="riot-calendar"] .riot-calendar-scaleOut{ width: 32px; height: 32px; position: absolute; z-index: 2; left: 50%; margin-left: -16px; -ms-box-sizing: border-box; box-sizing: border-box; line-height: 2rem; display: inline-block; } riot-calendar .choice:before,[riot-tag="riot-calendar"] .choice:before,[data-is="riot-calendar"] .choice:before,riot-calendar .riot-calendar-scaleOut:before,[riot-tag="riot-calendar"] .riot-calendar-scaleOut:before,[data-is="riot-calendar"] .riot-calendar-scaleOut:before{ width: 100%; height: 100%; border-radius: 50%; content: \'\'; background-color: #7f1f59; position: absolute; top: 0; left: 0; z-index: -1; -webkit-animation-duration: 0.45s; animation-duration: 0.45s; -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards; -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); will-change: transform, opacity; } riot-calendar .choice.riot-calendar-scaleIn:before,[riot-tag="riot-calendar"] .choice.riot-calendar-scaleIn:before,[data-is="riot-calendar"] .choice.riot-calendar-scaleIn:before,riot-calendar .riot-calendar-scaleOut.riot-calendar-scaleIn:before,[riot-tag="riot-calendar"] .riot-calendar-scaleOut.riot-calendar-scaleIn:before,[data-is="riot-calendar"] .riot-calendar-scaleOut.riot-calendar-scaleIn:before{ -webkit-animation-name: riot-calendar-scaleIn; animation-name: riot-calendar-scaleIn; } riot-calendar .choice.enable,[riot-tag="riot-calendar"] .choice.enable,[data-is="riot-calendar"] .choice.enable,riot-calendar .riot-calendar-scaleOut.enable,[riot-tag="riot-calendar"] .riot-calendar-scaleOut.enable,[data-is="riot-calendar"] .riot-calendar-scaleOut.enable{ color: #fff; } riot-calendar .riot-calendar-scaleOut.enable,[riot-tag="riot-calendar"] .riot-calendar-scaleOut.enable,[data-is="riot-calendar"] .riot-calendar-scaleOut.enable{ color: #393836; } riot-calendar .riot-calendar-scaleOut.disable,[riot-tag="riot-calendar"] .riot-calendar-scaleOut.disable,[data-is="riot-calendar"] .riot-calendar-scaleOut.disable{ color: #c5c5c5; } riot-calendar .riot-calendar-scaleOut:before,[riot-tag="riot-calendar"] .riot-calendar-scaleOut:before,[data-is="riot-calendar"] .riot-calendar-scaleOut:before{ -webkit-animation-name: riot-calendar-scaleOut; animation-name: riot-calendar-scaleOut; } riot-calendar .range--area,[riot-tag="riot-calendar"] .range--area,[data-is="riot-calendar"] .range--area{ background-color: #eee2e9; } riot-calendar .range--area .day.enable,[riot-tag="riot-calendar"] .range--area .day.enable,[data-is="riot-calendar"] .range--area .day.enable{ color: #fff; } riot-calendar .checkoutrange,[riot-tag="riot-calendar"] .checkoutrange,[data-is="riot-calendar"] .checkoutrange{ font-weight: bold; } riot-calendar .range--start:before,[riot-tag="riot-calendar"] .range--start:before,[data-is="riot-calendar"] .range--start:before,riot-calendar .range--end:before,[riot-tag="riot-calendar"] .range--end:before,[data-is="riot-calendar"] .range--end:before{ width: 50%; height: 100%; position: absolute; top: 0; left: 50%; background-color: #eee2e9; content: ""; } riot-calendar .range--end:before,[riot-tag="riot-calendar"] .range--end:before,[data-is="riot-calendar"] .range--end:before{ left: 0; } @-webkit-keyframes riot-calendar-fadeInFromLeft { 0% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @keyframes riot-calendar-fadeInFromLeft { 0% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @-webkit-keyframes riot-calendar-fadeOutFromLeft { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } } @keyframes riot-calendar-fadeOutFromLeft { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } } @-webkit-keyframes riot-calendar-fadeInFromRight { 0% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @keyframes riot-calendar-fadeInFromRight { 0% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @-webkit-keyframes riot-calendar-fadeOutFromRight { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 1; } } @keyframes riot-calendar-fadeOutFromRight { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 1; } } @-webkit-keyframes riot-calendar-scaleIn { 0% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } 100% { -webkit-transform: scale(1); transform: scale(1); opacith: 1; } } @keyframes riot-calendar-scaleIn { 0% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } 100% { -webkit-transform: scale(1); transform: scale(1); opacith: 1; } } @-webkit-keyframes riot-calendar-scaleOut { 0% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } } @keyframes riot-calendar-scaleOut { 0% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } }', '', function (opts) {

  var tag = this;
  var firstDay = Number(opts.firstDay) || 0;

  var datesOfMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var weekTitles = ['日', '一', '二', '三', '四', '五', '六'];
  var getFirstDateInMonth = function getFirstDateInMonth(y, m) {
    return new Date(y, m - 1, 1);
  };

  var isLeapYear = function isLeapYear(y) {
    return !(y % 4) && y % 100 || !(y % 400);
  };
  var getDatesInPrevMonth = function getDatesInPrevMonth(y, m) {
    var firstDayInMonth = getFirstDateInMonth(y, m).getDay();
    var dates = 0;
    if (~firstDayInMonth) {
      if (firstDayInMonth > firstDay) {
        dates = firstDayInMonth - firstDay;
      } else if (firstDayInMonth === firstDay) {
        dates = 0;
      } else {
        dates = 6 - firstDay + 1 + firstDayInMonth;
      }
    }
    return dates;
  };
  var getDatesInNextMonth = function getDatesInNextMonth(y, m) {
    return (opts.weekMode ? 6 : getWeeksInMonth(y, m)) * 7 - getDatesInPrevMonth(y, m) - getDatesInMonth(y, m);
  };
  var getDatesInMonth = function getDatesInMonth(y, m) {
    --m;
    return m === 1 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m];
  };
  var getWeeksInMonth = function getWeeksInMonth(y, m) {
    var datesInMonth = getDatesInMonth(y, m) - 7 + getDatesInPrevMonth(y, m);
    return Math.ceil(datesInMonth / 7) + 1 || 0;
  };
  var getDatesInYear = function getDatesInYear(y, m, d) {
    var _d = 0;
    var i = 1;
    while (i < m) {
      _d = _d + (i === 2 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m - 1]);
      i++;
    }
    _d += d;
    return _d;
  };

  var getWeeksInYear = function getWeeksInYear(y, m, d) {
    var _d = getDatesInYear(y, m, d);
    return Math.round(_d, 7);
  };

  var getWeekTitles = function getWeekTitles() {
    tag.weekTitles = weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay));
  };
  var str2 = function str2(d) {
    return (d > 9 ? '' : '0') + d;
  };

  var formatDate = function formatDate(y, m, d) {
    if (opts.dateTimeFormat) {
      return opts.dateTimeFormat(y, m, d);
    }
    return y + '-' + str2(m) + (d ? '-' + str2(d) : '');
  };
  var formatDate2 = function formatDate2(d) {
    if (typeof d === 'string') {
      return d;
    } else if (d) {
      return formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
    }
    return '';
  };

  var formatDate3 = function formatDate3(y, m, d) {
    if (arguments.length < 3) {
      return '' + ((typeof y === 'undefined' ? 'undefined' : _typeof(y)) === 'object' ? y.getFullYear() + str2(y.getMonth() + 1) + str2(y.getDate()) : '');
    }
    return '' + y + str2(m) + str2(d);
  };

  var getCalendarViewDate = function getCalendarViewDate(y, m) {
    var weekNum = opts.weekMode ? 6 : getWeeksInMonth(y, m);
    var datesInPrevMonth = getDatesInPrevMonth(y, m);
    var datesInNextMonth = getDatesInNextMonth(y, m);
    var d = getDatesInMonth(y, m);
    var i = 0;
    var weekDates = [];
    var viewDates = {};
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
      var wd = [];
      while (j < 7) {
        var _y = void 0,
            _m = void 0,
            _d = void 0,
            _c = 0;
        if (datesInPrevMonth) {
          _y = y1;
          _m = m1;
          _d = d1 - datesInPrevMonth + 1;
          _c = -1;
          --datesInPrevMonth;
        } else if (c2 < d) {
          _y = y;
          _m = m;
          _d = ++c2;
        } else if (c3 < datesInNextMonth) {
          _y = y3;
          _m = m3;
          _d = ++c3;
          _c = 1;
        }
        var _date = new Date(_y, _m - 1, _d);

        _date._str = formatDate3(_y, _m, _d);

        var r = {
          current: _c,
          date: _date,
          y: _y,
          m: _m,
          d: _d,
          w: _date.getDay(),
          dateformat: formatDate(_y, _m, _d),
          disable: 0
        };

        if (opts.isRange) {
          if (rs) {
            if (rs === r.date._str) {
              r.range = -1;
              r.select = 1;
            } else if (re) {
              if (r.date._str === re) {
                r.range = 1;
                r.select = 1;
              } else if (r.date._str > rs && r.date._str < re) {
                r.range = 0;
              }
            }
          }
        } else if (selectDateStr.indexOf(r.dateformat) > -1) {
          r.select = 1;
        }
        if (r.current) {
          r.disable = 1;
        } else if (opts.isRange) {
          if (rls && rls > r.date._str || rle && rle < r.date._str) {
            r.disable = 2;
          }
        } else if (mis && mis > r.date._str || mas && mas < r.date._str) {
          r.disable = 3;
        }
        opts.disabledDate && opts.disabledDate(r);
        j++;
        wd.push(r);
        viewDates[r.dateformat] = r;
      }
      weekDates.push(wd);
      i++;
    }
    return {
      weekDates: weekDates,
      viewDates: viewDates
    };
  };

  var changeView = function changeView(direction) {
    switchDirection = direction;
    lastY = curY;
    lastM = curM;
    curM += direction;

    if (curM < 1) {
      curY--;
      curM = 12;
    }
    if (curM > 12) {
      curM = 1;
      curY++;
    }
  };

  tag.prevMonth = function (e) {
    if (tag.prevMonthDisable) {
      e ? e.preventUpdate = true : '';
      return;
    }
    changeView(-1);
    if (!e) {
      tag.update();
    }
  };
  tag.nextMonth = function (e) {
    if (tag.nextMonthDisable) {
      e ? e.preventUpdate = true : '';
      return;
    }
    changeView(1);
    if (!e) {
      tag.update();
    }
  };

  tag.getSelectDates = function () {
    if (!selectDates) {
      selectDates = (opts.selectDates || []).concat();
    }
    selectDateStr = [];
    selectDates = selectDates.filter(function (d) {
      var s = formatDate3(d);
      if (opts.isRange && (rls && rls > s || rle && rle < s)) {
        return false;
      } else if (mis && mis > s || mas && mas < s) {
        return false;
      }
      return true;
    });

    selectDates.sort(function (a, b) {
      return a - b;
    });
    selectDates.forEach(function (d) {
      selectDateStr.push(formatDate2(d));
    });

    if (opts.isRange) {
      selectDates = selectDates.slice(0, 2);
      selectDateStr = selectDateStr.slice(0, 2);
    } else if (!opts.isMultiple) {
      selectDates = selectDates.slice(0, 1);
      selectDateStr = selectDateStr.slice(0, 1);
    }
    return {
      dateStr: selectDateStr,
      dates: selectDates
    };
  };

  tag.parseDateBoxClass = function (date) {
    if (!date) {
      return '';
    }
    var classNames = [];
    if (tag.opts.isRange && rs && re) {
      if (date.range === -1) {
        classNames.push('range--start');
      }
      if (date.range === 1) {
        classNames.push('range--end');
      }
      if (date.range === 0) {
        classNames.push('range--area');
      }
    }
    return classNames.join(' ');
  };

  tag.parseDateClass = function (date) {
    if (!date) {
      return '';
    }
    var classNames = [];

    classNames.push(date.disable === 0 ? 'enable' : 'disable');
    date.select === 1 && classNames.push('choice');

    if (curChangeDateStr) {

      if (curChangeDateStr === date.dateformat) {
        classNames.push(date.select === 1 ? 'riot-calendar-scaleIn' : 'riot-calendar-scaleOut');
      } else if (lastSelectDateStr.indexOf(date.dateformat) > -1) {
        if (opts.isRange) {
          if (selectDateStr.length === 1) {
            if (lastSelectDateStr.length === 1 || lastSelectDateStr.length === 2 && (selectDateStr[0] !== lastSelectDateStr[0] || selectDateStr[0] !== lastSelectDateStr[1])) {
              classNames.push('riot-calendar-scaleOut');
            }
          }
        } else if (!opts.isMultiple) {
          classNames.push('riot-calendar-scaleOut');
        }
      }
    }
    return classNames.join(' ');
  };

  var rs = void 0,
      re = void 0,
      rls = void 0,
      rle = void 0,
      selectDates = void 0,
      selectDateStr = void 0,
      mis = void 0,
      mas = void 0;

  var defaultDate = void 0;

  var curY = void 0;
  var curM = void 0;
  var lastY = void 0;
  var lastM = void 0;
  var switchDirection = void 0;
  var rangeLimit = opts.rangeLimit || [];
  var switchWithAnimation = opts.switchWithAnimation === undefined && true || opts.switchWithAnimation;

  var curChangeDateStr = undefined;
  var lastSelectDateStr = [];
  var init = function init() {
    rls = formatDate3(rangeLimit[0]);
    rle = formatDate3(rangeLimit[1]);
    mis = formatDate3(opts.minDate);
    mas = formatDate3(opts.maxDate);
    if (opts.isRange) {
      mis && rls && rls < mis ? rls = mis : '';
      mas && rle && rle > mas ? rle = mas : '';
    }
    getWeekTitles();

    tag.getSelectDates();
    if (selectDates[0] && !opts.isMultiple) {
      rs = formatDate3(selectDates[0].getFullYear(), selectDates[0].getMonth() + 1, selectDates[0].getDate());
    }
    if (selectDates[1] && opts.isRange) {
      re = formatDate3(selectDates[1].getFullYear(), selectDates[1].getMonth() + 1, selectDates[1].getDate());
    }
    defaultDate = opts.defaultDate || selectDates[0] || new Date();
    curY = defaultDate.getFullYear();
    curM = defaultDate.getMonth() + 1;
  };

  init();

  tag.on('update', function () {
    if (switchWithAnimation && switchDirection) {
      tag.otherData = {
        title: lastY + '年' + lastM + '月',
        weekdates: tag.curData.weekdates
      };
    }
    var _d = getCalendarViewDate(curY, curM);

    if (opts.onChange && curChangeDateStr) {
      opts.onChange(_d.viewDates[curChangeDateStr], tag);
    }
    tag.curData = {
      title: curY + '年' + curM + '月',
      weekdates: _d.weekDates,
      viewdates: _d.viewDates
    };

    if (opts.switchViewOverLimit) {
      var firstDateStr = formatDate3(curY, curM, 1);
      var lastDateStr = formatDate3(curY, curM, getDatesInMonth(curY, curM));
      if (opts.isRange && firstDateStr <= rls || firstDateStr <= mis) {
        tag.prevMonthDisable = true;
      } else {
        tag.prevMonthDisable = false;
      }
      if (opts.isRange && lastDateStr >= rle || mas && lastDateStr >= mas) {
        tag.nextMonthDisable = true;
      } else {
        tag.nextMonthDisable = false;
      }
    }
  });
  var timer = null;

  tag.on('updated', function () {
    lastSelectDateStr = selectDateStr.concat();
    if (switchWithAnimation && switchDirection) {
      (function () {
        var $cur = tag.root.querySelector('.riot-calendar__body--cur');
        var $curT = tag.root.querySelector('.title__cur');
        var $other = tag.root.querySelector('.riot-calendar__body--other');
        var $otherT = tag.root.querySelector('.title__other');
        if (opts.animationTimingFunction) {
          $cur.style.webkitAnimationTimingFunction = opts.animationTimingFunction;
          $other.style.webkitAnimationTimingFunction = opts.animationTimingFunction;
          $cur.style.animationTimingFunction = opts.animationTimingFunction;
          $other.style.animationTimingFunction = opts.animationTimingFunction;
          $curT.style.webkitAnimationTimingFunction = opts.animationTimingFunction;
          $otherT.style.webkitAnimationTimingFunction = opts.animationTimingFunction;
          $curT.style.animationTimingFunction = opts.animationTimingFunction;
          $otherT.style.animationTimingFunction = opts.animationTimingFunction;
        }
        var duration = parseFloat(opts.animationDuration) || 0.45;
        var c1 = void 0;
        var c2 = void 0;
        if (duration !== 0.45) {
          var _duration = '' + duration + 's';
          $cur.style.webkitAnimationDuration = _duration;
          $other.style.webkitAnimationDuration = _duration;
          $cur.style.animationDuration = _duration;
          $other.style.animationDuration = _duration;
          $curT.style.webkitAnimationDuration = _duration;
          $otherT.style.webkitAnimationDuration = _duration;
          $curT.style.animationDuration = _duration;
          $otherT.style.animationDuration = _duration;
        }
        if (switchDirection === 1) {
          c1 = 'calendar-fadeInRight';
          c2 = 'calendar-fadeOutRight';
        } else {
          c1 = 'calendar-fadeInLeft';
          c2 = 'calendar-fadeOutLeft';
        }
        $cur.classList.add('animation');
        $cur.classList.add(c1);
        $other.classList.add('animation');
        $other.classList.add(c2);
        $curT.classList.add('animation');
        $curT.classList.add(c1);
        $otherT.classList.add('animation');
        $otherT.classList.add(c2);
        clearTimeout(timer);
        timer = setTimeout(function () {
          tag.otherData = null;
          $other.classList.remove('animation');
          $other.classList.remove(c2);
          $cur.classList.remove('animation');
          $cur.classList.remove(c1);
          $otherT.classList.remove('animation');
          $otherT.classList.remove(c2);
          $curT.classList.remove('animation');
          $curT.classList.remove(c1);
          clearTimeout(timer);
          switchDirection = undefined;
        }, duration * 1000);
      })();
    }

    if (opts.onChange && curChangeDateStr) {
      curChangeDateStr = undefined;
    }
  });

  tag.checkDate = function (e) {
    var date = e.item.date;
    if (date.disable !== 0) {
      if (opts.switchViewByOtherMonth) {
        if (date.current === -1 && !tag.prevMonthDisable || date.current === 1 && !tag.nextMonthDisable) {
          changeView(date.current);
        }
      } else {
        e.preventUpdate = true;
        return;
      }
    }
    if (opts.isRange) {
      if (rs && !re && rs === date.date._str) {
        selectDates = [];
        selectDateStr = [];
        rs = undefined;
        re = undefined;
      } else if (!rs || rs && rs > date.date._str || re) {
        selectDates = [date.date];
        selectDateStr = [date.dateformat];
        rs = date.date._str;
        re = undefined;
      } else {
        selectDates.push(date.date);
        selectDateStr.push(date.dateformat);
        re = date.date._str;
      }
    } else {
      if (date.select) {
        var i = selectDateStr.indexOf(date.dateformat);
        selectDateStr.splice(i, 1);
        selectDates.splice(i, 1);
      } else {
        if (!opts.isMultiple) {
          selectDateStr = [date.dateformat];
          selectDates = [date.date];
        } else {
          selectDateStr.push(date.dateformat);
          selectDates.push(date.date);
        }
      }
    }
    curChangeDateStr = date.dateformat;
  };
});

//https://github.com/react-component/util/blob/master/src/Dom/addEventListener.js
function addEventListener(target, eventType, callback) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, false);
    return {
      remove: function remove() {
        target.removeEventListener(eventType, callback, false);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, callback);
    return {
      remove: function remove() {
        target.detachEvent('on' + eventType, callback);
      }
    };
  }
};

riot.tag2('riot-slider', '<div class="riot-slider {opts.disabled && \'riot-slider--disable\'} {!included && \'riot-slider--independent\'}" onmousedown="{opts.disabled ? noop : onMouseDown}" ontouchstart="{opts.disabled ? noop : onTouchStart}"> <div class="riot-slider__track"></div> <div class="riot-slider__track--select" if="{included}" riot-style="left:{selectTrack.left + \'%\'};width:{selectTrack.width + \'%\'}"></div> <div class="riot-slider__handler riot-slider__handler--1" riot-style="left:{(opts.range ?selectTrack.left : selectTrack.width) + \'%\'}" data-key="{selectTrack.left}"></div> <div class="riot-slider__handler riot-slider__handler--2" if="{opts.range}" riot-style="left: {(selectTrack.left + selectTrack.width) + \'%\'}" data-key="{selectTrack.left + selectTrack.width}"></div> <div class="riot-slider__marks" if="{opts.marks || opts.showAllDots}"> <div each="{mark,index in marks}" class="riot-slider__marks--items {parseMarkItemClass(mark)}"> <span class="riot-slider__marks--items-dot" data-key="{index}" riot-style="left:{mark.precent + \'%\'}" if="{mark.dot}"></span> <span class="riot-slider__marks--items-tip" data-key="{index}" riot-style="width:{mark.width + \'%\'};margin-left:{(-0.5 * mark.width) + \'%\'};left:{mark.precent + \'%\'}" if="{mark.tip}">{mark.label}</span> </div> </div> </div>', 'riot-slider .riot-slider,[riot-tag="riot-slider"] .riot-slider,[data-is="riot-slider"] .riot-slider{ position: relative; } riot-slider .riot-slider__track--select,[riot-tag="riot-slider"] .riot-slider__track--select,[data-is="riot-slider"] .riot-slider__track--select,riot-slider .riot-slider__handler,[riot-tag="riot-slider"] .riot-slider__handler,[data-is="riot-slider"] .riot-slider__handler,riot-slider .riot-slider__marks,[riot-tag="riot-slider"] .riot-slider__marks,[data-is="riot-slider"] .riot-slider__marks,riot-slider .riot-slider__marks--items-dot,[riot-tag="riot-slider"] .riot-slider__marks--items-dot,[data-is="riot-slider"] .riot-slider__marks--items-dot,riot-slider .riot-slider__marks--items-tip,[riot-tag="riot-slider"] .riot-slider__marks--items-tip,[data-is="riot-slider"] .riot-slider__marks--items-tip{ position: absolute; } riot-slider .riot-slider__marks--items-tip,[riot-tag="riot-slider"] .riot-slider__marks--items-tip,[data-is="riot-slider"] .riot-slider__marks--items-tip{ text-align: center; } riot-slider .riot-slider__handler,[riot-tag="riot-slider"] .riot-slider__handler,[data-is="riot-slider"] .riot-slider__handler,riot-slider .riot-slider__marks--items-dot,[riot-tag="riot-slider"] .riot-slider__marks--items-dot,[data-is="riot-slider"] .riot-slider__marks--items-dot,riot-slider .riot-slider__marks--items-tip,[riot-tag="riot-slider"] .riot-slider__marks--items-tip,[data-is="riot-slider"] .riot-slider__marks--items-tip{ cursor: pointer; } riot-slider .riot-slider,[riot-tag="riot-slider"] .riot-slider,[data-is="riot-slider"] .riot-slider{ width: 100%; height: 0.3125rem; padding: 0.3125rem 0; } riot-slider .riot-slider__track,[riot-tag="riot-slider"] .riot-slider__track,[data-is="riot-slider"] .riot-slider__track{ height: 100%; border-radius: 0.15625rem; background-color: #eeeaea; z-index: 2; } riot-slider .riot-slider__track--select,[riot-tag="riot-slider"] .riot-slider__track--select,[data-is="riot-slider"] .riot-slider__track--select{ z-index: 3; background-color: #7f1f59; top: 0.3125rem; bottom: 0.3125rem; border-radius: 0.15625rem; } riot-slider .riot-slider__handler,[riot-tag="riot-slider"] .riot-slider__handler,[data-is="riot-slider"] .riot-slider__handler{ width: 0.75rem; height: 0.75rem; border-radius: 50%; background-color: #fff; box-shadow: 0 0 0.15625rem 1px rgba(195, 195, 195, 0.25); top: 0.0625rem; z-index: 10; margin-left: -0.375rem; } riot-slider .riot-slider__marks,[riot-tag="riot-slider"] .riot-slider__marks,[data-is="riot-slider"] .riot-slider__marks{ background-color: transparent; z-index: 4; top: 0.3125rem; bottom: 0.3125rem; width: 100%; } riot-slider .riot-slider__marks--items-dot,[riot-tag="riot-slider"] .riot-slider__marks--items-dot,[data-is="riot-slider"] .riot-slider__marks--items-dot{ width: 0.5625rem; height: 0.5625rem; border-radius: 50%; background: #fff; border: solid 1px #eeeaea; top: -0.25rem; margin-left: -0.28125rem; } riot-slider .riot-slider__marks--items-tip,[riot-tag="riot-slider"] .riot-slider__marks--items-tip,[data-is="riot-slider"] .riot-slider__marks--items-tip{ font-size: 0.75rem; line-height: 1; top: 0.625rem; color: #bfbfbf; } riot-slider .riot-slider__marks--items-select .riot-slider__marks--items-dot,[riot-tag="riot-slider"] .riot-slider__marks--items-select .riot-slider__marks--items-dot,[data-is="riot-slider"] .riot-slider__marks--items-select .riot-slider__marks--items-dot{ border-color: #7f1f59; } riot-slider .riot-slider__marks--items-select .riot-slider__marks--items-tip,[riot-tag="riot-slider"] .riot-slider__marks--items-select .riot-slider__marks--items-tip,[data-is="riot-slider"] .riot-slider__marks--items-select .riot-slider__marks--items-tip{ color: #651c4d; } riot-slider .riot-slider--independent .riot-slider__handler,[riot-tag="riot-slider"] .riot-slider--independent .riot-slider__handler,[data-is="riot-slider"] .riot-slider--independent .riot-slider__handler{ background-color: #7f1f59; } riot-slider .riot-slider--disable .riot-slider__track--select,[riot-tag="riot-slider"] .riot-slider--disable .riot-slider__track--select,[data-is="riot-slider"] .riot-slider--disable .riot-slider__track--select{ background-color: #d7cece; } riot-slider .riot-slider--disable .riot-slider__handler,[riot-tag="riot-slider"] .riot-slider--disable .riot-slider__handler,[data-is="riot-slider"] .riot-slider--disable .riot-slider__handler{ cursor: not-allowed; background-color: #eeeaea; } riot-slider .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-dot,[riot-tag="riot-slider"] .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-dot,[data-is="riot-slider"] .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-dot{ border: solid 1px #eeeaea; } riot-slider .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-tip,[riot-tag="riot-slider"] .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-tip,[data-is="riot-slider"] .riot-slider--disable .riot-slider__marks--items-select .riot-slider__marks--items-tip{ color: #bfbfbf; }', '', function (opts) {
  "use strict";

  var tag = this;
  var state = {};

  var sliderRootEle = null;

  var isVertical = opts.vertical || false;

  var allowCross = opts.allowCross === undefined ? true : opts.allowCross;

  var rangeValueShouldEqual = opts.rangeValueShouldEqual === undefined ? true : opts.rangeValueShouldEqual;
  tag.included = opts.included === undefined ? true : opts.included;
  var isNotTouchEvent = function isNotTouchEvent(e) {
    return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
  };

  var floatReg = /\./;
  var parseNumber = function parseNumber(num) {
    var dot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var result = num;
    if (floatReg.test(num)) {
      result = num.toFixed(dot);
    }
    return +result;
  };
  var getMarkWidth = function getMarkWidth(len) {

    return parseNumber(100 / (len - 1) * 0.9);
  };

  var getEnablePoint = function getEnablePoint(min, max, step, marks) {
    var points = [];
    var markPoints = void 0;
    var length = max - min;
    var w = void 0;
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
          var _point2 = {
            key: _key,
            mark: true,
            label: markIsString ? mark : mark.label || '',
            width: markIsString ? w : parseNumber(mark.width || w)
          };
          if (markIsString) {
            _point2.dot = opts.showMarkDots !== undefined ? opts.showMarkDots : true;
            _point2.tip = opts.showMarkTips !== undefined ? opts.showMarkTips : true;
          } else {
            _point2.dot = mark.dot !== undefined ? mark.dot : opts.showMarkDots !== undefined ? opts.showMarkDots : true;
            _point2.tip = mark.tip !== undefined ? mark.tip : opts.showMarkTips !== undefined ? opts.showMarkTips : true;
          }
          _point2.precent = parseNumber((_point2.key - min) / length * 100);
          points.push(_point2);
          _markPoints.push(_point2);
        } else {
          console.warn('riot-slider实例类名为%s中有key为%s的mark由于不在opts.min和opts.max之间被移除', opts.class, key);
        }
      }

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

  var getMousePosition = function getMousePosition(e) {
    return isVertical ? e.clientY : e.pageX;
  };
  var getTouchPosition = function getTouchPosition(e) {
    return isVertical ? e.touches[0].clientY : e.touches[0].pageX;
  };
  var getHandleRect = function getHandleRect() {
    var handle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : sliderRootEle;

    var coords = handle.getBoundingClientRect();
    return coords;
  };

  var getClosetPointByPosition = function getClosetPointByPosition(position) {
    var range = opts.range;
    var step = opts.step;
    var dots = opts.dots;


    var precent = parseNumber(getPrecentByPosition(position) * 100);
    var _value = precent / 100 * (state.max - state.min) + state.min;
    if (state.source) {
      _value = getClosetValueByDichotomy(state.source, _value);
    }
    return {
      precent: precent,
      point: _value
    };
  };

  var getPrecentByPosition = function getPrecentByPosition(pos) {
    var coords = getHandleRect();
    var v = void 0;
    if (isVertical) {
      v = (pos - coords.top) / coords.height;
    } else {
      v = (pos - coords.left) / coords.width;
    }
    return v;
  };
  var setRangeValue = function setRangeValue(val) {
    if (!rangeValueShouldEqual && val === state.rangeStableValue) {
      return false;
    }
    state.value = [val, state.rangeStableValue].sort(function (a, b) {
      return a - b;
    });
    if (!allowCross && (state.rangeChangeHandle === 0 && val > state.rangeStableValue || state.rangeChangeHandle === 1 && val < state.rangeStableValue)) {
      return false;
    }
    return true;
  };

  var getHandleIndex = function getHandleIndex(precent) {
    var index = void 0;
    var d1 = precent - tag.selectTrack.left;
    var d2 = tag.selectTrack.left + tag.selectTrack.width - precent;
    if (d1 <= 0) {
      index = 0;
    } else if (d2 <= 0) {
      index = 1;
    } else {
      index = d1 > d2 ? 1 : 0;
    }
    return index;
  };

  var getClosetValueByDichotomy = function getClosetValueByDichotomy(source, val) {
    var len = source.length;
    if (val <= source[0].key) {
      return source[0];
    }
    if (val >= source[len - 1].key) {
      return source[len - 1];
    }
    var _source = source.slice(0);
    var _len = void 0;
    var i = 0;
    while ((_len = _source.length) > 0) {
      var _l = void 0;
      ++i;
      if (_len === 1) {
        return _source[0];
      } else {
        _l = Math.floor(_len / 2);
      }
      var d1 = val - _source[_l - 1].key;
      var d2 = _source[_l].key - val;
      if (d1 < 0) {

        _source = _source.slice(0, _l);
      } else if (d2 < 0) {

        _source = _source.slice(_l);
      } else {
        return d1 > d2 ? _source[_l] : _source[_l - 1];
      }
      if (i > len) {
        console.warn('由于算法原因，已进入死循环');
        return;
      }
    }
  };
  var getValue = function getValue() {
    return opts.range ? state.value.concat() : state.value.slice(1, 2);
  };

  var updateStateValue = function updateStateValue(point) {
    state.changePointKey = point.key;
    if (opts.range) {
      var result = setRangeValue(point.key);
      if (!result) {
        return;
      }
    } else {
      state.value = [state.min, point.key];
    }
    tag.update();
    if (opts.onChange) {
      opts.onChange(getValue());
    }
  };
  var onMouseMove = function onMouseMove(e) {
    var position = getMousePosition(e);
    onMove(position);
  };
  var onTouchMove = function onTouchMove(e) {
    if (isNotTouchEvent(e)) {
      end('touch');
      e.preventUpdate = true;
      return;
    }
    var position = getTouchPosition(e);
    onMove(position);
  };
  var onMove = function onMove(position) {

    var closetPoint = getClosetPointByPosition(position);
    var point = closetPoint.point;
    if (state.changePointKey !== point.key) {
      updateStateValue(point);
    }
  };
  var end = function end(type) {

    state.handle = undefined;
    state.oldVal = null;
    opts.onAfterChange && opts.onAfterChange(getValue());
    removeEvents(type);
  };
  var onStart = function onStart(position) {
    var closetPoint = getClosetPointByPosition(position);
    state.changePointKey = closetPoint.point.key;
    if (opts.range) {
      state.rangeChangeHandle = getHandleIndex(closetPoint.precent);
      state.rangeStableValue = state.value[state.rangeChangeHandle === 0 ? 1 : 0];
    }
    opts.onBeforeChange && opts.onBeforeChange(getValue());

    if (state.value.indexOf(state.changePointKey) === -1) {
      updateStateValue(closetPoint.point);
    }
  };
  var pauseEvent = function pauseEvent(e) {
    e.stopPropagation();
    e.preventDefault();
  };
  var addDocumentEvents = function addDocumentEvents(type) {
    if (type === 'touch') {

      tag.onTouchMoveListener = addEventListener(document, 'touchmove', onTouchMove.bind(tag));
      tag.onTouchUpListener = addEventListener(document, 'touchend', end.bind(tag, 'touch'));
    } else if (type === 'mouse') {
      tag.onMouseMoveListener = addEventListener(document, 'mousemove', onMouseMove.bind(tag));
      tag.onMouseUpListener = addEventListener(document, 'mouseup', end.bind(tag, 'mouse'));
    }
  };
  var removeEvents = function removeEvents(type) {
    if (type === 'touch') {
      tag.onTouchMoveListener.remove();
      tag.onTouchUpListener.remove();
    } else if (type === 'mouse') {
      tag.onMouseMoveListener.remove();
      tag.onMouseUpListener.remove();
    }
  };

  var init = function init() {
    var marks = opts.marks;
    var value = opts.value;
    var range = opts.range;
    var _opts$min = opts.min;
    var min = _opts$min === undefined ? 0 : _opts$min;
    var _opts$max = opts.max;
    var max = _opts$max === undefined ? 100 : _opts$max;
    var _opts$step = opts.step;
    var step = _opts$step === undefined ? 1 : _opts$step;
    var dots = opts.dots;

    min = Math.max(0, min);

    var _value = [min, min];
    if (value !== undefined && Object.prototype.toString.call(value) !== '[object Array]') {
      console.warn('riot-slider实例类名为%s的opts.value不为数组，将强制转为数组', opts.class || 'riot-slider');
      _value = [Number(value) || min];
    } else if (value && value.length) {
      (function () {
        var _v = [];

        value.forEach(function (v) {
          if (v >= min && v <= max) {
            _v.push(+v);
          } else {
            console.warn('riot-slider实例类名为%s的opts.value由于不在opts.min与opts.max之间被移动', opts.class || 'riot-slider', v);
          }
        });
        _value = _v.sort();
      })();
    }
    var _valen = _value.length;
    if (_valen > 2) {
      _value = _value.slice(0, 2);
    } else if (_valen < 2) {
      _value.unshift(min);
    }

    state.value = _value;
    state.min = min;
    state.max = max;
    var data = getEnablePoint(min, max, step, marks);
    if (range && !step || dots) {
      state.source = data.marks;
    } else {
      state.source = data.points;
    }
    tag.marks = data.marks;
  };
  init();
  tag.noop = function (e) {
    e.preventUpdate = true;
    return;
  };

  tag.parseMarkItemClass = function (mark, type) {
    if (mark) {

      if (included && mark.precent > tag.selectTrack.left && mark.precent < tag.selectTrack.left + tag.selectTrack.width) {
        return 'riot-slider__marks--items-select';
      }
    }
  };

  tag.onMouseDown = function (e) {
    var range = opts.range;
    var step = opts.step;

    if (e.button !== 0) {
      e.preventUpdate = true;
      return;
    }
    var position = getMousePosition(e);
    onStart(position);
    pauseEvent(e);
    addDocumentEvents('mouse');
  };
  tag.onTouchStart = function (e) {
    if (isNotTouchEvent(e)) {
      e.preventUpdate = true;
      return;
    }
    var position = getTouchPosition(e);
    onStart(position);
    pauseEvent(e);
    addDocumentEvents('touch');
  };

  tag.on('update', function () {
    tag.selectTrack = {
      left: parseNumber((state.value[0] - state.min) / (state.max - state.min) * 100),
      width: parseNumber((state.value[1] - state.value[0]) / (state.max - state.min) * 100)
    };
  });
  tag.on('mount', function () {
    sliderRootEle = tag.root.querySelector('.riot-slider');
  });
});