import { Component, OnInit } from '@angular/core';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-planesentrenamiento-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './planesentrenamiento.admin.delete.component.html',
  styleUrl: './planesentrenamiento.admin.delete.component.css',
})
export class PlanesentrenamientoAdminDeleteRoutedComponent implements OnInit {
  oPlanesentrenamiento: IPlanesentrenamiento | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oPlanesentrenamientoService: PlanesentrenamientoService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oPlanesentrenamientoService.get(id).subscribe({
      next: (oPlanesentrenamiento: IPlanesentrenamiento) => {
        this.oPlanesentrenamiento = oPlanesentrenamiento;
      },
      error: (err) => {
        this.showModal('Error al cargar el planesentrenamiento');
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
    this.oPlanesentrenamientoService.delete(this.oPlanesentrenamiento!.id).subscribe({
      next: (data) => {
        this.showModal(
          'planesentrenamiento con id ' + this.oPlanesentrenamiento!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el planesentrenamiento');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/planesentrenamiento/plist']);
  }
  
}
