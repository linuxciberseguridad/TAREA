import {jsPDF} from 'jspdf';
import {ASSETS, COMPANY_INFO, TourPackage} from './roatan-data';

export interface ReservationPdfData {
  code: string;
  packageData: TourPackage;
  schedule: string;
  guests: number;
  isLocal: boolean;
  unitPriceFormatted: string;
  originalUnitFormatted: string;
  totalFormatted: string;
  savingsFormatted: string;
  pickup: string;
  date: string;
  name: string;
  contact: string;
  notes?: string;
}

async function loadImageAsDataUrl(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 300;
          canvas.height = img.naturalHeight || 300;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(null);
            return;
          }
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.92));
        } catch {
          resolve(null);
        }
      };
      img.onerror = () => resolve(null);
      img.src = src;
    } catch {
      resolve(null);
    }
  });
}

export async function generateReservationPdf(
  data: ReservationPdfData
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Top Header Banner (Teal #115E59)
  doc.setFillColor(17, 94, 89);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Try embedding the official Roatán Auténtica logo
  const logoDataUrl = await loadImageAsDataUrl(ASSETS.logo);
  if (logoDataUrl) {
    doc.setFillColor(250, 248, 245);
    doc.circle(26, 21, 14, 'F');
    doc.addImage(logoDataUrl, 'JPEG', 13, 8, 26, 26);
  }

  const headerTextX = logoDataUrl ? 45 : 16;

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('ROATAN AUTENTICA', headerTextX, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(253, 230, 138);
  doc.text(COMPANY_INFO.slogan, headerTextX, 24.5);

  doc.setTextColor(229, 231, 235);
  doc.setFontSize(8.5);
  doc.text(
    'Turismo Cultural, Ecologico y Gastronomico | Roatan, Islas de la Bahia',
    headerTextX,
    31
  );

  // Reservation Code Box on Top Right
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(pageWidth - 62, 10, 48, 22, 2, 2, 'F');
  doc.setTextColor(87, 83, 78);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('CODIGO DE RESERVA', pageWidth - 38, 17, {align: 'center'});

  doc.setTextColor(17, 94, 89);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11.5);
  doc.text(data.code, pageWidth - 38, 25, {align: 'center'});

  let y = 52;

  // Title
  doc.setTextColor(28, 25, 23);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('COMPROBANTE OFICIAL DE RESERVACION TURISTICA', 16, y);

  y += 5;
  doc.setDrawColor(214, 211, 209);
  doc.setLineWidth(0.4);
  doc.line(16, y, pageWidth - 16, y);

  // Section 1: Datos del Titular y Salida
  y += 8;
  doc.setFillColor(250, 248, 245);
  doc.roundedRect(16, y, pageWidth - 32, 36, 2, 2, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(17, 94, 89);
  doc.text('1. DATOS DEL VISITANTE Y PUNTO DE ENCUENTRO', 21, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(68, 64, 60);

  doc.text(`Titular de la Reserva: ${data.name}`, 21, y + 15);
  doc.text(`Contacto (Tel / Email): ${data.contact}`, 21, y + 22);
  doc.text(`Punto de Salida (9:00 AM): ${data.pickup}`, 21, y + 29);

  doc.text(`Fecha del Tour: ${data.date}`, pageWidth - 78, y + 15);
  doc.text(`Horario Oficial: ${data.schedule}`, pageWidth - 78, y + 22);
  doc.text(
    `Pasajeros: ${data.guests} ${data.guests === 1 ? 'persona' : 'personas'}`,
    pageWidth - 78,
    y + 29
  );

  // Section 2: Detalles del Paquete Seleccionado
  y += 44;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(17, 94, 89);
  doc.text(
    `2. PAQUETE SELECCIONADO (${data.packageData.numberLabel.toUpperCase()})`,
    16,
    y
  );

  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(28, 25, 23);
  doc.text(data.packageData.title, 16, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(87, 83, 78);
  const summaryLines = doc.splitTextToSize(
    `Descripcion: ${data.packageData.itinerarySummary}`,
    pageWidth - 32
  );
  doc.text(summaryLines, 16, y);
  y += summaryLines.length * 4.5 + 3;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(28, 25, 23);
  doc.text(`Incluye: `, 16, y);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${data.packageData.includes} (Cupo diario est.: ${data.packageData.dailyCapacity} clientes)`,
    32,
    y
  );

  // Itinerary Stops Table
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(17, 94, 89);
  doc.text('CRONOGRAMA DEL RECORRIDO (9:00 AM - 2:00 PM):', 16, y);

  y += 4;
  for (const stop of data.packageData.stops) {
    y += 4;
    doc.setFillColor(245, 245, 244);
    doc.roundedRect(16, y - 3.5, pageWidth - 32, 13, 1.5, 1.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(17, 94, 89);
    doc.text(stop.order, 20, y + 1.5);

    doc.setTextColor(28, 25, 23);
    doc.text(stop.place, 40, y + 1.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(87, 83, 78);
    const stopDesc = doc.splitTextToSize(stop.description, pageWidth - 62);
    doc.text(stopDesc[0] || '', 40, y + 6.5);
    y += 11;
  }

  if (data.notes && data.notes.trim().length > 0) {
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(28, 25, 23);
    doc.text('Notas / Preferencias del Visitante:', 16, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(87, 83, 78);
    const notesLines = doc.splitTextToSize(data.notes.trim(), pageWidth - 32);
    doc.text(notesLines, 16, y + 4.5);
    y += notesLines.length * 4 + 4;
  }

  // Section 3: Desglose de Tarifa y Descuento Local (10%)
  y += 6;
  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(17, 94, 89);
  doc.setLineWidth(0.3);
  doc.roundedRect(16, y, pageWidth - 32, 34, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(17, 94, 89);
  doc.text('3. RESUMEN DE TARIFA Y DESCUENTO APLICADO', 21, y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(41, 37, 36);
  doc.text(
    `Tipo de Tarifa: ${
      data.isLocal
        ? 'Tarifa Persona Local (10% de Descuento Oficial Aplicado)'
        : 'Tarifa Estandar Visitante / Crucero'
    }`,
    21,
    y + 14
  );

  doc.text(
    `Precio Unitario por Persona: ${data.unitPriceFormatted}${
      data.isLocal ? ` (Precio regular: ${data.originalUnitFormatted})` : ''
    }`,
    21,
    y + 20.5
  );

  if (data.isLocal) {
    doc.setTextColor(17, 94, 89);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `Ahorro Total por Descuento Local (10%): -${data.savingsFormatted}`,
      21,
      y + 27
    );
  } else {
    doc.setTextColor(87, 83, 78);
    doc.text(
      'Recuerda: Personas locales cuentan con 10% de descuento presentando identificacion.',
      21,
      y + 27
    );
  }

  // Total Box right side
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(87, 83, 78);
  doc.text('TOTAL A PAGAR:', pageWidth - 22, y + 14, {align: 'right'});

  doc.setFontSize(16);
  doc.setTextColor(17, 94, 89);
  doc.text(data.totalFormatted, pageWidth - 22, y + 23, {align: 'right'});

  // Footer
  const footerY = 276;
  doc.setDrawColor(214, 211, 209);
  doc.line(16, footerY - 5, pageWidth - 16, footerY - 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(28, 25, 23);
  doc.text(
    'Roatan Autentica — Redescubre tu tierra, enamorate de lo nuestro.',
    pageWidth / 2,
    footerY,
    {align: 'center'}
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 113, 108);
  doc.text(
    'Valores: Compromiso, responsabilidad, honestidad, amabilidad y pasion por el turismo.',
    pageWidth / 2,
    footerY + 4.5,
    {align: 'center'}
  );
  doc.text(
    'Presenta este comprobante PDF a tu guia de Roatan Autentica en el punto de salida a las 9:00 AM.',
    pageWidth / 2,
    footerY + 9,
    {align: 'center'}
  );

  doc.save(`Reserva-Roatan-Autentica-${data.code}.pdf`);
}
