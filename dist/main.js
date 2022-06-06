/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");



function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/modules/display.js":
/*!********************************!*\
  !*** ./src/modules/display.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _taskController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskController */ "./src/modules/taskController.js");

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
        const targetElement = document.querySelector('.task-target');
        targetElement.innerHTML = '';
        const taskToDisplay = _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.getTasksByProject(box);
        taskToDisplay.forEach(task =>{
            if(!task.isComplete){
                _createNewTask(task.getTitle(),task.getDescription(),task.getDueDate(),task.getPriority(),task);
            }
        });
    }
    function _loadArchiveContent(box){
        const taskToDisplay = _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.getTasksByProject(box);
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
        const allProjects = _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allProjects;
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


            const task = _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask(title, description, dueDate, priority, currentBox);
            _createNewTask(title, description, dueDate, priority, task);
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
        newDueDate.textContent = dueDate === ''? 'No date': dueDate;

        //edit and complete task event listeners
        if(!task.isComplete){
            newIcon.addEventListener('click', ()=> {
                _setUpAddTask();
                _setUpEditTaskForm(newTaskRow,targetElement, task);
            });
        }else{
            newIcon.addEventListener('click', ()=> {
                _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.removeTask(task.taskID);
                _loadContent(currentBox);
                _loadArchiveContent(currentBox)
            });
        }
        newCheckBox.addEventListener('click', () =>{
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

        cancelBtn.addEventListener('click',() => _loadContent(currentBox));
        editTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.editTask(titleInput.value, descriptionInput.value, dueDateInput.value,priorityInput.value, task.taskID);
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
            if(inputProject.value.length === 0 || _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.checkProjectDuplicate(inputProject.value)){
                submitProject.setAttribute('disabled','');
                
            }else{
                submitProject.removeAttribute('disabled');
            } 
            if(_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.checkProjectDuplicate(inputProject.value)){
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
            _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createProject(projectName);
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
            _switchProject(projectName);
        });
        const deleteBtn = project.querySelector('svg');
        deleteBtn.addEventListener('click',(e) =>{
            e.stopPropagation();
            _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.removeProject(projectName);
            // _loadContent(currentBox);
            // _loadArchiveContent(currentBox);
            _loadProject();
            if(currentBox === projectName){
                _switchToInbox();}
            
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
        todayElement.addEventListener('click', () => {
            // currentBox = 'Today';
            // _changeBoxTitle();
        });
        upcomingElement.addEventListener('click', () => {
            // currentBox = 'Upcoming';
            // _changeBoxTitle();
        });
    }
    function _switchToInbox(){
        currentBox = 'default';
            _loadContent(currentBox);
            _loadArchiveContent(currentBox);
            _changeBoxTitle();
            _setUpAddTask();
    }
    return {initialise}
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (displayController);

/***/ }),

/***/ "./src/modules/taskController.js":
/*!***************************************!*\
  !*** ./src/modules/taskController.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskController": () => (/* binding */ taskController)
/* harmony export */ });
/* harmony import */ var _taskFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskFactory */ "./src/modules/taskFactory.js");


const taskController = (function(){
    const allTasks= [];
    const allProjects = ['Chores','Homework'];

    function createTask(title, description, dueDate, priority, project){
        const newTask = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(title, description, dueDate, priority, project);
        allTasks.push(newTask);
        return newTask;
    }
    function removeTask(taskID){
        for(let i=0;i<allTasks.length;i++){
            if(allTasks[i].getTaskID() === taskID){
                allTasks.splice(i,1);
                return;
            }
        }
    }
    function editTask(title, description, dueDate, priority, taskID){
        for(let i = 0; i < allTasks.length; i++){
            if(allTasks[i].taskID === taskID){
                allTasks[i].setTitle(title);
                allTasks[i].setDescription(description);
                allTasks[i].setDueDate(dueDate);
                allTasks[i].setPriority(priority);
            }
        }
    }
    function getTasksByProject(project){
        if(project === 'default'){
            return allTasks;
        }
        const tasksByProject = allTasks.filter(task => 
            task.getProject() === project
        );
        return tasksByProject;
    }
    function checkProjectDuplicate(projectName){
        if(allProjects.includes(projectName)){
            return true;
        }else{
            return false;
        } 
    }
    function createProject(projectName){
        allProjects.push(projectName);
    }
    function removeProject(projectName){
        console.log(allTasks.forEach(task => console.log(task.getTitle(), task.getProject())));
        for(let i = allProjects.length; i > 0  ;i--){
            if(allProjects[i] === projectName){
                allProjects.splice(i,1);
            }
        }
        for(let x = allTasks.length - 1; x >=0 ;x--){
            if(allTasks[x].getProject() === projectName){
                console.log(`Deleted ${allTasks[x].getTitle()}`);
                allTasks.splice(x,1);
            }else console.log(`save ${allTasks[x].getTitle()}`);
        }
    }
    
    return{createTask, removeTask,editTask, allTasks, allProjects, 
        createProject, removeProject, getTasksByProject, checkProjectDuplicate};
})()



/***/ }),

