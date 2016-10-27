define(['riot'], function (riot) { 'use strict';

riot = 'default' in riot ? riot['default'] : riot;

riot.tag2('riot-popver', '<yield></yield>', '', '', function (opts) {
  var tag = this;
});

/**https://github.com/madrobby/zepto/blob/master/src/zepto.js */
var camelize = function camelize(str) {
  return str.replace(/-+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : '';
  });
};
var dasherize = function dasherize(str) {
  return str.replace(/::/g, '/').replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2').replace(/([a-z\d])([A-Z])/g, '$1_$2').replace(/_/g, '-').toLowerCase();
};
var prefixProps = {
  animation: 1
};
var maybePrefix = function maybePrefix(key, value) {
  var css = '';
  var key = dasherize(key);
  var _key = key.split('-');
  if (prefixProps[_key[0]]) {
    css += '-webkit-' + key + ':' + value + ';';
  }
  css += key + ':' + value + ';';
  return css;
};
var riotHelper = {
  $: function $(selector) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

    return context.querySelector(selector);
  },
  addClass: function addClass(dom, className) {
    var _className = className.split(' ');
    for (var i = 0, len = _className.length; i < len; i++) {
      dom.classList.add(_className[i]);
    }
  },
  removeClass: function removeClass(dom, className) {
    var _className = className.split(' ');
    for (var i = 0, len = _className.length; i < len; i++) {
      dom.classList.remove(_className[i]);
    }
  },
  hasClass: function hasClass(dom, className) {
    return dom.classList.contains(className);
  },
  toggleClass: function toggleClass(dom, className) {
    var _className = className.split(' ');
    for (var i = 0, len = _className.length; i < len; i++) {
      dom.classList.toggle(_className[i]);
    }
  },
  css: function css(dom, property, value) {
    if (arguments.length < 3) {
      if (typeof property == 'string') {
        return dom.style[camelize(property)] || getComputedStyle(dom, '').getPropertyValue(property);
      } else if (isArray(property)) {
        var props = {};
        var computedStyle = getComputedStyle(dom, '');
        property.forEach(function (prop) {
          props[prop] = dom.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
        });
        return props;
      }
    }
    var css = '';
    if (typeof property == 'string') {
      if (!value && value !== 0) {
        dom.style.removeProperty(dasherize(property));
      } else {
        css = maybePrefix(property, value);
      }
    } else {
      for (key in property) {
        if (!property[key] && property[key] !== 0) {
          this.style.removeProperty(dasherize(key));
        } else {
          css += maybePrefix(key, property[key]);
        }
      }
    }
    return dom.style.cssText += ';' + css;
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

riot.tag2('riot-calendar', '<div class="riot-calendar"> <div class="riot-calendar__head"> <div class="pure-g control"> <a class="pure-u-1-5 prev {prevMonthDisable && \'disable\'}" href="javascript:;" onclick="{prevMonth}"><i></i></a> <div class="pure-u-3-5 title"> <div if="{otherData}" class="title__other">{otherData.title}</div> <div class="title__cur">{curData.title}</div> </div> <a class="pure-u-1-5 next {nextMonthDisable && \'disable\'}" href="javascript:;" onclick="{nextMonth}"><i></i></a> </div> <div class="pure-g weeks"> <div class="pure-u-1-8" each="{week in weekTitles}">{week}</div> </div> </div> <div class="riot-calendar__body"> <div if="{otherData}" class="riot-calendar__body--other"> <div class="pure-g" each="{weekdates in otherData.weekdates}"> <div class="pure-u-1-8 {parseDateBoxClass(date)}" each="{date in weekdates}"> <div class="{date.disable === 0 && \'enable\' || \'disable\'} {date.select === 1 && \'choice\' || \'\'}" onclick="{checkDate}"> <riot-date date="{date}"></riot-date> </div> </div> </div> </div> <div class="riot-calendar__body--cur"> <div class="pure-g" each="{weekdates in curData.weekdates}"> <div class="pure-u-1-8 {parseDateBoxClass(date)}" each="{date in weekdates}"> <div if="{showOtherMonthDates || (showOtherMonthDates === false && date.current === 0)}" class="{date.disable === 0 && \'enable\' || \'disable\'} {date._change && \'change\'} {date.select === 1 && \'choice\' || \'\'}" onclick="{checkDate}"> <riot-date date="{date}"></riot-date> </div> </div> </div> </div> </div> <div class="riot-calendar__foot"></div> </div>', '', '', function (opts) {
  var addClass = riotHelper.addClass;
  var removeClass = riotHelper.removeClass;
  var css = riotHelper.css;
  var tag = this;
  tag.showOtherMonthDates = opts.showOtherMonthDates !== undefined ? opts.showOtherMonthDates : true;
  var state = {};
  var firstDay = Number(opts.firstDay) || 0;

  var datesOfMonth = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var weekTitles = ['日', '一', '二', '三', '四', '五', '六'];
  var getFirstDateInMonth = function getFirstDateInMonth(y, m) {
    return new Date(y, m - 1, 1);
  };

  var isLeapYear = function isLeapYear(y) {
    return !(y % 4) && y % 100 || !(y % 400);
  };
  var getDatesInPrevMonth = function getDatesInPrevMonth(y, m) {
    var firstDayInMonth = getFirstDateInMonth(y, m).getDay();
    var dates = 0;
    if (~firstDayInMonth) {
      if (firstDayInMonth > firstDay) {
        dates = firstDayInMonth - firstDay;
      } else if (firstDayInMonth === firstDay) {
        dates = 0;
      } else {
        dates = 6 - firstDay + 1 + firstDayInMonth;
      }
    }
    return dates;
  };
  var getDatesInNextMonth = function getDatesInNextMonth(y, m) {
    return (opts.weekMode ? 6 : getWeeksInMonth(y, m)) * 7 - getDatesInPrevMonth(y, m) - getDatesInMonth(y, m);
  };
  var getDatesInMonth = function getDatesInMonth(y, m) {
    --m;
    return m === 1 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m];
  };
  var getWeeksInMonth = function getWeeksInMonth(y, m) {
    var datesInMonth = getDatesInMonth(y, m) - 7 + getDatesInPrevMonth(y, m);
    return Math.ceil(datesInMonth / 7) + 1 || 0;
  };
  var getDatesInYear = function getDatesInYear(y, m, d) {
    var _d = 0;
    var i = 1;
    while (i < m) {
      _d = _d + (i === 2 ? isLeapYear(y) ? 29 : 28 : datesOfMonth[m - 1]);
      i++;
    }
    _d += d;
    return _d;
  };
  var getWeeksInYear = function getWeeksInYear(y, m, d) {
    var _d = getDatesInYear(y, m, d);
    return Math.round(_d, 7);
  };
  var getWeekTitles = function getWeekTitles() {
    tag.weekTitles = weekTitles.slice(firstDay, 7).concat(weekTitles.slice(0, firstDay));
  };
  var cloneDate = function cloneDate(date) {
    return new Date(date.getTime());
  };
  var cloneAsDate = function cloneAsDate(date) {
    var clonedDate = cloneDate(date);
    cloneDate.setHours(0, 0, 0, 0);
    return cloneDate;
  };
  var addDays = function addDays(date, d) {
    var newDate = cloneDate(date);
    newDate.setDate(date.getDate() + d);
    return newDate;
  };
  var str2 = function str2(date) {
    return (date > 9 ? '' : '0') + date;
  };

  var formatDate = function formatDate(y, m, d) {
    if (opts.dateTimeFormat) {
      return opts.dateTimeFormat(y, m, d);
    }
    return y + '-' + str2(m) + (d ? '-' + str2(d) : '');
  };
  var formatDate2 = function formatDate2(date) {
    if (typeof date === 'string') {
      return date;
    } else if (date) {
      return formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
    }
    return '';
  };

  var formatDate3 = function formatDate3(y, m, d) {
    if (arguments.length < 3) {
      return '' + ((typeof y === 'undefined' ? 'undefined' : _typeof(y)) === 'object' ? y.getFullYear() + str2(y.getMonth() + 1) + str2(y.getDate()) : '');
    }
    return '' + y + str2(m) + str2(d);
  };
  var getCalendarViewDate = function getCalendarViewDate(y, m) {
    var weekNum = opts.weekMode ? 6 : getWeeksInMonth(y, m);
    var datesInPrevMonth = getDatesInPrevMonth(y, m);
    var datesInNextMonth = getDatesInNextMonth(y, m);
    var d = getDatesInMonth(y, m);
    var i = 0;
    var weekDates = [];
    var viewDates = {};
    var y1 = y;
    var y3 = y;
    var m1 = m;
    var m3 = m;
    var d1 = d;
    var d3 = d;

    rangeEndInOtherMonth = false;
    rangeStartInOtherMonth = false;
    if (datesInPrevMonth) {
      if (m1 === 1) {
        --y1;
        m1 = 13;
      }
      --m1;
      d1 = getDatesInMonth(y1, m1);
    }
    if (datesInNextMonth) {
      if (m3 === 12) {
        ++y3;
        m3 = 0;
      }
      ++m3;
    }
    var c2 = 0;
    var c3 = 0;
    while (i < weekNum) {
      var j = 0;
      var wd = [];
      while (j < 7) {
        var _y = void 0,
            _m = void 0,
            _d = void 0,
            _c = 0;
        if (datesInPrevMonth) {
          _y = y1;
          _m = m1;
          _d = d1 - datesInPrevMonth + 1;
          _c = -1;
          --datesInPrevMonth;
        } else if (c2 < d) {
          _y = y;
          _m = m;
          _d = ++c2;
        } else if (c3 < datesInNextMonth) {
          _y = y3;
          _m = m3;
          _d = ++c3;
          _c = 1;
        }
        var _date = new Date(_y, _m - 1, _d);
        var r = {
          current: _c,
          date: _date,
          y: _y,
          m: _m,
          d: _d,
          w: _date.getDay(),
          dateformat: formatDate(_y, _m, _d),
          disable: 0,
          _format: formatDate3(_y, _m, _d)
        };

        if (opts.isRange) {
          if (rs) {
            if (rs === r._format) {
              r.range = -1;
              r.select = 1;
              if (r.current !== 0) {
                rangeStartInOtherMonth = true;
              }
            } else if (re) {
              if (r._format === re) {
                r.range = 1;
                r.select = 1;
                if (r.current !== 0) {
                  rangeEndInOtherMonth = true;
                }
              } else if (r._format > rs && r._format < re) {
                r.range = 0;
              }
            }
          }
        } else if (selectDateStr.indexOf(r.dateformat) > -1) {
          r.select = 1;
        }
        if (r.current) {
          r.disable = 1;
        } else if (opts.isRange && rls && rls > r._format || rle && rle < r._format) {
          r.disable = 2;
        } else if (mis && mis > r._format || mas && mas < r._format) {
          r.disable = 3;
        }
        opts.disabledDate && opts.disabledDate(r);

        if (curChangeDateStr) {

          if (curChangeDateStr === r.dateformat) {
            r._animation = r.select === 1 ? 1 : -1;
            r._change = 1;
          } else if (lastSelectDateStr.indexOf(r.dateformat) > -1) {
            if (opts.isRange) {
              if (selectDateStr.length === 1) {
                if (lastSelectDateStr.length === 1 || lastSelectDateStr.length === 2 && (selectDateStr[0] !== lastSelectDateStr[0] || selectDateStr[0] !== lastSelectDateStr[1])) {
                  r._animation = -1;
                  r._change = 1;
                }
              }
            } else if (!opts.isMultiple) {
              r._animation = -1;
              r._change = 1;
            }
          }
        }
        j++;
        wd.push(r);
        viewDates[r.dateformat] = r;
      }
      weekDates.push(wd);
      i++;
    }
    return {
      weekDates: weekDates,
      viewDates: viewDates
    };
  };
  var changeView = function changeView(direction) {
    switchDirection = direction;
    state.lastY = state.curY;
    state.lastM = state.curM;
    state.curM += direction;

    if (state.curM < 1) {
      state.curY--;
      state.curM = 12;
    }
    if (state.curM > 12) {
      state.curM = 1;
      state.curY++;
    }
  };
  var checkDateIsValid = function checkDateIsValid(y, m) {
    if (opts.switchViewOverLimit) {
      var firstDateStr = formatDate3(y, m, 1);
      var lastDateStr = formatDate3(y, m, getDatesInMonth(y, m));
      if (opts.isRange) {
        if (rle && firstDateStr >= rle || rls && lastDateStr <= rls) {
          return false;
        }
      }
      if (mis && lastDateStr <= mis || mas && firstDateStr >= mas) {
        return false;
      }
    }
    return true;
  };
  tag.prevMonth = function (e) {
    if (tag.prevMonthDisable) {
      e ? e.preventUpdate = true : '';
      return;
    }
    changeView(-1);
    if (!e) {
      tag.update();
    }
  };
  tag.nextMonth = function (e) {
    if (tag.nextMonthDisable) {
      e ? e.preventUpdate = true : '';
      return;
    }
    changeView(1);
    if (!e) {
      tag.update();
    }
  };
  tag.switchCalendarByDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    if (y === state.curY && m === state.curM) {
      return false;
    }
    var result = checkDateIsValid(y, m);
    if (result) {
      switchDirection = y + str2(m) > '' + state.curY + str2(state.curM) ? 1 : -1;
      state.curY = y;
      state.curM = m;
      tag.update();
    }
    return result;
  };

  tag.getSelectDates = function () {
    if (!selectDates) {
      selectDates = (opts.selectDates || []).concat();
    }
    selectDateStr = [];
    selectDates = selectDates.filter(function (d) {
      var s = formatDate3(d);
      if (opts.isRange && (rls && rls > s || rle && rle < s)) {
        console.warn('riot-calendr实例类名为%s的value中%s由于不符合rangeLimit条件而被移除', opts.class || 'riot-calendar', d);
        return false;
      } else if (mis && mis > s || mas && mas < s) {
        console.warn('riot-calendr实例类名为%s的value中%s由于不符合minDate与maxDate条件而被移除', opts.class || 'riot-calendar', d);
        return false;
      }
      return true;
    });
    selectDates.sort(function (a, b) {
      return a - b;
    });
    selectDates.forEach(function (d) {
      selectDateStr.push(formatDate2(d));
    });
    if (opts.isRange) {
      selectDates = selectDates.slice(0, 2);
      selectDateStr = selectDateStr.slice(0, 2);
    } else if (!opts.isMultiple) {
      selectDates = selectDates.slice(0, 1);
      selectDateStr = selectDateStr.slice(0, 1);
    }
    return {
      dateStr: selectDateStr,
      dates: selectDates
    };
  };
  tag.parseDateBoxClass = function (date) {
    if (!date) {
      return '';
    }
    var classNames = [];
    if (tag.opts.isRange && rs && re) {
      date.range === 0 && classNames.push('range--area');
      if (tag.showOtherMonthDates) {
        date.range === -1 && classNames.push('range--start');
        date.range === 1 && classNames.push('range--end');
      } else {
        if (date.current === -1 && rangeStartInOtherMonth || date.current === 1 && rangeEndInOtherMonth) {
          classNames.push('range--area');
        }
        if (!rangeStartInOtherMonth && date.range === -1) {
          classNames.push('range--start');
        }
        if (!rangeEndInOtherMonth && date.range === 1) {
          classNames.push('range--end');
        }
      }
    }
    return classNames.join(' ');
  };

  var rs = void 0,
      re = void 0,
      rls = void 0,
      rle = void 0,
      selectDates = void 0,
      selectDateStr = void 0,
      mis = void 0,
      mas = void 0;

  var defaultDate = void 0;
  var switchDirection = void 0;
  var rangeLimit = opts.rangeLimit || [];
  var switchWithAnimation = opts.switchWithAnimation === undefined && true || opts.switchWithAnimation;

  var curChangeDateStr = undefined;
  var lastSelectDateStr = [];

  var rangeStartInOtherMonth = false;
  var rangeEndInOtherMonth = false;
  var init = function init() {
    rls = formatDate3(rangeLimit[0]);
    rle = formatDate3(rangeLimit[1]);
    mis = formatDate3(opts.minDate);
    mas = formatDate3(opts.maxDate);
    if (opts.isRange) {
      mis && rls && rls < mis ? rls = mis : '';
      mas && rle && rle > mas ? rle = mas : '';
    }
    getWeekTitles();
    tag.getSelectDates();
    if (selectDates[0] && !opts.isMultiple) {
      rs = formatDate3(selectDates[0].getFullYear(), selectDates[0].getMonth() + 1, selectDates[0].getDate());
    }
    if (selectDates[1] && opts.isRange) {
      re = formatDate3(selectDates[1].getFullYear(), selectDates[1].getMonth() + 1, selectDates[1].getDate());
    }
    defaultDate = opts.defaultDate || selectDates[0] || new Date();
    state.curY = defaultDate.getFullYear();
    state.curM = defaultDate.getMonth() + 1;
  };

  init();

  tag.on('update', function () {
    var curY = state.curY;
    var curM = state.curM;
    if (switchWithAnimation && switchDirection) {
      tag.otherData = {
        title: state.lastY + '年' + state.lastM + '月',
        weekdates: tag.curData.weekdates
      };
    }
    var _d = getCalendarViewDate(curY, curM);
    tag.curData = {
      title: curY + '年' + curM + '月',
      weekdates: _d.weekDates,
      viewdates: _d.viewDates
    };
    if (opts.switchViewOverLimit) {
      var firstDateStr = formatDate3(curY, curM, 1);
      var lastDateStr = formatDate3(curY, curM, getDatesInMonth(curY, curM));
      if (opts.isRange && firstDateStr <= rls || firstDateStr <= mis) {
        tag.prevMonthDisable = true;
      } else {
        tag.prevMonthDisable = false;
      }
      if (opts.isRange && rle && lastDateStr >= rle || mas && lastDateStr >= mas) {
        tag.nextMonthDisable = true;
      } else {
        tag.nextMonthDisable = false;
      }
    }
  });
  var timer = null;

  tag.on('updated', function () {
    lastSelectDateStr = selectDateStr.concat();
    if (switchWithAnimation && switchDirection) {
      (function () {
        var $cur = riotHelper.$('.riot-calendar__body--cur', tag.root);
        var $curT = riotHelper.$('.title__cur', tag.root);
        var $other = riotHelper.$('.riot-calendar__body--other', tag.root);
        var $otherT = riotHelper.$('.title__other', tag.root);
        if (opts.animationTimingFunction) {
          css($cur, 'animationTimingFunction', opts.animationTimingFunction);
          css($other, 'animationTimingFunction', opts.animationTimingFunction);
          css($curT, 'animationTimingFunction', opts.animationTimingFunction);
          css($otherT, 'animationTimingFunction', opts.animationTimingFunction);
        }
        var duration = parseFloat(opts.animationDuration) || 0.45;
        var c1 = void 0;
        var c2 = void 0;
        if (duration !== 0.45) {
          var _duration = '' + duration + 's';
          css($cur, 'animationDuration', _duration);
          css($other, 'animationDuration', _duration);
          css($curT, 'animationDuration', _duration);
          css($otherT, 'animationDuration', _duration);
        }
        if (switchDirection === 1) {
          c1 = 'calendar-fadeInRight';
          c2 = 'calendar-fadeOutRight';
        } else {
          c1 = 'calendar-fadeInLeft';
          c2 = 'calendar-fadeOutLeft';
        }
        addClass($cur, 'animation ' + c1);
        addClass($other, 'animation ' + c2);
        addClass($curT, 'animation ' + c1);
        addClass($otherT, 'animation ' + c2);
        clearTimeout(timer);
        timer = setTimeout(function () {
          tag.otherData = null;
          removeClass($cur, 'animation ' + c1);
          removeClass($other, 'animation ' + c2);
          removeClass($curT, 'animation ' + c1);
          removeClass($otherT, 'animation ' + c2);
          clearTimeout(timer);
          switchDirection = undefined;
        }, duration * 1000);
      })();
    }

    if (opts.onChange && curChangeDateStr) {
      opts.onChange(tag.curData.viewdates[curChangeDateStr], tag);
      curChangeDateStr = undefined;
    }
  });

  var setRangeStart = function setRangeStart(date) {
    selectDates = [date.date];
    selectDateStr = [date.dateformat];
    rs = date._format;
    re = undefined;
  };

  var checkRangeGapLimit = function checkRangeGapLimit(type, date) {

    var rangeEnd = addDays(selectDates[0], opts[type === 'min' ? 'minRangeGap' : 'maxRangeGap'] - 1);
    var rangeEndStr = formatDate3(rangeEnd);
    var diff = rangeEndStr - date._format;
    var isMin = type === 'min';
    if (isMin && diff > 0 || !isMin && diff < 0) {
      var continueNext = true;
      if (opts.onRangeGapInvalid) {
        continueNext = opts.onRangeGapInvalid(type, rangeEnd);
      }
      if (continueNext) {
        setRangeStart(date);
        return 0;
      } else {
        return -1;
      }
    }
    return 1;
  };
  tag.checkDate = function (e) {
    var date = e.item.date;
    if (date.disable !== 0) {
      if (opts.switchViewByOtherMonth) {
        if (date.current === -1 && !tag.prevMonthDisable || date.current === 1 && !tag.nextMonthDisable) {
          changeView(date.current);
        }
      } else {
        e.preventUpdate = true;
        return;
      }
    }
    if (opts.isRange) {
      if (rs && !re && rs === date._format) {

        selectDates = [];
        selectDateStr = [];
        rs = undefined;
        re = undefined;
      } else if (!rs || rs && rs > date._format || re) {

        setRangeStart(date);
      } else {

        var addEnd1 = 1;
        var addEnd2 = 1;
        if (opts.minRangeGap > 1) {
          addEnd1 = checkRangeGapLimit('min', date);
        }
        if (opts.maxRangeGap) {
          addEnd2 = checkRangeGapLimit('max', date);
        }
        if (addEnd1 > 0 && addEnd2 > 0) {
          selectDates.push(date.date);
          selectDateStr.push(date.dateformat);
          re = date._format;
        }
        if (addEnd1 < 0 || addEnd2 < 0) {
          e.preventUpdate = true;
          return;
        }
      }
    } else {
      if (date.select) {
        var i = selectDateStr.indexOf(date.dateformat);
        selectDateStr.splice(i, 1);
        selectDates.splice(i, 1);
      } else {
        if (!opts.isMultiple) {
          selectDateStr = [date.dateformat];
          selectDates = [date.date];
        } else {
          selectDateStr.push(date.dateformat);
          selectDates.push(date.date);
        }
      }
    }
    curChangeDateStr = date.dateformat;
  };
});
riot.tag2('riot-date', '<i class="riot-date--bg" if="{!replaceWithInnerHTML}"></i> <span if="{!replaceWithInnerHTML}">{opts.date.d}</span>', '', 'class="date {className}"', function (opts) {
  var tag = this;
  var _opts = tag.parent.opts;
  tag.beforeShowDate = _opts.beforeShowDate;
  var date = opts.date;
  var className = date._animation === 1 ? 'riot-calendar-in' : date._animation === -1 ? 'riot-calendar-out' : '';
  if (tag.beforeShowDate) {
    var html = tag.beforeShowDate(date);
    if (html) {
      if ((typeof html === 'undefined' ? 'undefined' : _typeof(html)) === 'object') {
        className = className + ' ' + (html.className || '');
        html = html.html;
      }
      if (typeof html === 'string') {
        tag.replaceWithInnerHTML = true;
        tag.root.innerHTML = html;
      }
    }
  }
  tag.className = className;
});

