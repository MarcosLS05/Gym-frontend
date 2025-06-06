import { Component, OnInit } from '@angular/core';
import { MensajeService } from '../../../service/mensaje.service';
import { IMensaje } from '../../../model/mensaje.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensaje.admin.view.routed',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  
  templateUrl: './mensaje.admin.view.routed.component.html',
  styleUrls: ['./mensaje.admin.view.routed.component.css']
})
export class MensajeAdminViewRoutedComponent implements OnInit {
  //
  id: number = 0;
  route: string = '';
  oMensaje: IMensaje = {} as IMensaje;

  //
  constructor(private oActivatedRoute: ActivatedRoute, private oMensajeService: MensajeService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];


    this.getOne();
  }

  getOne() {
    this.oMensajeService.getOne(this.id).subscribe({
      next: (data: IMensaje) => {
        this.oMensaje = data;
      },
    });
  }
}