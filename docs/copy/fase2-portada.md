# Copy de la portada, fase 2: propuesta

- **Fecha:** 2026-10-06
- **Autor:** agente copywriter (manual de copywriting v1, referente Isra Bravo)
- **Estado:** propuesta para que Luis la revise. No se ha tocado ningún archivo de código.
- **Base:** decisiones de Luis del encargo y **corrección del mismo día**: el contrato de obra lo firma el **profesional autónomo asignado**, no Construcciones Anaid. Anaid analiza el proyecto, prepara el presupuesto, asigna al profesional de su red, coordina, hace el seguimiento y es el interlocutor del cliente.
- **Palabras vetadas en toda la propuesta:** «firmamos», «ejecutamos», «respondemos del plazo», «constructora», «obra realizada por Construcciones Anaid», «una única empresa responsable», «intermediación», «Anaid Grupo», «plazo garantizado de 30-60 días», precios y €/m².
- **Cómo leer las tablas:** en la columna «Propuesta», el texto entre `<span>…</span>` es la parte que hoy va resaltada en ámbar. Todo lo marcado **[DATO PENDIENTE DE LUIS]** no se publica hasta que Luis lo confirme.

---

## 1. `src/app/(es)/page.tsx`: metadata y JSON-LD

### Metadata

Aviso técnico: `src/app/layout.tsx` tiene `template: '%s · Construcciones Anaid'`. Si el `title` de la portada se deja como texto simple, la marca saldrá dos veces y pasará de 60 caracteres. Propuesta: usar `title: { absolute: '…' }` en la portada. Lo decide el proyecto.

| Campo | Actual | Propuesta |
|---|---|---|
| `title` (57 car.) | Reformas Integrales en Madrid (30-60 Días) \| Construcciones Anaid | Reformas en la Comunidad de Madrid \| Construcciones Anaid |
| `description` (153 car.) | Especialistas en reformas integrales y para inversores en Madrid y Alcalá de Henares con plazo cerrado de 30 a 60 días… | Reformas en toda la Comunidad de Madrid. Elige la calidad, recibe tu presupuesto en menos de 1 hora y sigue tu obra con fotos casi a diario por WhatsApp. |
| `openGraph.title` | Reformas Integrales en Madrid con Plazo Cerrado \| Construcciones Anaid | Reformas en Madrid con presupuesto en menos de 1 hora |
| `openGraph.description` | Reformas llave en mano con plazo garantizado de 30 a 60 días… | Elige la calidad de acabados, recibe tu presupuesto en menos de 1 hora y sigue tu obra con fotos casi a diario por WhatsApp. |
| `openGraph.images[0].alt` | Salón con concepto abierto reformado por Construcciones Anaid | Salón abierto de una obra de la red de Construcciones Anaid |
| `twitter.title` | Reformas Integrales en Madrid (30-60 Días) \| Construcciones Anaid | Reformas en la Comunidad de Madrid \| Construcciones Anaid |
| `twitter.description` | Reformas con plazo cerrado en 30-60 días y diseño para revalorizar tu vivienda. Presupuesto en 1h con IA. | Reformas en la Comunidad de Madrid. Presupuesto en menos de 1 hora y fotos de tu obra casi a diario por WhatsApp. |

### JSON-LD (`schemaData`)

| Campo | Actual | Propuesta |
|---|---|---|
| `alternateName` | Anaid Grupo Reformas | **Eliminar la línea.** Marca única: «Construcciones Anaid». |
| `description` del negocio | Empresa de reformas integrales y rehabilitación en la Comunidad de Madrid especializada en proyectos con plazo cerrado de 30 a 60 días… | Reformas integrales, de cocina y de baño en toda la Comunidad de Madrid. Construcciones Anaid prepara tu presupuesto en menos de 1 hora, te asigna al profesional adecuado de su red de arquitectos y oficios, coordina la obra y te envía fotos del avance casi a diario por WhatsApp. |
| Oferta 1, `name` | Reformas Integrales de Vivienda | Reforma integral de vivienda |
| Oferta 1, `description` | Reforma integral completa en Madrid con plazos cerrados de 30 a 60 días garantizados por contrato. | Reforma completa de vivienda en la Comunidad de Madrid con profesionales de la red de Construcciones Anaid y el plazo fijado en el contrato de obra. |
| Oferta 2, `name` | Reformas para Inversores y House Flipping | Reformas para inversores e inmobiliarias |
| Oferta 2, `description` | Reforma rápida con acabados neutros pensada para venta o alquiler. | Reformas en calidad media-baja o media para vender o alquilar, con presupuesto en menos de 1 hora. |
| Oferta 3, `name` | Cocinas de Diseño con Isla | Reforma de cocina |
| Oferta 3, `description` | Diseño e instalación de cocinas abiertas integradas con muebles a medida y encimeras de cuarzo. | Reforma de cocina: distribución, instalaciones y mobiliario, con la calidad de acabados que elijas. |
| Oferta 4, `name` | Baños en Suite con Microcemento | Reforma de baño |
| Oferta 4, `description` | Renovación de baños con ducha italiana, grifería termostática y acabados de lujo. | Reforma de baño: cambio de bañera por ducha, alicatado, sanitarios y grifería, con la calidad que elijas. |

