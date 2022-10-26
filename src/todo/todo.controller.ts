import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {Todo} from "./entities/todo.entity";


@Controller('todo')
export class TodoController {

    todos: Todo[];

    constructor() {
        this.todos = []
    }

    @Get()
    getAllTodos() {
        return this.todos;
    }

    @Get('/:id')
    getTodoById(@Param('id') id: string) {
        
        const todo = this.todos.find(t => t.id === +id);
        if (todo) {
            return todo;
        }
        throw new NotFoundException(`le todo avec l'id: ${id} n'existe pas.`);
    }

    @Post()
    addTodo(@Body() newTodo: Todo) {
        if (this.todos.length) {
            newTodo.id = this.todos[this.todos.length - 1].id + 1;
        } else {
            newTodo.id = 1;
        }
        this.todos.push(newTodo);
    }

    @Delete()
    deleteTodo() {
        console.log('Supprimer un todo.');
        return 'Supprimer un todo.';
    }

    @Put()
    modifyTodo() {
        console.log('Modifier un todo.');
        return 'Modifier todo.';
    }
}
