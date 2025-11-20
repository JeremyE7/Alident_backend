import { IsString, IsInt, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateTreatmentDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  category: string; // preventive, restorative, surgical, orthodontics, aesthetic, prosthetics

  @IsInt()
  estimatedDuration: number; // minutes

  @IsNumber()
  basePrice: number;

  @IsOptional()
  @IsNumber()
  promotionalPrice?: number;

  @IsOptional()
  @IsNumber()
  supplyCost?: number;

  @IsOptional()
  @IsString()
  requiredSpecialty?: string;

  @IsOptional()
  @IsString()
  requiredEquipment?: string; // JSON string

  @IsOptional()
  @IsInt()
  typicalSessions?: number;

  @IsOptional()
  @IsString()
  supplies?: string; // JSON string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
