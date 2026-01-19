import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { trigger } from "../core/gameEvents.js";

$(document).keypress(function (e) {
	if (e.key == "=" || e.key == "+") {
		trigger(GAME_EVENTS.NEXT_LEVEL_REQUESTED);
	}
	else if (e.key == "-") {
		trigger(GAME_EVENTS.PREVIOUS_LEVEL_REQUESTED);
	}
});

$(document).keydown(function (e) {
	if (e.isTrigger) return;

	if (e.key.toLowerCase() == "c") {
		// Press on J instead
		const downEvent = jQuery.Event("keydown");
		downEvent.key = "j";
		downEvent.which = 74;
		$(document).trigger(downEvent);
	}
	else if (e.key.toLowerCase() == "z") {
		// Press on W instead
		const downEvent = jQuery.Event("keydown");
		downEvent.key = "w";
		downEvent.which = 87;
		$(document).trigger(downEvent);
	}
});

$(document).keyup(function (e) {
	if (e.isTrigger) return;

	if (e.key.toLowerCase() == "c") {
		// Press on J instead
		const upEvent = jQuery.Event("keyup");
		upEvent.key = "j";
		upEvent.which = 74;
		$(document).trigger(upEvent);
	}
	else if (e.key.toLowerCase() == "z") {
		// Press on W instead
		const upEvent = jQuery.Event("keyup");
		upEvent.key = "w";
		upEvent.which = 87;
		$(document).trigger(upEvent);
	}
});