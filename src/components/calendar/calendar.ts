/// <reference path="../../../typings/index.d.ts" />

import RiotDate from "./riotdate";
import { RiotDateInterface } from "./riotdate";
import { eleClassListMethods, isDate, zeroFill } from "../common/utils";
import objectAssign from "../common/objectAssign";
import riotCalendarTmpl from "./calendar.tag";


const {removeClass, addClass} = eleClassListMethods;

interface RiotCalendarInterface extends riot.Tag {

}

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
  dateTimeFormat?: (date: RiotDate) => string,
  disabledDate?: (date: RiotDate) => number,
  beforeShowDate?: (date: RiotDate) => string,
  onRangeGapInvalid?: (invalidType: string) => boolean

}

type riotCalendarSelectDatesType = RiotDate[]

interface riotCalendarStateInterface {
  selectDates: riotCalendarSelectDatesType
}

interface riotCalendarPropsInterface {
  weekTitles: string[],
  rls?: string, //rangeLimit[0]
  rle?: string, // rangeLimit[1]
  re?: string, //selectDates[0]
  rs?: string //selectDates[1]
  mis?: string //mixDate
  mas?: string //maxDate
  defaultDate ?: RiotDate
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
  function format(date?: Date) {
    if (isDate(date)) {
      return '' + date.getFullYear() + zeroFill(date.getMonth() + 1) + zeroFill(date.getDate())
    }
    return ''
  }

  const yearCache = {};

  const weekTitles = ['日', '一', '二', '三', '四', '五', '六'];

  const initSelectDates = function (ctx: RiotCalendar): riotCalendarSelectDatesType {
    const {isRange, isMultiple, selectDates = []} = ctx.config;
    const {rls, rle, mis, mas} = ctx.props;
    let selectDatesClone = [] as riotCalendarSelectDatesType;
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

  const initConfig = function (opts: riotCalendarOptsInterface): riotCalendarOptsInterface {
    return objectAssign({}, defaultOpts, opts);
  }


  const initState = function (ctx: RiotCalendar) {
    let state = {
      selectDates: initSelectDates(ctx)
    } ;
    return state;
  }

  const initProps = function (ctx: RiotCalendar) {
    const {config} = ctx;
    const {firstDay, rangeLimit = [], minDate, maxDate, isRange, isMultiple, defaultDate} = config;

    let rls = format(rangeLimit[0]);
    let rle = format(rangeLimit[1]);
    let mis = format(minDate);
    let mas = format(maxDate);
    if (isRange) {
      //判断rangeLimit与misDate|masDate的大小
      mis && rls && rls < mis ? rls = mis : '';
      mas && rle && rle > mas ? rle = mas : '';
    }

    return {
      weekTitles: weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay)),
      rls: rls,
      rle: rle,
      mis: mis,
      mas: mas
    }
  }
  const updateProps = function(ctx: RiotCalendar){
    const {selectDates} = ctx.state;
    const {isMultiple, isRange} = ctx.config;
    let rs = '';
    let re = '';
    if (selectDates[0] && isMultiple) {
      rs = selectDates[0].format('YYYYMMDD');
    }
    if (selectDates[1] && isRange) {
      re = selectDates[1].format('YYYYMMDD');
    }
    ctx.props.rs = rs;
    ctx.props.re = re;
  }

  class RiotCalendar extends riot.Tag implements RiotCalendarInterface {
    config: riotCalendarOptsInterface;
    state: riotCalendarStateInterface;
    props: riotCalendarPropsInterface;
    get name() {
      return 'riot-calendar';
    }
    get tmpl() {
      return riotCalendarTmpl;
    }
    onCreate(opts: riotCalendarOptsInterface) {
      this.config = initConfig(opts);
      this.props = initProps(this);
      this.state = initState(this);
      updateProps(this);

      console.log(this);
    }

    getSelectDates(sort: boolean): riotCalendarSelectDatesType {
      if (sort && this.config.isMultiple) {
        this.state.selectDates.sort(function (a, b) {
          return +a._d - +b._d;
        });
      }
      return this.state.selectDates;

    }
  }
  return RiotCalendar;
})(riot.Tag)






