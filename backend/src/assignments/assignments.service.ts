import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from './assignments.dto';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAssignmentDto) {
    const assignment = await this.prisma.asignacion.create({
      data: {
        leadId: dto.leadId,
        profesionalId: dto.profesionalId,
        notasAdmin: dto.notasAdmin,
        estado: 'PENDIENTE',
      },
      include: {
        lead: true,
        profesional: true,
      },
    });

    // Update lead estado to ASIGNADO
    await this.prisma.lead.update({
      where: { id: dto.leadId },
      data: { estado: 'ASIGNADO' },
    });

    return assignment;
  }

  async findAll(filters?: {
    estado?: string;
    leadId?: string;
    profesionalId?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.estado) where.estado = filters.estado;
    if (filters?.leadId) where.leadId = filters.leadId;
    if (filters?.profesionalId) where.profesionalId = filters.profesionalId;

    const [assignments, total] = await Promise.all([
      this.prisma.asignacion.findMany({
        where,
        include: {
          lead: true,
          profesional: true,
        },
        orderBy: { creadoEn: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.asignacion.count({ where }),
    ]);

    return {
      data: assignments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async update(id: string, dto: UpdateAssignmentDto) {
    const assignment = await this.prisma.asignacion.findUnique({
      where: { id },
    });

    if (!assignment) {
      throw new NotFoundException('Asignacion no encontrada');
    }

    return this.prisma.asignacion.update({
      where: { id },
      data: {
        estado: dto.estado as any,
        notasProfesional: dto.notasProfesional,
        notasAdmin: dto.notasAdmin,
      },
      include: {
        lead: true,
        profesional: true,
      },
    });
  }
}
