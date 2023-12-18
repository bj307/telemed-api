import { IsNotEmpty } from "class-validator";

export class CreateMedicacaoDto {

    @IsNotEmpty()
    remedio: string;

    @IsNotEmpty()
    dosagem: string;

    @IsNotEmpty()
    uso: string;
}
