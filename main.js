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
        const addTaskBtn = document.querySelector('#create-task');
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

            form.reset();
        });
    }

    function hideTaskForm(){
         
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
    
    return {setUpTaskForm}
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

_modules_display__WEBPACK_IMPORTED_MODULE_1__["default"].setUpTaskForm();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNFQUF5QjtBQUNyQztBQUNBLHdCQUF3QixvRUFBdUI7O0FBRS9DO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQzs7QUFFRCxpRUFBZSxpQkFBaUI7Ozs7Ozs7Ozs7Ozs7OztBQ2xHUTs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3Qix3REFBVztBQUNuQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7QUFHQSxXQUFXO0FBQ1g7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7O1VDcENmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ1U7QUFDUDs7QUFFakQ7QUFDQTs7QUFFQSxzRUFBK0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC8uL3NyYy9tb2R1bGVzL3Rhc2tGYWN0b3J5LmpzIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG9saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHt0YXNrQ29udHJvbGxlcn0gZnJvbSAnLi90YXNrQ29udHJvbGxlcic7XG5jb25zdCBkaXNwbGF5Q29udHJvbGxlciA9IChmdW5jdGlvbigpe1xuXG4gICAgY29uc3QgaW5pdGlhbEJveCA9ICdkZWZhdWx0JztcbiAgICBsZXQgY3VycmVudEJveCA9IGluaXRpYWxCb3g7XG4gICAgXG5cbiAgICBmdW5jdGlvbiBzZXRVcFRhc2tGb3JtKCl7XG4gICAgICAgIGNvbnN0IGZvcm1Db250YWluZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm0tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3JlYXRlLXRhc2snKTtcbiAgICAgICAgY29uc3QgdGFza05hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpO1xuICAgICAgICBjb25zdCBmb3JtRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctdGFzaycpXG4gICAgICAgIHRhc2tOYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT57XG4gICAgICAgICAgICBpZih0YXNrTmFtZUlucHV0LnZhbHVlLmxlbmd0aCAhPT0gMCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGFza05hbWVJbnB1dC52YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGFkZFRhc2tCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYWRkVGFza0J0bi5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywnJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Rpc2FibGVkJylcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2snKVxuICAgICAgICBhZGRUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBmb3JtLmVsZW1lbnRzWyd0aXRsZSddLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBmb3JtLmVsZW1lbnRzWydkZXNjcmlwdGlvbiddLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGZvcm0uZWxlbWVudHNbJ2R1ZS1kYXRlJ10udmFsdWU7XG4gICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IGZvcm0uZWxlbWVudHNbJ3ByaW9yaXR5J10udmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIHRhc2tDb250cm9sbGVyLmNyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY3VycmVudEJveCk7XG4gICAgICAgICAgICBfY3JlYXRlTmV3VGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRhc2tDb250cm9sbGVyLmFsbFRhc2tzKTtcblxuICAgICAgICAgICAgZm9ybS5yZXNldCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoaWRlVGFza0Zvcm0oKXtcbiAgICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIF9jcmVhdGVOZXdUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpe1xuICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stdGFyZ2V0JylcblxuICAgICAgICBjb25zdCBuZXdUYXNrUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IG5ld0NoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IG5ld0luZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgbmV3RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBjb25zdCBuZXdFZGl0SWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcblxuICAgICAgICBuZXdUYXNrUm93LmNsYXNzTGlzdC5hZGQoJ3Rhc2stcm93Jyk7XG4gICAgICAgIG5ld0NoZWNrQm94LmNsYXNzTGlzdC5hZGQoJ3Rhc2stY2hlY2snKTtcbiAgICAgICAgbmV3SW5mb0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWluZm8nKTtcbiAgICAgICAgbmV3VGl0bGUuY2xhc3NMaXN0LmFkZCgndGFzay10aXRsZScpO1xuICAgICAgICBuZXdEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCd0YXNrLWRlc2NyaXB0aW9uJyk7XG4gICAgICAgIG5ld0R1ZURhdGUuY2xhc3NMaXN0LmFkZCgndGFzay1kdWUtZGF0ZScpO1xuICAgICAgICBuZXdFZGl0SWNvbi5jbGFzc0xpc3QuYWRkKCdtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkJyk7XG4gICAgICAgIG5ld0VkaXRJY29uLnRleHRDb250ZW50ID0gJ2VkaXQnO1xuXG4gICAgICAgIHN3aXRjaChwcmlvcml0eSkge1xuICAgICAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCdwMCcpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMSc6XG4gICAgICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCdwMScpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMic6XG4gICAgICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCdwMicpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnMyc6XG4gICAgICAgICAgICAgICAgbmV3VGFza1Jvdy5jbGFzc0xpc3QuYWRkKCdwMycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICBuZXdUaXRsZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgICBuZXdEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGRlc2NyaXB0aW9uO1xuXG4gICAgICAgIGlmKGR1ZURhdGUgPT09ICcnKXtcbiAgICAgICAgICAgIG5ld0R1ZURhdGUudGV4dENvbnRlbnQgPSAnTm8gZGF0ZSc7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgbmV3RHVlRGF0ZS50ZXh0Q29udGVudCA9IGR1ZURhdGU7XG4gICAgICAgIH1cbiAgICAgICAgdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChuZXdUYXNrUm93KTtcbiAgICAgICAgbmV3VGFza1Jvdy5hcHBlbmRDaGlsZChuZXdDaGVja0JveCk7XG4gICAgICAgIG5ld1Rhc2tSb3cuYXBwZW5kQ2hpbGQobmV3SW5mb0NvbnRhaW5lcik7XG4gICAgICAgIG5ld1Rhc2tSb3cuYXBwZW5kQ2hpbGQobmV3RHVlRGF0ZSk7XG4gICAgICAgIG5ld1Rhc2tSb3cuYXBwZW5kQ2hpbGQobmV3RWRpdEljb24pO1xuXG4gICAgICAgIG5ld0luZm9Db250YWluZXIuYXBwZW5kQ2hpbGQobmV3VGl0bGUpO1xuICAgICAgICBuZXdJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld0Rlc2NyaXB0aW9uKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHtzZXRVcFRhc2tGb3JtfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGlzcGxheUNvbnRyb2xsZXI7IiwiaW1wb3J0IHRhc2tGYWN0b3J5IGZyb20gXCIuL3Rhc2tGYWN0b3J5XCI7XG5cbmNvbnN0IHRhc2tDb250cm9sbGVyID0gKGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgYWxsVGFza3M9IFtdO1xuICAgIGNvbnN0IGFsbFByb2plY3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0KHByb2plY3ROYW1lKXtcbiAgICAgICAgaWYoX2NoZWNrUHJvamVjdER1cGxpY2F0ZShwcm9qZWN0TmFtZSkpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGFsbFByb2plY3RzLnB1c2gocHJvamVjdE5hbWUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KXtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHRhc2tGYWN0b3J5KHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpO1xuICAgICAgICBhbGxUYXNrcy5wdXNoKG5ld1Rhc2spO1xuICAgIH1cbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrKHRhc2tOYW1lKXtcbiAgICAgICAgZm9yKGxldCBpPTA7aTxhbGxUYXNrcy5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGlmKGFsbFRhc2tzW2ldLmdldFRpdGxlKCkgPT09IHRhc2tOYW1lKXtcbiAgICAgICAgICAgICAgICBhbGxUYXNrcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsZXRlZCcpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnZW5kZWQnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0VGFza3NCeVByb2plY3QocHJvamVjdCl7XG4gICAgICAgIGNvbnN0IHRhc2tzQnlQcm9qZWN0ID0gYWxsVGFza3MuZmlsdGVyKHRhc2sgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRhc2suZ2V0UHJvamVjdCgpID09PSBwcm9qZWN0O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhc2tzQnlQcm9qZWN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrUHJvamVjdER1cGxpY2F0ZShwcm9qZWN0TmFtZSl7XG4gICAgICAgIGlmKGFsbFByb2plY3RzLmluY2x1ZGVzKHByb2plY3ROYW1lKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1lbHNlIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVGFza0R1cGxpY2F0ZSh0YXNrTmFtZSl7XG4gICAgICAgIGlmKGFsbFRhc2tzLmluY2x1ZGVzKHByb2plY3ROYW1lKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1lbHNlIHJldHVybiB0cnVlO1xuICAgIH1cblxuXG4gICAgcmV0dXJue2NyZWF0ZVRhc2sgLGFsbFRhc2tzLCBnZXRUYXNrc0J5UHJvamVjdCwgY2hlY2tQcm9qZWN0RHVwbGljYXRlLCBcbiAgICAgICAgY2hlY2tUYXNrRHVwbGljYXRlLGRlbGV0ZVRhc2t9O1xuXG59KSgpXG5cbmV4cG9ydCB7dGFza0NvbnRyb2xsZXJ9OyIsImNvbnN0IHRhc2tGYWN0b3J5ID0gZnVuY3Rpb24gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIHByb2plY3QpeyBcbiAgICBmdW5jdGlvbiBnZXRUaXRsZSgpe1xuICAgICAgICByZXR1cm4gdGl0bGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFRpdGxlKG5ld1RpdGxlKXtcbiAgICAgICAgdGl0bGUgPSBuZXdUaXRsZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RGVzY3JpcHRpb24oKXtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXREZXNjcmlwdGlvbihuZXdEZXNjcmlwdGlvbil7XG4gICAgICAgIGRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldER1ZURhdGUoKXtcbiAgICAgICAgcmV0dXJuIGR1ZURhdGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldER1ZURhdGUobmV3RHVlRGF0ZSl7XG4gICAgICAgIGR1ZURhdGUgPSBuZXdEdWVEYXRlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRQcmlvcml0eSgpe1xuICAgICAgICByZXR1cm4gcHJpb3JpdHk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFByaW9yaXR5KG5ld1ByaW9yaXR5KXtcbiAgICAgICAgcHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdCgpe1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0UHJvamVjdChuZXdQcm9qZWN0KXtcbiAgICAgICAgcHJvamVjdCA9IG5ld1Byb2plY3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIHt0aXRsZSwgZ2V0VGl0bGUsc2V0VGl0bGUsZ2V0RGVzY3JpcHRpb24sc2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREdWVEYXRlLHNldER1ZURhdGUsZ2V0UHJpb3JpdHksc2V0UHJpb3JpdHksZ2V0UHJvamVjdCxzZXRQcm9qZWN0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFza0ZhY3RvcnkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZvcm1hdCwgY29tcGFyZUFzYyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7dGFza0NvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy90YXNrQ29udHJvbGxlcic7XG5pbXBvcnQgZGlzcGxheUNvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXknXG5cbi8vIGNvbnN0IHRvZGF5ID0gIGZvcm1hdChuZXcgRGF0ZSgyMDE0LCAxLCAxMSksICdNTS9kZC95eXl5Jyk7XG4vLyBjb25zb2xlLmxvZyh0b2RheSk7XG5cbmRpc3BsYXlDb250cm9sbGVyLnNldFVwVGFza0Zvcm0oKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==