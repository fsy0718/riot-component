<div class="riot-calendar__box">
  <div class="riot-calendar__main {(props.mutipleItems > 1 && 'riot-calendar--multiple riot-calendar--multiple-i' + props.mutipleItems)}">
    <a class="prev {state.prevMonthDisable && 'disable'}" href="javascript:;" onclick={prevMonth}><i></i></a>
    <a class="next {state.nextMonthDisable && 'disable'}" href="javascript:;" onclick={nextMonth}><i></i></a>
    <div class="riot-calendar__items" each={items, index in state.viewDatas}>
      <div class="riot-calendar__head">
        <div class="control title">
          <div if={otherViewDatas} class="title__other">{otherViewDatas[index].title}</div>
          <div class="title__cur">{items.title}</div>
        </div>
        <div class="riot-component__row weeks">
          <div class="riot-component__col" each={week in props.weekTitles}>{week}</div>
        </div>
      </div>
      <div class="riot-calendar__body">
        <div class="riot-calendar__body--cur">
          <div class="riot-component__row">
            <div class="riot-component__col" each={date in items.dates}>
              <span class="date-placeholder" if={!config.showOtherMonthDates && date.current}></span>
              <div if={config.showOtherMonthDates || (config.showOtherMonthDates === false && date.current === 0)} class="{date.disable === 0 && 'enable' || 'disable'} {date.change && 'change'} {date.select === 1 && 'choice' || ''}" onclick="{parent.parent.clickHandler}">
                <div data-is="riot-date" date={date} before-show-date={config.beforeShowDate}>{date.date()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="riot-calendar__foot"></div>
</div>