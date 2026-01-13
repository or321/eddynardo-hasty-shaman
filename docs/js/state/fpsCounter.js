import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";
import { getGameAdapter } from "../core/currentGameAdapter.js";

const state = {
	visible: false,
	showFpsCounterSetting: false,
	fps: 0,
}

function shouldBeVisible() {
	return state.showFpsCounterSetting;
}

function updateVisibility() {
	const nextVisible = shouldBeVisible();

	if (nextVisible != state.visible) {
		state.visible = nextVisible;
		triggerFpsCounterChanged();
	}
}

function triggerFpsCounterChanged() {
	trigger(GAME_EVENTS.FPS_COUNTER_CHANGED, getState());
}

on(GAME_EVENTS.GAME_FRAME_PASSED, async () => {
	const gameAdapter = getGameAdapter();
	const fps = gameAdapter.getFps();
	if (!fps) return;

	if (state.fps != fps) {
		state.fps = fps;
		triggerFpsCounterChanged();
	}
});

on(GAME_EVENTS.SETTINGS_CHANGED, (settings) => {
	state.showFpsCounterSetting = settings.showFpsCounter;
	updateVisibility();
});

export function getState() {
	return { ...state };
}