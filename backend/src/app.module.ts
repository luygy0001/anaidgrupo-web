import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { FilesModule } from './files/files.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ScoringModule } from './scoring/scoring.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { PricingModule } from './pricing/pricing.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { ContactModule } from './contact/contact.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    LeadsModule,
    FilesModule,
    ProfessionalsModule,
    AssignmentsModule,
    ScoringModule,
    ChatbotModule,
    PricingModule,
    IntegrationsModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
