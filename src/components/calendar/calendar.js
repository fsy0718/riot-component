/**
 * @module riot-calendar
 * @description 基于riot的日历，默认日历视图由defaultDate|selectDates|new Date()按顺序提供，<a href="../demo/calendar.html">实例</a>
 */
/**
 * Tag构造函数
 * @external Tag
 * @see http://riotjs.com/api/#tag-instance
 */
/**
 * onChange 函数说明
 * @callback onChangeCall
 * @param {riot-date} date 当前被点击riot-date对象
 * @param {calendarTag} tag 当前riot-calendar实例对象
 */
/**
 * dateTimeFormat 函数说明
 * @callback dateTimeFormatCall
 * @param {number} y 年份
 * @param {number} m 月份
 * @param {number} d 天数
 */
/**
 * getSelectDates 函数说明
 * @callback getSelectDatesCall
 * @returns {selectDateObj}
 */
/**
 * switchCalendarByDate 函数说明
 * @since 0.0.3beta1
 * @callback switchCalendarByDateCall
 * @param {date} 需要跳转的日期
 * @return {boolean} 跳转是否成功，日期如果超出受限范围[rangeLimit/minDate/maxDate]且switchViewOverLimit=true，则跳转不成功，返回false， 如果跳转日期就是当前日历视图也不会跳转，返回false
 */
/**
 * disabledDate 不可选日期函数说明
 * @since 0.0.2
 * @callback disabledDateCall
 * @param {riot-date} date 当前正在渲染的riot-date对象
 */
/**
 * beforeShowDate 个性化日期显示
 * @since 0.0.3beta1
 * @callback beforeShowDateClass
 * @param {riot-date} data当前正在渲染的riot-date对象
 * @return {date-diy} 返回个性化后的html片段及类名，如果为string则为html
 */
/**
 * onRangeGapInvalid range时选择区间不合minRangeGap与maxRangeGap时回调函数，如果无参数，则默认将rangeEnd变为rangeStart
 * @since 0.0.3beta1
 * @callback rangeGapInvalidCall
 * @param {string} invalidType 非法类型 'min'或'max'
 * @return {boolean} 是否继续执行将rangeEnd替换成rangeStart
 */
/**
 * 扩展Tag实例
 * @see http://riotjs.com/api/#tag-instance
 * @typedef {object} calendarTag
 * @extends external:Tag
 * @property {function} prevMonth  选择前一个月,不能传参数
 * @property {function} nextMonth  选择下一个月，不能传参数
 * @property {getSelectDatesCall} getSelectDates 返回当前选择日期对象
 * @property {switchCalendarByDateCall} switchCalendarByDate 跳转到指定日期
 */
/**
 * @typedef {object} selectDateObj
 * @property {date[]} dates  被选中排序后的Date数组或空数组
 * @property {string[]} dateStr 被选中排序后并经过opts.dateTimeFormat格式化后的日期字符串或空数组
 */
/**
 * @typedef {(object|string)} date-diy
 * @property {string} html 个性化的日期html片段
 * @property {string} className 个性化的日期类名，多个以空格分隔
 * 
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
 * @property {number} disable        表示当前日期是否可用  0:表示可用  1:表示其它月  2:表示超出range范围  3:表示超出min-max范围
 */
