import { IsString } from "class-validator";

export class ActionDetails{
    @IsString()
    ZapId : string
    @IsString()
    AvailableActionId : string
}