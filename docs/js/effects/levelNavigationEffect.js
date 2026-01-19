import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { on, trigger } from "../core/gameEvents.js";
import * as settings from "../state/settings.js";
import { PRACTICE_MODE } from "../constants/settingsNames.js";
import { getGameState } from "../state/gameState.js";
import { getGameAdapter } from "../core/currentGameAdapter.js";

on(GAME_EVENTS.NEXT_LEVEL_REQUESTED, () => {
	const gameState = getGameState();
	
	if (!gameState.inGame) return;
	if (gameState.inSpeedrun) return;
	if (!settings.get(PRACTICE_MODE)) return;

	const gameAdapter = getGameAdapter();

	if (gameState.currentLevel >= gameAdapter.getTotalLevels()) return;

	gameAdapter.moveToLevel(gameState.currentLevel + 1);
});

on(GAME_EVENTS.PREVIOUS_LEVEL_REQUESTED, () => {
	const gameState = getGameState();
	
	if (!gameState.inGame) return;
	if (gameState.inSpeedrun) return;
	if (!settings.get(PRACTICE_MODE)) return;

	const gameAdapter = getGameAdapter();

	if (gameState.currentLevel <= 1) return;

	gameAdapter.moveToLevel(gameState.currentLevel - 1);
});