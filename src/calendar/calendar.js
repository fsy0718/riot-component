/**
 * Tag构造函数
 * @external Tag
 * @see http://riotjs.com/api/#tag-instance
 */
/**
 * onChange 函数说明
 * @callback onChangeCall
 * @param {riot-date|null} date 当前被点击riot-date对象,如果一个日期被取消选中时，则返回null,但可以通过tag来进行操作
 * @param {tag} tag 当前riot-calendar实例对象
 */
/**
 * dateTimeFormat 函数说明
 * @callback dateTimeFormatCall
 * @param {number} y 年份
 * @param {number} m 月份
 * @param {number} d 天数
 */
/**
 * parseDateClass 函数说明
 * @callback parseDateClassCall
 * @param {riot-date} date 当前正在渲染的riot-date对象
 * @returns {string|string[]} 需要被添加类名
 */

/**
 * getSelectDatesCall 函数说明
 * @callback getSelectDatesCall
 * @returns {selectDateObj}

 */
/**
 * 扩展Tag实例
 * @see http://riotjs.com/api/#tag-instance
 * @typedef {object} tag
 * @extends external:Tag
 * @property {function} prevMonth  选择前一个月,不能传参数
 * @property {function} nextMonth  选择下一个月，不能传参数
 * @property {getSelectDatesCall} getSelectDates 返回当前选择日期对象
 */
/**
 * @typedef {object} selectDateObj
 * @property {date[]} dates  被选中排序后的Date数组或空数组
 * @property {string[]} dateStr 被选中排序后并经过opts.dateTimeFormat格式化后的日期字符串或空数组
 */
/**
 * @typedef {object} riot-date
 * @property {number} current     表示月份 -1:前一个月  0:当前月 1:后一个月
 * @property {date}   date          当前日期对象
 * @property {number} y            年份
 * @property {number} m            月份
 * @property {number} d            日
 * @property {number} w            星期
 * @property {string} dateformat   日期字符串，可以被opts.dateTimeFormat控制，默认为yyyy-mm-dd
 * @property {number} [range]      表示范围选择,只有当opts.isRange为true时有效  -1:表示范围开始  0:表示范围中   1:表示范围结束
 * @property {number} [select]     表示是否被选中 1:表示选中
 * @property {number} valid        表示当前日期是否可用  0:表示可用  1:表示其它月  2:表示超出range范围  3:表示超出min-max范围
 */

/**
 * @function riot-calendar
 * @description 基于riot的日历，默认日历视图由defaultDate|selectDates|new Date()按顺序提供
 * @param {Object} opts
 * @param {boolean}   [opts.autoOk=false]                是否自动保存
 * @param {date}      [opts.defaultDate]                 默认日期
 * @param {date}      [opts.minDate]                     最小日期
 * @param {date}      [opts.maxDate]                     最大日期
 * @param {boolean}   [opts.isRange]                     是否为选择范围
 * @param {date[]}    [opts.rangeLimit]                  选择的范围      
 * @param {boolean}   [opts.weekMode=false]              是否固定星期 true 固定
 * @param {number}    [opts.firstDay=0]                  每周的第一天
 * @param {boolean}   [opts.isMultiple                   是否为多选
 * @param {date[]}    [opts.selectDates]                 选中的日期
 * @param {boolean}   [opts.switchViewByOtherMonth=false] 表示点击其它月份是否切换日历视图 
 * @param {boolean}   [opts.switchViewOverLimit=false]   表示超出最小与最大日历是否能切换日历视图
 * @param {boolean}   [opts.showOtherMonthDay=true]      是否显示其它月的日期
 * @param {boolean}   [opts.switchWithAnimation=true]    切换时是否需要动画
 * @param {string}    [opts.animationTimingFunction=cubic-bezier(0.445, 0.05, 0.55, 0.95)]      动画函数 
 * @param {number}    [opts.animationDuration=0.45]       动画待续时间  默认为0.45s
 * @param {onChangeCall}  [opts.onChange]                 日期被点击时的回调函数
 * @param {dateTimeFormatCall} [opts.dateTimeFormat]      自定义日历显示格式
 * @param {parseDateClassCall} [opts.parseDateClass]      自定义日历日期显示的className
 * @returns {tag}
 * @example
 *  riot.mount('riot-calendar', opts)
 */