/***/ "./src/modules/taskFactory.js":
/*!************************************!*\
  !*** ./src/modules/taskFactory.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");


const taskFactory = function (title, description, dueDate, priority, project){
    let isComplete = false; 
    const taskID = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();

    function getTaskID(){
        return taskID;
    }
    function getTitle(){
        return title;
    }
    function setTitle(newTitle){
        title = newTitle;
    }
    function getDescription(){
        return description;
    }
    function setDescription(newDescription){
        description = newDescription;
    }
    function getDueDate(){
        return dueDate;
    }
    function setDueDate(newDueDate){
        dueDate = newDueDate;
    }
    function getPriority(){
        return priority;
    }
    function setPriority(newPriority){
        priority = newPriority;
    }
    function getProject(){
        return project;
    }
    function setProject(newProject){
        project = newProject;
    }

    return {title, taskID, isComplete, project,getTitle,setTitle,getDescription,setDescription,
            getDueDate,setDueDate,getPriority,setPriority,getProject,setProject,getTaskID};
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskFactory);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_taskController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/taskController */ "./src/modules/taskController.js");
/* harmony import */ var _modules_display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/display */ "./src/modules/display.js");




// const today =  format(new Date(2014, 1, 11), 'MM/dd/yyyy');
// console.log(today);

