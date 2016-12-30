import {zeroFill, isString, isFunction} from "../common/utils";

const datesOfMonth = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function getFirstDateInMonth (y: number, m: number): Date {
  return new Date(y, m - 1, 1);
};

//是否为闰年
export function isLeapYear (y: number): boolean {
  return !(y % 4) && !!(y % 100) || !(y % 400);
};

export function getDatesInPrevMonth (y: number, m: number, firstDay = 0): number {
  let firstDayInMonth = getFirstDateInMonth(y, m).getDay();
  let dates = 0;
  if (~firstDayInMonth) {
    if (firstDayInMonth > firstDay) {
      dates = firstDayInMonth - firstDay
    } else if (firstDayInMonth === firstDay) {
      dates = 0;
    } else {
      dates = 6 - firstDay + 1 + firstDayInMonth;
    }
  }
  return dates;
};

export function getDatesInNextMonth (y: number, m: number, firstDay?: number, weekMode?: string): number {
  return weekMode ? 6 : getWeeksInMonth(y, m, firstDay) * 7 - getDatesInPrevMonth(y, m, firstDay) - getDatesInMonth(y, m);
};

export function getDatesInMonth (y: number, m: number): number {
  --m;
  return m === 1 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m];
};

export function getWeeksInMonth (y: number, m: number, firstDay?: number): number {
  var datesInMonth = getDatesInMonth(y, m) - 7 + getDatesInPrevMonth(y, m, firstDay);
  return Math.ceil(datesInMonth / 7) + 1 || 0;
};

export function getDatesInYear (y: number, m: number, d: number): number {
  let _d = 0;
  let i = 1;
  while (i < m) {
    _d = _d + (i === 2 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m - 1]);
    i++;
  }
  _d += d;
  return _d;
};

export function getWeeksInYear (y: number, m: number, d: number): number {
  let _d = getDatesInYear(y, m, d);
  return Math.round(_d / 7);
};

export function cloneDate (date: Date): Date {
  return new Date(date.getTime());
};

export function cloneAsDate (date: Date): Date {
  let _clonedDate = cloneDate(date);
  _clonedDate.setHours(0, 0, 0, 0);
  return _clonedDate;
};

export function addDays (date: Date, d: number): Date {
  const newDate = cloneDate(date);
  newDate.setDate(date.getDate() + d);
  return newDate;
};

//https://github.com/moment/moment/blob/develop/src/lib/format/format.js
export var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;


const formatFunctions = {};

const formatTokenFunctions = {};

// token:    'M'
// padded:   ['MM', 2]
// ordinal:  'Mo'
// callback: function () { this.month() + 1 }
export function addFormatToken (token, padded, ordinal, callback) {
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
    if (ordinal) {
        formatTokenFunctions[ordinal] = function () {
            return this.localeData().ordinal(func.apply(this, arguments), token);
        };
    }
}

function removeFormattingTokens(input: string): string {
    if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, '');
    }
    return input.replace(/\\/g, '');
}

function makeFormatFunction(format) {
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
export function formatMoment(m: Date, format: string) {
    formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);
    return formatFunctions[format](m);
}
addFormatToken('M', ['MM', 2], 'Mo', function () {
    return this.getMonth() + 1;
});
/*addFormatToken('MMM', 0, 0, function (format) {
    return this.localeData().monthsShort(this, format);
});

addFormatToken('MMMM', 0, 0, function (format) {
    return this.localeData().months(this, format);
});*/
addFormatToken(0, ['YY', 2], 0, function () {
    return this.getFullYear() % 100;
});

addFormatToken(0, ['YYYY',   4],       0, 'getFullYear');
addFormatToken('w', ['ww', 2], 'wo', function(){
  return getWeeksInYear(this.getFullYear(), this.getMonth + 1, this.getDate())
});

addFormatToken('D', 0, 'DD', function(){
  return this.getDate();
});
addFormatToken('DDD', ['DDDD', 3], 'DDDo', function(){
  return getDatesInYear(this.getFullYear(), this.getMonth() + 1, this.getDate());
});

addFormatToken('e', 0, 0, function(){
  return this.getDay();
});
addFormatToken('H', ['HH', 2], 0, function(){
  return this.getHours();
});
addFormatToken('m', ['mm', 2], 0, function(){
  return this.getMinutes();
});
addFormatToken('s', ['ss', 2], 0, function(){
  return this.getSeconds();
});
addFormatToken(0, ['SSS', 3], 0, function(){
  return this.getMilliseconds();
});


//Y M D DDD E e H m s S
function formatDate(date: string, format?): string;
function formatDate(date: Date, format?:string): string;
function formatDate(date: Date, format: Function): string;
function formatDate(date, format?): string{
  if(isString(date)){
    return date;
  }
  if(!format){
    format = 'YYYY-MM-DD'
  }
  if(isFunction(format)){
    return format(date)
  }else{
    return formatMoment(date, format)
  }
}
export {formatDate}
