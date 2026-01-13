import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "../core/gameEvents.js";
import * as fpsCounter from "../state/fpsCounter.js";

const state = {
	initialized: false,
	$fpsCounterEl: null,
	$canvasEl: null,
	visible: false,
}

function positionElement() {
	if (!state.initialized || !state.visible) return;

	const canvasX = parseInt(state.$canvasEl.css("margin-left"));
	const canvasY = parseInt(state.$canvasEl.css("margin-top"));
	const canvasWidth = state.$canvasEl.width();
	const canvasHeight = state.$canvasEl.height();
	const fpsCounterWidth = state.$fpsCounterEl.outerWidth();
	const fpsCounterHeight = state.$fpsCounterEl.outerHeight();

	state.$fpsCounterEl.css({
		left: canvasX + canvasWidth - fpsCounterWidth,
		top: canvasY + canvasHeight - fpsCounterHeight
	});
}

on(GAME_EVENTS.CANVAS_RESIZED, () => {
	positionElement();
});

on(GAME_EVENTS.FPS_COUNTER_CHANGED, (state) => {
	applyState(state)
});

function applyState({visible, fps}){
	if (!state.initialized) return;

	state.$fpsCounterEl.text(fps);
	
	state.$fpsCounterEl.toggle(visible);
	state.visible = visible;

	positionElement();	
}

export function initialize(){
	state.initialized = true;
	state.$fpsCounterEl = $("#fps-counter");
	state.$canvasEl = $("#c2canvasdiv");

	applyState(fpsCounter.getState());
}