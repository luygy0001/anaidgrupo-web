import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ScoringService } from './scoring.service';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('scoring')
export class ScoringController {
  constructor(private readonly scoringService: ScoringService) {}

  // Admin only — calculate score for a lead
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  @Post('calculate')
  async calculate(@Body() body: { leadId: string }) {
    const score = await this.scoringService.calculateScore(body.leadId);
    return { leadId: body.leadId, score };
  }
}
