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
const displayController = (function(){
    const addTaskBtn = document.querySelector('#add-task');
    addTaskBtn.addEventListener('click',() => {
        
    });

    



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

    return {getTitle,setTitle,getDescription,setDescription,
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

_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask('Task 1','Do chores','12/11/2000', 3, 'Main');
_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.createTask('Task 2','Do homework','12/11/2003', 3, 'Home');


console.log(_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allTasks);
_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.deleteTask('Task 4');
console.log(_modules_taskController__WEBPACK_IMPORTED_MODULE_0__.taskController.allTasks);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7OztBQUlBLENBQUM7O0FBRUQsaUVBQWUsaUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7QUNaUTs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3Qix3REFBVztBQUNuQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7QUFHQSxXQUFXO0FBQ1g7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZO0FBQ1o7QUFDQTs7QUFFQSxpRUFBZTs7Ozs7O1VDcENmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjhDO0FBQ1U7QUFDUDs7QUFFakQ7QUFDQTs7QUFFQSw4RUFBeUI7QUFDekIsOEVBQXlCOzs7QUFHekIsWUFBWSw0RUFBdUI7QUFDbkMsOEVBQXlCO0FBQ3pCLFlBQVksNEVBQXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy9kaXNwbGF5LmpzIiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL21vZHVsZXMvdGFza0NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3QvLi9zcmMvbW9kdWxlcy90YXNrRmFjdG9yeS5qcyIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kb2xpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG9saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGRpc3BsYXlDb250cm9sbGVyID0gKGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhZGQtdGFzaycpO1xuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgXG4gICAgfSk7XG5cbiAgICBcblxuXG5cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BsYXlDb250cm9sbGVyOyIsImltcG9ydCB0YXNrRmFjdG9yeSBmcm9tIFwiLi90YXNrRmFjdG9yeVwiO1xuXG5jb25zdCB0YXNrQ29udHJvbGxlciA9IChmdW5jdGlvbigpe1xuICAgIGNvbnN0IGFsbFRhc2tzPSBbXTtcbiAgICBjb25zdCBhbGxQcm9qZWN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSl7XG4gICAgICAgIGlmKF9jaGVja1Byb2plY3REdXBsaWNhdGUocHJvamVjdE5hbWUpKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhbGxQcm9qZWN0cy5wdXNoKHByb2plY3ROYW1lKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgcHJvamVjdCl7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSB0YXNrRmFjdG9yeSh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KTtcbiAgICAgICAgYWxsVGFza3MucHVzaChuZXdUYXNrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZGVsZXRlVGFzayh0YXNrTmFtZSl7XG4gICAgICAgIGZvcihsZXQgaT0wO2k8YWxsVGFza3MubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBpZihhbGxUYXNrc1tpXS5nZXRUaXRsZSgpID09PSB0YXNrTmFtZSl7XG4gICAgICAgICAgICAgICAgYWxsVGFza3Muc3BsaWNlKGksMSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbGV0ZWQnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJ2VuZGVkJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFRhc2tzQnlQcm9qZWN0KHByb2plY3Qpe1xuICAgICAgICBjb25zdCB0YXNrc0J5UHJvamVjdCA9IGFsbFRhc2tzLmZpbHRlcih0YXNrID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0YXNrLmdldFByb2plY3QoKSA9PT0gcHJvamVjdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXNrc0J5UHJvamVjdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Byb2plY3REdXBsaWNhdGUocHJvamVjdE5hbWUpe1xuICAgICAgICBpZihhbGxQcm9qZWN0cy5pbmNsdWRlcyhwcm9qZWN0TmFtZSkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9ZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1Rhc2tEdXBsaWNhdGUodGFza05hbWUpe1xuICAgICAgICBpZihhbGxUYXNrcy5pbmNsdWRlcyhwcm9qZWN0TmFtZSkpe1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9ZWxzZSByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cblxuICAgIHJldHVybntjcmVhdGVUYXNrICxhbGxUYXNrcywgZ2V0VGFza3NCeVByb2plY3QsIGNoZWNrUHJvamVjdER1cGxpY2F0ZSwgXG4gICAgICAgIGNoZWNrVGFza0R1cGxpY2F0ZSxkZWxldGVUYXNrfTtcblxufSkoKVxuXG5leHBvcnQge3Rhc2tDb250cm9sbGVyfTsiLCJjb25zdCB0YXNrRmFjdG9yeSA9IGZ1bmN0aW9uICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBwcm9qZWN0KXsgXG4gICAgZnVuY3Rpb24gZ2V0VGl0bGUoKXtcbiAgICAgICAgcmV0dXJuIHRpdGxlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRUaXRsZShuZXdUaXRsZSl7XG4gICAgICAgIHRpdGxlID0gbmV3VGl0bGU7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERlc2NyaXB0aW9uKCl7XG4gICAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2V0RGVzY3JpcHRpb24obmV3RGVzY3JpcHRpb24pe1xuICAgICAgICBkZXNjcmlwdGlvbiA9IG5ld0Rlc2NyaXB0aW9uO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREdWVEYXRlKCl7XG4gICAgICAgIHJldHVybiBkdWVEYXRlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXREdWVEYXRlKG5ld0R1ZURhdGUpe1xuICAgICAgICBkdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0UHJpb3JpdHkoKXtcbiAgICAgICAgcmV0dXJuIHByaW9yaXR5O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZXRQcmlvcml0eShuZXdQcmlvcml0eSl7XG4gICAgICAgIHByaW9yaXR5ID0gbmV3UHJpb3JpdHk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFByb2plY3QoKXtcbiAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNldFByb2plY3QobmV3UHJvamVjdCl7XG4gICAgICAgIHByb2plY3QgPSBuZXdQcm9qZWN0O1xuICAgIH1cblxuICAgIHJldHVybiB7Z2V0VGl0bGUsc2V0VGl0bGUsZ2V0RGVzY3JpcHRpb24sc2V0RGVzY3JpcHRpb24sXG4gICAgICAgICAgICBnZXREdWVEYXRlLHNldER1ZURhdGUsZ2V0UHJpb3JpdHksc2V0UHJpb3JpdHksZ2V0UHJvamVjdCxzZXRQcm9qZWN0fTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGFza0ZhY3RvcnkiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGZvcm1hdCwgY29tcGFyZUFzYyB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7dGFza0NvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy90YXNrQ29udHJvbGxlcic7XG5pbXBvcnQgZGlzcGxheUNvbnRyb2xsZXIgZnJvbSAnLi9tb2R1bGVzL2Rpc3BsYXknXG5cbi8vIGNvbnN0IHRvZGF5ID0gIGZvcm1hdChuZXcgRGF0ZSgyMDE0LCAxLCAxMSksICdNTS9kZC95eXl5Jyk7XG4vLyBjb25zb2xlLmxvZyh0b2RheSk7XG5cbnRhc2tDb250cm9sbGVyLmNyZWF0ZVRhc2soJ1Rhc2sgMScsJ0RvIGNob3JlcycsJzEyLzExLzIwMDAnLCAzLCAnTWFpbicpO1xudGFza0NvbnRyb2xsZXIuY3JlYXRlVGFzaygnVGFzayAyJywnRG8gaG9tZXdvcmsnLCcxMi8xMS8yMDAzJywgMywgJ0hvbWUnKTtcblxuXG5jb25zb2xlLmxvZyh0YXNrQ29udHJvbGxlci5hbGxUYXNrcyk7XG50YXNrQ29udHJvbGxlci5kZWxldGVUYXNrKCdUYXNrIDQnKTtcbmNvbnNvbGUubG9nKHRhc2tDb250cm9sbGVyLmFsbFRhc2tzKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==