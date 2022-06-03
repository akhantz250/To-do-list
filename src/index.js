import { format, compareAsc } from 'date-fns';
import {taskController} from './modules/taskController';
import displayController from './modules/display'

// const today =  format(new Date(2014, 1, 11), 'MM/dd/yyyy');
// console.log(today);

taskController.createTask('Task 1','Do chores','12/11/2000', 3, 'Main');
taskController.createTask('Task 2','Do homework','12/11/2003', 3, 'Home');


console.log(taskController.allTasks);
taskController.deleteTask('Task 4');
console.log(taskController.allTasks);
