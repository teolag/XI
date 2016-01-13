
var XI = (function (xi) {
	"use strict";


	var on = function(elem, event, callback) {

		switch(event) {
			case "longtouch":
			onLongTouch(elem, event, callback);
			break;

			default:
			elem.addEventListener(event, callback, false);
		}


		function onLongTouch(elem, event, callback) {

			var holdCountdown, done;
			elem.addEventListener("contextmenu", noContextMenu, false);
			elem.addEventListener("touchstart", holdStart, false);

			function holdStart(e) {
				done = false;
				holdCountdown = setTimeout(holdDone, 1000);
				elem.addEventListener("touchmove", holdMoved, false);
				elem.addEventListener("touchend", holdUp, false);
			}
			function holdMoved(e) {
				holdAbort();
			}
			function holdUp(e) {
				holdAbort();
			}
			function holdAbort() {
				clearTimeout(holdCountdown);
				elem.removeEventListener("touchmove", holdMoved, false);
				elem.removeEventListener("touchend", holdUp, false);
			}
			function holdDone(e) {
				done=true;
				holdAbort();
				callback();
			}
			function noContextMenu(e) {
				e.preventDefault();
			}
		}
	};


	xi.on = on;
	return xi;
}(XI || {}));