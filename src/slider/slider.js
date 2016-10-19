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
 * @todo 增加vertical的支持
 * @function riot-slider
 * @description 基于riot的slider，为ant-design库中slider的riot版本
 * @see {@link https://ant.design/components/slider/ 滑动输入条}
 * @param {object} opts
 * @param {boolean} [opts.range=false] 双滑块模式
 * @param {number}  [opts.min=0] 最小值
 * @param {number}  [opts.max=100] 最大值
 * @param {number[]} [opts.value  设置当前值，如果range，默认为[0,0],否则为[0]
 * @param {number|null} [opts.step] 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。
 * @param {boolean} [opts.dots=false] 是否只能拖到刻度上
 * @param {boolean} [opts.showMarkTip=true] 是否显示mark的提示
 * @param {boolean} [opts.showMarkDot=true] 是否显示mark的刻度
 * @param {boolean} [opts.disableCross=true] 在range时是否可以值是否可以互换
 * @param {boolean} [opts.showAllTips=false] 是否显示根据min max step计算出来的dot的提示
 * @param {boolean} [opts.showAllDots=false] 是否显示根据min max step计算出来的dot图标
 */
import addEventListener from "../common/rc-util-dom-addEventListener"
"use strict";
let tag = this;
let state = {};
//slider根元素
let sliderRootEle = null;
//TODO 增加vertical为true的支持
let isVertical = opts.vertical || false;

const isNotTouchEvent = function (e) {
  return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)
}
const calOffset = function (value) {
  const {min, max} = state;
  const ratio = (value - min) / (max - min);
  return ratio * 100;
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
        /*let index = state.value.indexOf(i);
        if(index > -1){
          _point.select = 1;
        }
        if(opts.range){
          if(_point.range){
            _point.range = 2;
          }
          if(index === 0){
            _point.range = -1;
          }
          else if(index === 1){
            _point.range = 1;
          }
          else if(i > state.value[0] && i < state.value[1]){
            _point.range = 0;
          }
        }*/
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
      if (_key >= min && _key <= max) {
        let markIsString = typeof marks[key] === 'string'
        let _point = {
          key: _key,
          mark: true,
          label: markIsString ? marks[key] : (marks[key].label || ''),
          width: markIsString ? w : parseNumber(marks[key].width || w)
        }
        if (markIsString) {
          _point.dot = opts.showMarkDots !== undefined ? opts.showMarkDots : true
          _point.tip = opts.showMarkTips !== undefined ? opts.showMarkTips : true
        } else {
          _point.dot = mark.dot !== undefined ? mark.dot : opts.showMarkDots !== undefined ? opts.showMarkDots : true
          _point.tip = mark.tip !== undefined ? mark.tip : opts.showMarkTips !== undefined ? opts.showMarkTips : true
        }
        _point.precent = parseNumber((_point.key - min) / length * 100);
        /*let index = state.value.indexOf(_key);
        //select
        if(index > -1){
          _point.select = 1;
        }
        //range值
        if(opts.range){
          if(_point.range){
            _point.range = 2;
          }

          if(index === 0){
            _point.range = -1;
          }
          else if(index === 1){
            _point.range = 1;
          }
          else if(_key > state.value[0] && _key < state.value[1]){
            _point.range = 0;
          }
        }*/
        points.push(_point);
        _markPoints.push(_point);
      } else {
        console.warn('riot-slider中实例类名为%s中有key为%s的mark由于不在opts.min和opts.max之间被移除', opts.class, key)
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
//为每个point增加顺序
const setPointOrder = function (source) {
  if (source) {
    source.forEach(function (point, i) {
      point.order = i;
    });
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
//判断是否点击的mark或dot
const elementIsMark = function (ele) {
  let _c = ele.classList;
  return _c.contains('riot-slider__marks--items-dot') || _c.contains('riot-slider__marks--items-tip');
}
const elementIsHandler = function (ele) {
  return ele.classList.contains('riot-slider__handler');
}
//通过元素获取值
const getValueByEle = function (ele) {
  if (ele.dataset.key !== undefined) {
    let val = tag.marks[ele.dataset.key];
    return {
      precent: val.precent,
      point: val
    }
  }
  return null;
}
//TODO 如果是只能通过mark来取值，可以根据precent来判断是否到达下一个值的范围，就不用实时的获取value
//通过事件来获取值
const getValueByEvent = function (e, type) {
  const {range, step, dots} = opts;
  let position = type === 'mouse' ? getMousePosition(e) : getTouchPosition(e);
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
//循环查找最近值
const getClosetValue = function (source, val) {
  let i = 0;
  let len = source.length;
  if (val === source[0].key) {
    return source[0];
  }
  if (val === source[len - 1].key) {
    return source[len - 1]
  }
  while (i < len) {
    let _lastVal = i > 0 ? source[i - 1] : { key: -1 };
    let _val = source[i];
    let d1 = val - _lastVal.key;
    let d2 = _val.key - val;
    if (d1 >= 0 && d2 >= 0) {
      console.log('value1', i);
      return d1 > d2 ? _val : i === 0 ? _val : _lastVal;
    }
    //当只有marks时，可能点击的位置在最后一个mark的后面，应该取最后一个mark
    if (i === len - 1) {
      return source[i];
    }
    i++;

  }
}
const setRangeValue = function (val) {
  state.value = [val, state.oldVal].sort(function (a, b) {
    return a - b;
  })
  if (opts.disableCross && (state.handle === 0 && val > state.oldVal || state.handle === 1 && val < state.oldVal)) {
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
const onMouseMove = function (e) {
  onMove(e, 'mouse');
}
const onMove = function(e, type){
  console.log(3)
  //不断的去比较值，后期进行优化
  let point = getValueByEvent(e,type);
  let _point = point.point;
  if (state.key !== _point.key) {
    state.key = _point.key;
    if (opts.range) {
      let result = setRangeValue(_point.key);
      if (!result) {
        return;
      }
    } else {
      state.value = [state.min, _point.key];
    }
    console.log(state.value);
    tag.update();
    if (opts.onChange) {
      let _val = opts.range ? state.value : [state.value[1]]
      opts.onChange(_val);
    }
  } else {
    return;
  }
}
const onTouchMove = function(e){
  if(isNotTouchEvent(e)){
    end('touch');
    return;
  }
  onMove(e, 'touch')
}
const end = function (type) {
  //TODO 需要值
  state.handle = undefined;
  state.oldVal = null;
  opts.afterChange && opts.afterChange(state.value);
  removeEvents(type);
}
const onStart = function (v, e, type) {
  console.log(2)
  state.key = v.point.key;
  opts.range ? state.handle = getHandleIndex(v.precent) : '';
  state.oldVal = state.value[state.handle === 0 ? 1 : 0];
  opts.beforeChange && opts.beforeChange(_v.key);
  onMove(e, type);

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
//全部通过事件判断
const getNextPoint = function(e, type){
  let srcElement = e.srcElement;
  //筛选，如果是mark或handler，则直接得到值
  let isMarkEle = elementIsMark(srcElement);
  let v = null;
  if (isMarkEle) {
    v = getValueByEle(srcElement);
  } else if (elementIsHandler(srcElement)) {
    v = getValueByEvent(e, srcElement.dataset.key);
  }
  if (v === null) {
    
  }
}
//初始化参数，before-mount会在update之后触发
const init = function () {
  let {marks, value, range, min = 0, max = 100, step = 1, dots} = opts;
  min = Math.max(0, min);
  //筛选不合规范的值
  let _value = [min, min];
  if (value && value.length) {
    let _v = [];
    value.forEach(function (v) {
      if (v >= min && v <= max) {
        _v.push(+v);
      } else {
        console.warn('%s由于不在opts.min与opts.max之间被移动', v)
      }
    });
    _value = _v.sort();
  }
  if (range) {
    let _valen = _value.length;
    if (_valen > 2) {
      _value = _value.slice(0, 2)
    } else if (_valen < 2) {
      _value.unshift(min)
    }
  } else {
    _value = _value.slice(0, 1);
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
  //setPointOrder(state.source);
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
    if (mark.precent > tag.selectTrack.left && mark.precent < (tag.selectTrack.left + tag.selectTrack.width)) {
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
  console.log(1);
  let v = getValueByEvent(e, 'mouse');
  pauseEvent(e);
  onStart(v,e,'mouse');
  addDocumentEvents('mouse');
}
tag.onTouchStart = function(e){
  if(isNotTouchEvent(e)){
    return;
  }
  let v = getValueByEvent(e, 'touch');
  pauseEvent(e);
  onStart(v, e,'touch');
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



