import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { SessionService } from '../../../service/session.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

declare let bootstrap: any;

@Component({
  selector: 'app-planesentrenamiento-entrenador-edit-routed',
  templateUrl: './planesentrenamiento.entrenador.edit.routed.component.html',
  styleUrls: ['./planesentrenamiento.entrenador.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class PlanesentrenamientoEntrenadorEditRoutedComponent implements OnInit {
  id: number = 0;
  oPlanesentrenamientoForm: FormGroup | undefined = undefined;
  oPlanesentrenamiento: IPlanesentrenamiento | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPlanesentrenamientoService: PlanesentrenamientoService,
    private oRouter: Router,
    private oSessionService: SessionService
  ) {
    this.oActivatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.createForm();
    this.get();
    this.oPlanesentrenamientoForm?.markAllAsTouched();
  }

  createForm() {
    this.oPlanesentrenamientoForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      dificultad: new FormControl('', [
        Validators.required,
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
    });
  }
  

  onReset() {
    this.oPlanesentrenamientoService.get(this.id).subscribe({
      next: (oPlanesentrenamiento: IPlanesentrenamiento) => {
        this.oPlanesentrenamiento = oPlanesentrenamiento;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oPlanesentrenamientoForm?.controls['id'].setValue(this.oPlanesentrenamiento?.id);
    this.oPlanesentrenamientoForm?.controls['titulo'].setValue(this.oPlanesentrenamiento?.titulo);
    this.oPlanesentrenamientoForm?.controls['dificultad'].setValue(this.oPlanesentrenamiento?.dificultad);
    this.oPlanesentrenamientoForm?.controls['descripcion'].setValue(this.oPlanesentrenamiento?.descripcion);
    
  }
  

get() {
  this.oPlanesentrenamientoService.get(this.id).subscribe({
    next: (oPlanesentrenamiento: IPlanesentrenamiento) => {
      const userId = this.oSessionService.getUserId();
      
const userIdNumber = Number(userId);
if (oPlanesentrenamiento.creador?.id !== userIdNumber) {
  this.showModal('No tienes permiso para editar este plan');
  return;
}

      this.oPlanesentrenamiento = oPlanesentrenamiento;
      this.updateForm();
    },
    error: (error) => {
      console.error(error);
    },
  });
}




  showModal(mensaje: string) {
    
    this.message = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

hideModal = () => {
  this.myModal.hide();
  
  if (this.oPlanesentrenamiento && this.oPlanesentrenamiento.id) {
    this.oRouter.navigate(['/entrenador/planesentrenamiento/view', this.oPlanesentrenamiento.id]);
  } else {
    console.error('No se puede navegar a la vista porque el plan o id es indefinido');
    this.oRouter.navigate(['/entrenador/planesentrenamiento/plist']);
  }
};



  onSubmit() {
    if (!this.oPlanesentrenamientoForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oPlanesentrenamientoService.update(this.oPlanesentrenamientoForm?.value).subscribe({
        next: (oPlanesentrenamiento: IPlanesentrenamiento) => {
          this.oPlanesentrenamiento = oPlanesentrenamiento;
          this.updateForm();
          this.showModal('Plan actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el planesentrenamiento');
          console.error(error);
        },
      });
    }
  }  
}
