# Anaid Grupo — Web

Monorepo con el sitio web y el backend de **Anaid Grupo Construcción**, plataforma de intermediación para reformas y servicios de hogar en la Comunidad de Madrid.

> **Nota sobre el modelo de negocio:** Anaid Grupo no ejecuta obras directamente. Actúa como intermediario entre el cliente final y una red de profesionales validados. Todo el copy del sitio refleja este posicionamiento.

## Stack

- **Frontend** — Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript.
- **Backend** — NestJS + Prisma + PostgreSQL 16.
- **Deploy objetivo** — VPS de Hostinger (Node + PM2 + Nginx).
- **Tracking** — Google Tag Manager + Consent Mode v2 + CookieYes (todo configurable desde `frontend/src/lib/constants.ts`).

## Estructura

```
.
├── backend/            # API NestJS + Prisma + PostgreSQL
├── frontend/           # Next.js 16 (App Router)
├── legacy-2021/        # Web antigua (snapshot histórico)
├── docker-compose.yml  # Postgres local para desarrollo
├── package.json        # Scripts globales del monorepo
└── .env.example        # Plantilla de variables de entorno
```

## Arranque local (primera vez)

### Requisitos

- Node.js 20+ y npm
- Docker Desktop (para la base de datos local)
- Git

### Pasos

1. **Clonar y entrar al proyecto**
   ```bash
   git clone https://github.com/luygy0001/anaidgrupo-web.git
   cd anaidgrupo-web
   ```

2. **Instalar dependencias** (raíz, frontend y backend)
   ```bash
   npm install
   cd frontend && npm install && cd ..
   cd backend  && npm install && cd ..
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   ```
   Editar `backend/.env` con los valores reales (SMTP, JWT_SECRET, etc.). **Nunca commitear este archivo.**

4. **Levantar la base de datos**
   ```bash
   npm run db:up
   ```

5. **Aplicar migraciones de Prisma**
   ```bash
   npm run db:migrate
   ```

6. **Arrancar frontend + backend en paralelo**
   ```bash
   npm run dev
   ```
   - Frontend → http://localhost:3000
   - Backend API → http://localhost:3001

## Scripts útiles (raíz)

| Comando             | Descripción                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run dev`       | Arranca frontend y backend en paralelo (`concurrently`). |
| `npm run build`     | Compila frontend y backend.                              |
| `npm run db:up`     | Levanta Postgres (docker compose).                       |
| `npm run db:down`   | Para los contenedores de Postgres.                       |
| `npm run db:migrate`| Ejecuta las migraciones de Prisma en dev.                |
| `npm run db:studio` | Abre Prisma Studio para inspeccionar la DB.              |
| `npm run db:reset`  | Resetea la DB y reaplica migraciones (¡destructivo!).    |

## Variables de entorno

Ver [`.env.example`](./.env.example) para la lista completa. Resumen de las más importantes:

- `DATABASE_URL` — conexión Postgres.
- `JWT_SECRET` — clave de firma de tokens (cambiar en producción).
- `NEXT_PUBLIC_API_URL` — URL del backend expuesta al browser.
- `NEXT_PUBLIC_SITE_URL` — URL pública canónica (sitemap, schemas).
- `SMTP_*` — credenciales del correo (Hostinger Mail).
- `MAIL_FROM`, `MAIL_ADMIN` — emisores / destinatarios por defecto.

Las claves de terceros (GTM, CookieYes y futuras como OpenAI para el chatbot) se configuran en `frontend/src/lib/constants.ts` (placeholders) o en `backend/.env` (secretas) según corresponda.

## Documentación

- [`frontend/docs/tracking.md`](./frontend/docs/tracking.md) — GTM, Consent Mode v2, CookieYes, eventos disparados desde el frontend, funnel con `/gracias/[tipo]`.
- [`frontend/docs/zonas.md`](./frontend/docs/zonas.md) — estrategia de landings por municipio, cómo añadir nuevas zonas, criterios de calidad.
- [`frontend/AGENTS.md`](./frontend/AGENTS.md) — nota sobre Next.js 16: incluye breaking changes, leer siempre `node_modules/next/dist/docs/` antes de escribir código.

## Despliegue

Planificado sobre VPS de Hostinger. Notas de despliegue se añadirán en `docs/deploy.md` cuando se aborde esa fase (rama separada).

## Licencia

Propietario. Todos los derechos reservados — Anaid Grupo Construcción.
