import { IsString } from "class-validator";

export class SpreadSheetTrait {
    @IsString()
    traitname: string
    @IsString()
    spreadSheetId: string
    @IsString()
    spreadsheetName: string
    @IsString()
    email: string
}