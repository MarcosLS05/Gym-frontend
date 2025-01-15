import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-planesentrenamiento.admin.create.routed',
  templateUrl: './planesentrenamiento.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./planesentrenamiento.admin.create.routed.component.css'],
})
export class PlanesentrenamientoAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oPlanesentrenamientoForm: FormGroup | undefined = undefined;
  oPlanesentrenamiento: IPlanesentrenamiento | null = null;
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oPlanesentrenamientoService: PlanesentrenamientoService,
    private oRouter: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.oPlanesentrenamientoForm?.markAllAsTouched();
  }

  createForm() {
    this.oPlanesentrenamientoForm = new FormGroup({
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
      id_tipoPlanesentrenamiento: new FormControl('', [Validators.required, Validators.min(1)]),
    });
  }

  updateForm() {
    this.oPlanesentrenamientoForm?.controls['nombre'].setValue('');
    this.oPlanesentrenamientoForm?.controls['apellido1'].setValue('');
    this.oPlanesentrenamientoForm?.controls['apellido2'].setValue('');
    this.oPlanesentrenamientoForm?.controls['email'].setValue('');
    this.oPlanesentrenamientoForm?.controls['id_tipoPlanesentrenamiento'].setValue('');
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  onReset() {
    this.updateForm();
    return false;
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/planesentrenamiento/view/' + this.oPlanesentrenamiento?.id]);
  }

  onSubmit() {
    if (this.oPlanesentrenamientoForm?.invalid) {
      this.showModal('Formulario inválido');
      return;
    } else {      
      this.oPlanesentrenamientoService.create(this.oPlanesentrenamientoForm?.value).subscribe({
        next: (oPlanesentrenamiento: IPlanesentrenamiento) => {
          this.oPlanesentrenamiento = oPlanesentrenamiento;
          this.showModal('planesentrenamiento creado con el id: ' + this.oPlanesentrenamiento.id);
        },
        error: (err) => {
          this.showModal('Error al crear el planesentrenamiento');
          console.log(err);
        },
      });
    }
  }



}
