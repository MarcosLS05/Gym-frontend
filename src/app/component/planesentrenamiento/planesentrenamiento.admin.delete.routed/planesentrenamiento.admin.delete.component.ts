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
        this.showModal('Error al cargar el Plan de entrenamiento');
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
    // Usando el encadenamiento opcional
    if (this.oPlanesentrenamiento?.id) {
      this.oPlanesentrenamientoService.delete(this.oPlanesentrenamiento.id).subscribe({
        next: (data) => {
          this.showModal(
            'Plan de entrenamiento con id ' + this.oPlanesentrenamiento?.id + ' ha sido borrado'
          );
        },
        error: (error) => {
          this.showModal('Error al borrar el Plan de entrenamiento');
        },
      });
    } else {
      this.showModal('No se encontró el Plan de entrenamiento para eliminar');
    }
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/planesentrenamiento/plist']);
  }
  
}
