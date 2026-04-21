import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.config.get<string>('SMTP_HOST') || 'smtp.hostinger.com',
      port: Number(this.config.get<string>('SMTP_PORT') || '465'),
      secure: true,
      auth: {
        user: this.config.get<string>('SMTP_USER') || '',
        pass: this.config.get<string>('SMTP_PASS') || '',
      },
    });
  }

  async sendContactNotification(data: {
    nombre: string;
    email: string;
    telefono?: string;
    mensaje: string;
  }): Promise<void> {
    const to = this.config.get<string>('MAIL_ADMIN') || 'admin@anaidgrupo.com';
    const from =
      this.config.get<string>('MAIL_FROM') || 'redes@anaidgrupo.com';

    await this.transporter.sendMail({
      from: `"Anaid Grupo Web" <${from}>`,
      to,
      replyTo: data.email,
      subject: `Nuevo mensaje de contacto de ${data.nombre}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${data.nombre}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Teléfono</td><td style="padding:8px;border:1px solid #ddd">${data.telefono || 'No proporcionado'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Mensaje</td><td style="padding:8px;border:1px solid #ddd">${data.mensaje}</td></tr>
        </table>
        <p style="color:#666;font-size:12px;margin-top:16px">Enviado desde el formulario de contacto de anaidgrupo.com</p>
      `,
      text: `Nuevo mensaje de contacto\n\nNombre: ${data.nombre}\nEmail: ${data.email}\nTeléfono: ${data.telefono || 'No proporcionado'}\nMensaje: ${data.mensaje}`,
    });
  }

  async sendLeadNotification(data: {
    nombre: string;
    email: string;
    telefono: string;
    tipoServicio: string;
    urgencia: string;
    descripcion: string;
    codigoPostal: string;
  }): Promise<void> {
    const to = this.config.get<string>('MAIL_ADMIN') || 'admin@anaidgrupo.com';
    const from =
      this.config.get<string>('MAIL_FROM') || 'redes@anaidgrupo.com';

    await this.transporter.sendMail({
      from: `"Anaid Grupo Web" <${from}>`,
      to,
      subject: `Nuevo lead: ${data.tipoServicio} — ${data.nombre}`,
      html: `
        <h2>Nueva solicitud de proyecto</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Nombre</td><td style="padding:8px;border:1px solid #ddd">${data.nombre}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Teléfono</td><td style="padding:8px;border:1px solid #ddd"><a href="tel:${data.telefono}">${data.telefono}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Código postal</td><td style="padding:8px;border:1px solid #ddd">${data.codigoPostal}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Servicio</td><td style="padding:8px;border:1px solid #ddd">${data.tipoServicio}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Urgencia</td><td style="padding:8px;border:1px solid #ddd">${data.urgencia}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Descripción</td><td style="padding:8px;border:1px solid #ddd">${data.descripcion}</td></tr>
        </table>
        <p style="color:#666;font-size:12px;margin-top:16px">Enviado desde anaidgrupo.com</p>
      `,
      text: `Nueva solicitud de proyecto\n\nNombre: ${data.nombre}\nTeléfono: ${data.telefono}\nEmail: ${data.email}\nCP: ${data.codigoPostal}\nServicio: ${data.tipoServicio}\nUrgencia: ${data.urgencia}\nDescripción: ${data.descripcion}`,
    });
  }
}
