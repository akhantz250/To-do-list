/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        const formElement = document.querySelector('#new-task')
        taskNameInput.addEventListener('input', (e) =>{
            if(taskNameInput.value.length !== 0){
                console.log(taskNameInput.value.length);
                addTaskBtn.removeAttribute('disabled');
            }else{
                addTaskBtn.setAttribute('disabled','');
                console.log('disabled')
            } 
        });

        const form = document.querySelector('#new-task')
        cancelBtn.addEventListener('click',() => setUpAddTask());
        addTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const title = form.elements['title'].value;
            const description = form.elements['description'].value;
            const dueDate = form.elements['due-date'].value;
            const priority = form.elements['priority'].value;
            console.log(title, description, dueDate, priority);
            _taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask(title, description, dueDate, priority, currentBox);
            _createNewTask(title, description, dueDate, priority);
            console.log(_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allTasks);
            setUpAddTask();
            form.reset();
        });
    }

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
            setUpTaskForm();
        })
         
    }

    function _createNewTask(title, description, dueDate, priority){
        const targetElement = document.querySelector('.task-target')

        const newTaskRow = document.createElement('div');
        const newCheckBox = document.createElement('div');
        const newInfoContainer = document.createElement('div');
        const newTitle = document.createElement('div');
        const newDescription = document.createElement('div');
        const newDueDate = document.createElement('div');
        const newEditIcon = document.createElement('span');

        newTaskRow.classList.add('task-row');
        newCheckBox.classList.add('task-check');
        newInfoContainer.classList.add('task-info');
        newTitle.classList.add('task-title');
        newDescription.classList.add('task-description');
        newDueDate.classList.add('task-due-date');
        newEditIcon.classList.add('material-symbols-outlined');
        newEditIcon.textContent = 'edit';

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
            newDueDate.textContent = 'No date';
        }else{
            newDueDate.textContent = dueDate;
        }
        targetElement.appendChild(newTaskRow);
        newTaskRow.appendChild(newCheckBox);
        newTaskRow.appendChild(newInfoContainer);
        newTaskRow.appendChild(newDueDate);
        newTaskRow.appendChild(newEditIcon);

        newInfoContainer.appendChild(newTitle);
        newInfoContainer.appendChild(newDescription);
    }
    
    return {setUpTaskForm,setUpAddTask}
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

    function createProject(projectName){
        if(_checkProjectDuplicate(projectName)){
            return;
        }
        allProjects.push(projectName)
    }

    function createTask(title, description, dueDate, priority, project){
        const newTask = (0,_taskFactory__WEBPACK_IMPORTED_MODULE_0__["default"])(title, description, dueDate, priority, project);
        allTasks.push(newTask);
    }
    function deleteTask(taskName){
        for(let i=0;i<allTasks.length;i++){
            if(allTasks[i].getTitle() === taskName){
                allTasks.splice(i,1);
                console.log('deleted');
                return;
            }
        }
        console.log('ended');
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

    function checkTaskDuplicate(taskName){
        if(allTasks.includes(projectName)){
            return false;
        }else return true;
    }


    return{createTask ,allTasks, getTasksByProject, checkProjectDuplicate, 
        checkTaskDuplicate,deleteTask};

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
const taskFactory = function (title, description, dueDate, priority, project){ 
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

    return {title, getTitle,setTitle,getDescription,setDescription,
            getDueDate,setDueDate,getPriority,setPriority,getProject,setProject};
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

_modules_display__WEBPACK_IMPORTED_MODULE_1__["default"].setUpAddTask();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksc0VBQXlCO0FBQ3JDO0FBQ0Esd0JBQXdCLG9FQUF1QjtBQUMvQztBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQzs7QUFFRCxpRUFBZSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7OztBQ2xJUTs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3Qix3REFBVztBQUNuQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7QUFHQSxXQUFXO0FBQ1g7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7O1VDcENmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ1U7QUFDUDs7QUFFakQ7QUFDQTs7QUFFQSxxRUFBOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0YXNrQ29udHJvbGxlcn0gZnJvbSAnLi90YXNrQ29udHJvbGxlcic7XG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9IChmdW5jdGlvbigpe1xuICAgIGNvbnN0IGluaXRpYWxCb3ggPSAnZGVmYXVsdCc7XG4gICAgbGV0IGN1cnJlbnRCb3ggPSBpbml0aWFsQm94O1xuICAgIFxuICAgIGZ1bmN0aW9uIHNldFVwVGFza0Zvcm0oKXtcbiAgICAgICAgY29uc3QgZm9ybUNvbnRhaW5lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybS1jb250YWluZXInKTtcbiAgICAgICAgZm9ybUNvbnRhaW5lckVsZW1lbnQuaW5uZXJIVE1MID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1mb3JtXCI+XG4gICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJuZXctdGFza1wiIGFjdGlvbj1cIiNcIiBtZXRob2Q9XCJwb3N0XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidGl0bGVcIiBuYW1lPVwidGl0bGVcIiBwbGFjZWhvbGRlcj1cIlRhc2sgbmFtZVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1yb3dcIj48dGV4dGFyZWEgbmFtZT1cImRlc2NyaXB0aW9uXCIgaWQ9XCJkZXNjcmlwdGlvblwiIHBsYWNlaG9sZGVyPVwiRGVzY3JpcHRpb25cIiByb3dzPVwiNVwiPjwvdGV4dGFyZWE+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiIGlkPVwiZmluYWwtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZHVlLWRhdGVcIj5EdWUgRGF0ZTogPGlucHV0IHR5cGU9XCJkYXRlXCIgbmFtZT1cImR1ZS1kYXRlXCIgaWQ9XCJkdWUtZGF0ZVwiPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicHJpb3JpdHlcIj5Qcmlvcml0eTogXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBuYW1lPVwicHJpb3JpdHlcIiBpZD1cInByaW9yaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIwXCIgc2VsZWN0ZWQ+IC0gPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCI+TG93PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIyXCI+TWVkaXVtPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzXCI+SGlnaDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tY29udGFpbmVyXCI+PGJ1dHRvbiBpZD1cImNhbmNlbFwiIHR5cGU9XCJidXR0b25cIj5DYW5jZWw8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwiY3JlYXRlLXRhc2tcIiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ+QWRkIHRhc2s8L2J1dHRvbj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICAgICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcmVhdGUtdGFzaycpO1xuICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2FuY2VsJyk7XG4gICAgICAgIGNvbnN0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGl0bGUnKTtcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2snKVxuICAgICAgICB0YXNrTmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+e1xuICAgICAgICAgICAgaWYodGFza05hbWVJbnB1dC52YWx1ZS5sZW5ndGggIT09IDApe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tOYW1lSW5wdXQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBhZGRUYXNrQnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGFkZFRhc2tCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXNhYmxlZCcpXG4gICAgICAgICAgICB9IFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrJylcbiAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiBzZXRVcEFkZFRhc2soKSk7XG4gICAgICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGZvcm0uZWxlbWVudHNbJ3RpdGxlJ10udmFsdWU7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGZvcm0uZWxlbWVudHNbJ2Rlc2NyaXB0aW9uJ10udmFsdWU7XG4gICAgICAgICAgICBjb25zdCBkdWVEYXRlID0gZm9ybS5lbGVtZW50c1snZHVlLWRhdGUnXS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZm9ybS5lbGVtZW50c1sncHJpb3JpdHknXS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgdGFza0NvbnRyb2xsZXIuY3JlYXRlVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjdXJyZW50Qm94KTtcbiAgICAgICAgICAgIF9jcmVhdGVOZXdUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2codGFza0NvbnRyb2xsZXIuYWxsVGFza3MpO1xuICAgICAgICAgICAgc2V0VXBBZGRUYXNrKCk7XG4gICAgICAgICAgICBmb3JtLnJlc2V0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFVwQWRkVGFzaygpe1xuICAgICAgICBjb25zdCBmb3JtQ29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3JtLWNvbnRhaW5lcicpO1xuICAgICAgICBmb3JtQ29udGFpbmVyRWxlbWVudC5pbm5lckhUTUwgPWBcbiAgICAgICAgPGRpdiBpZD1cImFkZC10YXNrXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGhlaWdodD1cIjI0XCIgd2lkdGg9XCIyNFwiPjxwYXRoIGQ9XCJNMTEgMTlWMTNINVYxMUgxMVY1SDEzVjExSDE5VjEzSDEzVjE5WlwiLz48L3N2Zz5cbiAgICAgICAgICAgICAgICAgICAgPHA+QWRkIHRhc2s8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWRkLXRhc2snKTtcbiAgICAgICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHNldFVwVGFza0Zvcm0oKTtcbiAgICAgICAgfSlcbiAgICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVOZXdUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpe1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stdGFyZ2V0JylcblxuICAgICAgICBjb25zdCBuZXdUYXNrUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IG5ld0NoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IG5ld0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBuZXdFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICBuZXdUYXNrUm93LmNsYXNzTGlzdC5hZGQoJ3Rhc2stcm93Jyk7XG4gICAgICAgIG5ld0NoZWNrQm94LmNsYXNzTGlzdC5hZGQoJ3Rhc2stY2hlY2snKTtcbiAgICAgICAgbmV3SW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWluZm8nKTtcbiAgICAgICAgbmV3VGl0bGUuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xuICAgICAgICBuZXdEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlc2NyaXB0aW9uJyk7XG4gICAgICAgIG5ld0R1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICAgICAgICBuZXdFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XG4gICAgICAgIG5ld0VkaXRJY29uLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuXG4gICAgICAgIHN3aXRjaChwcmlvcml0eSkge1xuICAgICAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCdwMCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCdwMScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCdwMicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCdwMycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICBuZXdUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBuZXdEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuXG4gICAgICAgIGlmKGR1ZURhdGUgPT09ICcnKXtcbiAgICAgICAgICAgIG5ld0R1ZURhdGUudGV4dENvbnRlbnQgPSAnTm8gZGF0ZSc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbmV3RHVlRGF0ZS50ZXh0Q29udGVudCA9IGR1ZURhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrUm93KTtcbiAgICAgICAgbmV3VGFza1Jvdy5hcHBlbmRDaGlsZChuZXdDaGVja0JveCk7XG4gICAgICAgIG5ld1Rhc2tSb3cuYXBwZW5kQ2hpbGQobmV3SW5mb0NvbnRhaW5lcik7XG4gICAgICAgIG5ld1Rhc2tSb3cuYXBwZW5kQ2hpbGQobmV3RHVlRGF0ZSk7XG4gICAgICAgIG5ld1Rhc2tSb3cuYXBwZW5kQ2hpbGQobmV3RWRpdEljb24pO1xuXG4gICAgICAgIG5ld0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobmV3VGl0bGUpO1xuICAgICAgICBuZXdJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0Rlc2NyaXB0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtzZXRVcFRhc2tGb3JtLHNldFVwQWRkVGFza31cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlDb250cm9sbGVyOyIsImltcG9ydCB0YXNrRmFjdG9yeSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xuXG5jb25zdCB0YXNrQ29udHJvbGxlciA9IChmdW5jdGlvbigpe1xuICAgIGNvbnN0IGFsbFRhc2tzPSBbXTtcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSl7XG4gICAgICAgIGlmKF9jaGVja1Byb2plY3REdXBsaWNhdGUocHJvamVjdE5hbWUpKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHByb2plY3ROYW1lKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCl7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSB0YXNrRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgYWxsVGFza3MucHVzaChuZXdUYXNrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGVsZXRlVGFzayh0YXNrTmFtZSl7XG4gICAgICAgIGZvcihsZXQgaT0wO2k8YWxsVGFza3MubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZihhbGxUYXNrc1tpXS5nZXRUaXRsZSgpID09PSB0YXNrTmFtZSl7XG4gICAgICAgICAgICAgICAgYWxsVGFza3Muc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ2VuZGVkJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFRhc2tzQnlQcm9qZWN0KHByb2plY3Qpe1xuICAgICAgICBjb25zdCB0YXNrc0J5UHJvamVjdCA9IGFsbFRhc2tzLmZpbHRlcih0YXNrID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0YXNrLmdldFByb2plY3QoKSA9PT0gcHJvamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXNrc0J5UHJvamVjdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Byb2plY3REdXBsaWNhdGUocHJvamVjdE5hbWUpe1xuICAgICAgICBpZihhbGxQcm9qZWN0cy5pbmNsdWRlcyhwcm9qZWN0TmFtZSkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9ZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Rhc2tEdXBsaWNhdGUodGFza05hbWUpe1xuICAgICAgICBpZihhbGxUYXNrcy5pbmNsdWRlcyhwcm9qZWN0TmFtZSkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9ZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIHJldHVybntjcmVhdGVUYXNrICxhbGxUYXNrcywgZ2V0VGFza3NCeVByb2plY3QsIGNoZWNrUHJvamVjdER1cGxpY2F0ZSwgXG4gICAgICAgIGNoZWNrVGFza0R1cGxpY2F0ZSxkZWxldGVUYXNrfTtcblxufSkoKVxuXG5leHBvcnQge3Rhc2tDb250cm9sbGVyfTsiLCJjb25zdCB0YXNrRmFjdG9yeSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KXsgXG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKXtcbiAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRUaXRsZShuZXdUaXRsZSl7XG4gICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pe1xuICAgICAgICBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREdWVEYXRlKCl7XG4gICAgICAgIHJldHVybiBkdWVEYXRlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXREdWVEYXRlKG5ld0R1ZURhdGUpe1xuICAgICAgICBkdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHkoKXtcbiAgICAgICAgcmV0dXJuIHByaW9yaXR5O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQcmlvcml0eShuZXdQcmlvcml0eSl7XG4gICAgICAgIHByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFByb2plY3QoKXtcbiAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFByb2plY3QobmV3UHJvamVjdCl7XG4gICAgICAgIHByb2plY3QgPSBuZXdQcm9qZWN0O1xuICAgIH1cblxuICAgIHJldHVybiB7dGl0bGUsIGdldFRpdGxlLHNldFRpdGxlLGdldERlc2NyaXB0aW9uLHNldERlc2NyaXB0aW9uLFxuICAgICAgICAgICAgZ2V0RHVlRGF0ZSxzZXREdWVEYXRlLGdldFByaW9yaXR5LHNldFByaW9yaXR5LGdldFByb2plY3Qsc2V0UHJvamVjdH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRhc2tGYWN0b3J5IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBmb3JtYXQsIGNvbXBhcmVBc2MgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge3Rhc2tDb250cm9sbGVyfSBmcm9tICcuL21vZHVsZXMvdGFza0NvbnRyb2xsZXInO1xuaW1wb3J0IGRpc3BsYXlDb250cm9sbGVyIGZyb20gJy4vbW9kdWxlcy9kaXNwbGF5J1xuXG4vLyBjb25zdCB0b2RheSA9ICBmb3JtYXQobmV3IERhdGUoMjAxNCwgMSwgMTEpLCAnTU0vZGQveXl5eScpO1xuLy8gY29uc29sZS5sb2codG9kYXkpO1xuXG5kaXNwbGF5Q29udHJvbGxlci5zZXRVcEFkZFRhc2soKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==