_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask('Go to the gym','Leg day','No date','1','default');
_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask(`Doctor's appointment`,'2pm @ Jurong West','2022-06-09','2','default');
_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask('Homework','Math','No date','0','default');
_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask('Tim\'s birthday','Buy him a present','No date','3','default');
console.log(_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allTasks)
_modules_display__WEBPACK_IMPORTED_MODULE_1__["default"].initialise();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGlFQUFlLGNBQWMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsR0FBRyx5Q0FBeUM7Ozs7Ozs7Ozs7Ozs7O0FDQXBJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEJxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxnQkFBZ0IsU0FBUztBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMGdCQUEwZ0I7QUFDMWdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU8sd0RBQVE7QUFDZjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsU0FBUzs7Ozs7Ozs7Ozs7Ozs7OztBQzdCRztBQUNZOztBQUV2QztBQUNBO0FBQ0EsK0NBQStDLCtDQUFHLEtBQUs7O0FBRXZEO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBOztBQUVBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxTQUFTLHlEQUFTO0FBQ2xCOztBQUVBLGlFQUFlLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCYzs7QUFFL0I7QUFDQSxxQ0FBcUMsc0RBQVU7QUFDL0M7O0FBRUEsaUVBQWUsUUFBUTs7Ozs7Ozs7Ozs7Ozs7O0FDTnlCO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDZFQUFnQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsOEJBQThCLDZFQUFnQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSw0QkFBNEIsdUVBQTBCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EseUJBQXlCLHNFQUF5QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsZ0JBQWdCLHNFQUF5QjtBQUN6QztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9FQUF1QjtBQUNuQztBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtELGlGQUFvQztBQUN0RjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxlQUFlLGlGQUFvQztBQUNuRDtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVkseUVBQTRCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLFlBQVk7QUFDdEQ7QUFDQTtBQUNBLG1DQUFtQyxZQUFZO0FBQy9DO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFlBQVkseUVBQTRCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDOztBQUVELGlFQUFlLGlCQUFpQjs7Ozs7Ozs7Ozs7Ozs7O0FDNVhROztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0Isd0RBQVc7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHFCQUFxQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsUUFBUTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxPQUFPO0FBQ2hEO0FBQ0EsdUNBQXVDLHVCQUF1QjtBQUM5RDtBQUNBLGFBQWEseUJBQXlCLHVCQUF1QjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFbUM7O0FBRXBDO0FBQ0E7QUFDQSxtQkFBbUIsZ0RBQU07O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7O1VDNUNmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ1U7QUFDUDs7QUFFakQ7QUFDQTs7QUFFQSw4RUFBeUI7QUFDekIsOEVBQXlCO0FBQ3pCLDhFQUF5QjtBQUN6Qiw4RUFBeUI7QUFDekIsWUFBWSw0RUFBdUI7QUFDbkMsbUVBQTRCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcmVnZXguanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JuZy5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvdmFsaWRhdGUuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZHVsZXMvdGFza0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IC9eKD86WzAtOWEtZl17OH0tWzAtOWEtZl17NH0tWzEtNV1bMC05YS1mXXszfS1bODlhYl1bMC05YS1mXXszfS1bMC05YS1mXXsxMn18MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwKSQvaTsiLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiBJbiB0aGUgYnJvd3NlciB3ZSB0aGVyZWZvcmVcbi8vIHJlcXVpcmUgdGhlIGNyeXB0byBBUEkgYW5kIGRvIG5vdCBzdXBwb3J0IGJ1aWx0LWluIGZhbGxiYWNrIHRvIGxvd2VyIHF1YWxpdHkgcmFuZG9tIG51bWJlclxuLy8gZ2VuZXJhdG9ycyAobGlrZSBNYXRoLnJhbmRvbSgpKS5cbnZhciBnZXRSYW5kb21WYWx1ZXM7XG52YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBybmcoKSB7XG4gIC8vIGxhenkgbG9hZCBzbyB0aGF0IGVudmlyb25tZW50cyB0aGF0IG5lZWQgdG8gcG9seWZpbGwgaGF2ZSBhIGNoYW5jZSB0byBkbyBzb1xuICBpZiAoIWdldFJhbmRvbVZhbHVlcykge1xuICAgIC8vIGdldFJhbmRvbVZhbHVlcyBuZWVkcyB0byBiZSBpbnZva2VkIGluIGEgY29udGV4dCB3aGVyZSBcInRoaXNcIiBpcyBhIENyeXB0byBpbXBsZW1lbnRhdGlvbi4gQWxzbyxcbiAgICAvLyBmaW5kIHRoZSBjb21wbGV0ZSBpbXBsZW1lbnRhdGlvbiBvZiBjcnlwdG8gKG1zQ3J5cHRvKSBvbiBJRTExLlxuICAgIGdldFJhbmRvbVZhbHVlcyA9IHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKGNyeXB0bykgfHwgdHlwZW9mIG1zQ3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmIG1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcy5iaW5kKG1zQ3J5cHRvKTtcblxuICAgIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NyeXB0by5nZXRSYW5kb21WYWx1ZXMoKSBub3Qgc3VwcG9ydGVkLiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL3V1aWRqcy91dWlkI2dldHJhbmRvbXZhbHVlcy1ub3Qtc3VwcG9ydGVkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG59IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHt0YXNrQ29udHJvbGxlcn0gZnJvbSAnLi90YXNrQ29udHJvbGxlcic7XG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9IChmdW5jdGlvbigpe1xuICAgIGNvbnN0IGluaXRpYWxCb3ggPSAnZGVmYXVsdCc7XG4gICAgbGV0IGN1cnJlbnRCb3ggPSBpbml0aWFsQm94O1xuXG4gICAgZnVuY3Rpb24gaW5pdGlhbGlzZSgpe1xuICAgICAgICBfbG9hZENvbnRlbnQoY3VycmVudEJveCk7XG4gICAgICAgIF9sb2FkQXJjaGl2ZUNvbnRlbnQoY3VycmVudEJveCk7XG4gICAgICAgIF9zZXRVcFN3aXRjaEJ1dHRvbnMoKTtcbiAgICAgICAgX2xvYWRQcm9qZWN0KCk7XG4gICAgICAgIF9zZXRVcEFkZFRhc2soKTtcbiAgICAgICAgX3NldFVwQWRkUHJvamVjdCgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfbG9hZENvbnRlbnQoYm94KXtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXRhcmdldCcpO1xuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBjb25zdCB0YXNrVG9EaXNwbGF5ID0gdGFza0NvbnRyb2xsZXIuZ2V0VGFza3NCeVByb2plY3QoYm94KTtcbiAgICAgICAgdGFza1RvRGlzcGxheS5mb3JFYWNoKHRhc2sgPT57XG4gICAgICAgICAgICBpZighdGFzay5pc0NvbXBsZXRlKXtcbiAgICAgICAgICAgICAgICBfY3JlYXRlTmV3VGFzayh0YXNrLmdldFRpdGxlKCksdGFzay5nZXREZXNjcmlwdGlvbigpLHRhc2suZ2V0RHVlRGF0ZSgpLHRhc2suZ2V0UHJpb3JpdHkoKSx0YXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9sb2FkQXJjaGl2ZUNvbnRlbnQoYm94KXtcbiAgICAgICAgY29uc3QgdGFza1RvRGlzcGxheSA9IHRhc2tDb250cm9sbGVyLmdldFRhc2tzQnlQcm9qZWN0KGJveCk7XG4gICAgICAgIGlmKHRhc2tUb0Rpc3BsYXkuc29tZSgodGFzayA9PiB0YXNrLmlzQ29tcGxldGUpKSl7XG4gICAgICAgICAgICBjb25zdCB0aXRsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcmNoaXZlLXRpdGxlLXRhcmdldCcpO1xuICAgICAgICAgICAgdGl0bGVUYXJnZXQuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFyY2hpdmUtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgzPkFyY2hpdmU8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWRcIj5rZXlib2FyZF9hcnJvd19kb3duPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIGBcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zdCB0aXRsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcmNoaXZlLXRpdGxlLXRhcmdldCcpO1xuICAgICAgICAgICAgdGl0bGVUYXJnZXQuaW5uZXJIVE1MID0gYGA7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcmNoaXZlLXRhcmdldCcpO1xuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBcbiAgICAgICAgdGFza1RvRGlzcGxheS5mb3JFYWNoKHRhc2sgPT57XG4gICAgICAgICAgICBpZih0YXNrLmlzQ29tcGxldGUpe1xuICAgICAgICAgICAgICAgIF9jcmVhdGVOZXdUYXNrKHRhc2suZ2V0VGl0bGUoKSx0YXNrLmdldERlc2NyaXB0aW9uKCksdGFzay5nZXREdWVEYXRlKCksdGFzay5nZXRQcmlvcml0eSgpLHRhc2spO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX2xvYWRQcm9qZWN0KCl7XG4gICAgICAgIGNvbnN0IGFsbFByb2plY3RzID0gdGFza0NvbnRyb2xsZXIuYWxsUHJvamVjdHM7XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuaW5uZXJIVE1MPScnO1xuICAgICAgICBhbGxQcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT57XG4gICAgICAgICAgICBfY3JlYXRlUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vY3JlYXRlcyB0aGUgY3JlYXRlIHRhc2sgZm9ybSB3aGVuIGFkZCB0YXNrIGlzIGNsaWNrZWRcbiAgICBmdW5jdGlvbiBfc2V0VXBUYXNrRm9ybSgpe1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLWNvbnRhaW5lcicpO1xuICAgICAgICBmb3JtQ29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWZvcm1cIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cIm5ldy10YXNrXCIgYWN0aW9uPVwiI1wiIG1ldGhvZD1cInBvc3RcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0aXRsZVwiIG5hbWU9XCJ0aXRsZVwiIHBsYWNlaG9sZGVyPVwiVGFzayBuYW1lXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPjx0ZXh0YXJlYSBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiIHJvd3M9XCI1XCI+PC90ZXh0YXJlYT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCIgaWQ9XCJmaW5hbC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiPkR1ZSBEYXRlOiA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIiBpZD1cImR1ZS1kYXRlXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcmlvcml0eVwiPlByaW9yaXR5OiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJwcmlvcml0eVwiIGlkPVwicHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIiBzZWxlY3RlZD4gLSA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjFcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjNcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1jb250YWluZXJcIj48YnV0dG9uIGlkPVwiY2FuY2VsXCIgdHlwZT1cImJ1dHRvblwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJjcmVhdGUtdGFza1wiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD5BZGQgdGFzazwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgICAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NyZWF0ZS10YXNrJyk7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWwnKTtcbiAgICAgICAgY29uc3QgdGFza05hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrJylcbiAgICAgICAgdGFza05hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PntcbiAgICAgICAgICAgIGlmKHRhc2tOYW1lSW5wdXQudmFsdWUubGVuZ3RoICE9PSAwKXtcbiAgICAgICAgICAgICAgICBhZGRUYXNrQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGFkZFRhc2tCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfSk7XG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4gX3NldFVwQWRkVGFzaygpKTtcbiAgICAgICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gZm9ybS5lbGVtZW50c1sndGl0bGUnXS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZm9ybS5lbGVtZW50c1snZGVzY3JpcHRpb24nXS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGR1ZURhdGUgPSBmb3JtLmVsZW1lbnRzWydkdWUtZGF0ZSddLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBmb3JtLmVsZW1lbnRzWydwcmlvcml0eSddLnZhbHVlO1xuXG5cbiAgICAgICAgICAgIGNvbnN0IHRhc2sgPSB0YXNrQ29udHJvbGxlci5jcmVhdGVUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGN1cnJlbnRCb3gpO1xuICAgICAgICAgICAgX2NyZWF0ZU5ld1Rhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgdGFzayk7XG4gICAgICAgICAgICBfc2V0VXBBZGRUYXNrKCk7XG4gICAgICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL2hpZGVzIHRoZSBjcmVhdGUgdGFzayBmb3JtIGFuZCBjcmVhdGVzIHRoZSBhZGQgdGFzayBidXR0b24gYmFja1xuICAgIGZ1bmN0aW9uIF9zZXRVcEFkZFRhc2soKXtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1jb250YWluZXInKTtcbiAgICAgICAgZm9ybUNvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID1gXG4gICAgICAgIDxkaXYgaWQ9XCJhZGQtdGFza1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBoZWlnaHQ9XCIyNFwiIHdpZHRoPVwiMjRcIj48cGF0aCBkPVwiTTExIDE5VjEzSDVWMTFIMTFWNUgxM1YxMUgxOVYxM0gxM1YxOVpcIi8+PC9zdmc+XG4gICAgICAgICAgICAgICAgICAgIDxwPkFkZCB0YXNrPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgICAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrJyk7XG4gICAgICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBfbG9hZENvbnRlbnQoY3VycmVudEJveCk7XG4gICAgICAgICAgICBfc2V0VXBUYXNrRm9ybSgpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICAvL2NyZWF0ZXMgYSBuZXcgdGFzayByb3dcbiAgICBmdW5jdGlvbiBfY3JlYXRlTmV3VGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCB0YXNrKXtcbiAgICAgICAgbGV0IHRhcmdldEVsZW1lbnQ7XG4gICAgICAgIGlmKCF0YXNrLmlzQ29tcGxldGUpe1xuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXRhcmdldCcpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJjaGl2ZS10YXJnZXQnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdUYXNrUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IG5ld0NoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IG5ld0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBuZXdJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgICAgIG5ld1Rhc2tSb3cuY2xhc3NMaXN0LmFkZCgndGFzay1yb3cnKTtcbiAgICAgICAgbmV3Q2hlY2tCb3guY2xhc3NMaXN0LmFkZCgndGFzay1jaGVjaycpO1xuICAgICAgICBuZXdJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2staW5mbycpO1xuICAgICAgICBuZXdUaXRsZS5jbGFzc0xpc3QuYWRkKCd0YXNrLXRpdGxlJyk7XG4gICAgICAgIG5ld0Rlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZGVzY3JpcHRpb24nKTtcbiAgICAgICAgbmV3RHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCd0YXNrLWR1ZS1kYXRlJyk7XG4gICAgICAgIG5ld0ljb24uY2xhc3NMaXN0LmFkZCgnbWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCcpO1xuICAgICAgICBuZXdJY29uLnRleHRDb250ZW50ID0gdGFzay5pc0NvbXBsZXRlPyAnZGVsZXRlJzonZWRpdCc7XG4gICAgICAgIGlmKHRhc2suaXNDb21wbGV0ZSl7XG4gICAgICAgICAgICBuZXdUYXNrUm93LmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoKHByaW9yaXR5KSB7XG4gICAgICAgICAgICBjYXNlICcwJzpcbiAgICAgICAgICAgICAgICBuZXdUYXNrUm93LmNsYXNzTGlzdC5hZGQoJ3AwJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcxJzpcbiAgICAgICAgICAgICAgICBuZXdUYXNrUm93LmNsYXNzTGlzdC5hZGQoJ3AxJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICBuZXdUYXNrUm93LmNsYXNzTGlzdC5hZGQoJ3AyJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICczJzpcbiAgICAgICAgICAgICAgICBuZXdUYXNrUm93LmNsYXNzTGlzdC5hZGQoJ3AzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICBuZXdUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBuZXdEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuICAgICAgICBuZXdEdWVEYXRlLnRleHRDb250ZW50ID0gZHVlRGF0ZSA9PT0gJyc/ICdObyBkYXRlJzogZHVlRGF0ZTtcblxuICAgICAgICAvL2VkaXQgYW5kIGNvbXBsZXRlIHRhc2sgZXZlbnQgbGlzdGVuZXJzXG4gICAgICAgIGlmKCF0YXNrLmlzQ29tcGxldGUpe1xuICAgICAgICAgICAgbmV3SWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xuICAgICAgICAgICAgICAgIF9zZXRVcEFkZFRhc2soKTtcbiAgICAgICAgICAgICAgICBfc2V0VXBFZGl0VGFza0Zvcm0obmV3VGFza1Jvdyx0YXJnZXRFbGVtZW50LCB0YXNrKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG5ld0ljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHtcbiAgICAgICAgICAgICAgICB0YXNrQ29udHJvbGxlci5yZW1vdmVUYXNrKHRhc2sudGFza0lEKTtcbiAgICAgICAgICAgICAgICBfbG9hZENvbnRlbnQoY3VycmVudEJveCk7XG4gICAgICAgICAgICAgICAgX2xvYWRBcmNoaXZlQ29udGVudChjdXJyZW50Qm94KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3Q2hlY2tCb3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcbiAgICAgICAgICAgIGlmKHRhc2suaXNDb21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QudG9nZ2xlKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgX2xvYWRDb250ZW50KGN1cnJlbnRCb3gpO1xuICAgICAgICAgICAgX2xvYWRBcmNoaXZlQ29udGVudChjdXJyZW50Qm94KTtcbiAgICAgICAgfSlcblxuICAgICAgICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKG5ld1Rhc2tSb3cpO1xuICAgICAgICBuZXdUYXNrUm93LmFwcGVuZENoaWxkKG5ld0NoZWNrQm94KTtcbiAgICAgICAgbmV3VGFza1Jvdy5hcHBlbmRDaGlsZChuZXdJbmZvQ29udGFpbmVyKTtcbiAgICAgICAgbmV3VGFza1Jvdy5hcHBlbmRDaGlsZChuZXdEdWVEYXRlKTtcbiAgICAgICAgbmV3VGFza1Jvdy5hcHBlbmRDaGlsZChuZXdJY29uKTtcbiAgICAgICAgbmV3SW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdUaXRsZSk7XG4gICAgICAgIG5ld0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobmV3RGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICAvL2NyZWF0ZXMgZWRpdCBmb3JtXG4gICAgZnVuY3Rpb24gX3NldFVwRWRpdFRhc2tGb3JtKHRhc2tSb3csIHRhcmdldEVsZW1lbnQsIHRhc2spe1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBmb3JtQ29udGFpbmVyRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdlZGl0LWZvcm0tY29udGFpbmVyJyk7XG4gICAgICAgIGZvcm1Db250YWluZXJFbGVtZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImVkaXQtdGFzay1mb3JtXCI+XG4gICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJlZGl0LXRhc2tcIiBhY3Rpb249XCIjXCIgbWV0aG9kPVwicG9zdFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj48aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cInRpdGxlXCIgbmFtZT1cInRpdGxlXCIgcGxhY2Vob2xkZXI9XCJUYXNrIG5hbWVcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+PHRleHRhcmVhIG5hbWU9XCJkZXNjcmlwdGlvblwiIGlkPVwiZGVzY3JpcHRpb25cIiBwbGFjZWhvbGRlcj1cIkRlc2NyaXB0aW9uXCIgcm93cz1cIjVcIj48L3RleHRhcmVhPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIiBpZD1cImZpbmFsLXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImR1ZS1kYXRlXCI+RHVlIERhdGU6IDxpbnB1dCB0eXBlPVwiZGF0ZVwiIG5hbWU9XCJkdWUtZGF0ZVwiIGlkPVwiZHVlLWRhdGVcIj48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInByaW9yaXR5XCI+UHJpb3JpdHk6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgbmFtZT1cInByaW9yaXR5XCIgaWQ9XCJwcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMFwiIHNlbGVjdGVkPiAtIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMVwiPkxvdzwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMlwiPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiM1wiPkhpZ2g8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWNvbnRhaW5lclwiPjxidXR0b24gaWQ9XCJlZGl0LWNhbmNlbFwiIHR5cGU9XCJidXR0b25cIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiZWRpdC10YXNrLWJ0blwiIHR5cGU9XCJzdWJtaXRcIj5FZGl0IHRhc2s8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICAgICAgdGFyZ2V0RWxlbWVudC5pbnNlcnRCZWZvcmUoZm9ybUNvbnRhaW5lckVsZW1lbnQsdGFza1Jvdyk7XG4gICAgICAgIHRhcmdldEVsZW1lbnQucmVtb3ZlQ2hpbGQodGFza1Jvdyk7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2snKVxuXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtdGFzay1idG4nKTtcbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2VkaXQtY2FuY2VsJyk7XG4gICAgICAgIGNvbnN0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcblxuICAgICAgICBjb25zdCB0aXRsZUlucHV0ID0gZm9ybS5lbGVtZW50c1sndGl0bGUnXTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb25JbnB1dCA9IGZvcm0uZWxlbWVudHNbJ2Rlc2NyaXB0aW9uJ107XG4gICAgICAgIGNvbnN0IGR1ZURhdGVJbnB1dCA9IGZvcm0uZWxlbWVudHNbJ2R1ZS1kYXRlJ107XG4gICAgICAgIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBmb3JtLmVsZW1lbnRzWydwcmlvcml0eSddO1xuXG4gICAgICAgIHRpdGxlSW5wdXQudmFsdWUgPSB0YXNrLmdldFRpdGxlKCk7XG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSB0YXNrLmdldERlc2NyaXB0aW9uKCk7XG4gICAgICAgIGR1ZURhdGVJbnB1dC52YWx1ZSA9IHRhc2suZ2V0RHVlRGF0ZSgpO1xuICAgICAgICBwcmlvcml0eUlucHV0LnZhbHVlID0gdGFzay5nZXRQcmlvcml0eSgpO1xuXG4gICAgICAgIHRhc2tOYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT57XG4gICAgICAgICAgICBpZih0YXNrTmFtZUlucHV0LnZhbHVlLmxlbmd0aCAhPT0gMCl7XG4gICAgICAgICAgICAgICAgZWRpdFRhc2tCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZWRpdFRhc2tCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiBfbG9hZENvbnRlbnQoY3VycmVudEJveCkpO1xuICAgICAgICBlZGl0VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRhc2tDb250cm9sbGVyLmVkaXRUYXNrKHRpdGxlSW5wdXQudmFsdWUsIGRlc2NyaXB0aW9uSW5wdXQudmFsdWUsIGR1ZURhdGVJbnB1dC52YWx1ZSxwcmlvcml0eUlucHV0LnZhbHVlLCB0YXNrLnRhc2tJRCk7XG4gICAgICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICAgICAgICBfbG9hZENvbnRlbnQoY3VycmVudEJveCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL2NyZWF0ZXMgZXZlbnQgbGlzdGVuZXJzIGZvciBhZGQgcHJvamVjdCByZWxhdGVkIGVsZW1lbnRzXG4gICAgZnVuY3Rpb24gX3NldFVwQWRkUHJvamVjdCgpe1xuICAgICAgICBjb25zdCBhZGRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1wcm9qZWN0Jyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdFByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1zdWJtaXQnKTtcbiAgICAgICAgY29uc3QgY2xvc2VQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLXByb2plY3QnKTtcbiAgICAgICAgY29uc3QgaW5wdXRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuXG4gICAgICAgIGlucHV0UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PntcbiAgICAgICAgICAgIGlmKGlucHV0UHJvamVjdC52YWx1ZS5sZW5ndGggPT09IDAgfHwgdGFza0NvbnRyb2xsZXIuY2hlY2tQcm9qZWN0RHVwbGljYXRlKGlucHV0UHJvamVjdC52YWx1ZSkpe1xuICAgICAgICAgICAgICAgIHN1Ym1pdFByb2plY3Quc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc3VibWl0UHJvamVjdC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgaWYodGFza0NvbnRyb2xsZXIuY2hlY2tQcm9qZWN0RHVwbGljYXRlKGlucHV0UHJvamVjdC52YWx1ZSkpe1xuICAgICAgICAgICAgICAgIF9zaG93V2FybmluZygpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgX2hpZGVXYXJuaW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFkZFByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBfc2hvd0lucHV0TW9kYWwoKTtcbiAgICAgICAgfSlcblxuICAgICAgICBzdWJtaXRQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lLWZvcm0nKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZm9ybS5lbGVtZW50c1sncHJvamVjdC1uYW1lJ10udmFsdWU7XG4gICAgICAgICAgICB0YXNrQ29udHJvbGxlci5jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIF9jcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIF9oaWRlSW5wdXRNb2RhbCgpO1xuICAgICAgICB9KVxuICAgICAgICBjbG9zZVByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+e1xuICAgICAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0LW5hbWUtZm9ybScpO1xuICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgX2hpZGVJbnB1dE1vZGFsKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIGZ1bmN0aW9uIF9zaG93SW5wdXRNb2RhbCgpe1xuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1tb2RhbC1jb250YWluZXInKTtcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1uYW1lJykuZm9jdXMoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX2hpZGVJbnB1dE1vZGFsKCl7XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LW1vZGFsLWNvbnRhaW5lcicpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdC1zdWJtaXQnKS5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywnJyk7XG4gICAgICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX3Nob3dXYXJuaW5nKCl7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53YXJuaW5nJykuY2xhc3NMaXN0LmFkZCgnc2hvdy13YXJuaW5nJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9oaWRlV2FybmluZygpe1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2FybmluZycpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctd2FybmluZycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSl7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpO1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3QuY2xhc3NMaXN0LmFkZCgncHJvamVjdCcpO1xuICAgICAgICBwcm9qZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJyxwcm9qZWN0TmFtZSk7XG4gICAgICAgIHByb2plY3QuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnVsbGV0XCI+PC9kaXY+PHNwYW4+JHtwcm9qZWN0TmFtZX08L3NwYW4+PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgaGVpZ2h0PVwiMjBcIiB3aWR0aD1cIjIwXCI+PHBhdGggZD1cIk01LjM3NSAxNS41NjIgNC40MzggMTQuNjI1IDkuMDYyIDEwIDQuNDM4IDUuMzc1IDUuMzc1IDQuNDM4IDEwIDkuMDYyIDE0LjYyNSA0LjQzOCAxNS41NjIgNS4zNzUgMTAuOTM4IDEwIDE1LjU2MiAxNC42MjUgMTQuNjI1IDE1LjU2MiAxMCAxMC45MzhaXCIvPjwvc3ZnPlxuICAgICAgICBgXG4gICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDbGlja2VkICR7cHJvamVjdE5hbWV9YCk7XG4gICAgICAgICAgICBfc3dpdGNoUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBwcm9qZWN0LnF1ZXJ5U2VsZWN0b3IoJ3N2ZycpO1xuICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKSA9PntcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB0YXNrQ29udHJvbGxlci5yZW1vdmVQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgICAgIC8vIF9sb2FkQ29udGVudChjdXJyZW50Qm94KTtcbiAgICAgICAgICAgIC8vIF9sb2FkQXJjaGl2ZUNvbnRlbnQoY3VycmVudEJveCk7XG4gICAgICAgICAgICBfbG9hZFByb2plY3QoKTtcbiAgICAgICAgICAgIGlmKGN1cnJlbnRCb3ggPT09IHByb2plY3ROYW1lKXtcbiAgICAgICAgICAgICAgICBfc3dpdGNoVG9JbmJveCgpO31cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0KTtcbiAgICB9XG4gICAgLy9jaGFuZ2VzIHRoZSBtYWluIGRpc3BsYXkgdG8gc2hvdyB0YXNrIGJ5IHNlbGVjdGVkIHByb2plY3RcbiAgICBmdW5jdGlvbiBfc3dpdGNoUHJvamVjdChwcm9qZWN0KXtcbiAgICAgICAgY3VycmVudEJveCA9IHByb2plY3Q7XG4gICAgICAgIF9jaGFuZ2VCb3hUaXRsZSgpO1xuICAgICAgICBfbG9hZENvbnRlbnQoY3VycmVudEJveCk7XG4gICAgICAgIF9sb2FkQXJjaGl2ZUNvbnRlbnQoY3VycmVudEJveCk7XG4gICAgICAgIF9zZXRVcEFkZFRhc2soKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gX2NoYW5nZUJveFRpdGxlKCl7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRCb3hFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnJlbnQtYm94Jyk7XG4gICAgICAgIGlmKGN1cnJlbnRCb3ggIT09ICdkZWZhdWx0JylcbiAgICAgICAge1xuICAgICAgICAgICAgY3VycmVudEJveEVsZW1lbnQudGV4dENvbnRlbnQgPSBjdXJyZW50Qm94O1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGN1cnJlbnRCb3hFbGVtZW50LnRleHRDb250ZW50ID0gJ0luYm94JztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgZnVuY3Rpb24gX3NldFVwU3dpdGNoQnV0dG9ucygpe1xuICAgICAgICBjb25zdCBpbmJveEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5ib3gnKTtcbiAgICAgICAgY29uc3QgdG9kYXlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RvZGF5Jyk7XG4gICAgICAgIGNvbnN0IHVwY29taW5nRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN1cGNvbWluZycpO1xuXG4gICAgICAgIGluYm94RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9zd2l0Y2hUb0luYm94KTtcbiAgICAgICAgdG9kYXlFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgLy8gY3VycmVudEJveCA9ICdUb2RheSc7XG4gICAgICAgICAgICAvLyBfY2hhbmdlQm94VGl0bGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHVwY29taW5nRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIC8vIGN1cnJlbnRCb3ggPSAnVXBjb21pbmcnO1xuICAgICAgICAgICAgLy8gX2NoYW5nZUJveFRpdGxlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBfc3dpdGNoVG9JbmJveCgpe1xuICAgICAgICBjdXJyZW50Qm94ID0gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgX2xvYWRDb250ZW50KGN1cnJlbnRCb3gpO1xuICAgICAgICAgICAgX2xvYWRBcmNoaXZlQ29udGVudChjdXJyZW50Qm94KTtcbiAgICAgICAgICAgIF9jaGFuZ2VCb3hUaXRsZSgpO1xuICAgICAgICAgICAgX3NldFVwQWRkVGFzaygpO1xuICAgIH1cbiAgICByZXR1cm4ge2luaXRpYWxpc2V9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5Q29udHJvbGxlcjsiLCJpbXBvcnQgdGFza0ZhY3RvcnkgZnJvbSBcIi4vdGFza0ZhY3RvcnlcIjtcblxuY29uc3QgdGFza0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKXtcbiAgICBjb25zdCBhbGxUYXNrcz0gW107XG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBbJ0Nob3JlcycsJ0hvbWV3b3JrJ107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3Qpe1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gdGFza0ZhY3RvcnkodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCk7XG4gICAgICAgIGFsbFRhc2tzLnB1c2gobmV3VGFzayk7XG4gICAgICAgIHJldHVybiBuZXdUYXNrO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHRhc2tJRCl7XG4gICAgICAgIGZvcihsZXQgaT0wO2k8YWxsVGFza3MubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZihhbGxUYXNrc1tpXS5nZXRUYXNrSUQoKSA9PT0gdGFza0lEKXtcbiAgICAgICAgICAgICAgICBhbGxUYXNrcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZWRpdFRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgdGFza0lEKXtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGFsbFRhc2tzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKGFsbFRhc2tzW2ldLnRhc2tJRCA9PT0gdGFza0lEKXtcbiAgICAgICAgICAgICAgICBhbGxUYXNrc1tpXS5zZXRUaXRsZSh0aXRsZSk7XG4gICAgICAgICAgICAgICAgYWxsVGFza3NbaV0uc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgICAgIGFsbFRhc2tzW2ldLnNldER1ZURhdGUoZHVlRGF0ZSk7XG4gICAgICAgICAgICAgICAgYWxsVGFza3NbaV0uc2V0UHJpb3JpdHkocHJpb3JpdHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFRhc2tzQnlQcm9qZWN0KHByb2plY3Qpe1xuICAgICAgICBpZihwcm9qZWN0ID09PSAnZGVmYXVsdCcpe1xuICAgICAgICAgICAgcmV0dXJuIGFsbFRhc2tzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRhc2tzQnlQcm9qZWN0ID0gYWxsVGFza3MuZmlsdGVyKHRhc2sgPT4gXG4gICAgICAgICAgICB0YXNrLmdldFByb2plY3QoKSA9PT0gcHJvamVjdFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gdGFza3NCeVByb2plY3Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrUHJvamVjdER1cGxpY2F0ZShwcm9qZWN0TmFtZSl7XG4gICAgICAgIGlmKGFsbFByb2plY3RzLmluY2x1ZGVzKHByb2plY3ROYW1lKSl7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gXG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpe1xuICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHByb2plY3ROYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvamVjdChwcm9qZWN0TmFtZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGFsbFRhc2tzLmZvckVhY2godGFzayA9PiBjb25zb2xlLmxvZyh0YXNrLmdldFRpdGxlKCksIHRhc2suZ2V0UHJvamVjdCgpKSkpO1xuICAgICAgICBmb3IobGV0IGkgPSBhbGxQcm9qZWN0cy5sZW5ndGg7IGkgPiAwICA7aS0tKXtcbiAgICAgICAgICAgIGlmKGFsbFByb2plY3RzW2ldID09PSBwcm9qZWN0TmFtZSl7XG4gICAgICAgICAgICAgICAgYWxsUHJvamVjdHMuc3BsaWNlKGksMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCB4ID0gYWxsVGFza3MubGVuZ3RoIC0gMTsgeCA+PTAgO3gtLSl7XG4gICAgICAgICAgICBpZihhbGxUYXNrc1t4XS5nZXRQcm9qZWN0KCkgPT09IHByb2plY3ROYW1lKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCAke2FsbFRhc2tzW3hdLmdldFRpdGxlKCl9YCk7XG4gICAgICAgICAgICAgICAgYWxsVGFza3Muc3BsaWNlKHgsMSk7XG4gICAgICAgICAgICB9ZWxzZSBjb25zb2xlLmxvZyhgc2F2ZSAke2FsbFRhc2tzW3hdLmdldFRpdGxlKCl9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgcmV0dXJue2NyZWF0ZVRhc2ssIHJlbW92ZVRhc2ssZWRpdFRhc2ssIGFsbFRhc2tzLCBhbGxQcm9qZWN0cywgXG4gICAgICAgIGNyZWF0ZVByb2plY3QsIHJlbW92ZVByb2plY3QsIGdldFRhc2tzQnlQcm9qZWN0LCBjaGVja1Byb2plY3REdXBsaWNhdGV9O1xufSkoKVxuXG5leHBvcnQge3Rhc2tDb250cm9sbGVyfTsiLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuY29uc3QgdGFza0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCl7XG4gICAgbGV0IGlzQ29tcGxldGUgPSBmYWxzZTsgXG4gICAgY29uc3QgdGFza0lEID0gdXVpZHY0KCk7XG5cbiAgICBmdW5jdGlvbiBnZXRUYXNrSUQoKXtcbiAgICAgICAgcmV0dXJuIHRhc2tJRDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKXtcbiAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRUaXRsZShuZXdUaXRsZSl7XG4gICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pe1xuICAgICAgICBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREdWVEYXRlKCl7XG4gICAgICAgIHJldHVybiBkdWVEYXRlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXREdWVEYXRlKG5ld0R1ZURhdGUpe1xuICAgICAgICBkdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHkoKXtcbiAgICAgICAgcmV0dXJuIHByaW9yaXR5O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQcmlvcml0eShuZXdQcmlvcml0eSl7XG4gICAgICAgIHByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFByb2plY3QoKXtcbiAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFByb2plY3QobmV3UHJvamVjdCl7XG4gICAgICAgIHByb2plY3QgPSBuZXdQcm9qZWN0O1xuICAgIH1cblxuICAgIHJldHVybiB7dGl0bGUsIHRhc2tJRCwgaXNDb21wbGV0ZSwgcHJvamVjdCxnZXRUaXRsZSxzZXRUaXRsZSxnZXREZXNjcmlwdGlvbixzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldER1ZURhdGUsc2V0RHVlRGF0ZSxnZXRQcmlvcml0eSxzZXRQcmlvcml0eSxnZXRQcm9qZWN0LHNldFByb2plY3QsZ2V0VGFza0lEfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFza0ZhY3RvcnkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZvcm1hdCwgY29tcGFyZUFzYyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7dGFza0NvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy90YXNrQ29udHJvbGxlcic7XG5pbXBvcnQgZGlzcGxheUNvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXknXG5cbi8vIGNvbnN0IHRvZGF5ID0gIGZvcm1hdChuZXcgRGF0ZSgyMDE0LCAxLCAxMSksICdNTS9kZC95eXl5Jyk7XG4vLyBjb25zb2xlLmxvZyh0b2RheSk7XG5cbnRhc2tDb250cm9sbGVyLmNyZWF0ZVRhc2soJ0dvIHRvIHRoZSBneW0nLCdMZWcgZGF5JywnTm8gZGF0ZScsJzEnLCdkZWZhdWx0Jyk7XG50YXNrQ29udHJvbGxlci5jcmVhdGVUYXNrKGBEb2N0b3IncyBhcHBvaW50bWVudGAsJzJwbSBAIEp1cm9uZyBXZXN0JywnMjAyMi0wNi0wOScsJzInLCdkZWZhdWx0Jyk7XG50YXNrQ29udHJvbGxlci5jcmVhdGVUYXNrKCdIb21ld29yaycsJ01hdGgnLCdObyBkYXRlJywnMCcsJ2RlZmF1bHQnKTtcbnRhc2tDb250cm9sbGVyLmNyZWF0ZVRhc2soJ1RpbVxcJ3MgYmlydGhkYXknLCdCdXkgaGltIGEgcHJlc2VudCcsJ05vIGRhdGUnLCczJywnZGVmYXVsdCcpO1xuY29uc29sZS5sb2codGFza0NvbnRyb2xsZXIuYWxsVGFza3MpXG5kaXNwbGF5Q29udHJvbGxlci5pbml0aWFsaXNlKCk7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9