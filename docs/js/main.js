/* Core components */
import "./constants/gameEventsNames.js";
import "./core/gameEvents.js";

/* State components */
import * as settings from "./state/settings.js";
import "./state/gameState.js";
import "./state/levelTimer.js";
import "./state/speedrunTimer.js";
import "./state/fpsCounter.js";

/* View components */
import * as levelTimerView from "./views/levelTimerView.js";
import * as speedrunTimerView from "./views/speedrunTimerView.js";
import * as timersContainerView from "./views/timersContainerView.js";
import * as fpsCounterView from "./views/fpsCounterView.js";

/* Custom effects */

/* Event translators (transfer some events into other events) */
import "./translators/layoutChangedTranslator.js";

/* Event detectors (same as translators, but focus on specific outcome) */


function initUI() {
	return $.get("../templates/uiTemplate.html")
		.then(html => {
			$("body").append(html);
		});
}

async function bootstrap() {
	await initUI();

	/* Initialize components if necessary */

	settings.initialize();

	levelTimerView.initialize();
	speedrunTimerView.initialize();
	timersContainerView.initialize();
	fpsCounterView.initialize();
}

bootstrap();