Para que Luis decida (no son texto, pero afectan a lo que se afirma):
- `address` con Valdeavero: es dato estructurado, no visible, pero contradice «Valdeavero no aparece en la portada». **[DATO PENDIENTE DE LUIS]**: ¿se mantiene en el schema?
- `priceRange: '€€'`: es una pista de precio. Con la regla «nunca publicar precios», propongo quitarlo. **[DATO PENDIENTE DE LUIS]**
- `paymentAccepted: 'Transferencia bancaria, financiación'`: si el contrato es con el profesional, ¿a quién paga el cliente y hay financiación de verdad? **[DATO PENDIENTE DE LUIS]**
- `@type: HomeAndConstructionBusiness`: puede leerse como constructora. Consulta para el especialista Tech o Legal, no de copy.

---

## 2. `src/components/sections/Hero.tsx`

| Elemento | Actual | Propuesta |
|---|---|---|
| Badge | Presupuestos con IA en menos de 60 minutos | Presupuesto en menos de 1 hora |
| H1 | Reformas integrales con `<span>`plazo cerrado de 30 a 60 días`</span>` y diseño que revaloriza tu inmueble. | Reformas en la Comunidad de Madrid con `<span>`presupuesto en menos de 1 hora`</span>` y fotos de tu obra casi cada día. |
| Subtítulo | Coordinamos arquitectos, interioristas y oficios homologados en Madrid y zona centro. Recibe fotos y porcentaje de avance casi a diario en tu WhatsApp sin tener que perseguir a nadie. | Eliges la calidad de los acabados y te asignamos al profesional adecuado de nuestra red de arquitectos y oficios. Tú firmas con él; nosotros coordinamos y te mandamos el avance por WhatsApp. Sin perseguir a nadie. |
| Insignia 1 (reloj) | Obra en 30-60 días | Plazo fijado en contrato |
| Insignia 2 (escudo) | Precio cerrado por contrato | Un solo interlocutor |
| Insignia 3 (gráfica) | Especialistas en Inversores | También para inversores |
| Botón principal | Pedir Presupuesto en 1h | Pedir presupuesto gratis |
| Botón WhatsApp | WhatsApp | WhatsApp (sin cambio) |
| Texto junto al teléfono | Atención técnica directa: | ¿Prefieres hablar? |
| Nota final | (Sin compromiso) | (Sin compromiso) (sin cambio) |
| Tarjeta, cabecera | Galería de Acabados | Obras de nuestra red |
| Tarjeta, sello sobre la foto | Obra realizada por Construcciones Anaid | Obra de la red de Construcciones Anaid |
| Comentario del código (`// Obras reales de Construcciones Anaid…`) | — | Cambiar a «Obras reales de profesionales de la red de Construcciones Anaid», para que nadie lo vuelva a copiar mal. |

Notas:
- «Pedir presupuesto gratis» es verdad porque el primero lo es. La sección del formulario explica la regla de los 150 €.
- Se quita «Precio cerrado por contrato»: con el contrato firmado por el profesional, no consta quién cierra el precio ni si coincide con el presupuesto de 1 hora. **[DATO PENDIENTE DE LUIS]**
- Títulos y subtítulos de las 4 diapositivas (salón, cocina, baño, suite): describen lo que se ve y no afirman nada falso. Sin cambio.
- Si el chalet de fondo (`chalet-moderno-noche.jpg`) no es obra de la red, que no lleve ningún texto que lo sugiera. Hoy no lo lleva. **[DATO PENDIENTE DE LUIS]**: ¿es obra real?

