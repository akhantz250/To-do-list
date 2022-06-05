import {taskController} from './taskController';
const displayController = (function(){
    const initialBox = 'default';
    let currentBox = initialBox;

    function initialise(){
        loadContent();
        loadArchiveContent();
        setUpAddTask();
    }
    function loadContent(){
        const targetElement = document.querySelector('.task-target');
        targetElement.innerHTML = '';
        const allTasks = taskController.allTasks;
        allTasks.forEach(task =>{
            if(!task.isComplete){
                _createNewTask(task.getTitle(),task.getDescription(),task.getDueDate(),task.getPriority(),task);
            }
        });
    }
    function loadArchiveContent(){
        if(taskController.allTasks.some((task => task.isComplete))){
            const titleTarget = document.querySelector('.archive-title-target');
            titleTarget.innerHTML = `
            <div class="archive-title">
                    <h3>Archive</h3>
                    <span class="material-symbols-outlined">keyboard_arrow_down</span>
                </div>
                `
        }else{
            const titleTarget = document.querySelector('.archive-title-target');
            titleTarget.innerHTML = ``;
        }
        const targetElement = document.querySelector('.archive-target');
        targetElement.innerHTML = '';
        const allTasks = taskController.allTasks;
        allTasks.forEach(task =>{
            if(task.isComplete){
                _createNewTask(task.getTitle(),task.getDescription(),task.getDueDate(),task.getPriority(),task);
            }
        });
    }
    //creates the create task form when add task is clicked
    function setUpTaskForm(){
        const formContainerElement = document.querySelector('#form-container');
        formContainerElement.innerHTML = `
        <div class="task-form">
                <form id="new-task" action="#" method="post" autocomplete="off">
                    <div class="form-row"><input type="text" id="title" name="title" placeholder="Task name"></div>
                    <div class="form-row"><textarea name="description" id="description" placeholder="Description" rows="5"></textarea></div>
                    <div class="form-row" id="final-row">
                        <label for="due-date">Due Date: <input type="date" name="due-date" id="due-date"></label>
                        <label for="priority">Priority: 
                            <select name="priority" id="priority">
                                <option value="0" selected> - </option>
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </select>
                        </label>
                        <div class="btn-container"><button id="cancel" type="button">Cancel</button>
                            <button id="create-task" type="submit" disabled>Add task</button></div>
                    </div>
                </form>
            </div>
        `
        const addTaskBtn = document.querySelector('#create-task');
        const cancelBtn = document.querySelector('#cancel');
        const taskNameInput = document.querySelector('#title');
        const form = document.querySelector('#new-task')
        taskNameInput.addEventListener('input', (e) =>{
            if(taskNameInput.value.length !== 0){
                addTaskBtn.removeAttribute('disabled');
            }else{
                addTaskBtn.setAttribute('disabled','');
            } 
        });
        cancelBtn.addEventListener('click',() => setUpAddTask());
        addTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const title = form.elements['title'].value;
            const description = form.elements['description'].value;
            const dueDate = form.elements['due-date'].value;
            const priority = form.elements['priority'].value;
            const task = taskController.createTask(title, description, dueDate, priority, currentBox);
            _createNewTask(title, description, dueDate, priority, task);
            console.log(taskController.allTasks);
            setUpAddTask();
            form.reset();
        });
    }
    //hides the create task form and creates the add task button back
    function setUpAddTask(){
        const formContainerElement = document.querySelector('#form-container');
        formContainerElement.innerHTML =`
        <div id="add-task">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 19V13H5V11H11V5H13V11H19V13H13V19Z"/></svg>
                    <p>Add task</p>
                </div>
        `;
        const addTaskBtn = document.querySelector('#add-task');
        addTaskBtn.addEventListener('click', () => {
            loadContent();
            setUpTaskForm();
        })
    }
    //creates a new task row
    function _createNewTask(title, description, dueDate, priority, task){
        let targetElement;
        if(!task.isComplete){
            targetElement = document.querySelector('.task-target');
        }else{
            targetElement = document.querySelector('.archive-target');
        }
        const newTaskRow = document.createElement('div');
        const newCheckBox = document.createElement('div');
        const newInfoContainer = document.createElement('div');
        const newTitle = document.createElement('div');
        const newDescription = document.createElement('div');
        const newDueDate = document.createElement('div');
        const newIcon = document.createElement('span');

        newTaskRow.classList.add('task-row');
        newCheckBox.classList.add('task-check');
        newInfoContainer.classList.add('task-info');
        newTitle.classList.add('task-title');
        newDescription.classList.add('task-description');
        newDueDate.classList.add('task-due-date');
        newIcon.classList.add('material-symbols-outlined');
        newIcon.textContent = task.isComplete? 'delete':'edit';
        if(task.isComplete){
            newTaskRow.classList.add('complete');
        }
        switch(priority) {
            case '0':
                newTaskRow.classList.add('p0');
                break;
            case '1':
                newTaskRow.classList.add('p1');
                break;
            case '2':
                newTaskRow.classList.add('p2');
                break;
            case '3':
                newTaskRow.classList.add('p3');
                break;
          }
        newTitle.textContent = title;
        newDescription.textContent = description;
        newDueDate.textContent = dueDate === ''? 'No date': dueDate;

        //edit and complete task event listeners
        if(!task.isComplete){
            newIcon.addEventListener('click', ()=> {
                setUpAddTask();
                _setUpEditTaskForm(newTaskRow,targetElement, task);
            });
        }else{
            newIcon.addEventListener('click', ()=> {
                taskController.removeTask(task.taskID);
                loadContent();
                loadArchiveContent()
            });
        }
        newCheckBox.addEventListener('click', () =>{
            if(task.isComplete){
                task.isComplete = false;
            }else{
                task.isComplete = true;
            }
            newTaskRow.classList.toggle('complete');
            loadContent();
            loadArchiveContent();
        })

        targetElement.appendChild(newTaskRow);
        newTaskRow.appendChild(newCheckBox);
        newTaskRow.appendChild(newInfoContainer);
        newTaskRow.appendChild(newDueDate);
        newTaskRow.appendChild(newIcon);
        newInfoContainer.appendChild(newTitle);
        newInfoContainer.appendChild(newDescription);
    }
    function _setUpEditTaskForm(taskRow, targetElement, task){
        const formContainerElement = document.createElement('div');
        formContainerElement.classList.add('edit-form-container');
        formContainerElement.innerHTML = `
        <div class="edit-task-form">
                <form id="edit-task" action="#" method="post" autocomplete="off">
                    <div class="form-row"><input type="text" id="title" name="title" placeholder="Task name"></div>
                    <div class="form-row"><textarea name="description" id="description" placeholder="Description" rows="5"></textarea></div>
                    <div class="form-row" id="final-row">
                        <label for="due-date">Due Date: <input type="date" name="due-date" id="due-date"></label>
                        <label for="priority">Priority: 
                            <select name="priority" id="priority">
                                <option value="0" selected> - </option>
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </select>
                        </label>
                        <div class="btn-container"><button id="edit-cancel" type="button">Cancel</button>
                            <button id="edit-task-btn" type="submit">Edit task</button></div>
                    </div>
                </form>
            </div>
        `
        targetElement.insertBefore(formContainerElement,taskRow);
        targetElement.removeChild(taskRow);

        const form = document.querySelector('#edit-task')

        const editTaskBtn = document.querySelector('#edit-task-btn');
        const cancelBtn = document.querySelector('#edit-cancel');
        const taskNameInput = document.querySelector('#title');

        const titleInput = form.elements['title'];
        const descriptionInput = form.elements['description'];
        const dueDateInput = form.elements['due-date'];
        const priorityInput = form.elements['priority'];

        titleInput.value = task.getTitle();
        descriptionInput.value = task.getDescription();
        dueDateInput.value = task.getDueDate();
        priorityInput.value = task.getPriority();

        taskNameInput.addEventListener('input', (e) =>{
            if(taskNameInput.value.length !== 0){
                editTaskBtn.removeAttribute('disabled');
            }else{
                editTaskBtn.setAttribute('disabled','');
            } 
        });

        cancelBtn.addEventListener('click',() => loadContent());
        editTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            taskController.editTask(titleInput.value, descriptionInput.value, dueDateInput.value,priorityInput.value, task.taskID);
            form.reset();
            loadContent();
        });
    }
    return {initialise}
})();

export default displayController;