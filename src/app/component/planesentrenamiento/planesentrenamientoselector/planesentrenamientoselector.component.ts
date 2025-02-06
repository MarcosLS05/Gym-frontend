import { Component, inject, OnInit } from '@angular/core';
import { IPlanesentrenamiento } from '../../../model/planesentrenamiento.interface';
import { IPage } from '../../../model/model.interface';
import { PlanesentrenamientoService } from '../../../service/planesentrenamiento.service';
import { BotoneraService } from '../../../service/botonera.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-planesentrenamientoselector',
  templateUrl: './planesentrenamientoselector.component.html',
  styleUrls: ['./planesentrenamientoselector.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class PlanesentrenamientoselectorComponent implements OnInit {
  oPage: IPage<IPlanesentrenamiento> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = 'desc';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();
  //
  readonly dialogRef = inject(MatDialogRef<PlanesentrenamientoselectorComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private oPlanesentrenamientoService: PlanesentrenamientoService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
     this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }
      ngOnInit() {
        this.getPage();
      }
    
      getPage() {
        
        this.oPlanesentrenamientoService
          .getPage(
            this.nPage,
            this.nRpp,
            this.strField,
            this.strDir,
            this.strFiltro
          )
          .subscribe({
            next: (oPageFromServer: IPage<IPlanesentrenamiento>) => {
              this.oPage = oPageFromServer;
              this.arrBotonera = this.oBotoneraService.getBotonera(
                this.nPage,
                oPageFromServer.totalPages
              );
            },
            error: (err) => {
              console.log(err);
            },
          });
        
      }
    
     
    
      select(oPlanesentrenamiento: IPlanesentrenamiento) {
        
          // estamos en ventana emergente: no navegar
          // emitir el objeto seleccionado
    
          this.dialogRef.close(oPlanesentrenamiento);
    
    
      }
    
    
    
      goToPage(p: number) {
        if (p) {
          this.nPage = p - 1;
          this.getPage();
        }
        return false;
      }
    
      goToNext() {
        this.nPage++;
        this.getPage();
        return false;
      }
    
      goToPrev() {
        this.nPage--;
        this.getPage();
        return false;
      }
    
      sort(field: string) {
        this.strField = field;
        this.strDir = this.strDir === 'asc' ? 'desc' : 'asc';
        this.getPage();
      }
    
      goToRpp(nrpp: number) {
        this.nPage = 0;
        this.nRpp = nrpp;
        this.getPage();
        return false;
      }
    
      filter(event: KeyboardEvent) {
        this.debounceSubject.next(this.strFiltro);    
      }
    }

  
    