---

## 3. `src/components/sections/InvestorSection.tsx`

### Cabecera

| Elemento | Actual | Propuesta |
|---|---|---|
| Badge | Canal Especializado: Inversores e Inmobiliarias | Inversores e inmobiliarias |
| H2 | Reformas concebidas para `<span>`maximizar la rentabilidad`</span>` de compra, reforma y venta. | Reformas pensadas para `<span>`vender o alquilar antes`</span>`. |
| Entradilla | En inversión inmobiliaria, el tiempo es el mayor enemigo del margen de beneficio. Diseñamos y ejecutamos reformas exprés en 30-60 días… | Cada mes de obra es un mes sin vender ni alquilar. Por eso tienes el presupuesto en menos de 1 hora y el plazo fijado en contrato. Por experiencia, la mayoría de obras no pasan de 60 días. |

### Tarjeta de inversores

| Elemento | Actual | Propuesta |
|---|---|---|
| Etiqueta | Para Inversores Privados y Fondos | Para inversores |
| H3 | House Flipping & Alquiler de Alta Rentabilidad | Compras, reformas y vendes o alquilas |
| Párrafo | Comprar un piso antiguo, reformarlo en tiempo récord y venderlo con una plusvalía atractiva… | Ves un piso para reformar. Antes de hacer la oferta, ya sabes cuánto te costará la obra. Eliges calidad media-baja o media, la que pide el comprador o el inquilino al que vas. |
| Viñeta 1 | **Plazo garantizado de 30 a 60 días**: Un mes menos de obra ahorra intereses bancarios y acelera la venta. | **Presupuesto en menos de 1 hora**: decides la compra con el coste de la obra delante. |
| Viñeta 2 | **Interiorismo neutro y vendedor**: Distribuciones abiertas, luz natural y acabados modernos que destacan en portales. | **Plazo fijado en contrato**: lo firmas con el profesional asignado. La mayoría de obras no pasan de 60 días. |
| Viñeta 3 | **Presupuesto cerrado sin sorpresas**: Cuidamos cada euro para no mermar tu retorno sobre la inversión (ROI). | **Un presupuesto gratis cada semana**: para comparar varias compras sin pagar por mirar. Los siguientes, 150 €. |
| Botón | Calcular Rentabilidad de mi Próxima Compra | Pedir presupuesto de mi próxima compra |

### Tarjeta de inmobiliarias

| Elemento | Actual | Propuesta |
|---|---|---|
| Etiqueta | Alianza B2B con Agencias Inmobiliarias | Para inmobiliarias |
| H3 | Desbloquea ventas con compradores indecisos | Que la obra no frene la venta |
| Párrafo | Muchos compradores dudan ante una vivienda para reformar porque no saben cuánto les costará la obra. Te damos la cifra técnica en 24h para cerrar la operación. | Tu comprador duda porque no sabe cuánto le costará reformar. Con un presupuesto en menos de 1 hora, sale de la duda el mismo día y la operación sigue viva. |
| Viñeta 1 | **Valoración exprés en menos de 24 horas**: Acompañamos a tu cliente o evaluamos con fotos para dar un número seguro. | **Presupuesto en menos de 1 hora**: con los datos de la vivienda que nos pases. |
| Viñeta 2 | **La operación no se cae por la obra**: Tu cliente compra con tranquilidad al tener presupuesto y plazos cerrados. | **Calidad media-baja**: la cifra realista que tu comprador necesita para decidir. |
| Viñeta 3 | **Acuerdos de colaboración continua**: Sinergias transparentes y soporte técnico para tu cartera de clientes. | **Un presupuesto gratis cada semana**: los siguientes, 150 €. Si colaboras con frecuencia, hablamos. [DATO PENDIENTE DE LUIS: ¿hay acuerdo o comisión para inmobiliarias?] |
| Botón | Proponer Colaboración por WhatsApp | Proponer colaboración por WhatsApp |

---

## 4. `src/components/sections/AIExplainer.tsx`