/**
 * @function riot-calendar
 * @param {object} opts
 * @param {boolean}   [opts.autoOk=false]                是否自动保存
 * @param {date}      [opts.defaultDate]                 默认日期
 * @param {date}      [opts.minDate]                     最小日期
 * @param {date}      [opts.maxDate]                     最大日期
 * @param {boolean}   [opts.isRange]                     是否为选择范围
 * @param {date[]}    [opts.rangeLimit]                  选择的范围
 * @param {boolean}   [opts.weekMode=false]              是否固定星期 true 固定
 * @param {number}    [opts.firstDay=0]                  每周的第一天
 * @param {boolean}   [opts.isMultiple]                  是否为多选
 * @param {date[]}    [opts.selectDates]                 选中的日期
 * @param {boolean}   [opts.switchViewByOtherMonth=false] 表示点击其它月份是否切换日历视图
 * @param {boolean}   [opts.switchViewOverLimit=false]   表示超出最小与最大日历是否能切换日历视图
 * @param {boolean}   [opts.showOtherMonthDates=true]      是否显示其它月的日期 @since 0.0.3beta1
 * @param {boolean}   [opts.switchWithAnimation=true]    切换时是否需要动画
 * @param {string}    [opts.animationTimingFunction=cubic-bezier(0.445, 0.05, 0.55, 0.95)]      动画函数
 * @param {number}    [opts.animationDuration=0.45]       动画待续时间  默认为0.45s
 * @param {onChangeCall}  [opts.onChange]                 日期被点击时的回调函数
 * @param {dateTimeFormatCall} [opts.dateTimeFormat]      自定义日历显示格式
 * @param {disabledDateCall}   [opts.disabledDate]    更精细的不可选日期控制函数
 * @param {beforeShowDateCall} [opts.beforeShowDate]  个性自定义每日显示样式
 * @param {number}        [opts.minRangeGap]        range时最小选择区间
 * @param {number}        [opts.maxRangeGap]          range时最大选择区间
 * @param {rangeGapInvalidCall} [opts.onRangeGapInvalid] range选择不合minRangeGap与maxRangeGap时回调函数
 * @param {(number|number[])} [opts.numberOfMonths]   设置一次显示几个月  number 一行显示的月份数  number[] 显示的行数与列数，设置opts.numberOfMonths则默认opts.showOtherMonthDates为false
 * @returns {calendarTag}
 * @example
 *  riot.mount('riot-calendar', opts)
 */
