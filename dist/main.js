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
        loadContent();
        loadArchiveContent();
        setUpAddTask();
    }
    function loadContent(){
        const targetElement = document.querySelector('.task-target');
        targetElement.innerHTML = '';
        const allTasks = _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allTasks;
        allTasks.forEach(task =>{
            if(!task.isComplete){
                _createNewTask(task.getTitle(),task.getDescription(),task.getDueDate(),task.getPriority(),task);
            }
        });
    }
    function loadArchiveContent(){
        if(_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allTasks.some((task => task.isComplete))){
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
        const allTasks = _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allTasks;
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
            const task = _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask(title, description, dueDate, priority, currentBox);
            _createNewTask(title, description, dueDate, priority, task);
            console.log(_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allTasks);
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
                _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.removeTask(task.taskID);
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
            _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.editTask(titleInput.value, descriptionInput.value, dueDateInput.value,priorityInput.value, task.taskID);
            form.reset();
            loadContent();
        });
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
    const allProjects = [];

    function createTask(title, description, dueDate, priority, project){
        const newTask = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(title, description, dueDate, priority, project);
        allTasks.push(newTask);
        return newTask;
    }
    function removeTask(taskID){
        for(let i=0;i<allTasks.length;i++){
            if(allTasks[i].getTaskID() === taskID){
                allTasks.splice(i,1);
                console.log('deleted');
                return;
            }
        }
        console.log('ended');
    }
    function editTask(title, description, dueDate, priority, taskID){
        for(let i = 0; i < allTasks.length; i++){
            if(allTasks[i].taskID === taskID){
                allTasks[i].setTitle(title);
                allTasks[i].setDescription(description);
                allTasks[i].setDueDate(dueDate);
                allTasks[i].setPriority(priority);
                console.log(`${allTasks[i].taskID} was edited`);
                allTasks.forEach(task => console.log(task.getTitle()));
            }
        }
    }
    function getTasksByProject(project){
        const tasksByProject = allTasks.filter(task => {
            return task.getProject() === project;
        });
        return tasksByProject;
    }
    function checkProjectDuplicate(projectName){
        if(allProjects.includes(projectName)){
            return false;
        }else return true;
    }
    
    return{createTask ,allTasks, getTasksByProject, checkProjectDuplicate, 
        removeTask,editTask};
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

