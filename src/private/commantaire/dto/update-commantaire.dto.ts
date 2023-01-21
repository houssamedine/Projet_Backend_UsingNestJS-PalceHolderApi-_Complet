import { PartialType } from '@nestjs/swagger';
import { CreateCommantaireDto } from './create-commantaire.dto';

export class UpdateCommantaireDto extends PartialType(CreateCommantaireDto) {}
