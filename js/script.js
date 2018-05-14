var itemNumber = 0;
var itemContents = [];

function addItem(text, checked) {
	var input = document.querySelector("input");	
	var inputText = text || input.value;
	if (inputText.includes(",") || inputText.includes("|")) return false;
	itemContents.push(inputText);
	
	if (!inputText && !text) return;
	
	var itemIndex = ++itemNumber;
	var listItem = document.createElement("li");
	listItem.id = "item" + itemIndex;

	var span = document.createElement("span");
	span.textContent = inputText;
	span.setAttribute("contenteditable", "true");

	var deleteButton = document.createElement("div");
	deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" width="50" height="50"><style>svg:hover path { fill: #f00 }</style><path d="M11.5-.031c-1.957 0-3.531 1.625-3.531 3.594V4H4c-.55 0-1 .45-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.55-.45-1-1-1h-3.969v-.438c0-1.968-1.574-3.593-3.531-3.593zm0 2.062h3c.805 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.874.664-1.53 1.469-1.53zM6 8h5.125c.125.012.246.031.375.031h3c.129 0 .25-.02.375-.031H20v15c0 .563-.438 1-1 1H7c-.563 0-1-.438-1-1zm2 2v12h2V10zm4 0v12h2V10zm4 0v12h2V10z" fill="#222"/></svg>';

	var checkbox = document.createElement("div");
	var checked = checked || 0;
	checkbox.textContent = checked == 1 ? "✔" : "☐";
	span.style.textDecoration = checked == 0 ? "" : "line-through";
	span.style.color = checked == 0 ? "" : "rgb(0, 128, 0)";

	var list = document.querySelector("ul");
	list.appendChild(listItem);
	listItem.appendChild(checkbox);
	listItem.appendChild(span);
	listItem.appendChild(deleteButton);

	deleteButton.addEventListener('click', function(e) {
		var checked = document.querySelector("#item" + itemIndex).querySelector("div").textContent == "☐" ? 0 : 1;
		var text = document.querySelector("#item" + itemIndex + " span").textContent;
		localStorage.never4get = localStorage.never4get.replace(text + "," + checked + "|", "");

		listItem.remove();
		input.focus();
	});

	checkbox.addEventListener('click', function(e) {
		e.target.textContent = e.target.textContent == "☐" ? "✔" : "☐";
		span.style.textDecoration = span.style.textDecoration == "line-through" ? "" : "line-through";
		span.style.color = span.style.color == "rgb(0, 128, 0)" ? "" : "rgb(0, 128, 0)";

		var checked = checkbox.textContent == "☐" ? 0 : 1;
		var text = e.target.parentElement.querySelector("span").textContent;
		var items = localStorage.never4get.split("|");
		items[items.indexOf(text + "," + (checked == 1 ? 0 : 1))] = text + "," + checked;
		localStorage.never4get = items.join("|");
	});

	span.addEventListener('input', function(e) {
		var oldText = itemContents[itemIndex - 1];
		var checked = document.querySelector("#item" + itemIndex).querySelector("div").textContent == "☐" ? 0 : 1;
		var text = document.querySelector("#item" + itemIndex + " span").textContent;
		itemContents[itemIndex - 1] = text;
		localStorage.never4get = localStorage.never4get.replace(oldText + "," + checked, text + "," + checked);
	});

	if (!text) localStorage.never4get += input.value + "," + checked + "|";

	input.value = "";
	input.focus();
}

function keyPress(e) {
	var key = e.keyCode || e.which;
	if (key == 44 || key == 92) return false; // comma and pipe
	if (e.which == 13) addItem();
}

document.addEventListener("DOMContentLoaded", function() {
	document.querySelector("body>div").addEventListener('click', function(){addItem()});
	document.querySelector("input").addEventListener('keypress', keyPress);

	localStorage.never4get = localStorage.never4get ||  "Keep using never4get,0|";
	var items = localStorage.never4get.split("|");
	for (i = 0; i < items.length; i++) {
		var text = items[i].split(",")[0];
		var checked = items[i].split(",")[1];
		addItem(text, checked);
	}

});
