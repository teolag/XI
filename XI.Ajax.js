var XI = (function (xi) {
	"use strict";
	const DEFAULT_RESPONSE_TYPE = "json";
	const DEFAULT_ASYNC = true;
	const DEFAULT_METHOD = "GET";

	function post(url, o) {
		console.log("Post to", url, "with options", o);
		o.method = "POST";
		ajax(url, o);
	}

	function postForm(form, o) {
		var url = o.url || form.action;

		o.formData = new FormData(form);

		console.log("Post form to", url, "with options", o);
		o.method = "POST";
		ajax(url, o);
	}


	function get(url, o) {
		console.log("Send request to", url, "with options", o);
		ajax(url, o);
	}

	function ajax(url, o) {
		var responseType = o.responseType || DEFAULT_RESPONSE_TYPE;
		var async = o.async || DEFAULT_ASYNC;
		var method = o.method || DEFAULT_METHOD;

		if(method==="POST") {
			if(o.formData) {
				var sendData = o.formData;
			} else if(o.data) {
				var sendData = obj2params(o.data);
				var setPostHeader = true;
			}
		}


		if(method==="GET" && o.data) {
			url += "?" + obj2params(o.data);
		}

		var xhr = new XMLHttpRequest();
		xhr.open(method, url, async);
		xhr.responseType = responseType;
		if(setPostHeader) xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onload = onLoad;
		xhr.send(sendData);


		function onLoad(e) {
			if(o.callback) {
				if(e.target.responseType === 'json') {
					o.callback(e.target.response, e.target.status);
				} else {
					o.callback(e, e.target.status);
				}
			}
		}
	}

	function obj2params(obj) {
		var str = "";
		for (var key in obj) {
			if (str != "") {
				str += "&";
			}
			str += key + "=" + encodeURIComponent(obj[key]);
		}
		return str;
	}



	xi.get = get;
	xi.post = post;
	xi.postForm = postForm;
	return xi;
}(XI || {}));