import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../../model/usuario.interface';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { CommonModule } from '@angular/common';
import { IGrupocontrata } from '../../../model/grupocontrata.interface';
import { IPage } from '../../../model/model.interface';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
import { BotoneraService } from '../../../service/botonera.service';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { debounceTime, Subject } from 'rxjs';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { SessionService } from '../../../service/session.service';
import { PdfService } from '../../../service/pdf.service';
import { FormsModule } from '@angular/forms';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MensajeService } from '../../../service/mensaje.service';
import { EnviarMensajeDTO } from '../../../model/EnviarMensajeDTO.interface';
import { IMensaje } from '../../../model/mensaje.interface';
@Component({
  selector: 'app-shared.byemail.routed',
  templateUrl: './shared.byemail.routed.component.html',
  styleUrls: ['./shared.byemail.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],

})
export class SharedByemailRoutedComponent implements OnInit {
  strRuta: string = '';
  usuarioID: number = 0;
  email: string = "";
contenidoMensajeMap: { [id: number]: string } = {};
mostrarInputMap: { [id: number]: boolean } = {};
  oUsuario: IUsuario = {} as IUsuario;
  modalImage: string = '';
  selectedTab: string = 'planes'; 
  mensajes: any[] = []; 
  mensajesRecibidos: IMensaje[] = [];
  respuestasMap: { [mensajeId: number]: string } = {};

   oPage: IPage<IGrupocontrata> | null = null;
    //
    nPage: number = 0; // 0-based server count
    nRpp: number = 6;
    //
    strField: string = '';
    strDir: string = '';
    //
    strFiltro: string = '';
    //
    arrBotonera: string[] = [];
    //
  private debounceSubject = new Subject<string>();

constructor(
  private oActivatedRoute: ActivatedRoute, 
  private oUsuarioService: UsuarioService,
  private oPlanesentrenamientoService: PlanesentrenamientoService,
  private oBotoneraService: BotoneraService,
  private oMensajeService: MensajeService,
  private oGcontrataService: GrupocontrataService,
  private oRouter: Router,
  private oSessionService: SessionService,
  private oPdfService: PdfService
) {


  this.oRouter.events.subscribe((oEvent) => {
    if (oEvent instanceof NavigationEnd) {
      this.strRuta = oEvent.url;
    }
  });
  this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
    this.getPage();
  });
}


ngOnInit() {
  this.usuarioID = this.oSessionService.getUserId() ?? 0;
  this.email = this.oActivatedRoute.snapshot.params['email'];
  this.cargarMensajes();
  console.log('ID del usuario desde token:', this.usuarioID);
  console.log('Email del usuario desde token:', this.email);

  this.getOne();
  this.getPage();
}

getDifficultyClass(difficulty: string): string {
  switch(difficulty.toUpperCase()) {
    case 'BASICA':
    case 'PRINCIPIANTE':
      return 'bg-success';
    case 'MEDIA':
    case 'INTERMEDIO':
      return 'bg-warning';
    case 'AVANZADA':
    case 'AVANZADO':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
}

downloadPdf(contrato: IGrupocontrata): void {
  this.oPdfService.generarPlanEntrenamiento(contrato);
}

inputVisible: boolean[] = [];


toggleInput(index: number) {
  this.inputVisible[index] = !this.inputVisible[index];
}





getPage() {
  if (!this.usuarioID) {
    console.error('usuarioID no definido');
    return;
  }

  this.oGcontrataService.getPageByUsuarioId(this.usuarioID, this.nPage, this.nRpp).subscribe({
    next: (oPageFromServer: IPage<IGrupocontrata>) => {
      oPageFromServer.content.forEach(item => {
        (item as any).mostrarInputMensaje = false;
        (item as any).contenidoMensaje = '';
      });

      this.oPage = oPageFromServer;
      this.arrBotonera = this.oBotoneraService.getBotonera(this.nPage, oPageFromServer.totalPages);
    },
    error: (err) => {
      console.error(err);
    },
  });
}

cargarMensajes(): void {
  this.oMensajeService.getMensajesRecibidos(this.usuarioID).subscribe({
    next: (data) => {
      this.mensajes = data;
    },
    error: (err) => {
      console.error('Error cargando mensajes:', err);
    }
  });
}

enviarMSJ(contrato: IGrupocontrata): void {
  const contratoId = contrato.id;
  const contenido = (this.contenidoMensajeMap[contratoId] || '').trim();
  if (!contenido) return;

  const receptorId = contrato.planesentrenamiento.creador?.id;
  if (!receptorId) {
    console.error('El receptorId no está definido.');
    return;
  }

  const dto: EnviarMensajeDTO = {
    emisorId: this.usuarioID,
    receptorId: receptorId,
    contenido: contenido
  };

  this.oMensajeService.enviarMensaje(dto).subscribe({
    next: (mensaje) => {
      console.log('Mensaje enviado correctamente:', mensaje);
      this.contenidoMensajeMap[contratoId] = '';
      this.mostrarInputMap[contratoId] = false;
    },
    error: (err) => {
      console.error('Error al enviar mensaje:', err);
    }
  });
}

responderMensaje(mensaje: IMensaje): void {
  const contenido = (this.respuestasMap[mensaje.id] || '').trim();
  if (!contenido) return;

  const dto: EnviarMensajeDTO = {
    emisorId: this.usuarioID,              // ID del usuario autenticado
    receptorId: mensaje.emisor.id,         // Se responde al EMISOR del mensaje recibido
    contenido: contenido
  };

  this.oMensajeService.enviarMensaje(dto).subscribe({
    next: () => {
      this.respuestasMap[mensaje.id] = '';
      alert('Mensaje enviado correctamente');
      this.mensajes = this.mensajes.filter(m => m.id !== mensaje.id);
    },
    error: (err) => {
      console.error('Error al enviar mensaje de respuesta', err);
    }
  });
}


deleteGcontrata(id: number): void {
  this.oGcontrataService.delete(id).subscribe({
    next: () => {
      console.log(`GrupoContrata ${id} eliminado`);
      this.getPage(); 
    },
    error: (err) => {
      console.error("Error al eliminar el grupo de contrato", err);
    }
  });
}






  
  view(planId: number): void {
    this.oRouter.navigate(['/cliente/planesentrenamiento/view', planId]);
  }
  
  getOne() {
    this.oUsuarioService.getUsuarioByEmail(this.email).subscribe({
      next: (data: IUsuario) => {
        this.oUsuario = data;
      },
      error: (err) => {
        console.error('Error al obtener los datos del Usuario', err);
      }
    });
  }

    goToPage(p: number) {
    if (p) {
      this.nPage = p - 1;
      this.getPage();
    }
    return false;
  }

  goToNext() {
    this.nPage++;
    this.getPage();
    return false;
  }

  goToPrev() {
    this.nPage--;
    this.getPage();
    return false;
  }

  sort(field: string) {
    this.strField = field;
    this.strDir = this.strDir === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  goToRpp(nrpp: number) {
    this.nPage = 0;
    this.nRpp = nrpp;
    this.getPage();
    return false;
  }

  filter(event: KeyboardEvent) {
    this.debounceSubject.next(this.strFiltro);
  }

}
