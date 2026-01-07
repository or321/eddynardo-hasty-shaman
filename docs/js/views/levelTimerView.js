import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "../core/gameEvents.js";
import { getState as getLevelTimerState } from "../state/levelTimer.js";

const state = {
	$timerEl: null,
	$containerEl: null,
	DomLoaded: false,
	timerPrecisionSetting: 2,
}

$(function () {
	state.DomLoaded = true;

	const $template =  $("#level-timer-template");
	const $clone = $($template.html());
	$("#autosplitter-data").append($clone);

	state.$timerEl = $("#level-timer");
	state.$containerEl = $("#level-timer-container");

	applyTimerState(getLevelTimerState());
});

on(GAME_EVENTS.SETTINGS_CHANGED, (settings) => {
	state.timerPrecisionSetting = settings.timersPrecision;
});

on(GAME_EVENTS.LEVEL_TIMER_CHANGED, (timerState) => {
	applyTimerState(timerState)
});

function applyTimerState({visible, levelTime}){
	if (!state.DomLoaded) return;

	state.$containerEl.toggle(visible);
	state.$timerEl.text(levelTime.toFixed(state.timerPrecisionSetting));
}