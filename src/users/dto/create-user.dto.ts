import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, Length} from "class-validator";
import {AllowNull, NotNull} from "sequelize-typescript";

export class CreateUserDto {
    // @IsEmail({}, {message: "Некоректна пошта"})
    @ApiProperty({example: "mail@mail.com", description: "Пошта"})
    readonly email: string;

    // @Length(8, 16, {message: "Пароль повинен бути від 8 до 16 символів"})
    @ApiProperty({example: "123456qwerty", description: "Пароль"})
    readonly password: string;

    readonly ipAddress: string;
    readonly rank: string;
    readonly surname: string;
    readonly name: string;
    readonly fatherhood: string;
    readonly contactNumber: string;
    readonly unit: string;

}