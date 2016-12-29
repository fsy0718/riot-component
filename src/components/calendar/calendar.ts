/// <reference path="../../../typings/index.d.ts" />

import RiotDate from "./riotdate";
import { RiotDateInterface } from "./riotdate";
import { eleClassListMethods, isDate, zeroFill, isNumber, isArray, assign } from "../common/utils";
import { getWeeksInMonth, getDatesInPrevMonth, getDatesInNextMonth, getDatesInMonth, isRiotDate, addDays } from "./utils";

import riotCalendarTmpl from "./calendar.tag";
import riotCalendarCss from "./calendar.css";

const {removeClass, addClass} = eleClassListMethods;


interface RiotCalendarInterface extends riot.Tag { }

interface riotCalendarDateTimeFormatInterface {
  (date: RiotDate): string
}

interface riotCalendarOptsBeforeShowDateReturnObjectDate {
  (date: RiotDate): { className: string, html: string }
}
interface riotCalendarOptsBeforeShowDateReturnStringDate {
  (date: RiotDate): string
}

export type riotCalendarOptsBeforeShowDate = riotCalendarOptsBeforeShowDateReturnObjectDate | riotCalendarOptsBeforeShowDateReturnStringDate;

export interface riotCalendarOptsInterface {
  autoOk?: boolean,
  defaultDate?: Date,
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
  onChange?: (date: RiotDate, ctx: RiotCalendarInterface) => void,
  afterChange?: (date: RiotDate, ctx: RiotCalendarInterface) => void,
  dateTimeFormat?: string | riotCalendarDateTimeFormatInterface,
  disabledDate?: (date: RiotDate) => number,
  beforeShowDate?: riotCalendarOptsBeforeShowDate,
  onRangeGapInvalid?: (invalidType: string) => boolean

}

type riotCalendarDateArray = RiotDate[]

interface riotCalendarStateInterface {
  selectDates: riotCalendarDateArray,
  selectDatesFormat: string[],
  curChangeDateFormat?: string,
  lastSelectDatesFormat?: string[],
  viewDatas?: viewDatasInterface[],
  preMonthDisable?: boolean,
  nextMonthDisable?: boolean,
  direction?: number
}

interface riotCalendarPropsInterface {
  weekTitles: string[],
  idx: string,
  rls?: string, //rangeLimit[0]
  rle?: string, // rangeLimit[1]
  re?: string, //selectDates[0]
  rs?: string, //selectDates[1]
  mis?: string, //mixDate
  mas?: string, //maxDate
  defaultDate?: RiotDate,
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
  y: number,
  m: number,
}

