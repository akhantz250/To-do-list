import { format } from 'date-fns';
import {taskController} from './modules/taskController';
import displayController from './modules/display'

taskController.createTask('Go to the gym','Leg day','','1','default');
taskController.createTask(`Doctor's appointment`,'2pm @ Jurong West','2022-06-09','2','default');
taskController.createTask('Homework','Math','','0','default');
taskController.createTask('Tim\'s birthday','Buy him a present','','3','default');
displayController.initialise();