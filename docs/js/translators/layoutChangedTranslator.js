import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";
import { getGameAdapter } from "../core/currentGameAdapter.js";

const state = {
	currentLayoutName: null,
	previousLayoutName: null
};

on(GAME_EVENTS.LAYOUT_CHANGED, (layoutName) => {
	console.log("LAYOUT_CHANGED", layoutName);
	state.previousLayoutName = state.currentLayoutName;
	state.currentLayoutName = layoutName;

	if (state.currentLayoutName.includes("Level")) {
		const levelNumber = parseInt(state.currentLayoutName.split("Level")[1]);

		trigger(GAME_EVENTS.LEVEL_STARTED, levelNumber);

		if (levelNumber === 1) {
			const gameAdapter = getGameAdapter();
			const inSpeedrun = gameAdapter.isInSpeedrun();
			trigger(GAME_EVENTS.GAME_STARTED, { inSpeedrun: inSpeedrun });
		}

		if (state.currentLayoutName === state.previousLayoutName) {
			trigger(GAME_EVENTS.LEVEL_RESTARTED, levelNumber);
		}
	}

	if (state.previousLayoutName?.includes("Level")
		&&
		!state.currentLayoutName.includes("Level")) {

		if (state.currentLayoutName === "End") {
			trigger(GAME_EVENTS.GAME_STOPPED, { reason: 'completed' });
		}
		else if (state.currentLayoutName === "Menu") {
			trigger(GAME_EVENTS.GAME_STOPPED, { reason: 'aborted' });
		}
		else {
			trigger(GAME_EVENTS.GAME_STOPPED, { reason: 'unknown' });
		}
	}
});