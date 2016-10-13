(function (riot) {
  'use strict';

  riot = 'default' in riot ? riot['default'] : riot;

  function ___$insertStyle(css) {
      if (!css) {
          return;
      }

      if (typeof window === 'undefined') {
          return;
      }

      var style = document.createElement('style');

      style.setAttribute('type', 'text/css');
      style.innerHTML = css;

      document.head.appendChild(style);

      return css;
  }
  ___$insertStyle("riot-calendar .pure-u-1-8 {\n  width: 14.285%;\n  text-align: center; }\n\nriot-calendar .weeks {\n  font-size: 0.8125rem;\n  color: #333333;\n  line-height: 2.1875rem;\n  position: relative; }\n  riot-calendar .weeks:after {\n    position: absolute;\n    content: '';\n    width: 90.625%;\n    height: 1px;\n    background-color: #efebea;\n    opacity: 0.97;\n    left: 4.6875%;\n    bottom: 0;\n    z-index: 2; }\n\nriot-calendar .control {\n  text-align: center;\n  margin-bottom: 0.5rem; }\n  riot-calendar .control .title {\n    color: #333333;\n    font-size: 0.8125rem;\n    line-height: 2;\n    position: relative;\n    height: 1.625rem;\n    overflow: hidden; }\n  riot-calendar .control .prev, riot-calendar .control .next {\n    position: relative; }\n    riot-calendar .control .prev i, riot-calendar .control .next i {\n      position: absolute;\n      width: 0.5rem;\n      height: 0.5rem;\n      top: 50%;\n      left: 50%;\n      margin-top: -0.25rem;\n      margin-left: -0.25rem;\n      border-top: none;\n      border-right: none;\n      border-left: 2px solid #7f1f59;\n      border-bottom: 2px solid #7f1f59; }\n    riot-calendar .control .prev.disable i, riot-calendar .control .next.disable i {\n      border-left-color: #b8b8b8;\n      border-bottom-color: #b8b8b8; }\n  riot-calendar .control .prev i {\n    -webkit-transform: rotate(45deg);\n    transform: rotate(45deg); }\n  riot-calendar .control .next i {\n    -webkit-transform: rotate(-135deg);\n    transform: rotate(-135deg); }\n\nriot-calendar .calendar__body {\n  padding: 0.40625rem 0;\n  position: relative;\n  min-height: 15rem;\n  overflow: hidden; }\n  riot-calendar .calendar__body .pure-g {\n    margin-top: 0.5rem; }\n\nriot-calendar .calendar__body--cur, riot-calendar .calendar__body--other, riot-calendar .title__cur, riot-calendar .title__other {\n  will-change: transform, opacity;\n  position: absolute;\n  width: 100%;\n  left: 0;\n  background: #fff;\n  -webkit-animation-play-state: paused;\n  animation-play-state: paused;\n  -webkit-animation-duration: 0.45s;\n  animation-duration: 0.45s;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards;\n  -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);\n  animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); }\n  riot-calendar .calendar__body--cur.calendar-fadeInLeft, riot-calendar .calendar__body--other.calendar-fadeInLeft, riot-calendar .title__cur.calendar-fadeInLeft, riot-calendar .title__other.calendar-fadeInLeft {\n    -webkit-animation-name: riot-calendar-fadeInFromLeft;\n    animation-name: riot-calendar-fadeInFromLeft; }\n  riot-calendar .calendar__body--cur.calendar-fadeInRight, riot-calendar .calendar__body--other.calendar-fadeInRight, riot-calendar .title__cur.calendar-fadeInRight, riot-calendar .title__other.calendar-fadeInRight {\n    -webkit-animation-name: riot-calendar-fadeInFromRight;\n    animation-name: riot-calendar-fadeInFromRight; }\n  riot-calendar .calendar__body--cur.calendar-fadeOutLeft, riot-calendar .calendar__body--other.calendar-fadeOutLeft, riot-calendar .title__cur.calendar-fadeOutLeft, riot-calendar .title__other.calendar-fadeOutLeft {\n    -webkit-animation-name: riot-calendar-fadeOutFromLeft;\n    animation-name: riot-calendar-fadeOutFromLeft; }\n  riot-calendar .calendar__body--cur.calendar-fadeOutRight, riot-calendar .calendar__body--other.calendar-fadeOutRight, riot-calendar .title__cur.calendar-fadeOutRight, riot-calendar .title__other.calendar-fadeOutRight {\n    -webkit-animation-name: riot-calendar-fadeOutFromRight;\n    animation-name: riot-calendar-fadeOutFromRight; }\n  riot-calendar .calendar__body--cur.animation, riot-calendar .calendar__body--other.animation, riot-calendar .title__cur.animation, riot-calendar .title__other.animation {\n    -webkit-animation-play-state: running;\n    animation-play-state: running; }\n\nriot-calendar .calendar__body--cur, riot-calendar .calendar__body--other {\n  top: 0.25rem;\n  height: 100%; }\n\nriot-calendar .day {\n  height: 2rem;\n  line-height: 2rem;\n  text-align: center;\n  color: #c5c5c5; }\n  riot-calendar .day i {\n    font-style: normal; }\n  riot-calendar .day span {\n    display: none; }\n\nriot-calendar .enable {\n  color: #393836; }\n\nriot-calendar .pure-u-1-8 {\n  position: relative; }\n\nriot-calendar .choice {\n  width: 32px;\n  height: 32px;\n  position: absolute;\n  z-index: 2;\n  left: 50%;\n  margin-left: -16px;\n  color: #fff;\n  -ms-box-sizing: border-box;\n  box-sizing: border-box;\n  line-height: 2rem;\n  display: inline-block; }\n  riot-calendar .choice i {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    content: '';\n    background-color: #7f1f59;\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: -1;\n    -webkit-animation-duration: 0.45s;\n    animation-duration: 0.45s;\n    -webkit-animation-fill-mode: forwards;\n    animation-fill-mode: forwards;\n    -webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);\n    will-change: transform, opacity; }\n  riot-calendar .choice.riot-calendar-scaleIn i {\n    -webkit-animation-name: riot-calendar-scaleIn;\n    animation-name: riot-calendar-scaleIn; }\n  riot-calendar .choice.riot-calendar-scaleOut i {\n    -webkit-animation-name: riot-calendar-scaleOut;\n    animation-name: riot-calendar-scaleOut; }\n\nriot-calendar .high {\n  background-color: #eee2e9; }\n  riot-calendar .high .day.enable {\n    color: #fff; }\n\nriot-calendar .checkoutrange {\n  font-weight: bold; }\n\nriot-calendar .rangeStart:before, riot-calendar .rangeEnd:before {\n  width: 50%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 50%;\n  background-color: #eee2e9;\n  content: \"\"; }\n\nriot-calendar .rangeEnd:before {\n  left: 0; }\n\n@-webkit-keyframes riot-calendar-fadeInFromLeft {\n  0% {\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    opacity: 0; }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; } }\n\n@keyframes riot-calendar-fadeInFromLeft {\n  0% {\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    opacity: 0; }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; } }\n\n@-webkit-keyframes riot-calendar-fadeOutFromLeft {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; }\n  100% {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n    opacity: 0; } }\n\n@keyframes riot-calendar-fadeOutFromLeft {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; }\n  100% {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n    opacity: 0; } }\n\n@-webkit-keyframes riot-calendar-fadeInFromRight {\n  0% {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n    opacity: 0; }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; } }\n\n@keyframes riot-calendar-fadeInFromRight {\n  0% {\n    -webkit-transform: translateX(100%);\n    transform: translateX(100%);\n    opacity: 0; }\n  100% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; } }\n\n@-webkit-keyframes riot-calendar-fadeOutFromRight {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; }\n  100% {\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    opacity: 1; } }\n\n@keyframes riot-calendar-fadeOutFromRight {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0);\n    opacity: 1; }\n  100% {\n    -webkit-transform: translateX(-100%);\n    transform: translateX(-100%);\n    opacity: 1; } }\n\n@-webkit-keyframes riot-calendar-scaleIn {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacith: 1; } }\n\n@keyframes riot-calendar-scaleIn {\n  0% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    opacity: 0; }\n  100% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacith: 1; } }\n\n@-webkit-keyframes riot-calendar-scaleOut {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    opacity: 0; } }\n\n@keyframes riot-calendar-scaleOut {\n  0% {\n    -webkit-transform: scale(1);\n    transform: scale(1);\n    opacity: 1; }\n  100% {\n    -webkit-transform: scale(0);\n    transform: scale(0);\n    opacity: 0; } }\n");;

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

  riot.tag2('riot-calendar', '<div class="calendar"> <div class="calendar__head"> <div class="pure-g control"> <a class="pure-u-1-5 prev {prevMonthDisable && \'disable\'}" href="javascript:;" onclick="{prevMonth}"><i></i></a> <div class="pure-u-3-5 title"> <div if="{otherData}" class="title__other">{otherData.title}</div> <div class="title__cur">{curData.title}</div> </div> <a class="pure-u-1-5 next {nextMonthDisable && \'disable\'}" href="javascript:;" onclick="{nextMonth}"><i></i></a> </div> <div class="pure-g weeks"> <div class="pure-u-1-8" each="{week in weekTitles}">{week}</div> </div> </div> <div class="calendar__body"> <div if="{otherData}" class="calendar__body--other"> <div class="pure-g" each="{weekdates in otherData.weekdates}"> <div class="pure-u-1-8 {parseDateClass(date)}" each="{date,index in weekdates}"> <div class="day {date.valid === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\'}" onclick="{checkDate}">{date.d}</div> </div> </div> </div> <div class="calendar__body--cur"> <div class="pure-g" each="{weekdates in curData.weekdates}"> <div class="pure-u-1-8 {parseDateClass(date)}" each="{date,index in weekdates}"> <div class="day {date.valid === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\'} {!date.range && date.select === 1 && \'riot-calendar-scaleIn\'}" onclick="{checkDate}">{date.d}<i if="{date.select === 1}"></i></div> </div> </div> </div> </div> <div class="calendar__foot"></div> </div>', '', '', function (opts) {
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

}(riot));