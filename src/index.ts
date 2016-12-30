import {registerChildComponent} from "./components/common/utils";
import RiotCalendarSubDate from "./components/calendar/riot-date";
import {addDays, cloneDate, cloneAsDate, subtractDays, isAfterDate} from "./components/calendar/utils";

const utils = {addDays, cloneDate, cloneAsDate, registerChildComponent, subtractDays, isAfterDate}

//注册子组件
utils.registerChildComponent(RiotCalendarSubDate);

export {version} from "./components/version";
export {default as RiotCalendar} from "./components/calendar/calendar";
export {default as RiotDate} from "./components/calendar/riotdate";
export {default as RiotSlider} from "./components/slider/slider";
export {utils}

import RiotSlider from "./components/slider/slider";
