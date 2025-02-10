import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
import { IGrupocontrata } from '../../../model/grupocontrata.interface';
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
  selector: 'app-grupocontrata-admin-edit-routed',
  templateUrl: './grupocontrata.admin.edit.routed.component.html',
  styleUrls: ['./grupocontrata.admin.edit.routed.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, RouterModule],
})
export class GrupocontrataAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oGrupocontrataForm: FormGroup | undefined = undefined;
  oGrupocontrata: IGrupocontrata | null = null;
  oUsuario: IUsuario = {} as IUsuario;
  oPlanesentrenamiento: IPlanesentrenamiento = {} as IPlanesentrenamiento;
  message: string = '';
  readonly dialog = inject(MatDialog);

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oGrupocontrataService: GrupocontrataService,
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
    this.oGrupocontrataForm?.markAllAsTouched();

    // Suscripción a cambios en el campo 'Usuario'
    this.oGrupocontrataForm?.controls['usuario'].valueChanges.subscribe((change) => {
      if (change && change.id) {
        this.oUsuarioService.get(change.id).subscribe({
          next: (oUsuario: IUsuario) => {
            this.oUsuario = oUsuario;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.oUsuario = {} as IUsuario;
            this.oGrupocontrataForm?.controls['usuario'].setErrors({ invalid: true });
          },
        });
      } else {
        this.oUsuario = {} as IUsuario;
      }
    });

    // Suscripción a cambios en el campo 'Plan de entrenamiento'
    this.oGrupocontrataForm?.controls['planesentrenamiento'].valueChanges.subscribe((change) => {
      if (change && change.id) {
        this.oPlanesentrenamientoService.get(change.id).subscribe({
          next: (oPlan: IPlanesentrenamiento) => {
            this.oPlanesentrenamiento = oPlan;
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            this.oPlanesentrenamiento = {} as IPlanesentrenamiento;
            this.oGrupocontrataForm?.controls['planesentrenamiento'].setErrors({ invalid: true });
          },
        });
      } else {
        this.oPlanesentrenamiento = {} as IPlanesentrenamiento;
      }
    });
  }

  createForm() {
    this.oGrupocontrataForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
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

      usuario: new FormGroup({
        id: new FormControl('', [Validators.required]),
        nombre: new FormControl(''),
        apellido1: new FormControl(''),
        apellido2: new FormControl(''),
        email: new FormControl(''),
      }),

      planesentrenamiento: new FormGroup({
        id: new FormControl('', [Validators.required]),
        titulo: new FormControl(''),
        descripcion: new FormControl(''),
      }),
    });
  }

  onReset() {
    this.oGrupocontrataService.get(this.id).subscribe({
      next: (oGrupocontrata: IGrupocontrata) => {
        this.oGrupocontrata = oGrupocontrata;
        this.updateForm();
      },
      error: (error) => {
        console.error(error);
      },
    });
    return false;
  }

  updateForm() {
    this.oGrupocontrataForm?.controls['id'].setValue(this.oGrupocontrata?.id);
    this.oGrupocontrataForm?.controls['titulo'].setValue(this.oGrupocontrata?.titulo);
    this.oGrupocontrataForm?.controls['descripcion'].setValue(this.oGrupocontrata?.descripcion);
  
    // Asigna los valores correctos para 'usuario' y 'planesentrenamiento'
    this.oGrupocontrataForm?.controls['usuario'].setValue({
      id: this.oGrupocontrata?.usuario?.id,
      nombre: this.oGrupocontrata?.usuario?.nombre,
      apellido1: this.oGrupocontrata?.usuario?.apellido1,
      apellido2: this.oGrupocontrata?.usuario?.apellido2,
      email: this.oGrupocontrata?.usuario?.email,
    });
  
    this.oGrupocontrataForm?.controls['planesentrenamiento'].setValue({
      id: this.oGrupocontrata?.planesentrenamiento?.id,
      titulo: this.oGrupocontrata?.planesentrenamiento?.titulo,
      descripcion: this.oGrupocontrata?.planesentrenamiento?.descripcion,
    });
  }
  

  get() {
    this.oGrupocontrataService.get(this.id).subscribe({
      next: (oGrupocontrata: IGrupocontrata) => {
        this.oGrupocontrata = oGrupocontrata;
        this.updateForm();  // Actualiza el formulario con los datos obtenidos de la API
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
    this.oRouter.navigate(['/admin/grupocontrata/view/' + this.oGrupocontrata?.id]);
  };

  onSubmit() {
    if (!this.oGrupocontrataForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oGrupocontrataService.update(this.oGrupocontrataForm?.value).subscribe({
        next: (oGrupocontrata: IGrupocontrata) => {
          this.oGrupocontrata = oGrupocontrata;
          this.updateForm();
          this.showModal('Contrato ' + this.oGrupocontrata.id + ' actualizado');
        },
        error: (err) => {
          console.log(err);
          this.showModal('Ha habido un error');
        },
      });
    }
  }

  showPlanesentrenamientoSelectorModal() {
    const dialogRef = this.dialog.open(PlanesentrenamientoselectorComponent, {
      height: '500px',
      maxHeight: '800px',
      width: '80%',
      maxWidth: '90%',
      


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oGrupocontrataForm?.controls['planesentrenamiento'].setValue({
          id: result.id,
          titulo: result.titulo,
          descripcion: result.descripcion,
        });
      }
    });
    return false;
  }

  showUsuarioSelectorModal() {
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
        this.oGrupocontrataForm?.controls['usuario'].setValue({
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
