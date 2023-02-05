import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

export const useTodo = () => {

    const init = () => {
        return JSON.parse( localStorage.getItem('todos')) || [];
    };

    const [todos, dispatchTodo] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    
    // Funciones necesarias para contar los TODOS.
    const todosCount = () => {
        return todos.length;
    };
    const pendingTodosCount = () => {
        return todos.filter(todo => !todo.done).length;
    };

    // Funciones para el crud de los TODOS.
    const handleNewTodo = (todo) => {
        const action = {
            type: `[TODO] Add Todo`,
            payload: todo,
        };
        dispatchTodo ( action );
    };
    const handleDeleteTodo = (id) => {
        const action = {
            type: `[TODO] Remove Todo`,
            payload: id,
        };
        dispatchTodo(action);
    };
    const handleToggleTodo = (id) => {
        const action = {
            type: `[TODO] Toggle Todo`,
            payload: id,
        };
        dispatchTodo(action);
    };

    return {
        todos,
        todosCount,
        pendingTodosCount,
        handleDeleteTodo,
        handleNewTodo,
        handleToggleTodo,
    };
};

