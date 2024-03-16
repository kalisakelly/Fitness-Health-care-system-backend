import { PartialType } from '@nestjs/mapped-types';
import { CreatePostreplyDto } from './create-postreply.dto';

export class UpdatePostreplyDto extends PartialType(CreatePostreplyDto) {}
