import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createTreatmentDto: CreateTreatmentDto) {
    return this.prisma.treatment.create({
      data: createTreatmentDto,
    });
  }

  async findAll(category?: string, isActive?: boolean) {
    const where: Prisma.TreatmentWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    return this.prisma.treatment.findMany({
      where,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: number) {
    const treatment = await this.prisma.treatment.findUnique({
      where: { id },
    });

    if (!treatment) {
      throw new NotFoundException(`Treatment with ID ${id} not found`);
    }

    return treatment;
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    try {
      return await this.prisma.treatment.update({
        where: { id },
        data: updateTreatmentDto,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Treatment with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.treatment.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Treatment with ID ${id} not found`);
      }
      throw error;
    }
  }

  async findByCategory(category: string) {
    return this.prisma.treatment.findMany({
      where: {
        category,
        isActive: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}
