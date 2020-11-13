_autosplitter = function () {
	var chestsInLevel = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 2, 2];
	var wrs = ["2.87", "3.60", "3.92", "4.93", "3.65", "2.65", "6.43", "4.87", "5.57", "6.10", "5.47", "4.22", "6.10", "6.72", "6.67"];

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
		force_restart_flag: false,
		restart_flag_frame: 0
	}

	var moveToLevel = function (level) {
		window.game.doChangeLayout(window.game.layouts_by_index[level + 2]);
	}

	var onSound = function (soundName) {
		if (soundName == "damsel") {
			state.damselCount += 1;

			if (state.in_level && state.damselCount >= chestsInLevel[state.level - 1]) {
				state.in_transition = true;
				state.transitionTime = 0;
				$("#transition_timer").text("0.00");

				if (state.speedrun_mode_active) {
					_speedrunStatsHandler.onLevelEnd(state.level, state.levelTime);
				}
			}
		}

		// Track stats for sounds that only happened during gameplay
		if (state.speedrun_mode_active && state.in_level && !state.in_transition) {
			_speedrunStatsHandler.onSound(soundName);
		}
	}

	var onScene = function (sceneName) {
		var previousLevel = state.level;
		var transitionEnded = state.in_transition;

		state.level = parseInt(sceneName.slice(5, 10));

		// Specifically for Hasty Shaman:
		// When starting a new game from the main menu, there is a random loading time which cause a mismatch between IGT 
		// and the autosplitter timer. So in this case I force a level reset after few frames after loading level 1.
		state.force_restart_flag = (state.in_menu && state.level === 1);
		state.restart_flag_frame = 0;

		state.in_menu = sceneName === "Menu";
		state.in_credits = sceneName === "End";
		state.in_level = !state.in_menu && !state.in_credits
		state.in_transition = false;

		// I have no idea what this means, but when the condition index is 0, we are in speedrun mode
		state.speedrun_mode_active = (!state.in_menu && window.game.getCurrentEventStack().cndindex === 0);
		onSpeedrunModeChanged();

		if (state.speedrun_mode_active && state.level === 1) {
			_speedrunStatsHandler.onNewSpeedrun();
		}

		// Handle speedrun stats for the last level or transition (not on entering the first level)
		if (state.speedrun_mode_active && (state.level > 1 || state.in_credits)) {
			if (transitionEnded) {
				_speedrunStatsHandler.onTransitionEnd(previousLevel, state.transitionTime);
			} else {
				_speedrunStatsHandler.onLevelEnd(previousLevel, state.levelTime);
			}
		}

		state.damselCount = 0;
		state.levelTime = 0;

		if (state.in_level) {
			document.getElementById("level_timer").innerText = "0.00";
			document.getElementById("level_wr").innerText = wrs[state.level - 1];

			$("#level_select_message").css("visibility", "visible");
			$("#btn_previous_level").css("visibility", state.level > 1 ? "visible" : "hidden");
			$("#btn_next_level").css("visibility", state.level < 15 ? "visible" : "hidden");

			$("#btn_speedrun_mode").css("visibility", "hidden");
		} else {
			document.getElementById("level_timer").innerText = "---";
			document.getElementById("level_wr").innerText = "---";

			$("#level_select_message").css("visibility", "hidden");
			$("#btn_previous_level").css("visibility", "hidden");
			$("#btn_next_level").css("visibility", "hidden");


			if (state.in_menu) {
				$("#speedrun_timer").text("---");
				$("#transition_timer").text("---");
				$("#btn_speedrun_mode").css("visibility", "visible");
			}
		}

		if (state.speedrun_mode_active) {
			if (state.in_level && state.level == 1) {
				state.speedrunTime = 0;
				$("#speedrun_timer").text("0.00");
			}

			if (state.in_credits) {
				state.show_speedrun_stats = true;
				_speedrunStatsHandler.displaySpeedrunStats();
			}
		}

		$("#speedrun_stats").toggle(state.show_speedrun_stats && (state.in_menu || (state.in_credits && state.speedrun_mode_active)));
		if (state.in_level) {
			hideExtraStats();
		}
	}


	var onUpdate = function (frametime) {
		// Do nothing on the menu or credits
		if (!state.in_level) return;

		if (state.force_restart_flag) {
			state.restart_flag_frame += 1;

			if (state.restart_flag_frame >= 2) {
				state.force_restart_flag = false;
				restartLevel();
			}
		}


		if (!state.in_transition) {
			state.levelTime += frametime;
			$("#level_timer").text(state.levelTime.toFixed(2));
		}

		if (state.speedrun_mode_active) {
			state.speedrunTime += frametime;
			$("#speedrun_timer").text(state.speedrunTime.toFixed(2));

			if (state.in_transition) {
				state.transitionTime += frametime;
				$("#transition_timer").text(state.transitionTime.toFixed(2));
			}
		}
	}

	var restartLevel = function () {
		var e = jQuery.Event("keydown");
		e.which = 82; // 'r' key
		$(document).trigger(e);

		e = jQuery.Event("keyup");
		e.which = 82; // 'r' key
		$(document).trigger(e);
	}

	/**********
	Window resize handling
	***********/

	var onCanvasResize = function () {
		var $canvas = $("#c2canvasdiv");
		var canvas_w = $canvas.width();
		var canvas_h = $canvas.height();
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
	Speedrun mode handling
	***********/

	var onSpeedrunModeChanged = function () {
		$("#speedrun_mode_data").toggle(state.speedrun_mode_active);
		$("#practice_mode_data").toggle(!state.speedrun_mode_active);
	}


	/**********
	Level movement handling
	***********/

	$(document).keypress(function (e) {
		if (state.speedrun_mode_active || !state.in_level) return;

		// plus/equal sign
		if ((e.which == 43 || e.which == 61) && state.level < 15) {
			moveToLevel(state.level + 1);
		}

		// minus sign
		if (e.which == 45 && state.level > 1) {
			moveToLevel(state.level - 1);
		}
	})


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
		moveToLevel: moveToLevel,
		getState: function () {
			return state;
		}
	};
}();