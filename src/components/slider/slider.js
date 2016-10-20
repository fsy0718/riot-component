/**
 * @module riot-slider
 * @description 基于riot的slider,<a href="../demo/slider.html">实例</a>
 * 实现ant-design的{@link https://ant.design/components/slider/ 滑动输入条}
 */
/**
 * @typedef {object} riot-point
 * @property {number} key 当前的关键值
 * @property {number} mark 是否为mark 真为1
 * @property {string} label point的label值
 * @property {number} precent point在track上left值
 * @property {boolean} dot  是否显示dot,默认为true
 * @property {number}  width 每个point的宽度
 *  
 */
/**
 * @todo 增加vertical的支持,设置point的order值，滑到时计算顺序，快速查找值
 * @function riot-slider

 * @param {object} opts
 * @param {boolean} [opts.range=false] 双滑块模式
 * @param {number}  [opts.min=0] 最小值
 * @param {number}  [opts.max=100] 最大值
 * @param {number[]} [opts.value  设置当前值，如果range，默认为[0,0],否则为[0]
 * @param {number|null} [opts.step] 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。
 * @param {boolean} [opts.dots=false] 是否只能拖到刻度上
 * @param {boolean} [opts.showMarkTip=true] 是否显示mark的提示
 * @param {boolean} [opts.showMarkDot=true] 是否显示mark的刻度
 * @param {boolean} [opts.allowCross=true] 在range时是否可以值是否可以互换
 * @param {boolean} [opts.showAllTips=false] 是否显示根据min max step计算出来的dot的提示
 * @param {boolean} [opts.showAllDots=false] 是否显示根据min max step计算出来的dot图标
 * @param {boolean} [opts.included=true]     值为 true 时表示值为包含关系，false 表示并列
 * @param {boolean} [opts.rangeValueShouldEqual=true] range变动过程中两个值是否可以相等
 */
