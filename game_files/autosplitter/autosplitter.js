window.autosplitter = {};

var chestsInLevel = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 2, 2];
var wrs = ["2.87", "3.60", "3.97", "5.10", "3.83", "2.70", "6.70", "5.02", "5.60", "6.13", "5.60", "4.32", "6.15", "6.80", "6.85"];

var state = {
    speedrun_mode_active: true,
    lastFrameTime: null,
    damselTime: NaN,
    damselCount: 0,
    level: NaN,
    in_menu: true,
    in_credits: false,
    in_level: false,
    in_transition: false,
    levelStartTime: null,
    speedrunStartTime: null,
    transitionStartTime: null
}

function showLevelTime() {
    levelTime = ((state.lastFrameTime - state.levelStartTime) / 1000).toFixed(2);
    $("#level_timer").text(levelTime);
}

function showSpeedrunTime() {
    speedrunTime = ((state.lastFrameTime - state.speedrunStartTime) / 1000).toFixed(2);
    $("#speedrun_timer").text(speedrunTime);
}

function showTransitionTime() {
    transitionTime = ((state.lastFrameTime - state.transitionStartTime) / 1000).toFixed(2);
    $("#transition_timer").text(transitionTime);
}

window.autosplitter.onSound = function (sound) {
    if (sound == "damsel") {
        state.damselTime = state.lastFrameTime;
        state.damselCount += 1;

        if (state.in_level && state.damselCount >= chestsInLevel[state.level - 1]) {
            state.in_transition = true;
            state.transitionStartTime = state.lastFrameTime;
            $("#transition_timer").text("0.00");
        }
    }
}

window.autosplitter.onScene = function (name) {
    state.level = parseInt(name.slice(5, 10));

    state.in_menu = name === "Menu";
    state.in_credits = name === "End";
    state.in_level = !state.in_menu && !state.in_credits
    state.in_transition = false;

    state.damselCount = 0;
    state.levelStartTime = state.lastFrameTime;

    if (state.in_level) {
        document.getElementById("level_timer").innerText = "0.00";
        document.getElementById("level_wr").innerText = wrs[state.level - 1];

        $("#btn_previous_level").css("visibility", state.level > 1 ? "visible" : "hidden");
        $("#btn_next_level").css("visibility", state.level < 15 ? "visible" : "hidden");

        $("#btn_speedrun_mode").css("visibility", "hidden");
    } else {
        document.getElementById("level_timer").innerText = "---";
        document.getElementById("level_wr").innerText = "---";

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
            state.speedrunStartTime = state.lastFrameTime;
            $("#speedrun_timer").text("0.00");
        }

        if (state.in_credits){
            // Show final stats of speedrun
        }
    }
}
// Start with the game on the main menu
window.autosplitter.onScene("Menu");

window.autosplitter.onUpdate = function (time) {
    state.lastFrameTime = time;

    /*
    if (state.in_level && state.damselCount < chestsInLevel[state.level - 1]){
        showLevelTime();
    }
    */
    if (state.in_level){
        if (state.in_transition){
            showTransitionTime();
        }
        else{
            showLevelTime();
        }

        if (state.speedrun_mode_active){
            showSpeedrunTime();
        }
    }
    
}

$("#btn_speedrun_mode").click(function(){
    if (state.speedrun_mode_active){
        state.speedrun_mode_active = false;
        $("[speedrun-mode-element]").hide();
        $("[normal-mode-element]").show();
        $("#btn_speedrun_mode").text("Speedrun mode: off");
    }
    else{
        state.speedrun_mode_active = true;
        $("[speedrun-mode-element]").show();
        $("[normal-mode-element]").hide();
        $("#btn_speedrun_mode").text("Speedrun mode: on");
    }
});

$("#btn_next_level").click(function(){
    window.game.doChangeLayout(window.game.layouts_by_index[state.level + 2 + 1]);
})

$("#btn_previous_level").click(function(){
    window.game.doChangeLayout(window.game.layouts_by_index[state.level + 2 - 1]);
})