/// <reference path="../riot.d.ts" />

import {eleClassListMethods, css} from "../common/utils"

const addClass = eleClassListMethods.addClass;
const removeClass = eleClassListMethods.removeClass;


export class RiotCalendar extends riot.Tag {
    constructor(el: Element, opts: Object){
        super(el, opts);
        this.on('update', function(){

        })
    }
    private state = {};
}


