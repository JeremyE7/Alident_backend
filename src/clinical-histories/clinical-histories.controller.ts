import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClinicalHistoriesService } from './clinical-histories.service';
import { CreateClinicalHistoryDto } from './dto/create-clinical-history.dto';
import { UpdateClinicalHistoryDto } from './dto/update-clinical-history.dto';

@Controller('clinical-histories')
export class ClinicalHistoriesController {
  constructor(private readonly clinicalHistoriesService: ClinicalHistoriesService) {}

  @Post()
  create(@Body() createClinicalHistoryDto: CreateClinicalHistoryDto) {
    return this.clinicalHistoriesService.create(createClinicalHistoryDto);
  }

  @Get()
  findAll() {
    return this.clinicalHistoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicalHistoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicalHistoryDto: UpdateClinicalHistoryDto) {
    return this.clinicalHistoriesService.update(+id, updateClinicalHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicalHistoriesService.remove(+id);
  }
}
