import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMedicacaoDto {

    @ApiProperty()
    @IsNotEmpty()
    remedio: string;

    @ApiProperty()
    @IsNotEmpty()
    dosagem: string;

    @ApiProperty()
    @IsNotEmpty()
    uso: string;
}
