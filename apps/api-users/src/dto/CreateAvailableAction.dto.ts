import { IsString } from "class-validator";

export class CreateAvailableAction{
    @IsString()
    AvailableActionName : string
}