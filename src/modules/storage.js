import taskFactory from "./taskFactory";

const storage = (function(){

function getTasks(){
    const myTasks = JSON.parse(localStorage.getItem('myTasks'));
    const allTasks = [];

    if(myTasks === null) return allTasks;
    for(let i = 0; i < myTasks.length; i++){
        const task = taskFactory(
            myTasks[i].title,
            myTasks[i].description,
            myTasks[i].dueDate,
            myTasks[i].priority,
            myTasks[i].project,
            myTasks[i].complete,)
        allTasks.push(task);
    }
    return allTasks;
}

function setTasks(allTasks){
    const myTask = []
    for(let i = 0; i < allTasks.length  ; i++){
        const task = {
            title: allTasks[i].getTitle(),
            description: allTasks[i].getDescription(),
            dueDate: allTasks[i].getDueDate(),
            priority: allTasks[i].getPriority(),
            project: allTasks[i].getProject(),
            complete: allTasks[i].isComplete,
        }
        myTask.push(task);
    }
    localStorage.setItem('myTasks',JSON.stringify(myTask))
}

function setProjects(myProjects){
    localStorage.setItem('myProjects',JSON.stringify(myProjects))
}

function getProjects(){
    const myProjects = JSON.parse(localStorage.getItem('myProjects'));
    if(myProjects === null) return [];
    return myProjects;
}

    return{getTasks,setTasks, getProjects, setProjects};
})();

export default storage;