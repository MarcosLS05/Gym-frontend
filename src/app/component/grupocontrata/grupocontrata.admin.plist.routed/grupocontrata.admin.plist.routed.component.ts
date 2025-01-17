import { Component, OnInit } from '@angular/core';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
import { IGrupocontrata } from '../../../model/grupocontrata.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';

@Component({
  selector: 'app-grupocontrata.admin.routed',
  templateUrl: './grupocontrata.admin.plist.routed.component.html',
  styleUrls: ['./grupocontrata.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class GrupocontrataAdminPlistRoutedComponent implements OnInit {
  
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
  constructor(
    private oGrupocontrataService: GrupocontrataService,
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
    this.oGrupocontrataService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
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
