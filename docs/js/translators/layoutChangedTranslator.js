import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";
import { waitForGame } from "../core/waitForGame.js";

const state = {
	currentLayoutName: null,
	previousLayoutName: null
};

async function isInSpeedrun() {
	const game = await waitForGame();
	const speedrunningVariable = game.all_global_vars.find(obj => obj.name === "IsSpeedRunning");
	return speedrunningVariable?.data === "true";
}

on(GAME_EVENTS.LAYOUT_CHANGED, (layoutName) => {
	console.log("LAYOUT_CHANGED", layoutName);
	state.previousLayoutName = state.currentLayoutName;
	state.currentLayoutName = layoutName;

	if (state.currentLayoutName.includes("Level")) {
		const levelNumber = parseInt(state.currentLayoutName.split("Level")[1]);

		trigger(GAME_EVENTS.LEVEL_STARTED, levelNumber);

		if (levelNumber === 1) {
			trigger(GAME_EVENTS.GAME_STARTED, { inSpeedrun: isInSpeedrun() });
		}

		if (state.currentLayoutName === state.previousLayoutName) {
			trigger(GAME_EVENTS.LEVEL_RESTARTED, levelNumber);
		}
	}

	if (state.previousLayoutName?.includes("Level")
		&&
		!state.currentLayoutName.includes("Level")) {

		trigger(GAME_EVENTS.GAME_STOPPED);

		if (state.currentLayoutName === "End") {
			trigger(GAME_EVENTS.GAME_COMPLETED);
		}

		if (state.currentLayoutName === "Menu") {
			trigger(GAME_EVENTS.GAME_ABORTED);
		}
	}
});