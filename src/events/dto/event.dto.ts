import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EventDto {
  @ApiProperty()
  serviceKey: string;

  @ApiProperty()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ default: 'service' })
  @IsNotEmpty()
  type: 'service';
}