| Elemento | Actual | Propuesta |
|---|---|---|
| Badge | Tecnología PyMExpert aplicada a la construcción | Con tecnología de PyMExpert |
| H2 | Una constructora donde `<span>`no tienes que perseguir`</span>` al jefe de obra. | Una reforma en la que `<span>`no tienes que perseguir`</span>` a nadie. |
| Entradilla | Eliminamos de raíz los dos grandes dolores de una reforma… | Lo que más quema de una reforma: esperar semanas un presupuesto y no saber cómo va la obra. Aquí tienes el número en menos de 1 hora y el avance en tu móvil. |

### Los 3 pilares

| Pilar | Campo | Actual | Propuesta |
|---|---|---|---|
| 1 | Título | Presupuesto paramétrico en menos de 1 hora | Presupuesto en menos de 1 hora |
| 1 | Texto | Mediante nuestro sistema de IA entrenado con precios de obra en la Comunidad de Madrid… | Rellenas el formulario, nos cuentas tu obra y eliges la calidad de los acabados. Una automatización prepara el presupuesto y te lo enviamos. No ves tablas de precios: solo eliges calidad. |
| 1 | Remate | Sin esperas ni presupuestos inflados | Sin esperar semanas |
| 2 | Título | Reporte diario con fotos directo a tu WhatsApp | Fotos de tu obra casi cada día |
| 2 | Texto | Se acabó desplazarte a la obra o perseguir al contratista por teléfono… | Estás en el trabajo y te vibra el móvil: fotos de cómo avanza tu cocina. No tienes que pasarte por la obra ni llamar a nadie para saber cómo va. |
| 2 | Remate | Transparencia absoluta en tu móvil | Todo en tu WhatsApp |
| 3 | Título | Cronograma estricto en 30 a 60 días | Plazo fijado en contrato |
| 3 | Texto | Arquitectos e interioristas coordinan cada gremio… | Te asignamos al profesional adecuado de nuestra red y firmas con él el contrato, con el plazo por escrito. Nosotros coordinamos y te acompañamos hasta el final. Por experiencia, la mayoría de obras no pasan de 60 días. |
| 3 | Remate | Plazos garantizados por contrato | Un solo interlocutor: nosotros |

| Elemento | Actual | Propuesta |
|---|---|---|
| Enlace | Cómo usamos la IA para analizar tu proyecto | Cómo preparamos tu presupuesto en menos de 1 hora |
| Banner, título | ¿Tienes una vivienda que necesitas valorar hoy mismo? | ¿Quieres saber hoy cuánto cuesta reformar tu casa? |
| Banner, texto | Envíanos zona, m² y fotos aproximadas por WhatsApp y recibe estimación en 1 hora. | Escríbenos por WhatsApp con el municipio, los metros y unas fotos. Te decimos el siguiente paso. |
| Banner, botón | Valorar mi reforma por WhatsApp | Escribir por WhatsApp |

Nota: el banner ya no promete «estimación en 1 hora» por WhatsApp, porque lo que es seguro es la automatización del formulario. **[DATO PENDIENTE DE LUIS]**: si por WhatsApp también se da en 1 hora, se puede volver a decir.

---

## 5. `src/lib/constants.ts`

### `SERVICES` (orden propuesto: particulares primero, que son el público principal)

**Tarjeta 1 · `reforma-integral-vivienda`**
- `title`: Reforma Integral de Viviendas → **Reforma integral de vivienda**
- `badge`: Llave en mano → **Todo coordinado**
- `description`: Transformación total de tu hogar coordinando arquitectos… → **Toda tu casa de una vez. Te asignamos arquitecto y oficios de nuestra red: albañilería, fontanería, electricidad, climatización y pintura. Tú hablas solo con nosotros.**
- `features`: → **'Fotos del avance por WhatsApp'**, **'Plazo fijado en contrato'**, **'Calidad media-baja, media o alta'**
  (se quitan «Presupuesto cerrado sin imprevistos» y «Gestión de licencias y dirección técnica» hasta que Luis confirme quién lo hace: **[DATO PENDIENTE DE LUIS]**)

**Tarjeta 2 · `reforma-cocina-bano`**
- `title`: Cocinas y Baños de Diseño → **Reforma de cocina y baño**
- `badge`: Alta calidad → **Lo que más se usa**
- `description`: Modernización de los dos espacios que más valor aportan… → **Las dos estancias que más usas cada día. Distribución, instalaciones, alicatado y mobiliario, con un profesional de cada oficio y la calidad que elijas.**
- `features`: → **'Presupuesto en menos de 1 hora'**, **'Un profesional para cada oficio'**, **'Fotos del avance por WhatsApp'**
  (se quita «Diseño 3D previo»: **[DATO PENDIENTE DE LUIS]**, ¿se ofrece de verdad?)

