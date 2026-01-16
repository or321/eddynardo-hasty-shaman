import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "../core/gameEvents.js";
import * as settings from "../state/settings.js";
import { TIMERS_PRECISION } from "../constants/settingsNames.js";
import * as speedrunTimer from "../state/speedrunTimer.js";

const state = {
	initialized: false,
	$timerEl: null,
	$containerEl: null,
}

on(GAME_EVENTS.SPEEDRUN_TIMER_VISIBILITY_CHANGED, ({visible}) =>{
	if (!state.initialized) return;

	state.$containerEl.toggle(visible);
});

on(GAME_EVENTS.SPEEDRUN_TIMER_CHANGED, ({speedrunTime}) =>{
	if (!state.initialized) return;

	const timerPrecisionSetting = settings.get(TIMERS_PRECISION);
	const timerText = speedrunTime.toFixed(timerPrecisionSetting);
	state.$timerEl.text(timerText);
});

export function initialize() {
	state.initialized = true;
	state.$timerEl = $("#speedrun-timer");
	state.$containerEl = $("#speedrun-timer-container");

	state.$containerEl.toggle(speedrunTimer.getState().visible);
}