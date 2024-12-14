const groceryForm = document.getElementById("grocery-form");
const groceryInput = document.getElementById("grocery-input");
const groceryList = document.getElementById("grocery-list");
const grocerySuggestions = document.getElementById("grocery-suggestions");

const STORAGE_KEY = "groceries";

let groceries = [];
let allGroceries = [];

async function fetchGroceries() {
	try {
		const response = await fetch("./data/groceries.json");
		if (!response.ok) {
			throw new Error("Could not load groceries data.");
		}
		const defaultGroceries = await response.json();

		allGroceries = defaultGroceries.map((item) => item.name);
		populateDatalist(allGroceries);

		groceries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
		renderGroceries();
	} catch (error) {
		console.error(error.message);
	}
}

function populateDatalist(options) {
	grocerySuggestions.innerHTML = options
		.map((option) => `<option value="${option}"></option>`)
		.join("");
}

function saveGroceries() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(groceries));
}

function renderGroceries() {
	groceryList.innerHTML = "";
	groceries.forEach((item, index) => {
		const li = document.createElement("li");
		li.className = item.checked ? "checked" : "";
		li.innerHTML = `
<span>${item.name}</span>
<div class="grocery-actions">
${
	item.checked
		? `<button onclick="toggleChecked(${index})"><i class="fa-solid fa-square-xmark"></i></button>`
		: `<button onclick="toggleChecked(${index})"><i class="fa-solid fa-square-check"></i></button>`
}
<button onclick="editGrocery(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
<button onclick="deleteGrocery(${index})"><i class="fa-solid fa-trash-can"></i></button>
</div>
`;
		groceryList.appendChild(li);
	});
}

groceryForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const name = groceryInput.value.trim();
	if (name) {
		groceries.push({ name, checked: false });
		groceryInput.value = "";
		saveGroceries();
		renderGroceries();
	}
});

function toggleChecked(index) {
	groceries[index].checked = !groceries[index].checked;
	saveGroceries();
	renderGroceries();
}

function editGrocery(index) {
	const newName = prompt("Edit the item:", groceries[index].name);
	if (newName !== null && newName.trim() !== "") {
		groceries[index].name = newName.trim();
		saveGroceries();
		renderGroceries();
	}
}

function deleteGrocery(index) {
	groceries.splice(index, 1);
	saveGroceries();
	renderGroceries();
}

fetchGroceries();
