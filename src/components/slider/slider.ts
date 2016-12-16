/// <reference path="../riot.d.ts" />

import addEventListener from "../common/domEventListener";
import { isNumber, isUndefined } from "../common/utils";
import riotSlideTmpl from "./slider.tag";
import riotSlideCss from "./slider.css";

interface riotSliderOptsMarkObjectKeysInterface {
  label: string,
  tip?: boolean,
  dot?: boolean,
  width?: number
}

interface riotSliderOptsMarkInterface {
  [index: string]: string | riotSliderOptsMarkObjectKeysInterface
}

interface riotSliderEventHandlerInterface {
  (rangeValue: [number]): any
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

interface riotSliderTrackInterface {
  left: number,
  width: number
}

interface riotSliderStateInterface {
  points: riotSliderPointInterface[],
  marks: riotSliderPointInterface[],
  track: riotSliderTrackInterface,

}

export interface riotSliderOptsInterface {
  control?: boolean,
  dots?: boolean,
  vertical?: boolean,
  included?: boolean,
  disabled?: boolean,
  step?: number,
  value?: number[],
  min?: number,
  max?: number,

  //刻度相关
  marks?: riotSliderOptsMarkInterface,
  showMarkTips?: boolean,
  showMarkDots?: boolean,
  showAllTips?: boolean,
  showAllDots?: boolean,
  //range

  range?: boolean,
  rangeValueShouldEqual?: boolean,
  allowCross?: boolean,
  rangeGapFixed?: boolean,
  // 事件
  onChange?: riotSliderEventHandlerInterface,
  onBeforeChange?: riotSliderEventHandlerInterface,
  onAfterChange?: riotSliderEventHandlerInterface,
};


export default (function (Tag) {
  //初始化配置
  const initConfig = function (opts: riotSliderOptsInterface): riotSliderOptsInterface {
    let { step, min = 0, max = 100, value} = opts;
    min = Math.max(0, min);
    if (!(opts.marks || step) || (step && step <= 0) || !step) {
      step = 1;
    }
    let _value = parseValue(value, min, max)
    return {
      control: opts.control || false,
      vertical: opts.vertical || false,
      disabled: opts.disabled || false,
      allowCross: isUndefined(opts.allowCross) && true || opts.allowCross,
      rangeValueShouldEqual: isUndefined(opts.rangeValueShouldEqual) && true || opts.rangeValueShouldEqual,
      included: isUndefined(opts.included) && true || opts.included,
      min: min,
      max: max,
      showMarkTips: isUndefined(opts.showMarkTips) && true || opts.showMarkTips,
      showMarkDots: isUndefined(opts.showMarkDots) && true || opts.showMarkDots,
      range: opts.range || false,
      step: step,
      marks: opts.marks,
      value: _value,
      dots: opts.dots || false,
      showAllTips: opts.showAllTips || false,
      showAllDots: opts.showAllDots || false,
      rangeGapFixed: opts.rangeGapFixed || false,
      onChange: opts.onChange,
      onAfterChange: opts.onAfterChange,
      onBeforeChange: opts.onBeforeChange
    }
  };

  //检测值
  const parseValue = function (value: number[], min: number, max: number): number[] {
    let _value = [min, min];
    if (value && value.length) {
      let _v = [];
      value.forEach(function (v) {
        if (v >= min && v <= max) {
          _v.push(+v)
        } else {
          console.warn('riot-slider参数value中的%s由于不在参数min与参数max之间被移除', v)
        }
      });
      _value = _v.sort();
    }
    let _valen = _value.length;
    if (_valen > 2) {
      _value = _value.slice(0, 2)
    } else if (_valen < 2) {
      _value.unshift(min)
    }
    return _value
  };

  //初始化state
  const initState = function (tag: RiotSlider) {
    let pointAndMarks = getEnablePoint(tag.config);
    return {
      points: pointAndMarks.points,
      marks: pointAndMarks.marks,
      track: getTrack(tag.config)
    }
  }

  //计算可用的point和mark
  const getEnablePoint = function (config: riotSliderOptsInterface) {
    const {marks, min, max, step, showAllTips, showAllDots, showMarkTips, showMarkDots} = config;
    let points = [];
    let markPoints;
    let length = max - min;
    let w;
    if (step > 0) {
      showAllTips ? w = parseNumber(getMarkWidth(Math.ceil((max - min) / step))) : '';
      let i = min;
      while (i <= max) {
        if (!(marks && marks[i])) {
          let _point: riotSliderPointInterface = {
            key: i,
            label: '' + i,
            precent: parseNumber((i - min) / length * 100)
          }
          if (showAllTips) {
            _point.width = w;
            _point.tip = true
          }
          if (showAllDots) {
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
            label: (markIsString ? mark : ((mark as riotSliderOptsMarkObjectKeysInterface).label || '')) as string,
            width: markIsString ? w : parseNumber((mark as riotSliderOptsMarkObjectKeysInterface).width || w),
            precent: parseNumber((_key - min) / length * 100)
          }
          if (markIsString) {
            _point.dot = showMarkDots
            _point.tip = showMarkTips
          } else {
            _point.dot = (mark as riotSliderOptsMarkObjectKeysInterface).dot !== undefined ? (mark as riotSliderOptsMarkObjectKeysInterface).dot : showMarkDots
            _point.tip = (mark as riotSliderOptsMarkObjectKeysInterface).tip !== undefined ? (mark as riotSliderOptsMarkObjectKeysInterface).tip : showMarkTips
          }
          points.push(_point);
          _markPoints.push(_point);
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
      points: (points) as riotSliderPointInterface[],
      marks: (showAllDots ? points : markPoints) as riotSliderPointInterface[]
    }
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

  const getTrack = function (config: riotSliderOptsInterface): riotSliderTrackInterface {
    const {value, min, max} = config
    return {
      left: parseNumber((value[0] - min) / (max - min) * 100),
      width: parseNumber((value[1] - value[0]) / (max - min) * 100)
    }
  }




  class RiotSlider extends Tag {
    config: riotSliderOptsInterface;
    state: riotSliderStateInterface;
    constructor(dom: Element, opts: riotSliderOptsInterface) {
      super(dom, opts);
    }
    get name() {
      return 'riot-slider';
    }

    get tmpl() {
      return riotSlideTmpl;
    }

    get css(){
      return riotSlideCss;
    }

    get attrs(){
      return 'data-is="riot-slider"';
    }

    parseMarkItemClass(mark: riotSliderPointInterface): string {
      if (mark) {
        //mark元素与handler重叠会有问题，浏览器对4.5px处理方式不一样
        if (this.config.included && mark.precent > this.state.track.left && mark.precent < (this.state.track.left + this.state.track.width)) {
          return 'riot-slider__marks--items-select'
        }
      }
    }

    onCreate(opts: riotSliderPointInterface) {
      this.config = initConfig(opts);
      this.state = initState(this);
      console.log(this);
    }

  };
  return RiotSlider;
})(riot.Tag)