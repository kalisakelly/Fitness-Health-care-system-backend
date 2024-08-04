import { IsNotEmpty, IsString, IsInt, Min, Max, IsOptional } from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(23)
  hour: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(59)
  minute: number;

  @IsString()
  @IsOptional()
  details: string;
}
