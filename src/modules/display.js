import {taskController} from './taskController';
import { format } from 'date-fns';
const displayController = (function(){
    const initialBox = 'default';
    let currentBox = initialBox;

    function initialise(){
        _loadContent(currentBox);
        _loadArchiveContent(currentBox);
        _setUpSwitchButtons();
        _loadProject();
        _setUpAddTask();
        _setUpAddProject();
    }
    function _loadContent(box){
        if(currentBox ==='Upcoming'){
            _loadUpcomingTask();
            return;
        }
        const targetElement = document.querySelector('.task-target');
        targetElement.innerHTML = '';
        let taskToDisplay;
        if(currentBox === 'Today'){
            taskToDisplay = taskController.getTodayTask();
        }else{
            taskToDisplay = taskController.getTasksByProject(box);
        }
        taskToDisplay.forEach(task =>{
            if(!task.isComplete){
                _createNewTask(task.getTitle(),task.getDescription(),task.getDueDate(),task.getPriority(),task);
            }
        });
        console.log(taskController.allTasks);
    }
    function _loadArchiveContent(box){
        if(box === 'Upcoming'){
            const titleTarget = document.querySelector('.archive-title-target');
            titleTarget.innerHTML = ``;
            const targetElement = document.querySelector('.archive-target');
            targetElement.innerHTML = '';
            return
        }
        let taskToDisplay;
        if(currentBox === 'Today'){
            taskToDisplay = taskController.getTodayTask();
        }else{
            taskToDisplay = taskController.getTasksByProject(box);
        }
        if(taskToDisplay.some((task => task.isComplete))){
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
        
        taskToDisplay.forEach(task =>{
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
                        <label for="priority">Priority: 
                            <select name="priority" id="priority">
                                <option value="0" selected> - </option>
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </select>
                        </label>
                        <label for="due-date">Due Date: <input type="date" name="due-date" id="due-date"></label>
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
        const dateInput = document.querySelector('#due-date');
        if(currentBox === 'Today'){
            dateInput.setAttribute('readonly','');
            dateInput.value = taskController.getTodayDate();
        }
        cancelBtn.addEventListener('click',() => _setUpAddTask());
        addTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const title = form.elements['title'].value;
            const description = form.elements['description'].value;
            const dueDate = form.elements['due-date'].value;
            const priority = form.elements['priority'].value;
            let box;
            if(currentBox === 'Today' || currentBox === 'Upcoming'){
                box = 'default';
            }else box = currentBox

            const task = taskController.createTask(title, description, dueDate, priority, box);
            _createNewTask(title, description, dueDate, priority, task);
            if(currentBox === 'Upcoming'){_loadContent(currentBox);} 
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
            _loadContent(currentBox);
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
        // newDueDate.textContent = dueDate === ''? 'No date': dueDate;
        if(dueDate === ''){
            newDueDate.textContent ='No date';
        }else if(taskController.isToday(dueDate)){
            newDueDate.textContent = 'Today';
        }else{
            newDueDate.textContent = _formatDate(dueDate);
        }
        //edit task event listeners
        if(!task.isComplete){
            newIcon.addEventListener('click', (e)=> {
                e.stopPropagation();
                _setUpAddTask();
                _closeEditTaskForm();
                _setUpEditTaskForm(newTaskRow,targetElement, task);
            });
        }else{ //complete task event listeners
            newIcon.addEventListener('click', (e)=> {
                e.stopPropagation();
                taskController.removeTask(task.taskID);
                _loadContent(currentBox);
                _loadArchiveContent(currentBox)
            });
        }
        newCheckBox.addEventListener('click', (e) =>{
            e.stopPropagation();
            if(task.isComplete){
                task.isComplete = false;
            }else{
                task.isComplete = true;
            }
            newTaskRow.classList.toggle('complete');
            _loadContent(currentBox);
            _loadArchiveContent(currentBox);
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
        formContainerElement.setAttribute('data-task-ID',task.getTaskID());
        formContainerElement.innerHTML = `
        <div class="edit-task-form">
                <form id="edit-task" action="#" method="post" autocomplete="off">
                    <div class="form-row"><input type="text" id="title" name="title" placeholder="Task name"></div>
                    <div class="form-row"><textarea name="description" id="description" placeholder="Description" rows="5"></textarea></div>
                    <div class="form-row" id="final-row">
                        <label for="priority">Priority: 
                            <select name="priority" id="priority">
                                <option value="0" selected> - </option>
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </select>
                        </label>
                        <label for="due-date">Due Date: <input type="date" name="due-date" id="due-date"></label>
                        <div class="btn-container"><button id="edit-cancel" type="button">Cancel</button>
                            <button id="edit-task-btn" type="submit">Edit task</button></div>
                    </div>
                </form>
            </div>
        `
        targetElement.insertBefore(formContainerElement,taskRow);
        // targetElement.removeChild(taskRow);
        taskRow.setAttribute('id','hide-task');

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

        cancelBtn.addEventListener('click',() => _loadContent(currentBox));
        editTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            taskController.editTask(titleInput.value, descriptionInput.value, dueDateInput.value,priorityInput.value, task.taskID);
            form.reset();
            _loadContent(currentBox);
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
            _switchProject(projectName);
        });
        const deleteBtn = project.querySelector('svg');
        deleteBtn.addEventListener('click',(e) =>{
            e.stopPropagation();
            taskController.removeProject(projectName);
            // _loadContent(currentBox);
            // _loadArchiveContent(currentBox);
            _loadProject();
            if(currentBox === projectName){
                _switchToInbox();
            }else{
              _loadContent(currentBox);
              _loadArchiveContent(currentBox);  
            }
            
        })
        projectList.appendChild(project);
    }
    //changes the main display to show task by selected project
    function _switchProject(project){
        currentBox = project;
        _changeBoxTitle();
        _loadContent(currentBox);
        _loadArchiveContent(currentBox);
        _setUpAddTask();
    }
    function _changeBoxTitle(){
        const currentBoxElement = document.querySelector('#current-box');
        if(currentBox !== 'default')
        {
            currentBoxElement.textContent = currentBox;
        }else{
            currentBoxElement.textContent = 'Inbox';
        }
        
    }
    function _setUpSwitchButtons(){
        const inboxElement = document.querySelector('#inbox');
        const todayElement = document.querySelector('#today');
        const upcomingElement = document.querySelector('#upcoming');

        inboxElement.addEventListener('click', _switchToInbox);
        todayElement.addEventListener('click', _switchToToday);
        upcomingElement.addEventListener('click', _switchToUpcoming);
    }
    function _switchToInbox(){
        currentBox = 'default';
            _loadContent(currentBox);
            _loadArchiveContent(currentBox);
            _changeBoxTitle();
            _setUpAddTask();
    }
    function _switchToToday(){
        currentBox = 'Today';
            _loadContent(currentBox);
            _loadArchiveContent(currentBox);
            _changeBoxTitle();
            _setUpAddTask();
    }
    function _switchToUpcoming(){
        currentBox = 'Upcoming';
        _loadUpcomingTask();
        _loadArchiveContent(currentBox);
        _changeBoxTitle();
        _setUpAddTask();
    }
    function _loadUpcomingTask(){
        const targetElement = document.querySelector('.task-target');
        targetElement.innerHTML = '';
        const sortedTask = taskController.sortTaskWithDates();
        const taskToDisplay = sortedTask.filter(task => !task.isComplete);
        const allDates =[];
        taskToDisplay.forEach(task => {
            if(!allDates.includes(task.getDueDate())){
                allDates.push(task.getDueDate());
                const newDateElement = document.createElement('div');
                newDateElement.classList.add('upcoming-date');
                if(task.getDueDate() < taskController.getTodayDate()){
                    newDateElement.classList.add('overdue');
                }
                newDateElement.setAttribute('data-date', task.getDueDate());
                newDateElement.textContent = _formatDate(task.getDueDate());
                targetElement.appendChild(newDateElement);
            }
        })
        taskToDisplay.forEach(task =>{
            if(!task.isComplete){
                _createNewUpcomingTask(task.getTitle(),task.getDescription(),task.getDueDate(),task.getPriority(),task);
            }
        });
    }
    
    function _formatDate(date){
        // yyyy-MM-dd
        const year = parseInt(date.slice(0,4));
        const monthIndex = parseInt(date.slice(5,7))-1;
        const day = parseInt(date.slice(8,10));
        const preDate = new Date(year, monthIndex,day);
        
        return format(preDate, 'do MMM yyyy');
    }
    function _closeEditTaskForm(task){
        const formContainer = document.querySelector('.edit-form-container');
        if(formContainer === null){
            return
        }else{
            // const target = document.querySelector('.task-target');
            formContainer.remove();
            const hiddenElement = document.querySelector('#hide-task');
            hiddenElement.removeAttribute('id');
        }
    }
    function _createNewUpcomingTask(title, description, dueDate, priority, task){
        const targetElement = document.querySelector(`[data-date="${task.getDueDate()}"]`)
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
        newIcon.textContent = 'edit';
        
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
        
        if(dueDate === ''){
            newDueDate.textContent ='No date';
        }else if(taskController.isToday(dueDate)){
            newDueDate.textContent = 'Today';
        }else{
            newDueDate.textContent = _formatDate(dueDate);
        }
        //edit task event listeners
        if(!task.isComplete){
            newIcon.addEventListener('click', (e)=> {
                e.stopPropagation();
                _setUpAddTask();
                _closeEditTaskForm();
                _setUpEditTaskForm(newTaskRow,targetElement, task);
            });
        }else{ //complete task event listeners
            newIcon.addEventListener('click', (e)=> {
                e.stopPropagation();
                taskController.removeTask(task.taskID);
                _loadContent(currentBox);
                _loadArchiveContent(currentBox)
            });
        }
        newCheckBox.addEventListener('click', (e) =>{
            e.stopPropagation();
            if(task.isComplete){
                task.isComplete = false;
            }else{
                task.isComplete = true;
            }
            newTaskRow.classList.toggle('complete');
            _loadContent(currentBox);
        })

        targetElement.appendChild(newTaskRow);
        newTaskRow.appendChild(newCheckBox);
        newTaskRow.appendChild(newInfoContainer);
        newTaskRow.appendChild(newDueDate);
        newTaskRow.appendChild(newIcon);
        newInfoContainer.appendChild(newTitle);
        newInfoContainer.appendChild(newDescription);
    }
    return {initialise}
})();

export default displayController;