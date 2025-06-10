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
    private oCryptoService: CryptoService
  
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
    });
  }

  updateForm() {
    this.oMensajeForm?.controls['id'].setValue(this.oMensajeForm?.id);
    this.oUsuarioForm?.controls['usuario'].setValue({
      id: null,
      nombre: null,
      apellido1: null,
      apellido2: null,
      email: null,
    });
   
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
    } else {      
      const hashedPassword = this.oCryptoService.getHashSHA256(this.oMensajeForm?.value.password);
      this.oMensajeForm?.controls['password'].setValue(hashedPassword);
      this.oMensajeService.create(this.oMensajeForm?.value).subscribe({
        next: (oMensaje: IMensaje) => {
          this.oMensaje = oMensaje;
          this.showModal('mensaje creado con el id: ' + this.oMensaje.id);
        },
        error: (err) => {
          this.showModal('Error al crear el mensaje');
          console.log(err);
        },
      });
    }
  }
  showTipoMensajeSelectorModal() {
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
        this.oMensajeForm?.controls['Usuario'].setValue({
          id: result.id,
          titulo: result.titulo,
        });
      }
    });
    return false;
  }



}
