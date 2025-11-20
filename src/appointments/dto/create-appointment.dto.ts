import { IsInt, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patientId: number;

  @IsInt()
  dentistId: number;

  @IsOptional()
  @IsInt()
  officeId?: number;

  @IsDateString()
  appointmentDate: string;

  @IsString()
  startTime: string; // HH:MM format

  @IsString()
  endTime: string; // HH:MM format

  @IsInt()
  duration: number; // minutes

  @IsString()
  appointmentType: string; // first_consultation, followup, treatment, emergency, control

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  specialInstructions?: string;
}
