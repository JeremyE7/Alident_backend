import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OdontogramsService } from './odontograms.service';
import { CreateOdontogramDto } from './dto/create-odontogram.dto';
import { UpdateOdontogramDto } from './dto/update-odontogram.dto';

@Controller('odontograms')
export class OdontogramsController {
  constructor(private readonly odontogramsService: OdontogramsService) {}

  @Post()
  create(@Body() createOdontogramDto: CreateOdontogramDto) {
    return this.odontogramsService.create(createOdontogramDto);
  }

  @Get()
  findAll() {
    return this.odontogramsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.odontogramsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOdontogramDto: UpdateOdontogramDto) {
    return this.odontogramsService.update(+id, updateOdontogramDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.odontogramsService.remove(+id);
  }
}
