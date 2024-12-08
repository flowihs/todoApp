// Находим элементы на странице
const form = document.getElementById('form') // кнопка для добавления 
const taskIutton = document.getElementById('taskInput') // поле воода 
const tasksList = document.getElementById("tasksList") // куда добавляем
const emptyList = document.getElementById('emptyList')
const buttonList = document.getElementById('button')

let tasks = []

if(localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach((task) => {
	const cssClass = task.done === true ? "task-title task-title--done" : "task-title";
	const taskHTML = 
		`
					<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
						<span class="${cssClass}">${task.text}</span>
						<div class="task-item__buttons">
							<button type="button" data-action="done" class="btn-action">
								<img src="./img/tick.svg" alt="Done" width="18" height="18">
							</button>
							<button type="button" data-action="delete" class="btn-action">
								<img src="./img/cross.svg" alt="Done" width="18" height="18">
							</button>
						</div>
					</li>
		`
	tasksList.insertAdjacentHTML('beforeend', taskHTML)
})

checkEmptyList()

form.addEventListener("submit", addTask)
tasksList.addEventListener("click", deleteTask)
tasksList.addEventListener("click", doneTask)

function addTask(event) {
	// убираем обновление страницы
	event.preventDefault()

	// Сохраняем введеные данные в поле
	const taskText = taskIutton.value 
	
	// Создаем задачу в виде обьекта
	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	}

	// Добавляем задачу в массив с задачами
	tasks.push(newTask)

	// Формируем CSS класс
	const cssClass = newTask.done === true ? "task-title task-title--done" : "task-title";


	// Выводим новое окно
	const taskHTML = 
	`
				<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
	`
	
	tasksList.insertAdjacentHTML('beforeend', taskHTML)

	// Очищаем поле ввода 
	taskInput.value = ''
	taskIutton.focus()
	checkEmptyList()
	saveToLocalStorage()
}

function deleteTask (event) {
	// убираем обновление страницы

	if(event.target.dataset.action === 'delete') {
		const parenNode = event.target.closest('.list-group-item')

		const id = Number(parenNode.id)


		// Получаем номер индекса
		const index = tasks.findIndex((task) => {
			return task.id === id;
		})

		// вырезаем из массива 
		tasks.splice(index, 1)

		parenNode.remove()
		

	}

	checkEmptyList()
	saveToLocalStorage()
}

function doneTask(event) {
	if (event.target.dataset.action === "done") {
		const parenNode = event.target.closest('.list-group-item')

		// Определяем ID задачи
		const id = Number(parenNode.id)
		const task = tasks.find((task) => {
			if (task.id === id) {
				return true
			}
		})

		task.done = !task.done

		const taskTitle = parenNode.querySelector('.task-title')
		taskTitle.classList.toggle('task-title--done')
	}
	saveToLocalStorage()
}

function checkEmptyList() {

    if (tasks.length === 0) {
        const existingEmptyListElement = document.querySelector('#emptyList');
        if (!existingEmptyListElement) {
            const emptyListElement = 
            `
                <li id="emptyList" class="list-group-item empty-list">
                    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                    <div class="empty-list__title">Список дел пуст</div>
                </li>
            `;
            tasksList.insertAdjacentHTML('afterbegin', emptyListElement);
        }
    } 
	
	if (tasks.length > 0) {
        const emptyListElement = document.querySelector('#emptyList');
        if (emptyListElement) {
            emptyListElement.remove();
        }
    }
	saveToLocalStorage()
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

checkEmptyList()


