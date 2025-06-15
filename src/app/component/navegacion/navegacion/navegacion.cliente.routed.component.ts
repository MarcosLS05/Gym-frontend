import { Component, inject, OnInit } from '@angular/core';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessionService } from '../../../service/session.service';

import { FormsModule } from '@angular/forms';
import { CreateGcontrataCliente } from '../../../model/createGcontrataClienteDTO';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
// ...other imports...
@Component({
  standalone: true,
  selector: 'app-navegacion-cliente',
  templateUrl: 'navegacion.cliente.routed.component.html',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  styleUrls: ['navegacion.cliente.routed.component.css'],
})

export class NavegacionClienteRoutedComponent implements OnInit {
private oSessionService: SessionService = inject(SessionService);
private id_usuario: number = 0;
 oPage: IPage<IPlanesentrenamiento> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 15;
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
    private oPlanesentrenamientoService: PlanesentrenamientoService,
    private oBotoneraService: BotoneraService,
    private oGcontrataService: GrupocontrataService,
    private oRouter: Router,
   
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
        this.getPage();
          const tipo = this.oSessionService.getUserRole();
  if (tipo === 'Entrenador Personal' || tipo === 'Cliente') {
    const id = this.oSessionService.getUserId();
    if (id && id > 0) {
      this.id_usuario = id;
    } else {
      console.error('ID de usuario no válido');
    }
  } else {
    console.warn('Tipo de usuario no autorizado');
  }
  }

  getPage() {
    this.oPlanesentrenamientoService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IPlanesentrenamiento>) => {
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

mensajeExito: string = '';
mostrarMensaje: boolean = false;

addFavoritos(plan: IPlanesentrenamiento) {
  if (this.id_usuario > 0) {
    const dto = {
      usuarioId: this.id_usuario,
      planId: plan.id
    };

    this.oGcontrataService.addFavoritos(dto).subscribe({
      next: (res) => {
        this.mensajeExito = 'Plan añadido correctamente a favoritos';
        this.mostrarMensaje = true;
        setTimeout(() => {
          this.mostrarMensaje = false;
        }, 3000); // desaparece en 3 segundos
      },
      error: (err) => {
        console.error('Error en el backend:', err);
        this.mensajeExito = 'Error al añadir el plan a favoritos';
        this.mostrarMensaje = true;
        setTimeout(() => {
          this.mostrarMensaje = false;
        }, 3000);
      }
    });
  } else {
    console.warn('No hay usuario válido para añadir a favoritos.');
  }
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