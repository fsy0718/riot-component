/// <reference path="../../../typings/index.d.ts" />

import RiotDate from "./riotdate";
import {RiotDateInterface} from "./riotdate";
import {eleClassListMethods, isUndefined, zeroFill} from "../common/utils";
import objectAssign from "../common/objectAssign";
import riotCalendarTmpl from "./calendar.tag";



const {removeClass, addClass} = eleClassListMethods;

interface RiotCalendarInterface extends riot.Tag{

}




export interface riotCalendarOptsInterface {
    autoOk ?: boolean,
    defaultDate ?: Date,
    minDate ?: Date,
    maxDate ?: Date,
    isRange ?: boolean,
    rangeLimit ?: Date[],
    weekMode ?: boolean,
    firstDay ?: number,
    isMultiple ?: boolean,
    selectDates ?: Date[],
    switchViewByOtherMonth ?: boolean,
    switchViewOverLimit ?: boolean,
    showOtherMonthDates ?: boolean,
    switchWithAnimation ?: boolean,
    animationTimingFunction ?: string,
    animationDuration ?: number,
    numberOfMonths ?: number | number[],
    minRangeGap ?: number,
    maxRangeGap ?: number,
    disabledOverRangeGap ?: boolean,
    onChange ?: (date: RiotDateInterface, ctx: RiotCalendarInterface)=> void,
    dateTimeFormat ?: (date: RiotDateInterface) => string,
    disabledDate ?: (date: RiotDateInterface) => number,
    beforeShowDate ?: (date: RiotDateInterface) => string,
    onRangeGapInvalid ?: (invalidType: string) => boolean

}

interface riotCalendarStateInterface {

}

interface riotCalendarPropsInterface{
   weekTitles: string[],
   rls ?: string, //rangeLimit[0]
   rle ?: string, // rangeLimit[1]
   re ?: string, //selectDates[0]
   rs ?: string //selectDates[1]
   mis ?: string //mixDate
   max ?: string //maxDate
}

export default (function(Tag){

    const defaultOpts = {
        showOtherMonthDates: true,
        switchWithAnimation: true,
        animationTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
        animationDuration: 0.45,
        numberOfMonths: 1,
        firstDay: 0
    }

    const leapYearCache = {};
    
    const weekTitles = ['日', '一', '二', '三', '四', '五', '六'];

    const initConfig = function(opts: riotCalendarOptsInterface): riotCalendarOptsInterface{
        return objectAssign({},defaultOpts, opts);
    }

    const initState = function(ctx: RiotCalendar){
        return {}
    }

    const initProps = function(ctx: RiotCalendar){
        const {config} = ctx
        const {firstDay, rangeLimit, minDate, maxDate}  = config;

        return {
            weekTitles: weekTitles.slice(firstDay,7).concat(weekTitles.slice(0, firstDay))
        }
    }

    class RiotCalendar extends riot.Tag implements RiotCalendarInterface {
        config: riotCalendarOptsInterface;
        state: riotCalendarStateInterface;
        props: riotCalendarPropsInterface;
        get name(){
            return 'riot-calendar';
        }
        get tmpl(){
            return riotCalendarTmpl;
        }
        onCreate(opts: riotCalendarOptsInterface){
            this.config = initConfig(opts);
            this.props = initProps(this);
            this.state = initState(this);
        }
    }
})(riot.Tag)






