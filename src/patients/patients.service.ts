import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const data: Prisma.PatientCreateInput = {
      ...createPatientDto,
      dateOfBirth: new Date(createPatientDto.dateOfBirth),
    };

    return this.prisma.patient.create({
      data,
      include: {
        guardian: true,
      },
    });
  }

  async findAll(page: number = 1, limit: number = 50, status?: string) {
    const skip = (page - 1) * limit;
    
    const where: Prisma.PatientWhereInput = status 
      ? { status } 
      : {};

    const [patients, total] = await Promise.all([
      this.prisma.patient.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          guardian: true,
        },
      }),
      this.prisma.patient.count({ where }),
    ]);

    return {
      data: patients,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        guardian: true,
        dependents: true,
        appointments: {
          take: 10,
          orderBy: { appointmentDate: 'desc' },
        },
        clinicalHistories: {
          take: 10,
          orderBy: { visitDate: 'desc' },
        },
        treatmentPlans: {
          orderBy: { planDate: 'desc' },
        },
        financialAccount: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      const data: Prisma.PatientUpdateInput = {
        ...updatePatientDto,
        ...(updatePatientDto.dateOfBirth && {
          dateOfBirth: new Date(updatePatientDto.dateOfBirth),
        }),
      };

      return await this.prisma.patient.update({
        where: { id },
        data,
        include: {
          guardian: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.patient.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Patient with ID ${id} not found`);
      }
      throw error;
    }
  }

  async search(query: string) {
    return this.prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: query } },
          { lastName: { contains: query } },
          { documentNumber: { contains: query } },
          { email: { contains: query } },
          { primaryPhone: { contains: query } },
        ],
      },
      take: 20,
      orderBy: {
        lastName: 'asc',
      },
    });
  }
}
