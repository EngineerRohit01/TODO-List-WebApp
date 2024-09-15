document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;

    if (taskTitle && taskDescription) {
        const taskItem = document.createElement('li');
        
        const titleElement = document.createElement('strong');
        titleElement.textContent = taskTitle;
        taskItem.appendChild(titleElement);
        
        const descriptionElement = document.createElement('span');
        descriptionElement.textContent = ` - ${taskDescription}`;
        taskItem.appendChild(descriptionElement);
        
        const date = new Date();
        const dateTime = document.createElement('span');
        dateTime.textContent = ` (Added: ${date.toLocaleString()})`;
        taskItem.appendChild(dateTime);
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => markComplete(taskItem));
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        editBtn.addEventListener('click', () => editTask(taskItem));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => deleteTask(taskItem));

        taskItem.appendChild(completeBtn);
        taskItem.appendChild(editBtn);
        taskItem.appendChild(deleteBtn);
        
        document.getElementById('pendingTasks').appendChild(taskItem);
        document.getElementById('taskTitle').value = '';
        document.getElementById('taskDescription').value = '';
    }
}

function markComplete(taskItem) {
    taskItem.classList.toggle('completed');
    taskItem.querySelector('button').textContent = taskItem.classList.contains('completed') ? 'Undo' : 'Complete';
    
    const completedTasks = document.getElementById('completedTasks');
    if (taskItem.classList.contains('completed')) {
        completedTasks.appendChild(taskItem);
    } else {
        document.getElementById('pendingTasks').appendChild(taskItem);
    }
}

function editTask(taskItem) {
    const title = taskItem.querySelector('strong').textContent;
    const description = taskItem.querySelector('span').textContent.split(' - ')[1];

    const newTitle = prompt('Edit Task Title:', title);
    const newDescription = prompt('Edit Task Description:', description);
    
    if (newTitle && newDescription) {
        taskItem.querySelector('strong').textContent = newTitle;
        taskItem.querySelector('span').textContent = ` - ${newDescription}`;
    }
}

function deleteTask(taskItem) {
    taskItem.remove();
}
