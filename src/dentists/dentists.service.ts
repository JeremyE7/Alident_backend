import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDentistDto } from './dto/create-dentist.dto';
import { UpdateDentistDto } from './dto/update-dentist.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DentistsService {
  constructor(private prisma: PrismaService) {}

  async create(createDentistDto: CreateDentistDto) {
    const data: Prisma.DentistCreateInput = {
      ...createDentistDto,
      dateOfBirth: new Date(createDentistDto.dateOfBirth),
      hireDate: new Date(createDentistDto.hireDate),
    };

    return this.prisma.dentist.create({
      data,
    });
  }

  async findAll(status?: string) {
    const where: Prisma.DentistWhereInput = status ? { status } : {};

    return this.prisma.dentist.findMany({
      where,
      orderBy: {
        lastName: 'asc',
      },
      include: {
        schedules: true,
      },
    });
  }

  async findOne(id: number) {
    const dentist = await this.prisma.dentist.findUnique({
      where: { id },
      include: {
        schedules: true,
        appointments: {
          take: 20,
          orderBy: { appointmentDate: 'desc' },
        },
        treatmentPlans: {
          take: 10,
          orderBy: { planDate: 'desc' },
        },
        officeAssignments: {
          include: {
            office: true,
          },
        },
      },
    });

    if (!dentist) {
      throw new NotFoundException(`Dentist with ID ${id} not found`);
    }

    return dentist;
  }

  async update(id: number, updateDentistDto: UpdateDentistDto) {
    try {
      const data: Prisma.DentistUpdateInput = {
        ...updateDentistDto,
        ...(updateDentistDto.dateOfBirth && {
          dateOfBirth: new Date(updateDentistDto.dateOfBirth),
        }),
        ...(updateDentistDto.hireDate && {
          hireDate: new Date(updateDentistDto.hireDate),
        }),
      };

      return await this.prisma.dentist.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Dentist with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.dentist.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Dentist with ID ${id} not found`);
      }
      throw error;
    }
  }
}
