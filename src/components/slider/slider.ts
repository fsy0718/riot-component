/// <reference path="../../../typings/index.d.ts" />


import addEventListener from "../common/domEventListener";
import {addEventListenerReturnInterface, IE8DocumentInterface} from "../common/domEventListener";
import { isNumber, isUndefined, pauseEvent } from "../common/utils";
import objectAssign from "../common/objectAssign";
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
  (rangeValue: number[]): any
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

interface riotSliderTrackInterface {
  left: number,
  width: number
}

interface riotSliderPropsInterface {
  points: riotSliderPointInterface[],
  marks: riotSliderPointInterface[],
  root?: Element,
  rangeGap?: number
}

interface riotSliderStateInterface {
  track: riotSliderTrackInterface,
  changePointKey?: number,
  rangeChangeHandle?: number,
  rangeStableValue?: number,
  value: number[],
  onTouchMoveListener?: addEventListenerReturnInterface,
  onTouchUpListener?: addEventListenerReturnInterface,
  onMouseMoveListener?: addEventListenerReturnInterface,
  onMouseUpListener?: addEventListenerReturnInterface
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
  const defaultConfig = {
    allowCross: true,
    rangeValueShouldEqual: true,
    included: true,
    showMarkTips: true,
    showMarkDots: true,
    min: 0,
    max: 100
  }
  //初始化配置
  const initConfig = function (opts: riotSliderOptsInterface): riotSliderOptsInterface {
    let config = objectAssign({}, defaultConfig, opts);
    let { step, min, max} = config;
    min = Math.max(0, min);
    step = config.range ? config.marks ? config.step : config.step || 1 : config.step || 1
    config.min = min;
    config.max = max;
    config.step = step;
    return config;
  };

  //初始化props
  const initProps = function (ctx: RiotSlider) {
    let pointAndMarks = getEnablePoint(ctx.config);
    let props: riotSliderPropsInterface = {
      points: pointAndMarks.points,
      marks: pointAndMarks.marks
    };
    if (ctx.config.range && ctx.config.rangeGapFixed) {
      let rangeGap = ctx.state.value[1] - ctx.state.value[0];
      if (!rangeGap) {
        console.warn('riot-slider的rangeGap为0，会变为类似include=false的效果');
      } else {
        props.rangeGap = rangeGap;
      }
    }
    return props
  };

