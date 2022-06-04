import { format, compareAsc } from 'date-fns';
import {taskController} from './modules/taskController';
import displayController from './modules/display'

// const today =  format(new Date(2014, 1, 11), 'MM/dd/yyyy');
// console.log(today);

displayController.setUpTaskForm();
