import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    UserName : string
    @IsNotEmpty()
    Password : string
}