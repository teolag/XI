var Data = {};

var div = XI.create("div", {
	text: "En skapad div",
	appendTo: document.body,
	id: "minDiv",
	class: "box"
});

var button = XI.create("button", {
	text: "Ok",
	onClick: function() { console.log("okidoki"); },
	id: "btnOk",
	appendTo: div
});



var listenerElem = XI.selectId("listenerTest");
XI.on(listenerElem, "click", listenClick);
XI.on(listenerElem, "longtouch", longtouch);

function listenClick() {
	console.log("Click!");
}

function longtouch() {
	console.log("longtouch!");
}


//listenerElem.addEventListener('contextmenu', noContext, false);
function noContext(e) {
	alert("You've tried to open context menu"); //here you draw your own menu
	e.preventDefault();
}




var personForm = XI.selectId("personForm");
personForm.addEventListener("submit", submitPersonForm, false);
function submitPersonForm(e) {
	e.preventDefault();
	XI.postForm(personForm, {callback: submitPersonFormCallback})
}
function submitPersonFormCallback(data) {
	console.log("Person submit callback", data);
	Data.persons.push(data.person);
	printPersons();
}





XI.get("test_persons.json", {
	data: {
		maxAge: 20
	},
	callback: personsLoaded
});
function personsLoaded(persons) {
	console.log("Persons loaded", persons);
	Data.persons = persons;
	printPersons();
}

function printPersons() {
	var list = XI.selectId("personList"),
		fragment = document.createDocumentFragment(),
		li, span;
	list.innerHTML = "";
	Data.persons.forEach(function(person) {
		li = XI.create("li", {appendTo: fragment, data:{id:person.personId}});
		span = XI.create("span", {text: person.firstName + ' ' + person.lastName, appendTo: li});
		console.log("person", person);
	});
	list.appendChild(fragment);
}







var data = [
	{name: "Pelle Svensson", email: "pelle@svensson.se", tags:['Svans', 'Lego']},
	{name: "Orvar Koltrast", email: "orre@westerlund.uk", tags:['Grilla', 'Kött']},
	{name: "Grill-Brith Stekos", email: "mmm@meat.com"},
	{name: "Lennart Göstén", email: "gosten@hotmail.com", tags:['Lingo']}
];

var personTemplate = XI.template('tplPersonItem', data, function(tpl, item) {
	tpl.querySelector(".user-name").textContent = item.name;
	tpl.querySelector(".user-email").textContent = item.email;

	if(item.tags) {
		var tagslist = tpl.querySelector(".user-tags");
		var tplTag = tpl.querySelector("#tplPersonTag");
		var tagTemplate = XI.template(tplTag, item.tags, function(tpl2, item2) {
			tpl2.querySelector(".tag").textContent = item2;
			return tpl2;
		});
		tagslist.appendChild(tagTemplate);
	}
	return tpl;
});

var personList2 = XI.selectId("personList2");
personList2.appendChild(personTemplate);
console.log(personTemplate);


