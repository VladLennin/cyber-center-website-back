import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto{
    @ApiProperty({example:"ьail@mail.com", description:"Пошта"})
    readonly email:string;

    @ApiProperty({example:"123456qwerty", description:"Пароль"})
    readonly password:string;
}