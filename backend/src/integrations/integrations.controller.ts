import { Controller, Post, Body, Logger } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('webhooks')
export class IntegrationsController {
  private readonly logger = new Logger(IntegrationsController.name);

  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post('lead-created')
  async leadCreated(@Body() data: any) {
    this.logger.log('Webhook: lead-created');
    await this.integrationsService.triggerWebhook('lead-created', data);
    return { received: true };
  }

  @Post('lead-assigned')
  async leadAssigned(@Body() data: any) {
    this.logger.log('Webhook: lead-assigned');
    await this.integrationsService.triggerWebhook('lead-assigned', data);
    return { received: true };
  }

  @Post('lead-status-changed')
  async leadStatusChanged(@Body() data: any) {
    this.logger.log('Webhook: lead-status-changed');
    await this.integrationsService.triggerWebhook('lead-status-changed', data);
    return { received: true };
  }
}
