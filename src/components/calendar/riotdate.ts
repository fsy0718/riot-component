import { zeroFill, isString, isFunction } from "../common/utils";
import { getWeeksInYear } from "./utils";
import RiotDateBase from "./date";
import {RiotDateBaseInterface} from "./date";


const formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

const formatFunctions = {};
const formatTokenFunctions = {};
const addFormatToken = function (token, padded, ordinal, callback) {
  var func = callback;
  if (typeof callback === 'string') {
    func = function () {
      return this[callback]();
    };
  }
  if (token) {
    formatTokenFunctions[token] = func;
  }
  if (padded) {
    formatTokenFunctions[padded[0]] = function () {
      return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
    };
  }
  //TODO 不考虑ordinal
  /*if (ordinal) {
    formatTokenFunctions[ordinal] = function () {
      return this.localeData().ordinal(func.apply(this, arguments), token);
    };
  }*/
};

const makeFormatFunction = function (format) {
  var array = format.match(formattingTokens), i, length;

  for (i = 0, length = array.length; i < length; i++) {
    if (formatTokenFunctions[array[i]]) {
      array[i] = formatTokenFunctions[array[i]];
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }
  return function (mom) {
    var output = '', i;
    for (i = 0; i < length; i++) {
      output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
    }
    return output;
  };
}
// format date using native date object
const formatRiotDate = function (m: RiotDate, format: string): string {
  formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
  return formatFunctions[format](m);
}

const removeFormattingTokens = function (input: string): string {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|\]$/g, '');
  }
  return input.replace(/\\/g, '');
}

addFormatToken('M', ['MM', 2], 'Mo', function () {
  return this._d.getMonth() + 1;
});
addFormatToken(0, ['YY', 2], 0, 'year');

addFormatToken(0, ['YYYY', 4], 0, 'year');
addFormatToken('w', ['ww', 2], 'wo', 'week');

addFormatToken('D', ['DD', 2], 'DD', 'date');
addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'date');

addFormatToken('e', 0, 0, 'day');
addFormatToken('H', ['HH', 2], 0, 'hour');
addFormatToken('m', ['mm', 2], 0, 'minute');
addFormatToken('s', ['ss', 2], 0, 'second');
addFormatToken(0, ['SSS', 3], 0, 'millisecond');

function _formatRiotDate(date: RiotDate, format?:string): string;
function _formatRiotDate(date: RiotDate, format: Function): string;
function _formatRiotDate(date, format?){
  if(!format){
    format='YYYY-MM-DD'
  }
  if(isFunction(format)){
    return format(date);
  }
  return formatRiotDate(date, format);
}

export interface RiotDateInterface extends RiotDateBaseInterface {
  week(): number,
  format(date: RiotDateInterface, format ?: string): string,
  format(date: RiotDateInterface, format: Function): string
}


class RiotDate extends RiotDateBase {
  //TODO week计算有错误
  week():number{
    return getWeeksInYear(this.year() as number, this.month() as number + 1 , this.date() as number);
  }
  format(arg?): string{
    return _formatRiotDate(this, arg)
  }
}

export default RiotDate;