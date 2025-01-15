import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

declare let bootstrap: any;

@Component({
  selector: 'app-planesentrenamiento-admin-edit-routed',
  templateUrl: './planesentrenamiento.admin.edit.routed.component.html',
  styleUrls: ['./planesentrenamiento.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class PlanesentrenamientoAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oPlanesentrenamientoForm: FormGroup | undefined = undefined;
  oPlanesentrenamiento: IPlanesentrenamiento | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPlanesentrenamientoService: PlanesentrenamientoService,
    private oRouter: Router
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
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido1: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellido2: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      id_tipoPlanesentrenamiento: new FormControl('', [
        Validators.required,
        Validators.min(1),
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
    this.oPlanesentrenamientoForm?.controls['nombre'].setValue(this.oPlanesentrenamiento?.titulo);
    this.oPlanesentrenamientoForm?.controls['apellido1'].setValue(this.oPlanesentrenamiento?.descripcion);
    this.oPlanesentrenamientoForm?.controls['id_Planesentrenamiento'].setValue(this.oPlanesentrenamiento?.id);
  }

  get() {
    this.oPlanesentrenamientoService.get(this.id).subscribe({
      next: (oPlanesentrenamiento: IPlanesentrenamiento) => {
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
    this.oRouter.navigate(['/admin/planesentrenamiento/view/' + this.oPlanesentrenamiento?.id]);
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
          this.showModal('planesentrenamiento ' + this.oPlanesentrenamiento.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el planesentrenamiento');
          console.error(error);
        },
      });
    }
  }
}
