import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { EmailService } from '../contact/email.service';
import { CreateLeadDto, UpdateLeadDto } from './leads.dto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        nombre: dto.nombre,
        telefono: dto.telefono,
        email: dto.email,
        codigoPostal: dto.codigoPostal,
        descripcion: dto.descripcion,
        urgencia: dto.urgencia as any,
        tipoServicio: dto.tipoServicio as any,
        noSabeQueNecesita: dto.noSabeQueNecesita || false,
        fuente: (dto.fuente as any) || 'FORMULARIO',
      },
    });

    // Send email notification (non-blocking)
    this.emailService
      .sendLeadNotification({
        nombre: lead.nombre,
        email: lead.email,
        telefono: lead.telefono,
        tipoServicio: lead.tipoServicio,
        urgencia: lead.urgencia,
        descripcion: lead.descripcion,
        codigoPostal: lead.codigoPostal,
      })
      .catch((err) => this.logger.error('Failed to send lead notification', err));

    return lead;
  }

  async findAll(filters?: {
    estado?: string;
    tipoServicio?: string;
    urgencia?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.estado) where.estado = filters.estado;
    if (filters?.tipoServicio) where.tipoServicio = filters.tipoServicio;
    if (filters?.urgencia) where.urgencia = filters.urgencia;

    const [leads, total] = await Promise.all([
      this.prisma.lead.findMany({
        where,
        include: {
          fotos: true,
          asignaciones: {
            include: { profesional: true },
          },
        },
        orderBy: { creadoEn: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ]);

    return {
      data: leads,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      include: {
        fotos: true,
        asignaciones: {
          include: { profesional: true },
        },
        chatSession: {
          include: { mensajes: true },
        },
      },
    });

    if (!lead) {
      throw new NotFoundException('Lead no encontrado');
    }

    return lead;
  }

  async update(id: string, dto: UpdateLeadDto) {
    await this.findOne(id);

    return this.prisma.lead.update({
      where: { id },
      data: dto as any,
    });
  }
}
