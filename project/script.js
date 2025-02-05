document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    const clearCompletedBtn = document.getElementById('clearCompleted');

    let tasks = [];

    // Add task function
    function addTask(taskText) {
        if (taskText.trim() === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        tasks.push(task);
        renderTask(task);
        updateTaskCount();
        taskInput.value = '';
    }

    // Render single task
    function renderTask(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        const checkbox = document.createElement('div');
        checkbox.className = `task-checkbox ${task.completed ? 'checked' : ''}`;
        checkbox.addEventListener('click', () => toggleTask(task.id));

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    }

    // Toggle task completion
    function toggleTask(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return;

        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.classList.toggle('completed');
            taskElement.querySelector('.task-checkbox').classList.toggle('checked');
        }
    }

    // Delete task
    function deleteTask(id) {
        const taskElement = document.querySelector(`[data-id="${id}"]`);
        if (taskElement) {
            taskElement.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                tasks = tasks.filter(task => task.id !== id);
                taskElement.remove();
                updateTaskCount();
            }, 300);
        }
    }

    // Update task count
    function updateTaskCount() {
        const count = tasks.length;
        taskCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;
    }

    // Clear completed tasks
    function clearCompleted() {
        const completedTasks = document.querySelectorAll('.task-item.completed');
        completedTasks.forEach(taskElement => {
            taskElement.style.animation = 'slideOut 0.3s ease forwards';
        });

        setTimeout(() => {
            tasks = tasks.filter(task => !task.completed);
            completedTasks.forEach(taskElement => taskElement.remove());
            updateTaskCount();
        }, 300);
    }

    // Event Listeners
    addTaskBtn.addEventListener('click', () => addTask(taskInput.value));

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    clearCompletedBtn.addEventListener('click', clearCompleted);

    // Add keydown event for input field
    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});