/*https://github.com/madrobby/zepto/blob/master/src/zepto.js */
var camelize = function(str){ return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' }) };
var dasherize = function(str) {
    return str.replace(/::/g, '/')
           .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
           .replace(/([a-z\d])([A-Z])/g, '$1_$2')
           .replace(/_/g, '-')
           .toLowerCase()
};
var prefixProps = {
  animation: 1
};
var maybePrefix = function(key, value){
  var css = '';
  var key = dasherize(key);
  var _key = key.split('-');
  if(prefixProps[_key[0]]){
    css += '-webkit-' + key + ':' + value + ';';
  }
  css += key + ':' + value + ';'
  return css;
}
var _slice = [].slice;
var _toString = Object.prototype.toString;
var each = function(dom,callback){
  let args = [].slice.call(arguments,2);
  if(dom.length > 1){
    let _dom = _slice.call(dom);
    _dom.forEach(function(d){
      callback.apply(d,args)
    });
  }else{
    callback.apply(dom[0],args);
  }
};

var riotHelper = {
  $: function(selector, context=document){
    return context.querySelector(selector);
  },
  $$: function(selector, context=document){
    return context.querySelectorAll(selector);
  },
  css: function (dom, property, value) {
    if (arguments.length < 3) {
      if (typeof property == 'string') {
        return dom.style[camelize(property)] || getComputedStyle(dom, '').getPropertyValue(property)
      } else if (isArray(property)) {
        var props = {}
        var computedStyle = getComputedStyle(dom, '');
        property.forEach(function(prop){
          props[prop] = dom.style[camelize(prop)] || computedStyle.getPropertyValue(prop);
        })
        return props
      }
    }
    var css = ''
    if (typeof property == 'string') {
      if (!value && value !== 0){
        dom.style.removeProperty(dasherize(property));
      }
      else{
        css = maybePrefix(property, value);
      }
    } else {
      for (key in property)
        if (!property[key] && property[key] !== 0){
          this.style.removeProperty(dasherize(key))
        }
        else{
          css += maybePrefix(key, property[key])
        }
    }
    return dom.style.cssText += ';' + css;
  }
}
const methods = ['add','remove','toggle','contains'];
['addClass','removeClass','toggleClass','hasClass'].forEach(function(method,index){
  riotHelper[method] = function(dom, className){
    let call = function(_className){
      _className = _className.split(' ');
      for (let i = 0, len = _className.length; i < len; i++) {
        this.classList[methods[index]](_className[i]);
      }
    };
    return each(dom, call,className);
  }
});
['String','Number','Object', 'Date', 'Array', 'Function','Undefined'].forEach(function(method){
  riotHelper['is' + method] = function(param){
    return _toString.call(param) === '[object ' + method + ']'
  }
})
export default riotHelper;