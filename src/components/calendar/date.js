let tag = this;
let _opts = tag.parent.opts;
tag.beforeShowDate = _opts.beforeShowDate;
let date = opts.date;
if (tag.beforeShowDate) {
  var html = tag.beforeShowDate(date);
  if (html) {
    tag.replaceWithInnerHTML = true;
    tag.root.innerHTML = html;
  }
}
