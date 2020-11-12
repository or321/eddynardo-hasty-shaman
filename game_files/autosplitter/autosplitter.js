_autosplitter = function(){
    var chestsInLevel = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 2, 2];
    var wrs = ["2.87", "3.60", "3.92", "4.93", "3.65", "2.65", "6.47", "4.87", "5.57", "6.10", "5.47", "4.25", "6.10", "6.72", "6.72"];

    var state = {
        speedrun_mode_active: true,
        currentFrameTime: null,
        previousFrameTime: null,
        damselTime: NaN,
        damselCount: 0,
        level: NaN,
        in_menu: true,
        in_credits: false,
        in_level: false,
        in_transition: false,
        levelStartTime: null,
        speedrunStartTime: null,
        transitionStartTime: null,
        show_speedrun_stats: false,
        extra_speedrun_stats_visible: false
    }

    var moveToLevel = function(level) {
        window.game.doChangeLayout(window.game.layouts_by_index[level + 2]);
    }

    var getLevelTime = function() {
        return ((state.currentFrameTime - state.levelStartTime) / 1000);
    }

    var getSpeedrunTime = function() {
        return ((state.currentFrameTime - state.speedrunStartTime) / 1000);
    }

    var getTransitionTime = function() {
        return ((state.currentFrameTime - state.transitionStartTime) / 1000);
    }

    var onSound = function (soundName) {
        if (soundName == "damsel") {
            state.damselTime = state.currentFrameTime;
            state.damselCount += 1;

            if (state.in_level && state.damselCount >= chestsInLevel[state.level - 1]) {
                state.in_transition = true;
                state.transitionStartTime = state.currentFrameTime;
                $("#transition_timer").text("0.00");

                if (state.speedrun_mode_active) {
                    _speedrunStatsHandler.onLevelEnd(state.level, getLevelTime());
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
        // and the autosplitter timer. So in this case I force a level reset after a few milliseconds.
        if (state.in_menu && state.level === 1){
            setTimeout(() => {
                var e = jQuery.Event("keydown");
                e.which = 82; // 'r' key
                $(document).trigger(e);

                var e = jQuery.Event("keyup");
                e.which = 82; // 'r' key
                $(document).trigger(e);
            }, 150);
        }

        if (state.level === 1){
            _speedrunStatsHandler.onNewSpeedrun();
        }

        state.in_menu = sceneName === "Menu";
        state.in_credits = sceneName === "End";
        state.in_level = !state.in_menu && !state.in_credits
        state.in_transition = false;
        
        // Handle speedrun stats for the last level or transition (not on entering the first level)
        if (state.speedrun_mode_active && (state.level > 1 || state.in_credits)){
            if (transitionEnded) {
                _speedrunStatsHandler.onTransitionEnd(previousLevel, getTransitionTime());
            }
            else {
                _speedrunStatsHandler.onLevelEnd(previousLevel, getLevelTime());
            }
        }

        state.damselCount = 0;
        state.levelStartTime = state.currentFrameTime;

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
            if (state.in_level && state.level == 1){
                state.speedrunStartTime = state.currentFrameTime;
                $("#speedrun_timer").text("0.00");
            }

            if (state.in_credits){
                state.show_speedrun_stats = true;
                _speedrunStatsHandler.displaySpeedrunStats();
            }
        }

        $("#speedrun_stats").toggle(state.show_speedrun_stats && (state.in_menu || (state.in_credits && state.speedrun_mode_active)));
        if (state.in_level) {
            hideExtraStats();
        }
    }
    

    var onUpdate = function (time) {
        state.previousFrameTime = state.currentFrameTime;
        state.currentFrameTime = time;

        if (state.in_level){
            if (state.in_transition){
                transitionTime = getTransitionTime();
                $("#transition_timer").text(transitionTime.toFixed(2));
            }
            else{
                levelTime = getLevelTime();
                $("#level_timer").text(levelTime.toFixed(2));
            }

            if (state.speedrun_mode_active){
                speedrunTime = getSpeedrunTime();
                $("#speedrun_timer").text(speedrunTime.toFixed(2));
            }
        }
        
    }

    /**********
    Speedrun mode handling
    ***********/

    $("#btn_speedrun_mode").click(function(){
        if (state.speedrun_mode_active){
            state.speedrun_mode_active = false;
            $("#speedrun_mode_data").hide();
            $("#practice_mode_data").show();
            $("#btn_speedrun_mode").text("Speedrun mode: off");
        }
        else{
            state.speedrun_mode_active = true;
            $("#speedrun_mode_data").show();
            $("#practice_mode_data").hide();
            $("#btn_speedrun_mode").text("Speedrun mode: on");
        }
    });

    /**********
    Level movement handling
    ***********/

    /*
    $("#btn_next_level").click(function(){
        moveToLevel(state.level + 1);
    })

    $("#btn_previous_level").click(function(){
        moveToLevel(state.level - 1);
    })
    */

    $(document).keypress(function(e){
        if (state.speedrun_mode_active || !state.in_level) return;

        // plus/equal sign
        if ((e.which == 43 || e.which == 61) && state.level < 15){
            moveToLevel(state.level + 1);
        }

        // minus sign
        if (e.which == 45 && state.level > 1){
            moveToLevel(state.level - 1);
        }
    })


    /**********
	Speedrun stats modals handling
    ***********/
    showExtraStats = function(){
        state.extra_speedrun_stats_visible = true;
        $("#extra_speedrun_stats").fadeIn();
        $("#extra_stats_button_arrow").text(">");
    }
    hideExtraStats = function(){
        state.extra_speedrun_stats_visible = false;
        $("#extra_speedrun_stats").fadeOut();
        $("#extra_stats_button_arrow").text("<");
    }
    $("#btn_extra_stats").mousedown(function(e) {
        e.stopPropagation();
        
		if (state.extra_speedrun_stats_visible){
			hideExtraStats();
		}
		else{
			showExtraStats();
		}
    });
    
    return {
        onSound: onSound,
        onScene: onScene,
        onUpdate: onUpdate,
        moveToLevel: moveToLevel
    };
}();

// Start with the game on the main menu
_autosplitter.onScene("Menu");