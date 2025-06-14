import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SessionService } from '../../../service/session.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-planesentrenamiento.admin.create',
  templateUrl: './planesentrenamiento.admin.create.routed.component.html',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    MatIconModule,
  ],
  styleUrls: ['./planesentrenamiento.admin.create.routed.component.css'],
})
export class PlanesentrenamientoAdminCreateRoutedComponent implements OnInit {
  private oRouter = inject(Router);
  private oSessionService: SessionService = inject(SessionService);
  private id_usuario: number = 0;

  public oForm: FormGroup = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    dificultad: new FormControl('', [Validators.required])
  });

  constructor(
    public planesentrenamientoService: PlanesentrenamientoService
  ) {}

ngOnInit(): void {
  const tipo = this.oSessionService.getUserRole();
  if (tipo === 'Entrenador Personal' || tipo === 'Administrador') {
    const id = this.oSessionService.getUserId();
    if (id && id > 0) {
      this.id_usuario = id;
    } else {
      console.error('ID de usuario no válido');
    }
  } else {
    console.warn('Tipo de usuario no autorizado');
  }
}




  onSubmit(): void {
    if (this.oForm.valid) {
      const formData = this.oForm.value;
      const { titulo, descripcion, dificultad } = formData;

      if (!this.id_usuario || this.id_usuario <= 0) {
        console.error('ID de creador no válido:', this.id_usuario);
        return;
      }

      this.planesentrenamientoService.createPlan(
        { titulo, descripcion, dificultad },
        this.id_usuario
      ).subscribe({
        next: (data) => {
          
          // Redirigir, mostrar notificación, etc.
          this.oRouter.navigate(['admin/planesentrenamiento/plist']); // ejemplo
        },
        error: (err) => {
          console.error('Error al crear el plan:', err);
        }
      });
    }
  }
}
