import taskFactory from "./taskFactory";
import { format } from 'date-fns';

const taskController = (function(){
    const allTasks= [];
    const allProjects = ['Chores','Homework'];

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
    function isToday(date){
        const today =  format(new Date(), 'yyyy-MM-dd');
        if(date === today){
            return true;
        }else return false;
    }
    function getTodayTask(){
        const todayTask = allTasks.filter(task => isToday(task.getDueDate()));
        return todayTask;
    }
    return{createTask, removeTask,editTask, allTasks, allProjects, 
        createProject, removeProject, getTasksByProject, checkProjectDuplicate, isToday, getTodayTask};
})()

export {taskController};