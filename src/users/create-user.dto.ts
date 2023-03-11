import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example:"mail@mail.com", description:"Пошта"})
    readonly email:string;

    @ApiProperty({example:"123456qwerty", description:"Пароль"})
    readonly password:string;
}