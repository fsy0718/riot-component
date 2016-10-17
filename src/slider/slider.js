/**
 * @function riot-slider
 * @description 基于riot的slider，为ant-design库中slider的riot版本
 * @see {@link https://ant.design/components/slider/ 滑动输入条}
 * @param {object} opts
 * @param {boolean} [opts.range=false] 双滑块模式
 * @param {number}  [opts.min=0] 最小值
 * @param {number}  [opts.max=100] 最大值
 * @param {number[]} [opts.value  设置当前值，如果range，默认为[0,0],否则为[0]
 * @param {number|null} [opts.step] 步长，取值必须大于 0，并且可被 (max - min) 整除。当 marks 不为空对象时，可以设置 step 为 null，此时 Slider 的可选值仅有 marks 标出来的部分。
 */
"use strict";
let tag = this;
let state = {};


const isNotTouchEvent = function (e) {
  return e.touches.length > 1 || (e.type.toLowerCase() === 'touchend' && e.touches.length > 0)
}

const calOffset = function (value) {
  const {min, max} = state;
  const ratio = (value - min) / (max - min);
  return ratio * 100;
}


//计算可停靠值对象
const getEnablePoint = function (min, max, step, marks) {
  let points = [];
  let markPoints = null;
  let length = max - min;
  if (marks) {
    for (let key in marks) {
      let _key = parseFloat(key);
      if(_key >= min){
        let _point = {
          key: _key,
          mark: 1
        }

        if (typeof marks[key] === 'string') {
          _point.label = marks[key];
        } else {
          _point.label = marks[key].label
        }
        let p = (_point.key - min) / length
        //最多四位小数
        _point.precent = (parseInt(p) === p ? p : +p.toFixed(6)) * 100;
        let index = state.value.indexOf(_key);
        if(index > -1){
          _point.select = 1;
        }
        if(opts.range){
          //TODO 需要考虑value=[0,0]两个值相同的情况
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
      }

    }
    markPoints = points.concat().sort(function(a,b){
      return +a.key - +b.key;
    });

  }
  if (step > 0) {
    let i = min;
    while (i < max) {
      if (!(marks && marks[i])) {
        let p = (i - min) / length;
        let _point = {
          key: i,
          label: '' + i,
          precent: (parseInt(p) === p ? p : +p.toFixed(6)) * 100
        }
        let index = state.value.indexOf(i);
        if(index > -1){
          _point.select = 1;
        }
        if(opts.range){
          //TODO 需要考虑value=[0,0]两个值相同的情况
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
        points.push(_point);
      }
      i += step;
    }
  }
  points.sort(function (a, b) {
    return +a.key - +b.key;
  });
  return {
    points:points,
    marks: opts.showDots ? points : markPoints
  } 
}


const init = function () {
  let {marks, value, range, min = 0, max = 100, step = 1, defaultValue} = opts;
  min = Math.max(0, min);
  let _value = value && value.length ? value.sort() : [min,min];
  if(range){
    _value = _value.length < 2 ? _value.push(_value[0]) : _value;
  }else{
    _value = _value.slice(0,1);
  }
  state.value = _value;
  let data = getEnablePoint(min, max, step, marks);
  tag.marks = data.marks
}

init();

tag.on('update', function () {

})
