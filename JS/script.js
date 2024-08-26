'use strict';

const delay = () => new Promise(resolve => setTimeout(resolve, 2000));

// 1. Вивести 20 картинок з запиту в гарному оформленні (_limit=20)
// (https://jsonplaceholder.typicode.com/photos)

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const listFoto = document.querySelector('.list__foto');
const loaderFoto = document.querySelector('.loader-foto');

async function getFotos() {
	try {
		loaderFoto.classList.add('visible');
		await delay();
		const { data } = await axios.get(`${BASE_URL}photos`, {
			params: { _limit: 20 },
		});
		data.forEach(item => {
			createHtmlLi(item);
		});
	} catch (error) {
		console.error('error:', error);
	} finally {
		loaderFoto.classList.remove('visible');
	}
}
getFotos();

function createHtmlLi({ id, title, thumbnailUrl }) {
	listFoto.insertAdjacentHTML(
		'beforeend',
		/*html*/ `
    <li class="list__item">
      <img src='${thumbnailUrl}' alt='${title}' id='${id}'>
      <p class="list__text">${title}</p>
    </li>
    `
	);
}

// 2. Вивести всі тудушки з запиту, у яких "userId" дорівнює 5 в гарному оформленні з
// чекбоксом, який буде залежати від поля "completed" (https://jsonplaceholder.typicode.com/todos)

const TODOS_URL = 'https://jsonplaceholder.typicode.com/';
const toDoForm = document.forms['to-do__form'];
const enterToDo = toDoForm['to-do__enter'];
const toDoList = document.querySelector('.to-do__list');
const loaderTodo = document.querySelector('.loader-todo');

const createHtmlToDoLi = (id, title, completed) => {
	const newItem = document.createElement('li');
	newItem.className = 'to-do__item';
	newItem.innerHTML = `
		<input type="checkbox" id="checkbox-${id}" ${
		completed ? 'checked' : ''
	} class='to-do__input'>
		<label for="checkbox-${id}">${title}</label>
		<img class='to-do__del' src="./assets/images/icons/delete.svg" alt="delete icon">
	`;

	toDoList.insertAdjacentElement('afterbegin', newItem);
};

const delItem = e => {
	if (e.target.closest('.to-do__del')) {
		e.target.closest('.to-do__item').remove();
	}
};

toDoForm.addEventListener('submit', e => {
	e.preventDefault();
	let id = Date.now();
	if (enterToDo.value.trim() === '') return;
	createHtmlToDoLi(id, enterToDo.value, false);
	enterToDo.value = '';
});

async function getToDo() {
	try {
		loaderTodo.classList.add('visible');
		await delay();
		const { data } = await axios.get(`${TODOS_URL}todos`);
		const filterToDo = data.filter(todo => todo.userId === 5);
		filterToDo.forEach(item => {
			createHtmlToDoLi(item.id, item.title, item.completed);
		});
	} catch (error) {
		console.error('error:', error);
	} finally {
		loaderTodo.classList.remove('visible');
	}
}
getToDo();

toDoList.addEventListener('click', delItem);
