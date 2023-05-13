import { RequestHandler } from "express";
import { TodoItem } from "../models/todo";

const TODO_ITEMS: TodoItem[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const title = (req.body as { title: string }).title;
    const newTodoItem = new TodoItem(Math.random().toString(), title);
    TODO_ITEMS.push(newTodoItem);

    res.status(201).send({message: 'Todo item created', todoItem: newTodoItem})
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.status(200).send({todoItems: TODO_ITEMS})
}

export const updateTodo: RequestHandler = (req, res, next) => {
    const todoItemId = req.params.id;
    const newTitle = (req.body as {title: string}).title;

    const todoItemIndex = TODO_ITEMS.findIndex(todoItem => todoItem.id === todoItemId);

    if (todoItemIndex < 0) {
        throw new Error('Todo Item not found');
    }

    TODO_ITEMS[todoItemIndex] = { ...TODO_ITEMS[todoItemIndex], title: newTitle };

    res.status(201).send({message: 'Todo updated', todoItem: TODO_ITEMS[todoItemIndex]})
}

export const deleteTodo: RequestHandler = (req, res, next) => {
    const todoItemId = req.params.id;

    const todoItemIndex = TODO_ITEMS.findIndex(todoItem => todoItem.id === todoItemId);
    const removedItem = TODO_ITEMS.splice(todoItemIndex, 1);

    res.status(201).send({message: 'Todo item removed', todoItem: removedItem})
}