import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { Injectable } from '@angular/core';
import { IPlanesentrenamiento } from '../model/planesentrenamiento.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanesentrenamientoService {
  serverURL: string = serverURL + '/planesentrenamiento';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IPlanesentrenamiento>> {
    let URL: string = '';
    URL += this.serverURL;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<IPlanesentrenamiento>>(URL, httpOptions);
  }

  get(id: number): Observable<IPlanesentrenamiento> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IPlanesentrenamiento>(URL);
  }

  create(oPlanesentrenamiento: IPlanesentrenamiento): Observable<IPlanesentrenamiento> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IPlanesentrenamiento>(URL, oPlanesentrenamiento);
  }

  update(oPlanesentrenamiento: IPlanesentrenamiento): Observable<IPlanesentrenamiento> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IPlanesentrenamiento>(URL, oPlanesentrenamiento);
  }

  getOne(id: number): Observable<IPlanesentrenamiento> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IPlanesentrenamiento>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }
}
