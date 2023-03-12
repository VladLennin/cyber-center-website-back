import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @IsString({message: "Значення повинне бути строковим"})
    readonly value: string;

    @IsNumber({}, {message: "id повинен бути чисельним"})
    readonly userId: number;
}