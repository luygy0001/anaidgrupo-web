import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ============================================================
  // Especialidades (Service specialties)
  // ============================================================
  const especialidades = await Promise.all([
    prisma.especialidad.upsert({
      where: { slug: 'reforma-integral' },
      update: {},
      create: {
        nombre: 'Reforma integral',
        slug: 'reforma-integral',
        descripcion: 'Reformas completas de viviendas y locales',
      },
    }),
    prisma.especialidad.upsert({
      where: { slug: 'reforma-bano' },
      update: {},
      create: {
        nombre: 'Reforma de baño',
        slug: 'reforma-bano',
        descripcion: 'Reformas completas o parciales de baños',
      },
    }),
    prisma.especialidad.upsert({
      where: { slug: 'reforma-cocina' },
      update: {},
      create: {
        nombre: 'Reforma de cocina',
        slug: 'reforma-cocina',
        descripcion: 'Reformas completas o parciales de cocinas',
      },
    }),
    prisma.especialidad.upsert({
      where: { slug: 'electricidad' },
      update: {},
      create: {
        nombre: 'Electricidad',
        slug: 'electricidad',
        descripcion: 'Instalaciones y reparaciones eléctricas',
      },
    }),
    prisma.especialidad.upsert({
      where: { slug: 'fontaneria' },
      update: {},
      create: {
        nombre: 'Fontanería',
        slug: 'fontaneria',
        descripcion: 'Instalaciones y reparaciones de fontanería',
      },
    }),
    prisma.especialidad.upsert({
      where: { slug: 'climatizacion' },
      update: {},
      create: {
        nombre: 'Climatización',
        slug: 'climatizacion',
        descripcion: 'Instalación y mantenimiento de sistemas de climatización',
      },
    }),
    prisma.especialidad.upsert({
      where: { slug: 'arquitectura' },
      update: {},
      create: {
        nombre: 'Arquitectura',
        slug: 'arquitectura',
        descripcion: 'Proyectos de arquitectura, licencias y dirección de obra',
      },
    }),
    prisma.especialidad.upsert({
      where: { slug: 'pequenas-obras' },
      update: {},
      create: {
        nombre: 'Pequeñas obras',
        slug: 'pequenas-obras',
        descripcion: 'Trabajos menores de albañilería, pintura, etc.',
      },
    }),
  ]);

  console.log(`Created ${especialidades.length} especialidades`);

  // ============================================================
  // Zonas (Madrid coverage zones)
  // ============================================================
  const zonas = await Promise.all([
    prisma.zona.upsert({
      where: { slug: 'centro' },
      update: {},
      create: { nombre: 'Centro', slug: 'centro' },
    }),
    prisma.zona.upsert({
      where: { slug: 'chamberi' },
      update: {},
      create: { nombre: 'Chamberí', slug: 'chamberi' },
    }),
    prisma.zona.upsert({
      where: { slug: 'salamanca' },
      update: {},
      create: { nombre: 'Salamanca', slug: 'salamanca' },
    }),
    prisma.zona.upsert({
      where: { slug: 'retiro' },
      update: {},
      create: { nombre: 'Retiro', slug: 'retiro' },
    }),
    prisma.zona.upsert({
      where: { slug: 'chamartin' },
      update: {},
      create: { nombre: 'Chamartín', slug: 'chamartin' },
    }),
    prisma.zona.upsert({
      where: { slug: 'tetuan' },
      update: {},
      create: { nombre: 'Tetuán', slug: 'tetuan' },
    }),
    prisma.zona.upsert({
      where: { slug: 'moncloa-aravaca' },
      update: {},
      create: { nombre: 'Moncloa-Aravaca', slug: 'moncloa-aravaca' },
    }),
    prisma.zona.upsert({
      where: { slug: 'arganzuela' },
      update: {},
      create: { nombre: 'Arganzuela', slug: 'arganzuela' },
    }),
    prisma.zona.upsert({
      where: { slug: 'carabanchel' },
      update: {},
      create: { nombre: 'Carabanchel', slug: 'carabanchel' },
    }),
    prisma.zona.upsert({
      where: { slug: 'latina' },
      update: {},
      create: { nombre: 'Latina', slug: 'latina' },
    }),
    prisma.zona.upsert({
      where: { slug: 'usera' },
      update: {},
      create: { nombre: 'Usera', slug: 'usera' },
    }),
    prisma.zona.upsert({
      where: { slug: 'vallecas' },
      update: {},
      create: { nombre: 'Vallecas', slug: 'vallecas' },
    }),
    prisma.zona.upsert({
      where: { slug: 'hortaleza' },
      update: {},
      create: { nombre: 'Hortaleza', slug: 'hortaleza' },
    }),
    prisma.zona.upsert({
      where: { slug: 'san-blas' },
      update: {},
      create: { nombre: 'San Blas', slug: 'san-blas' },
    }),
    prisma.zona.upsert({
      where: { slug: 'ciudad-lineal' },
      update: {},
      create: { nombre: 'Ciudad Lineal', slug: 'ciudad-lineal' },
    }),
    prisma.zona.upsert({
      where: { slug: 'fuencarral-el-pardo' },
      update: {},
      create: { nombre: 'Fuencarral-El Pardo', slug: 'fuencarral-el-pardo' },
    }),
  ]);

  console.log(`Created ${zonas.length} zonas`);

  // ============================================================
  // Admin user
  // ============================================================
  const adminPasswordHash = await bcrypt.hash('Admin2024!', 10);

  const adminUser = await prisma.usuario.upsert({
    where: { email: 'admin@anaidgrupo.com' },
    update: {},
    create: {
      email: 'admin@anaidgrupo.com',
      passwordHash: adminPasswordHash,
      rol: 'ADMIN',
    },
  });

  console.log(`Created admin user: ${adminUser.email}`);

  // ============================================================
  // Demo professional + user
  // ============================================================
  const profesional = await prisma.profesional.upsert({
    where: { email: 'demo@profesional.com' },
    update: {},
    create: {
      nombre: 'Carlos Martínez',
      empresa: 'Reformas Martínez S.L.',
      email: 'demo@profesional.com',
      telefono: '+34 612 345 678',
      bio: 'Empresa de reformas con más de 15 años de experiencia en Madrid. Especializados en reformas integrales y de baños.',
      estado: 'ACTIVO',
      rating: 4.5,
    },
  });

  const proPasswordHash = await bcrypt.hash('Pro2024!', 10);

  await prisma.usuario.upsert({
    where: { email: 'demo@profesional.com' },
    update: {},
    create: {
      email: 'demo@profesional.com',
      passwordHash: proPasswordHash,
      rol: 'PROFESSIONAL',
      profesionalId: profesional.id,
    },
  });

  // Link specialties to demo professional
  const reformaIntegral = especialidades.find(
    (e) => e.slug === 'reforma-integral',
  );
  const reformaBano = especialidades.find((e) => e.slug === 'reforma-bano');
  const pequenasObras = especialidades.find(
    (e) => e.slug === 'pequenas-obras',
  );

  if (reformaIntegral && reformaBano && pequenasObras) {
    for (const esp of [reformaIntegral, reformaBano, pequenasObras]) {
      await prisma.profesionalEspecialidad.upsert({
        where: {
          profesionalId_especialidadId: {
            profesionalId: profesional.id,
            especialidadId: esp.id,
          },
        },
        update: {},
        create: {
          profesionalId: profesional.id,
          especialidadId: esp.id,
        },
      });
    }
  }

  // Link zones to demo professional
  const centro = zonas.find((z) => z.slug === 'centro');
  const chamberi = zonas.find((z) => z.slug === 'chamberi');
  const salamanca = zonas.find((z) => z.slug === 'salamanca');

  if (centro && chamberi && salamanca) {
    for (const zona of [centro, chamberi, salamanca]) {
      await prisma.profesionalZona.upsert({
        where: {
          profesionalId_zonaId: {
            profesionalId: profesional.id,
            zonaId: zona.id,
          },
        },
        update: {},
        create: {
          profesionalId: profesional.id,
          zonaId: zona.id,
        },
      });
    }
  }

  console.log(`Created demo professional: ${profesional.nombre}`);

  // ============================================================
  // Sample leads
  // ============================================================
  const lead1 = await prisma.lead.upsert({
    where: { id: '00000000-0000-0000-0000-000000000001' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000001',
      nombre: 'María García López',
      telefono: '+34 611 222 333',
      email: 'maria.garcia@example.com',
      codigoPostal: '28001',
      descripcion:
        'Necesito una reforma integral del piso. Son 85m², quiero cambiar la distribución del salón-cocina y renovar los dos baños. El piso es de los años 70 y necesita actualización completa de instalaciones.',
      urgencia: 'ALTA',
      tipoServicio: 'REFORMA_INTEGRAL',
      fuente: 'FORMULARIO',
      score: 82,
      estado: 'NUEVO',
    },
  });

  const lead2 = await prisma.lead.upsert({
    where: { id: '00000000-0000-0000-0000-000000000002' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000002',
      nombre: 'Pedro Sánchez Ruiz',
      telefono: '+34 622 333 444',
      email: 'pedro.sanchez@example.com',
      codigoPostal: '28015',
      descripcion:
        'Quiero reformar el baño principal. Cambiar bañera por plato de ducha, nuevo alicatado y mueble de baño.',
      urgencia: 'MEDIA',
      tipoServicio: 'REFORMA_BANO',
      fuente: 'CHAT',
      score: 65,
      estado: 'ANALIZADO',
    },
  });

  await prisma.lead.upsert({
    where: { id: '00000000-0000-0000-0000-000000000003' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000003',
      nombre: 'Ana Fernández Torres',
      telefono: '+34 633 444 555',
      email: 'ana.fernandez@example.com',
      codigoPostal: '28003',
      descripcion:
        'Tengo problemas con la instalación eléctrica, saltan los diferenciales constantemente. Necesito revisión completa.',
      urgencia: 'URGENTE',
      tipoServicio: 'ELECTRICIDAD',
      fuente: 'WHATSAPP',
      score: 75,
      estado: 'NUEVO',
    },
  });

  console.log('Created 3 sample leads');

  // ============================================================
  // Sample assignment
  // ============================================================
  await prisma.asignacion.upsert({
    where: { id: '00000000-0000-0000-0000-000000000010' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000010',
      leadId: lead2.id,
      profesionalId: profesional.id,
      estado: 'ACEPTADO',
      notasAdmin: 'Lead cualificado, zona centro. Buen encaje con perfil del profesional.',
    },
  });

  // Update lead2 status to match
  await prisma.lead.update({
    where: { id: lead2.id },
    data: { estado: 'ASIGNADO' },
  });

  console.log('Created 1 sample assignment');

  // ============================================================
  // Activity log entries
  // ============================================================
  await prisma.actividadLog.createMany({
    data: [
      {
        accion: 'LEAD_CREATED',
        entidad: 'Lead',
        entidadId: lead1.id,
        detalles: { fuente: 'FORMULARIO', tipoServicio: 'REFORMA_INTEGRAL' },
      },
      {
        accion: 'LEAD_CREATED',
        entidad: 'Lead',
        entidadId: lead2.id,
        detalles: { fuente: 'CHAT', tipoServicio: 'REFORMA_BANO' },
      },
      {
        accion: 'LEAD_ASSIGNED',
        entidad: 'Asignacion',
        entidadId: '00000000-0000-0000-0000-000000000010',
        detalles: { profesional: 'Carlos Martínez' },
        usuarioId: adminUser.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('Created activity log entries');

  console.log('\n--- Seed complete ---');
  console.log('Admin login:        admin@anaidgrupo.com / Admin2024!');
  console.log('Professional login: demo@profesional.com / Pro2024!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
