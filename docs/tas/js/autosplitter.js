window.tas_autosplitter = {};
window.tas_autosplitter.tasMode = false;

var chestsInLevel = [2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 1, 2, 2];
var wrs = ["2.87", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?"];

var tas_state = {
    previousTime: null,
    lastTime: null,
    damselTime: NaN,
    damselCount: 0,
    level: NaN,
    in_menu: true,
    in_credits: false,
    levelStart: null
}

function showTime() {
    return ((tas_state.lastTime - tas_state.levelStart) / 1000).toFixed(2);
}

window.tas_autosplitter.onSound = function (sound) {
    if (sound == "damsel") {
        tas_state.damselTime = tas_state.lastTime;
        tas_state.damselCount += 1;
    }
}

window.tas_autosplitter.onScene = function (name) {
    tas_state.level = parseInt(name.slice(5, 10));

    tas_state.in_menu = name === "Menu";
    tas_state.in_credits = name === "End";
    tas_state.in_level = !tas_state.in_menu && !tas_state.in_credits

    if (tas_state.in_level) {
        document.getElementById("level_timer").innerText = "0.00";
        document.getElementById("level_wr").innerText = wrs[tas_state.level - 1];
    } else {
        document.getElementById("level_timer").innerText = "---";
        document.getElementById("level_wr").innerText = "---";
    }

    tas_state.damselCount = 0;
    tas_state.levelStart = tas_state.lastTime;
}

window.tas_autosplitter.onUpdate = function (time) {
    tas_state.lastTime = time;
    if (tas_state.in_level && tas_state.damselCount < chestsInLevel[tas_state.level - 1]) {
        document.getElementById("level_timer").innerText = showTime();
    }
    
}