let tag = this;
const firstDay = Number(opts.firstDay) || 0;

//一些帮助函数
//天数
const datesOfMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const weekTitles = ['日', '一', '二', '三', '四', '五', '六'];
let getFirstDateInMonth = function (y, m) {
  return new Date(y, m - 1, 1);
}
//是否为闰年
const isLeapYear = function (y) {
  return !(y % 4) && y % 100 || !(y % 400);
}
const getDatesInPrevMonth = function (y, m) {
  let firstDayInMonth = getFirstDateInMonth(y, m).getDay();
  let dates = 0;
  if (~firstDayInMonth) {
    if (firstDayInMonth > firstDay) {
      dates = firstDayInMonth - firstDay
    } else if (firstDayInMonth === firstDay) {
      dates = 0;
    } else {
      dates = 6 - firstDay + 1 + firstDayInMonth;
    }
  }
  return dates;
}
const getDatesInNextMonth = function (y, m) {
  return (opts.weekMode ? 6 : getWeeksInMonth(y, m)) * 7 - getDatesInPrevMonth(y, m) - getDatesInMonth(y, m);
}
const getDatesInMonth = function (y, m) {
  --m;
  return m === 1 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m];
}
const getWeeksInMonth = function (y, m) {
  var datesInMonth = getDatesInMonth(y, m) - 7 + getDatesInPrevMonth(y, m);
  return Math.ceil(datesInMonth / 7) + 1 || 0;
}
const getDatesInYear = function (y, m, d) {
  let _d = 0;
  let i = 1;
  while (i < m) {
    _d = _d + (i === 2 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m - 1]);
    i++;
  }
  _d += d;
  return _d;
}

const getWeeksInYear = function(y,m ,d){
   let _d = getDatesInYear(y, m, d);
   return Math.round(_d, 7);
};

const getWeekTitles = function () {
  tag.weekTitles = weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay));
}
const str2 = function (d) {
  return (d > 9 ? '' : '0') + d;
}
//格式化日期
const formatDate = function (y, m, d) {
  if (opts.dateTimeFormat) {
    return opts.dateTimeFormat(y, m, d);
  }
  return (y + '-' + str2(m)) + (d ? ('-' + str2(d)) : '');
}
const formatDate2 = function (d) {
  if (typeof d === 'string') {
    return d;
  } else if (d) {
    return formatDate(d.getFullYear(), d.getMonth() + 1, d.getDate())
  }
  return '';
}
//进行日期快速比较及确认日期是否选择 不能用formatDate2  防止需要的格式数据为y/m/d  造成2016/9/10 > 2016/10/1
const formatDate3 = function (y, m, d) {
  if (arguments.length < 3) {
    return '' + (typeof y === 'object' ?  y.getFullYear() + str2(y.getMonth() + 1) + str2(y.getDate()) : '');
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
      let _y, _m, _d, _c = 0;
      if (datesInPrevMonth) {
        _y = y1;
        _m = m1;
        _d = d1 - datesInPrevMonth + 1;
        _c = -1;
        --datesInPrevMonth
      } else if (c2 < d) {
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
      let _date = new Date(_y, _m - 1, _d);
      //将YMD暂存，进行比较日期
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
      }
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
      if (r.current) {
        r.valid = 1;
      } else if (opts.isRange) {
        if ((rls && rls > r.date._str) || (rle && rle < r.date._str)) {
          r.valid = 2;
        }
      } else if ((mis && mis > r.date._str) || (mas && mas < r.date._str)) {
        r.valid = 3;
      }
      j++;
      wd.push(r);
      viewDates[r.dateformat] = r;
    }
    weekDates.push(wd);
    i++;
  }
  if(changeDateStr && opts.onChange){
    opts.onChange(changeDateStr === -1 ? null : viewDates[changeDateStr],tag);
    changeDateStr = 0;
  }
  return {
    weekDates: weekDates,
    viewDates: viewDates
  }
}

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
}

