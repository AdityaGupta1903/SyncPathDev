import { IsNumber, IsString } from "class-validator";

export class ZapDTO{
    @IsString()
    ZapName :string
    @IsString()
    token : string
}