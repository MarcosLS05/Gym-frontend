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
  oUsuario: IUsuario = {} as IUsuario;
  modalImage: string = '';

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



getPage() {
  if (!this.usuarioID) {
    console.error('usuarioID no definido');
    return;
  }

  

  this.oGcontrataService.getPageByUsuarioId(this.usuarioID, this.nPage, this.nRpp).subscribe({
    next: (oPageFromServer: IPage<IGrupocontrata>) => {
      this.oPage = oPageFromServer;
      this.arrBotonera = this.oBotoneraService.getBotonera(this.nPage, oPageFromServer.totalPages);
    },
    error: (err) => {
      console.error(err);
    },
  });
}

enviarMSJ(idcreador: number): void {
  
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
