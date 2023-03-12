import {IsString} from "class-validator";

export class CreateRoleDto {
    @IsString({message: "Повинно бути строкове значення"})
    readonly value: string;

    @IsString({message: "Повинно бути строкове значення"})
    readonly description: string;
}