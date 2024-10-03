document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('addTodo').addEventListener('click', function() {
        const todoInput = document.getElementById('todoInput');
        const todoDescription = document.getElementById('todoDescription');
        const todoText = todoInput.value.trim();
        const todoDescText = todoDescription.value.trim();

        if (todoText === '') return;

        const todoList = document.getElementById('todoList');
        const li = document.createElement('li');
        li.className = 'task';
        li.draggable = true;

        const todoTitle = document.createElement('span');
        todoTitle.className = 'todo-title';
        todoTitle.textContent = todoText;

     
        const todoDesc = document.createElement('p');
        todoDesc.className = 'todo-desc';
        todoDesc.textContent = todoDescText;


        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;'; ol
        deleteBtn.addEventListener('click', function () {
            li.remove(); 
        });

        li.appendChild(todoTitle);
        li.appendChild(todoDesc);
        li.appendChild(deleteBtn);

        li.addEventListener('dragstart', () => {
            li.classList.add('dragging');
        });

        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
        });

        todoList.appendChild(li);
        todoInput.value = '';
        todoDescription.value = '';


        const columns = document.querySelectorAll('.column');

        columns.forEach(column => {
            column.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            column.addEventListener('drop', (e) => {
                const draggingItem = document.querySelector('.dragging');
                const targetList = column.querySelector('ul');

                if (column.id === 'inProgressColumn' || column.id === 'reviewColumn') {
                    draggingItem.style.backgroundColor = 'rgba(255, 251, 34, 0.2)';
                } else if (column.id === 'finishedColumn') {
                    draggingItem.style.backgroundColor = 'rgba(34, 255, 45, 0.2)';
                } else {
                    draggingItem.style.backgroundColor = 'rgba(255, 58, 58, 0.2)';
                }

                targetList.appendChild(draggingItem);
            });
        });
    });

    
    document.getElementById('deleteFinished').addEventListener('click', function() {
        const finishedList = document.getElementById('finishedList');
        finishedList.innerHTML = '';  
    });
});
