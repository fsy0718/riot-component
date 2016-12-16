  <div class="riot-slider {config.disabled && 'riot-slider--disable'} {!config.included && 'riot-slider--independent'}"  onmousedown="{config.disabled ? noop : onMouseDown}" ontouchstart="{config.disabled ? noop : onTouchStart}">
    <div class="riot-slider__track"></div>
    <div class="riot-slider__track--select" if={config.included} style="left:{state.track.left + '%'};width:{state.track.width + '%'}"></div>
    <div class="riot-slider__handler riot-slider__handler--1" style="left:{(config.range ?state.track.left : state.track.width) + '%'}" data-key={state.track.left}></div>
    <div class="riot-slider__handler riot-slider__handler--2" if={config.range} style="left: {(state.track.left + state.track.width) + '%'}" data-key={state.track.left + state.track.width}></div>
    <div class="riot-slider__marks" if={config.marks || config.showAllDots}>
      <div each={mark,index in marks} class="riot-slider__marks--items {parseMarkItemClass(mark)}">
        <span class="riot-slider__marks--items-dot" data-key={index} style="left:{mark.precent + '%'}" if={mark.dot}></span>
        <span class="riot-slider__marks--items-tip" data-key={index} style="width:{mark.width + '%'};margin-left:{(-0.5 * mark.width) + '%'};left:{mark.precent + '%'}" if={mark.tip}>{mark.label}</span>
      </div>
    </div>
  </div>