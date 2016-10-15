define(['riot'], function (riot) { 'use strict';

riot = 'default' in riot ? riot['default'] : riot;

riot.tag2('riot-popver', '<yield></yield>', 'riot-popver,[riot-tag="riot-popver"],[data-is="riot-popver"]{ background-color: #fff; border-radius: 0 0 7px 7px; }', '', function (opts) {
  const tag = this;
});

riot.tag2('riot-calendar', '<div class="calendar"> <div class="calendar__head"> <div class="pure-g control"> <a class="pure-u-1-5 prev {prevMonthDisable && \'disable\'}" href="javascript:;" onclick="{prevMonth}"><i></i></a> <div class="pure-u-3-5 title"> <div if="{otherData}" class="title__other">{otherData.title}</div> <div class="title__cur">{curData.title}</div> </div> <a class="pure-u-1-5 next {nextMonthDisable && \'disable\'}" href="javascript:;" onclick="{nextMonth}"><i></i></a> </div> <div class="pure-g weeks"> <div class="pure-u-1-8" each="{week in weekTitles}">{week}</div> </div> </div> <div class="calendar__body"> <div if="{otherData}" class="calendar__body--other"> <div class="pure-g" each="{weekdates in otherData.weekdates}"> <div class="pure-u-1-8 {parseDateClass(date)}" each="{date in weekdates}"> <div class="day {date.valid === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\'}" onclick="{checkDate}">{date.d}</div> </div> </div> </div> <div class="calendar__body--cur"> <div class="pure-g" each="{weekdates in curData.weekdates}"> <div class="pure-u-1-8 {parseDateClass(date)}" each="{date in weekdates}"> <div class="day {date.valid === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\'} {!date.range && date.select === 1 && \'riot-calendar-scaleIn\'}" onclick="{checkDate}">{date.d}<i if="{date.select===1}"></i></div> </div> </div> </div> </div> <div class="calendar__foot"></div> </div>', 'riot-calendar,[riot-tag="riot-calendar"],[data-is="riot-calendar"]{ display: block; } riot-calendar .pure-u-1-8,[riot-tag="riot-calendar"] .pure-u-1-8,[data-is="riot-calendar"] .pure-u-1-8{ width: 14.285%; text-align: center; } riot-calendar .weeks,[riot-tag="riot-calendar"] .weeks,[data-is="riot-calendar"] .weeks{ font-size: 0.8125rem; color: #333333; line-height: 2.1875rem; position: relative; } riot-calendar .weeks:after,[riot-tag="riot-calendar"] .weeks:after,[data-is="riot-calendar"] .weeks:after{ position: absolute; content: \'\'; width: 90.625%; height: 1px; background-color: #efebea; opacity: 0.97; left: 4.6875%; bottom: 0; z-index: 2; } riot-calendar .control,[riot-tag="riot-calendar"] .control,[data-is="riot-calendar"] .control{ text-align: center; margin-bottom: 0.5rem; } riot-calendar .control .title,[riot-tag="riot-calendar"] .control .title,[data-is="riot-calendar"] .control .title{ color: #333333; font-size: 0.8125rem; line-height: 2; position: relative; height: 1.625rem; overflow: hidden; } riot-calendar .control .prev,[riot-tag="riot-calendar"] .control .prev,[data-is="riot-calendar"] .control .prev,riot-calendar .control .next,[riot-tag="riot-calendar"] .control .next,[data-is="riot-calendar"] .control .next{ position: relative; } riot-calendar .control .prev i,[riot-tag="riot-calendar"] .control .prev i,[data-is="riot-calendar"] .control .prev i,riot-calendar .control .next i,[riot-tag="riot-calendar"] .control .next i,[data-is="riot-calendar"] .control .next i{ position: absolute; width: 0.5rem; height: 0.5rem; top: 50%; left: 50%; margin-top: -0.25rem; margin-left: -0.25rem; border-top: none; border-right: none; border-left: 2px solid #7f1f59; border-bottom: 2px solid #7f1f59; } riot-calendar .control .prev.disable i,[riot-tag="riot-calendar"] .control .prev.disable i,[data-is="riot-calendar"] .control .prev.disable i,riot-calendar .control .next.disable i,[riot-tag="riot-calendar"] .control .next.disable i,[data-is="riot-calendar"] .control .next.disable i{ border-left-color: #b8b8b8; border-bottom-color: #b8b8b8; } riot-calendar .control .prev i,[riot-tag="riot-calendar"] .control .prev i,[data-is="riot-calendar"] .control .prev i{ -webkit-transform: rotate(45deg); transform: rotate(45deg); } riot-calendar .control .next i,[riot-tag="riot-calendar"] .control .next i,[data-is="riot-calendar"] .control .next i{ -webkit-transform: rotate(-135deg); transform: rotate(-135deg); } riot-calendar .calendar__body,[riot-tag="riot-calendar"] .calendar__body,[data-is="riot-calendar"] .calendar__body{ padding: 0.40625rem 0; position: relative; min-height: 15rem; overflow: hidden; } riot-calendar .calendar__body .pure-g,[riot-tag="riot-calendar"] .calendar__body .pure-g,[data-is="riot-calendar"] .calendar__body .pure-g{ margin-top: 0.5rem; } riot-calendar .calendar__body--cur,[riot-tag="riot-calendar"] .calendar__body--cur,[data-is="riot-calendar"] .calendar__body--cur,riot-calendar .calendar__body--other,[riot-tag="riot-calendar"] .calendar__body--other,[data-is="riot-calendar"] .calendar__body--other,riot-calendar .title__cur,[riot-tag="riot-calendar"] .title__cur,[data-is="riot-calendar"] .title__cur,riot-calendar .title__other,[riot-tag="riot-calendar"] .title__other,[data-is="riot-calendar"] .title__other{ will-change: transform, opacity; position: absolute; width: 100%; left: 0; background: #fff; -webkit-animation-play-state: paused; animation-play-state: paused; -webkit-animation-duration: 0.45s; animation-duration: 0.45s; -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards; -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); } riot-calendar .calendar__body--cur.calendar-fadeInLeft,[riot-tag="riot-calendar"] .calendar__body--cur.calendar-fadeInLeft,[data-is="riot-calendar"] .calendar__body--cur.calendar-fadeInLeft,riot-calendar .calendar__body--other.calendar-fadeInLeft,[riot-tag="riot-calendar"] .calendar__body--other.calendar-fadeInLeft,[data-is="riot-calendar"] .calendar__body--other.calendar-fadeInLeft,riot-calendar .title__cur.calendar-fadeInLeft,[riot-tag="riot-calendar"] .title__cur.calendar-fadeInLeft,[data-is="riot-calendar"] .title__cur.calendar-fadeInLeft,riot-calendar .title__other.calendar-fadeInLeft,[riot-tag="riot-calendar"] .title__other.calendar-fadeInLeft,[data-is="riot-calendar"] .title__other.calendar-fadeInLeft{ -webkit-animation-name: riot-calendar-fadeInFromLeft; animation-name: riot-calendar-fadeInFromLeft; } riot-calendar .calendar__body--cur.calendar-fadeInRight,[riot-tag="riot-calendar"] .calendar__body--cur.calendar-fadeInRight,[data-is="riot-calendar"] .calendar__body--cur.calendar-fadeInRight,riot-calendar .calendar__body--other.calendar-fadeInRight,[riot-tag="riot-calendar"] .calendar__body--other.calendar-fadeInRight,[data-is="riot-calendar"] .calendar__body--other.calendar-fadeInRight,riot-calendar .title__cur.calendar-fadeInRight,[riot-tag="riot-calendar"] .title__cur.calendar-fadeInRight,[data-is="riot-calendar"] .title__cur.calendar-fadeInRight,riot-calendar .title__other.calendar-fadeInRight,[riot-tag="riot-calendar"] .title__other.calendar-fadeInRight,[data-is="riot-calendar"] .title__other.calendar-fadeInRight{ -webkit-animation-name: riot-calendar-fadeInFromRight; animation-name: riot-calendar-fadeInFromRight; } riot-calendar .calendar__body--cur.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .calendar__body--cur.calendar-fadeOutLeft,[data-is="riot-calendar"] .calendar__body--cur.calendar-fadeOutLeft,riot-calendar .calendar__body--other.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .calendar__body--other.calendar-fadeOutLeft,[data-is="riot-calendar"] .calendar__body--other.calendar-fadeOutLeft,riot-calendar .title__cur.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .title__cur.calendar-fadeOutLeft,[data-is="riot-calendar"] .title__cur.calendar-fadeOutLeft,riot-calendar .title__other.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .title__other.calendar-fadeOutLeft,[data-is="riot-calendar"] .title__other.calendar-fadeOutLeft{ -webkit-animation-name: riot-calendar-fadeOutFromLeft; animation-name: riot-calendar-fadeOutFromLeft; } riot-calendar .calendar__body--cur.calendar-fadeOutRight,[riot-tag="riot-calendar"] .calendar__body--cur.calendar-fadeOutRight,[data-is="riot-calendar"] .calendar__body--cur.calendar-fadeOutRight,riot-calendar .calendar__body--other.calendar-fadeOutRight,[riot-tag="riot-calendar"] .calendar__body--other.calendar-fadeOutRight,[data-is="riot-calendar"] .calendar__body--other.calendar-fadeOutRight,riot-calendar .title__cur.calendar-fadeOutRight,[riot-tag="riot-calendar"] .title__cur.calendar-fadeOutRight,[data-is="riot-calendar"] .title__cur.calendar-fadeOutRight,riot-calendar .title__other.calendar-fadeOutRight,[riot-tag="riot-calendar"] .title__other.calendar-fadeOutRight,[data-is="riot-calendar"] .title__other.calendar-fadeOutRight{ -webkit-animation-name: riot-calendar-fadeOutFromRight; animation-name: riot-calendar-fadeOutFromRight; } riot-calendar .calendar__body--cur.animation,[riot-tag="riot-calendar"] .calendar__body--cur.animation,[data-is="riot-calendar"] .calendar__body--cur.animation,riot-calendar .calendar__body--other.animation,[riot-tag="riot-calendar"] .calendar__body--other.animation,[data-is="riot-calendar"] .calendar__body--other.animation,riot-calendar .title__cur.animation,[riot-tag="riot-calendar"] .title__cur.animation,[data-is="riot-calendar"] .title__cur.animation,riot-calendar .title__other.animation,[riot-tag="riot-calendar"] .title__other.animation,[data-is="riot-calendar"] .title__other.animation{ -webkit-animation-play-state: running; animation-play-state: running; } riot-calendar .calendar__body--cur,[riot-tag="riot-calendar"] .calendar__body--cur,[data-is="riot-calendar"] .calendar__body--cur,riot-calendar .calendar__body--other,[riot-tag="riot-calendar"] .calendar__body--other,[data-is="riot-calendar"] .calendar__body--other{ top: 0.25rem; height: 100%; } riot-calendar .day,[riot-tag="riot-calendar"] .day,[data-is="riot-calendar"] .day{ height: 2rem; line-height: 2rem; text-align: center; color: #c5c5c5; } riot-calendar .day i,[riot-tag="riot-calendar"] .day i,[data-is="riot-calendar"] .day i{ font-style: normal; } riot-calendar .day span,[riot-tag="riot-calendar"] .day span,[data-is="riot-calendar"] .day span{ display: none; } riot-calendar .enable,[riot-tag="riot-calendar"] .enable,[data-is="riot-calendar"] .enable{ color: #393836; } riot-calendar .pure-u-1-8,[riot-tag="riot-calendar"] .pure-u-1-8,[data-is="riot-calendar"] .pure-u-1-8{ position: relative; } riot-calendar .choice,[riot-tag="riot-calendar"] .choice,[data-is="riot-calendar"] .choice{ width: 32px; height: 32px; position: absolute; z-index: 2; left: 50%; margin-left: -16px; color: #fff; -ms-box-sizing: border-box; box-sizing: border-box; line-height: 2rem; display: inline-block; } riot-calendar .choice i,[riot-tag="riot-calendar"] .choice i,[data-is="riot-calendar"] .choice i{ width: 100%; height: 100%; border-radius: 50%; content: \'\'; background-color: #7f1f59; position: absolute; top: 0; left: 0; z-index: -1; -webkit-animation-duration: 0.45s; animation-duration: 0.45s; -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards; -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); will-change: transform, opacity; } riot-calendar .choice.riot-calendar-scaleIn i,[riot-tag="riot-calendar"] .choice.riot-calendar-scaleIn i,[data-is="riot-calendar"] .choice.riot-calendar-scaleIn i{ -webkit-animation-name: riot-calendar-scaleIn; animation-name: riot-calendar-scaleIn; } riot-calendar .choice.riot-calendar-scaleOut i,[riot-tag="riot-calendar"] .choice.riot-calendar-scaleOut i,[data-is="riot-calendar"] .choice.riot-calendar-scaleOut i{ -webkit-animation-name: riot-calendar-scaleOut; animation-name: riot-calendar-scaleOut; } riot-calendar .high,[riot-tag="riot-calendar"] .high,[data-is="riot-calendar"] .high{ background-color: #eee2e9; } riot-calendar .high .day.enable,[riot-tag="riot-calendar"] .high .day.enable,[data-is="riot-calendar"] .high .day.enable{ color: #fff; } riot-calendar .checkoutrange,[riot-tag="riot-calendar"] .checkoutrange,[data-is="riot-calendar"] .checkoutrange{ font-weight: bold; } riot-calendar .rangeStart:before,[riot-tag="riot-calendar"] .rangeStart:before,[data-is="riot-calendar"] .rangeStart:before,riot-calendar .rangeEnd:before,[riot-tag="riot-calendar"] .rangeEnd:before,[data-is="riot-calendar"] .rangeEnd:before{ width: 50%; height: 100%; position: absolute; top: 0; left: 50%; background-color: #eee2e9; content: ""; } riot-calendar .rangeEnd:before,[riot-tag="riot-calendar"] .rangeEnd:before,[data-is="riot-calendar"] .rangeEnd:before{ left: 0; } @-webkit-keyframes riot-calendar-fadeInFromLeft { 0% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @keyframes riot-calendar-fadeInFromLeft { 0% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @-webkit-keyframes riot-calendar-fadeOutFromLeft { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } } @keyframes riot-calendar-fadeOutFromLeft { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } } @-webkit-keyframes riot-calendar-fadeInFromRight { 0% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @keyframes riot-calendar-fadeInFromRight { 0% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @-webkit-keyframes riot-calendar-fadeOutFromRight { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 1; } } @keyframes riot-calendar-fadeOutFromRight { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 1; } } @-webkit-keyframes riot-calendar-scaleIn { 0% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } 100% { -webkit-transform: scale(1); transform: scale(1); opacith: 1; } } @keyframes riot-calendar-scaleIn { 0% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } 100% { -webkit-transform: scale(1); transform: scale(1); opacith: 1; } } @-webkit-keyframes riot-calendar-scaleOut { 0% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } } @keyframes riot-calendar-scaleOut { 0% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } }', '', function (opts) {
  /**
  * @argument {object} opts
  * @property {boolean} opts.autoOk  是否自动保存
  * @propperty { Date }    opts.defaultDate                       默认日期
  * @propperty { Date }   opts.minDate                           最小日期
  * @propperty { Date }   opts.maxDate                           最大日期
  * @propperty { Boolean } opts.isRange                           是否为选择范围
  * @propperty { [Date] } opts.rangeLimit                        选择的范围
  * @propperty { Boolean }opts.weekMode                           是否固定星期 true 固定 默认为false
  * @propperty { Number } opts.firstDay                           每周的第一天 默认为0
  * @propperty { Boolean } opts.isMultiple                         是否为多选
  * @propperty { [Date] } opts.selectDates                        选中的日期
  * @propperty { Boolean } opts.switchViewByOtherMonth             表示点击其它月份是否切换日历视图 默认false
  * @propperty { Boolean } opts.switchViewOverLimit                表示超出最小与最大日历是否能切换日历视图 默认false
  * @propperty { Boolean } opts.showOtherMonthDay                  是否显示其它月的日期
  * @propperty { Boolean } opts.switchWithAnimation                切换时是否需要动画
  * @propperty { String } opts.animationTimingFunction             动画函数 cubic-bezier(0.445, 0.05, 0.55, 0.95)
  * @propperty { Number } opts.animationDuration                  动画待续时间  默认为0.45s
  * @example
  * <riot-calendar></riot-calendar>
  */

  let tag = this;
  const firstDay = Number(opts.firstDay) || 0;

  //一些帮助函数
  //天数
  const datesOfMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const weekTitles = ['日', '一', '二', '三', '四', '五', '六'];
  let getFirstDateInMonth = function (y, m) {
    return new Date(y, m - 1, 1);
  };
  //是否为闰年
  const isLeapYear = function (y) {
    return !(y % 4) && y % 100 || !(y % 400);
  };
  const getDatesInPrevMonth = function (y, m) {
    let firstDayInMonth = getFirstDateInMonth(y, m).getDay();
    let dates = 0;
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
  const getDatesInNextMonth = function (y, m) {
    return (opts.weekMode ? 6 : getWeeksInMonth(y, m)) * 7 - getDatesInPrevMonth(y, m) - getDatesInMonth(y, m);
  };
  const getDatesInMonth = function (y, m) {
    --m;
    return m === 1 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m];
  };
  const getWeeksInMonth = function (y, m) {
    var datesInMonth = getDatesInMonth(y, m) - 7 + getDatesInPrevMonth(y, m);
    return Math.ceil(datesInMonth / 7) + 1 || 0;
  };
  const getDatesInYear = function (y, m, d) {
    let _d = 0;
    let i = 1;
    while (i < m) {
      _d = _d + (i === 2 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m - 1]);
      i++;
    }
    _d += d;
    return _d;
  };

  const getWeeksInYear = function (y, m, d) {
    let _d = getDatesInYear(y, m, d);
    return Math.round(_d, 7);
  };

  const getWeekTitles = function () {
    tag.weekTitles = weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay));
  };
  const str2 = function (d) {
    return (d > 9 ? '' : '0') + d;
  };
  //格式化日期
  const formatDate = function (y, m, d) {
    if (opts.dateTimeFormat) {
      return opts.dateTimeFormat(y, m, d);
    }
    return y + '-' + str2(m) + (d ? '-' + str2(d) : '');
  };
  const formatDate2 = function (d) {
    if (typeof d === 'string') {
      return d;
    } else if (d) {
      return formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
    }
    return '';
  };
  //进行日期快速比较及确认日期是否选择 不能用formatDate2  防止需要的格式数据为y/m/d  造成2016/9/10 > 2016/10/1
  const formatDate3 = function (y, m, d) {
    if (arguments.length < 3) {
      return '';
    }
    return '' + y + str2(m) + str2(d);
  };

  const getCalendarViewDate = function (y, m) {
    let weekNum = opts.weekMode ? 6 : getWeeksInMonth(y, m);
    let datesInPrevMonth = getDatesInPrevMonth(y, m);
    let datesInNextMonth = getDatesInNextMonth(y, m);
    let d = getDatesInMonth(y, m);
    let i = 0;
    let weekDates = [];
    let viewDates = {};
    let y1 = y;
    let y3 = y;
    let m1 = m;
    let m3 = m;
    let d1 = d;
    let d3 = d;
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
    let c2 = 0;
    let c3 = 0;
    while (i < weekNum) {
      var j = 0;
      var wd = [];
      while (j < 7) {
        let _y,
            _m,
            _d,
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
        let _date = new Date(_y, _m - 1, _d);
        //将YMD暂存，进行比较日期
        _date._str = formatDate3(_y, _m, _d);
        /*
          current:            Number 表示月份  -1  前一个月  0  当前月 1 后一个月
          date:               Date  当前日期
          y:                  Number 年份
          m:                  Number 月份
          d:                  Number 日
          w:                  Number 星期
          wy:                 Number 一年中的第几周
          r:                  Number 处于日历的第几行
          dateformat:         String 当前日期格式化字符串
          range:              Number 表示范围选择  -1  表示范围开始  0 表示范围中   1 表示范围结束
          select:             Number 表示是否被选中 1表示选中
          valid:              Number 表示是否可用  0 表示可用  1 表示其它月  2 表示超出range范围  3 表示超出min max范围
         */
        let r = {
          current: _c,
          date: _date,
          y: _y,
          m: _m,
          d: _d,
          w: _date.getDay(),
          dateformat: formatDate(_y, _m, _d),
          valid: 0
        };
        //在范围中
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
        /*var o = {
          f: r.dateformat,
          rls: rls,
          rle: re,
          mis: mis,
          mas: mas,
          diff: r.date._str
        }
        console.table(o);
        */
        if (r.current) {
          r.valid = 1;
        } else if (opts.isRange) {
          if (rls && rls > r.date._str || rle && rle < r.date._str) {
            r.valid = 2;
          }
        } else if (mis && mis > r.date._str || mas && mas < r.date._str) {
          r.valid = 3;
        }
        j++;
        wd.push(r);
        viewDates[r.dateformat] = r;
      }
      weekDates.push(wd);
      i++;
    }
    if (changeDateStr && opts.onChange) {
      opts.onChange(viewDates[changeDateStr]);
      changeDateStr = undefined;
    }
    return {
      weekDates: weekDates,
      viewDates: viewDates
    };
  };

  const changeView = function (direction) {
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
      e.preventUpdate = true;
      return;
    }
    changeView(-1);
  };
  tag.nextMonth = function (e) {
    if (tag.nextMonthDisable) {
      e.preventUpdate = true;
      return;
    }
    changeView(1);
  };

  //选择日期排序
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

  tag.parseDateClass = function (date) {
    if (!date) {
      return false;
    }
    let classNames = [];
    if (tag.opts.isRange && rs && re) {
      if (rs === date.date._str) {
        classNames.push('rangeStart');
      }
      if (re === date.date._str) {
        classNames.push('rangeEnd');
      }
      if (date.range === 0) {
        classNames.push('high');
      }
    }
    if (tag.opts.parseDateClass) {
      let c = opts.parentDateClass(date);
      c && classNames.push(c);
    }
    return classNames.join(' ');
  };
  //范围值
  let rs, re, rls, rle, selectDates, selectDateStr, mis, mas;
  //默认日期  配置日期  范围起点  选择日期最小的一个   今天
  let defaultDate;
  //当前日历的年月
  let curY;
  let curM;
  let lastY;
  let lastM;
  let switchDirection;
  let rangeLimit = opts.rangeLimit || [];
  const init = function () {
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

  //before-mount在update之后执行
  //tag.on('before-mount', function(){
  init();
  //})
  tag.on('update', function () {
    if (opts.switchWithAnimation && switchDirection) {
      tag.otherData = {
        title: lastY + '年' + lastM + '月',
        weekdates: tag.curData.weekdates
      };
    }
    let _d = getCalendarViewDate(curY, curM);
    tag.curData = {
      title: curY + '年' + curM + '月',
      weekdates: _d.weekDates,
      viewdates: _d.viewDates
    };
    if (opts.switchViewOverLimit) {
      let firstDateStr = formatDate3(curY, curM, 1);
      let lastDateStr = formatDate3(curY, curM, getDatesInMonth(curY, curM));
      if (firstDateStr < mis) {
        tag.prevMonthDisable = true;
      } else {
        tag.prevMonthDisable = false;
      }
      if (mas && lastDateStr > mas) {
        tag.nextMonthDisable = true;
      } else {
        tag.nextMonthDisable = false;
      }
    }
  });
  let timer = null;
  let changeDateStr = undefined;
  //动画
  tag.on('updated', function () {
    if (opts.switchWithAnimation && switchDirection) {
      let $cur = tag.root.querySelector('.calendar__body--cur');
      let $curT = tag.root.querySelector('.title__cur');
      let $other = tag.root.querySelector('.calendar__body--other');
      let $otherT = tag.root.querySelector('.title__other');
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
      let duration = parseFloat(opts.animationDuration) || 0.45;
      let c1;
      let c2;
      if (duration !== 0.45) {
        let _duration = '' + duration + 's';
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
    }
  });

  tag.checkDate = function (e) {
    let date = e.item.date;
    if (date.valid !== 0) {
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
        //非range的时候做动画
        e.srcElement.classList.add('riot-calendar-scaleOut');
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
    if (opts.onChange) {
      changeDateStr = date.dateformat;
    }
  };
});

});
