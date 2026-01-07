import { GAME_EVENTS } from "../constants/gameEventsNames.js";
import { trigger } from "../core/gameEvents.js";

const DEFAULTS = {
	muteMusic: false,
	practiceMode: false,
	showLevelTimer: true,
	timersPrecision: 2
};

let currentSettings = null;

function loadFromLocalStorage() {
	try {
		return JSON.parse(localStorage.getItem("gameSettings"));
	}
	catch {
		return null;
	}
}

function saveToLocalStorage() {
	localStorage.setItem("gameSettings", JSON.stringify(currentSettings));
}

export function get(key) {
	return currentSettings[key];
}

export function set(key, value) {
	if (currentSettings[key] === value)
		return;

	currentSettings[key] = value;
	saveToLocalStorage();

	trigger(GAME_EVENTS.SETTINGS_CHANGED, { ...currentSettings });
}

export function initializeSettings(){
	const localStorageSettings = loadFromLocalStorage() ?? {};
	currentSettings = { ...DEFAULTS, ...localStorageSettings };

	trigger(GAME_EVENTS.SETTINGS_LOADED, { ...currentSettings });
	trigger(GAME_EVENTS.SETTINGS_CHANGED, { ...currentSettings });
}