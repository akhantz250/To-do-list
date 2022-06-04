const displayController = (function(){

    function setUpTaskForm(){
        const addTaskBtn = document.querySelector('#create-task');
        const form = document.querySelector('#new-task')
        addTaskBtn.addEventListener('click',(e) => {
            e.preventDefault();
            const title = form.elements['title'].value;
            const description = form.elements['description'].value;
            const dueDate = form.elements['due-date'].value;
            const priority = form.elements['priority'].value;
            console.log(title, description, dueDate, priority);
            form.reset();
        });
    }

    function removeTaskForm(){
         
    }
    
    return {setUpTaskForm}
})();

export default displayController;