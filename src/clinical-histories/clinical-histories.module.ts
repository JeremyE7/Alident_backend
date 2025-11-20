import { Module } from '@nestjs/common';
import { ClinicalHistoriesService } from './clinical-histories.service';
import { ClinicalHistoriesController } from './clinical-histories.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClinicalHistoriesController],
  providers: [ClinicalHistoriesService],
  exports: [ClinicalHistoriesService],
})
export class ClinicalHistoriesModule {}
