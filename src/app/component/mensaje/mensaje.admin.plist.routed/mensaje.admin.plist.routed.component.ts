import { Component, inject, OnInit } from '@angular/core';
import { MensajeService } from '../../../service/mensaje.service';
import { IMensaje } from '../../../model/mensaje.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-mensaje.admin.routed',
  templateUrl: './mensaje.admin.plist.routed.component.html',
  styleUrls: ['./mensaje.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class MensajeAdminPlistRoutedComponent implements OnInit {
  oMensaje: IMensaje | null = null;
  oPage: IPage<IMensaje> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = '';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();
  readonly dialog = inject(MatDialog);
  constructor(
    private oMensajeService: MensajeService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oMensajeService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IMensaje>) => {
          this.oPage = oPageFromServer;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            oPageFromServer.totalPages
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }



  edit(oMensaje: IMensaje) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/mensaje/edit', oMensaje.id]);
  }

  view(oMensaje: IMensaje) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/mensaje/view', oMensaje.id]);
  }

  remove(oMensaje: IMensaje) {
    this.oRouter.navigate(['admin/mensaje/delete/', oMensaje.id]);
  }

  delete(id: number) {
    this.oMensajeService.delete(id).subscribe({
      next: (data) => {
        this.getPage();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error deleting message:', error);
      },
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

//  <td class="text-start">
//  <a href="admin/tipoMensaje/view/{{ mensaje.tipoMensaje.id }}">
//    {{ mensaje.tipoMensaje.titulo }} ({{ mensaje.tipoMensaje.id }})
//  </a>
//  <a href="admin/mensaje/plist/xtipoMensaje/{{ mensaje.tipoMensaje.id }}">
//    <i class="bi bi-filter-circle"></i>
 // </a>
//</td>
//<td class="text-center">
//<a href="/admin/planesentrenamiento/plist/xMensaje/{{ mensaje.id }}" class="btn btn-primary">{{ mensaje.planesentrenamiento }}</a>

//</td>
}
