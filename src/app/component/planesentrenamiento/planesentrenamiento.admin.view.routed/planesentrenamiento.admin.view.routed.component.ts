import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-planesentrenamiento.admin.view.routed',
  templateUrl: './planesentrenamiento.admin.view.routed.component.html',
  styleUrls: ['./planesentrenamiento.admin.view.routed.component.css']
})
export class PlanesentrenamientoAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oUsuario: IPlanesentrenamiento = {} as IPlanesentrenamiento;
  numeroApuntes: number = 0;
  numeroApuntesAbiertos: number = 0;
  //
  constructor(private oActivatedRoute: ActivatedRoute, private oPlanesentrenamientoService: PlanesentrenamientoService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];


    this.getOne();
  }

  getOne() {
    this.oPlanesentrenamientoService.getOne(this.id).subscribe({
      next: (data: IPlanesentrenamiento) => {
        this.oUsuario = data;
      },
    });
  }
}