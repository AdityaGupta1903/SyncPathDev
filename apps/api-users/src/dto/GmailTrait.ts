import { IsString } from "class-validator";

export class GmailTrait {
    @IsString()
    trait: string
    @IsString()
    email: string
}