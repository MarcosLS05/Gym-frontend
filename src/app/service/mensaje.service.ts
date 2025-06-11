import { Injectable } from '@angular/core';
import { IUsuario } from '../model/usuario.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { IMensaje } from '../model/mensaje.interface';
import { EnviarMensajeDTO } from '../model/EnviarMensajeDTO.interface';
import { IGrupocontrata } from '../model/grupocontrata.interface';




@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  serverURL: string = serverURL + '/mensajes';

  constructor(private oHttp: HttpClient) {}

  enviarMensaje(dto: EnviarMensajeDTO): Observable<IMensaje> {
    return this.oHttp.post<IMensaje>(`${this.serverURL}/enviar`, dto);
  }

  getConversacion(usuario1Id: number, usuario2Id: number): Observable<IMensaje[]> {
    return this.oHttp.get<IMensaje[]>(`${this.serverURL}/conversacion?usuario1Id=${usuario1Id}&usuario2Id=${usuario2Id}`);
  }

  getUsuariosConversados(userId: number): Observable<number[]> {
    return this.oHttp.get<number[]>(`${this.serverURL}/usuariosConversados/${userId}`);
  }

  marcarComoLeido(mensajeId: number): Observable<void> {
    return this.oHttp.put<void>(`${this.serverURL}/marcarLeido/${mensajeId}`, {});
  }

  delete(id: number) {
    return this.oHttp.delete(this.serverURL + '/' + id);
  }

  createMensaje(dto: EnviarMensajeDTO): Observable<any> {
    return this.oHttp.post(`${this.serverURL}/new`, dto);
  }


    get(id: number): Observable<IMensaje> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IMensaje>(URL);
  }

    getOne(id: number): Observable<IMensaje> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IMensaje>(URL);
  }

    getPage(
      page: number,
      size: number,
      field: string,
      dir: string,
      filtro: string
    ): Observable<IPage<IMensaje>> {
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
      return this.oHttp.get<IPage<IMensaje>>(URL, httpOptions);
    }
}