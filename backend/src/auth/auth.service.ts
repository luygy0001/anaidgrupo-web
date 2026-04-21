import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../common/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      include: { profesional: true },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      rol: user.rol,
      profesionalId: user.profesionalId,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
        profesionalId: user.profesionalId,
      },
    };
  }

  async register(email: string, password: string, rol: 'ADMIN' | 'PROFESSIONAL' = 'PROFESSIONAL') {
    const existing = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (existing) {
      throw new ConflictException('El email ya está registrado');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await this.prisma.usuario.create({
      data: { email, passwordHash, rol },
    });

    return {
      id: user.id,
      email: user.email,
      rol: user.rol,
    };
  }

  async refresh(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const newPayload = {
        sub: payload.sub,
        email: payload.email,
        rol: payload.rol,
        profesionalId: payload.profesionalId,
      };

      return {
        accessToken: this.jwtService.sign(newPayload),
        refreshToken: this.jwtService.sign(newPayload, { expiresIn: '7d' }),
      };
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  async getProfile(userId: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      include: { profesional: true },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      rol: user.rol,
      profesional: user.profesional,
    };
  }
}
