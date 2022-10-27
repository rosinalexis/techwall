import {Injectable, NotFoundException} from '@nestjs/common';
import {Todo} from "./entities/todo.entity";
import {AddTodoDto} from "./dto/add-todo.dto";

@Injectable()
export class TodoService {
    todos: Todo[] = [];

    getTodos(): Todo[] {
        return this.todos;
    }

    getTodoById(id: number): Todo {
        const todo = this.todos.find((actualTodo) => actualTodo.id === id);
        if (todo) {
            return todo;
        }

        throw new NotFoundException(`Le todo d'id ${id} n'existe pas.`)
    }

    addTodo(newTodo: AddTodoDto): Todo {

        let id;
        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1;
        } else {
            id = 1;
        }

        const todo = new Todo();
        todo.id = id;
        todo.name = newTodo.name;
        todo.description = newTodo.description;
        todo.createdAt = new Date();

        this.todos.push(todo);

        return todo;
    }

    deleteTodo(id: number) {
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

    updateTodo(id: number, updatedTodo: Partial<AddTodoDto>) {

        const todo = this.getTodoById(id);

        if (todo) {
            for (let key in updatedTodo) {
                console.log(key);
                todo[key] = updatedTodo[key];
            }

            return todo;
        }

        throw new NotFoundException(`Le Todo avec l'id:${id} n'existe pas.`);
    }

}
