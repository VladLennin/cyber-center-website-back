import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, Length} from "class-validator";
import {AllowNull, NotNull} from "sequelize-typescript";

export class UserDto {
    readonly id: number;
    readonly email: string;

    readonly rank: string;

    readonly surname: string;
    readonly name: string;
    readonly fatherhood: string;

    constructor(model) {
        this.email = model.email;
        this.rank = model.rank;
        this.id = model.id;
        this.surname = model.surname;
        this.name = model.name;
        this.fatherhood = model.fatherhood;

    }

}