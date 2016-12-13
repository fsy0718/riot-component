/// <reference path="../riot.d.ts" />

import addEventListener from "../common/domEventListener";
import { isNumber, isUndefined } from "../common/utils";
import riotSlideTmpl from "./slider.tag";

interface riotSliderOptsInterface {
  control?: boolean,
  vertical?: boolean,
  allowCross?: boolean,
  rangeValueShouldEqual?: boolean,
  included?: boolean
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
            _point.dot = !isUndefined(opts.showMarkDots) ? opts.showMarkDots : true
            _point.tip = !isUndefined(opts.showMarkTips) ? opts.showMarkTips : true
          } else {
            _point.dot = mark.dot !== undefined ? mark.dot : !isUndefined(opts.showMarkDots) ? opts.showMarkDots : true
            _point.tip = mark.tip !== undefined ? mark.tip : !isUndefined(opts.showMarkTips) ? opts.showMarkTips : true
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

  class RiotSlider extends Tag {
    constructor(dom, opts = {}) {
      super(dom, opts);
      let sliderRootEle;
      this.on('mount', function () {
        sliderRootEle = this.root.querySelector('.riot-slider');
      })
    }
    get name() {
      return 'riot-slider';
    }
    get tmpl() {
      return riotSlideTmpl;
    }
    private state = {};
    private initState(opts: riotSliderOptsInterface) {
      this.state = {
        control: opts.control || false,
        isVertical: opts.vertical || false,
        allowCross: isUndefined(opts.allowCross) ? true : opts.allowCross,
        rangeValueShouldEqual: isUndefined(opts.rangeValueShouldEqual) ? true : opts.rangeValueShouldEqual,
        included: isUndefined(opts.included) ? true : opts.included
      }
    }
    onCreate(opts: riotSliderOptsInterface) {
      this.initState(opts);
    }
  }
  return RiotSlider;

})(riot.Tag)


