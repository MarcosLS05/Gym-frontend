import { Component,inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CryptoService } from '../../../service/crypto.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { CommonModule } from '@angular/common';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-planesentrenamiento.admin.create.routed',
  templateUrl: './planesentrenamiento.admin.create.routed.component.html',
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
      dificultad: new FormControl(''),
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      
    });
  }

  updateForm() {
    this.oPlanesentrenamientoForm?.controls['titulo'].setValue('');
    this.oPlanesentrenamientoForm?.controls['descripcion'].setValue('');
    this.oPlanesentrenamientoForm?.controls['dificultad'].setValue('');
    this.oPlanesentrenamientoForm?.controls['fecha_creacion'].setValue(new Date());
   
  }




  showModal(mensaje: string) {
    this.strMessage = mensaje;
    setTimeout(() => {
      this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
        keyboard: false,
      });
      this.myModal.show();
    }, 0);
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
      this.showModal('Formulario inválido');
      return;
    } else {      
      this.oPlanesentrenamientoService.create(this.oPlanesentrenamientoForm?.value).subscribe({
        next: (oPlanesentrenamiento: IPlanesentrenamiento) => {
          this.oPlanesentrenamiento = oPlanesentrenamiento;
          this.showModal('Plan de entrenamiento creado con el id: ' + this.oPlanesentrenamiento.id);
        },
        error: (err) => {
          this.showModal('Error al crear el plan de entrenamiento');
          console.error(err);
        },
      });
    }
  }
  



}
