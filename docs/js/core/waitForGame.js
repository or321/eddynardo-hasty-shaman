import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "./gameEvents.js";

export function waitForGame() {
	if (window.game) {
		return Promise.resolve(window.game);
	}

	// Promise is resolved as soon as the game:ready event is triggered
	return new Promise(resolve => {
		on(GAME_EVENTS.GAME_LOADED, game => resolve(game));
	});
}