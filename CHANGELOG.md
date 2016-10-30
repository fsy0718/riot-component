<a name="0.0.3-beta1"></a>
## [0.0.3-beta1](https://github.com/fsy0718/riot-component/compare/0.0.2...v0.0.3-beta1) (2016-10-30)


### Bug Fixes

* **calendar:** 修复switchViewByOtherMonth为true且switchViewOverLimit为true时点击被禁止的日期也能选择的bug ([72e8609](https://github.com/fsy0718/riot-component/commit/72e8609))
* **calendar:** 修复在onChange中调用tag.unmount错误的bug ([bf50e39](https://github.com/fsy0718/riot-component/commit/bf50e39)), closes [#11](https://github.com/fsy0718/riot-component/issues/11)
* **calendar:** 修复日历range时selectDates为空且有minDate时riotDate.disable计算错误 ([da6e72b](https://github.com/fsy0718/riot-component/commit/da6e72b))


### Features

* **calendar:** 增加opts.beforeShowDate参数，提供日期渲染前个性化显示的回调函数 ([c214733](https://github.com/fsy0718/riot-component/commit/c214733))
* **calendar:** 增加opts.minRangeGap opts.maxRangeGap  opts.onRangeGapInvalid参数 ([1c56504](https://github.com/fsy0718/riot-component/commit/1c56504))
* **calendar:** 增加opts.numberOfMonths参数，控制日历视图个数 ([3f06c35](https://github.com/fsy0718/riot-component/commit/3f06c35))
* **calendar:** 增加opts.showOtherMonthDates参数，控制是否显示其它月的日期 ([5437a9c](https://github.com/fsy0718/riot-component/commit/5437a9c))
* **calendar:** 增加switchCalendarByDate回调函数，控制跳转到指定日期 ([aba9aa1](https://github.com/fsy0718/riot-component/commit/aba9aa1))
* **component:** 增加未包含css的riot-component ([80c902b](https://github.com/fsy0718/riot-component/commit/80c902b))
* **slider:** 增加opts.control/opts.rangeGapFix两个参数及tag.setControl回调函数 ([f7d8106](https://github.com/fsy0718/riot-component/commit/f7d8106))
* **slider:** 增加opts.included与opts.rangeValueShouldEqual参数 ([05ca439](https://github.com/fsy0718/riot-component/commit/05ca439))



<a name="0.0.2"></a>
## [0.0.2](https://github.com/fsy0718/riot-component/compare/52edad4...0.0.2) (2016-10-20)


### Bug Fixes

* **calendar:** 修复calendar使用opts.dateTimeFormat进行日期比较的bug ([c0134d5](https://github.com/fsy0718/riot-component/commit/c0134d5))
* **calendar:** 修复calendar的bug ([c2095a1](https://github.com/fsy0718/riot-component/commit/c2095a1))


### Features

* **calendar:** 增加calendar组件 ([52edad4](https://github.com/fsy0718/riot-component/commit/52edad4))
* **slider:** 增加slider组件 ([856c178](https://github.com/fsy0718/riot-component/commit/856c178))


### Performance Improvements

* **calendar:** 增加日期点击时的动画 ([d42204e](https://github.com/fsy0718/riot-component/commit/d42204e))



