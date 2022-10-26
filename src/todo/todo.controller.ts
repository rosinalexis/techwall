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

    @Delete('/:id')
    deleteTodo(
        @Param('id') id: string
    ) {
        const index = this.todos.findIndex(todo => todo.id === +id);
        if (index >= 0) {
            this.todos.splice(index, 1);
        } else {
            throw new NotFoundException(`le todo avec l'id: ${id} n'existe pas.`);
        }

        return {
            message: `Le Todo d'${id} à été supprimé.`,
        };
    }

    @Put('/:id')
    modifyTodo(
        @Param('id') id: string,
        @Body() updatedTodo: Partial<Todo>
    ) {
        const todo = this.getTodoById(id);

        if (todo) {
            for (let key in updatedTodo) {
                console.log(key);
                todo[key] = updatedTodo[key]
            }

            return todo;
        }

        throw new NotFoundException(`Le Todo avec l'id:${id} n'existe pas.`);
    }
}
