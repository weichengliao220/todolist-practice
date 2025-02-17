// to select elements from the HTML
const form = document.getElementById('form'); // to get form id
const input = document.getElementById('input'); // to get input id
const ul = document.getElementById('ul'); // to get ul id

// retrieve stored todos data from local storage and parse them into a JS array
const todos = JSON.parse(localStorage.getItem('todos'));
// if any todos are stored, loop through them and add them to the list
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

// add event listener for when the form is submitted
form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the page from refreshing on form submission
  add(); // calls the add() function
});

// define the add() function to add a new todo item to the list
function add(todo) {
  let todoText = input.value; // get the text input value

  // if todo is provided from localStorage, use its text instead
  if (todo) {
    todoText = todo.text;
  }

  // only add a new todo if the input value is not empty
  if (todoText) {
    const li = document.createElement('li'); // create a new list (li) element

    li.innerText = todoText; // set the text content of the list element to the input value
    li.classList.add('list-group-item'); // add the 'list-group-item' class to the list element

    // if the todo was previously marked as completed, add the 'text-decoration-line-through' class
    if (todo && todo.completed) {
      li.classList.add('text-decoration-line-through');
    }

    // right-click event to remove a todo item
    li.addEventListener('contextmenu', function(event) {
      event.preventDefault(); // prevent the default right-click menu
      li.remove(); // remove the clicked list element from the DOM
      saveData(); // update localStorage
    });

    // left-click event to toggle the 'text-decoration-line-through' class
    li.addEventListener('click', function() {
      li.classList.toggle('text-decoration-line-through'); // toggle the 'text-decoration-line-through' class
      saveData(); // update localStorage
    });

    ul.appendChild(li); // append the new list element to the unordered list (ul)
    input.value = ''; // clear the input field after adding a new todo
    saveData(); // save the updated list to localStorage
  }
}

// function to save the todos to localStorage
function saveData() {
  const lists = document.querySelectorAll('li'); // select all list elements
  let todos = []; // create an empty array to store the todos

  // loop through each list element and store its text and completed status
  lists.forEach((li) => {
    todos.push({
      text: li.innerText,
      completed: li.classList.contains('text-decoration-line-through') // check if the 'text-decoration-line-through' class is present
    });
  });

  // save the updated todo list to localStorage in JSON format
  localStorage.setItem('todos', JSON.stringify(todos));
}
