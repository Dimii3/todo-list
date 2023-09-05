const tasksBox = document.querySelector('.todo-box');
const addBtn = document.querySelector('.add');
const taskBox = document.querySelector('.add-new-task');
const addNewTask = document.querySelector('.add-task');
const inputTitle = document.querySelector('#title');
const inputDescription = document.querySelector('#description');
const searchInput = document.querySelector('.search');
const closeTaskBox = document.querySelector('.close');
const warningText = document.querySelector('.add-new-task__warning');
const numOfTasks = document.querySelector('.amount-of-tasks');
const editBox = document.querySelector('.edit-task');
const inputEditTitle = document.querySelector('#edit-title');
const inputEditDescription = document.querySelector('#edit-description');
const editBtn = document.querySelector('.edit-confirm');
const cancelEditBox = document.querySelector('.cancel');
const editWarningText = document.querySelector('.edit-task__warning');

let uniId = 0;
let currid = 0;

let openTaskBox = false;
function checkIfOpen() {
	if (!openTaskBox) {
		taskBox.classList.add('show');
		openTaskBox = true;
	} else {
		taskBox.classList.remove('show');
		openTaskBox = false;
	}
}

function searchForTasks(searchValue) {
	const getAllTasks = [...document.getElementsByClassName('task')];
	if (searchInput.value.length) {
		for (const task of getAllTasks) {
			if (
				task.firstElementChild.textContent
					.toLocaleLowerCase()
					.includes(searchValue.toLocaleLowerCase())
			) {
				task.style.display = 'flex';
			} else {
				task.style.display = 'none';
			}
		}
	} else {
		for (const task of getAllTasks) {
			task.style.display = 'flex';
		}
	}
}

function clearInputs() {
	inputTitle.value = '';
	inputDescription.value = '';
}

function closeBox() {
	taskBox.classList.remove('show');
	openTaskBox = false;
	warningText.classList.remove('problem');
}

function createNewTask(title, description) {
	uniId++;
	const task = document.createElement('div');
	task.classList.add('task');
	task.setAttribute('id', `${uniId}`);
	task.innerHTML = `<p class="task__title">${title}</p>
    <p class="task__description">${description}
	</p>
    <div class="task__controls">
	<button class="btn-control delete">Delete</button>
	<button class="btn-control edit">Edit</button>
	<button class="btn-control done">Done</button>
    </div>`;
	deleteCurrTask(task);
	openEditBox(task);
	doneTask(task);
	tasksBox.append(task);
	setAmountOfTasks();
}

// Updating the number of tasks
function setAmountOfTasks() {
	numOfTasks.textContent = tasksBox.children.length;
}

// OLD VERSION
// function doneTask() {
// 	const allDoneBtns = [...document.getElementsByClassName('done')];
// 	for (const doneBtn of allDoneBtns) {
// 		doneBtn.addEventListener('click', (e) => {
// 			e.target.closest('.task').classList.add('done');
// 		});
// 	}
// }

function doneTask(task) {
	task.children[2].children[2].addEventListener('click', () => {
		task.classList.toggle('done');
	});
}

// opening a modal to edit the current task
function openEditBox(task) {
	task.children[2].children[1].addEventListener('click', (e) => {
		editBox.style.cssText = `
		top: ${e.clientY + 50}px;
		left: ${e.clientX}px`;
		editBox.classList.add('show');
		currid = task.id;
	});
}

// OLD VERSION
// function openEditBox() {
// 	const allEditBtns = [...document.getElementsByClassName('edit')];
// 	allEditBtns.forEach((btn) =>
// 		btn.addEventListener('click', (e) => {
// 			editBox.style.cssText = `
// 			top: ${e.clientY + 50}px;
// 			left: ${e.clientX}px`;
// 			editBox.classList.add('show');
// 			currid = btn.closest('.task').id;
// 		})
// 	);
// }

editBtn.addEventListener('click', () => {
	const currEditingTask = document.getElementById(currid);
	if (inputEditTitle.value.trim().length > 0 && inputEditDescription.value.trim().length > 0) {
		currEditingTask.children[0].textContent = inputEditTitle.value;
		currEditingTask.children[1].textContent = inputEditDescription.value;
		editBox.classList.remove('show');
		editWarningText.classList.remove('problem');
		inputEditTitle.value = '';
		inputEditDescription.value = '';
	} else {
		editWarningText.classList.add('problem');
	}
});

// OLD VERSION
// function deleteTask() {
// 	const allDeleteBtns = [...document.getElementsByClassName('delete')];
// 	allDeleteBtns.forEach((task) =>
// 		task.addEventListener('click', (e) => {
// 			e.target.closest('.task').remove();
// 			setAmountOfTasks();
// 		})
// 	);
// }

function deleteCurrTask(task) {
	task.children[2].children[0].addEventListener('click', () => {
		task.remove();
		setAmountOfTasks();
	});
}

// checking input values in the modal
function checkValues(title, description) {
	const isCorrect =
		title.length > 0 &&
		title.trim().length > 0 &&
		description.length > 0 &&
		description.trim().length > 0;
	warningText.classList.toggle('problem', !isCorrect);
	return isCorrect;
}

addNewTask.addEventListener('click', () => {
	if (checkValues(inputTitle.value, inputDescription.value)) {
		createNewTask(inputTitle.value, inputDescription.value);
		clearInputs();
		closeBox();
	}
});

closeTaskBox.addEventListener('click', () => {
	closeBox();
	clearInputs();
});

addBtn.addEventListener('click', () => {
	checkIfOpen();
});

searchInput.addEventListener('keyup', () => {
	searchForTasks(searchInput.value);
});

cancelEditBox.addEventListener('click', () => {
	editBox.classList.remove('show');
	editWarningText.classList.remove('problem');
});
