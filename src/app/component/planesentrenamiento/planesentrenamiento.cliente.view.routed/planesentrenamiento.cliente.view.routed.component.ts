import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { IUsuario } from '../../../model/usuario.interface';
import { UsuarioService } from '../../../service/usuario.service';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-planesentrenamiento.cliente.view.routed',
  templateUrl: './planesentrenamiento.cliente.view.routed.component.html',
  styleUrls: ['./planesentrenamiento.cliente.view.routed.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class PlanesentrenamientoClienteViewRoutedComponent implements OnInit {
  email:string = '';
  id: number = 0;
  route: string = '';
  titulo: string = '';
  oUsuario: IUsuario = {} as IUsuario;
  oplanesentrenamiento: IPlanesentrenamiento = {} as IPlanesentrenamiento;
  
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPlanesentrenamientoService: PlanesentrenamientoService,
    private oUsuarioService: UsuarioService,
    private oRouter: Router // Para la navegación
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.email = this.oActivatedRoute.snapshot.params['email'];

    console.log('Email del usuario desde token:', this.email);
    this.getOne();
  }

  volverAlPerfil(): void {
  this.oRouter.navigate(['/byemail', this.email]);
}
getOne() {
    this.oPlanesentrenamientoService.getOne(this.id).subscribe({
      next: (data: IPlanesentrenamiento) => {
        
        this.oplanesentrenamiento = data;
      },
    });

        this.oUsuarioService.getUsuarioByEmail(this.email).subscribe({
          next: (data: IUsuario) => {
            this.oUsuario = data;
          },
          error: (err) => {
            console.error('Error al obtener los datos del Usuario', err);
          }
        });
  }
}
