const todoButton = document.querySelector('.todo-btn');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const completedFilterBtn = document.querySelector('.completed-filter');
console.log(completedFilterBtn);
console.log('yes');
const getTodoListFromLocalStorage = () => {
  let todoListArr;
  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }
  return todoListArr;
};
const init = () => {
  let todoListArr;
  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }

  todoList.innerHTML = ``;
  todoListArr.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');

    const newTodoListItem = document.createElement('li');
    newTodoListItem.innerText = todo.text;
    if (todo.completed) newTodoListItem.classList.add('mark-complete');

    const newTodoBtnContainer = document.createElement('div');
    newTodoBtnContainer.classList.add('todo-btn-container');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-btn');

    completeBtn.innerHTML = `<i class="fa fa-check"></i>`;
    deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;

    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);

    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);

    todoList.appendChild(newTodo);
  });
};

document.addEventListener('DOMContentLoaded', init);

todoButton.addEventListener('click', (event) => {
  //   Prevent Default Behaviour of Btn
  event.preventDefault();

  //   Extracting todo value
  const todoText = todoInput.value;

  //   Check for empty list item
  if (!todoText) return;

  // Save to local storage
  saveTodoListToLocalStorage(todoText);

  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');

  const newTodoListItem = document.createElement('li');
  newTodoListItem.innerText = todoText;

  const newTodoBtnContainer = document.createElement('div');
  newTodoBtnContainer.classList.add('todo-btn-container');

  const completeBtn = document.createElement('button');
  completeBtn.classList.add('complete-btn');

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('trash-btn');

  completeBtn.innerHTML = `<i class="fa fa-check"></i>`;
  deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;

  newTodoBtnContainer.appendChild(completeBtn);
  newTodoBtnContainer.appendChild(deleteBtn);

  newTodo.appendChild(newTodoListItem);
  newTodo.appendChild(newTodoBtnContainer);

  todoList.appendChild(newTodo);

  todoInput.value = '';
});

// const updateList = (todoListArr) => {
//   todoList.innerHTML = ``;
//   todoListArr.forEach((todo) => {
//     const newTodo = document.createElement('div');
//     newTodo.classList.add('todo');

//     const newTodoListItem = document.createElement('li');
//     newTodoListItem.innerText = todo.text;
//     console(todo.completed);
//     console('yes');

//     if (todo.completed) newTodoListItem.classList.add('mark-complete');

//     const newTodoBtnContainer = document.createElement('div');
//     newTodoBtnContainer.classList.add('todo-btn-container');

//     const completeBtn = document.createElement('button');
//     completeBtn.classList.add('complete-btn');

//     const deleteBtn = document.createElement('button');
//     deleteBtn.classList.add('trash-btn');

//     completeBtn.innerHTML = `<i class="fa fa-check"></i>`;
//     deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;

//     newTodoBtnContainer.appendChild(completeBtn);
//     newTodoBtnContainer.appendChild(deleteBtn);

//     newTodo.appendChild(newTodoListItem);
//     newTodo.appendChild(newTodoBtnContainer);

//     todoList.appendChild(newTodo);
//   });
// };

const updateList = (todoListArr) => {
  todoList.innerHTML = ``; // Clear the current list

  todoListArr.forEach((todo) => {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');

    const newTodoListItem = document.createElement('li');
    newTodoListItem.innerText = todo.text;

    // Mark as complete if the task is completed
    if (todo.completed) newTodoListItem.classList.add('mark-complete');

    const newTodoBtnContainer = document.createElement('div');
    newTodoBtnContainer.classList.add('todo-btn-container');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-btn');

    completeBtn.innerHTML = `<i class="fa fa-check"></i>`;
    deleteBtn.innerHTML = `<i class="fa fa-trash"></i>`;

    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);

    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);

    todoList.appendChild(newTodo);
  });
};
const saveTodoListToLocalStorage = (todo) => {
  let todoListArr;

  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }
  todoListArr.push({ text: todo, completed: false });

  // console.log(todoListArr);
  localStorage.setItem('todoList', JSON.stringify(todoListArr));
};

todoList.addEventListener('click', (e) => {
  const item = e.target;
  if (
    item.classList.contains('trash-btn') ||
    item.classList.contains('fa-trash')
  ) {
    const elementType = item.classList.contains('fa-trash') ? 1 : 2;
    const btnContainer =
      elementType === 1 ? item.parentElement.parentElement : item.parentElement;

    const todoListItem = btnContainer.previousElementSibling;
    const todoText = todoListItem.textContent.trim();

    console.log(todoText);
    deleteTodo(todoText);
  } else if (
    item.classList.contains('complete-btn') ||
    item.classList.contains('fa-check')
  ) {
    console.log('hello');
    const elementType = item.classList.contains('fa-check') ? 1 : 2;
    const btnContainer =
      elementType === 1 ? item.parentElement.parentElement : item.parentElement;

    const todoListItem = btnContainer.previousElementSibling;
    const todoText = todoListItem.textContent.trim();

    console.log(todoText);
    markComplete(todoText);
  }
});

// const markComplete = (todoText) => {
//   let todoListArr;

//   const updatedTodoList = todoListArr.map((todo) => {
//     if (todo.text === todoText) {
//       return { text: todo.text, completed: !todo.completed };
//     }
//     return todo;
//   });

//   localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
//   init();
// };
const markComplete = (todoText) => {
  let todoListArr;

  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }

  const updatedTodoList = todoListArr.map((todo) => {
    if (todo.text === todoText) {
      return { text: todo.text, completed: !todo.completed };
    }
    return todo;
  });

  localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  init();
};
const deleteTodo = (todoText) => {
  let todoListArr;
  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr = [];
  }

  const updatedTodoList = todoListArr.filter((todo) => {
    return todo.text !== todoText;
  });

  localStorage.setItem('todoList', JSON.stringify(updatedTodoList));
  init();
};

// completedFilterBtn.addEventListener('click', (e) => {
//   let todoListArr = [];
//   if (localStorage.getItem('todoList')) {
//     todoListArr = JSON.parse(localStorage.getItem('todoList'));
//   } else {
//     todoListArr = [];
//   }

//   const completedTodoList = todoListArr.filter((todo) => {
//     return todo.completed === true;
//   });
//   updateList(completedTodoList);
// });
completedFilterBtn.addEventListener('click', () => {
  let todoListArr = getTodoListFromLocalStorage(); // Fetch the tasks from localStorage

  // Filter completed tasks
  const completedTodoList = todoListArr.filter((todo) => {
    return todo.completed === true;
  });

  // Update the list to show only completed tasks
  updateList(completedTodoList);
});
// Add event listners for all-filter and remaining-filter
// BLUE -> ALL, RED -> PENDING TODOS
/**
 * 1. Select
 * 2. Add Event Listners for Each of Them
 */

// JSON Format -> JSON.stringify, JSON.parse
// const list = ['ljsndg', 'jsg', 'ksnbgs'];
// console.log(JSON.stringify(list));

// const obj = {
//   name: 'Aditya',
//   age: 23,
//   lastName: 'Agrawal',
//   address: {
//     city: 'Bangalore',
//     state: 'Karnataka',
//   },
// };
// console.log(obj);
// console.log(JSON.stringify(obj));
