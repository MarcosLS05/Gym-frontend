import { Component, OnInit } from '@angular/core';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { SessionService } from '../../../service/session.service';

declare let bootstrap: any;

@Component({
  selector: 'app-planesentrenamiento-entrenador-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './planesentrenamiento.entrenador.delete.routed.component.html',
  styleUrl: './planesentrenamiento.entrenador.delete.routed.component.css',
})
export class PlanesentrenamientoEntrenadorDeleteRoutedComponent implements OnInit {
  oPlanesentrenamiento: IPlanesentrenamiento | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oPlanesentrenamientoService: PlanesentrenamientoService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router,
    private oSessionService: SessionService
    
  ) {}

ngOnInit(): void {
  let id = this.oActivatedRoute.snapshot.params['id'];
  this.oPlanesentrenamientoService.get(id).subscribe({
    next: (oPlanesentrenamiento: IPlanesentrenamiento) => {
      const userId = Number(this.oSessionService.getUserId());
      if (oPlanesentrenamiento.creador?.id !== userId) {
        this.showModal('No tienes permiso para borrar este plan');
        return;
      }
      this.oPlanesentrenamiento = oPlanesentrenamiento;
    },
    error: (err) => {
      this.showModal('Error al cargar el Plan de entrenamiento');
    },
  });
}

delete(): void {
  const userId = Number(this.oSessionService.getUserId());

  if (!this.oPlanesentrenamiento || this.oPlanesentrenamiento.creador?.id !== userId) {
    this.showModal('No tienes permiso para borrar este plan');
    return;
  }

  if (this.oPlanesentrenamiento?.id) {
    this.oPlanesentrenamientoService.delete(this.oPlanesentrenamiento.id).subscribe({
      next: () => {
        this.showModal(
          `Plan de entrenamiento con id ${this.oPlanesentrenamiento?.id} ha sido borrado`
        );
      },
      error: () => {
        this.showModal('Error al borrar el Plan de entrenamiento');
      },
    });
  } else {
    this.showModal('No se encontró el Plan de entrenamiento para eliminar');
  }
}




  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }



  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/entrenador/planesentrenamiento/plist']);
  }
  
}
