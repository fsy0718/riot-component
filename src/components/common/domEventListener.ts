//https://github.com/react-component/util/blob/master/src/Dom/addEventListener.js
export interface IE8ElementInterface extends Element {
  attachEvent(event: string, listener: EventListener): boolean;
  detachEvent(event: string, listener: EventListener): boolean;
}

export interface IE8DocumentInterface extends Document{
  attachEvent(event: string, listener: EventListener): boolean;
  detachEvent(event: string, listener: EventListener): boolean;
};

export interface addEventListenerReturnInterface {
  remove: ()=>any;
}

export interface addEventListenerInterface {
  (ele: IE8ElementInterface | IE8DocumentInterface, type: string, callback: EventListener): addEventListenerReturnInterface
}

export default function addEventListener(target: IE8ElementInterface | IE8DocumentInterface, eventType: string, callback: EventListener): addEventListenerReturnInterface{
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, false);
    return {
      remove: function () {
        target.removeEventListener(eventType, callback, false);
      }
    };
  } else if (target.attachEvent) {
    target.attachEvent('on' + eventType, callback);
    return {
      remove: function () {
        target.detachEvent('on' + eventType, callback);
      }
    };
  }

};


