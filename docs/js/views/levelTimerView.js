import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "../core/gameEvents.js";
import * as settings from "../state/settings.js";
import { TIMERS_PRECISION } from "../constants/settingsNames.js";
import * as levelTimer from "../state/levelTimer.js";

const state = {
	initialized: false,
	$timerEl: null,
	$containerEl: null,
}

on(GAME_EVENTS.LEVEL_TIMER_VISIBILITY_CHANGED, ({ visible }) => {
	if (!state.initialized) return;

	state.$containerEl.toggle(visible);
});

on(GAME_EVENTS.LEVEL_TIMER_CHANGED, ({ levelTime }) => {
	if (!state.initialized) return;

	const timerPrecisionSetting = settings.get(TIMERS_PRECISION);
	const timerText = levelTime.toFixed(timerPrecisionSetting);
	state.$timerEl.text(timerText);
});

export function initialize() {
	state.initialized = true;
	state.$timerEl = $("#level-timer");
	state.$containerEl = $("#level-timer-container");

	state.$containerEl.toggle(levelTimer.getState().visible);
}