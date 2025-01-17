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
import { IGrupocontrata } from '../../../model/grupocontrata.interface';
import { GrupocontrataService } from '../../../service/grupocontrata.service';

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
    });
  }

  updateForm() {
    this.oGrupocontrataForm?.controls['id'].setValue(this.oGrupocontrata?.id);
    this.oGrupocontrataForm?.controls['titulo'].setValue(this.oGrupocontrata?.titulo);
    this.oGrupocontrataForm?.controls['descripcion'].setValue(this.oGrupocontrata?.descripcion);
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
