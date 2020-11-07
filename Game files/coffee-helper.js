window.tas_autosplitter = {};
window.tas_autosplitter.tasMode = false;

var oneChestLevels = [2, 3, 5, 8, 11, 13, 14, 15];

var wrs = ["2.87", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?", "?"];

function chestsInLevel(num) {
    return oneChestLevels.includes(num) ? 1 : 2;
}

var state = {
    hasReset: false,
    previousTime: null,
    lastTime: null,
    damselTime: NaN,
    level: NaN,
    menu: true,
    damselCount: 0,
    levelStart: null
}

function showTime() {
    return ((state.lastTime - state.levelStart) / 1000).toFixed(2);
}

window.tas_autosplitter.onSound = function (sound) {
    console.log("autosplitter.onSound", sound);
    /*
    if (sound == "damsel") {
        state.damselTime = state.lastTime;
        state.damselCount += 1;
        // console.log("chest " + state.damselCount + " at " + showTime());
    }
    */
}

window.tas_autosplitter.onScene = function (name) {
    console.log("autosplitter.onScene", name);

    /*
    var previousState = JSON.parse(JSON.stringify(state));

    // console.log(state.lastTime - state.damselTime); // log load time

    document.getElementById("timer1").innerText = "0.00";
    document.getElementById("timer2").innerText = "0.00";

    state.level = parseInt(name.slice(5, 10));
    state.menu = name === "Menu" || (Number.isNaN(state.level));
    if (!state.menu) {
        document.getElementById("wr").innerText = wrs[state.level - 1];
    } else {
        document.getElementById("wr").innerText = "0.00";
    }
    state.damselCount = 0;
    state.levelStart = state.lastTime;
    */
}

window.tas_autosplitter.onUpdate = function (time) {
    //console.log("autosplitter.onUpdate", time);
    /*
    state.previousTime = state.lastTime;
    state.lastTime = time;
    if (!state.menu && state.damselCount < chestsInLevel(state.level)) {
        var id = (state.damselCount == 0) ? "timer1" : "timer2";
        document.getElementById(id).innerText = showTime();
    }
    */
}
