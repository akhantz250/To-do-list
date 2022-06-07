import { v4 as uuidv4 } from 'uuid';

const taskFactory = function (title, description, dueDate, priority, project, complete){
    let isComplete = complete; 
    const taskID = uuidv4();

    function getTaskID(){
        return taskID;
    }
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

    return {title, taskID, isComplete, project,getTitle,setTitle,getDescription,setDescription,
            getDueDate,setDueDate,getPriority,setPriority,getProject,setProject,getTaskID};
}

export default taskFactory