import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protección de Staging / Acceso Privado con Usuario y Contraseña
  const stagingEnabled = process.env.STAGING_ENABLED !== 'false';
  if (stagingEnabled) {
    const authHeader = request.headers.get('authorization');

    const expectedUser = process.env.STAGING_USER || 'anaid';
    const expectedPass = process.env.STAGING_PASSWORD || 'anaid2026';

    if (!authHeader) {
      return new NextResponse('Acceso restringido - Área de Pruebas Construcciones Anaid', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Construcciones Anaid - Acceso Privado"',
        },
      });
    }

    try {
      const authValue = authHeader.split(' ')[1] || '';
      const [user, pass] = Buffer.from(authValue, 'base64').toString().split(':');

      if (user !== expectedUser || pass !== expectedPass) {
        return new NextResponse('Credenciales no válidas', {
          status: 401,
          headers: {
            'WWW-Authenticate': 'Basic realm="Construcciones Anaid - Acceso Privado"',
          },
        });
      }
    } catch {
      return new NextResponse('Error de autenticación', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Construcciones Anaid - Acceso Privado"',
        },
      });
    }
  }

  // 2. Rutas del panel administrativo
  if (pathname.startsWith('/panel') && !pathname.startsWith('/panel/login')) {
    const token = request.cookies.get('access_token')?.value;
    if (!token) {
      const loginUrl = new URL('/panel/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Intercepta todas las rutas excepto archivos estáticos e imágenes públicas
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
