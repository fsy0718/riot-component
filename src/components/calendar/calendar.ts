/// <reference path="../../../typings/index.d.ts" />

import RiotDate from "./riotdate";
import { RiotDateInterface } from "./riotdate";
import { eleClassListMethods, isDate, zeroFill, isNumber, isArray, assign, stopUpdateComponent, simpleExtend, $_, $$_, css } from "../common/utils";
import { getWeeksInMonth, getDatesInPrevMonth, getDatesInNextMonth, getDatesInMonth, isRiotDate, addDays } from "./utils";

import riotCalendarTmpl from "./calendar.tag";
import riotCalendarCss from "./calendar.css";

const {removeClass, addClass} = eleClassListMethods;


interface RiotCalendarInterface extends riot.Tag { }

interface riotCalendarDateTimeFormatInterface {
  (date: RiotDateInterface): string
}

interface riotCalendarOptsBeforeShowDateReturnObjectDate {
  (date: RiotDateInterface): { className: string, html: string }
}
interface riotCalendarOptsBeforeShowDateReturnStringDate {
  (date: RiotDateInterface): string
}

export type riotCalendarOptsBeforeShowDate = riotCalendarOptsBeforeShowDateReturnObjectDate | riotCalendarOptsBeforeShowDateReturnStringDate;

export interface riotCalendarOptsInterface {
  autoOk?: boolean,
  defaultDate?: Date|RiotDate,
  minDate?: Date,
  maxDate?: Date,
  isRange?: boolean,
  rangeLimit?: Date[],
  weekMode?: boolean,
  firstDay?: number,
  isMultiple?: boolean,
  selectDates?: Date[],
  switchViewByOtherMonth?: boolean,
  switchViewOverLimit?: boolean,
  showOtherMonthDates?: boolean,
  switchWithAnimation?: boolean,
  animationTimingFunction?: string,
  animationDuration?: number,
  numberOfMonths?: number | number[],
  minRangeGap?: number,
  maxRangeGap?: number,
  disabledOverRangeGap?: boolean,
  beforeChange ?: (date: RiotDate, ctx: RiotCalendarInterface) => boolean,
  onChange?: (date: RiotDate, ctx: RiotCalendarInterface) => void,
  afterChange?: (ctx: RiotCalendarInterface) => void,
  dateTimeFormat?: string | riotCalendarDateTimeFormatInterface,
  disabledDate?: (date: RiotDate) => number,
  beforeShowDate?: riotCalendarOptsBeforeShowDate,
  onRangeGapInvalid?: (invalidType: string, validDate: RiotDate, curDate: RiotDate) => boolean

}

type riotCalendarDateArray = RiotDate[]

interface RiotCalendarSelectDateMaps {
  [index: string]: RiotDate
}

export interface riotCalendarStateInterface {
  selectDates?: RiotCalendarSelectDateMaps,
  selectDatesFormat?: string[],
  viewDatas?: viewDatasInterface[],
  oviewDatas?: viewDatasInterface[],
  viewItems?: viewItemInterface[],
  prevMonthDisable?: boolean,
  nextMonthDisable?: boolean,
  direction?: number,
  timer ?: number
}

export interface riotCalendarPropsInterface {
  weekTitles: string[],
  idx: string,
  rls?: string, //rangeLimit[0]
  rle?: string, // rangeLimit[1]
  mis?: string, //mixDate
  mas?: string, //maxDate
  mutipleItems?: number,
  numberOfMonths?: number,
}


interface viewDatesCacheValueInterface {
  [idex: string]: string[] //缓存格式为 otherMonth/Year/Month/Date
}

interface viewDatesCacheInterface {
  [index: string]: viewDatesCacheValueInterface
}

interface viewDatasInterface {
  dates: riotCalendarDateArray,
  rangeEndInOtherMonth: boolean,
  rangeStartInOtherMonth: boolean,
  title?: string,
  year?: number,
  month?: number
}

interface viewItemInterface {
  year: number,
  month: number,
}

