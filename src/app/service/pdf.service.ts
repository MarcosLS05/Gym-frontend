import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { IGrupocontrata } from '../model/grupocontrata.interface';
import { logoBase64 } from '../../../public/assets/img/logo-base64'; // Ajusta la ruta según tu estructura

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  generarPlanEntrenamiento(contrato: IGrupocontrata): void {
    const doc = new jsPDF();

    const fecha = new Date(contrato.creadoEn || '').toLocaleString();
    const usuario = contrato.usuario;
    const plan = contrato.planesentrenamiento;

    // Insertar logo
    doc.addImage(logoBase64, 'PNG', 80, 10, 50, 50);

    // Título
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Plan de Entrenamiento', 105, 70, { align: 'center' });

    // Datos del cliente
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cliente: ${usuario.nombre} ${usuario.apellido1}`, 20, 90);
    doc.text(`Email: ${usuario.email}`, 20, 98);
    doc.text(`Fecha de Creación: ${fecha}`, 20, 106);

    // Línea divisoria
    doc.line(20, 112, 190, 112);

    // Contenido del plan
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('Título del Plan:', 20, 122);
    doc.setFont('helvetica', 'normal');
    doc.text(plan.titulo, 20, 130);

    doc.setFont('helvetica', 'bold');
    doc.text('Dificultad:', 20, 140);
    doc.setFont('helvetica', 'normal');
    doc.text(plan.dificultad, 20, 148);

    doc.setFont('helvetica', 'bold');
    doc.text('Descripción:', 20, 158);
    doc.setFont('helvetica', 'normal');

    const lines = doc.splitTextToSize(plan.descripcion || 'No disponible', 170);
    doc.text(lines, 20, 166);

    // Guardar el PDF
    doc.save(`plan_${usuario.nombre}_${plan.titulo}.pdf`);
  }
}
