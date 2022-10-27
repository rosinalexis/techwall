import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, ValidationPipe} from '@nestjs/common';
import {GetPaginatedTodoDto} from "./dto/get-paginated-todo.dto";
import {AddTodoDto} from "./dto/add-todo.dto";
import {TodoService} from "./todo.service";
import {Todo} from "./entities/todo.entity";
import {UpperAndFusionPipe} from "../pipes/upper-and-fusion.pipe";


@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService) {
    }

    @Get()
    getAllTodos(
        @Query() QueryParams: GetPaginatedTodoDto
    ): Todo[] {
        return this.todoService.getTodos();
    }

    @Get('/:id')
    getTodoById(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.getTodoById(id);
    }

    @Post()
    addTodo(@Body(ValidationPipe) newTodo: AddTodoDto) {
        this.todoService.addTodo(newTodo);
    }

    @Delete('/:id')
    deleteTodo(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.todoService.deleteTodo(id);

    }

    @Put('/:id')
    modifyTodo(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatedTodo: Partial<AddTodoDto>
    ) {

        this.todoService.updateTodo(id, updatedTodo);
    }

    @Post('pipe')
    testPipe(
        @Body(UpperAndFusionPipe) data
    ) {
        return data;
    }
}
