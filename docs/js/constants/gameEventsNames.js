export const GAME_EVENTS = Object.freeze({
	/* Game events */
	GAME_LOADED: "game:loaded",
	GAME_FRAME_PASSED: "game:framePassed",
	
	GAME_STARTED: "game:started",
	GAME_STOPPED: "game:stopped",
	GAME_COMPLETED: "game:completed",
	GAME_ABORTED: "game:aborted",

	GAME_STATE_CHANGED: "gameState:changed",

	/* Canvas events */
	CANVAS_RESIZED: "canvas:resized",
	
	/* Layout events */
	LAYOUT_CHANGED: "layout:changed",

	/* Level events */
	LEVEL_STARTED: "level:started",
	LEVEL_COMPLETED: "level:completed",
	LEVEL_RESTARTED: "level:restarted",

	/* Speedrun events */
	SPEEDRUN_STARTED: "speedrun:started",
	SPEEDRUN_STOPPED: "speedrun:stopped",
	SPEEDRUN_COMPLETED: "speedrun:completed",
	SPEEDRUN_ABORTED: "speedrun:aborted",

	/* Settings events */
	SETTINGS_LOADED: "settings:loaded",
	SETTINGS_CHANGED: "settings:changed",

	/* Timer events */
	LEVEL_TIMER_CHANGED: "levelTimer:changed",
	LEVEL_TIMER_VISIBILITY_CHANGED: "levelTimer:visibilityChanged",

	SPEEDRUN_TIMER_CHANGED: "speedrunTimer:changed",
	SPEEDRUN_TIMER_VISIBILITY_CHANGED: "speedrunTimer:visibilityChanged",

	/* FPS counter */
	FPS_COUNTER_CHANGED: "fpsCounter:changed",
	FPS_COUNTER_VISIBILITY_CHANGED: "fpsCounter:visibilityChanged",

	/* Navigation events */
	NEXT_LEVEL_REQUESTED: "nextLevel:requested",
	PREVIOUS_LEVEL_REQUESTED: "previousLevel:requested",
});

window.GAME_EVENTS = GAME_EVENTS;