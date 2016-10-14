define(['riot'], function (riot) { 'use strict';

  riot = 'default' in riot ? riot['default'] : riot;

  /** Return all property names */
  function getAllPropertyNames(obj) {
    var arr = [];
    for (var key in obj) {
      arr.push(key);
    }return arr;
  }

  /** Call original method and update automatically */
  function hook(p, key) {
    var h = function h(e) {
      // update only when the argument is an Event object
      if (e && e instanceof Event) {
        // suppress updating on the inherit tag
        e.preventUpdate = true;
        // call original method
        p[key](e);
        // update automatically
        p.update();
      } else {
        p[key](e);
      }
    };
    h._inherited = true;
    return h;
  }

  var parentScope = {
    /**
     * Inject properties from parents
     */
    init: function init() {
      var _this = this;

      //when the tag hasn't parent
      if (!this.parent) {
        return;
      }
      /** Store the keys originally belonging to the tag */
      this.one('update', function () {
        _this._ownPropKeys = getAllPropertyNames(_this);
        _this._ownOptsKeys = getAllPropertyNames(_this.opts);
      });
      /** Inherit the properties from parents on each update */
      this.on('update', function () {
        var ignoreProps = ['root', 'triggerDomEvent'];
        getAllPropertyNames(_this.parent)
        // TODO:
        //   Skipping 'triggerDomEvent' is a temporal workaround.
        //   In some cases function on the child would be overriden.
        //   This issue needs more study...
        .filter(function (key) {
          return !~_this._ownPropKeys.concat(ignoreProps).indexOf(key);
        }).forEach(function (key) {
          _this[key] = typeof _this.parent[key] != 'function' || _this.parent[key]._inherited ? _this.parent[key] : hook(_this.parent, key);
        });
        getAllPropertyNames(_this.parent.opts).filter(function (key) {
          return !~_this._ownOptsKeys.indexOf(key) && key != 'riotTag';
        }).forEach(function (key) {
          _this.opts[key] = typeof _this.parent.opts[key] != 'function' || _this.parent.opts[key]._inherited ? _this.parent.opts[key] : hook(_this.parent, key);
        });
      });
    }
  };

  riot.tag2('riot-calendar', '<div class="calendar"> <div class="calendar__head"> <div class="pure-g control"> <a class="pure-u-1-5 prev {prevMonthDisable && \'disable\'}" href="javascript:;" onclick="{prevMonth}"><i></i></a> <div class="pure-u-3-5 title"> <div if="{otherData}" class="title__other">{otherData.title}</div> <div class="title__cur">{curData.title}</div> </div> <a class="pure-u-1-5 next {nextMonthDisable && \'disable\'}" href="javascript:;" onclick="{nextMonth}"><i></i></a> </div> <div class="pure-g weeks"> <div class="pure-u-1-8" each="{week in weekTitles}">{week}</div> </div> </div> <div class="calendar__body"> <div if="{otherData}" class="calendar__body--other"> <div class="pure-g" each="{weekdates in otherData.weekdates}"> <div class="pure-u-1-8 {parseDateClass(date)}" each="{date,index in weekdates}"> <div class="day {date.valid === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\'}" onclick="{checkDate}">{date.d}</div> </div> </div> </div> <div class="calendar__body--cur"> <div class="pure-g" each="{weekdates in curData.weekdates}"> <div class="pure-u-1-8 {parseDateClass(date)}" each="{date,index in weekdates}"> <div class="day {date.valid === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\'} {!date.range && date.select === 1 && \'riot-calendar-scaleIn\'}" onclick="{checkDate}">{date.d}<i if="{date.select===1}"></i></div> </div> </div> </div> </div> <div class="calendar__foot"></div> </div>', 'riot-calendar,[riot-tag="riot-calendar"],[data-is="riot-calendar"]{ display: block; } riot-calendar .pure-u-1-8,[riot-tag="riot-calendar"] .pure-u-1-8,[data-is="riot-calendar"] .pure-u-1-8{ width: 14.285%; text-align: center; } riot-calendar .weeks,[riot-tag="riot-calendar"] .weeks,[data-is="riot-calendar"] .weeks{ font-size: 0.8125rem; color: #333333; line-height: 2.1875rem; position: relative; } riot-calendar .weeks:after,[riot-tag="riot-calendar"] .weeks:after,[data-is="riot-calendar"] .weeks:after{ position: absolute; content: \'\'; width: 90.625%; height: 1px; background-color: #efebea; opacity: 0.97; left: 4.6875%; bottom: 0; z-index: 2; } riot-calendar .control,[riot-tag="riot-calendar"] .control,[data-is="riot-calendar"] .control{ text-align: center; margin-bottom: 0.5rem; } riot-calendar .control .title,[riot-tag="riot-calendar"] .control .title,[data-is="riot-calendar"] .control .title{ color: #333333; font-size: 0.8125rem; line-height: 2; position: relative; height: 1.625rem; overflow: hidden; } riot-calendar .control .prev,[riot-tag="riot-calendar"] .control .prev,[data-is="riot-calendar"] .control .prev,riot-calendar .control .next,[riot-tag="riot-calendar"] .control .next,[data-is="riot-calendar"] .control .next{ position: relative; } riot-calendar .control .prev i,[riot-tag="riot-calendar"] .control .prev i,[data-is="riot-calendar"] .control .prev i,riot-calendar .control .next i,[riot-tag="riot-calendar"] .control .next i,[data-is="riot-calendar"] .control .next i{ position: absolute; width: 0.5rem; height: 0.5rem; top: 50%; left: 50%; margin-top: -0.25rem; margin-left: -0.25rem; border-top: none; border-right: none; border-left: 2px solid #7f1f59; border-bottom: 2px solid #7f1f59; } riot-calendar .control .prev.disable i,[riot-tag="riot-calendar"] .control .prev.disable i,[data-is="riot-calendar"] .control .prev.disable i,riot-calendar .control .next.disable i,[riot-tag="riot-calendar"] .control .next.disable i,[data-is="riot-calendar"] .control .next.disable i{ border-left-color: #b8b8b8; border-bottom-color: #b8b8b8; } riot-calendar .control .prev i,[riot-tag="riot-calendar"] .control .prev i,[data-is="riot-calendar"] .control .prev i{ -webkit-transform: rotate(45deg); transform: rotate(45deg); } riot-calendar .control .next i,[riot-tag="riot-calendar"] .control .next i,[data-is="riot-calendar"] .control .next i{ -webkit-transform: rotate(-135deg); transform: rotate(-135deg); } riot-calendar .calendar__body,[riot-tag="riot-calendar"] .calendar__body,[data-is="riot-calendar"] .calendar__body{ padding: 0.40625rem 0; position: relative; min-height: 15rem; overflow: hidden; } riot-calendar .calendar__body .pure-g,[riot-tag="riot-calendar"] .calendar__body .pure-g,[data-is="riot-calendar"] .calendar__body .pure-g{ margin-top: 0.5rem; } riot-calendar .calendar__body--cur,[riot-tag="riot-calendar"] .calendar__body--cur,[data-is="riot-calendar"] .calendar__body--cur,riot-calendar .calendar__body--other,[riot-tag="riot-calendar"] .calendar__body--other,[data-is="riot-calendar"] .calendar__body--other,riot-calendar .title__cur,[riot-tag="riot-calendar"] .title__cur,[data-is="riot-calendar"] .title__cur,riot-calendar .title__other,[riot-tag="riot-calendar"] .title__other,[data-is="riot-calendar"] .title__other{ will-change: transform, opacity; position: absolute; width: 100%; left: 0; background: #fff; -webkit-animation-play-state: paused; animation-play-state: paused; -webkit-animation-duration: 0.45s; animation-duration: 0.45s; -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards; -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); } riot-calendar .calendar__body--cur.calendar-fadeInLeft,[riot-tag="riot-calendar"] .calendar__body--cur.calendar-fadeInLeft,[data-is="riot-calendar"] .calendar__body--cur.calendar-fadeInLeft,riot-calendar .calendar__body--other.calendar-fadeInLeft,[riot-tag="riot-calendar"] .calendar__body--other.calendar-fadeInLeft,[data-is="riot-calendar"] .calendar__body--other.calendar-fadeInLeft,riot-calendar .title__cur.calendar-fadeInLeft,[riot-tag="riot-calendar"] .title__cur.calendar-fadeInLeft,[data-is="riot-calendar"] .title__cur.calendar-fadeInLeft,riot-calendar .title__other.calendar-fadeInLeft,[riot-tag="riot-calendar"] .title__other.calendar-fadeInLeft,[data-is="riot-calendar"] .title__other.calendar-fadeInLeft{ -webkit-animation-name: riot-calendar-fadeInFromLeft; animation-name: riot-calendar-fadeInFromLeft; } riot-calendar .calendar__body--cur.calendar-fadeInRight,[riot-tag="riot-calendar"] .calendar__body--cur.calendar-fadeInRight,[data-is="riot-calendar"] .calendar__body--cur.calendar-fadeInRight,riot-calendar .calendar__body--other.calendar-fadeInRight,[riot-tag="riot-calendar"] .calendar__body--other.calendar-fadeInRight,[data-is="riot-calendar"] .calendar__body--other.calendar-fadeInRight,riot-calendar .title__cur.calendar-fadeInRight,[riot-tag="riot-calendar"] .title__cur.calendar-fadeInRight,[data-is="riot-calendar"] .title__cur.calendar-fadeInRight,riot-calendar .title__other.calendar-fadeInRight,[riot-tag="riot-calendar"] .title__other.calendar-fadeInRight,[data-is="riot-calendar"] .title__other.calendar-fadeInRight{ -webkit-animation-name: riot-calendar-fadeInFromRight; animation-name: riot-calendar-fadeInFromRight; } riot-calendar .calendar__body--cur.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .calendar__body--cur.calendar-fadeOutLeft,[data-is="riot-calendar"] .calendar__body--cur.calendar-fadeOutLeft,riot-calendar .calendar__body--other.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .calendar__body--other.calendar-fadeOutLeft,[data-is="riot-calendar"] .calendar__body--other.calendar-fadeOutLeft,riot-calendar .title__cur.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .title__cur.calendar-fadeOutLeft,[data-is="riot-calendar"] .title__cur.calendar-fadeOutLeft,riot-calendar .title__other.calendar-fadeOutLeft,[riot-tag="riot-calendar"] .title__other.calendar-fadeOutLeft,[data-is="riot-calendar"] .title__other.calendar-fadeOutLeft{ -webkit-animation-name: riot-calendar-fadeOutFromLeft; animation-name: riot-calendar-fadeOutFromLeft; } riot-calendar .calendar__body--cur.calendar-fadeOutRight,[riot-tag="riot-calendar"] .calendar__body--cur.calendar-fadeOutRight,[data-is="riot-calendar"] .calendar__body--cur.calendar-fadeOutRight,riot-calendar .calendar__body--other.calendar-fadeOutRight,[riot-tag="riot-calendar"] .calendar__body--other.calendar-fadeOutRight,[data-is="riot-calendar"] .calendar__body--other.calendar-fadeOutRight,riot-calendar .title__cur.calendar-fadeOutRight,[riot-tag="riot-calendar"] .title__cur.calendar-fadeOutRight,[data-is="riot-calendar"] .title__cur.calendar-fadeOutRight,riot-calendar .title__other.calendar-fadeOutRight,[riot-tag="riot-calendar"] .title__other.calendar-fadeOutRight,[data-is="riot-calendar"] .title__other.calendar-fadeOutRight{ -webkit-animation-name: riot-calendar-fadeOutFromRight; animation-name: riot-calendar-fadeOutFromRight; } riot-calendar .calendar__body--cur.animation,[riot-tag="riot-calendar"] .calendar__body--cur.animation,[data-is="riot-calendar"] .calendar__body--cur.animation,riot-calendar .calendar__body--other.animation,[riot-tag="riot-calendar"] .calendar__body--other.animation,[data-is="riot-calendar"] .calendar__body--other.animation,riot-calendar .title__cur.animation,[riot-tag="riot-calendar"] .title__cur.animation,[data-is="riot-calendar"] .title__cur.animation,riot-calendar .title__other.animation,[riot-tag="riot-calendar"] .title__other.animation,[data-is="riot-calendar"] .title__other.animation{ -webkit-animation-play-state: running; animation-play-state: running; } riot-calendar .calendar__body--cur,[riot-tag="riot-calendar"] .calendar__body--cur,[data-is="riot-calendar"] .calendar__body--cur,riot-calendar .calendar__body--other,[riot-tag="riot-calendar"] .calendar__body--other,[data-is="riot-calendar"] .calendar__body--other{ top: 0.25rem; height: 100%; } riot-calendar .day,[riot-tag="riot-calendar"] .day,[data-is="riot-calendar"] .day{ height: 2rem; line-height: 2rem; text-align: center; color: #c5c5c5; } riot-calendar .day i,[riot-tag="riot-calendar"] .day i,[data-is="riot-calendar"] .day i{ font-style: normal; } riot-calendar .day span,[riot-tag="riot-calendar"] .day span,[data-is="riot-calendar"] .day span{ display: none; } riot-calendar .enable,[riot-tag="riot-calendar"] .enable,[data-is="riot-calendar"] .enable{ color: #393836; } riot-calendar .pure-u-1-8,[riot-tag="riot-calendar"] .pure-u-1-8,[data-is="riot-calendar"] .pure-u-1-8{ position: relative; } riot-calendar .choice,[riot-tag="riot-calendar"] .choice,[data-is="riot-calendar"] .choice{ width: 32px; height: 32px; position: absolute; z-index: 2; left: 50%; margin-left: -16px; color: #fff; -ms-box-sizing: border-box; box-sizing: border-box; line-height: 2rem; display: inline-block; } riot-calendar .choice i,[riot-tag="riot-calendar"] .choice i,[data-is="riot-calendar"] .choice i{ width: 100%; height: 100%; border-radius: 50%; content: \'\'; background-color: #7f1f59; position: absolute; top: 0; left: 0; z-index: -1; -webkit-animation-duration: 0.45s; animation-duration: 0.45s; -webkit-animation-fill-mode: forwards; animation-fill-mode: forwards; -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); will-change: transform, opacity; } riot-calendar .choice.riot-calendar-scaleIn i,[riot-tag="riot-calendar"] .choice.riot-calendar-scaleIn i,[data-is="riot-calendar"] .choice.riot-calendar-scaleIn i{ -webkit-animation-name: riot-calendar-scaleIn; animation-name: riot-calendar-scaleIn; } riot-calendar .choice.riot-calendar-scaleOut i,[riot-tag="riot-calendar"] .choice.riot-calendar-scaleOut i,[data-is="riot-calendar"] .choice.riot-calendar-scaleOut i{ -webkit-animation-name: riot-calendar-scaleOut; animation-name: riot-calendar-scaleOut; } riot-calendar .high,[riot-tag="riot-calendar"] .high,[data-is="riot-calendar"] .high{ background-color: #eee2e9; } riot-calendar .high .day.enable,[riot-tag="riot-calendar"] .high .day.enable,[data-is="riot-calendar"] .high .day.enable{ color: #fff; } riot-calendar .checkoutrange,[riot-tag="riot-calendar"] .checkoutrange,[data-is="riot-calendar"] .checkoutrange{ font-weight: bold; } riot-calendar .rangeStart:before,[riot-tag="riot-calendar"] .rangeStart:before,[data-is="riot-calendar"] .rangeStart:before,riot-calendar .rangeEnd:before,[riot-tag="riot-calendar"] .rangeEnd:before,[data-is="riot-calendar"] .rangeEnd:before{ width: 50%; height: 100%; position: absolute; top: 0; left: 50%; background-color: #eee2e9; content: ""; } riot-calendar .rangeEnd:before,[riot-tag="riot-calendar"] .rangeEnd:before,[data-is="riot-calendar"] .rangeEnd:before{ left: 0; } @-webkit-keyframes riot-calendar-fadeInFromLeft { 0% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @keyframes riot-calendar-fadeInFromLeft { 0% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @-webkit-keyframes riot-calendar-fadeOutFromLeft { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } } @keyframes riot-calendar-fadeOutFromLeft { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } } @-webkit-keyframes riot-calendar-fadeInFromRight { 0% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @keyframes riot-calendar-fadeInFromRight { 0% { -webkit-transform: translateX(100%); transform: translateX(100%); opacity: 0; } 100% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } } @-webkit-keyframes riot-calendar-fadeOutFromRight { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 1; } } @keyframes riot-calendar-fadeOutFromRight { 0% { -webkit-transform: translateX(0); transform: translateX(0); opacity: 1; } 100% { -webkit-transform: translateX(-100%); transform: translateX(-100%); opacity: 1; } } @-webkit-keyframes riot-calendar-scaleIn { 0% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } 100% { -webkit-transform: scale(1); transform: scale(1); opacith: 1; } } @keyframes riot-calendar-scaleIn { 0% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } 100% { -webkit-transform: scale(1); transform: scale(1); opacith: 1; } } @-webkit-keyframes riot-calendar-scaleOut { 0% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } } @keyframes riot-calendar-scaleOut { 0% { -webkit-transform: scale(1); transform: scale(1); opacity: 1; } 100% { -webkit-transform: scale(0); transform: scale(0); opacity: 0; } }', '', function (opts) {
    let tag = this;
    tag.mixin(parentScope);
    const firstDay = Number(opts.firstDay) || 0;

    const datesOfMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const weekTitles = ['日', '一', '二', '三', '四', '五', '六'];
    let getFirstDateInMonth = function (y, m) {
      return new Date(y, m - 1, 1);
    };

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
    window.getDatesInYear = getDatesInYear;
    console.log(getDatesInYear(2016, 10, 13));
    const getWeekTitles = function () {
      tag.weekTitles = weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay));
    };
    const str2 = function (d) {
      return (d > 9 ? '' : '0') + d;
    };

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
      let viewDates = [];
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

          _date._str = formatDate3(_y, _m, _d);

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
          viewDates.push(r);
        }
        weekDates.push(wd);
        i++;
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

    let rs, re, rls, rle, selectDates, selectDateStr, mis, mas;

    let defaultDate;

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

      if (!opts.isMultiple) {
        rs = formatDate3(selectDates[0].getFullYear(), selectDates[0].getMonth() + 1, selectDates[0].getDate());
      }
      if (opts.isRange) {
        re = formatDate3(selectDates[1].getFullYear(), selectDates[1].getMonth() + 1, selectDates[1].getDate());
      }
      defaultDate = opts.defaultDate || selectDates[0] || new Date();
      curY = defaultDate.getFullYear();
      curM = defaultDate.getMonth() + 1;
    };

    init();

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
    let shouldTriggerCheckEvent = false;

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
      console.log(e.item);
    };
  });

});