import { Component } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { IUsuario } from '../../../model/usuario.interface';
import { CryptoService } from '../../../service/crypto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './newusuarioAACC.component.html',
  styleUrls: ['./newusuarioAACC.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
})
export class newusuarioACCComponent {
  usuario: IUsuario = {
    id: 0,
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    password: '',
    tipousuario: {
      id: 0,
      titulo: '',
    },
  };

  constructor(
    private usuarioService: UsuarioService,
    private oCryptoService: CryptoService
  ) {}

  registrarUsuario() {
    // Crear un objeto con los campos necesarios y la contraseña hasheada
    const usuarioHasheado = {
      nombre: this.usuario.nombre,
      apellido1: this.usuario.apellido1,
      apellido2: this.usuario.apellido2,
      email: this.usuario.email,
      password: this.oCryptoService.getHashSHA256(this.usuario.password),
      
    };

    this.usuarioService.register(usuarioHasheado).subscribe(
      (response) => {
        console.log('Usuario registrado con éxito:', response);
        // Aquí puedes manejar el éxito, como redirigir a otra página o mostrar un mensaje
      },
      (error) => {
        console.error('Error al registrar el usuario:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error en la UI
      }
    );
  }
}
