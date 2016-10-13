import riot from 'riot';

riot.tag2('riot-calendar', '<div class="calendar"> <div class="calendar__head"> <div class="pure-g control"> <a class="pure-u-1-5 prev {prevMonthDisable && \'disable\'}" href="javascript:;" onclick="{prevMonth}"><i></i></a> <div class="pure-u-3-5 title"> <div if="{otherData}" class="title__other">{otherData.title}</div> <div class="title__cur">{curData.title}</div> </div> <a class="pure-u-1-5 next {nextMonthDisable && \'disable\'}" href="javascript:;" onclick="{nextMonth}"><i></i></a> </div> <div class="pure-g weeks"> <div class="pure-u-1-8" each="{week in weekTitles}">{week}</div> </div> </div> <div class="calendar__body"> <div if="{otherData}" class="calendar__body--other"> <div class="pure-g" each="{weekdates in otherData.weekdates}"> <div class="pure-u-1-8 {parseDateClass(date)}" each="{date in weekdates}"> <div class="day {date.valid === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\'}" onclick="{checkDate}">{date.d}</div> </div> </div> </div> <div class="calendar__body--cur"> <div class="pure-g" each="{weekdates in curData.weekdates}"> <div class="pure-u-1-8 {parseDateClass(date)}" each="{date in weekdates}"> <div class="day {date.valid === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\'} {!date.range && date.select === 1 && \'riot-calendar-scaleIn\'}" onclick="{checkDate}">{date.d}<i if="{date.select === 1}"></i></div> </div> </div> </div> </div> <div class="calendar__foot"></div> </div>', '', '', function (opts) {
  let tag = this;

  const firstDay = Number(tag.opts.firstDay) || 0;

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
    return (tag.opts.weekMode ? 6 : getWeeksInMonth(y, m)) * 7 - getDatesInPrevMonth(y, m) - getDatesInMonth(y, m);
  };
  const getDatesInMonth = function (y, m) {
    --m;
    return m === 1 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m];
  };
  const getWeeksInMonth = function (y, m) {
    var datesInMonth = getDatesInMonth(y, m) - 7 + getDatesInPrevMonth(y, m);
    return Math.ceil(datesInMonth / 7) + 1 || 0;
  };

  const getWeekTitles = function () {
    tag.weekTitles = weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay));
  };
  const str2 = function (d) {
    return (d > 9 ? '' : '0') + d;
  };

  const formatDate = function (y, m, d) {
    if (tag.opts.DateTimeFormat) {
      return tag.opts.DateTimeFormat(y, m, d);
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

  const getCalendarViewDate = function (y, m) {
    let weekNum = tag.opts.weekMode ? 6 : getWeeksInMonth(y, m);
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

        if (tag.opts.isRange) {
          if (rs) {
            if (rs === r.dateformat) {
              r.range = -1;
              r.select = 1;
            } else if (re) {
              if (r.dateformat === re) {
                r.range = 1;
                r.select = 1;
              } else if (r.dateformat > rs && r.dateformat < re) {
                r.range = 0;
              }
            }
          }
        } else if (selectDateStr.indexOf(r.dateformat) > -1) {
          r.select = 1;
        }
        if (r.current) {
          r.valid = 1;
        } else if (tag.opts.isRange) {
          if (rls && rls > r.dateformat || rle && rle < r.dateformat) {
            r.valid = 2;
          }
        } else if (mis && mis > r.dateformat || mas && mas < r.dateformat) {
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
      selectDates = (tag.opts.selectDates || []).concat();
    }
    selectDateStr = [];
    selectDates = selectDates.filter(function (d) {
      var s = formatDate2(d);
      if (tag.opts.isRange && (rls && rls > s || rle && rle < s)) {
        return false;
      } else if (mis && mis > s || mas && mas < s) {
        return false;
      }
      selectDateStr.push(s);
      return true;
    });

    selectDates.sort(function (a, b) {
      return a - b;
    });

    if (tag.opts.isInRange) {
      selectDates = selectDates.slice(0, 2);
      selectDateStr = selectDateStr.slice(0, 2);
    } else if (!tag.opts.isMultiple) {
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
      if (rs === date.dateformat) {
        classNames.push('rangeStart');
      }
      if (re === date.dateformat) {
        classNames.push('rangeEnd');
      }
      if (date.range === 0) {
        classNames.push('high');
      }
    }
    if (tag.opts.parseDateClass) {
      let c = tag.opts.parentDateClass(date);
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
  let rangeLimit = tag.opts.rangeLimit || [];
  const init = function () {
    rls = formatDate2(rangeLimit[0]);
    rle = formatDate2(rangeLimit[1]);
    mis = formatDate2(tag.opts.minDate);
    mas = formatDate2(tag.opts.maxDate);
    if (tag.opts.isRange) {
      mis && rls && rls < mis ? rls = mis : '';
      mas && rle && rle > mas ? rle = mas : '';
    }
    getWeekTitles();

    tag.getSelectDates();

    if (!tag.opts.isMultiple) {
      rs = selectDateStr[0];
    }
    if (tag.opts.isRange) {
      re = selectDateStr[1];
    }
    defaultDate = tag.opts.defaultDate || selectDates[0] || new Date();
    curY = defaultDate.getFullYear();
    curM = defaultDate.getMonth() + 1;
  };

  init();

  tag.on('update', function () {
    if (tag.opts.switchWithAnimation && switchDirection) {
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
    if (tag.opts.switchViewOverLimit) {
      let firstDateStr = formatDate(curY, curM, 1);
      let lastDateStr = formatDate(curY, curM, getDatesInMonth(curY, curM));
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

  tag.on('updated', function () {
    if (tag.opts.switchWithAnimation && switchDirection) {
      let $cur = tag.root.querySelector('.calendar__body--cur');
      let $curT = tag.root.querySelector('.title__cur');
      let $other = tag.root.querySelector('.calendar__body--other');
      let $otherT = tag.root.querySelector('.title__other');
      if (tag.opts.animationTimingFunction) {
        $cur.style.webkitAnimationTimingFunction = tag.opts.animationTimingFunction;
        $other.style.webkitAnimationTimingFunction = tag.opts.animationTimingFunction;
        $cur.style.animationTimingFunction = tag.opts.animationTimingFunction;
        $other.style.animationTimingFunction = tag.opts.animationTimingFunction;
        $curT.style.webkitAnimationTimingFunction = tag.opts.animationTimingFunction;
        $otherT.style.webkitAnimationTimingFunction = tag.opts.animationTimingFunction;
        $curT.style.animationTimingFunction = tag.opts.animationTimingFunction;
        $otherT.style.animationTimingFunction = tag.opts.animationTimingFunction;
      }
      let duration = parseFloat(tag.opts.animationDuration) || 0.45;
      let c1;
      let c2;
      if (duration !== 0.45) {
        _duration = '' + duration + 's';
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
    console.log(tag);
  });

  tag.checkDate = function (e) {
    let date = e.item.date;
    if (date.valid !== 0) {
      if (tag.opts.switchViewByOtherMonth) {
        if (date.current === -1 && !tag.prevMonthDisable || date.current === 1 && !tag.nextMonthDisable) {
          changeView(date.current);
        }
      } else {
        e.preventUpdate = true;
        return;
      }
    }
    if (tag.opts.isRange) {
      if (rs && !re && rs === date.dateformat) {
        selectDates = [];
        selectDateStr = [];
        rs = undefined;
        re = undefined;
      } else if (!rs || rs && rs > date.dateformat || re) {
        selectDates = [date.date];
        selectDateStr = [date.dateformat];
        rs = date.dateformat;
        re = undefined;
      } else {
        selectDates.push(date.date);
        selectDateStr.push(date.dateformat);
        re = date.dateformat;
      }
    } else {
      if (date.select) {

        e.srcElement.classList.add('riot-calendar-scaleOut');
        var i = selectDateStr.indexOf(date.dateformat);
        selectDateStr.splice(i, 1);
        selectDates.splice(i, 1);
      } else {
        if (!tag.opts.isMultiple) {
          selectDateStr = [date.dateformat];
          selectDates = [date.date];
        } else {
          selectDateStr.push(date.dateformat);
          selectDates.push(date.date);
        }
      }
    }
    if (tag.opts.onChange) {
      tag.opts.onChange(date, tag);
    }
    if (tag.opts.autoOk) {
      tag.unmount(true);
    }
  };
});