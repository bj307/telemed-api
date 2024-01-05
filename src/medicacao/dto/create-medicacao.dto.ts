import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedicacaoDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    remedio: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    dosagem: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    uso: string;
}
