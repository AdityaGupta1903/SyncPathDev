import { IsEmail, IsString } from "class-validator";

export class AttachementDetails {
   @IsString()
   data : string
   @IsEmail()
   email : string
}