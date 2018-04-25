// Each item should look like this: 
//<li><input type="checkbox" class><span>content</span></li>
function addItem() {	
	var inputText = document.getElementById("input").value;
	var input = document.getElementById("input");
	if (inputText != "") {
		var listItem = document.createElement("li");
		var span = document.createElement("span");
		span.innerText = inputText;

		var deleteButton = document.createElement("div");
		deleteButton.style = "height: 120%; color: white; cursor: pointer; margin: auto; margin-bottom: 3px; border-left: 1px solid white; padding: 3px; float: up;";

		deleteButton.innerText = "Delete";
		deleteButton.style.float = "right";

		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.style = "float: left; margin-left: 3px; padding: 3px 3px 3px 3px;"; 
		checkbox.class = "checkbox";

		var list = document.getElementById("todoList");
		list.appendChild(listItem);

		listItem.appendChild(checkbox);

		listItem.appendChild(span);

		listItem.appendChild(deleteButton);
		deleteButton.addEventListener('click', deleted);

		span.addEventListener('click', rename);

		input.value = "";
		input.focus();

		function rename() {
			inputText = prompt("What would you like to rename this to? ");
			if (inputText != "" && inputText != " " && inputText != "  ") {
				span.innerText = inputText;
			}	
		}

		function deleted() {
			listItem.remove();
			input.focus();
		}
		checkbox.onclick = function() {
			if (listItem.style.textDecoration == "line-through") {
				listItem.style.textDecoration = "none";
				listItem.style.color = "white";
			}else{	
				listItem.style.textDecoration = "line-through";
				listItem.style.color = "green";
			}
		}
	}
}

function addNewItem(event) {
	if(event.which == 13) {
		addItem();
	}
}

function main() {
	var btnNew = document.getElementById("addBtn");
		btnNew.addEventListener('click', addItem);
		input.addEventListener('keypress', addNewItem);
}

main();