**Tarjeta 3 · `reformas-inversores-madrid`**
- `title`: Reformas para Inversores (Flipping) → **Reformas para inversores**
- `badge`: Máximo ROI → **Para vender o alquilar**
- `description`: Reformas integrales en plazo récord (30-60 días)… → **Pisos para vender o alquilar, en calidad media-baja o media. Sabes cuánto cuesta la obra antes de comprar. El plazo, fijado en el contrato.**
- `features`: → **'Presupuesto en menos de 1 hora'**, **'Plazo fijado en contrato'**, **'1 presupuesto gratis cada semana'**

**Tarjeta 4 · `reformas-inmobiliarias-madrid`**
- `title`: Colaboración con Inmobiliarias → **Para inmobiliarias**
- `badge`: Partner B2B → **Colaboración**
- `description`: Ayudamos a las inmobiliarias a desbloquear ventas… → **Tu comprador duda por la obra. Le damos un presupuesto en calidad media-baja en menos de 1 hora para que decida con un número delante.**
- `features`: → **'Calidad media-baja, cifra realista'**, **'Rápido, para no enfriar la venta'**, **'1 presupuesto gratis cada semana'**
  (se quita «Sinergia y comisiones de colaboración»: **[DATO PENDIENTE DE LUIS]**)

### `FAQS`

Van también al JSON-LD (`FAQPage`), así que cada respuesta tiene que poder leerse sola.

1. **¿Quién firma el contrato de obra?**
   Lo firmas directamente con el profesional que hace tu obra, elegido de nuestra red para tu caso. Él hace el trabajo y se compromete al plazo por escrito. Construcciones Anaid prepara el presupuesto, te asigna a ese profesional, coordina la obra y te acompaña hasta el final. Tienes trato directo con quien trabaja en tu casa y, a la vez, a alguien que sigue la obra contigo: tu interlocutor siempre somos nosotros.

2. **¿Cómo tengo el presupuesto en menos de 1 hora?**
   Rellenas el formulario, nos cuentas qué quieres reformar y eliges la calidad de los acabados. Una automatización, con tecnología de PyMExpert, prepara el presupuesto con esos datos y te lo enviamos. No tienes que esperar semanas para tener un primer número.

3. **¿Qué calidades de acabado puedo elegir?**
   Hay tres: media-baja, media y alta. Si eres particular, eliges cualquiera de las tres. Si eres inversor, media-baja o media. Si eres inmobiliaria, el presupuesto se hace en media-baja. No tienes que comparar precios: eliges la calidad y el presupuesto se calcula con ella. [DATO PENDIENTE DE LUIS: una frase por calidad con ejemplos de lo que incluye.]

4. **¿Cuánto dura una obra?**
   Depende del tamaño y de la dificultad. El plazo queda fijado en el contrato que firmas con el profesional asignado, antes de empezar. Por experiencia, la mayoría de obras no pasan de 60 días.

5. **¿Cuánto cuesta pedir presupuesto?**
   El primero es gratis. Los siguientes cuestan 150 €. Si eres inversor o inmobiliaria, tienes uno gratis cada semana. Cada presupuesto lleva trabajo de verdad, y así podemos responder rápido a todos.

6. **¿Cómo sé cómo va mi obra si no puedo ir?**
   Por WhatsApp. Casi cada día te mandamos fotos del avance. No tienes que pasarte por la obra ni llamar a nadie para saber cómo va.

7. **¿En qué zonas trabajáis?**
   En toda la Comunidad de Madrid, en la capital y en cualquier municipio. Pon el tuyo en el formulario y te asignamos un profesional de nuestra red.

Se quitan: la FAQ de «partner ideal para house flipping» (queda cubierta por la sección de inversores y por la 3 y la 5), la mención a Valdeavero y las provincias limítrofes (Guadalajara y Toledo). **[DATO PENDIENTE DE LUIS]**: ¿se trabaja fuera de la Comunidad? Si no, mejor que no aparezca.

### `WHATSAPP_URL` (texto del mensaje)

