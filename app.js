//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

//Functions
function addTodo(event){
    //Prevent form submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add Todo to LocalStorage
    saveLocalTodos(todoInput.value);
    //Checkmark BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);
    //Trash BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to LIST
    todoList.appendChild(todoDiv);
    //Clear INPUT
    todoInput.value="";
}

function deleteCheck(e){
    const item = e.target;
    //Delete Todo
    if(item.classList[0]==="trash-btn"){
        //Animation
        item.parentElement.classList.toggle("fall");
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener("transitionend", function(){
            item.parentElement.remove();
        });
        
    }
    //Checkmark
    if(item.classList[0]=="completed-btn"){
        item.parentElement.classList.toggle("completed");
    }
}

function filterTodo(e){
    console.log(todoList.childNodes);
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        
        switch(e.target.value){
            case "all":
                if(todo.style!=null){
                    todo.style.display="flex";
                }
                break;
            case "completed":
                if(todo.style!=null){
                    if(todo.classList.contains("completed")){
                        todo.style.display="flex";
                    }else{
                        todo.style.display= "none";
                    }
                }
                break;
            case "uncompleted":
                if(todo.style!=null){
                    if(!todo.classList.contains("completed")){
                        todo.style.display="flex";
                    }else{
                        todo.style.display= "none";
                    }
                }
                break;
        }
    });
}


function saveLocalTodos(todo){
    //Check for existing file
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Check for existing file
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Checkmark BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('completed-btn');
        todoDiv.appendChild(completedButton);
        //Trash BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to LIST
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo){
    //Check for existing file
    let todos;
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}