import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MensajeService } from '../../../service/mensaje.service';
import { IMensaje } from '../../../model/mensaje.interface';
import { PlanesentrenamientoselectorComponent } from '../../planesentrenamiento/planesentrenamientoselector/planesentrenamientoselector.component';
import { UsuarioselectorComponent } from '../../usuario/usuarioselector/usuarioselector.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUsuario } from '../../../model/usuario.interface';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { UsuarioService } from '../../../service/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

declare let bootstrap: any;

@Component({
  selector: 'app-mensaje-admin-edit-routed',
  templateUrl: './mensaje.admin.edit.routed.component.html',
  styleUrls: ['./mensaje.admin.edit.routed.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, RouterModule],
})
export class MensajeAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oMensajeForm: FormGroup | undefined = undefined;
  oMensaje: IMensaje | null = null;
  oUsuario: IUsuario = {} as IUsuario;
  oPlanesentrenamiento: IPlanesentrenamiento = {} as IPlanesentrenamiento;
  strMessage: string = '';
  readonly dialog = inject(MatDialog);

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oMensajeService: MensajeService,
    private oUsuarioService: UsuarioService,
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
    this.oMensajeForm?.markAllAsTouched();

    // Suscripción a cambios en el campo 'Usuario'
    this.oMensajeForm?.controls['usuario'].valueChanges.subscribe((change) => {
      if (change && change.id) {
        this.oUsuarioService.get(change.id).subscribe({
          next: (oUsuario: IUsuario) => {
            this.oUsuario = oUsuario;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.oUsuario = {} as IUsuario;
            this.oMensajeForm?.controls['usuario'].setErrors({ invalid: true });
          },
        });
      } else {
        this.oUsuario = {} as IUsuario;
      }
    });

    // Suscripción a cambios en el campo 'Plan de entrenamiento'
    this.oMensajeForm?.controls['planesentrenamiento'].valueChanges.subscribe((change) => {
      if (change && change.id) {
        this.oPlanesentrenamientoService.get(change.id).subscribe({
          next: (oPlan: IPlanesentrenamiento) => {
            this.oPlanesentrenamiento = oPlan;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.oPlanesentrenamiento = {} as IPlanesentrenamiento;
            this.oMensajeForm?.controls['planesentrenamiento'].setErrors({ invalid: true });
          },
        });
      } else {
        this.oPlanesentrenamiento = {} as IPlanesentrenamiento;
      }
    });
  }

createForm() {
  this.oMensajeForm = new FormGroup({
    id: new FormControl('', [Validators.required]),

    contenido: new FormControl('', [Validators.required, Validators.minLength(1)]),

    emisor: new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl(''),
      apellido1: new FormControl(''),
      apellido2: new FormControl(''),
      email: new FormControl(''),
    }),

    receptor: new FormGroup({
      id: new FormControl('', [Validators.required]),
      nombre: new FormControl(''),
      apellido1: new FormControl(''),
      apellido2: new FormControl(''),
      email: new FormControl(''),
    }),
  });
}


  onReset() {
    this.oMensajeService.get(this.id).subscribe({
      next: (oMensaje: IMensaje) => {
        this.oMensaje = oMensaje;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

updateForm() {
  this.oMensajeForm?.controls['id'].setValue(this.oMensaje?.id);
  this.oMensajeForm?.controls['contenido'].setValue(this.oMensaje?.contenido);

  this.oMensajeForm?.controls['emisor'].setValue({
    id: this.oMensaje?.emisor?.id,
    nombre: this.oMensaje?.emisor?.nombre,
    apellido1: this.oMensaje?.emisor?.apellido1,
    apellido2: this.oMensaje?.emisor?.apellido2,
    email: this.oMensaje?.emisor?.email,
  });

  this.oMensajeForm?.controls['receptor'].setValue({
    id: this.oMensaje?.receptor?.id,
    nombre: this.oMensaje?.receptor?.nombre,
    apellido1: this.oMensaje?.receptor?.apellido1,
    apellido2: this.oMensaje?.receptor?.apellido2,
    email: this.oMensaje?.receptor?.email,
  });
}

  

  get() {
    this.oMensajeService.get(this.id).subscribe({
      next: (oMensaje: IMensaje) => {
        this.oMensaje = oMensaje;
        this.updateForm();  // Actualiza el formulario con los datos obtenidos de la API
      },
      error: (error) => {
        console.error(error);
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

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/mensaje/view/' + this.oMensaje?.id]);
  };

  onSubmit() {
    if (!this.oMensajeForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oMensajeService.update(this.oMensajeForm?.value).subscribe({
        next: (oMensaje: IMensaje) => {
          this.oMensaje = oMensaje;
          this.updateForm();
          this.showModal('Mensaje ' + this.oMensaje.id + ' actualizado');
        },
        error: (err) => {
          console.log(err);
          this.showModal('Ha habido un error');
        },
      });
    }
  }

showEmisorSelectorModal() {
  const dialogRef = this.dialog.open(UsuarioselectorComponent, {
    height: '500px',
    width: '80%',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result !== undefined) {
      this.oMensajeForm?.controls['emisor'].setValue({
        id: result.id,
        nombre: result.nombre,
        apellido1: result.apellido1,
        apellido2: result.apellido2,
        email: result.email
      });
    }
  });

  return false;
}


  showReceptorSelectorModal() {
    const dialogRef = this.dialog.open(UsuarioselectorComponent, {
      height: '500px',
      maxHeight: '800px',
      width: '80%',
      maxWidth: '90%',
      


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oMensajeForm?.controls['receptor'].setValue({
          id: result.id,
          nombre: result.nombre,
          apellido1: result.apellido1,
          apellido2: result.apellido2,
          email: result.email
        });
      }
    });
    return false;
  }
}
