import { ApiProperty } from '@nestjs/swagger';

export class CreatePetDto {
  @ApiProperty()
  petName: string;

  @ApiProperty()
  ownerName: string;
}
