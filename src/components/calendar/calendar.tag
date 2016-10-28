<riot-calendar>
  <div class="riot-calendar__box {(viewDatas.length > 1 && 'riot-calendar--multiple riot-calendar--multiple-i' + viewDatas.length)}">
    <a class="prev {prevMonthDisable && 'disable'}" href="javascript:;" onclick={prevMonth}><i></i></a>
    <a class="next {nextMonthDisable && 'disable'}" href="javascript:;" onclick={nextMonth}><i></i></a>
    <div class="riot-calendar__items" each={items, index in viewDatas}>
      <div class="riot-calendar__head">
        <div class="control title">
            <div if={otherData} class="title__other">{otherData.title}</div>
            <div class="title__cur">{items.title}</div>
        </div>
        <div class="pure-g weeks">
          <div class="pure-u-1-8" each={week in weekTitles}>{week}</div>
        </div>
      </div>
      <div class="riot-calendar__body">
        <div if={otherData} class="riot-calendar__body--other">
          <div class="pure-g" each={weekdates in otherData.weekdates}>
            <div class="pure-u-1-8 {parseDateBoxClass(date)}" each={date in weekdates}>
              <div class="{date.disable === 0 && 'enable' || 'disable'} {date.select === 1 && 'choice' || ''}" onclick={checkDate}>
                <riot-date date={date}></riot-date>
              </div>
            </div>
          </div>
        </div>
        <div class="riot-calendar__body--cur">
          <div class="pure-g" each={weekdates in items.weekdates}>
            <div class="pure-u-1-8 {parseDateBoxClass(date)}" each={date in weekdates}>
              <div if={showOtherMonthDates || (showOtherMonthDates===f alse && date.current===0 )} class="{date.disable === 0 && 'enable' || 'disable'} {date._change && 'change'} {date.select === 1 && 'choice' || ''}"
                onclick={checkDate}>
                <riot-date date={date}></riot-date>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="riot-calendar__foot"></div>
  <!--inject-style-->
  <script>
    <!-- inject: ./calendar.js -->
    </script>

</riot-calendar>
<!-- inject: ./_date.tag -->