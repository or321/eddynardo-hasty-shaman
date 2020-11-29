_volumeHandler = function () {
	var state = {
		musicSilent: false,
		timeout_id: null
	};

	$(document).keypress(function (e) {
		// Detect press on "N"
		if (e.which == 78 || e.which == 110) {
			state.musicSilent = !state.musicSilent;

			// Change the text of the volume message and show it
			$("#div_music_volume").text("Music: " + (state.musicSilent ? "Off" : "On"));
			$("#div_music_volume").fadeIn();

			// Set the volume message to disappear after 0.8 second.
			// Reset the timeout if the volume was changed before the message disappeared.
			if (state.timeout_id)
				clearTimeout(state.timeout_id);

			state.timeout_id = setTimeout(() => {
				$("#div_music_volume").fadeOut();
				state.timeout_id = null;
			}, 800);


			// Press on M twice - this will keep the volume settings as they are now, but will trigger playing the music file
			for (var i = 1; i <= 2; i++) {
				var downEvent = jQuery.Event("keydown");
				downEvent.which = 77;
				$(document).trigger(downEvent);

				var upEvent = jQuery.Event("keyup");
				upEvent.which = 77;
				$(document).trigger(upEvent);
			}
		}
	});

	return {
		isMusicSilent: function () {
			return state.musicSilent;
		}
	};
}();