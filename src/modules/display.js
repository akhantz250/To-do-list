import {taskController} from './taskController';
const displayController = (function(){

    const initialBox = 'default';
    let currentBox = initialBox;
    

    function setUpTaskForm(){
        const formContainerElement = document.querySelector('#form-container');
        const addTaskBtn = document.querySelector('#create-task');
        const taskNameInput = document.querySelector('#title');
        const formElement = document.querySelector('#new-task')
        taskNameInput.addEventListener('input', (e) =>{
            if(taskNameInput.value.length !== 0){
                console.log(taskNameInput.value.length);
                addTaskBtn.removeAttribute('disabled');
            }else{
                addTaskBtn.setAttribute('disabled','');
                console.log('disabled')
            } 
        });

        const form = document.querySelector('#new-task')
        addTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const title = form.elements['title'].value;
            const description = form.elements['description'].value;
            const dueDate = form.elements['due-date'].value;
            const priority = form.elements['priority'].value;
            console.log(title, description, dueDate, priority);
            taskController.createTask(title, description, dueDate, priority, currentBox);
            _createNewTask(title, description, dueDate, priority);
            console.log(taskController.allTasks);

            form.reset();
        });
    }

    function hideTaskForm(){
         
    }

    function _createNewTask(title, description, dueDate, priority){
        const targetElement = document.querySelector('.task-target')

        const newTaskRow = document.createElement('div');
        const newCheckBox = document.createElement('div');
        const newInfoContainer = document.createElement('div');
        const newTitle = document.createElement('div');
        const newDescription = document.createElement('div');
        const newDueDate = document.createElement('div');
        const newEditIcon = document.createElement('span');

        newTaskRow.classList.add('task-row');
        newCheckBox.classList.add('task-check');
        newInfoContainer.classList.add('task-info');
        newTitle.classList.add('task-title');
        newDescription.classList.add('task-description');
        newDueDate.classList.add('task-due-date');
        newEditIcon.classList.add('material-symbols-outlined');
        newEditIcon.textContent = 'edit';

        switch(priority) {
            case '0':
                newTaskRow.classList.add('p0');
                break;
            case '1':
                newTaskRow.classList.add('p1');
                break;
            case '2':
                newTaskRow.classList.add('p2');
                break;
            case '3':
                newTaskRow.classList.add('p3');
                break;
          }

        newTitle.textContent = title;
        newDescription.textContent = description;

        if(dueDate === ''){
            newDueDate.textContent = 'No date';
        }else{
            newDueDate.textContent = dueDate;
        }
        targetElement.appendChild(newTaskRow);
        newTaskRow.appendChild(newCheckBox);
        newTaskRow.appendChild(newInfoContainer);
        newTaskRow.appendChild(newDueDate);
        newTaskRow.appendChild(newEditIcon);

        newInfoContainer.appendChild(newTitle);
        newInfoContainer.appendChild(newDescription);
    }
    
    return {setUpTaskForm}
})();

export default displayController;