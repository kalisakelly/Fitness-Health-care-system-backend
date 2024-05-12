import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    description:string;
}
