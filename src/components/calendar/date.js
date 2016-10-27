let tag = this;
let _opts = tag.parent.opts;
tag.beforeShowDate = _opts.beforeShowDate;
let date = opts.date;
let className = date._animation === 1 ? 'riot-calendar-in' : date._animation === -1 ? 'riot-calendar-out' : '';
if (tag.beforeShowDate) {
  let html = tag.beforeShowDate(date);
  if (html) {
    if(typeof html === 'object'){
      className = className + ' ' + (html.className || '')
      html = html.html;
    }
    if(typeof html === 'string'){
      tag.replaceWithInnerHTML = true;
      tag.root.innerHTML = html;
    }

  }
}
tag.className = className;

