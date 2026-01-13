import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "../core/gameEvents.js";
import * as speedrunTimer from "../state/speedrunTimer.js";

const state = {
	initialized: false,
	$timerEl: null,
	$containerEl: null,
	timerPrecisionSetting: 2,
}

on(GAME_EVENTS.SETTINGS_CHANGED, (settings) => {
	state.timerPrecisionSetting = settings.timersPrecision;
});

on(GAME_EVENTS.SPEEDRUN_TIMER_CHANGED, (timerState) => {
	applyTimerState(timerState)
});

function applyTimerState({visible, speedrunTime}){
	if (!state.initialized) return;
	
	state.$containerEl.toggle(visible);
	state.$timerEl.text(speedrunTime.toFixed(state.timerPrecisionSetting));
}

export function initialize(){
	state.initialized = true;
	state.$timerEl = $("#speedrun-timer");
	state.$containerEl = $("#speedrun-timer-container");

	applyTimerState(speedrunTimer.getState());
}