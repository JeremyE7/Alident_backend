import { Patient as PrismaPatient } from '@prisma/client';

export class PatientEntity implements PrismaPatient {
  id: number;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  dateOfBirth: Date;
  gender: string;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  primaryPhone: string;
  emergencyPhone: string | null;
  email: string | null;
  occupation: string | null;
  bloodType: string | null;
  allergies: string | null;
  chronicDiseases: string | null;
  currentMedications: string | null;
  previousSurgeries: string | null;
  isPregnant: boolean;
  previousTreatments: string | null;
  previousDentist: string | null;
  initialConsultReason: string | null;
  registrationDate: Date;
  status: string;
  referralSource: string | null;
  gdprConsent: boolean;
  guardianId: number | null;
  preferredSchedule: string | null;
  reminderPreferences: string | null;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
