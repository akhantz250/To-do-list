import taskFactory from "./taskFactory";

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
                console.log('deleted');
                return;
            }
        }
        console.log('ended');
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
    function getTasksByProject(project){
        console.log(project)
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
        console.log('added project');
        console.log(allProjects);
    }
    function removeProject(projectName){
        for(let i=0;i<allProjects.length;i++){
            if(allProjects[i] === projectName){
                allProjects.splice(i,1);
                console.log(allProjects[i]);
                return;
            }
        }}
    
    return{createTask, removeTask,editTask, allTasks, allProjects, 
        createProject, removeProject, getTasksByProject, checkProjectDuplicate};
})()

export {taskController};