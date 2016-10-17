<riot-slider>
  <div class="riot-slider">
    <div class="riot-slider__track"></div>
    <div class="riot-slider__track--select"></div>
    <div class="riot-slider__handler riot-slider__handler--1"></div>
    <div class="riot-slider__handler riot-slider__handler--2" if={opts.range}></div>
    <div class="riot-slider__marks" if={opts.marks || opts.showDots}>
      <div each={mark in marks} class={mark.select && 'riot-slider__marks--items-select' || 'riot-slider__marks--items'}>
        <span class="riot-slider__marks--items-dot"></span>
        <span class="riot-slider__marks--items-tip">{mark.label}</span>
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
