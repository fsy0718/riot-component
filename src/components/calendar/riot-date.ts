/// <reference path="../../../typings/index.d.ts" />

import riotCalendarSubDateTmpl  from "./riot-date.tag";
import { RiotDateInterface } from "./riotdate";

interface RiotCalendarSubDateOptsInterface {
    date: RiotDateInterface
}


export default class RiotCalendarSubDate extends riot.Tag {
    className: string
    date: number
    replaceWithInnerHTML: boolean
    get name(){
        return 'riot-date';
    }
    get tmpl(){
        return riotCalendarSubDateTmpl
    }

    onCreate(opts: RiotCalendarSubDateOptsInterface){
        if(opts.date){
            const animation = opts.date.animation;
            this.className = animation === 1 ? 'riot-calendar-in' : animation === -1 ? 'riot-calendar-out' : '';
            this.date = opts.date.date();
            this.replaceWithInnerHTML = false; 
        }

    }
}

 
