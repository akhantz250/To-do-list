import taskFactory from "./taskFactory";

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
        const newTask = taskFactory(title, description, dueDate, priority, project);
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

export {taskController};