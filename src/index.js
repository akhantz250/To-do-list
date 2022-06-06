import { format, compareAsc } from 'date-fns';
import {taskController} from './modules/taskController';
import displayController from './modules/display'

// const today =  format(new Date(2014, 1, 11), 'MM/dd/yyyy');
// console.log(today);

taskController.createTask('Go to the gym','Leg day','No date','1','default');
taskController.createTask(`Doctor's appointment`,'2pm @ Jurong West','2022-06-09','2','default');
taskController.createTask('Homework','Math','No date','0','default');
taskController.createTask('Tim\'s birthday','Buy him a present','No date','3','default');
displayController.initialise();