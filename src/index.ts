import {registerChildComponent} from "./components/common/utils";
import RiotCalendarSubDate from "./components/calendar/riot-date";

//注册子组件
registerChildComponent(RiotCalendarSubDate);

export {version} from "./components/version";
export {default as RiotCalendar} from "./components/calendar/calendar";
export {default as RiotSlider} from "./components/slider/slider";
export {registerChildComponent};


import RiotSlider from "./components/slider/slider";
