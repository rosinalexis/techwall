import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
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

  @Post()
  addTodo(@Body() newTodo:Todo) {
   if(this.todos.length){
     newTodo.id =this.todos[this.todos.length-1].id+1;
   }else{
     newTodo.id =1;
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
