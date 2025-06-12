import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { CryptoService } from '../../../service/crypto.service';
import { CommonModule } from '@angular/common';
import { FormsModule, Validators } from '@angular/forms';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './newusuarioAACC.component.html',
  styleUrls: ['./newusuarioAACC.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
})
export class newusuarioACCComponent {

  codigo_postalStr: string = '';

togglePasswordVisibility() {
throw new Error('Method not implemented.');
}
  usuario: IUsuario = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: '',
    telefono: '',
    provincia: '',
    codigo_postal: 0,
    direccion: '',
    dni: '',
    fecha_nacimiento: new Date(),
    tipousuario: {
      id: 0,
      titulo: '',
    },
  };

  esEntrenador: boolean = false; // Por defecto es cliente
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private oCryptoService: CryptoService,
    private router: Router
  ) {}

  limpiarMensajes() {
  this.mensajeExito = '';
  this.mensajeError = '';
}

registrarUsuario() {
  this.limpiarMensajes();

  // Validaciones manuales
  if (!this.usuario.nombre || this.usuario.nombre.trim().length === 0) {
    this.mensajeError = 'El nombre es obligatorio.';
    this.resetError();
    return;
  }

  if (!this.usuario.apellido1 || this.usuario.apellido1.trim().length === 0) {
    this.mensajeError = 'El primer apellido es obligatorio.';
    this.resetError();
    return;
  }

  if (!this.usuario.email || !this.validarEmail(this.usuario.email)) {
    this.mensajeError = 'Correo electrónico inválido.';
    this.resetError();
    return;
  }

  if (!this.usuario.password || this.usuario.password.length < 8) {
    this.mensajeError = 'La contraseña debe tener al menos 8 caracteres.';
    this.resetError();
    return;
  }

  if (!this.usuario.telefono || this.usuario.telefono.trim().length !== 9) {
    this.mensajeError = 'El teléfono debe tener 9 dígitos.';
    this.resetError();
    return;
  }

const codPostal = parseInt(this.codigo_postalStr.trim(), 10);
if (isNaN(codPostal) || this.codigo_postalStr.length !== 5) {
  this.mensajeError = 'El código postal debe tener 5 dígitos numéricos.';
  this.resetError();
  return;
}

this.usuario.codigo_postal = codPostal;

  if (!this.usuario.direccion || this.usuario.direccion.trim().length === 0) {
    this.mensajeError = 'La dirección es obligatoria.';
    this.resetError();
    return;
  }

  if (!this.usuario.dni || this.usuario.dni.trim().length === 0) {
    this.mensajeError = 'El DNI es obligatorio.';
    this.resetError();
    return;
  }

  if (!this.usuario.provincia || this.usuario.provincia.trim().length === 0) {
    this.mensajeError = 'La provincia es obligatoria.';
    this.resetError();
    return;
  }

  if (!this.usuario.fecha_nacimiento) {
    this.mensajeError = 'La fecha de nacimiento es obligatoria.';
    this.resetError();
    return;
  }

  if (this.usuario.fecha_nacimiento > new Date()) {
    this.mensajeError = 'La fecha de nacimiento no puede ser futura.';
    this.resetError();
    return;
  }

  const usuarioHasheado = {
    nombre: this.usuario.nombre.trim(),
    apellido1: this.usuario.apellido1.trim(),
    apellido2: this.usuario.apellido2?.trim() || '',
    email: this.usuario.email.trim(),
    telefono: this.usuario.telefono.trim(),
    provincia: this.usuario.provincia.trim(),
    codigo_postal: this.usuario.codigo_postal = codPostal,
    direccion: this.usuario.direccion.trim(),
    dni: this.usuario.dni.trim(),
    fecha_nacimiento: this.usuario.fecha_nacimiento,
    password: this.oCryptoService.getHashSHA256(this.usuario.password),
    esEntrenador: this.esEntrenador
  };

  this.usuarioService.register(usuarioHasheado).subscribe(
    (response) => {
      this.mensajeExito = 'Cuenta creada correctamente. Redirigiendo...';
      setTimeout(() => {
        this.limpiarMensajes();
        this.router.navigate(['/login']);
      }, 3000);
    },
    (error) => {
      this.mensajeError = 'Error al registrar el usuario. Intente nuevamente.';
      this.resetError();
    }
  );
}

private validarEmail(email: string): boolean {
  const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return patron.test(email);
}

private resetError() {
  setTimeout(() => {
    this.limpiarMensajes();
  }, 3000);
}


}
