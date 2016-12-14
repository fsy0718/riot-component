/// <reference path="../riot.d.ts" />

import addEventListener from "../common/domEventListener";
import { isNumber, isUndefined } from "../common/utils";
import riotSlideTmpl from "./slider.tag";

interface riotSliderOptsMarkStringInterface {
  [index: string]: string
}

interface riotSliderOptsMarkObjectKeysInterface {
  label: string,
  tip ?: boolean,
  dot ?: boolean
}

interface riotSliderOptsMarkObjectInterface {
  [index: string]: riotSliderOptsMarkObjectKeysInterface
}

interface riotSliderOptsInterface {
  control?: boolean,
  vertical?: boolean,
  allowCross?: boolean,
  rangeValueShouldEqual?: boolean,
  included?: boolean,
  range ?: boolean,
  step ?: number,
  dots ?: boolean,
  marks ?: riotSliderOptsMarkStringInterface | riotSliderOptsMarkObjectInterface,
  value ?: [number],
  min ?:number,
  max ?: number
}

interface riotSliderPointInterface {
  key: number,
  label: string,
  precent: number,
  width?: number,
  tip?: boolean,
  mark?: boolean,
  dot?: boolean
}

interface ELementBoundingClientRect {
  top: number,
  left: number,
  right: number,
  bottom: number,
  width: number,
  height: number
}

