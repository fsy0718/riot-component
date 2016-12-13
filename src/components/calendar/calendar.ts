/// <reference path="../riot.d.ts" />

import RiotDate from "./riotdate";
import {eleClassListMethods} from "../common/utils";
import riotCalendarTmpl from "./calendar.tag";


const {removeClass, addClass} = eleClassListMethods;

export default (function(Tag){
    class RiotCalendar extends riot.Tag{
        constructor(el: Element, opts={}){
            super(el, opts);  
        }
        get name(){
            return 'riot-calendar';
        }
        get tmpl(){
            return riotCalendarTmpl;
        }
    }
})(riot.Tag)






