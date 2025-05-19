import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { SessionService } from '../../../service/session.service';
import { CryptoService } from '../../../service/crypto.service';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './shared.login.routed.html',
  styleUrls: ['./shared.login.routed.css'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class SharedLoginRoutedComponent implements OnInit {

  errorMessage: string | null = null;

  loginForm: FormGroup = new FormGroup({});

  constructor(
    private oLoginService: LoginService,
    private oSessionService: SessionService,
    private oRouter: Router,
    private oCryptoService: CryptoService,
    private oUsuarioService: UsuarioService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });


  }

  ngOnInit(): void { }

onSubmit() {
  if (this.loginForm.valid) {
    const hashedPassword = this.oCryptoService.getHashSHA256(this.loginForm.value.password);
    this.oLoginService.login(this.loginForm.value.email, hashedPassword).subscribe({
      next: (token: string) => {
        this.oSessionService.login(token);
        console.log('Token recibido:', token);
        // Obtener usuario completo con rol
        this.oUsuarioService.getUsuarioByEmail(this.loginForm.value.email).subscribe({
          next: (user) => {
            console.log('Usuario completo:', user);
            this.oSessionService.setUsuario(user);

            // Aquí puedes guardar el usuario en algún servicio global o BehaviorSubject
            // para que esté disponible en toda la app
          },
          error: (err) => {
            console.error('Error al obtener usuario:', err);
          }
        });

        alert('Inicio de sesión exitoso');
        this.oRouter.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        alert('Correo o contraseña incorrectos');
      }
    });
  }
}

  onAdmin() {
    this.loginForm.setValue({
      email: 'nuevoemail@gmail.com',
      password: 'ausias'
    });
  }

  onEntrenadorPersonal() {
    this.loginForm.setValue({
      email: 'emailAna2976@gmail.com',
      password: 'ausias'
    });
  }

  onCliente() {
    this.loginForm.setValue({
      email: 'emailSara2476@gmail.com',
      password: 'ausias'
    });
  }


}