import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class ScoringService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateScore(leadId: string): Promise<number> {
    const lead = await this.prisma.lead.findUnique({
      where: { id: leadId },
      include: { fotos: true },
    });

    if (!lead) {
      throw new NotFoundException('Lead no encontrado');
    }

    let score = 0;

    // Urgencia: URGENTE=40, ALTA=30, MEDIA=20, BAJA=10
    switch (lead.urgencia) {
      case 'URGENTE':
        score += 40;
        break;
      case 'ALTA':
        score += 30;
        break;
      case 'MEDIA':
        score += 20;
        break;
      case 'BAJA':
        score += 10;
        break;
    }

    // Has description > 50 chars: +15
    if (lead.descripcion && lead.descripcion.length > 50) {
      score += 15;
    }

    // Has fotos: +15
    if (lead.fotos && lead.fotos.length > 0) {
      score += 15;
    }

    // Has codigoPostal: +10
    if (lead.codigoPostal && lead.codigoPostal.trim().length > 0) {
      score += 10;
    }

    // tipoServicio != NO_SE: +10
    if (lead.tipoServicio !== 'NO_SE') {
      score += 10;
    }

    // Has email AND telefono: +10
    if (
      lead.email &&
      lead.email.trim().length > 0 &&
      lead.telefono &&
      lead.telefono.trim().length > 0
    ) {
      score += 10;
    }

    // Update the lead's score field
    await this.prisma.lead.update({
      where: { id: leadId },
      data: { score },
    });

    return score;
  }
}