interface checkDateInterface {
  result: boolean,
  y?: number,
  m?: number,
  direction?: number,
  rangeGapType?: string
}
export default (function (Tag) {
  const defaultOpts = {
    showOtherMonthDates: true,
    switchWithAnimation: true,
    animationTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
    animationDuration: 0.45,
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

  const initSelectDates = function (ctx: RiotCalendar): riotCalendarDateArray {
    const {isRange, isMultiple, selectDates = []} = ctx.config;
    const {rls, rle, mis, mas} = ctx.props;
    let selectDatesClone = [] as riotCalendarDateArray;
    selectDates.forEach(function (d) {
      let s = format(d);
      if (isRange && ((rls && rls > s) || (rle && rle < s))) {
        console.warn('riot-calendr组件value中%s由于不符合rangeLimit条件而被移除', d);
      }
      else if ((mis && mis > s) || (mas && mas < s)) {
        console.warn('riot-calendr组件value中%s由于不符合minDate与maxDate条件而被移除', d);
      }
      selectDatesClone.push(new RiotDate(d));
    });
    selectDatesClone.sort(function (a, b) {
      return +a._d - +b._d
    });
    if (isRange) {
      selectDatesClone = selectDatesClone.slice(0, 2);
    }
    else if (!isMultiple) {
      selectDatesClone = selectDatesClone.slice(0, 1);
    }
    return selectDatesClone;

  }

  const setSelectDates = function(ctx: RiotCalendar, date: RiotDate){
    return []
  }

  const getViewItems = function (y: number, m: number, ctx: RiotCalendar): viewItemInterface[] {
    let viewItems = [{ y: y, m: m }];
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
          y: y,
          m: m
        });
        i++;
      }
    }
    return viewItems;
  }

  const parseRiotDateProps = function (date: RiotDate, ctx: RiotCalendar, rangeStartInOtherMonth: boolean, rangeEndInOtherMonth: boolean) {
    date.disable = 0;
    const {isRange, dateTimeFormat, disabledOverRangeGap, minRangeGap, maxRangeGap, disabledDate, isMultiple} = ctx.config;
    const {rs, re, rls, rle, mis, mas} = ctx.props;
    const {selectDates, selectDatesFormat, curChangeDateFormat, lastSelectDatesFormat} = ctx.state;
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
    else if (isRange && disabledOverRangeGap && selectDates && selectDates.length === 1) {
      let diff = +_format - +selectDates[0].format('YYYYMMDD');
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
          date.animation = -1
          date.change = 1;
        }
      }
    }
  }

  const _getViewDatas = function (y: number, m: number, ctx: RiotCalendar): viewDatasInterface {
    const {weekMode, firstDay} = ctx.config;
    let reiom = false;
    let rsiom = false;
    let cache = [];
    let viewDatas: viewDatasInterface;
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

  const _parseViewDatasFromCache = function (data: string[], ctx: RiotCalendar): viewDatasInterface {
    let viewDatas: viewDatasInterface;
    let reiom = false;
    let rsiom = false;
    let viewDates = data.map(function (d) {
      let _d = d.split('/');
      let riotdate = new RiotDate(+_d[1], +_d[2], +_d[3]);
      riotdate.current = +_d[0];
      parseRiotDateProps(riotdate, ctx, rsiom, reiom);
      return riotdate;
    })
    return {
      dates: viewDates,
      rangeEndInOtherMonth: reiom,
      rangeStartInOtherMonth: rsiom
    };
  }

  const getSingleViewDatas = function (y: number, m: number, ctx: RiotCalendar): viewDatasInterface {
    const {idx} = ctx.props;
    let key = y + '-' + m;
    let viewDatas: viewDatasInterface;
    if (!viewDatesCache[idx]) {
      viewDatesCache[idx] = {}
    }
    if (!viewDatesCache[idx][key]) {
      viewDatas = _getViewDatas(y, m, ctx)
    } else {
      viewDatas = _parseViewDatasFromCache(viewDatesCache[idx][key], ctx)
    }
    viewDatas.title = y + '年' + m + '月';
    viewDatas.year = y;
    viewDatas.month = m
    return viewDatas;
  }

  const getViewDatas = function (viewItems: viewItemInterface[], ctx: RiotCalendar): viewDatasInterface[] {

    let viewDatas = viewItems.map(function (item, index) {
      return getSingleViewDatas(item.y, item.m, ctx);
    });
    return viewDatas;
  }

  const updateViewYearAndMonth = function (direction: number, ctx: RiotCalendar) {
    let isPrev = direction === -1;
    let item = ctx.state.viewDatas[isPrev ? 0 : ctx.state.viewDatas.length - 1];
    let m = item.month + direction;
    let y = item.year;
    if(isPrev && m < 1){
      --y;
      m = 12;
    }
    else if(m > 12){
      ++y;
      m = 1;
    }
    return {
      y: y,
      m: m
    }
  }

  const checkViewSwitchStatus = function (ctx: RiotCalendar) {
    const {switchViewOverLimit, isRange} = ctx.config;
    let preMonthDisable = false, nextMonthDisable = false;
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
        preMonthDisable = true;
      } else {
        preMonthDisable = false;
      }
      if ((isRange && rle && lastDateFormat >= rle) || (mas && lastDateFormat >= mas)) {
        nextMonthDisable = true;
      } else {
        nextMonthDisable = false;
      }
    }

    return { nextMonthDisable, preMonthDisable }
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


  const checkDateIsOverRangeGapLimit = function (type: string, date: Date, dateFormat: string, ctx: RiotCalendar) {
    let isMin = type === 'min';
    let rangeEnd = addDays(date, ctx.config[isMin ? 'minRangeGap' : 'maxRangeGap'] - 1);
    let rangeEndFormat = format(rangeEnd);
    let diff = +rangeEndFormat - +dateFormat;
    if (isMin && diff > 0 || !isMin && diff < 0) {
      return {
        rangeGapType: type,
        result: false
      }
    } else {
      return {
        result: true
      }
    }
  }

  const checkDateIsValid = function (date: RiotDate | Date, ctx: RiotCalendar, switchView = false): checkDateInterface {
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
    const {preMonthDisable, nextMonthDisable} = ctx.state
    if ((date as RiotDate).disable !== 0) {
      if (switchViewByOtherMonth && (((date as RiotDate).current === -1 && !preMonthDisable) || (date as RiotDate).current === 1 && !nextMonthDisable)) {
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
        r1 = checkDateIsOverRangeGapLimit('min', (date as RiotDate)._d, _format, ctx)
      }
      if (maxRangeGap > 1) {
        r2 = checkDateIsOverRangeGapLimit('max', (date as RiotDate)._d, _format, ctx)
      }
      if (!r1.result || !r2.result) {
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
    let selectDates = initSelectDates(ctx);
    let selectDatesFormat = [];
    selectDates.forEach(function (d) {
      selectDatesFormat.push(d.format('YYYYMMDD'));
    })
    let state = {
      selectDates: selectDates,
      selectDatesFormat: selectDatesFormat
    };
    return state;
  }

  const initProps = function (ctx: RiotCalendar): riotCalendarPropsInterface {
    const {config} = ctx;
    const {firstDay, rangeLimit = [], minDate, maxDate, isRange, isMultiple, defaultDate, weekMode, numberOfMonths} = config;
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

  const updateProps = function (ctx: RiotCalendar): void {
    const {selectDates} = ctx.state;
    const {isMultiple, isRange, defaultDate} = ctx.config;
    let rs = '';
    let re = '';
    if (selectDates[0] && !isMultiple) {
      rs = selectDates[0].format('YYYYMMDD');
    }
    if (selectDates[1] && isRange) {
      re = selectDates[1].format('YYYYMMDD');
    }
    ctx.props.rs = rs;
    ctx.props.re = re;
    ctx.props.defaultDate = isDate(defaultDate) ? new RiotDate(defaultDate) : selectDates && selectDates[0] || new RiotDate()
  }

  const updateState = function (y: number, m: number, ctx: RiotCalendar, state?: riotCalendarStateInterface) {
    let viewItems = getViewItems(y, m, ctx);
    assign(ctx.state, {
      viewDatas: getViewDatas(viewItems, ctx)
    }, checkViewSwitchStatus(ctx));
    return ctx;
  }





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
      updateProps(self);
      let date = self.props.defaultDate;
      let m = date.month() as number + 1;
      let y = date.year() as number;
      updateState(y, m, self)
    }

    prevMonth(e) {
      let self = this;
      if (self.state.preMonthDisable) {
        e ? e.preventUpdate = true : '';
        return;
      }
      updateViewYearAndMonth(-1, self);
    }

    getSelectDates(sort: boolean): riotCalendarDateArray {
      if (sort && this.config.isMultiple) {
        this.state.selectDates.sort(function (a, b) {
          return +a._d - +b._d;
        });
      }
      return this.state.selectDates;

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
          updateState(y, m, self, { direction: direction } as riotCalendarStateInterface);
          self.update();
        }else{
          result = false
        }
      }
      return result;
    }

    clickHandler(e) {
      let self: RiotCalendar = this
      const {date} = e.item
      let valid = checkDateIsValid(date, self);
      //不能更新的
      if(!valid.result){
        if(valid.direction){
          //通过点击其他月来更新当前日历
          setSelectDates(self, date);

        }
      }
      if(date.date() === 30){
        date.select = 1;
        self.update();
      }
    }
  }
  return RiotCalendar;
})(riot.Tag)






