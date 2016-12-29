import objectAssign from "object-assign";

const camelize = function (str: string): string {
  return str.replace(/-+(.)?/g, function (match, chr) {
    return chr ? chr.toUpperCase() : ''
  });
}

const dasherize = function (str: string): string {
  return str.replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

const prefixProps = {
  animation: true
}

const maybePrefix = function (key: string, value: string|number): string {
  var css = '';
  var key = dasherize(key);
  var _key = key.split('-');
  if (prefixProps[_key[0]]) {
    css += '-webkit-' + key + ':' + value + ';';
  }
  css += key + ':' + value + ';'
  return css;
}

const _slice = [].slice;
const _toString = Object.prototype.toString;

const each = function (dom: [Element], callback, ...args) {
  if (dom.length > 1) {
    let _dom = _slice.call(dom);
    _dom.forEach(function (d) {
      callback.apply(d, args)
    });
  } else {
    callback.apply(dom[0], args)
  }
}

//定义css方法接口
interface CssMethods {
  
}

export function stopUpdateComponent(e){
  e ? e.preventUpdate = true : '';
  return false;
}

export const assign = objectAssign;

export  function $(selector: string, context = document): Element {
  return context.querySelector(selector)
};
export function $$(selector: string, context = document): NodeListOf<Element> {
    return context.querySelectorAll(selector)
};
export function zeroFill(number: number, targetLength=2, forceSign=false) {
    var absNumber = '' + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign = number >= 0;
    return (sign ? (forceSign ? '+' : '') : '-') +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
};
//'String', 'Number', 'Object', 'Date', 'Array', 'Function', 'Undefined'
export function isString(str): boolean{
  return _toString.call(str) === '[object String]'
}
export function isNumber(str): boolean{
  return _toString.call(str) === '[object Number]'
}
export function isObject(str): boolean{
  return _toString.call(str) === '[object Object]'
}
export function isDate(str): boolean{
  return _toString.call(str) === '[object Date]'
}
export function isArray(str): boolean{
  return _toString.call(str) === '[object Array]'
}
export function isFunction(str): boolean{
  return _toString.call(str) === '[object Function]'
}
export function isUndefined(str): boolean{
  return _toString.call(str) === '[object Undefined]'
}

interface simpleExtendCallInterface {
  (key:string, val:any): boolean
}

function simpleExtend(target: Object, source: Object): Object
function simpleExtend(target: Object, source: Object, blackKeys : string[]): Object;
function simpleExtend(target: Object, source: Object, blackkeys: simpleExtendCallInterface): Object
function simpleExtend(target: Object, source: Object, blackKeys: string[], callback: simpleExtendCallInterface): Object
function simpleExtend(target:Object,source:Object, blackKeys ?:string[]|simpleExtendCallInterface, callback ?: simpleExtendCallInterface){
  blackKeys = blackKeys || [];
  if(isFunction(blackKeys)){
    callback = blackKeys as simpleExtendCallInterface ;
    blackKeys = [];
  }
  for(var i in source){
    if(source.hasOwnProperty(i)){
      if((blackKeys as string[]).indexOf(i) === -1 || callback && callback(i, source[i])){
        target[i] = source[i];
      }
    }
  }
  return target;
}

export {simpleExtend}

export function noop(){}

export function pauseEvent(e:Event){
  e.preventDefault();
  e.stopPropagation();
  return this;
}

const registerChildComponentCache = {};

export function registerChildComponent(tag){
  if(!tag){
    console.error('请提供注册的子组件构造函数')
    return;
  }
  let __cache_div__;
  try{
    if(tag.name){
      if(registerChildComponentCache[tag.name]){
        return;
      }
    }
    __cache_div__= document.createElement('div');
    let __cacheRiotInstance__ = new tag(__cache_div__);
    registerChildComponentCache[tag.name] = 1;
    __cacheRiotInstance__.unmount();
    __cache_div__ = null;
  }catch(e){
    __cache_div__ = null;
    console.error(e);
  }

}

function css(dom: HTMLElement, property: string): string;
function css(dom: HTMLElement, property: string[]): string;
function css(dom: HTMLElement, property: string, value: string|number): HTMLElement;
function css(dom: HTMLElement, property: Object): HTMLElement
function css(dom: HTMLElement, property: string|string[]|Object, value?: string|number) {
  if (arguments.length < 3) {
    if (typeof property == 'string') {
      return dom.style[camelize(property)] || getComputedStyle(dom, '').getPropertyValue(property)
    } else if (isArray(property)) {
      var props = {}
      var computedStyle = getComputedStyle(dom, '');
      (property as string[]).forEach(function (prop) {
        props[prop] = dom.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
      })
      return props
    }
  }
  var css = ''
  if (typeof property == 'string') {
    if (!value && value !== 0) {
      dom.style.removeProperty(dasherize(property));
    }
    else {
      css = maybePrefix(property, value);
    }
  } else {
    for (let key in property)
      if (!property[key] && property[key] !== 0) {
        this.style.removeProperty(dasherize(key))
      }
      else {
        css += maybePrefix(key, property[key])
      }
  }
  return dom.style.cssText += ';' + css;
}

export {css}

const elementClassListmethods = ['add', 'remove', 'toggle', 'contains'];
const elementClassmethods  = ['addClass', 'removeClass', 'toggleClass', 'hasClass'];
interface eleClassListMethodsInferface {
  addClass(dom:HTMLElement, className: string)
  removeClass(dom:HTMLElement, className: string)
  toggleClass(dom:HTMLElement, className: string)
  hasClass(dom:HTMLElement, className: string)
}
const _eleClassListMethods = {}

elementClassmethods.forEach(function (method, index) {
  _eleClassListMethods[method] = function (dom, className) {
    let call = function (_className) {
      _className = _className.split(' ');
      for (let i = 0, len = _className.length; i < len; i++) {
        this.classList[elementClassListmethods[index]](_className[i]);
      }
    };
    return each(dom, call, className);
  }
});
export  const  eleClassListMethods = _eleClassListMethods as eleClassListMethodsInferface;
