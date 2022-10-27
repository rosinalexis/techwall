import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query} from '@nestjs/common';
import {Todo} from "./entities/todo.entity";
import {GetPaginatedTodoDto} from "./dto/get-paginated-todo.dto";
import {AddTodoDto} from "./dto/add-todo.dto";


@Controller('todo')
export class TodoController {

    todos: Todo[];

    constructor() {
        this.todos = []
    }

    @Get()
    getAllTodos(
        @Query() QueryParams: GetPaginatedTodoDto
    ) {
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
    addTodo(@Body() newTodo: AddTodoDto) {
        const todo = new Todo();
        const {name, description} = newTodo;
        todo.name = name;
        todo.description = description;

        if (this.todos.length) {
            todo.id = this.todos[this.todos.length - 1].id + 1;
        } else {
            todo.id = 1;
        }
        this.todos.push(todo);
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
        @Body() updatedTodo: Partial<AddTodoDto>
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
