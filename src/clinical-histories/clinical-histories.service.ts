import { Injectable } from '@nestjs/common';
import { CreateClinicalHistoryDto } from './dto/create-clinical-history.dto';
import { UpdateClinicalHistoryDto } from './dto/update-clinical-history.dto';

@Injectable()
export class ClinicalHistoriesService {
  create(createClinicalHistoryDto: CreateClinicalHistoryDto) {
    return 'This action adds a new clinicalHistory';
  }

  findAll() {
    return `This action returns all clinicalHistories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicalHistory`;
  }

  update(id: number, updateClinicalHistoryDto: UpdateClinicalHistoryDto) {
    return `This action updates a #${id} clinicalHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicalHistory`;
  }
}
