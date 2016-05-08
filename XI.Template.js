var XI = (function (xi) {
	"use strict";


	function template(elem, data, processor) {
		if(typeof elem === "string") {
			var tpl = document.getElementById(elem);
		} else {
			tpl = elem;
		}

		var frag = document.createDocumentFragment();

		if(!Array.isArray(data)) data = [data];

		data.forEach(function(item) {
			var clone = document.importNode(tpl.content, true);
			clone = processor(clone, item);
			frag.appendChild(clone);
		});
		return frag;
	}

	xi.template = template;
	return xi;
}(XI || {}));
