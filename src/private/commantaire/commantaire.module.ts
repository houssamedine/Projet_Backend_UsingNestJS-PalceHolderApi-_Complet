import { Module } from '@nestjs/common';
import { CommantaireService } from './commantaire.service';
import { CommantaireController } from './commantaire.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Commantaire} from "./entities/commantaire.entity";

@Module({
  imports:[TypeOrmModule.forFeature([Commantaire])],
  controllers: [CommantaireController],
  providers: [CommantaireService],
})
export class CommantaireModule {}