import f from "../common/common";
const addClass = f.addClass;
const removeClass = f.removeClass;
const css = f.css;
let tag = this;
let state = {};
tag.showOtherMonthDates = f.isUndefined(opts.showOtherMonthDates) ? true : opts.showOtherMonthDates;
if(opts.numberOfMonths){
  let col;
  let row;
  if(f.isNumber(opts.numberOfMonths)){
    col = parseInt(opts.numberOfMonths);
    row = 1;
  }
  if(f.isArray(opts.numberOfMonths)){
    row = parseInt(opts.numberOfMonths[0]) || 0;
    col = parseInt(opts.numberOfMonths[1]) || 0;
  }
  tag.showOtherMonthDates = false;
  state.numberOfMonths = row * col;
  tag.mutipleItems = col;
}

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
const getWeeksInYear = function (y, m, d) {
  let _d = getDatesInYear(y, m, d);
  return Math.round(_d, 7);
};
const getWeekTitles = function () {
  tag.weekTitles = weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay));
}
const cloneDate = function (date) {
  return new Date(date.getTime());
};
const cloneAsDate = function (date) {
  const clonedDate = cloneDate(date);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate;
};
const addDays = function (date, d) {
  const newDate = cloneDate(date);
  newDate.setDate(date.getDate() + d);
  return newDate;
}
const str2 = function (date) {
  return (date > 9 ? '' : '0') + date;
}
//格式化日期
const formatDate = function (y, m, d) {
  if (opts.dateTimeFormat) {
    return opts.dateTimeFormat(y, m, d);
  }
  return (y + '-' + str2(m)) + (d ? ('-' + str2(d)) : '');
}
const formatDate2 = function (date) {
  if (typeof date === 'string') {
    return date;
  } else if (date) {
    return formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
  }
  return '';
}
//进行日期快速比较及确认日期是否选择 不能用formatDate2  防止需要的格式数据为y/m/d  造成2016/9/10 > 2016/10/1
const formatDate3 = function (y, m, d) {
  if (arguments.length < 3) {
    return '' + (typeof y === 'object' ? y.getFullYear() + str2(y.getMonth() + 1) + str2(y.getDate()) : '');
  }
  return '' + y + str2(m) + str2(d);
};
const getViewDates = function (y, m, order) {
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
  //初始化值
  let rangeEndInOtherMonth = false;
  let rangeStartInOtherMonth = false;
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
      let r = {
        current: _c,
        date: _date,
        y: _y,
        m: _m,
        d: _d,
        w: _date.getDay(),
        dateformat: formatDate(_y, _m, _d),
        disable: 0,
        _format: formatDate3(_y, _m, _d),
        _i: order
      }
      //在范围中
      if (opts.isRange) {
        if (rs) {
          if (rs === r._format) {
            r.range = -1;
            r.select = 1;
            if(r.current !== 0){
              rangeStartInOtherMonth = true;
            }
          } else if (re) {
            if (r._format === re) {
              r.range = 1;
              r.select = 1;
              if(r.current !== 0){
                rangeEndInOtherMonth = true;
              }
            } else if (r._format > rs && r._format < re) {
              r.range = 0;
            }
          }
        }
      } else if (selectDateStr.indexOf(r.dateformat) > -1) {
        r.select = 1;
      }
      if (r.current) {
        r.disable = 1;
      } else if (opts.isRange && (rls && rls > r._format) || (rle && rle < r._format)) {
        r.disable = 2;
      } else if ((mis && mis > r._format) || (mas && mas < r._format)) {
        r.disable = 3;
      }
      opts.disabledDate && opts.disabledDate(r);
      //有当前变化值才会有上次选中值,动画值
      if (curChangeDateStr) {
        //当前就是变化的日期
        if (curChangeDateStr === r.dateformat) {
          r._animation = r.select === 1 ? 1 : -1;
          r._change = 1;
        }
        else if (lastSelectDateStr.indexOf(r.dateformat) > -1) {
          if (opts.isRange) {
            if (selectDateStr.length === 1) {
              if (lastSelectDateStr.length === 1 || (lastSelectDateStr.length === 2 && (selectDateStr[0] !== lastSelectDateStr[0] || selectDateStr[0] !== lastSelectDateStr[1]))) {
                r._animation = -1;
                r._change = 1;
              }
            }
          } else if (!opts.isMultiple) {
            r._animation = -1
            r._change = 1;
          }
        }
      }
      j++;
      wd.push(r);
      viewDates[r.dateformat] = r;
    }
    weekDates.push(wd);
    i++;
  }
  return {
    weekDates: weekDates,
    viewDates: viewDates,
    rangeStartInOtherMonth: rangeStartInOtherMonth,
    rangeEndInOtherMonth: rangeEndInOtherMonth
  }
}
const getViewItems = function(y,m){
  state.viewItems = [{y: y, m: m}]
  if(state.numberOfMonths > 1){
    let i = 1;
    while(i < state.numberOfMonths){
      ++m;
      if(m > 12){
        m = 1;
        y += 1;
      }
      state.viewItems.push({
        y: y,
        m: m
      });
      i++;
    }
  }
}
const changeView = function (direction) {
  let isPrev = direction === -1;
  let item = state.viewItems[isPrev ? 0 : state.viewItems.length - 1]

  let m = item.m + direction;
  let y = item.y;
  if(isPrev && m < 1){
    --y;
    m =  12;
  }else if(m > 12){
    ++y;
    m = 1;
  }
  //清除不显示的月份并更新新的月份
  state.viewItems[isPrev ? 'pop' : 'shift']();
  state.viewItems[isPrev ? 'unshift' : 'push']({y:y,m:m})
  state.viewDirection = direction;
}
const checkDateIsValid = function (y, m) {
  if (opts.switchViewOverLimit) {
    let firstDateStr = formatDate3(y, m, 1);
    let lastDateStr = formatDate3(y, m, getDatesInMonth(y, m));
    if (opts.isRange) {
      if (rle && firstDateStr >= rle || rls && lastDateStr <= rls) {
        return false
      }
    }
    if (mis && lastDateStr <= mis || mas && firstDateStr >= mas) {
      return false;
    }
  }
  return true;
}
tag.prevMonth = function (e) {
  if (tag.prevMonthDisable) {
    e ? e.preventUpdate = true : '';
    return;
  }
  changeView(-1);
  if (!e) {
    tag.update();
  }
}
tag.nextMonth = function (e) {
  if (tag.nextMonthDisable) {
    e ? e.preventUpdate = true : '';
    return;
  }
  changeView(1);
  if (!e) {
    tag.update();
  }
}
tag.switchCalendarByDate = function (date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let viewItemsStart = state.viewItems[0];
  let viewItemsEnd = state.viewItems[state.viewItems.length - 1];
  let s1 = viewItemsStart.y + str2(viewItemsStart.m);
  let s2 = viewItemsEnd.y + str2(viewItemsEnd.m);
  let s3 = y + str2(m);
  if(s3 < s1){
    state.viewDirection = -1;
  }else if(s3 > s2){
    state.viewDirection = 1;
  }else{
    return false;
  }
  let result = checkDateIsValid(y, m);
  if (result) {
    getViewItems(y,m);
    tag.update()
  }
  return result;

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
      console.warn('riot-calendr实例类名为%s的value中%s由于不符合rangeLimit条件而被移除', opts.class || 'riot-calendar', d)
      return false
    } else if ((mis && mis > s) || (mas && mas < s)) {
      console.warn('riot-calendr实例类名为%s的value中%s由于不符合minDate与maxDate条件而被移除', opts.class || 'riot-calendar', d)
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
tag.parseDateBoxClass = function (date) {
  if (!date) {
    return '';
  }
  let classNames = [];
  if (tag.opts.isRange && rs && re) {
    date.range === 0 && classNames.push('range--area');
    if (tag.showOtherMonthDates) {
      date.range === -1 && classNames.push('range--start');
      date.range === 1 && classNames.push('range--end');
    }else{
      let rso = tag.viewDatas[date._i].rangeStartInOtherMonth;
      let reo = tag.viewDatas[date._i].rangeEndInOtherMonth;
      if((date.current === -1 && rso) || (date.current === 1 && reo)){
        classNames.push('range--area');
      }
      if(!rso && date.range === -1){
        classNames.push('range--start');
      }
      if(!reo && date.range === 1){
        classNames.push('range--end');
      }
    }
  }
  return classNames.join(' ')
}
//范围值
let rs, re, rls, rle, selectDates, selectDateStr, mis, mas;
//默认日期  配置日期  范围起点  选择日期最小的一个   今天
let defaultDate
let rangeLimit = opts.rangeLimit || [];
let switchWithAnimation = opts.switchWithAnimation === undefined && true || opts.switchWithAnimation;
//curChangeDateStr，lastSelectDates 两个用处，一、记录用户当前点击日期，二、用于触发被选中日期的动画,
let curChangeDateStr = undefined;
let lastSelectDateStr = [];
let lastChangeViewItemsOrder = undefined;
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
  getViewItems(defaultDate.getFullYear(), defaultDate.getMonth() + 1);
}
//before-mount在update之后执行
//tag.on('before-mount', function(){
init();
//})
tag.on('update', function () {
  if (switchWithAnimation && state.viewDirection) {
    tag.otherViewDatas = tag.viewDatas
  }
  tag.viewDatas = [];
  state.viewItems.forEach(function(item,index){
    let _d = getViewDates(item.y, item.m, index);
    tag.viewDatas.push({
      title: item.y + '年' + item.m + '月',
      weekdates: _d.weekDates,
      viewdates: _d.viewDates,
      rangeEndInOtherMonth: _d.rangeEndInOtherMonth,
      rangeStartInOtherMonth: _d.rangeStartInOtherMonth
    });
  })
  if (opts.switchViewOverLimit) {
    let y1 = state.viewItems[0].y;
    let m1 = state.viewItems[0].m;
    let y2 = state.viewItems[state.viewItems.length - 1].y;
    let m2 = state.viewItems[state.viewItems.length - 1].m;
    let firstDateStr = formatDate3(y1, m1, 1);
    let lastDateStr = formatDate3(y2, m2, getDatesInMonth(y2, m2));
    if (opts.isRange && firstDateStr <= rls || firstDateStr <= mis) {
      tag.prevMonthDisable = true;
    } else {
      tag.prevMonthDisable = false;
    }
    if ((opts.isRange && rle && lastDateStr >= rle) || (mas && lastDateStr >= mas)) {
      tag.nextMonthDisable = true;
    } else {
      tag.nextMonthDisable = false;
    }
  }
});
let timer = null;
//动画
tag.on('updated', function () {
  //增加多个的animation
  lastSelectDateStr = selectDateStr.concat();
  if (switchWithAnimation && state.viewDirection) {
    let $cur = f.$$('.riot-calendar__body--cur', tag.root);
    let $curT = f.$$('.title__cur', tag.root);
    let $other = f.$$('.riot-calendar__body--other', tag.root);
    let $otherT = f.$$('.title__other', tag.root);
    if (opts.animationTimingFunction) {
      css($cur, 'animationTimingFunction', opts.animationTimingFunction);
      css($other, 'animationTimingFunction', opts.animationTimingFunction);
      css($curT, 'animationTimingFunction', opts.animationTimingFunction);
      css($otherT, 'animationTimingFunction', opts.animationTimingFunction);
    }
    let duration = parseFloat(opts.animationDuration) || 0.45;
    let c1;
    let c2;
    if (duration !== 0.45) {
      let _duration = '' + duration + 's';
      css($cur, 'animationDuration', _duration);
      css($other, 'animationDuration', _duration);
      css($curT, 'animationDuration', _duration);
      css($otherT, 'animationDuration', _duration);
    }
    if (state.viewDirection === 1) {
      c1 = 'calendar-fadeInRight';
      c2 = 'calendar-fadeOutRight';
    } else {
      c1 = 'calendar-fadeInLeft';
      c2 = 'calendar-fadeOutLeft'
    }
    addClass($cur, 'animation ' + c1);
    addClass($other, 'animation ' + c2);
    addClass($curT, 'animation ' + c1);
    addClass($otherT, 'animation ' + c2);
    clearTimeout(timer);
    timer = setTimeout(function () {
      tag.otherData = null;
      removeClass($cur, 'animation ' + c1);
      removeClass($other, 'animation ' + c2);
      addClass($other, 'riot-calendar__body--hidden');
      removeClass($curT, 'animation ' + c1);
      removeClass($otherT, 'animation ' + c2);
      addClass($otherT, 'title--hidden');
      clearTimeout(timer);
      delete state.viewDirection;
    }, duration * 1000)
  }
  //在更新完毕后，需要把tag.curChangeDateStr清除
  if (opts.onChange && curChangeDateStr) {
    opts.onChange(tag.viewDatas[lastChangeViewItemsOrder].viewdates[curChangeDateStr], tag);
    curChangeDateStr = undefined;
    lastChangeViewItemsOrder = undefined;
  }
})
const setRangeStart = function (date) {
  selectDates = [date.date];
  selectDateStr = [date.dateformat];
  rs = date._format;
  re = undefined;
}
const checkRangeGapLimit = function (type, date) {
  //如果为1，则不用判断,
  let rangeEnd = addDays(selectDates[0], opts[type === 'min' ? 'minRangeGap' : 'maxRangeGap'] - 1);//包含起始日期
  let rangeEndStr = formatDate3(rangeEnd);
  let diff = rangeEndStr - date._format;
  var isMin = type === 'min';
  if (isMin && diff > 0 || !isMin && diff < 0) {
    let continueNext = true;
    if (opts.onRangeGapInvalid) {
      continueNext = opts.onRangeGapInvalid(type, rangeEnd);
    }
    if (continueNext) {
      setRangeStart(date)
      return 0;
    } else {
      return -1;
    }
  }
  return 1;
}
tag.checkDate = function (e) {
  let date = e.item.date;
  if (date.disable !== 0) {
    if (opts.switchViewByOtherMonth && ((date.current === -1 && !tag.prevMonthDisable) || (date.current === 1 && !tag.nextMonthDisable))) {
      changeView(date.current);
    } else {
      e.preventUpdate = true;
      return;
    }
  }
  if (opts.isRange) {
    if (rs && !re && rs === date._format) {
      //如果只有rs且点击就是rs，取消选中rs
      selectDates = [];
      selectDateStr = [];
      rs = undefined;
      re = undefined;
    } else if (!rs || (rs && (rs > date._format) || re)) {
      //如果无rs 或 选中日期小于rs 或  已有rs  re 则只有rs
      setRangeStart(date)
    } else {
      //选中re,增加minRangeGap与maxRangeGap判断
      let addEnd1 = 1;
      let addEnd2 = 1;
      if (opts.minRangeGap > 1) {
        addEnd1 = checkRangeGapLimit('min', date);
      }
      if (opts.maxRangeGap) {
        addEnd2 = checkRangeGapLimit('max', date);
      }
      if (addEnd1 > 0 && addEnd2 > 0) {
        selectDates.push(date.date);
        selectDateStr.push(date.dateformat);
        re = date._format;
      }
      if (addEnd1 < 0 || addEnd2 < 0) {
        e.preventUpdate = true;
        return
      }

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
  lastChangeViewItemsOrder = date._i;
}
