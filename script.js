document.addEventListener('DOMContentLoaded', () => {
    const addTodoButton = document.getElementById('addTodo');
    const todoInput = document.getElementById('todoInput');
    const todoDescription = document.getElementById('todoDescription');
    const deleteFinishedButton = document.getElementById('deleteFinished');
    const columns = document.querySelectorAll('.column');
    let draggedItem = null;

    addTodoButton.addEventListener('click', addTodo);

    function addTodo() {
        const todoText = todoInput.value.trim();
        const todoDescText = todoDescription.value.trim();
        if (todoText === '') return;

        const todoList = document.getElementById('todoList');
        const li = createTodoItem(todoText, todoDescText);
        todoList.appendChild(li);

        todoInput.value = '';
        todoDescription.value = '';
    }

    function createTodoItem(text, description) {
        const li = document.createElement('li');
        li.className = 'task';
        li.draggable = true;

        const todoTitle = document.createElement('span');
        todoTitle.className = 'todo-title';
        todoTitle.textContent = text;

        const todoDesc = document.createElement('p');
        todoDesc.className = 'todo-desc';
        todoDesc.textContent = description;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });

        li.appendChild(todoTitle);
        li.appendChild(todoDesc);
        li.appendChild(deleteBtn);

        addDragAndTouchListeners(li);

        return li;
    }

    function addDragAndTouchListeners(element) {
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragend', dragEnd);

        element.addEventListener('touchstart', touchStart, {passive: true});
        element.addEventListener('touchmove', touchMove, {passive: false});
        element.addEventListener('touchend', touchEnd);
    }

    function dragStart() {
        draggedItem = this;
        setTimeout(() => this.style.display = 'none', 0);
    }

    function dragEnd() {
        setTimeout(() => this.style.display = '', 0);
        draggedItem = null;
    }

    let touchStartY;
    let touchStartTop;

    function touchStart(e) {
        draggedItem = this;
        touchStartY = e.touches[0].clientY;
        touchStartTop = this.offsetTop;
        this.style.transition = 'none';
        this.style.zIndex = '1000';
    }

    function touchMove(e) {
        if (!draggedItem) return;
        e.preventDefault();
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        draggedItem.style.top = `${touchStartTop + deltaY}px`;
    }

    function touchEnd(e) {
        if (!draggedItem) return;
        draggedItem.style.transition = '';
        draggedItem.style.top = '';
        draggedItem.style.zIndex = '';

        const touch = e.changedTouches[0];
        const elementAtTouch = document.elementFromPoint(touch.clientX, touch.clientY);
        const column = elementAtTouch.closest('.column');

        if (column) {
            const targetList = column.querySelector('ul');
            updateTaskStyle(draggedItem, column.id);
            targetList.appendChild(draggedItem);
        }

        draggedItem = null;
    }

    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', drop);
    });

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    }

    function dragLeave() {
        this.style.backgroundColor = '';
    }

    function drop() {
        this.style.backgroundColor = '';
        updateTaskStyle(draggedItem, this.id);
        this.querySelector('ul').appendChild(draggedItem);
    }

    function updateTaskStyle(task, columnId) {
        if (columnId === 'inProgressColumn' || columnId === 'reviewColumn') {
            task.style.backgroundColor = 'rgba(255, 251, 34, 0.2)';
        } else if (columnId === 'finishedColumn') {
            task.style.backgroundColor = 'rgba(34, 255, 45, 0.2)';
        } else {
            task.style.backgroundColor = 'rgba(255, 58, 58, 0.2)';
        }
    }

    deleteFinishedButton.addEventListener('click', function() {
        const finishedList = document.getElementById('finishedList');
        finishedList.innerHTML = '';
    });
});
