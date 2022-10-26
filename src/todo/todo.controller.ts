import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get()
  getAllTodos() {
    console.log('Récuperation de la liste des todos.');
    return 'Lister les todos.';
  }

  @Post()
  addTodo() {
    console.log('Ajouter un todo.');
    return 'Ajouter un todo.';
  }

  @Delete()
  deleteTodo() {
    console.log('Supprimer un todo.');
    return 'Supprimier un todo.';
  }

  @Put()
  modifyTodo() {
    console.log('Modifier un todo.');
    return 'Modifier todo.';
  }
}
