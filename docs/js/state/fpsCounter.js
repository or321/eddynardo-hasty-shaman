import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";
import { getGameAdapter } from "../core/currentGameAdapter.js";
import * as settings from "../state/settings.js";
import { SHOW_FPS_COUNTER } from "../constants/settingsNames.js";

const state = {
	visible: false,
	fps: 0,
}

function shouldBeVisible() {
	return settings.get(SHOW_FPS_COUNTER);
}

function updateVisibility() {
	const nextVisible = shouldBeVisible();

	if (nextVisible != state.visible) {
		state.visible = nextVisible;
		trigger(GAME_EVENTS.FPS_COUNTER_VISIBILITY_CHANGED, { visible: state.visible });
	}
}

on(GAME_EVENTS.GAME_FRAME_PASSED, () => {
	const gameAdapter = getGameAdapter();
	const fps = gameAdapter.getFps();
	if (!fps) return;

	if (state.fps != fps) {
		state.fps = fps;
		trigger(GAME_EVENTS.FPS_COUNTER_CHANGED, { fps: state.fps });
	}
});

on(GAME_EVENTS.SETTINGS_CHANGED, updateVisibility);

export function getState() {
	return { ...state };
}