import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { ApplyProfessionalDto, UpdateProfessionalDto } from './professionals.dto';

@Injectable()
export class ProfessionalsService {
  constructor(private readonly prisma: PrismaService) {}

  async apply(dto: ApplyProfessionalDto) {
    return this.prisma.profesional.create({
      data: {
        nombre: dto.nombre,
        empresa: dto.empresa,
        email: dto.email,
        telefono: dto.telefono,
        bio: dto.descripcion,
        estado: 'PENDIENTE',
        especialidades: {
          create: await this.resolveEspecialidades(dto.especialidades),
        },
        zonas: {
          create: await this.resolveZonas(dto.zonas),
        },
      },
      include: {
        especialidades: { include: { especialidad: true } },
        zonas: { include: { zona: true } },
      },
    });
  }

  async findAll(filters?: {
    estado?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (filters?.estado) where.estado = filters.estado;

    const [professionals, total] = await Promise.all([
      this.prisma.profesional.findMany({
        where,
        include: {
          especialidades: { include: { especialidad: true } },
          zonas: { include: { zona: true } },
        },
        orderBy: { creadoEn: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.profesional.count({ where }),
    ]);

    return {
      data: professionals,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const professional = await this.prisma.profesional.findUnique({
      where: { id },
      include: {
        especialidades: { include: { especialidad: true } },
        zonas: { include: { zona: true } },
        asignaciones: { include: { lead: true } },
      },
    });

    if (!professional) {
      throw new NotFoundException('Profesional no encontrado');
    }

    return professional;
  }

  async update(id: string, dto: UpdateProfessionalDto) {
    await this.findOne(id);

    const data: any = {};
    if (dto.nombre !== undefined) data.nombre = dto.nombre;
    if (dto.empresa !== undefined) data.empresa = dto.empresa;
    if (dto.email !== undefined) data.email = dto.email;
    if (dto.telefono !== undefined) data.telefono = dto.telefono;
    if (dto.descripcion !== undefined) data.bio = dto.descripcion;
    if (dto.estado !== undefined) data.estado = dto.estado;

    if (dto.especialidades) {
      await this.prisma.profesionalEspecialidad.deleteMany({
        where: { profesionalId: id },
      });
      const espLinks = await this.resolveEspecialidades(dto.especialidades);
      data.especialidades = { create: espLinks };
    }

    if (dto.zonas) {
      await this.prisma.profesionalZona.deleteMany({
        where: { profesionalId: id },
      });
      const zonaLinks = await this.resolveZonas(dto.zonas);
      data.zonas = { create: zonaLinks };
    }

    return this.prisma.profesional.update({
      where: { id },
      data,
      include: {
        especialidades: { include: { especialidad: true } },
        zonas: { include: { zona: true } },
      },
    });
  }

  async findLeadsForProfessional(profesionalId: string) {
    const assignments = await this.prisma.asignacion.findMany({
      where: { profesionalId },
      include: {
        lead: {
          include: { fotos: true },
        },
      },
      orderBy: { creadoEn: 'desc' },
    });

    return assignments.map((a) => ({
      asignacion: {
        id: a.id,
        estado: a.estado,
        notasProfesional: a.notasProfesional,
        notasAdmin: a.notasAdmin,
        creadoEn: a.creadoEn,
      },
      lead: a.lead,
    }));
  }

  private async resolveEspecialidades(nombres: string[]) {
    const links: { especialidadId: string }[] = [];
    for (const nombre of nombres) {
      let esp = await this.prisma.especialidad.findUnique({
        where: { nombre },
      });
      if (!esp) {
        esp = await this.prisma.especialidad.create({
          data: {
            nombre,
            slug: nombre.toLowerCase().replace(/\s+/g, '-'),
          },
        });
      }
      links.push({ especialidadId: esp.id });
    }
    return links;
  }

  private async resolveZonas(nombres: string[]) {
    const links: { zonaId: string }[] = [];
    for (const nombre of nombres) {
      let zona = await this.prisma.zona.findUnique({
        where: { nombre },
      });
      if (!zona) {
        zona = await this.prisma.zona.create({
          data: {
            nombre,
            slug: nombre.toLowerCase().replace(/\s+/g, '-'),
          },
        });
      }
      links.push({ zonaId: zona.id });
    }
    return links;
  }
}
