import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionService } from '../../../service/session.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-planesentrenamiento-entrenador-plist',
  templateUrl: 'planesentrenamiento.entrenador.plist.routed.component.html',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule,
  ],
  styleUrls: ['planesentrenamiento.entrenador.plist.routed.component.css'],
})

export class PlanesentrenamientoEntrenadorPlistRoutedComponent implements OnInit {
  private oRouter = inject(Router);
  private oSessionService: SessionService = inject(SessionService);
  private id_usuario: number = 0;

    public misPlanes: IPlanesentrenamiento[] = [];

  public oForm: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    dificultad: new FormControl('', [Validators.required])
  });

  constructor(
    public planesentrenamientoService: PlanesentrenamientoService
  ) {}

ngOnInit(): void {
  const idCreador = this.oSessionService.getUserId(); // o como lo tengas guardado
  if (idCreador) {
    this.planesentrenamientoService.getPlanesByCreador(idCreador).subscribe({
      next: (planes) => {
        this.misPlanes = planes;
        
      },
      error: (err) => {
        console.error('Error al obtener los planes:', err);
      }
    });
  }
}

  edit(oPlanesentrenamiento: IPlanesentrenamiento) {
    //navegar a la página de edición
    this.oRouter.navigate(['entrenador/planesentrenamiento/edit', oPlanesentrenamiento.id]);
  }

}