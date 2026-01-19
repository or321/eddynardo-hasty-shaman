import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { trigger } from "../core/gameEvents.js";

$(document).keypress(function (e) {
	if (e.key == "=" || e.key == "+") {
		trigger(GAME_EVENTS.NEXT_LEVEL_REQUESTED);
	}
	else if (e.key = "-") {
		trigger(GAME_EVENTS.PREVIOUS_LEVEL_REQUESTED);
	}
});