interface checkDateInterface {
  result: boolean,
  y?: number,
  m?: number,
  direction?: number,
  rangeGapType?: string,
  rangeEndValid?: RiotDate
}
export default (function (Tag) {
  const defaultOpts = {
    showOtherMonthDates: true,
    switchWithAnimation: true,
    numberOfMonths: 1,
    firstDay: 0
  }
  function format(): string
  function format(date: Date): string
  function format(date?: number, m?: number, d?: number): string
  function format(date?: Date | number, m?: number, d?: number) {
    if (isDate(date)) {
      return '' + (date as Date).getFullYear() + zeroFill((date as Date).getMonth() + 1) + zeroFill((date as Date).getDate())
    }
    if (arguments.length === 3) {
      return '' + date + zeroFill(m) + zeroFill(d);
    }
    return ''
  }

  const viewDatesCache: viewDatesCacheInterface = {};

  const weekTitles = ['日', '一', '二', '三', '四', '五', '六'];

  const initSelectDatesFormat = function (ctx: RiotCalendar): string[] {
    const {isRange, isMultiple, selectDates = []} = ctx.config;
    const {rls, rle, mis, mas} = ctx.props;
    let selectDatesFormat = [];
    selectDates.forEach(function (d) {
      let s = format(d);
      if (isRange && ((rls && rls > s) || (rle && rle < s))) {
        console.warn('riot-calendr组件value中%s由于不符合rangeLimit条件而被移除', d);
      }
      else if ((mis && mis > s) || (mas && mas < s)) {
        console.warn('riot-calendr组件value中%s由于不符合minDate与maxDate条件而被移除', d);
      }else{
        selectDatesFormat.push(s);
      }

    });
    selectDatesFormat.sort(function (a, b) {
      return a - b
    });
    if (isRange) {
      selectDatesFormat = selectDatesFormat.slice(0, 2);
    }
    else if (!isMultiple) {
      selectDatesFormat = selectDatesFormat.slice(0, 1);
    }
    return selectDatesFormat;

  }
  const dateFormatReg = /(\d{4})(\d{2})(\d{2})/;
  const initSelectDates = function (ctx: RiotCalendar): RiotCalendarSelectDateMaps {
    const {selectDatesFormat} = ctx.state;
    let selectDates = {};
    selectDatesFormat.forEach(function (date) {
      let ymd = date.match(dateFormatReg);
      let riotdate = new RiotDate(+ymd[1], +ymd[2], +ymd[3]);
      parseRiotDateProps(riotdate, ctx);
      //TODO 计算 riotdate.current = riotdate.
      selectDates[date] = riotdate;
    });
    return selectDates;
  }

  const updateSelectDates = function (ctx: RiotCalendar, date: RiotDate): {selectDates:RiotCalendarSelectDateMaps, selectDatesFormat:string[]} {
    const {isRange, isMultiple} = ctx.config;
    let {selectDatesFormat, selectDates} = ctx.state;
    let _format = date.format('YYYYMMDD');
    let rs = selectDatesFormat[0], re = selectDatesFormat[1];
    if (isRange) {
      if (rs && !re && rs === _format) {
        selectDatesFormat = [];
        selectDates = {};
      }
      else if (!rs || (rs && (rs > _format) || re)) {
        selectDatesFormat = [_format];
        selectDates = {
          [_format]: simpleExtend<RiotDate>(date.clone(), { select: 1 }as RiotDate) 
        };  
      } else {
        let _d = {
          [_format] :  simpleExtend<RiotDate>(date.clone(), { select: 1 }as RiotDate)
        }
        selectDatesFormat.push(_format);
        assign(selectDates, _d);
      }
    } else {
      if (date.select) {
        let i = selectDatesFormat.indexOf(_format);
        selectDatesFormat.splice(i, 1);
        delete selectDates[_format];
      } else {
        if (!isMultiple) {
          selectDatesFormat = [_format];
          selectDates = {
            [_format] :  simpleExtend<RiotDate>(date.clone(), { select: 1 }as RiotDate)
          };
        } else {
          selectDatesFormat.push(_format);
          let _d = {
            [_format] : simpleExtend<RiotDate>(date.clone(), { select: 1 }as RiotDate) 
          }
          assign(selectDates, _d);
        }
      }
    }
    return {selectDates, selectDatesFormat};
  }

  const getViewItems = function (y: number, m: number, ctx: RiotCalendar): viewItemInterface[] {
    let viewItems = [{ year: y, month: m }];
    let n = ctx.props.numberOfMonths;
    if (n > 1) {
      let i = 1;
      while (i < n) {
        ++m;
        if (m > 12) {
          m = 1;
          y += 1;
        }
        viewItems.push({
          year: y,
          month: m
        });
        i++;
      }
    }
    return viewItems;
  }

  const updateViewItemsByDirection = function (direction: number, ctx: RiotCalendar): RiotCalendar {
    let isPrev = direction === -1;
    let {viewItems} = ctx.state;
    let item = viewItems[isPrev ? 0 : viewItems.length - 1];
    let m = item.month + direction;
    let y = item.year;
    if (isPrev && m < 1) {
      --y;
      m = 12;
    }
    else if (m > 12) {
      ++y;
      m = 1;
    }
    viewItems[isPrev ? 'pop' : 'shift']();
    viewItems[isPrev ? 'unshift' : 'push']({year:y,month:m});
    return ctx;    
  }

  const parseRiotDateProps = function (date: RiotDate, ctx: RiotCalendar, rangeStartInOtherMonth?: boolean, rangeEndInOtherMonth?: boolean) {
    date.disable = 0;
    const {isRange, dateTimeFormat, disabledOverRangeGap, minRangeGap, maxRangeGap, disabledDate, isMultiple} = ctx.config;
    const {rls, rle, mis, mas} = ctx.props;
    const { selectDatesFormat} = ctx.state;
    let rs = selectDatesFormat[0];
    let re = selectDatesFormat[1];
    if (dateTimeFormat) {
      date.dateformat = date.format(dateTimeFormat)
    }
    let _format = date.format('YYYYMMDD');
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
            date.range = 0
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
    else if (isRange && disabledOverRangeGap && selectDatesFormat.length === 1) {
      let diff = +_format - +rs;
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
  }

  const _getViewDatas = function (y: number, m: number, item: number, ctx: RiotCalendar): viewDatasInterface {
    const {weekMode, firstDay} = ctx.config;
    let reiom = false;
    let rsiom = false;
    let cache = [];
    let viewDates: riotCalendarDateArray = [];
    let weekNum = weekMode ? 6 : getWeeksInMonth(y, m, firstDay);
    let datesInPrevMonth = getDatesInPrevMonth(y, m, firstDay);
    let datesInNextMonth = getDatesInNextMonth(y, m, firstDay, weekMode);
    let d = getDatesInMonth(y, m);
    let i = 0;
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
      let j = 0;
      while (j < 7) {
        let _y, _m, _d, _c = 0;
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
        let riotdate = new RiotDate(_y, _m, _d);
        riotdate.current = _c;
        riotdate.item = item;
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
  }

  const _parseViewDatasFromCache = function (data: string[], item: number, ctx: RiotCalendar): viewDatasInterface {
    let reiom = false;
    let rsiom = false;
    let viewDates = data.map(function (d) {
      let _d = d.split('/');
      let riotdate = new RiotDate(+_d[1], +_d[2], +_d[3]);
      riotdate.current = +_d[0];
      riotdate.item = item;
      parseRiotDateProps(riotdate, ctx, rsiom, reiom);
      return riotdate;
    })
    return {
      dates: viewDates,
      rangeEndInOtherMonth: reiom,
      rangeStartInOtherMonth: rsiom
    };
  }

  const getSingleViewDatas = function (y: number, m: number, item: number, ctx: RiotCalendar): viewDatasInterface {
    const {idx} = ctx.props;
    let key = y + '-' + m;
    let viewDatas: viewDatasInterface;
    if (!viewDatesCache[idx]) {
      viewDatesCache[idx] = {}
    }
    if (!viewDatesCache[idx][key]) {
      viewDatas = _getViewDatas(y, m, item, ctx)
    } else {
      viewDatas = _parseViewDatasFromCache(viewDatesCache[idx][key], item, ctx)
    }
    viewDatas.title = y + '年' + m + '月';
    viewDatas.year = y;
    viewDatas.month = m
    return viewDatas;
  }

  const setViewAnimation = function (ctx: RiotCalendar) {
    const {root, config, state} = ctx;
    const {animationTimingFunction, animationDuration} = config;
    let {timer, direction} = state;
    let $cur = $$_('.riot-calendar__body--cur', root);
    let $curT = $$_('.title__cur', root);
    let $other = $$_('.riot-calendar__body--other', root);
    let $otherT = $$_('.title__other', root);
    if (animationTimingFunction) {
      css($cur, 'animationTimingFunction', animationTimingFunction);
      css($other, 'animationTimingFunction', animationTimingFunction);
      css($curT, 'animationTimingFunction', animationTimingFunction);
      css($otherT, 'animationTimingFunction', animationTimingFunction);
    }
    let duration = parseFloat(animationDuration + '') || 0.45;
    let c1;
    let c2;
    if (duration !== 0.45) {
      let _duration = '' + duration + 's';
      css($cur, 'animationDuration', _duration);
      css($other, 'animationDuration', _duration);
      css($curT, 'animationDuration', _duration);
      css($otherT, 'animationDuration', _duration);
    }
    if (direction === 1) {
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
      removeClass($cur, 'animation ' + c1);
      removeClass($other, 'animation ' + c2);
      removeClass($curT, 'animation ' + c1);
      removeClass($otherT, 'animation ' + c2);
      clearTimeout(timer);
    }, duration * 1000)
  }

  const getViewDatas = function (ctx: RiotCalendar): viewDatasInterface[] {
    const {viewItems} = ctx.state;
    let viewDatas = viewItems.map(function (item, index) {
      return getSingleViewDatas(item.year, item.month, index, ctx);
    });
    return viewDatas;
  }

  const changeViewByDirection = function (e, type, ctx: RiotCalendar) {
    if (ctx.state[(type === -1 ? 'prev' : 'next') + 'MonthDisable']) {
      return stopUpdateComponent(e);
    }
    updateViewItemsByDirection(type, ctx);
    updateState(ctx, null, null, { direction: type });
    !e && ctx.update();
  }

  const checkViewSwitchStatus = function (ctx: RiotCalendar) {
    const {switchViewOverLimit, isRange} = ctx.config;
    let prevMonthDisable = false, nextMonthDisable = false;
    if (switchViewOverLimit) {
      const {rls, mis, rle, mas} = ctx.props
      const {viewDatas} = ctx.state;
      let y1 = viewDatas[0].year;
      let m1 = viewDatas[0].month;
      let l = viewDatas.length - 1;
      let y2 = viewDatas[l].year;
      let m2 = viewDatas[l].month;
      let firstDateFormat = format(y1, m1, 1);
      let lastDateFormat = format(y2, m2, getDatesInMonth(y2, m2));
      if (isRange && firstDateFormat <= rls || firstDateFormat <= mis) {
        prevMonthDisable = true;
      } else {
        prevMonthDisable = false;
      }
      if ((isRange && rle && lastDateFormat >= rle) || (mas && lastDateFormat >= mas)) {
        nextMonthDisable = true;
      } else {
        nextMonthDisable = false;
      }
    }

    return { nextMonthDisable, prevMonthDisable }
  }

  const checkSwitchViewDateIsValid = function (ctx: RiotCalendar, y: number, m: number): boolean {
    const {rle, rls, mis, mas} = ctx.props
    if (ctx.config.switchViewOverLimit) {
      let firstDateFormat = format(y, m, 1);
      let lastDateFormat = format(y, m, getDatesInMonth(y, m));
      if (ctx.config.isRange) {
        if (rle && firstDateFormat >= rle || rls && lastDateFormat <= rls) {
          return false;
        }
      }
      if (mis && lastDateFormat <= mis || mas && firstDateFormat >= mas) {
        return false;
      }
    }
    return true;
  }

  const checkDateIsOverRangeGapLimit = function (type: string, dateformat:string, ctx: RiotCalendar) {
    const {selectDatesFormat, selectDates} = ctx.state;
    if(selectDatesFormat.length !== 1){
      return {
        result: true
      }
    }
    let isMin = type === 'min';
    let rs = selectDatesFormat[0]
    let rangeEnd = new RiotDate(addDays(selectDates[rs]._d, ctx.config[isMin ? 'minRangeGap' : 'maxRangeGap'] - 1));
    let res = rangeEnd.format('YYYYMMDD')
    if (isMin && res > dateformat || !isMin && res < dateformat) {
      return {
        rangeGapType: type,
        result: false,
        rangeEnd
      }
    } else {
      return {
        result: true
      }
    }
  }

  const checkDateIsValid = function (date: RiotDate | Date, ctx: RiotCalendar, switchView?: boolean): checkDateInterface {
    if (switchView) {
      let y: number;
      let m: number;
      if (isRiotDate(date)) {
        y = (date as RiotDate).year() as number;
        m = (date as RiotDate).month() as number + 1;
      }
      if (isDate(date)) {
        y = (date as Date).getFullYear();
        m = (date as Date).getMonth() + 1;
      }
      return {
        result: checkSwitchViewDateIsValid(ctx, y, m),
        y: y,
        m: m
      }
    }
    let result: checkDateInterface = {
      result: true
    }
    let resultFalse = { result: false };
    const {switchViewByOtherMonth, isRange, minRangeGap, maxRangeGap} = ctx.config;
    const {mis, mas, rls, rle} = ctx.props;
    const {prevMonthDisable, nextMonthDisable} = ctx.state
    if ((date as RiotDate).disable !== 0) {
      if (switchViewByOtherMonth && (((date as RiotDate).current === -1 && !prevMonthDisable) || (date as RiotDate).current === 1 && !nextMonthDisable)) {
        result.direction = (date as RiotDate).current
      } else {
        return resultFalse
      }
    }
    let _format = (date as RiotDate).format('YYYYMMDD');
    if (_format < mis || mas && _format > mas) {
      return resultFalse
    }
    if (isRange) {
      if (_format < rls || rle && _format > rle) {
        return resultFalse
      }
      let r1, r2;
      if (minRangeGap > 1) {
        r1 = checkDateIsOverRangeGapLimit('min', _format,  ctx)
      }
      if (maxRangeGap > 1) {
        r2 = checkDateIsOverRangeGapLimit('max', _format, ctx)
      }
      if ((r1 && !r1.result) || (r2 && !r2.result)) {
        return {
          result: false,
          rangeGapType: r1.rangeGapType || r2.rangeGapType
        }
      }

    }
    return result;
  }

  const initConfig = function (opts: riotCalendarOptsInterface): riotCalendarOptsInterface {

    return assign({}, defaultOpts, opts);
  }

  const initState = function (ctx: RiotCalendar) {
    let selectDatesFormat = initSelectDatesFormat(ctx);
    return { selectDatesFormat };
  }

  const initProps = function (ctx: RiotCalendar): riotCalendarPropsInterface {
    const {config} = ctx;
    const {firstDay, rangeLimit = [], minDate, maxDate, isRange, isMultiple, weekMode, numberOfMonths} = config;
    let rls = format(rangeLimit[0]);
    let rle = format(rangeLimit[1]);
    let mis = format(minDate);
    let mas = format(maxDate);
    if (isRange) {
      //判断rangeLimit与misDate|masDate的大小
      mis && rls && rls < mis ? rls = mis : '';
      mas && rle && rle > mas ? rle = mas : '';
    }
    let props: riotCalendarPropsInterface = {
      weekTitles: weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay)),
      rls: rls,
      rle: rle,
      mis: mis,
      mas: mas,
      idx: '' + firstDay + '/' + (weekMode ? 1 : 0)
    }
    if (numberOfMonths) {
      let col, row = 1;
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
  }

  const getDefaultYearAndMonth = function (ctx: RiotCalendar): { year: number, month: number } {
    const {selectDatesFormat} = ctx.state;
    const {defaultDate} = ctx.config;
    let year: number, month: number;
    if (isDate(defaultDate)) {
      year = (defaultDate as Date).getFullYear();
      month = (defaultDate as Date).getMonth() + 1;
    }else if(isRiotDate(defaultDate)){
      year = (defaultDate as RiotDate).year() as number;
      month = (defaultDate as RiotDate).month() as number;
    }
    else if (selectDatesFormat[0]) {
      let ymd = selectDatesFormat[0].match(dateFormatReg);
      if (ymd) {
        year = +ymd[1];
        month = +ymd[2];
      }
    } else {
      let date = new Date();
      year = date.getFullYear();
      month = date.getMonth() + 1;
    }
    return { year, month }
  }

  const updateState = function (ctx: RiotCalendar, y?: number, m?: number, state?: riotCalendarStateInterface) {
    if (state) {
      assign(ctx.state, state);
    }
    if (y) {
      assign(ctx.state, { viewItems: getViewItems(y, m, ctx) });
    }
    if (ctx.state.direction && ctx.config.switchWithAnimation) {
      assign(ctx.state, { oviewDatas: ctx.state.viewDatas })
    }
    assign(ctx.state, {
      viewDatas: getViewDatas(ctx)
    });
    assign(ctx.state,checkViewSwitchStatus(ctx))

    return ctx;
  }
  //TODO 当为isMultiple时，取消选中有bug
  class RiotCalendar extends riot.Tag {
    config: riotCalendarOptsInterface;
    state: riotCalendarStateInterface;
    props: riotCalendarPropsInterface;
    get name() {
      return 'riot-calendar';
    }

    get tmpl() {
      return riotCalendarTmpl;
    }

    get css() {
      return riotCalendarCss;
    }

    get attrs() {
      return 'data-is="riot-calendar"';
    }

    onCreate(opts: riotCalendarOptsInterface) {
      var self = this;
      self.config = initConfig(opts);
      self.props = initProps(self);
      self.state = initState(self);
      let ym = getDefaultYearAndMonth(self);
      updateState(self, ym.year, ym.month);
      self.state.selectDates = initSelectDates(self);
      self.on('updated', function () {
        if (self.config.switchWithAnimation && self.state.direction) {
          setViewAnimation(self);
        }
        delete self.state.direction;
        self.config.afterChange && self.config.afterChange(self)
      });
    }

    prevMonth(e) {
      changeViewByDirection(e, -1, this);
    }

    nextMonth(e) {
      changeViewByDirection(e, 1, this);
    }

    getSelectDates(sort: boolean): riotCalendarDateArray {
      let self = this as RiotCalendar;
      const {selectDates, selectDatesFormat} = self.state;
      let source = sort ? selectDatesFormat.sort() : selectDatesFormat;
      let _selectDates = source.map(function(d){
        return selectDates[d];
      })
      return _selectDates;
    }

    switchCalendarByDate = function (date) {
      let self: RiotCalendar = this;
      let valid = checkDateIsValid(date, self, true);
      let {result, y, m} = valid
      if (result) {
        let { viewDatas } = self.state;
        let viewItemsStart = viewDatas[0];
        let viewItemsEnd = viewDatas[viewDatas.length - 1];
        let s1 = viewItemsStart.year + zeroFill(viewItemsStart.month);
        let s2 = viewItemsEnd.year + zeroFill(viewItemsEnd.month);
        let s3 = y + zeroFill(m);
        let direction = s3 < s1 ? -1 : s3 > s2 ? 1 : 0;
        if (direction) {
          updateState(self, y, m, { direction: direction } as riotCalendarStateInterface);
          self.update();
        } else {
          result = false
        }
      }
      return result;
    }

    clickHandler(e) {
      let self: RiotCalendar = this.parent.parent
      const {date, index} = e.item;
      const {state, config} = self;
      const {onRangeGapInvalid, onChange, beforeChange} = config;

      let valid = checkDateIsValid(date, self);
      const {direction, rangeGapType, rangeEndValid, result} = valid;
      //不能更新的
      if (!result && !rangeGapType && !direction) {
        return stopUpdateComponent(e);
      }
      if (rangeGapType) {
        if (onRangeGapInvalid) {
          let rangeGapResult = onRangeGapInvalid(rangeGapType, rangeEndValid, date.clone(),);
          if (!rangeGapResult) {
            return stopUpdateComponent(e);
          }else{
            //清空当前区间起始日期
            state.selectDates={};
            state.selectDatesFormat = [];
          }
        }
      }
      if(beforeChange && !beforeChange(date, self)){
        return stopUpdateComponent(e);
      }

      //更新选择日期
      assign(state,updateSelectDates(self, date));
      if (direction) {
        changeViewByDirection(e, direction, self);
      } else {
        updateState(self)
      }
      let riotdate = state.viewDatas[date.item].dates[index];
      //更新
      riotdate.animation = riotdate.select === 1 ? 1 : -1;
      !riotdate.select ? riotdate.change = 1 : '';
      onChange && onChange(riotdate.clone(), self);
      //self.parent.parent.update();
    }
  }
  return RiotCalendar;
})(riot.Tag)






