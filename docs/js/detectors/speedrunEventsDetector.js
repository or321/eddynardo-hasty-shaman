import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";

const state = {
	inSpeedrun: false
};

on(GAME_EVENTS.GAME_STARTED, ({ inSpeedrun }) => {
	state.inSpeedrun = inSpeedrun;

	if (inSpeedrun) {
		trigger(GAME_EVENTS.SPEEDRUN_STARTED);
	}
});

on(GAME_EVENTS.GAME_STOPPED, () => {
	if (state.inSpeedrun) {
		trigger(GAME_EVENTS.SPEEDRUN_STOPPED);
	}
});

on(GAME_EVENTS.GAME_COMPLETED, () => {
	if (state.inSpeedrun) {
		trigger(GAME_EVENTS.SPEEDRUN_COMPLETED);
	}
});

on(GAME_EVENTS.GAME_ABORTED, () => {
	if (state.inSpeedrun) {
		trigger(GAME_EVENTS.SPEEDRUN_ABORTED);
	}
});