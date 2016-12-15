declare class Observe{
    on(event: string, fn: Function);
    off(event: string, fn: Function);
    one(event: string, fn: Function);
    trigger(event: string, ...arg);
}


declare namespace riot {
    class Tag extends Observe{
        readonly name: string;
        tmpl: string;
        constructor(el: Element, opts: Object);
    }
}