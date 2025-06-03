import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IGrupocontrata } from '../../../model/grupocontrata.interface';
import { GrupocontrataService } from '../../../service/grupocontrata.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrimPipe } from '../../../pipe/trim.pipe';

@Component({
  selector: 'app-grupocontrata.admin.view.routed',
  templateUrl: './grupocontrata.admin.view.routed.component.html',
  styleUrls: ['./grupocontrata.admin.view.routed.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class GrupocontrataAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  titulo: string = '';
  oGrupocontrata: IGrupocontrata = {} as IGrupocontrata;
  
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oGrupocontrataService: GrupocontrataService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }
getOne() {
    this.oGrupocontrataService.getOne(this.id).subscribe({
      next: (data: IGrupocontrata) => {
        this.oGrupocontrata = data;
      },
    });
  }
}
