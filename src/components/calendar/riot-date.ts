/// <reference path="../../../typings/index.d.ts" />

import riotCalendarSubDateTmpl from "./riot-date.tag";
import { RiotDateInterface } from "./riotdate";
import { riotCalendarPropsInterface, riotCalendarStateInterface,riotCalendarOptsInterface } from "./calendar";
import {isObject, isString} from "../common/utils";

interface RiotCalendarSubDateOptsInterface {
  date: RiotDateInterface
}

export default class RiotCalendarSubDate extends riot.Tag {
  className: string
  date: number
  replaceWithInnerHTML: boolean
  get name() {
    return 'riot-date';
  }
  get tmpl() {
    return riotCalendarSubDateTmpl
  }

  onCreate(opts: RiotCalendarSubDateOptsInterface) {
    let _classname = [];
    let classname: string = '';
    let html = '';
    const {date} = opts;
    if (date) {
      const {beforeShowDate, isRange, showOtherMonthDates} = this.parent.config as riotCalendarOptsInterface;
      const {selectDatesFormat, viewDatas} = this.parent.state as riotCalendarStateInterface
      this.date = date.date();
      const {animation, range, disable, select, change, current, item} = date;
      if(animation){
        _classname.push(animation  === 1 && 'riot-calendar-in' || 'riot-calendar-out');
      }
      if(isRange && selectDatesFormat[0] && selectDatesFormat[1]){
        range === 0 && _classname.push('range--area');
        if(showOtherMonthDates){
          range === -1 && _classname.push('range--start');
          range === 1 && _classname.push('range--end');
        }else{
          let rso = viewDatas[item].rangeStartInOtherMonth;
          let reo = viewDatas[item].rangeEndInOtherMonth;
          if((date.current === -1 && rso) || (date.current === 1 && reo)){
            _classname.push('range--area');
          }
          if(!rso && date.range === -1){
            _classname.push('range--start');
          }
          if(!reo && date.range === 1){
            _classname.push('range--end');
          }
        }
      }
      _classname.push(disable === 0 && 'enable' || 'disable');
      change && _classname.push('change');
      select === 1 && _classname.push('choice');
      if (beforeShowDate) {
        let _html = beforeShowDate(date.clone() as RiotDateInterface);
        if(isObject(_html)){
          classname = ((_html as {html:string, className: string}).className || '');
          html = (_html as {html:string, className: string}).html;
        }
        if(isString(_html)){
          html = _html as string;
        }
        if(html){
          this.replaceWithInnerHTML = true;
          
        }
      }
      this.className = classname + ' ' + _classname.join(' ');
    }
    this.on('mount', function(){
      if(html){
        this.root.querySelector('.date').innerHTML = html;
      }
    });
  }
}


