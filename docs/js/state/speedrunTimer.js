import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";
import { getGameState } from "./gameState.js";

const state = {
	visible: false,
	speedrunTime: 0,
}

function shouldTick() {
	return getGameState().inSpeedrun;
}

function shouldBeVisible() {
	return getGameState().inSpeedrun;
}

function updateVisibility() {
	const nextVisible = shouldBeVisible();

	if (nextVisible != state.visible) {
		state.visible = nextVisible;
		trigger(GAME_EVENTS.SPEEDRUN_TIMER_VISIBILITY_CHANGED, { visible: state.visible });
	}
}

on(GAME_EVENTS.GAME_FRAME_PASSED, (dt) => {
	if (!shouldTick()) return;

	state.speedrunTime += dt;
	trigger(GAME_EVENTS.SPEEDRUN_TIMER_CHANGED, { speedrunTime: state.speedrunTime });
});

on(GAME_EVENTS.GAME_STATE_CHANGED, updateVisibility);

on(GAME_EVENTS.SPEEDRUN_STARTED, () => {
	state.speedrunTime = 0;
});

export function getState() {
	return { ...state };
}