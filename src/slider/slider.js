/**
 * @typedef {object} riot-point
 * @property {number} key 当前的关键值
 * @property {number} mark 是否为mark 真为1
 * @property {string} label point的label值
 * @property {number} select 是否被选中 真为1
 * @property {number} range 当opts.range为真时，point的range值，-1:起点 0:范围内 1:终点 2:即是起点也是终点
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
 */
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
const parseNumber = function(num, dot=6){
  let result = num;
  if(floatReg.test(num)){
    result = num.toFixed(dot);
  }
  return +result;
}
const getMarkWidth = function(len){
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
    opts.showDots ? w = parseNumber(getMarkWidth(Math.ceil((max - min) / step))) : '';
    let i = min;
    while (i <= max) {
      if (!(marks && marks[i])) {
        let _point = {
          key: i,
          label: '' + i,
          precent: parseNumber((i - min) / length) * 100
        }
        let index = state.value.indexOf(i);
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
        }
        opts.showDots ? _point.width = w : '';
        points.push(_point);
      }
      i += step;
    }
  }
  if (marks) {
    let _markPoints = [];
    let markCount = Object.keys(marks);
    w = getMarkWidth(markCount);
    for (let key in marks) {
      let _key = parseFloat(key);
      if(_key >= min && _key <= max){
        let markIsString = typeof marks[key] === 'string'
        let _point = {
          key: _key,
          mark: true,
          label:  markIsString ? marks[key] : (marks[key].label || ''),
          dot: markIsString ? true : (marks[key].dot || true),
          width: markIsString ? w : parseNumber(marks[key].width || w)
        }
        _point.precent = parseNumber((_point.key - min) / length) * 100;
        let index = state.value.indexOf(_key);
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
        }    
        points.push(_point);
        _markPoints.push(_point);
      }else{
        console.warn('riot-slider中实例类名为%s中有key为%s的mark由于不在opts.min和opts.max之间被移除',opts.class, key)
      }
    }
    //筛选出错误的mark
    if(_markPoints.length !== markCount){
      w = getMarkWidth(_markPoints.length);
      _markPoints.forEach(function(_mark){
        _mark.width = w;
      })
    }
    markPoints = _markPoints.sort(function(a,b){
      return +a.key - +b.key;
    });
  }

  points.sort(function (a, b) {
    return +a.key - +b.key;
  });
  return {
    points:points,
    marks: opts.showDots ? points : markPoints
  } 
}

//根据slider__mark来计算当前的值
const getMousePosition = function(e){
  return isVertical ? e.clientY : e.pageX;
}
const getHandleRect = function(handle=sliderRootEle){
  const coords = handle.getBoundingClientRect();
  return coords;
}
//判断是否点击的mark或dot
const getHandleIsMark = function(ele){
  let _c = ele.classList;
  return _c.contains('riot-slider__marks--items-dot') || _c.contains('riot-slider__marks--items-tip') || _c.contains('.riot-slider__handler');
}
//通过元素获取值
const getValueByEle = function(ele){
  if(ele.dataset.key !== undefined){
    return tag.marks[ele.dataset.key];
  }
  return null;
}
//通过长度获取值
const getPrecentByPosition = function(pos){
  const coords = getHandleRect();
  let v;
  if(isVertical){
    v = (pos - coords.top) / coords.height
  }else{
    v = (pos - coords.left) / coords.width;
  }
  return v;
}

const getValueByEvent = function(e){
  const {range, step, dots} = opts;
  let position = getMousePosition(e);
  let precent = getPrecentByPosition(position) * 100;
  let source;
  if(range){
    if(!step){
      //只能选上marks
      source = tag.marks;
    }else{
      source = state.points;
    }
  }else if(!dots){
    source = state.points;
  }else{
    
  }
}


const init = function () {
  let {marks, value, range, min = 0, max = 100, step = 1} = opts;
  min = Math.max(0, min);
  //筛选不合规范的值

  let _value = [min, min];
  if(value && value.length){
    _value = value.filter(function(val){
      if(val >= min && val <= max){
        return true;
      }else{
        console.warn('%s由于不在opts.min与opts.max之间被移动', val)
      }
    }).sort()
  }
  if(range){
    let _valen = _value.length;
    if(_valen > 2){
      _value = _value.slice(0,2)
    }else if(_valen < 2){ 
      _value.unshift(min)
    }
  }else{
    _value = _value.slice(0,1);
  }
  //存储值
  state.value = _value;
  state.min = min;
  state.max = max;
  let data = getEnablePoint(min, max, step, marks);
  state.points = data.points;
  tag.marks = data.marks
}

init();

tag.on('update', function () {
  tag.selectTrack = {
    left: parseNumber((state.value[0] - state.min) / (state.max - state.min)) * 100,
    width: parseNumber((state.value[1] - state.value[0]) / (state.max - state.min)) * 100,
    key1: state.value[0],
    key2: state.value[1]
  }
});
tag.on('mount', function(){
  sliderRootEle = tag.root.querySelector('.riot-slider');
})
tag.noop = function(e){
  e.preventUpdate= true;
  return;
};
//生成markItem的class类名
tag.parseMarkItemClass = function(mark, type){
  if(mark){
    //mark元素与handler重叠会有问题，浏览器对4.5px处理方式不一样
    if(mark.select && mark.key.indexOf(state.value) === -1 || mark.range === 0){
      return 'riot-slider__marks--items-select';
    }
  }
}
//事件
tag.onMouseDown = function(e){
  if(e.button !== 0){
    e.preventUpdate = true;
    return;
  }

  let srcElement = e.srcElement;
  //筛选，如果是mark或handler，则直接得到值
  let isMarkOrHandleEle = getHandleIsMark(srcElement);
  let v = null;
  if(isMarkOrHandleEle){
    v = getValueByEle(srcElement);
  }
  if(v === null){
    v = getValueByEvent(e);
  }
}
