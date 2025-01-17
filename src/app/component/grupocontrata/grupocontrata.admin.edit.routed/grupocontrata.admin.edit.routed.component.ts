import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
import { IGrupocontrata } from '../../../model/grupocontrata.interface';

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
  selector: 'app-grupocontrata-admin-edit-routed',
  templateUrl: './grupocontrata.admin.edit.routed.component.html',
  styleUrls: ['./grupocontrata.admin.edit.routed.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class GrupocontrataAdminEditRoutedComponent implements OnInit {
  id: number = 0;
  oGrupocontrataForm: FormGroup | undefined = undefined;
  oGrupocontrata: IGrupocontrata | null = null;
  message: string = '';

  myModal: any;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oGrupocontrataService: GrupocontrataService,
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
  }
  

  get() {
    this.oGrupocontrataService.get(this.id).subscribe({
      next: (oGrupocontrata: IGrupocontrata) => {
        this.oGrupocontrata = oGrupocontrata;
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
          this.showModal('grupocontrata ' + this.oGrupocontrata.id + ' actualizado');
        },
        error: (error) => {
          this.showModal('Error al actualizar el grupocontrata');
          console.error(error);
        },
      });
    }
  }  
}
