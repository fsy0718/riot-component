import { isDate, zeroFill } from "../common/utils"

const _get = function(d:RiotDateBase, unit: string): number{
    return d._d['get' + unit]();
}
const _set = function(d: RiotDateBase, unit: string, value: number): Date{
    return d._d['set' + unit](value);
}
const _makeGetSet = function(unit: string, keepTime?: boolean){
    return function(value){
        if(value != null){
            _set(this, unit, value);
            return this;
        }else{
            return _get(this, unit);
        }
    }
}
const _getsetYear = _makeGetSet('FullYear');
const _getsetMonth = _makeGetSet('Month');
const _getsetDate = _makeGetSet('Date');
const _getsetDay = _makeGetSet('Day');
const _getsetHour = _makeGetSet('Hours');
const _getsetMinute = _makeGetSet('Minutes');
const _getsetSecond = _makeGetSet('Seconds');
const _getsetMillisecond = _makeGetSet('Milliseconds');


export interface RiotDateBaseInterface {
    _d: Date,
    isRiotDate: boolean,
    year(): number,
    year(value:number): RiotDateBaseInterface,
    month(): number,
    month(value:number): RiotDateBaseInterface,
    date(): number,
    date(value:number): RiotDateBaseInterface,
    day(): number,
    hour(): number,
    hour(value:number): RiotDateBaseInterface,
    minute(): number,
    minute(value:number): RiotDateBaseInterface,
    second(): number,
    second(value:number): RiotDateBaseInterface,
    millisecond(): number,
    millisecond(value:number): RiotDateBaseInterface,
    clone(): RiotDateBaseInterface
}


/**
 * 基础date对象
 */
export default class RiotDateBase {
    _d : Date;
    isRiotDate: boolean;
    constructor(y?:Date|number, m ?: number, d?: number){
        this.isRiotDate = true;
        if(isDate(y)){
            this._d = <Date>y;
        }
        else if(arguments.length >= 3){
            this._d = new Date(y as number,m-1, d);
        }else{
            this._d = new Date();
        }
    }
    year(value?:number): number| RiotDateBase {
        return _getsetYear.call(this,value);
    }
    month(value?:number): number | RiotDateBase{
        return _getsetMonth.call(this,value);
    }
    date(value?:number): number| RiotDateBase{
        return _getsetDate.call(this,value);
    }
    day(): number {
        return _getsetDay.call(this,null);
    }
    hour(value?: number): number | RiotDateBase{
        return _getsetHour.call(this,value);
    }
    minute(value?: number): number | RiotDateBase{
        return _getsetMinute.call(this,value);
    }
    second(value?: number): number | RiotDateBase{
        return _getsetSecond.call(this,value);
    }
    millisecond(value?: number): number | RiotDateBase{
        return _getsetMillisecond.call(this,value);
    }
    clone(){
        let _d = new Date();
        let _t = this._d.getTime();
        _d.setTime(_t);
        return new RiotDateBase(_d);
    }
}