tag.prevMonth = function (e) {
  if (tag.prevMonthDisable) {
    e ? e.preventUpdate = true : '';
    return;
  }
  changeView(-1);
  if(!e){
    tag.update();
  }

}
tag.nextMonth = function (e) {
  if (tag.nextMonthDisable) {
    e ? e.preventUpdate = true : '';
    return;
  }
  changeView(1);
  if(!e){
    tag.update();
  }
}

//选择日期排序
tag.getSelectDates = function () {
  if (!selectDates) {
    selectDates = (opts.selectDates || []).concat();
  }
  selectDateStr = [];
  selectDates = selectDates.filter(function (d) {
    var s = formatDate3(d);
    if (opts.isRange && ((rls && rls > s) || (rle && rle < s))) {
      return false
    } else if ((mis && mis > s) || (mas && mas < s)) {
      return false;
    }
    return true;
  })

  selectDates.sort(function (a, b) {
    return a - b;
  });
  selectDates.forEach(function (d) {
    selectDateStr.push(formatDate2(d));
  })


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
  }
}

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
    c ? classNames = classNames.concat(c) : '';
  }
  return classNames.join(' ')
}
//范围值
let rs, re, rls, rle, selectDates, selectDateStr, mis, mas;
//默认日期  配置日期  范围起点  选择日期最小的一个   今天
let defaultDate
//当前日历的年月
let curY;
let curM;
let lastY;
let lastM;
let switchDirection;
let rangeLimit = opts.rangeLimit || [];
let switchWithAnimation = opts.switchWithAnimation === undefined && true || opts.switchWithAnimation;
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
    rs = formatDate3(selectDates[0].getFullYear(), selectDates[0].getMonth() + 1, selectDates[0].getDate())
  }
  if (selectDates[1] && opts.isRange) {
    re = formatDate3(selectDates[1].getFullYear(), selectDates[1].getMonth() + 1, selectDates[1].getDate());
  }
  defaultDate = opts.defaultDate || selectDates[0] || new Date();
  curY = defaultDate.getFullYear();
  curM = defaultDate.getMonth() + 1;
}

//before-mount在update之后执行
//tag.on('before-mount', function(){
init();
//})
tag.on('update', function () {
  if (switchWithAnimation && switchDirection) {
    tag.otherData = {
      title: lastY + '年' + lastM + '月',
      weekdates: tag.curData.weekdates
    }
  }
  let _d = getCalendarViewDate(curY, curM);
  tag.curData = {
    title: curY + '年' + curM + '月',
    weekdates: _d.weekDates,
    viewdates: _d.viewDates
  }
  if (opts.switchViewOverLimit) {
    let firstDateStr = formatDate3(curY, curM, 1);
    let lastDateStr = formatDate3(curY, curM, getDatesInMonth(curY, curM));
    if (firstDateStr <= mis) {
      tag.prevMonthDisable = true;
    } else {
      tag.prevMonthDisable = false;
    }
    if (mas && lastDateStr >= mas) {
      tag.nextMonthDisable = true;
    } else {
      tag.nextMonthDisable = false;
    }
  }
});
let timer = null;
let changeDateStr = 0;
//动画
tag.on('updated', function () {
  if (switchWithAnimation && switchDirection) {
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
      c2 = 'calendar-fadeOutLeft'
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
    }, duration * 1000)
  }
})

tag.checkDate = function (e) {
  let date = e.item.date;
  let nocheckDate;
  if (date.valid !== 0) {
    if (opts.switchViewByOtherMonth) {
      if ((date.current === -1 && !tag.prevMonthDisable) || (date.current === 1 && !tag.nextMonthDisable)) {
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
      nocheckDate = -1;
    } else if (!rs || (rs && (rs > date.date._str) || re)) {
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
      e.srcElement.classList.add('riot-calendar-scaleOut')
      var i = selectDateStr.indexOf(date.dateformat);
      selectDateStr.splice(i, 1);
      selectDates.splice(i, 1);
      nocheckDate = -1;

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
  if(opts.onChange){
    changeDateStr = nocheckDate || date.dateformat
  }
}

