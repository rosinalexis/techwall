import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class AddTodoDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6, {message: 'La taille minimale du champs name est de 6 caractère'})
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(10, {message: 'La taille minimale du champs name est de 6 caractère'})
    description: string;
}