- Actual: «Hola, quiero solicitar un presupuesto en menos de 1 hora para una reforma con Construcciones Anaid»
- Propuesta: «Hola, quiero pedir presupuesto para una reforma en la Comunidad de Madrid.»
- Codificado, listo para pegar tras `?text=`:
  `Hola%2C%20quiero%20pedir%20presupuesto%20para%20una%20reforma%20en%20la%20Comunidad%20de%20Madrid.`

### Fuera de encargo, pero choca con las decisiones

- `EMAIL` vale `contacto@construccionesanaid.com`; el correo público decidido es `info@construccionesanaid.com`.
- `INTERMEDIATION_DISCLAIMER` y `COVERAGE_AREA` («Madrid, Alcalá de Henares y Zona Centro») y el `default` del title en `layout.tsx` («profesionales validados») no los toco, pero conviene revisarlos con esta misma lógica.

---

## 6. `src/components/sections/ServicesGrid.tsx`: cabecera

| Elemento | Actual | Propuesta |
|---|---|---|
| Badge | Especialidades Técnicas | Qué hacemos |
| H2 | Soluciones integrales coordinadas por `<span>`arquitectos y técnicos`</span>`. | Tu obra, con `<span>`arquitectos y oficios`</span>` de nuestra red. |
| Entradilla | Centralizamos la dirección facultativa y la ejecución de cada oficio. Una única empresa responsable, un solo interlocutor y plazos auditados. | Te asignamos al profesional adecuado para cada trabajo y coordinamos la obra contigo. Un solo interlocutor de principio a fin. |
| Botón de tarjeta | Pedir presupuesto para este servicio | Pedir presupuesto para este servicio (sin cambio) |
| Enlace final | Ver todos los servicios: cocina, baño, electricidad, fontanería y más | Ver todos los servicios: cocina, baño, electricidad, fontanería y más (sin cambio) |

## 7. `src/components/sections/GallerySection.tsx`: cabecera y tarjetas

| Elemento | Actual | Propuesta |
|---|---|---|
| Badge | Obras y Transformaciones Reales | Obras reales de nuestra red |
| H2 | Espacios pensados para `<span>`vivir con orgullo`</span>` o vender con plusvalía. | Así quedan las casas con `<span>`profesionales de nuestra red`</span>`. |
| Entradilla | Cuidamos la iluminación natural, la nobleza de los materiales y la pureza de líneas… | Obras reales de profesionales de la red de Construcciones Anaid. Si te gusta alguna, pide una parecida y te decimos cuánto costaría en tu casa. |
| Botón WhatsApp | Pide más fotos de obras por WhatsApp | Pide más fotos de obras por WhatsApp (sin cambio) |
| Pie de tarjeta | Obra llave en mano | Obra de nuestra red |
| Enlace de tarjeta | Pedir similar | Quiero una así |
| `alt` de la foto de fondo | Salón de lujo a dos alturas … reformado por Construcciones Anaid | Salón a dos alturas con escalera volada de madera y barandilla de vidrio, obra de la red de Construcciones Anaid |
| Comentario del código | Obras reales de Construcciones Anaid… | Obras reales de profesionales de la red de Construcciones Anaid. Pendiente: lugar y plazo de cada una. |

Títulos y descripciones de las 3 obras: describen lo que se ve. Sin cambio. Lugar y plazo siguen vacíos: **[DATO PENDIENTE DE LUIS]**.

---

## 8. `src/components/sections/CTASection.tsx`: formulario

### Cabecera

| Elemento | Actual | Propuesta |
|---|---|---|
| Badge | Presupuesto con IA en menos de 1 hora | Presupuesto en menos de 1 hora |
| H2 por defecto | Pide tu presupuesto sin esperas ni rodeos. | Pide tu presupuesto. El primero es gratis. |
| Entradilla por defecto | Selecciona tu perfil, cuéntanos brevemente tu proyecto y te enviamos una estimación técnica realista directamente a tu móvil. | Dinos quién eres, elige la calidad de los acabados y cuéntanos tu obra. Te mandamos el presupuesto al móvil. |

### Perfiles (propuesta: «Particular» primero y seleccionado por defecto; hoy lo está «Inversor»)

| Actual | Propuesta |
|---|---|
| Soy Inversor (Flipping / Rentas) | Soy inversor |
| Soy Inmobiliaria (Alianza B2B) | Soy inmobiliaria |
| Soy Particular | Soy particular |

