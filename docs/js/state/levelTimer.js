import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";

const state = {
	visible: false,
	levelTime: 0,
	previousLevelTime: 0,
	inGame: false,
	inTransition: false,
	inSpeedrun: false,
	practiceModeSetting: false,
}

function shouldTick() {
	return state.inGame && !state.inTransition;
}

function shouldBeVisible() {
	if (!state.inGame) return false;
	if (state.inSpeedrun) return true;
	return state.practiceModeSetting;
}

function updateVisibility() {
	const nextVisible = shouldBeVisible();

	if (nextVisible != state.visible) {
		state.visible = nextVisible;
		triggerTimerChanged();
	}
}

function triggerTimerChanged() {
	trigger(GAME_EVENTS.LEVEL_TIMER_CHANGED, getState());
}

on(GAME_EVENTS.GAME_FRAME_PASSED, (dt) => {
	if (!shouldTick()) return;

	state.levelTime += dt;
	triggerTimerChanged();
});

on(GAME_EVENTS.SETTINGS_CHANGED, (settings) => {
	state.practiceModeSetting = settings.practiceMode;
	updateVisibility();
});

on(GAME_EVENTS.GAME_STARTED, ({ inSpeedrun }) => {
	state.inGame = true;
	state.inSpeedrun = inSpeedrun;
	updateVisibility();
});

on(GAME_EVENTS.GAME_STOPPED, () => {
	state.inGame = false;
	updateVisibility();
});

on(GAME_EVENTS.LEVEL_STARTED, () => {
	state.previousLevelTime = state.levelTime;
	state.levelTime = 0;
	state.inTransition = false;
});

on(GAME_EVENTS.LEVEL_COMPLETED, () => {
	state.inTransition = true;
});

export function getState() {
	return { ...state };
}