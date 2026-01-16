import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "../core/gameEvents.js";
import * as fpsCounter from "../state/fpsCounter.js";

const state = {
	initialized: false,
	$fpsCounterEl: null,
	$canvasEl: null,
}

function positionElement() {
	if (!state.initialized) return;
	if (!fpsCounter.getState().visible) return;

	const canvasX = parseInt(state.$canvasEl.css("margin-left"));
	const canvasY = parseInt(state.$canvasEl.css("margin-top"));
	const canvasWidth = state.$canvasEl.width();
	const canvasHeight = state.$canvasEl.height();
	const fpsCounterWidth = state.$fpsCounterEl.outerWidth();
	const fpsCounterHeight = state.$fpsCounterEl.outerHeight();

	// Anchor the element to the bottom-right corner of the canvas
	state.$fpsCounterEl.css({
		left: canvasX + canvasWidth - fpsCounterWidth,
		top: canvasY + canvasHeight - fpsCounterHeight
	});
}

on(GAME_EVENTS.CANVAS_RESIZED, positionElement);

on(GAME_EVENTS.FPS_COUNTER_VISIBILITY_CHANGED, ({visible}) =>{
	if (!state.initialized) return;
	
	state.$fpsCounterEl.toggle(visible);
	if (visible) {
		positionElement();
	}
});

on(GAME_EVENTS.FPS_COUNTER_CHANGED, ({fps}) => {
	if (!state.initialized) return;

	state.$fpsCounterEl.text(fps);
	positionElement();
});

export function initialize() {
	state.initialized = true;
	state.$fpsCounterEl = $("#fps-counter");
	state.$canvasEl = $("#c2canvasdiv");
}