import {taskController} from './taskController';
const displayController = (function(){
    const initialBox = 'default';
    let currentBox = initialBox;

    function initialise(){
        _loadContent();
        _loadArchiveContent();
        _loadProject();
        _setUpAddTask();
        _setUpAddProject();
    }
    function _loadContent(){
        const targetElement = document.querySelector('.task-target');
        targetElement.innerHTML = '';
        const allTasks = taskController.allTasks;
        allTasks.forEach(task =>{
            if(!task.isComplete){
                _createNewTask(task.getTitle(),task.getDescription(),task.getDueDate(),task.getPriority(),task);
            }
        });
    }
    function _loadArchiveContent(){
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
    function _loadProject(){
        const allProjects = taskController.allProjects;
        const targetElement = document.querySelector('.project-list');
        targetElement.innerHTML='';
        allProjects.forEach(project =>{
            _createProject(project);
        });
    }
    //creates the create task form when add task is clicked
    function _setUpTaskForm(){
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
        cancelBtn.addEventListener('click',() => _setUpAddTask());
        addTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const title = form.elements['title'].value;
            const description = form.elements['description'].value;
            const dueDate = form.elements['due-date'].value;
            const priority = form.elements['priority'].value;


            const task = taskController.createTask(title, description, dueDate, priority, currentBox);
            _createNewTask(title, description, dueDate, priority, task);
            console.log(taskController.allTasks);


            _setUpAddTask();
            form.reset();
        });
    }
    //hides the create task form and creates the add task button back
    function _setUpAddTask(){
        const formContainerElement = document.querySelector('#form-container');
        formContainerElement.innerHTML =`
        <div id="add-task">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M11 19V13H5V11H11V5H13V11H19V13H13V19Z"/></svg>
                    <p>Add task</p>
                </div>
        `;
        const addTaskBtn = document.querySelector('#add-task');
        addTaskBtn.addEventListener('click', () => {
            _loadContent();
            _setUpTaskForm();
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
                _setUpAddTask();
                _setUpEditTaskForm(newTaskRow,targetElement, task);
            });
        }else{
            newIcon.addEventListener('click', ()=> {
                taskController.removeTask(task.taskID);
                _loadContent();
                _loadArchiveContent()
            });
        }
        newCheckBox.addEventListener('click', () =>{
            if(task.isComplete){
                task.isComplete = false;
            }else{
                task.isComplete = true;
            }
            newTaskRow.classList.toggle('complete');
            _loadContent();
            _loadArchiveContent();
        })

        targetElement.appendChild(newTaskRow);
        newTaskRow.appendChild(newCheckBox);
        newTaskRow.appendChild(newInfoContainer);
        newTaskRow.appendChild(newDueDate);
        newTaskRow.appendChild(newIcon);
        newInfoContainer.appendChild(newTitle);
        newInfoContainer.appendChild(newDescription);
    }
    //creates edit form
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

        cancelBtn.addEventListener('click',() => _loadContent());
        editTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            taskController.editTask(titleInput.value, descriptionInput.value, dueDateInput.value,priorityInput.value, task.taskID);
            form.reset();
            _loadContent();
        });
    }
    //creates event listeners for add project related elements
    function _setUpAddProject(){
        const addProject = document.querySelector('#add-project');
        const submitProject = document.querySelector('#project-submit');
        const closeProject = document.querySelector('#close-project');
        const inputProject = document.querySelector('#project-name');

        inputProject.addEventListener('input', (e) =>{
            if(inputProject.value.length === 0 || taskController.checkProjectDuplicate(inputProject.value)){
                submitProject.setAttribute('disabled','');
                
            }else{
                submitProject.removeAttribute('disabled');
            } 
            if(taskController.checkProjectDuplicate(inputProject.value)){
                _showWarning();
            }else{
                _hideWarning();
            }
        });

        addProject.addEventListener('click', () => {
            _showInputModal();
        })

        submitProject.addEventListener('click', (e) => {
            e.preventDefault();
            const form = document.querySelector('#project-name-form');
            const projectName = form.elements['project-name'].value;
            taskController.createProject(projectName);
            _createProject(projectName);
            form.reset();
            _hideInputModal();
        })
        closeProject.addEventListener('click',() =>{
            const form = document.querySelector('#project-name-form');
            form.reset();
            _hideInputModal();
        })
    }
    function _showInputModal(){
        const modal = document.querySelector('.add-project-modal-container');
        modal.classList.add('show');
        document.querySelector('#project-name').focus();
    }
    function _hideInputModal(){
        const modal = document.querySelector('.add-project-modal-container');
        document.querySelector('#project-submit').setAttribute('disabled','');
        modal.classList.remove('show');
    }
    function _showWarning(){
        document.querySelector('.warning').classList.add('show-warning');
    }
    function _hideWarning(){
        document.querySelector('.warning').classList.remove('show-warning');
    }
    function _createProject(projectName){
        const projectList = document.querySelector('.project-list');
        const project = document.createElement('div');
        project.classList.add('project');
        project.setAttribute('data-name',projectName);
        project.innerHTML = `
        <div class="bullet"></div><span>${projectName}</span><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.375 15.562 4.438 14.625 9.062 10 4.438 5.375 5.375 4.438 10 9.062 14.625 4.438 15.562 5.375 10.938 10 15.562 14.625 14.625 15.562 10 10.938Z"/></svg>
        `
        project.addEventListener('click',() => {
            console.log(`Clicked ${projectName}`);
        });
        const deleteBtn = project.querySelector('svg');
        deleteBtn.addEventListener('click',(e) =>{
            e.stopPropagation();
            taskController.removeProject(projectName);
            _loadProject();
        })
        projectList.appendChild(project);
    }
    return {initialise}
})();

export default displayController;