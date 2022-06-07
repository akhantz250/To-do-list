import taskFactory from "./taskFactory";
import { format, compareAsc } from 'date-fns';

const taskController = (function(){
    const allTasks= [];
    const allProjects = ['Errands','School'];

    function createTask(title, description, dueDate, priority, project){
        const newTask = taskFactory(title, description, dueDate, priority, project);
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
        for(let i = allProjects.length; i > 0  ;i--){
            if(allProjects[i] === projectName){
                allProjects.splice(i,1);}
        }
        for(let x = allTasks.length - 1; x >=0 ;x--){
            if(allTasks[x].getProject() === projectName){
                allTasks.splice(x,1);}
        }
    }
    function isToday(date){
        const today =  getTodayDate();
        if(date === today){
            return true;
        }else return false;
    }
    function getTodayTask(){
        const todayTask = allTasks.filter(task => isToday(task.getDueDate()));
        return todayTask;
    }
    function getTodayDate(){
        const today =  format(new Date(), 'yyyy-MM-dd');
        return today; 
    }
    function _getTaskWithDate(){
        const tasksWithDate = allTasks.filter(task => task.getDueDate() !== '');
        return tasksWithDate;
    }
    function sortTaskWithDates(){
        const tasks = _getTaskWithDate();
        const sortedTasks = tasks.sort((a,b) => (a.getDueDate() > b.getDueDate()) ? 1:-1);
        return sortedTasks
    }
    return{createTask, removeTask,editTask, allTasks, allProjects, 
        createProject, removeProject, getTasksByProject, checkProjectDuplicate, isToday, getTodayTask, getTodayDate, sortTaskWithDates};
})()

export {taskController};