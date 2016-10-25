<riot-calendar>
	<div class="riot-calendar">
		<div class="riot-calendar__head">
			<div class="pure-g control">
				<a class="pure-u-1-5 prev {prevMonthDisable && 'disable'}" href="javascript:;" onclick={prevMonth}><i></i></a>
				<div class="pure-u-3-5 title">
					<div if={otherData} class="title__other">{otherData.title}</div>
					<div class="title__cur">{curData.title}</div>

				</div>
				<a class="pure-u-1-5 next {nextMonthDisable && 'disable'}" href="javascript:;" onclick={nextMonth}><i></i></a>
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
				<div class="pure-g" each={weekdates in curData.weekdates}>
					<div class="pure-u-1-8 {parseDateBoxClass(date)}" each={date in weekdates}>
						<div class="{date.disable === 0 && 'enable' || 'disable'} {date._change && 'change'} {date.select === 1 && 'choice' || ''}" onclick={checkDate}>
							<riot-date date={date}></riot-date>
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
	</div>
</riot-calendar>
<!-- inject: ./_date.tag -->