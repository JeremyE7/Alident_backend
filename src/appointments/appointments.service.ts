import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // Verify patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: createAppointmentDto.patientId },
    });
    if (!patient) {
      throw new BadRequestException('Patient not found');
    }

    // Verify dentist exists
    const dentist = await this.prisma.dentist.findUnique({
      where: { id: createAppointmentDto.dentistId },
    });
    if (!dentist) {
      throw new BadRequestException('Dentist not found');
    }

    const data: Prisma.AppointmentCreateInput = {
      patient: { connect: { id: createAppointmentDto.patientId } },
      dentist: { connect: { id: createAppointmentDto.dentistId } },
      ...(createAppointmentDto.officeId && {
        office: { connect: { id: createAppointmentDto.officeId } },
      }),
      appointmentDate: new Date(createAppointmentDto.appointmentDate),
      startTime: createAppointmentDto.startTime,
      endTime: createAppointmentDto.endTime,
      duration: createAppointmentDto.duration,
      appointmentType: createAppointmentDto.appointmentType,
      status: createAppointmentDto.status || 'scheduled',
      notes: createAppointmentDto.notes,
      specialInstructions: createAppointmentDto.specialInstructions,
    };

    return this.prisma.appointment.create({
      data,
      include: {
        patient: true,
        dentist: true,
        office: true,
      },
    });
  }

  async findAll(
    startDate?: string,
    endDate?: string,
    dentistId?: number,
    patientId?: number,
    status?: string,
  ) {
    const where: Prisma.AppointmentWhereInput = {};

    if (startDate && endDate) {
      where.appointmentDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    if (dentistId) {
      where.dentistId = dentistId;
    }

    if (patientId) {
      where.patientId = patientId;
    }

    if (status) {
      where.status = status;
    }

    return this.prisma.appointment.findMany({
      where,
      orderBy: [
        { appointmentDate: 'asc' },
        { startTime: 'asc' },
      ],
      include: {
        patient: true,
        dentist: true,
        office: true,
      },
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        dentist: true,
        office: true,
        treatmentSessions: {
          include: {
            treatment: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const data: Prisma.AppointmentUpdateInput = {
        ...updateAppointmentDto,
        ...(updateAppointmentDto.appointmentDate && {
          appointmentDate: new Date(updateAppointmentDto.appointmentDate),
        }),
        ...(updateAppointmentDto.patientId && {
          patient: { connect: { id: updateAppointmentDto.patientId } },
        }),
        ...(updateAppointmentDto.dentistId && {
          dentist: { connect: { id: updateAppointmentDto.dentistId } },
        }),
        ...(updateAppointmentDto.officeId && {
          office: { connect: { id: updateAppointmentDto.officeId } },
        }),
      };

      return await this.prisma.appointment.update({
        where: { id },
        data,
        include: {
          patient: true,
          dentist: true,
          office: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.appointment.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Appointment with ID ${id} not found`);
      }
      throw error;
    }
  }

  async getTodayAppointments(dentistId?: number) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const where: Prisma.AppointmentWhereInput = {
      appointmentDate: {
        gte: today,
        lt: tomorrow,
      },
    };

    if (dentistId) {
      where.dentistId = dentistId;
    }

    return this.prisma.appointment.findMany({
      where,
      orderBy: { startTime: 'asc' },
      include: {
        patient: true,
        dentist: true,
        office: true,
      },
    });
  }
}
