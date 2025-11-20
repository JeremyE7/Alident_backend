import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
// import { UsersModule } from './users/users.module'; // Commented out - will be replaced with SystemUser module
import { PatientsModule } from './patients/patients.module';
import { DentistsModule } from './dentists/dentists.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { TreatmentsModule } from './treatments/treatments.module';
import { OdontogramsModule } from './odontograms/odontograms.module';
import { ClinicalHistoriesModule } from './clinical-histories/clinical-histories.module';
import { PaymentsModule } from './payments/payments.module';
import { InventoryModule } from './inventory/inventory.module';
import { InsuranceModule } from './insurance/insurance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    // UsersModule, // Commented out - will be replaced with SystemUser module
    PatientsModule,
    DentistsModule,
    AppointmentsModule,
    TreatmentsModule,
    OdontogramsModule,
    ClinicalHistoriesModule,
    PaymentsModule,
    InventoryModule,
    InsuranceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