### Calidad de acabados (campo nuevo: hoy el formulario no lo tiene; lo implementa el proyecto)

- Etiqueta: **Calidad de los acabados \***
- Ayuda bajo la etiqueta: **No ves precios: eliges la calidad y el presupuesto se calcula con ella.**
- Opciones según perfil:
  - Particular: **Media-baja** · **Media** · **Alta**
  - Inversor: **Media-baja** · **Media**
  - Inmobiliaria: sin selector, texto fijo: **Para inmobiliarias, el presupuesto se hace en calidad media-baja.**
- Una línea bajo cada opción explicando qué incluye: **[DATO PENDIENTE DE LUIS]**.

### Campos

| Actual | Propuesta |
|---|---|
| Nombre completo \* | Nombre \* |
| Teléfono móvil / WhatsApp \* | Móvil (WhatsApp) \* |
| Email (opcional para recibir PDF) | Correo (opcional, para recibirlo también en PDF) |
| Zona o Municipio (Madrid / alrededores) \* | Municipio de la obra \* |
| Placeholder municipio: Ej. Alcalá de Henares, Pozuelo, Madrid Centro... | Ej. Móstoles, Alcalá de Henares, Madrid centro… |
| ¿Qué tipo de reforma o inmueble necesitas intervenir? | ¿Qué quieres reformar? |
| Placeholder: Ej. Piso de 85 m² para reformar integralmente en 40 días antes de poner en alquiler… | Ej. Piso de 85 m². Reforma completa: cocina abierta, dos baños y aire acondicionado. |

### Aviso de los 150 € (justo encima del botón, letra pequeña pero legible, nunca escondido)

- Particular: **Tu primer presupuesto es gratis. Si después necesitas otro, cuesta 150 €.**
- Inversor e inmobiliaria: **Tienes un presupuesto gratis cada semana. Los siguientes de esa semana cuestan 150 €.**
- Si el proyecto prefiere un único texto para todos: **El primer presupuesto es gratis. Los siguientes cuestan 150 € (inversores e inmobiliarias: uno gratis cada semana).**

**[DATO PENDIENTE DE LUIS]**: ¿cambiar la calidad o los metros del mismo presupuesto cuenta como uno nuevo? ¿Y cómo y cuándo se cobran los 150 €? Sin esto, el aviso puede generar dudas.

### Botón, envío y pie

| Elemento | Actual | Propuesta |
|---|---|---|
| Botón | Solicitar Presupuesto Estimado en 1 Hora | Pedir mi presupuesto |
| Mientras envía | Procesando con IA y validando... | Preparando tu presupuesto… |
| Pie de privacidad | 🔒 Formulario blindado: tus datos viajan cifrados bajo HTTPS y RGPD. | Usamos tus datos solo para preparar y enviarte el presupuesto. (Que lo confirme el especialista Legal; propongo quitar el emoji y «blindado».) |
| Enlace teléfono | Llamar directo: 640 962 564 | Llamar directo: 640 962 564 (sin cambio) |

### Mensaje de éxito

| Elemento | Actual | Propuesta |
|---|---|---|
| Título | ¡Solicitud recibida y protegida con éxito! | Recibido. Ya estamos con tu presupuesto. |
| Texto | Nuestro sistema de IA y equipo técnico ya están procesando tus datos… en menos de 60 minutos. | Te lo enviamos por WhatsApp en menos de 1 hora, en horario de atención [CONFIRMAR LUIS: lunes a viernes, de 8:30 a 19:30]. Si lo has pedido fuera de ese horario, te llega el siguiente día laborable. [CONFIRMAR LUIS: ¿la automatización funciona 24 horas? Si es así, se quita la segunda frase.] |
| Botón 1 | Agilizar por WhatsApp | Escribirnos por WhatsApp |
| Botón 2 | Llamar al 640 962 564 | Llamar al 640 962 564 (sin cambio) |

---

## 9. `src/components/layout/Footer.tsx`: párrafo de marca

- Actual: «Reformas integrales con plazo cerrado en 30-60 días y diseño pensado para revalorizar tu vivienda o maximizar tu rentabilidad como inversor. En Madrid y zona centro.»
- Propuesta: **Reformas en toda la Comunidad de Madrid. Te asignamos al profesional adecuado de nuestra red, coordinamos la obra y te mandamos el avance casi a diario por WhatsApp.**

