_autosplitter = function () {
	var chestsInLevel = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 2, 2];
	var wrs = ["2.85", "3.60", "3.88", "4.90", "3.63", "2.63", "6.38", "4.87", "5.48", "5.77", "5.28", "4.18", "6.05", "6.56", "6.32"];

	var decimal_places_display = (window.tas_mode_active ? 3 : 2);

	var state = {
		speedrun_mode_active: false,
		damselCount: 0,
		level: NaN,
		in_menu: true,
		in_credits: false,
		in_level: false,
		in_transition: false,
		levelTime: null,
		speedrunTime: null,
		transitionTime: null,
		show_speedrun_stats: false,
		extra_speedrun_stats_visible: false,
		checkForSpeedrun_flag: false
	}

	/*
	Function to move between levels (for practice mode)
	*/
	var moveToLevel = function (level) {
		window.game.doChangeLayout(window.game.layouts_by_index[level + 2]);
	}

	/*
	Callback function after any sound file was played.
	*/
	var onSound = function (soundName) {
		// Handling what happens when you collect chests
		if (soundName == "damsel") {
			state.damselCount += 1;

			// Check if the last chest of the level was collected.
			if (state.in_level && state.damselCount >= chestsInLevel[state.level - 1]) {
				state.in_transition = true;
				state.transitionTime = 0;
				$("#transition_timer").text((0).toFixed(decimal_places_display));

				// Track the time of the last level, before the transition started
				if (state.speedrun_mode_active) {
					_speedrunStatsHandler.onLevelEnd(state.level, state.levelTime);
				}
			}
		}

		// Track extra stats for sounds. Only sounds that happened during gameplay are counted.
		if (state.speedrun_mode_active && state.in_level && !state.in_transition) {
			_speedrunStatsHandler.onSound(soundName);
		}
	}

	/*
	Callback function after any level layout is changed (we refresh or enter or a new screen)
	*/
	var onScene = function (sceneName) {
		var previousLevel = state.level;
		var previousLevelTime = state.levelTime;
		var transitionEnded = state.in_transition;

		state.level = parseInt(sceneName.slice(5, 10));

		/*
		When opening the first level from the main menu, we need to determine if we are in practice mode or speedrun mode.
		This check can't happen on frame-zero of the level, so a flag is set for checking game mode in the next timer tick.
		*/
		state.checkForSpeedrun_flag = (state.in_menu && state.level === 1);

		// Check where we are now, based on the new layout name
		state.in_menu = (sceneName === "Menu");
		state.in_credits = (sceneName === "End");
		state.in_level = (!state.in_menu && !state.in_credits);
		state.in_transition = false;

		// If we entered a new level (or refreshed the current one)
		if (state.in_level) {
			state.damselCount = 0;

			// Set relevant data for the current level
			state.levelTime = 0;
			document.getElementById("level_timer").innerText = (0).toFixed(decimal_places_display);
			document.getElementById("level_wr").innerText = wrs[state.level - 1];

			$("#level_select_message").css("visibility", "visible");

			// Start a timer for new speedrun, in case we entered or refreshed level 1
			if (state.level == 1) {
				state.speedrunTime = 0;
				$("#speedrun_timer").text((0).toFixed(decimal_places_display));
			}
		} else {
			// Hide info/timers if we entered the menu or credits
			document.getElementById("level_timer").innerText = "---";
			document.getElementById("level_wr").innerText = "---";

			$("#level_select_message").css("visibility", "hidden");

			if (state.in_menu) {
				$("#speedrun_timer").text("---");
				$("#transition_timer").text("---");

				// Entering the menu always disable speedrun mode.
				state.speedrun_mode_active = false;
				onSpeedrunModeChanged();
			}
		}

		// Handling speedrun stats tracking, in case we are in speedrun mode
		if (state.speedrun_mode_active) {
			// Checking if a new level was loaded, or the player reached the credits screen.
			// The first level is ignored, because it will always start a new speedrun.
			if (state.level > 1 || state.in_credits) {
				// Check if a transition has ended. Will happen if the transition ended normally, or the player has reset during transition.
				if (transitionEnded) {
					// Track the time of the last transition
					_speedrunStatsHandler.onTransitionEnd(previousLevel, state.transitionTime);
				}
				// In case the player was not in transition. This will happen if the player dies or reset during a level.
				else {
					// Track the time of the last level
					_speedrunStatsHandler.onLevelEnd(previousLevel, previousLevelTime);
				}
			}

			if (state.in_credits) {
				// Display all the speedrun times after reaching the end screen
				state.show_speedrun_stats = true;
				_speedrunStatsHandler.displaySpeedrunStats();
			}
		}

		// Show stats for the last speedrun on the menu or credits, hide them during gameplay
		$("#speedrun_stats").toggle(state.show_speedrun_stats && (state.in_menu || (state.in_credits && state.speedrun_mode_active)));

		if (state.in_level) {
			hideExtraStats();
		}

		// Handling TAS mode - notifying the TAS tool on entering a new level
		if (window.tas_mode_active && state.in_level) {
			window.coffee._onScene(state.level);
		}
	}

	/*
	Callback function for every tick of the main loop function of the game. Each tick equals one frame of the game.
	The "frameTime" parameter is the time (in milliseconds) that elapsed since the last tick.
	*/
	var onUpdate = function (frameTime) {
		// Update the FPS counter for the current frame
		$("#fps_counter").text((1 / frameTime).toFixed());


		// Do nothing else on the menu or credits
		if (!state.in_level) return;

		// Checking the flag for determining the current game mode
		if (state.checkForSpeedrun_flag) {
			state.checkForSpeedrun_flag = false;

			/*
			We want to check for speedrun/practice mode only on the first level.
			I don't know what "getCurrentEvenStack().cndindex" means in the context of the game, 
			but we are in speedrun mode only if the index is 0.
			This index isn't equal to 0 on the first frame of level 1, that's why we are checking for it here instead of the onScene function.
			*/
			if (state.level === 1 && window.game.getCurrentEventStack().cndindex === 0) {
				state.speedrun_mode_active = true;
				onSpeedrunModeChanged();
				_speedrunStatsHandler.onNewSpeedrun();
			}
		}

		// Update the level timer for the current frame if we are not in transition
		if (!state.in_transition) {
			state.levelTime += frameTime;
			$("#level_timer").text(state.levelTime.toFixed(decimal_places_display));
		}

		// Only when we are in speedrun mode, update the speedrun and transition timers for the current frame
		if (state.speedrun_mode_active) {
			state.speedrunTime += frameTime;
			$("#speedrun_timer").text(state.speedrunTime.toFixed(decimal_places_display));

			if (state.in_transition) {
				state.transitionTime += frameTime;
				$("#transition_timer").text(state.transitionTime.toFixed(decimal_places_display));
			}
		}
	}


	/**********
	Window resize handling - organzing some of the custom HTML elements in case the window is resized, or full-screen mode is activated.
	***********/

	var onCanvasResize = function () {
		var $canvas = $("#c2canvasdiv");
		var canvas_w = $canvas.width();
		var canvas_marginTop = parseInt($canvas.css("margin-top"));
		var canvas_marginLeft = parseInt($canvas.css("margin-left"));

		$("#autosplitter_data")
			.width(canvas_w - 10)
			.css("left", canvas_marginLeft + "px")
			.css("bottom", canvas_marginTop + "px");

		var autosplitter_bar_height = $("#autosplitter_data").height();

		$("#speedrun_stats")
			.css("right", (canvas_marginLeft + 1) + "px")
			.css("bottom", (canvas_marginTop + autosplitter_bar_height + 10) + "px");

		$("#extra_speedrun_stats")
			.css("right", (canvas_marginLeft + 320) + "px")
			.css("bottom", (canvas_marginTop + autosplitter_bar_height + 10) + "px");
	}

	/**********
	Speedrun mode handling - showing or hiding relevant information, based on whether we are in speedrun or practice mode.
	***********/

	var onSpeedrunModeChanged = function () {
		$("#speedrun_mode_data").toggle(state.speedrun_mode_active);
		$("#practice_mode_data").toggle(!state.speedrun_mode_active);
	}


	/**********
	Level movement handling - allowing to move between levels with the keyboard
	***********/

	$(document).keypress(function (e) {
		// Level movement is only allowed during gameplay in practice mode
		if (state.speedrun_mode_active || !state.in_level) return;

		// "+" or "=" key, to move to the next level
		if ((e.which == 43 || e.which == 61) && state.level < 15) {
			moveToLevel(state.level + 1);
		}

		// "-" key, to move to the previous level
		if (e.which == 45 && state.level > 1) {
			moveToLevel(state.level - 1);
		}
	});


	/**********
	Handling FPS counter - show or hide with Ctrl+B combination
	***********/
	/*
	$(document).keypress(function (e) {
		if (e.ctrlKey && e.keyCode == 2) {
			$("#fps_counter").toggle();
		}
	});
	*/


	/**********
	Speedrun stats modals handling
    ***********/

	showExtraStats = function () {
		state.extra_speedrun_stats_visible = true;
		$("#extra_speedrun_stats").fadeIn();
		$("#extra_stats_button_arrow").text(">");
	}

	hideExtraStats = function () {
		state.extra_speedrun_stats_visible = false;
		$("#extra_speedrun_stats").fadeOut();
		$("#extra_stats_button_arrow").text("<");
	}

	$("#btn_extra_stats").mousedown(function (e) {
		e.stopPropagation();

		if (state.extra_speedrun_stats_visible) {
			hideExtraStats();
		} else {
			showExtraStats();
		}
	});


	return {
		onSound: onSound,
		onScene: onScene,
		onUpdate: onUpdate,
		onCanvasResize: onCanvasResize,
		moveToLevel: moveToLevel
	};
}();