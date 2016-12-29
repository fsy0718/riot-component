/// <reference path="../../../typings/index.d.ts" />

import riotCalendarSubDateTmpl from "./riot-date.tag";
import { RiotDateInterface } from "./riotdate";
import { riotCalendarOptsBeforeShowDate } from "./calendar";
import {isObject, isString} from "../common/utils";

interface RiotCalendarSubDateOptsInterface {
  date: RiotDateInterface,
  beforeShowDate?: riotCalendarOptsBeforeShowDate
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
    let classname = '';
    let html = '';
    if (opts.date) {
      opts.date.test = 1;
      const animation = opts.date.animation;
      this.date = opts.date.date();
      classname = animation === 1 ? 'riot-calendar-in' : animation === -1 ? 'riot-calendar-out' : '';
      if (opts.beforeShowDate) {
        let _html = opts.beforeShowDate(opts.date);
        if(isObject(_html)){
          classname = classname + ' ' + ((_html as {html:string, className: string}).className || '');
          html = (_html as {html:string, className: string}).html;
        }
        if(isString(_html)){
          html = _html as string;
        }
        if(html){
          this.replaceWithInnerHTML = true;
          
        }
      }
      this.className = classname;
    }
    this.on('mount', function(){
      if(html){
        this.root.querySelector('.date').innerHTML = html;
      }
    });
  }
  shouldUpdate(data){
    console.log(data);
    return true;
  }
}