import addEventListener from "../common/rc-util-dom-addEventListener"
"use strict";
let tag = this;
let state = {};
//slider根元素
let sliderRootEle = null;
//TODO 增加vertical为true的支持
let isVertical = opts.vertical || false;
//是否可以交换值
let allowCross = opts.allowCross === undefined ? true : opts.allowCross;
//range值是否可以相等
let rangeValueShouldEqual = opts.rangeValueShouldEqual === undefined ? true : opts.rangeValueShouldEqual
tag.included = opts.included === undefined ? true : opts.included;
const isNotTouchEvent = function (e) {
  return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)
}
//保留四位有效数字
const floatReg = /\./
const parseNumber = function (num, dot = 4) {
  let result = num;
  if (floatReg.test(num)) {
    result = num.toFixed(dot);
  }
  return +result;
}
const getMarkWidth = function (len) {
  //算法来自https://github.com/react-component/slider/blob/master/src/Marks.jsx
  return parseNumber(100 / (len - 1) * 0.9)
}
//计算可停靠值对象
const getEnablePoint = function (min, max, step, marks) {
  let points = [];
  let markPoints;
  let length = max - min;
  let w;
  if (step > 0) {
    opts.showAllTips ? w = parseNumber(getMarkWidth(Math.ceil((max - min) / step))) : '';
    let i = min;
    while (i <= max) {
      if (!(marks && marks[i])) {
        let _point = {
          key: i,
          label: '' + i,
          precent: parseNumber((i - min) / length * 100)
        }
        if(opts.showAllTips){
          _point.width = w;
          _point.tip = true
        }
        if(opts.showAllDots){
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
        let _point = {
          key: _key,
          mark: true,
          label: markIsString ? mark : (mark.label || ''),
          width: markIsString ? w : parseNumber(mark.width || w)
        }
        if (markIsString) {
          _point.dot = opts.showMarkDots !== undefined ? opts.showMarkDots : true
          _point.tip = opts.showMarkTips !== undefined ? opts.showMarkTips : true
        } else {
          _point.dot = mark.dot !== undefined ? mark.dot : opts.showMarkDots !== undefined ? opts.showMarkDots : true
          _point.tip = mark.tip !== undefined ? mark.tip : opts.showMarkTips !== undefined ? opts.showMarkTips : true
        }
        _point.precent = parseNumber((_point.key - min) / length * 100);
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
//根据slider__mark来计算当前的值
const getMousePosition = function (e) {
  return isVertical ? e.clientY : e.pageX;
}
const getTouchPosition = function(e){
  return isVertical ? e.touches[0].clientY : e.touches[0].pageX;
}
const getHandleRect = function (handle = sliderRootEle) {
  const coords = handle.getBoundingClientRect();
  return coords;
}
//通过position来获取point
const getClosetPointByPosition = function (position) {
  const {range, step, dots} = opts;
  //precent需要先乘100并保留四位有效数字，求_value时再除以100,否则会造成3 => 2.999999999999999999999999的情况
  let precent = parseNumber(getPrecentByPosition(position) * 100);
  let _value = precent / 100 * (state.max - state.min) + state.min;
  if (state.source) {
    _value = getClosetValueByDichotomy(state.source, _value);
  }
  return {
    precent: precent,
    point: _value
  }
}
//通过长度获取值
const getPrecentByPosition = function (pos) {
  const coords = getHandleRect();
  let v;
  if (isVertical) {
    v = (pos - coords.top) / coords.height
  } else {
    v = (pos - coords.left) / coords.width;
  }
  return v;
}
const setRangeValue = function (val) {
  if(!rangeValueShouldEqual && val === state.rangeStableValue){
    return false;
  }
  state.value = [val, state.rangeStableValue].sort(function (a, b) {
    return a - b;
  })
  if (!allowCross && (state.rangeChangeHandle === 0 && val > state.rangeStableValue || state.rangeChangeHandle === 1 && val < state.rangeStableValue)) {
    return false;
  }
  return true;
}
//点击时确认是哪个handle移动的
const getHandleIndex = function (precent) {
  let index;
  let d1 = precent - tag.selectTrack.left;
  let d2 = tag.selectTrack.left + tag.selectTrack.width - precent;
  if (d1 <= 0) {
    index = 0
  } else if (d2 <= 0) {
    index = 1;
  } else {
    index = d1 > d2 ? 1 : 0;
  }
  return index;
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
const diffArrayIsEqual = function(arr1, arr2){

}
//更新state.value值
const updateStateValue = function(point){
  state.changePointKey = point.key;
  if (opts.range) {
    let result = setRangeValue(point.key);
    if (!result) {
      return;
    }
  } else {
    state.value = [state.min, point.key];
  }
  tag.update();
  if (opts.onChange) {
    opts.onChange(opts.range ? state.value : [state.value[1]]);
  }
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
    updateStateValue(point);
  }
}
const end = function (type) {
  //TODO 需要值
  state.handle = undefined;
  state.oldVal = null;
  opts.afterChange && opts.afterChange(state.value);
  removeEvents(type);
}
const onStart = function (position) {
  let closetPoint = getClosetPointByPosition(position);
  state.changePointKey = closetPoint.point.key;
  if(opts.range){
    state.rangeChangeHandle = getHandleIndex(closetPoint.precent);
    state.rangeStableValue = state.value[state.rangeChangeHandle === 0 ? 1 : 0];
  }
  opts.beforeChange && opts.beforeChange(closetPoint.key);
  //如果点击的位置不在选中的结束或开始，则更新state.value
  if(state.value.indexOf(state.changePointKey) === -1){
    updateStateValue(closetPoint.point);
  }

}
const pauseEvent = function (e) {
  e.stopPropagation();
  e.preventDefault();
}
const addDocumentEvents = function (type) {
  if (type === 'touch') {
    // just work for chrome iOS Safari and Android Browser
    tag.onTouchMoveListener =
      addEventListener(document, 'touchmove', onTouchMove.bind(tag));
    tag.onTouchUpListener =
      addEventListener(document, 'touchend', end.bind(tag, 'touch'));
  } else if (type === 'mouse') {
    tag.onMouseMoveListener =
      addEventListener(document, 'mousemove', onMouseMove.bind(tag));
    tag.onMouseUpListener =
      addEventListener(document, 'mouseup', end.bind(tag, 'mouse'));
  }
}
const removeEvents = function (type) {
  if (type === 'touch') {
    tag.onTouchMoveListener.remove();
    tag.onTouchUpListener.remove();
  } else if (type === 'mouse') {
    tag.onMouseMoveListener.remove();
    tag.onMouseUpListener.remove();
  }
}
//初始化参数，before-mount会在update之后触发
const init = function () {
  let {marks, value, range, min = 0, max = 100, step = 1, dots} = opts;
  min = Math.max(0, min);
  //筛选不合规范的值
  let _value = [min, min];
  if(value !== undefined && Object.prototype.toString.call(value) !== '[object Array]'){
    console.warn('riot-slider实例类名为%s的opts.value不为数组，将强制转为数组',opts.class || 'riot-slider');
    _value = [Number(value) || min]
  }else if (value && value.length) {
    let _v = [];
    
    value.forEach(function (v) {
      if (v >= min && v <= max) {
        _v.push(+v);
      } else {
        console.warn('riot-slider实例类名为%s的opts.value由于不在opts.min与opts.max之间被移动', opts.class || 'riot-slider',v)
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
  //存储值，需要对value在dots下对值进行校验是否为mark中的
  state.value = _value;
  state.min = min;
  state.max = max;
  let data = getEnablePoint(min, max, step, marks);
  if (range && !step || dots) {
    state.source = data.marks;
  } else {
    state.source = data.points;
  }
  tag.marks = data.marks;
}
init();
tag.noop = function (e) {
  e.preventUpdate = true;
  return;
};
//生成markItem的class类名
tag.parseMarkItemClass = function (mark, type) {
  if (mark) {
    //mark元素与handler重叠会有问题，浏览器对4.5px处理方式不一样
    if (included && mark.precent > tag.selectTrack.left && mark.precent < (tag.selectTrack.left + tag.selectTrack.width)) {
      return 'riot-slider__marks--items-select'
    }
  }
}
//事件
tag.onMouseDown = function (e) {
  const {range, step} = opts;
  if (e.button !== 0) {
    e.preventUpdate = true;
    return;
  }
  let position = getMousePosition(e);
  onStart(position);
  pauseEvent(e);
  addDocumentEvents('mouse');
}
tag.onTouchStart = function(e){
  if(isNotTouchEvent(e)){
    e.preventUpdate = true;
    return;
  }
  let position = getTouchPosition(e);
  onStart(position);
  pauseEvent(e);
  addDocumentEvents('touch');
}
//更新
tag.on('update', function () {
  tag.selectTrack = {
    left: parseNumber((state.value[0] - state.min) / (state.max - state.min) * 100),
    width: parseNumber((state.value[1] - state.value[0]) / (state.max - state.min) * 100)
  }
});
tag.on('mount', function () {
  sliderRootEle = tag.root.querySelector('.riot-slider');
})