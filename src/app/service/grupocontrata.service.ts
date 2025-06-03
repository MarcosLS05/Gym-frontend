import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { Injectable } from '@angular/core';
import { IGrupocontrata } from '../model/grupocontrata.interface';
import { IUsuario } from '../model/usuario.interface';
import { CreateGcontrataCliente } from '../model/createGcontrataClienteDTO';

@Injectable({
  providedIn: 'root'
})
export class GrupocontrataService {

  serverURL: string = serverURL + '/grupocontrata';

  constructor(private oHttp: HttpClient) { }

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IGrupocontrata>> {
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
    return this.oHttp.get<IPage<IGrupocontrata>>(URL, httpOptions);
  }

  getPageXUsuario(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string,
    id_usuario: number
  ): Observable<IPage<IGrupocontrata>> {
    let URL: string = '';
    URL += this.serverURL + '/xusuario/' + id_usuario;
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
    return this.oHttp.get<IPage<IGrupocontrata>>(URL, httpOptions);
  }

  get(id: number): Observable<IGrupocontrata> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IGrupocontrata>(URL);
  }

  create(oGrupocontrata: IGrupocontrata): Observable<IGrupocontrata> {
    const URL: string = `${serverURL}/grupocontrata/new`; 
    return this.oHttp.post<IGrupocontrata>(URL, oGrupocontrata, httpOptions);
  }

  addFavoritos(dto: CreateGcontrataCliente): Observable<IGrupocontrata> {
  const URL: string = `${this.serverURL}/cliente`;
  return this.oHttp.post<IGrupocontrata>(URL, dto, httpOptions);
}


  update(oGrupocontrata: IGrupocontrata): Observable<IGrupocontrata> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IGrupocontrata>(URL, oGrupocontrata);
  }

  getOne(id: number): Observable<IGrupocontrata> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IGrupocontrata>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  getPageByUsuarioId(usuarioId: number, page: number, size: number) {
  return this.oHttp.get<IPage<IGrupocontrata>>(
    `${this.serverURL}/pagexusuario?usuarioId=${usuarioId}&page=${page}&size=${size}`
  );
}
}

