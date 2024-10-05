import { IsString } from "class-validator";

export class AvailableTriggerDetails{
 @IsString()
 TriggerName : string    
 @IsString()
 ZapId : string
}