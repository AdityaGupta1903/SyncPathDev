import { IsEmail } from "class-validator";

export class UserDetails{
 @IsEmail()
 email : string   
}