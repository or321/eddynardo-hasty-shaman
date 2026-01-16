import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";
import * as settings from "../state/settings.js";
import { getGameState } from "./gameState.js";

const state = {
	visible: false,
	levelTime: 0,
	previousLevelTime: 0,
}

function shouldTick() {
	const gameState = getGameState();
	return gameState.inGame && !gameState.inLevelTransition;
}

function shouldBeVisible() {
	const gameState = getGameState();

	if (!gameState.inGame) return false;
	if (gameState.inSpeedrun) return true;
	return settings.get("practiceMode");
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

on(GAME_EVENTS.SETTINGS_CHANGED, updateVisibility);
on(GAME_EVENTS.GAME_STATE_CHANGED, updateVisibility);

on(GAME_EVENTS.LEVEL_STARTED, () => {
	state.previousLevelTime = state.levelTime;
	state.levelTime = 0;
});

export function getState() {
	return { ...state };
}