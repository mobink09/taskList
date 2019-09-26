// define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all Event Listener

loadEventListeners();

function loadEventListeners() {
    // DOM Load event to display local storage
    document.addEventListener('DOMContentLoaded', getTasks);


    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    // clear task event
    clearBtn.addEventListener('click', clearTasks);
    // filter task event
    filter.addEventListener('keyup', filterTasks)
}

// get task from local storage
function getTasks() {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }

    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = "collection-item";

        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = "delete-item secondary-content ";
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append link to li  
        li.appendChild(link);
        // append li to the ul
        taskList.appendChild(li);
    });




}

// addTask
function addTask(e) {

    if (taskInput.value === '') {
        alert('Add Task');
    }
    const li = document.createElement('li');
    li.className = "collection-item";

    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = "delete-item secondary-content ";
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li  
    li.appendChild(link);
    // append li to the ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // clear the input
    taskInput.value = '';
    e.preventDefault();
}

// add to local storage 
function storeTaskInLocalStorage(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }

    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}






// remove task 
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure to delete this item ? ')) {
            e.target.parentElement.parentElement.remove();

            // remove task from ls
            removeTaskFromLocalStroge(e.target.parentElement.parentElement);

        }
    }

}
function removeTaskFromLocalStroge(taskItem) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }

    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear task
function clearTasks() {

    // 1) in not recommanded : taskList.remove();
    // 2) taskList.innerHTML = '';
    // if(taskList.innerHTML !==''){
    //   if(confirm('Are you sure to delete all ?')){
    //     taskList.innerHTML = '';
    //   }
    // }
    // else{
    //     if(taskList.innerHTML ===''){
    //         alert('Task List are already empty');
    //     }
    // }

    // faster method
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }


    // clear from ls
    clearTasksFromLocalStroge();

}
// clear tasks from ls
function clearTasksFromLocalStroge() {
    localStorage.clear();
}








function filterTasks(e) {

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const item = task.firstChild.textContent;
            if (item.toLocaleLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        }
    );


    e.preventDefault();
}