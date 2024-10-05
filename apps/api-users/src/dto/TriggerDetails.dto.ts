import { IsString } from "class-validator";

export class TriggerDetails{
    @IsString()
    ZapId : string
    @IsString()
    AvailableTriggerId : string

}