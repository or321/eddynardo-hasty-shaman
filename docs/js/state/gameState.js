import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";

const state = {
	inGame: false,
	inLevelTransition: false,
	inSpeedrun: false,
	currentLevel: 0
}

on(GAME_EVENTS.GAME_STARTED, ({ inSpeedrun }) => {
	state.inGame = true;
	state.inSpeedrun = inSpeedrun;

	if (inSpeedrun) {
		trigger(GAME_EVENTS.SPEEDRUN_STARTED);
	}

	trigger(GAME_EVENTS.GAME_STATE_CHANGED);
});

on(GAME_EVENTS.GAME_STOPPED, ({ reason }) => {
	state.inGame = false;

	if (state.inSpeedrun) {
		state.inSpeedrun = false;
		trigger(GAME_EVENTS.SPEEDRUN_STOPPED, { reason });
	}

	trigger(GAME_EVENTS.GAME_STATE_CHANGED);
});

on(GAME_EVENTS.LEVEL_STARTED, (levelNumber) => {
	state.inTransition = false;
	state.currentLevel = levelNumber;

	trigger(GAME_EVENTS.GAME_STATE_CHANGED);
});

on(GAME_EVENTS.LEVEL_COMPLETED, () => {
	state.inTransition = true;

	trigger(GAME_EVENTS.GAME_STATE_CHANGED);
});

export function getGameState() {
	return { ...state };
}