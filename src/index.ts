import {registerChildComponent} from "./components/common/utils";
import RiotCalendarSubDate from "./components/calendar/riot-date";
import {addDays, cloneDate, cloneAsDate, subtractDays, isAfterDate, monthDiff} from "./components/calendar/utils";
const version = 'v<@VERSION@>';

const utils = {addDays, cloneDate, cloneAsDate, registerChildComponent, subtractDays, isAfterDate, monthDiff}

//注册子组件
utils.registerChildComponent(RiotCalendarSubDate);


export {default as RiotCalendar} from "./components/calendar/calendar";
export {default as RiotDate} from "./components/calendar/riotdate";
export {default as RiotSlider} from "./components/slider/slider";
export {utils}
export {version}

import RiotSlider from "./components/slider/slider";
