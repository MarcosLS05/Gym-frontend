import { Component, OnInit } from '@angular/core';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IGrupocontrata } from '../../../model/grupocontrata.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-grupocontrata-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './grupocontrata.admin.delete.component.html',
  styleUrl: './grupocontrata.admin.delete.component.css',
})
export class GrupocontrataAdminDeleteRoutedComponent implements OnInit {
  oGrupocontrata: IGrupocontrata | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oGrupocontrataService: GrupocontrataService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oGrupocontrataService.get(id).subscribe({
      next: (oGrupocontrata: IGrupocontrata) => {
        this.oGrupocontrata = oGrupocontrata;
      },
      error: (err) => {
        this.showModal('Error al cargar el grupocontrata');
      },
    });
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  delete(): void {
    this.oGrupocontrataService.delete(this.oGrupocontrata!.id).subscribe({
      next: (data) => {
        this.showModal(
          'grupocontrata con id ' + this.oGrupocontrata!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el grupocontrata');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/grupocontrata/plist']);
  }
  
}