  const initState = function (ctx: RiotSlider) {
    const {min, max, value} = ctx.config;
    let _value = parseValue(value, min, max);
    let track = getTrack(_value, min, max)
    return {
      value: _value,
      track: track
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

  const getValue = function (value: number[], range: boolean): number[] {
    return range ? value.concat() : value.slice(1, 2);
  };

  const setValue = function (val: number, state: riotSliderStateInterface, config: riotSliderOptsInterface, props: riotSliderPropsInterface) {
    const {rangeValueShouldEqual, rangeGapFixed, allowCross} = config;
    let {value, rangeChangeHandle, rangeStableValue} = state;
    if (!rangeValueShouldEqual && val === rangeStableValue) {
      return false;
    }
    //如果固定range的差值
    if (rangeGapFixed) {
      //滑动方向 1表示向右 -1向左
      
      let direction = val - value[rangeChangeHandle];
      if (direction > 0) {
        direction = 1
      } else if (direction < 0) {
        direction = -1;
      } else {
        //如果为0 直接不更新
        return false;
      }
      let newVal = value[rangeChangeHandle ? 0 : 1] + direction * props.rangeGap;
      let newValInPoint = props.points.some(function (point) {
        return point.key === newVal
      })
      if (newValInPoint) {
        state.value = rangeChangeHandle === 0 ? [val, newVal] : [newVal, val];
        return true
      }
      return false;
    }
    state.value = [val, rangeStableValue].sort(function (a, b) {
      return a - b;
    });
    let diff = val - rangeStableValue
    if (!allowCross && (rangeChangeHandle === 0 && val > rangeStableValue || rangeChangeHandle === 1 && val < rangeStableValue)) {
      return false;
    }
    return true;
  };

  const updateValue = function (point: riotSliderPointInterface, ctx: RiotSlider) {
    ctx.state.changePointKey = point.key;
    const {config, state, props} = ctx;
    let shouldUpdate: boolean;
    if (config.range) {
      shouldUpdate = setValue(point.key, state, config, props);
    } else {
      state.value = [config.min, point.key];
      shouldUpdate = true
    }
    return shouldUpdate;
  };

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
  };

  //保留四位有效数字
  const floatReg = /\./;

  const parseNumber = function (num, dot = 4): number {
    let result = num;
    if (floatReg.test(num)) {
      result = num.toFixed(dot);
    }
    return +result;
  };

  const getMarkWidth = function (len: number): number {
    //算法来自https://github.com/react-component/slider/blob/master/src/Marks.jsx
    return parseNumber(100 / (len - 1) * 0.9)
  };

  const isNotTouchEvent = function (e: TouchEvent) {
    return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
  };

  const getTrack = function (value: number[], min, max): riotSliderTrackInterface {
    return {
      left: parseNumber((value[0] - min) / (max - min) * 100),
      width: parseNumber((value[1] - value[0]) / (max - min) * 100)
    }
  };

  const getRootSliderBoundingRect = function (ele: Element) {
    return ele.getBoundingClientRect();
  };

  const getHandleIndex = function (precent: number, track: riotSliderTrackInterface): number {
    let index: number;
    let d1 = precent - track.left;
    let d2 = track.left + track.width - precent;
    if (d1 <= 0) {
      index = 0
    } else if (d2 <= 0) {
      index = 1;
    } else {
      index = d1 > d2 ? 1 : 0;
    }
    return index;
  };

  const getClosetValueByDichotomy = function (source: riotSliderPointInterface[], val: number): riotSliderPointInterface {
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
  };

  const getClosetPointByPosition = function (pos: number, ctx: RiotSlider) {
    const {config, props} = ctx;
    let rect = getRootSliderBoundingRect(props.root);
    let precent = getPrecentByPosition(pos, rect, config.vertical)
    let _value = precent * (config.max - config.min) + config.min;
    let point;
    if (config.range && !config.step) {
      point = getClosetValueByDichotomy(props.marks, _value);
    } else if (config.dots) {
      point = getClosetValueByDichotomy(props.points, _value);
    } else {
      point = {
        key: parseInt('' + _value)
      }
    }
    return {
      precent: precent * 100,
      point: point as riotSliderPointInterface
    }
  };

  const getPrecentByPosition = function (pos: number, rect: ClientRect, vertical: boolean) {
    let v: number;
    if (vertical) {
      v = (pos - rect.top) / rect.height;
    } else {
      v = (pos - rect.left) / rect.width;
    }
    return v > 1 ? 1 : v < 0 ? 0 : v;
  };

  const onMove = function (pos, ctx: RiotSlider) {
    let closetPoint = getClosetPointByPosition(pos, ctx);
    let point = closetPoint.point;
    if (ctx.state.changePointKey !== point.key) {
      let shouldUpdate = updateValue(point, ctx);
      if (shouldUpdate) {
        ctx.update();
        ctx.config.onChange && ctx.config.onChange(getValue(ctx.state.value, ctx.config.range));
      }
    }
  };

  const addDocumentEvents = function (type: string, ctx: RiotSlider) {
    if (type === 'touch') {
      // just work for chrome iOS Safari and Android Browser
      ctx.state.onTouchMoveListener =
        addEventListener(document as IE8DocumentInterface, 'touchmove', onTouchMove.bind(ctx));
      ctx.state.onTouchUpListener =
        addEventListener(document as IE8DocumentInterface, 'touchend', eventEnd.bind(ctx, 'touch'));
    } else if (type === 'mouse') {
      ctx.state.onMouseMoveListener =
        addEventListener(document as IE8DocumentInterface, 'mousemove', onMouseMove.bind(ctx));
      ctx.state.onMouseUpListener =
        addEventListener(document as IE8DocumentInterface, 'mouseup', eventEnd.bind(ctx, 'mouse'));
    }
  };

  const removeDocumentEvents = function (type: string, ctx: RiotSlider) {
    if (type === 'touch') {
      ctx.state.onTouchMoveListener.remove();
      ctx.state.onTouchUpListener.remove();
    } else if (type === 'mouse') {
      ctx.state.onMouseMoveListener.remove();
      ctx.state.onMouseUpListener.remove();
    }
  };

  const getMousePosition = function (e: MouseEvent, vertical: boolean) {
    return vertical ? e.clientY : e.pageX;
  };

  const getTouchPosition = function (e: TouchEvent, vertical: boolean) {
    return vertical ? e.touches[0].clientY : e.touches[0].pageX;
  };

  const onEventStart = function (pos: number, ctx: RiotSlider) {
    const {state, config} = ctx;

    let closetPoint = getClosetPointByPosition(pos, ctx);
    state.changePointKey = closetPoint.point.key;
    if (config.range) {
      state.rangeChangeHandle = getHandleIndex(closetPoint.precent, state.track);
      state.rangeStableValue = state.value[state.rangeChangeHandle === 0 ? 1 : 0];
    }
    config.onBeforeChange && config.onBeforeChange(getValue(state.value, config.range));
    //如果点击的位置不在选中的结束或开始，则更新state.value
    if (state.value.indexOf(state.changePointKey) === -1) {
      let shouldUpdate = updateValue(closetPoint.point, ctx);
      if (shouldUpdate) {
        config.onChange && config.onChange(getValue(state.value, config.range));
      }
      return shouldUpdate;
    } else {
      return false;
    }
  };

  const onMouseMove = function (e) {
    pauseEvent(e);
    let self = this as RiotSlider
    let pos = getMousePosition(e, self.config.vertical);
    onMove(pos, self)
  };

  const onTouchMove = function (e) {
    if (isNotTouchEvent(e)) {
      eventEnd('touch');
      e.preventUpdate = true;
      return;
    }
    pauseEvent(e);
    let self = this as RiotSlider
    let pos = getTouchPosition(e, self.config.vertical);
    onMove(pos, self);
  };

  const eventEnd = function (type) {
    let self = this as RiotSlider;
    delete self.state.rangeChangeHandle;
    delete self.state.rangeStableValue;
    self.config.onAfterChange && self.config.onAfterChange(getValue(self.state.value, self.config.range));
    removeDocumentEvents(type, self);
  };

  class RiotSlider extends riot.Tag {
    config: riotSliderOptsInterface;
    state: riotSliderStateInterface;
    props: riotSliderPropsInterface;
    get name() {
      return 'riot-slider';
    }

    get tmpl() {
      return riotSlideTmpl;
    }

    get css() {
      return riotSlideCss;
    }

    get attrs() {
      return 'data-is="riot-slider"';
    }

    noop() {

    };

    onTouchstart(e) {
      let self = this as RiotSlider
      if (isNotTouchEvent(e) || self.config.control) {
        e.preventUpdate = true;
        return;
      }
      pauseEvent(e);
      let pos = getTouchPosition(e, self.config.vertical);
      let shouldUpdate = onEventStart(pos, self);
      addDocumentEvents('touch', self);
      e.preventUpdate = shouldUpdate;
    }

    onMousedown(e) {
      let self = this as RiotSlider
      const {control, vertical} = self.config;
      if (e.button !== 0 || control) {
        e.prevendUpdate = true;
        return;
      }
      pauseEvent(e);

      let pos = getMousePosition(e, vertical);
      let shouldUpdate = onEventStart(pos, self);
      addDocumentEvents('mouse', self);
      e.preventUpdate = shouldUpdate;

    }

    parseMarkItemClass(mark: riotSliderPointInterface): string {
      if (mark) {
        //mark元素与handler重叠会有问题，浏览器对4.5px处理方式不一样
        if (this.config.included && mark.precent > this.state.track.left && mark.precent < (this.state.track.left + this.state.track.width)) {
          return 'riot-slider__marks--items-select'
        }
      }
    }

    //创建RiotSlider时
    onCreate(opts: riotSliderPointInterface) {
      this.config = initConfig(opts);
      this.state = initState(this);
      this.props = initProps(this);
      this.on('mount', function () {
        this.props.root = this.root.querySelector('.riot-slider');
      })
      this.on('update', function () {
        this.state.track = getTrack(this.state.value, this.config.min, this.config.max);
      });
      console.log(this)
    }

    setValue(value: number[]) {
      let _value = parseValue(value, this.config.min, this.config.max);
      //TODO 需要考虑从setValue进入
      this.state.value = _value;
      this.update();
    }

    setControl(control: boolean){
      this.config.control = control;
    }

  };
  
  return RiotSlider;
})(riot.Tag)