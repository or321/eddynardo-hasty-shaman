import { setGameAdapter } from "../core/currentGameAdapter.js"

const adapter = {
	getFps: function() {
		const game = window.game;
		if (!game) return null;

		return game.fps;
	},

	isInSpeedrun: function() {
		const game = window.game;
		if (!game) return false;
		
		const speedrunningVariable = game.all_global_vars.find(obj => obj.name === "IsSpeedRunning");
		return speedrunningVariable?.data === "true";
	}
};

setGameAdapter(adapter);