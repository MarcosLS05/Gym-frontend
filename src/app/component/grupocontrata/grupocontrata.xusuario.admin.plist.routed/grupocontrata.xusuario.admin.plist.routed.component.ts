import { Component, OnInit } from '@angular/core';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
import { IGrupocontrata } from '../../../model/grupocontrata.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-grupocontrata-xusuario-admin-routed',
  templateUrl: './grupocontrata.xusuario.admin.plist.routed.component.html',
  styleUrls: ['./grupocontrata.xusuario.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class GrupocontrataXUsuarioAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IGrupocontrata> | null = null;
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
  //
  oUsuario: IUsuario = {} as IUsuario;

  constructor(
    private oGrupocontrataService: GrupocontrataService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oUsuarioService: UsuarioService
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
    // get id from route admin/Grupocontrata/plist/xusuario/:id
    this.oActivatedRoute.params.subscribe((params) => {
      this.oUsuarioService.get(params['id']).subscribe({
        next: (oUsuario: IUsuario) => {
          this.oUsuario = oUsuario;
          this.getPage();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    });
  }

  ngOnInit() {
  }

  getPage() {
    
    this.oGrupocontrataService
      .getPageXUsuario(
        this.nPage,
        this.nRpp,
        this.strField,
        this.strDir,
        this.strFiltro,
        this.oUsuario.id
      )
      .subscribe({
        next: (oPageFromServer: IPage<IGrupocontrata>) => {
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

  edit(oGrupocontrata: IGrupocontrata) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/grupocontrata/edit', oGrupocontrata.id]);
  }

  view(oGrupocontrata: IGrupocontrata) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/grupocontrata/view', oGrupocontrata.id]);
  }

  remove(oGrupocontrata: IGrupocontrata) {
    this.oRouter.navigate(['admin/grupocontrata/delete/', oGrupocontrata.id]);
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
