import taskFactory from "./taskFactory";

const taskController = (function(){
    const allTasks= [];
    const allProjects = [];

    function createTask(title, description, dueDate, priority, project){
        const newTask = taskFactory(title, description, dueDate, priority, project);
        allTasks.push(newTask);
        return newTask;
    }
    function deleteTask(taskID){
        for(let i=0;i<allTasks.length;i++){
            if(allTasks[i].getTaskID() === taskID){
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
    
    return{createTask ,allTasks, getTasksByProject, checkProjectDuplicate, 
        deleteTask,editTask};
})()

export {taskController};