---

## Cierre

### (1) Lista de [DATO PENDIENTE DE LUIS]

1. ¿Quién fija el precio final y coincide con el presupuesto de 1 hora? ¿Es un presupuesto definitivo o hace falta visita antes del contrato? (afecta a «precio cerrado», que se ha retirado)
2. Si una obra necesita varios oficios, ¿firma un solo profesional principal o varios contratos? (afecta a la FAQ 1)
3. Qué hace Construcciones Anaid si el profesional no cumple el plazo: ¿media, sustituye, nada? (para reforzar la FAQ 1 sin prometer de más)
4. Qué incluye cada calidad (media-baja, media, alta): una línea con ejemplos.
5. Regla de los 150 €: ¿una modificación del mismo presupuesto cuenta como nuevo? ¿Cómo y cuándo se cobra?
6. Horario real de la automatización: ¿«en menos de 1 hora» siempre, o solo en horario de atención?
7. ¿Por WhatsApp también se da presupuesto en 1 hora? (banner de AIExplainer)
8. ¿Hay acuerdo de colaboración o comisión para inmobiliarias?
9. ¿Se gestionan licencias y dirección técnica? ¿Se ofrece diseño 3D previo?
10. ¿Se trabaja fuera de la Comunidad de Madrid (Guadalajara, Toledo)?
11. Lugar y plazo de cada obra de la galería. ¿El chalet del fondo del Hero es obra de la red?
12. Schema: ¿se mantiene la dirección de Valdeavero, `priceRange` y «financiación» en `paymentAccepted`?
13. Correo: `EMAIL` en `constants.ts` es `contacto@`; lo decidido es `info@`.

### (2) Opciones de title y meta description

Titles (con `title.absolute` para que la plantilla no duplique la marca):

| # | Title | Car. |
|---|---|---|
| A | Reformas en la Comunidad de Madrid \| Construcciones Anaid | 57 |
| B | Reformas integrales en Madrid \| Construcciones Anaid | 52 |
| C | Reformas en Madrid con presupuesto en menos de 1 hora | 53 |

Meta descriptions:

| # | Description | Car. |
|---|---|---|
| A | Reformas en toda la Comunidad de Madrid. Elige la calidad, recibe tu presupuesto en menos de 1 hora y sigue tu obra con fotos casi a diario por WhatsApp. | 153 |
| B | Reformas en Madrid con presupuesto en menos de 1 hora y fotos de tu obra casi a diario por WhatsApp. Tú eliges la calidad; nosotros, el profesional adecuado. | 157 |
| C | Reformas integrales, cocinas y baños en la Comunidad de Madrid. Presupuesto en menos de 1 hora, plazo fijado por contrato y fotos de tu obra casi a diario. | 155 |

Recomendación: title A con description A.

### (3) Decisiones de copy y por qué

- **Estructura AIDA con la prueba en su sitio** (ficha AIDA; manual, criterio 8): atención con el H1 de 1 hora, interés con los pilares, deseo con las escenas, prueba con las obras reales y acción en el formulario. No hay testimonios ni cifras: no existen, y no se inventan (manual, principio 8).
- **Beneficio en escena, no afirmado** (ficha venta lateral): «estás en el trabajo y te vibra el móvil», «ves un piso y antes de ofertar ya sabes cuánto cuesta la obra». La aplicación a servicios es por analogía y, por tanto, criterio propio (manual, criterio 9).
- **La única tensión de compra real es «el primero es gratis»** (ficha tensión de compra): se usa en el botón y en el formulario, con los 150 € dichos claro. No hay plazo ni plazas limitadas reales, así que no se fabrican (manual, principio 3).
- **El modelo nuevo se cuenta como ventaja**, no se esconde: «tú firmas con él; nosotros coordinamos». Postura clara sin hype ni superlativos (manual, principios 8 y 13); lenguaje de chaval de 12 años, sin «paramétrico», «B2B», «ROI» ni «flipping» (manual, principio 1).

**Lo que el manual no cubre:** titulares y H1 no tienen ficha propia (manual, «Lo que no cubre»); todos los titulares de esta propuesta son criterio propio. Tampoco hay ficha sobre SEO ni sobre cómo comunicar un modelo de coordinación sin ser el contratista.
