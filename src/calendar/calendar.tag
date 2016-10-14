<riot-calendar>
	<div class="calendar">
		<div class="calendar__head">
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
		<div class="calendar__body">
			<div if={otherData} class="calendar__body--other">
				<div class="pure-g" each={weekdates in otherData.weekdates}>
					<div class="pure-u-1-8 {parseDateClass(date)}" each={date in weekdates}>
						<div class="day {date.valid === 0 && 'enable' || 'disable'} {date.select === 1 && 'choice'}" onclick={checkDate}>{date.d}</div>
					</div>
				</div>
			</div>
			<div class="calendar__body--cur">
				<div class="pure-g" each={weekdates in curData.weekdates}>
					<div class="pure-u-1-8 {parseDateClass(date)}" each={date in weekdates}>
						<div class="day {date.valid === 0 && 'enable' || 'disable'} {date.select === 1 && 'choice'} {!date.range && date.select === 1 && 'riot-calendar-scaleIn'}"
							onclick={checkDate}>{date.d}<i if={date.select===1 }></i></div>
					</div>
				</div>
			</div>
		</div>
		<div class="calendar__foot"></div>
    <style scoped>
    <!-- inject:css -->
    <!-- endinject -->
    </style>
    <script>
    <!-- inject:js -->
    <!-- endinject -->
    </script>
	</div>
</riot-calendar>