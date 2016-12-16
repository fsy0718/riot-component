


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

  const parseValue = function(value: number[], min:number, max:number, opts): number[]{
    let _value = [min, min];
    if(value && value.length){
      let _v = [];
      value.forEach(function(v){
        if(v >= min && v <= max){
          _v.push(+v)
        }else{
        console.warn('riot-slider实例类名为%s的opts.value由于不在opts.min与opts.max之间被移动', opts.class || 'riot-slider',v)
        }
      });
      _value = _v.sort();
    }
    let _valen = _value.length;
    if(_valen > 2){
      _value = _value.slice(0,2)
    }else if(_valen < 2){
      _value.unshift(min)
    }
    return _value
  }

  const getEnablePoint = function (marks, config) {
    const {min, max, step, showAllTips, showAllDots, showMarkTips, showMarkDots} = config;
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
            label: markIsString ? mark : (mark.label || ''),
            width: markIsString ? w : parseNumber(mark.width || w),
            precent: parseNumber((_key - min) / length * 100)
          }
          if (markIsString) {
            _point.dot = showMarkDots
            _point.tip = showMarkTips
          } else {
            _point.dot = mark.dot !== undefined ? mark.dot : showMarkDots
            _point.tip = mark.tip !== undefined ? mark.tip : showMarkTips
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
      points: points,
      marks: showAllDots ? points : markPoints
    }
  }

  const getMousePosition = function (e: MouseEvent, vertical = false) {
    return vertical ? e.clientY : e.pageX;
  }

  const getTouchPosition = function (e: TouchEvent, vertical = false) {
    return vertical ? e.touches[0].clientY : e.touches[0].pageX;
  }
  //通过长度获取值
  const getPrecentByPosition = function (pos: number, rect: ELementBoundingClientRect, vertical = false): number {
    let v;
    if (vertical) {
      v = (pos - rect.top) / rect.height
    } else {
      v = (pos - rect.left) / rect.width;
    }
    return v > 1 ? 1 : v < 0 ? 0 : v;
  }

  const getClosetPointByPosition = function (position: number, rect: ELementBoundingClientRect, config: riotSliderOptsInterface, marks, points) {
    const {range, dots, vertical, max, min, step} = config;
    //precent需要先乘100并保留四位有效数字，求_value时再除以100,否则会造成3 => 2.999999999999999999999999的情况
    let precent = getPrecentByPosition(position, rect, vertical);
    let _value: number | Object = precent * (max - min) + min;
    if (range && !step) {
      _value = getClosetValueByDichotomy(marks, _value);
    } else if (dots) {
      _value = getClosetValueByDichotomy(points, _value);
    } else {
      _value = {
        key: parseInt('' + _value),
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

  const setRangeValue = function (val, state, config): boolean {
    const {rangeValueShouldEqual, rangeGapFix, allowCross} = config;
    let {values, rangeGap, rangeStableValue, rangeChangeHandle, cachePoint} = state;
    if(!rangeValueShouldEqual && val === rangeStableValue){
      return false;
    }
    //如果固定range的差值
    if(rangeGapFix){
      //滑动方向 1表示向右 -1向左
      let direction = val - values[rangeChangeHandle];
      if(direction > 0){
        direction = 1
      }else if(direction < 0){
        direction = -1;
      }else{
        //如果为0 直接不更新
        return false;
      }
      let newVal = values[rangeChangeHandle ? 0 : 1] + direction * rangeGap;
      let newValInPoint = cachePoint.points.some(function(point){
        return point.key === newVal
      })
      if(newValInPoint){
        values = rangeChangeHandle === 0 ? [val, newVal] : [newVal, val];
        return true
      }
      return false;
    }
    values = [val, rangeStableValue].sort(function (a, b) {
      return a - b;
    })
    let diff = val - rangeStableValue
    if (!allowCross && (rangeChangeHandle === 0 && val > rangeStableValue || rangeChangeHandle === 1 && val < rangeStableValue)) {
      return false;
    }
    return true;
  }

  //点击时确认是哪个handle移动的
  const getHandleIndex = function (precent, selectTrack) {

    let index;
    let d1 = precent - selectTrack.left;
    let d2 = selectTrack.left + selectTrack.width - precent;
    if (d1 <= 0) {
      index = 0
    } else if (d2 <= 0) {
      index = 1;
    } else {
      index = d1 > d2 ? 1 : 0;
    }
    return index;
  }

  const getValue = function(config:riotSliderOptsInterface, state): number[]{
    return config.range ? state.value.concat() : state.value.slice(1,2);
  }

  //更新state.value值，返回是否更新成功
  const updateStateValue = function(point, config: riotSliderOptsInterface, state){
    state.changePointKey = point.key;
    let shouldUpdate ;
    if (config.range) {
      shouldUpdate = setRangeValue(point.key, state, config);
    } else {
      state.value = [config.min, point.key];
      shouldUpdate = true;
    }
    return shouldUpdate;
  }

  const onMouseMove = function (e) {
    let position = getMousePosition(e);
    onMove(position)
  }
  const onTouchMove = function(e){
    if(isNotTouchEvent(e)){
      end('touch');
      e.preventUpdate = true;
      return;
    }
    let position = getTouchPosition(e);
    onMove(position)
  }
  const onMove = function(position){
    //TODO 不断的去比较值，后期进行优化
    let closetPoint = getClosetPointByPosition(position);
    let point = closetPoint.point;
    if (state.changePointKey !== point.key ) {
      let shouldUpdate = updateStateValue(point);
      if(shouldUpdate){
        tag.update();
        opts.onChange && opts.onChange(getValue());
      }
    }
  }
  const end = function (type) {
    //TODO 需要值
    state.rangeChangeHandle = undefined;
    state.rangeStableValue = null;
    opts.onAfterChange && opts.onAfterChange(getValue());
    removeEvents(type);
  }
  const initConfig = function (opts: riotSliderOptsInterface): riotSliderOptsInterface {
    let { step,  min = 0, max = 100, value} = opts;
    min = Math.max(0, min);
    if(!(opts.marks || step) || (step && step <= 0) || !step){
      step = 1;
    }
    let _value = parseValue(value, min, max, opts)
    return {
      control: opts.control || false,
      vertical: opts.vertical || false,
      allowCross: isUndefined(opts.allowCross) && true || opts.allowCross,
      rangeValueShouldEqual: isUndefined(opts.rangeValueShouldEqual) && true || opts.rangeValueShouldEqual,
      included: isUndefined(opts.included) && true || opts.included,
      min: min,
      max: max,
      showMarkTip: isUndefined(opts.showMarkTip) && true || opts.showMarkTip,
      showMarkDot: isUndefined(opts.showMarkDot) && true || opts.showMarkDot,
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
  }

  class RiotSlider extends Tag {
    config: riotSliderOptsInterface
    selectTrack: {left:number, width: number}
    constructor(dom: Element, opts: riotSliderOptsInterface = {}) {
      super(dom, opts);
      console.log(opts);
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

    onCreate(opts: riotSliderOptsInterface) {
      this.config = initConfig(opts);
      console.log(111);
      console.log(this.config)
    }
  }
  return RiotSlider;

})(riot.Tag)


