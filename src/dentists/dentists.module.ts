import { Module } from '@nestjs/common';
import { DentistsService } from './dentists.service';
import { DentistsController } from './dentists.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DentistsController],
  providers: [DentistsService],
  exports: [DentistsService],
})
export class DentistsModule {}
