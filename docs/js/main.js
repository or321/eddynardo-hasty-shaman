/* Core components */
import "./constants/gameEventsNames.js";
import "./core/gameEvents.js";

/* State components */
import {initializeSettings} from "./state/settings.js";
import "./state/levelTimer.js";

/* View components */
import "./views/levelTimerView.js";

/* Custom effects */

/* Event translators (transfer some events into other events) */
import "./translators/layoutChangedTranslator.js";

/* Event detectors (same as translators, but focus on specific outcome) */
import "./detectors/speedrunEventsDetector.js";

/* Initialize components when necessary */
initializeSettings();