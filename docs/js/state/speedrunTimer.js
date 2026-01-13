import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";

const state = {
	visible: false,
	speedrunTime: 0,
	inSpeedrun: false,
}

function shouldTick() {
	return state.inSpeedrun;
}

function shouldBeVisible() {
	return state.inSpeedrun;
}

function updateVisibility() {
	const nextVisible = shouldBeVisible();

	if (nextVisible != state.visible) {
		state.visible = nextVisible;
		triggerTimerChanged();
	}
}

function triggerTimerChanged() {
	trigger(GAME_EVENTS.SPEEDRUN_TIMER_CHANGED, getState());
}

on(GAME_EVENTS.GAME_FRAME_PASSED, (dt) => {
	if (!shouldTick()) return;

	state.speedrunTime += dt;
	triggerTimerChanged();
});

on(GAME_EVENTS.SPEEDRUN_STARTED, () => {
	state.inSpeedrun = true;
	state.speedrunTime = 0;
	updateVisibility();
});

on(GAME_EVENTS.SPEEDRUN_STOPPED, () => {
	state.inSpeedrun = false;
	updateVisibility();
});

export function getState() {
	return { ...state };
}