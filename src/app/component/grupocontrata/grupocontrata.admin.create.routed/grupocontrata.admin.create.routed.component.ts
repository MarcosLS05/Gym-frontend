import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PlanesentrenamientoselectorComponent } from '../../planesentrenamiento/planesentrenamientoselector/planesentrenamientoselector.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IGrupocontrata } from '../../../model/grupocontrata.interface';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
import { MatDialog } from '@angular/material/dialog';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-grupocontrata.admin.create.routed',
  templateUrl: './grupocontrata.admin.create.routed.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  styleUrls: ['./grupocontrata.admin.create.routed.component.css'],
})
export class GrupocontrataAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oGrupocontrataForm: FormGroup | undefined = undefined;
  oGrupocontrata: IGrupocontrata | null = null;
  oPlanesentrenamiento: IPlanesentrenamiento = {} as IPlanesentrenamiento;
  readonly dialog = inject(MatDialog);
  strMessage: string = '';

  myModal: any;

  form: FormGroup = new FormGroup({});

  constructor(
    private oGrupocontrataService: GrupocontrataService,
    private oRouter: Router
  ) {}

  ngOnInit() {
    this.createForm();
    this.oGrupocontrataForm?.markAllAsTouched();
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
      planesentrenamiento: new FormGroup({
        id: new FormControl('', [Validators.required]),
        titulo: new FormControl(''),
        descripcion: new FormControl(''),
      })
    });
  }

  updateForm() {
    this.oGrupocontrataForm?.controls['id'].setValue(this.oGrupocontrata?.id);
    this.oGrupocontrataForm?.controls['titulo'].setValue(this.oGrupocontrata?.titulo);
    this.oGrupocontrataForm?.controls['descripcion'].setValue(this.oGrupocontrata?.descripcion);
    this.oGrupocontrataForm?.controls['planesentrenamiento'].setValue({
      id: null,
      titulo: null,
      descripcion: null,
    });

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
    this.oRouter.navigate(['/admin/grupocontrata/view/' + this.oGrupocontrata?.id]);
  }

  onSubmit() {
    if (!this.oGrupocontrataForm?.valid) {
      this.showModal('Formulario no válido');
      return;
    } else {
      this.oGrupocontrataService.create(this.oGrupocontrataForm?.value).subscribe({
        next: (oGrupocontrata: IGrupocontrata) => {
          this.oGrupocontrata = oGrupocontrata;
          this.showModal('Contrato creado con el id: ' + this.oGrupocontrata.id);
        },
        error: (error) => {
          this.showModal('Error al crear el contrato');
          console.error(error);
        },
      });
    }
  }
  
  showPlanesentrenamientoSelectorModal() {
    const dialogRef = this.dialog.open(PlanesentrenamientoselectorComponent, {
      height: '800px',
      maxHeight: '1200px',
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



}
