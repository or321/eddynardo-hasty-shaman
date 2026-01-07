const listeners = Object.create(null);

export function on(event, fn) {
	(listeners[event] ??= []).push(fn);
}

export function trigger(event, payload) {
	const list = listeners[event];
	if (!list) return;

	for (let i = 0; i < list.length; i++) {
		try {
			list[i](payload);
		} catch (e) {
			console.error(
				"gameEvents listener error:",
				event,
				e
			);
		}
	}
}

window.gameEvents = {on, trigger};
Object.freeze(window.gameEvents);