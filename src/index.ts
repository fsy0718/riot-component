export {version} from "./components/version";
export {default as RiotCalendar} from "./components/calendar/calendar";
//export {default as RiotSlider} from "./components/slider/slider";

import RiotSlider from "./components/slider/slider";

let dom = document.querySelector('.demo');
let riotSlider = new RiotSlider(dom,{
    marks: {
        '1': '50%',
        '20': {
           label: '60'
        }
    },
    step: 3
})