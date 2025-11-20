import { IsString, IsEmail, IsDateString, IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateDentistDto {
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

  @IsOptional()
  @IsString()
  address?: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  licenseNumber: string;

  @IsString()
  specialties: string; // JSON string

  @IsInt()
  yearsOfExperience: number;

  @IsOptional()
  @IsString()
  certifications?: string; // JSON string

  @IsDateString()
  hireDate: string;

  @IsString()
  contractType: string; // fixed, services

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  commissionPercentage?: number;

  @IsOptional()
  @IsNumber()
  productivityBonus?: number;
}
