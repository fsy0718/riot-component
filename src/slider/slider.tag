<riot-slider>
  <div class="riot-slider"  onmousedown={opts.disabled ? noop : onMouseDown} ontouchStart={opts.disabled ? noop : onTouchStart}>
    <div class="riot-slider__track"></div>
    <div class="riot-slider__track--select" style="left:{selectTrack.left + '%'};width:{selectTrack.width + '%'}"></div>
    <div class="riot-slider__handler riot-slider__handler--1" style="left:{selectTrack.left + '%'}" data-key={selectTrack.left}></div>
    <div class="riot-slider__handler riot-slider__handler--2" if={opts.range} style="left: {(selectTrack.left + selectTrack.width) + '%'}" data-key={selectTrack.left + selectTrack.width}></div>
    <div class="riot-slider__marks" if={opts.marks || opts.showDots}>
      <div each={mark,index in marks} class="riot-slider__marks--items {parseMarkItemClass(mark)}">
        <span class="riot-slider__marks--items-dot" data-key={index} style="left:{mark.precent + '%'}"></span>
        <span class="riot-slider__marks--items-tip" data-key={index} style="width:{mark.width + '%'};margin-left:{(-0.5 * mark.width) + '%'};left:{mark.precent + '%'}">{mark.label}</span>
      </div>
    </div>
  </div>
  <style scoped>
  <!-- inject:css -->
  <!-- endinject -->
  </style>
  <script>
  <!-- inject:js -->
  <!-- endinject -->
  </script>
</riot-slider>
