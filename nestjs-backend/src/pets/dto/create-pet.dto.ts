import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty({ required: true })
  petName: string;

  @ApiProperty({ required: true })
  ownerName: string;
}
