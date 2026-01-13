import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on } from "../core/gameEvents.js";

const state = {
	initialized: false,
	$containerEl: null,
	$canvasEl: null,
	levelTimerVisible: false,
	speedrunTimerVisible: false,
}

function shouldBeVisible() {
	return state.levelTimerVisible || state.speedrunTimerVisible;
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

	const canvasX = parseInt(state.$canvasEl.css("margin-left"));
	const canvasY = parseInt(state.$canvasEl.css("margin-top"));
	const canvasHeight = state.$canvasEl.height();
	const containerHeight = state.$containerEl.outerHeight();

	state.$containerEl.css({
		left: canvasX,
		top: canvasY + canvasHeight - containerHeight
	});
}

on(GAME_EVENTS.CANVAS_RESIZED, () => {
	positionContainer();
});

on(GAME_EVENTS.LEVEL_TIMER_CHANGED, ({visible}) => {
	if (state.levelTimerVisible != visible) {
		state.levelTimerVisible = visible;
		updateVisibility();
	}
});

on(GAME_EVENTS.SPEEDRUN_TIMER_CHANGED, ({visible}) => {
	if (state.speedrunTimerVisible != visible) {
		state.speedrunTimerVisible = visible;
		updateVisibility();
	}
});

export function initialize() {
	state.initialized = true;
	state.$containerEl = $("#timers-container");
	state.$canvasEl = $("#c2canvasdiv");
	
	updateVisibility();
}