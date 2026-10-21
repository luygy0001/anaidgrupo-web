# Firmas de email · Construcciones Anaid

Firmas para Outlook de la cuenta **info@construccionesanaid.com**, con los colores y los datos de
esta web. Generadas con la skill `firma-email-outlook`.

## Qué hay aquí

| Archivo | Para qué |
|---|---|
| `instalar-firmas.html` | **Empieza aquí.** Vista previa, botón «Copiar firma» y guía paso a paso. |
| `firmas/firma-completa.html` | Mensajes nuevos. |
| `firmas/firma-respuesta.html` | Respuestas y reenvíos (sin imágenes). |
| `firmas/firma-comercial.html` | Captación o promoción: añade la baja que exige la LSSI. |
| `firmas/portapapeles/` | Las mismas firmas con las tildes como `&#243;`, para pegarlas en Outlook sin que se rompan. |
| `firmas/firma-movil.txt` | Texto para la app de Outlook del móvil. |
| `imagenes/firma/` | Monograma e iconos. Van a `public/images/firma/` y se publican al desplegar. |
| `datos-firma.mjs` | Los datos. Es el único archivo que se edita. |
| `generar.mjs` · `generar-imagenes.mjs` | Generadores. No se tocan. |

## Cambiar algo

1. Edita `datos-firma.mjs`.
2. `node generar.mjs` (y `node generar-imagenes.mjs` si cambian el logo, los colores o las redes).
3. Abre `instalar-firmas.html`, copia la firma y sustitúyela en Outlook.

Los datos salen de `src/lib/constants.ts` y los colores de `src/app/globals.css`. Si allí cambia el
teléfono, el horario o una red, hay que cambiarlo también aquí.

## Decisiones

- **Firma institucional, sin nombre de persona:** `info@` es un buzón genérico.
- **La línea D. dice «Toda la Comunidad de Madrid»**, no la calle: `constants.ts` deja el domicilio
  solo para el aviso legal y la privacidad, y el pie de la web hace lo mismo.
- **Lleva una nota «Cómo trabajamos»** porque el aviso legal dice que Construcciones Anaid no es
  constructora ni ejecuta obras. La firma tiene que decir lo mismo que la web.
- **Logo:** monograma «CA» recortado de `public/images/logo.png`. El nombre va como texto, así se lee
  aunque el cliente bloquee las imágenes y aguanta el modo oscuro.
- **Esta carpeta está en `.dockerignore`:** no entra en la imagen de producción.

## Publicar las imágenes

A diferencia de Mandrinados (Hostinger), aquí las imágenes van **en el repositorio**: se copian a
`public/images/firma/` y se publican al desplegar con Dokploy. El panel lo explica en el paso 1.
