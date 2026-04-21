import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class IntegrationsService {
  private readonly logger = new Logger(IntegrationsService.name);

  async triggerWebhook(event: string, data: any) {
    this.logger.log(`Webhook triggered: ${event}`, JSON.stringify(data));
    // Prepared for n8n integration
    // In production, this would POST to the n8n webhook URL
    // const n8nUrl = this.config.get('N8N_WEBHOOK_URL');
    // await fetch(`${n8nUrl}/${event}`, { method: 'POST', body: JSON.stringify(data) });
  }
}
