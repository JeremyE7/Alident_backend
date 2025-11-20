import { IsString, IsEmail, IsOptional, IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  documentType: string;

  @IsString()
  documentNumber: string;

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsString()
  primaryPhone: string;

  @IsOptional()
  @IsString()
  emergencyPhone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  occupation?: string;

  // Medical Information
  @IsOptional()
  @IsString()
  bloodType?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsString()
  chronicDiseases?: string;

  @IsOptional()
  @IsString()
  currentMedications?: string;

  @IsOptional()
  @IsString()
  previousSurgeries?: string;

  @IsOptional()
  @IsBoolean()
  isPregnant?: boolean;

  // Dental History
  @IsOptional()
  @IsString()
  previousTreatments?: string;

  @IsOptional()
  @IsString()
  previousDentist?: string;

  @IsOptional()
  @IsString()
  initialConsultReason?: string;

  // Administrative
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  referralSource?: string;

  @IsOptional()
  @IsBoolean()
  gdprConsent?: boolean;

  // Family Relations
  @IsOptional()
  @IsInt()
  guardianId?: number;

  // Preferences
  @IsOptional()
  @IsString()
  preferredSchedule?: string;

  @IsOptional()
  @IsString()
  reminderPreferences?: string;

  @IsOptional()
  @IsString()
  language?: string;
}
