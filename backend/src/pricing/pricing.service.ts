import { Injectable } from '@nestjs/common';

export interface PriceRange {
  servicio: string;
  rango: string;
  nota: string;
}

@Injectable()
export class PricingService {
  getRanges(): PriceRange[] {
    return [
      { servicio: 'Reforma integral', rango: '400 – 1.200 €/m²', nota: 'Según alcance y acabados' },
      { servicio: 'Reforma de baño', rango: '3.000 – 10.000 €', nota: 'Según tamaño y materiales' },
      { servicio: 'Reforma de cocina', rango: '5.000 – 15.000 €', nota: 'Según diseño y electrodomésticos' },
      { servicio: 'Electricista', rango: '50 – 150 €/hora', nota: 'Según tipo de intervención' },
      { servicio: 'Fontanero', rango: '50 – 120 €/hora', nota: 'Según urgencia y complejidad' },
      { servicio: 'Climatización', rango: '1.000 – 5.000 €', nota: 'Según equipo y habitaciones' },
    ];
  }
}