_modules_display__WEBPACK_IMPORTED_MODULE_1__["default"].initialise();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ1U7QUFDUDs7QUFFakQ7QUFDQTs7QUFFQSxtRUFBNEIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9yZWdleC5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvcm5nLmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3Y0LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgL14oPzpbMC05YS1mXXs4fS1bMC05YS1mXXs0fS1bMS01XVswLTlhLWZdezN9LVs4OWFiXVswLTlhLWZdezN9LVswLTlhLWZdezEyfXwwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDApJC9pOyIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJpbXBvcnQgdmFsaWRhdGUgZnJvbSAnLi92YWxpZGF0ZS5qcyc7XG4vKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cblxudmFyIGJ5dGVUb0hleCA9IFtdO1xuXG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleC5wdXNoKChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSkpO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkoYXJyKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDA7XG4gIC8vIE5vdGU6IEJlIGNhcmVmdWwgZWRpdGluZyB0aGlzIGNvZGUhICBJdCdzIGJlZW4gdHVuZWQgZm9yIHBlcmZvcm1hbmNlXG4gIC8vIGFuZCB3b3JrcyBpbiB3YXlzIHlvdSBtYXkgbm90IGV4cGVjdC4gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS91dWlkanMvdXVpZC9wdWxsLzQzNFxuICB2YXIgdXVpZCA9IChieXRlVG9IZXhbYXJyW29mZnNldCArIDBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMV1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDNdXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA1XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDZdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgN11dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA4XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDldXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTBdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTJdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTNdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMTVdXSkudG9Mb3dlckNhc2UoKTsgLy8gQ29uc2lzdGVuY3kgY2hlY2sgZm9yIHZhbGlkIFVVSUQuICBJZiB0aGlzIHRocm93cywgaXQncyBsaWtlbHkgZHVlIHRvIG9uZVxuICAvLyBvZiB0aGUgZm9sbG93aW5nOlxuICAvLyAtIE9uZSBvciBtb3JlIGlucHV0IGFycmF5IHZhbHVlcyBkb24ndCBtYXAgdG8gYSBoZXggb2N0ZXQgKGxlYWRpbmcgdG9cbiAgLy8gXCJ1bmRlZmluZWRcIiBpbiB0aGUgdXVpZClcbiAgLy8gLSBJbnZhbGlkIGlucHV0IHZhbHVlcyBmb3IgdGhlIFJGQyBgdmVyc2lvbmAgb3IgYHZhcmlhbnRgIGZpZWxkc1xuXG4gIGlmICghdmFsaWRhdGUodXVpZCkpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1N0cmluZ2lmaWVkIFVVSUQgaXMgaW52YWxpZCcpO1xuICB9XG5cbiAgcmV0dXJuIHV1aWQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeTsiLCJpbXBvcnQgcm5nIGZyb20gJy4vcm5nLmpzJztcbmltcG9ydCBzdHJpbmdpZnkgZnJvbSAnLi9zdHJpbmdpZnkuanMnO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpOyAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG5cbiAgcm5kc1s2XSA9IHJuZHNbNl0gJiAweDBmIHwgMHg0MDtcbiAgcm5kc1s4XSA9IHJuZHNbOF0gJiAweDNmIHwgMHg4MDsgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG5cbiAgaWYgKGJ1Zikge1xuICAgIG9mZnNldCA9IG9mZnNldCB8fCAwO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgICBidWZbb2Zmc2V0ICsgaV0gPSBybmRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBidWY7XG4gIH1cblxuICByZXR1cm4gc3RyaW5naWZ5KHJuZHMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2NDsiLCJpbXBvcnQgUkVHRVggZnJvbSAnLi9yZWdleC5qcyc7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKHV1aWQpIHtcbiAgcmV0dXJuIHR5cGVvZiB1dWlkID09PSAnc3RyaW5nJyAmJiBSRUdFWC50ZXN0KHV1aWQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB2YWxpZGF0ZTsiLCJpbXBvcnQge3Rhc2tDb250cm9sbGVyfSBmcm9tICcuL3Rhc2tDb250cm9sbGVyJztcbmNvbnN0IGRpc3BsYXlDb250cm9sbGVyID0gKGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgaW5pdGlhbEJveCA9ICdkZWZhdWx0JztcbiAgICBsZXQgY3VycmVudEJveCA9IGluaXRpYWxCb3g7XG5cbiAgICBmdW5jdGlvbiBpbml0aWFsaXNlKCl7XG4gICAgICAgIGxvYWRDb250ZW50KCk7XG4gICAgICAgIGxvYWRBcmNoaXZlQ29udGVudCgpO1xuICAgICAgICBzZXRVcEFkZFRhc2soKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbG9hZENvbnRlbnQoKXtcbiAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXRhcmdldCcpO1xuICAgICAgICB0YXJnZXRFbGVtZW50LmlubmVySFRNTCA9ICcnO1xuICAgICAgICBjb25zdCBhbGxUYXNrcyA9IHRhc2tDb250cm9sbGVyLmFsbFRhc2tzO1xuICAgICAgICBhbGxUYXNrcy5mb3JFYWNoKHRhc2sgPT57XG4gICAgICAgICAgICBpZighdGFzay5pc0NvbXBsZXRlKXtcbiAgICAgICAgICAgICAgICBfY3JlYXRlTmV3VGFzayh0YXNrLmdldFRpdGxlKCksdGFzay5nZXREZXNjcmlwdGlvbigpLHRhc2suZ2V0RHVlRGF0ZSgpLHRhc2suZ2V0UHJpb3JpdHkoKSx0YXNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxvYWRBcmNoaXZlQ29udGVudCgpe1xuICAgICAgICBpZih0YXNrQ29udHJvbGxlci5hbGxUYXNrcy5zb21lKCh0YXNrID0+IHRhc2suaXNDb21wbGV0ZSkpKXtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFyY2hpdmUtdGl0bGUtdGFyZ2V0Jyk7XG4gICAgICAgICAgICB0aXRsZVRhcmdldC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJjaGl2ZS10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8aDM+QXJjaGl2ZTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZFwiPmtleWJvYXJkX2Fycm93X2Rvd248L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFyY2hpdmUtdGl0bGUtdGFyZ2V0Jyk7XG4gICAgICAgICAgICB0aXRsZVRhcmdldC5pbm5lckhUTUwgPSBgYDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFyY2hpdmUtdGFyZ2V0Jyk7XG4gICAgICAgIHRhcmdldEVsZW1lbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGNvbnN0IGFsbFRhc2tzID0gdGFza0NvbnRyb2xsZXIuYWxsVGFza3M7XG4gICAgICAgIGFsbFRhc2tzLmZvckVhY2godGFzayA9PntcbiAgICAgICAgICAgIGlmKHRhc2suaXNDb21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgX2NyZWF0ZU5ld1Rhc2sodGFzay5nZXRUaXRsZSgpLHRhc2suZ2V0RGVzY3JpcHRpb24oKSx0YXNrLmdldER1ZURhdGUoKSx0YXNrLmdldFByaW9yaXR5KCksdGFzayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL2NyZWF0ZXMgdGhlIGNyZWF0ZSB0YXNrIGZvcm0gd2hlbiBhZGQgdGFzayBpcyBjbGlja2VkXG4gICAgZnVuY3Rpb24gc2V0VXBUYXNrRm9ybSgpe1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLWNvbnRhaW5lcicpO1xuICAgICAgICBmb3JtQ29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0YXNrLWZvcm1cIj5cbiAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cIm5ldy10YXNrXCIgYWN0aW9uPVwiI1wiIG1ldGhvZD1cInBvc3RcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0aXRsZVwiIG5hbWU9XCJ0aXRsZVwiIHBsYWNlaG9sZGVyPVwiVGFzayBuYW1lXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPjx0ZXh0YXJlYSBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiIHJvd3M9XCI1XCI+PC90ZXh0YXJlYT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCIgaWQ9XCJmaW5hbC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiPkR1ZSBEYXRlOiA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIiBpZD1cImR1ZS1kYXRlXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcmlvcml0eVwiPlByaW9yaXR5OiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJwcmlvcml0eVwiIGlkPVwicHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIiBzZWxlY3RlZD4gLSA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjFcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjNcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1jb250YWluZXJcIj48YnV0dG9uIGlkPVwiY2FuY2VsXCIgdHlwZT1cImJ1dHRvblwiPkNhbmNlbDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gaWQ9XCJjcmVhdGUtdGFza1wiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD5BZGQgdGFzazwvYnV0dG9uPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgICAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NyZWF0ZS10YXNrJyk7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjYW5jZWwnKTtcbiAgICAgICAgY29uc3QgdGFza05hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrJylcbiAgICAgICAgdGFza05hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PntcbiAgICAgICAgICAgIGlmKHRhc2tOYW1lSW5wdXQudmFsdWUubGVuZ3RoICE9PSAwKXtcbiAgICAgICAgICAgICAgICBhZGRUYXNrQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGFkZFRhc2tCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfSk7XG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4gc2V0VXBBZGRUYXNrKCkpO1xuICAgICAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBmb3JtLmVsZW1lbnRzWyd0aXRsZSddLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBmb3JtLmVsZW1lbnRzWydkZXNjcmlwdGlvbiddLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGZvcm0uZWxlbWVudHNbJ2R1ZS1kYXRlJ10udmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGZvcm0uZWxlbWVudHNbJ3ByaW9yaXR5J10udmFsdWU7XG4gICAgICAgICAgICBjb25zdCB0YXNrID0gdGFza0NvbnRyb2xsZXIuY3JlYXRlVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjdXJyZW50Qm94KTtcbiAgICAgICAgICAgIF9jcmVhdGVOZXdUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHRhc2spO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza0NvbnRyb2xsZXIuYWxsVGFza3MpO1xuICAgICAgICAgICAgc2V0VXBBZGRUYXNrKCk7XG4gICAgICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvL2hpZGVzIHRoZSBjcmVhdGUgdGFzayBmb3JtIGFuZCBjcmVhdGVzIHRoZSBhZGQgdGFzayBidXR0b24gYmFja1xuICAgIGZ1bmN0aW9uIHNldFVwQWRkVGFzaygpe1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLWNvbnRhaW5lcicpO1xuICAgICAgICBmb3JtQ29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPWBcbiAgICAgICAgPGRpdiBpZD1cImFkZC10YXNrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjI0XCIgd2lkdGg9XCIyNFwiPjxwYXRoIGQ9XCJNMTEgMTlWMTNINVYxMUgxMVY1SDEzVjExSDE5VjEzSDEzVjE5WlwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPHA+QWRkIHRhc2s8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICAgICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGxvYWRDb250ZW50KCk7XG4gICAgICAgICAgICBzZXRVcFRhc2tGb3JtKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vY3JlYXRlcyBhIG5ldyB0YXNrIHJvd1xuICAgIGZ1bmN0aW9uIF9jcmVhdGVOZXdUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHRhc2spe1xuICAgICAgICBsZXQgdGFyZ2V0RWxlbWVudDtcbiAgICAgICAgaWYoIXRhc2suaXNDb21wbGV0ZSl7XG4gICAgICAgICAgICB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stdGFyZ2V0Jyk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcmNoaXZlLXRhcmdldCcpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5ld1Rhc2tSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3Q2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3SW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBuZXdUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBuZXdEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBuZXdEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IG5ld0ljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG5cbiAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCd0YXNrLXJvdycpO1xuICAgICAgICBuZXdDaGVja0JveC5jbGFzc0xpc3QuYWRkKCd0YXNrLWNoZWNrJyk7XG4gICAgICAgIG5ld0luZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1pbmZvJyk7XG4gICAgICAgIG5ld1RpdGxlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stdGl0bGUnKTtcbiAgICAgICAgbmV3RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgndGFzay1kZXNjcmlwdGlvbicpO1xuICAgICAgICBuZXdEdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZHVlLWRhdGUnKTtcbiAgICAgICAgbmV3SWNvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XG4gICAgICAgIG5ld0ljb24udGV4dENvbnRlbnQgPSB0YXNrLmlzQ29tcGxldGU/ICdkZWxldGUnOidlZGl0JztcbiAgICAgICAgaWYodGFzay5pc0NvbXBsZXRlKXtcbiAgICAgICAgICAgIG5ld1Rhc2tSb3cuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2gocHJpb3JpdHkpIHtcbiAgICAgICAgICAgIGNhc2UgJzAnOlxuICAgICAgICAgICAgICAgIG5ld1Rhc2tSb3cuY2xhc3NMaXN0LmFkZCgncDAnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgIG5ld1Rhc2tSb3cuY2xhc3NMaXN0LmFkZCgncDEnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzInOlxuICAgICAgICAgICAgICAgIG5ld1Rhc2tSb3cuY2xhc3NMaXN0LmFkZCgncDInKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgIG5ld1Rhc2tSb3cuY2xhc3NMaXN0LmFkZCgncDMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIG5ld1RpdGxlLnRleHRDb250ZW50ID0gdGl0bGU7XG4gICAgICAgIG5ld0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gZGVzY3JpcHRpb247XG4gICAgICAgIG5ld0R1ZURhdGUudGV4dENvbnRlbnQgPSBkdWVEYXRlID09PSAnJz8gJ05vIGRhdGUnOiBkdWVEYXRlO1xuXG4gICAgICAgIC8vZWRpdCBhbmQgY29tcGxldGUgdGFzayBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgaWYoIXRhc2suaXNDb21wbGV0ZSl7XG4gICAgICAgICAgICBuZXdJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgICAgICAgICAgICAgc2V0VXBBZGRUYXNrKCk7XG4gICAgICAgICAgICAgICAgX3NldFVwRWRpdFRhc2tGb3JtKG5ld1Rhc2tSb3csdGFyZ2V0RWxlbWVudCwgdGFzayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBuZXdJY29uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgICAgICAgICAgICAgdGFza0NvbnRyb2xsZXIucmVtb3ZlVGFzayh0YXNrLnRhc2tJRCk7XG4gICAgICAgICAgICAgICAgbG9hZENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICBsb2FkQXJjaGl2ZUNvbnRlbnQoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbmV3Q2hlY2tCb3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PntcbiAgICAgICAgICAgIGlmKHRhc2suaXNDb21wbGV0ZSl7XG4gICAgICAgICAgICAgICAgdGFzay5pc0NvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0YXNrLmlzQ29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QudG9nZ2xlKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgbG9hZENvbnRlbnQoKTtcbiAgICAgICAgICAgIGxvYWRBcmNoaXZlQ29udGVudCgpO1xuICAgICAgICB9KVxuXG4gICAgICAgIHRhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQobmV3VGFza1Jvdyk7XG4gICAgICAgIG5ld1Rhc2tSb3cuYXBwZW5kQ2hpbGQobmV3Q2hlY2tCb3gpO1xuICAgICAgICBuZXdUYXNrUm93LmFwcGVuZENoaWxkKG5ld0luZm9Db250YWluZXIpO1xuICAgICAgICBuZXdUYXNrUm93LmFwcGVuZENoaWxkKG5ld0R1ZURhdGUpO1xuICAgICAgICBuZXdUYXNrUm93LmFwcGVuZENoaWxkKG5ld0ljb24pO1xuICAgICAgICBuZXdJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1RpdGxlKTtcbiAgICAgICAgbmV3SW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEZXNjcmlwdGlvbik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIF9zZXRVcEVkaXRUYXNrRm9ybSh0YXNrUm93LCB0YXJnZXRFbGVtZW50LCB0YXNrKXtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZm9ybUNvbnRhaW5lckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZWRpdC1mb3JtLWNvbnRhaW5lcicpO1xuICAgICAgICBmb3JtQ29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0LXRhc2stZm9ybVwiPlxuICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwiZWRpdC10YXNrXCIgYWN0aW9uPVwiI1wiIG1ldGhvZD1cInBvc3RcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ0aXRsZVwiIG5hbWU9XCJ0aXRsZVwiIHBsYWNlaG9sZGVyPVwiVGFzayBuYW1lXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPjx0ZXh0YXJlYSBuYW1lPVwiZGVzY3JpcHRpb25cIiBpZD1cImRlc2NyaXB0aW9uXCIgcGxhY2Vob2xkZXI9XCJEZXNjcmlwdGlvblwiIHJvd3M9XCI1XCI+PC90ZXh0YXJlYT48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tcm93XCIgaWQ9XCJmaW5hbC1yb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJkdWUtZGF0ZVwiPkR1ZSBEYXRlOiA8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiZHVlLWRhdGVcIiBpZD1cImR1ZS1kYXRlXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwcmlvcml0eVwiPlByaW9yaXR5OiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IG5hbWU9XCJwcmlvcml0eVwiIGlkPVwicHJpb3JpdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIiBzZWxlY3RlZD4gLSA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjFcIj5Mb3c8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJcIj5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjNcIj5IaWdoPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1jb250YWluZXJcIj48YnV0dG9uIGlkPVwiZWRpdC1jYW5jZWxcIiB0eXBlPVwiYnV0dG9uXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImVkaXQtdGFzay1idG5cIiB0eXBlPVwic3VibWl0XCI+RWRpdCB0YXNrPC9idXR0b24+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgICAgIHRhcmdldEVsZW1lbnQuaW5zZXJ0QmVmb3JlKGZvcm1Db250YWluZXJFbGVtZW50LHRhc2tSb3cpO1xuICAgICAgICB0YXJnZXRFbGVtZW50LnJlbW92ZUNoaWxkKHRhc2tSb3cpO1xuXG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZWRpdC10YXNrJylcblxuICAgICAgICBjb25zdCBlZGl0VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LXRhc2stYnRuJyk7XG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlZGl0LWNhbmNlbCcpO1xuICAgICAgICBjb25zdCB0YXNrTmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJyk7XG5cbiAgICAgICAgY29uc3QgdGl0bGVJbnB1dCA9IGZvcm0uZWxlbWVudHNbJ3RpdGxlJ107XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uSW5wdXQgPSBmb3JtLmVsZW1lbnRzWydkZXNjcmlwdGlvbiddO1xuICAgICAgICBjb25zdCBkdWVEYXRlSW5wdXQgPSBmb3JtLmVsZW1lbnRzWydkdWUtZGF0ZSddO1xuICAgICAgICBjb25zdCBwcmlvcml0eUlucHV0ID0gZm9ybS5lbGVtZW50c1sncHJpb3JpdHknXTtcblxuICAgICAgICB0aXRsZUlucHV0LnZhbHVlID0gdGFzay5nZXRUaXRsZSgpO1xuICAgICAgICBkZXNjcmlwdGlvbklucHV0LnZhbHVlID0gdGFzay5nZXREZXNjcmlwdGlvbigpO1xuICAgICAgICBkdWVEYXRlSW5wdXQudmFsdWUgPSB0YXNrLmdldER1ZURhdGUoKTtcbiAgICAgICAgcHJpb3JpdHlJbnB1dC52YWx1ZSA9IHRhc2suZ2V0UHJpb3JpdHkoKTtcblxuICAgICAgICB0YXNrTmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+e1xuICAgICAgICAgICAgaWYodGFza05hbWVJbnB1dC52YWx1ZS5sZW5ndGggIT09IDApe1xuICAgICAgICAgICAgICAgIGVkaXRUYXNrQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGVkaXRUYXNrQnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCcnKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4gbG9hZENvbnRlbnQoKSk7XG4gICAgICAgIGVkaXRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGFza0NvbnRyb2xsZXIuZWRpdFRhc2sodGl0bGVJbnB1dC52YWx1ZSwgZGVzY3JpcHRpb25JbnB1dC52YWx1ZSwgZHVlRGF0ZUlucHV0LnZhbHVlLHByaW9yaXR5SW5wdXQudmFsdWUsIHRhc2sudGFza0lEKTtcbiAgICAgICAgICAgIGZvcm0ucmVzZXQoKTtcbiAgICAgICAgICAgIGxvYWRDb250ZW50KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4ge2luaXRpYWxpc2V9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBkaXNwbGF5Q29udHJvbGxlcjsiLCJpbXBvcnQgdGFza0ZhY3RvcnkgZnJvbSBcIi4vdGFza0ZhY3RvcnlcIjtcblxuY29uc3QgdGFza0NvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKXtcbiAgICBjb25zdCBhbGxUYXNrcz0gW107XG4gICAgY29uc3QgYWxsUHJvamVjdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCl7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSB0YXNrRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgYWxsVGFza3MucHVzaChuZXdUYXNrKTtcbiAgICAgICAgcmV0dXJuIG5ld1Rhc2s7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbW92ZVRhc2sodGFza0lEKXtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxhbGxUYXNrcy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGlmKGFsbFRhc2tzW2ldLmdldFRhc2tJRCgpID09PSB0YXNrSUQpe1xuICAgICAgICAgICAgICAgIGFsbFRhc2tzLnNwbGljZShpLDEpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWxldGVkJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdlbmRlZCcpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlZGl0VGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCB0YXNrSUQpe1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgYWxsVGFza3MubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYoYWxsVGFza3NbaV0udGFza0lEID09PSB0YXNrSUQpe1xuICAgICAgICAgICAgICAgIGFsbFRhc2tzW2ldLnNldFRpdGxlKHRpdGxlKTtcbiAgICAgICAgICAgICAgICBhbGxUYXNrc1tpXS5zZXREZXNjcmlwdGlvbihkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAgICAgYWxsVGFza3NbaV0uc2V0RHVlRGF0ZShkdWVEYXRlKTtcbiAgICAgICAgICAgICAgICBhbGxUYXNrc1tpXS5zZXRQcmlvcml0eShwcmlvcml0eSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7YWxsVGFza3NbaV0udGFza0lEfSB3YXMgZWRpdGVkYCk7XG4gICAgICAgICAgICAgICAgYWxsVGFza3MuZm9yRWFjaCh0YXNrID0+IGNvbnNvbGUubG9nKHRhc2suZ2V0VGl0bGUoKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFRhc2tzQnlQcm9qZWN0KHByb2plY3Qpe1xuICAgICAgICBjb25zdCB0YXNrc0J5UHJvamVjdCA9IGFsbFRhc2tzLmZpbHRlcih0YXNrID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0YXNrLmdldFByb2plY3QoKSA9PT0gcHJvamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXNrc0J5UHJvamVjdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2hlY2tQcm9qZWN0RHVwbGljYXRlKHByb2plY3ROYW1lKXtcbiAgICAgICAgaWYoYWxsUHJvamVjdHMuaW5jbHVkZXMocHJvamVjdE5hbWUpKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfWVsc2UgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIHJldHVybntjcmVhdGVUYXNrICxhbGxUYXNrcywgZ2V0VGFza3NCeVByb2plY3QsIGNoZWNrUHJvamVjdER1cGxpY2F0ZSwgXG4gICAgICAgIHJlbW92ZVRhc2ssZWRpdFRhc2t9O1xufSkoKVxuXG5leHBvcnQge3Rhc2tDb250cm9sbGVyfTsiLCJpbXBvcnQgeyB2NCBhcyB1dWlkdjQgfSBmcm9tICd1dWlkJztcblxuY29uc3QgdGFza0ZhY3RvcnkgPSBmdW5jdGlvbiAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCl7XG4gICAgbGV0IGlzQ29tcGxldGUgPSBmYWxzZTsgXG4gICAgY29uc3QgdGFza0lEID0gdXVpZHY0KCk7XG5cbiAgICBmdW5jdGlvbiBnZXRUYXNrSUQoKXtcbiAgICAgICAgcmV0dXJuIHRhc2tJRDtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKXtcbiAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRUaXRsZShuZXdUaXRsZSl7XG4gICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pe1xuICAgICAgICBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREdWVEYXRlKCl7XG4gICAgICAgIHJldHVybiBkdWVEYXRlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXREdWVEYXRlKG5ld0R1ZURhdGUpe1xuICAgICAgICBkdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHkoKXtcbiAgICAgICAgcmV0dXJuIHByaW9yaXR5O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQcmlvcml0eShuZXdQcmlvcml0eSl7XG4gICAgICAgIHByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFByb2plY3QoKXtcbiAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFByb2plY3QobmV3UHJvamVjdCl7XG4gICAgICAgIHByb2plY3QgPSBuZXdQcm9qZWN0O1xuICAgIH1cblxuICAgIHJldHVybiB7dGl0bGUsIHRhc2tJRCwgaXNDb21wbGV0ZSwgcHJvamVjdCxnZXRUaXRsZSxzZXRUaXRsZSxnZXREZXNjcmlwdGlvbixzZXREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGdldER1ZURhdGUsc2V0RHVlRGF0ZSxnZXRQcmlvcml0eSxzZXRQcmlvcml0eSxnZXRQcm9qZWN0LHNldFByb2plY3QsZ2V0VGFza0lEfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFza0ZhY3RvcnkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZvcm1hdCwgY29tcGFyZUFzYyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7dGFza0NvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy90YXNrQ29udHJvbGxlcic7XG5pbXBvcnQgZGlzcGxheUNvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXknXG5cbi8vIGNvbnN0IHRvZGF5ID0gIGZvcm1hdChuZXcgRGF0ZSgyMDE0LCAxLCAxMSksICdNTS9kZC95eXl5Jyk7XG4vLyBjb25zb2xlLmxvZyh0b2RheSk7XG5cbmRpc3BsYXlDb250cm9sbGVyLmluaXRpYWxpc2UoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=