//https://github.com/react-component/util/blob/master/src/Dom/addEventListener.js
function addEventListener(target, eventType, callback) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, false);
    return {
      remove: function remove() {
        target.removeEventListener(eventType, callback, false);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, callback);
    return {
      remove: function remove() {
        target.detachEvent('on' + eventType, callback);
      }
    };
  }
}

riot.tag2('riot-slider', '<div class="riot-slider {opts.disabled && \'riot-slider--disable\'} {!included && \'riot-slider--independent\'}" onmousedown="{opts.disabled ? noop : onMouseDown}" ontouchstart="{opts.disabled ? noop : onTouchStart}"> <div class="riot-slider__track"></div> <div class="riot-slider__track--select" if="{included}" riot-style="left:{selectTrack.left + \'%\'};width:{selectTrack.width + \'%\'}"></div> <div class="riot-slider__handler riot-slider__handler--1" riot-style="left:{(opts.range ?selectTrack.left : selectTrack.width) + \'%\'}" data-key="{selectTrack.left}"></div> <div class="riot-slider__handler riot-slider__handler--2" if="{opts.range}" riot-style="left: {(selectTrack.left + selectTrack.width) + \'%\'}" data-key="{selectTrack.left + selectTrack.width}"></div> <div class="riot-slider__marks" if="{opts.marks || opts.showAllDots}"> <div each="{mark,index in marks}" class="riot-slider__marks--items {parseMarkItemClass(mark)}"> <span class="riot-slider__marks--items-dot" data-key="{index}" riot-style="left:{mark.precent + \'%\'}" if="{mark.dot}"></span> <span class="riot-slider__marks--items-tip" data-key="{index}" riot-style="width:{mark.width + \'%\'};margin-left:{(-0.5 * mark.width) + \'%\'};left:{mark.precent + \'%\'}" if="{mark.tip}">{mark.label}</span> </div> </div> </div>', '', '', function (opts) {
  "use strict";

  var tag = this;
  var state = {
    control: opts.control || false
  };

  var sliderRootEle = null;

  var isVertical = opts.vertical || false;

  var allowCross = opts.allowCross === undefined ? true : opts.allowCross;

  var rangeValueShouldEqual = opts.rangeValueShouldEqual === undefined ? true : opts.rangeValueShouldEqual;
  tag.included = opts.included === undefined ? true : opts.included;
  var isNotTouchEvent = function isNotTouchEvent(e) {
    return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
  };

  var floatReg = /\./;
  var parseNumber = function parseNumber(num) {
    var dot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

    var result = num;
    if (floatReg.test(num)) {
      result = num.toFixed(dot);
    }
    return +result;
  };
  var getMarkWidth = function getMarkWidth(len) {

    return parseNumber(100 / (len - 1) * 0.9);
  };

  var getEnablePoint = function getEnablePoint(min, max, marks) {
    var points = [];
    var markPoints = void 0;
    var length = max - min;
    var w = void 0;
    var step = opts.range ? opts.step : opts.step || 1;
    if (step > 0) {
      opts.showAllTips ? w = parseNumber(getMarkWidth(Math.ceil((max - min) / step))) : '';
      var i = min;
      while (i <= max) {
        if (!(marks && marks[i])) {
          var _point = {
            key: i,
            label: '' + i,
            precent: parseNumber((i - min) / length * 100)
          };
          if (opts.showAllTips) {
            _point.width = w;
            _point.tip = true;
          }
          if (opts.showAllDots) {
            _point.dot = true;
          }
          points.push(_point);
        }
        i += step;
      }
    }
    if (marks) {
      var _markPoints = [];
      var markCount = Object.keys(marks).length;
      w = getMarkWidth(markCount);
      for (var key in marks) {
        var _key = parseFloat(key);
        var mark = marks[key];
        if (_key >= min && _key <= max) {
          var markIsString = typeof marks[key] === 'string';
          var _point2 = {
            key: _key,
            mark: true,
            label: markIsString ? mark : mark.label || '',
            width: markIsString ? w : parseNumber(mark.width || w)
          };
          if (markIsString) {
            _point2.dot = opts.showMarkDots !== undefined ? opts.showMarkDots : true;
            _point2.tip = opts.showMarkTips !== undefined ? opts.showMarkTips : true;
          } else {
            _point2.dot = mark.dot !== undefined ? mark.dot : opts.showMarkDots !== undefined ? opts.showMarkDots : true;
            _point2.tip = mark.tip !== undefined ? mark.tip : opts.showMarkTips !== undefined ? opts.showMarkTips : true;
          }
          _point2.precent = parseNumber((_point2.key - min) / length * 100);
          points.push(_point2);
          _markPoints.push(_point2);
        } else {
          console.warn('riot-slider实例类名为%s中有key为%s的mark由于不在opts.min和opts.max之间被移除', opts.class, key);
        }
      }

      if (_markPoints.length !== markCount) {
        w = getMarkWidth(_markPoints.length);
        _markPoints.forEach(function (_mark) {
          _mark.width = w;
        });
      }
      markPoints = _markPoints.sort(function (a, b) {
        return +a.key - +b.key;
      });
    }
    points.sort(function (a, b) {
      return +a.key - +b.key;
    });
    return {
      points: points,
      marks: opts.showAllDots ? points : markPoints
    };
  };

  var getMousePosition = function getMousePosition(e) {
    return isVertical ? e.clientY : e.pageX;
  };
  var getTouchPosition = function getTouchPosition(e) {
    return isVertical ? e.touches[0].clientY : e.touches[0].pageX;
  };
  var getHandleRect = function getHandleRect() {
    var handle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : sliderRootEle;

    var coords = handle.getBoundingClientRect();
    return coords;
  };

  var getClosetPointByPosition = function getClosetPointByPosition(position) {
    var range = opts.range;
    var dots = opts.dots;


    var precent = getPrecentByPosition(position);
    var _value = precent * (state.max - state.min) + state.min;
    if (opts.range && !opts.step) {
      _value = getClosetValueByDichotomy(state.cachePoint.marks, _value);
    } else if (opts.dots) {
      _value = getClosetValueByDichotomy(state.cachePoint.points, _value);
    } else {
      _value = {
        key: parseInt(_value)
      };
    }
    return {

      precent: precent * 100,
      point: _value
    };
  };

  var getPrecentByPosition = function getPrecentByPosition(pos) {
    var coords = getHandleRect();
    var v = void 0;
    if (isVertical) {
      v = (pos - coords.top) / coords.height;
    } else {
      v = (pos - coords.left) / coords.width;
    }
    return v > 1 ? 1 : v < 0 ? 0 : v;
  };
  var setRangeValue = function setRangeValue(val) {
    if (!rangeValueShouldEqual && val === state.rangeStableValue) {
      return false;
    }

    if (opts.rangeGapFix) {
      var _ret = function () {

        var direction = val - state.value[state.rangeChangeHandle];
        if (direction > 0) {
          direction = 1;
        } else if (direction < 0) {
          direction = -1;
        } else {

          return {
            v: false
          };
        }
        var newVal = state.value[state.rangeChangeHandle ? 0 : 1] + direction * state.rangeGap;
        var newValInPoint = state.cachePoint.points.some(function (point) {
          return point.key === newVal;
        });
        if (newValInPoint) {
          state.value = state.rangeChangeHandle === 0 ? [val, newVal] : [newVal, val];
          return {
            v: true
          };
        }
        return {
          v: false
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    state.value = [val, state.rangeStableValue].sort(function (a, b) {
      return a - b;
    });
    var diff = val - state.rangeStableValue;
    if (!allowCross && (state.rangeChangeHandle === 0 && val > state.rangeStableValue || state.rangeChangeHandle === 1 && val < state.rangeStableValue)) {
      return false;
    }
    return true;
  };

  var getHandleIndex = function getHandleIndex(precent) {
    var index = void 0;
    var d1 = precent - tag.selectTrack.left;
    var d2 = tag.selectTrack.left + tag.selectTrack.width - precent;
    if (d1 <= 0) {
      index = 0;
    } else if (d2 <= 0) {
      index = 1;
    } else {
      index = d1 > d2 ? 1 : 0;
    }
    return index;
  };

  var getClosetValueByDichotomy = function getClosetValueByDichotomy(source, val) {
    var len = source.length;
    if (val <= source[0].key) {
      return source[0];
    }
    if (val >= source[len - 1].key) {
      return source[len - 1];
    }
    var _source = source.slice(0);
    var _len = void 0;
    var i = 0;
    while ((_len = _source.length) > 0) {
      var _l = void 0;
      ++i;
      if (_len === 1) {
        return _source[0];
      } else {
        _l = Math.floor(_len / 2);
      }
      var d1 = val - _source[_l - 1].key;
      var d2 = _source[_l].key - val;
      if (d1 < 0) {

        _source = _source.slice(0, _l);
      } else if (d2 < 0) {

        _source = _source.slice(_l);
      } else {
        return d1 > d2 ? _source[_l] : _source[_l - 1];
      }
      if (i > len) {
        console.warn('由于算法原因，已进入死循环');
        return;
      }
    }
  };
  var getValue = function getValue() {
    return opts.range ? state.value.concat() : state.value.slice(1, 2);
  };

  var updateStateValue = function updateStateValue(point) {
    state.changePointKey = point.key;
    var shouldUpdate = void 0;
    if (opts.range) {
      shouldUpdate = setRangeValue(point.key);
    } else {
      state.value = [state.min, point.key];
      shouldUpdate = true;
    }
    return shouldUpdate;
  };
  var onMouseMove = function onMouseMove(e) {
    var position = getMousePosition(e);
    onMove(position);
  };
  var onTouchMove = function onTouchMove(e) {
    if (isNotTouchEvent(e)) {
      end('touch');
      e.preventUpdate = true;
      return;
    }
    var position = getTouchPosition(e);
    onMove(position);
  };
  var onMove = function onMove(position) {

    var closetPoint = getClosetPointByPosition(position);
    var point = closetPoint.point;
    if (state.changePointKey !== point.key) {
      var shouldUpdate = updateStateValue(point);
      if (shouldUpdate) {
        tag.update();
        opts.onChange && opts.onChange(getValue());
      }
    }
  };
  var end = function end(type) {

    state.rangeChangeHandle = undefined;
    state.rangeStableValue = null;
    opts.onAfterChange && opts.onAfterChange(getValue());
    removeEvents(type);
  };
  var onStart = function onStart(position) {
    var closetPoint = getClosetPointByPosition(position);
    state.changePointKey = closetPoint.point.key;
    if (opts.range) {
      state.rangeChangeHandle = getHandleIndex(closetPoint.precent);
      state.rangeStableValue = state.value[state.rangeChangeHandle === 0 ? 1 : 0];
    }
    opts.onBeforeChange && opts.onBeforeChange(getValue());

    if (state.value.indexOf(state.changePointKey) === -1) {
      var shouldUpdate = updateStateValue(closetPoint.point);
      if (shouldUpdate) {
        opts.onChange && opts.onChange(getValue());
      }
      return shouldUpdate;
    } else {

      return false;
    }
  };
  var pauseEvent = function pauseEvent(e) {
    e.stopPropagation();
    e.preventDefault();
  };
  var addDocumentEvents = function addDocumentEvents(type) {
    if (type === 'touch') {

      tag.onTouchMoveListener = addEventListener(document, 'touchmove', onTouchMove.bind(tag));
      tag.onTouchUpListener = addEventListener(document, 'touchend', end.bind(tag, 'touch'));
    } else if (type === 'mouse') {
      tag.onMouseMoveListener = addEventListener(document, 'mousemove', onMouseMove.bind(tag));
      tag.onMouseUpListener = addEventListener(document, 'mouseup', end.bind(tag, 'mouse'));
    }
  };
  var removeEvents = function removeEvents(type) {
    if (type === 'touch') {
      tag.onTouchMoveListener.remove();
      tag.onTouchUpListener.remove();
    } else if (type === 'mouse') {
      tag.onMouseMoveListener.remove();
      tag.onMouseUpListener.remove();
    }
  };

  var init = function init() {
    var marks = opts.marks;
    var value = opts.value;
    var _opts$min = opts.min;
    var min = _opts$min === undefined ? 0 : _opts$min;
    var _opts$max = opts.max;
    var max = _opts$max === undefined ? 100 : _opts$max;

    min = Math.max(0, min);

    var _value = [min, min];
    if (value !== undefined && Object.prototype.toString.call(value) !== '[object Array]') {
      console.warn('riot-slider实例类名为%s的opts.value不为数组，将强制转为数组', opts.class || 'riot-slider');
      _value = [Number(value) || min];
    } else if (value && value.length) {
      (function () {
        var _v = [];
        value.forEach(function (v) {
          if (v >= min && v <= max) {
            _v.push(+v);
          } else {
            console.warn('riot-slider实例类名为%s的opts.value由于不在opts.min与opts.max之间被移动', opts.class || 'riot-slider', v);
          }
        });
        _value = _v.sort();
      })();
    }
    var _valen = _value.length;
    if (_valen > 2) {
      _value = _value.slice(0, 2);
    } else if (_valen < 2) {
      _value.unshift(min);
    }
    state.value = _value;
    state.min = min;
    state.max = max;
    state.cachePoint = getEnablePoint(min, max, marks);

    if (opts.rangeGapFix) {
      state.rangeGap = state.value[1] - state.value[0];
      if (!state.rangeGap) {
        console.warn('riot-slider实例类名为%s的rangeGap为0，会变为类似include=false的效果', opts.class || 'riot-slider');
      }
    }
    tag.marks = state.cachePoint.marks;
  };
  init();
  tag.noop = function (e) {
    e.preventUpdate = true;
    return;
  };

  tag.parseMarkItemClass = function (mark, type) {
    if (mark) {

      if (tag.included && mark.precent > tag.selectTrack.left && mark.precent < tag.selectTrack.left + tag.selectTrack.width) {
        return 'riot-slider__marks--items-select';
      }
    }
  };

  tag.setControl = function (control) {
    state.control = control;
    
  };

  tag.onMouseDown = function (e) {
    var range = opts.range;

    if (e.button !== 0 || state.control) {
      e.preventUpdate = true;
      return;
    }
    var position = getMousePosition(e);
    var shouldUpdate = onStart(position);
    pauseEvent(e);
    addDocumentEvents('mouse');
    e.preventUpdate = !shouldUpdate;
  };
  tag.onTouchStart = function (e) {
    if (isNotTouchEvent(e) || state.control) {
      e.preventUpdate = true;
      return;
    }
    var position = getTouchPosition(e);
    var shouldUpdate = onStart(position);
    pauseEvent(e);
    addDocumentEvents('touch');
    e.preventUpdate = !shouldUpdate;
  };

  tag.on('update', function () {
    tag.selectTrack = {
      left: parseNumber((state.value[0] - state.min) / (state.max - state.min) * 100),
      width: parseNumber((state.value[1] - state.value[0]) / (state.max - state.min) * 100)
    };
  });
  tag.on('mount', function () {
    sliderRootEle = tag.root.querySelector('.riot-slider');
  });
});

/**
 * @file riot-component.js |基于riot的组件
 * @version 0.0.3beta1
 * @author fsy0718 <fsy0718@gmail.com>
 * @license MIT
 * @copyright fsy0718 2016
 */

});
