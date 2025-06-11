import { Component,inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CryptoService } from '../../../service/crypto.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormControl,
  FormGroup,  
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { IMensaje } from '../../../model/mensaje.interface';
import { MensajeService } from '../../../service/mensaje.service';
import { UsuarioselectorComponent } from '../../usuario/usuarioselector/usuarioselector.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';
import { SessionService } from '../../../service/session.service';
import { EnviarMensajeDTO } from '../../../model/EnviarMensajeDTO.interface';

declare let bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-mensaje.admin.create.routed',
  templateUrl: './mensaje.admin.create.routed.component.html',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  styleUrls: ['./mensaje.admin.create.routed.component.css'],
})
export class MensajeAdminCreateRoutedComponent implements OnInit {

  id: number = 0;
  oUsuarioForm: FormGroup | undefined = undefined;
  oMensajeForm: FormGroup | undefined = undefined;
  oMensaje: IMensaje | null = null;
  strMessage: string = '';
  readonly dialog = inject(MatDialog);
  oUsuario: IUsuario = {} as IUsuario;
  myModal: any;

  form: FormGroup = new FormGroup({});
 

  constructor(
    private oMensajeService: MensajeService,
    private oRouter: Router,
    private oUsuarioService: UsuarioService,
    private oCryptoService: CryptoService,
    private oSessionService: SessionService,
  
  ) {}

  
    ngOnInit() {
      this.createForm();
      if (this.oMensajeForm) {
        this.oMensajeForm.markAllAsTouched();
      
        // Suscripción a los cambios en el campo 'tipoMensaje'
        this.oMensajeForm.controls['Usuario'].valueChanges.subscribe(change => {
          if (change && change.id) {
            // Obtener el objeto tipoMensaje del servidor
            this.oUsuarioService.get(change.id).subscribe({
              next: (oUsuario: IUsuario) => {
                this.oUsuario = oUsuario;
              },
              error: (err: HttpErrorResponse) => {  // Tipo de error especificado
                console.log(err);
                this.oUsuario = {} as IUsuario;
                // Marcar el campo como inválido si hay un error
                if (this.oMensajeForm) {
                  this.oMensajeForm.controls['tipoMensaje'].setErrors({
                    invalid: true,
                  });
                }
              }
            });
          } else {
            this.oUsuario = {} as IUsuario;
          }
        });
      }
    }
    
  createForm() {
this.oMensajeForm = new FormGroup({
  usuario: new FormGroup({
    id: new FormControl('', [Validators.required]),
    nombre: new FormControl(''),
    apellido1: new FormControl(''),
    apellido2: new FormControl(''),
    email: new FormControl(''),
  }),
  contenido: new FormControl('', [Validators.required, Validators.minLength(1)]),
});

  }

  updateForm() {
    
    this.oUsuarioForm?.controls['usuario'].setValue({
      id: null,
      nombre: null,
      apellido1: null,
      apellido2: null,
      email: null,
    });
   this.oMensajeForm?.get('contenido')?.setValue('');
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  isPasswordVisible = false;

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }



  onReset() {
    this.updateForm();
    return false;
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/mensaje/view/' + this.oMensaje?.id]);
  }

onSubmit() {
  if (this.oMensajeForm?.invalid) {
    this.showModal('Formulario inválido');
    return;
  }

  const emisorId = this.oSessionService.getUserId();
  const receptorId = this.oMensajeForm?.get('usuario.id')?.value;
  const contenido = this.oMensajeForm?.get('contenido')?.value;

  if (!emisorId || !receptorId || !contenido) {
    this.showModal('Faltan datos para enviar el mensaje');
    return;
  }

  const dto: EnviarMensajeDTO = {
    emisorId: emisorId,
    receptorId: receptorId,
    contenido: contenido
  };

  this.oMensajeService.createMensaje(dto).subscribe({
    next: (oMensaje: IMensaje) => {
      this.oMensaje = oMensaje;
      this.showModal('Mensaje creado con el id: ' + this.oMensaje.id);
    },
    error: (err) => {
      this.showModal('Error al crear el mensaje');
      console.log(err);
    },
  });
}

  showUsuarioSelectorModal() {
    const dialogRef = this.dialog.open(UsuarioselectorComponent, {
      height: '500px',
      maxHeight: '500px',
      width: '50%',
      maxWidth: '90%',
      


    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oMensajeForm?.controls['usuario'].setValue({
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
