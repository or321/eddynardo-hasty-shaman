import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "../core/gameEvents.js";
import * as levelTimer from "../state/levelTimer.js";
import * as speedrunTimer from "../state/speedrunTimer.js";

const state = {
	initialized: false,
	$containerEl: null,
	$canvasEl: null,
}

function shouldBeVisible() {
	return levelTimer.getState().visible || speedrunTimer.getState().visible;
}

function updateVisibility() {
	if (!state.initialized) return;

	const visible = shouldBeVisible();
	state.$containerEl.toggle(visible);

	if (visible){
		positionContainer();
	}
}

function positionContainer() {
	if (!state.initialized) return;
	if (!shouldBeVisible()) return;

	const canvasX = parseInt(state.$canvasEl.css("margin-left"));
	const canvasY = parseInt(state.$canvasEl.css("margin-top"));
	const canvasHeight = state.$canvasEl.height();
	const containerHeight = state.$containerEl.outerHeight();

	// Anchor the element to the bottom-left corner of the canvas
	state.$containerEl.css({
		left: canvasX,
		top: canvasY + canvasHeight - containerHeight
	});
}

on(GAME_EVENTS.CANVAS_RESIZED, positionContainer);

on(GAME_EVENTS.LEVEL_TIMER_VISIBILITY_CHANGED, updateVisibility);
on(GAME_EVENTS.SPEEDRUN_TIMER_VISIBILITY_CHANGED, updateVisibility);

export function initialize() {
	state.initialized = true;
	state.$containerEl = $("#timers-container");
	state.$canvasEl = $("#c2canvasdiv");

	updateVisibility();
}