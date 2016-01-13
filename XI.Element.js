var XI = (function (xi) {
	"use strict";

	function createElement(type, o) {
		var elem = document.createElement(type);

		for(var key in o) {
			if(elem.hasOwnProperty(o)) {
				elem[key] = o[key];
			} else if(key.substr(0,2)==="on") {
				var event = key.substr(2).toLowerCase();
				elem.addEventListener(event, o[key], false);
			} else {
				switch(key) {
					case 'class': elem.className = o.class; break;
					case 'text': elem.textContent = o.text; break;
					case 'html': elem.innerHTML = o.html; break;

					case 'appendTo': o.appendTo.appendChild(elem); break;
					case 'insertAfter': elem.parentNode.insertBefore(o, elem.nextSibling); break;
					case 'insertBefore': elem.parentNode.insertBefore(o, elem); break;

					case 'data':
					for(var k in o.data) {
						elem.dataset[k] = o.data[k];
					}
					break;

					default:
					elem.setAttribute(key, o[key]);
				}
			}
		}
		return elem;
	}

	function createFragment() {
		return document.createDocumentFragment();
	}

	function deleteElement(element) {
		element.parentElement.removeChild(element);
	}

	function selectId(id) {
		return document.getElementById(id);
	}

	function select(selector) {
		return document.querySelector(selector);
	}

	function selectAll(selector) {
		return document.querySelectorAll(selector);
	}

	function show(elem) {
		elem.style.display="";
	}
	function hide(elem) {
		elem.style.display="none";
	}

	function isFullyInsideViewport(element) {
		var rect = element.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= innerHeight &&
			rect.right <= innerWidth
		);
	}
	function isFullyOrPartallyInsideViewport(element) {
		var rect = element.getBoundingClientRect();
		return (
			rect.top < innerHeight &&
			rect.left < innerWidth &&
			(rect.top + rect.height) > 0 &&
			(rect.left + rect.width) > 0
		);
	}
	function isVisible(element) {
		if ((element.nodeType != 1) || (element == document.body)) {
			return true;
		}
		if (element.currentStyle && element.currentStyle["display"] != "none" && element.currentStyle["visibility"] != "hidden") {
			return isVisible(element.parentNode);
		} else if (window.getComputedStyle) {
			var cs = document.defaultView.getComputedStyle(element, null);
			if (cs.getPropertyValue("display") != "none" && cs.getPropertyValue("visibility") != "hidden") {
				return isVisible(element.parentNode);
			}
		}
		return false;
	}

	xi.select = select;
	xi.selectAll = selectAll;
	xi.selectId = selectId;
	xi.create = createElement;
	xi.createFragment = createFragment;
	xi.delete = deleteElement;
	xi.show = show;
	xi.hide = hide;
	xi.isFullyInsideViewport = isFullyInsideViewport;
	xi.isFullyOrPartallyInsideViewport = isFullyOrPartallyInsideViewport;
	xi.isVisible = isVisible;
	return xi;
}(XI || {}));