export default (function (Tag) {
  const getHandleRect = function (handle: HTMLElement) {
    return handle.getBoundingClientRect();
  }
  const isNotTouchEvent = function (e: TouchEvent) {
    return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)
  }
  //保留四位有效数字
  const floatReg = /\./
  const parseNumber = function (num, dot = 4): number {
    let result = num;
    if (floatReg.test(num)) {
      result = num.toFixed(dot);
    }
    return +result;
  }
  const getMarkWidth = function (len: number): number {
    //算法来自https://github.com/react-component/slider/blob/master/src/Marks.jsx
    return parseNumber(100 / (len - 1) * 0.9)
  }
  const getEnablePoint = function (marks, state, opts) {
    const {min, max} = state;
    let points = [];
    let markPoints;
    let length = max - min;
    let w;
    let step = opts.range ? opts.step : opts.step || 1;
    if (step > 0) {
      opts.showAllTips ? w = parseNumber(getMarkWidth(Math.ceil((max - min) / step))) : '';
      let i = min;
      while (i <= max) {
        if (!(marks && marks[i])) {
          let _point: riotSliderPointInterface = {
            key: i,
            label: '' + i,
            precent: parseNumber((i - min) / length * 100)
          }
          if (opts.showAllTips) {
            _point.width = w;
            _point.tip = true
          }
          if (opts.showAllDots) {
            _point.dot = true
          }
          points.push(_point);
        }
        i += step;
      }
    }
    if (marks) {
      let _markPoints = [];
      let markCount = Object.keys(marks).length;
      w = getMarkWidth(markCount);
      let optShowMarkDotsNoUndefined = !isUndefined(opts.showMarkDots);
      let optShowMarkTipsNoUndefined = !isUndefined(opts.showMarkTips);
      for (let key in marks) {
        let _key = parseFloat(key);
        let mark = marks[key];
        if (_key >= min && _key <= max) {
          let markIsString = typeof marks[key] === 'string'
          let _point: riotSliderPointInterface = {
            key: _key,
            mark: true,
            label: markIsString ? mark : (mark.label || ''),
            width: markIsString ? w : parseNumber(mark.width || w),
            precent: parseNumber((_key - min) / length * 100)
          }
          if (markIsString) {
            _point.dot = optShowMarkDotsNoUndefined ? opts.showMarkDots : true
            _point.tip = optShowMarkTipsNoUndefined ? opts.showMarkTips : true
          } else {
            _point.dot = mark.dot !== undefined ? mark.dot : optShowMarkDotsNoUndefined ? opts.showMarkDots : true
            _point.tip = mark.tip !== undefined ? mark.tip : optShowMarkTipsNoUndefined ? opts.showMarkTips : true
          }
          points.push(_point);
          _markPoints.push(_point);
        } else {
          console.warn('riot-slider实例类名为%s中有key为%s的mark由于不在opts.min和opts.max之间被移除', opts.class, key)
        }
      }
      //筛选出错误的mark
      if (_markPoints.length !== markCount) {
        w = getMarkWidth(_markPoints.length);
        _markPoints.forEach(function (_mark) {
          _mark.width = w;
        })
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
    }
  }

  const getMousePosition = function(e: MouseEvent, isVertical=false){
    return isVertical ? e.clientY : e.pageX;
  }

  const getTouchPosition = function(e: TouchEvent, isVertical= false){
    return isVertical ? e.touches[0].clientY : e.touches[0].pageX;
  }
  //通过长度获取值
  const getPrecentByPosition = function (pos:number, rect: ELementBoundingClientRect, isVertical=false):number {
    let v;
    if (isVertical) {
      v = (pos - rect.top) / rect.height
    } else {
      v = (pos - rect.left) / rect.width;
    }
    return v > 1 ? 1 : v < 0 ? 0 : v;
  }
  const getClosetPointByPosition = function (position:number, rect:ELementBoundingClientRect, config: riotSliderOptsInterface, marks, points) {
    const {range, dots, vertical, max, min, step} = config;
    //precent需要先乘100并保留四位有效数字，求_value时再除以100,否则会造成3 => 2.999999999999999999999999的情况
    let precent = getPrecentByPosition(position, rect, vertical);
    let _value: number | Object = precent * (max - min) + min;
    if(range && !step){
      _value = getClosetValueByDichotomy(marks,_value);
    }else if(dots){
      _value = getClosetValueByDichotomy(points, _value);
    }else{
      _value = {
        key: parseInt(''+_value), 
      }
    }
    return {
      //precent小数点后可能不止四位，不用对外提供，不进行优化
      precent: precent * 100,
      point: _value
    }
  }
  //二分法查换值
const getClosetValueByDichotomy = function (source, val) {
  let len = source.length;
  if (val <= source[0].key) {
    return source[0];
  }
  if (val >= source[len - 1].key) {
    return source[len - 1];
  }
  let _source = source.slice(0);
  let _len;
  let i = 0;
  while ((_len = _source.length) > 0) {
    let _l;
    ++i;
    if (_len === 1) {
      return _source[0]
    } else {
      _l = Math.floor(_len / 2);
    }
    let d1 = val - _source[_l - 1].key;
    let d2 = _source[_l].key - val;
    if (d1 < 0) {
      //说明在右边
      _source = _source.slice(0, _l);
    } else if (d2 < 0) {
      //说明在左边
      _source = _source.slice(_l);
    } else {
      return d1 > d2 ? _source[_l] : _source[_l - 1];
    }
    if (i > len) {
      console.warn('由于算法原因，已进入死循环');
      return;
    }
  }
}
  const initConfig = function (opts: riotSliderOptsInterface) {
    let {marks, value, min = 0, max = 100} = opts;
    min = Math.max(0, min);
    return {
      control: opts.control || false,
      isVertical: opts.vertical || false,
      allowCross: isUndefined(opts.allowCross) ? true : opts.allowCross,
      rangeValueShouldEqual: isUndefined(opts.rangeValueShouldEqual) ? true : opts.rangeValueShouldEqual,
      included: isUndefined(opts.included) ? true : opts.included,
      min: min,
      max: max
    }
  }
  class RiotSlider extends Tag {
    config: Object
    constructor(dom, opts = {}) {
      super(dom, opts);
      let $eventRoot;
      this.on('mount', function () {
        $eventRoot = this.root.querySelector('.riot-slider');
      })
    }
    get name() {
      return 'riot-slider';
    }
    get tmpl() {
      return riotSlideTmpl;
    }
    private state = {};
    onCreate(opts: riotSliderOptsInterface) {
      this.config = initConfig(opts);
    }
  }
  return RiotSlider;

})(riot.Tag)


