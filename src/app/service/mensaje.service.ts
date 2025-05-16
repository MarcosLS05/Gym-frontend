import { Injectable } from '@angular/core';
import { IUsuario } from '../model/usuario.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { IMensaje } from '../model/mensaje.interface';
import { EnviarMensajeDTO } from '../model/EnviarMensajeDTO.interface';




@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  serverURL: string = serverURL + '/mensaje';

  constructor(private http: HttpClient) {}

  enviarMensaje(dto: EnviarMensajeDTO): Observable<IMensaje> {
    return this.http.post<IMensaje>(`${this.serverURL}/enviar`, dto);
  }

  getConversacion(usuario1Id: number, usuario2Id: number): Observable<IMensaje[]> {
    return this.http.get<IMensaje[]>(`${this.serverURL}/conversacion?usuario1Id=${usuario1Id}&usuario2Id=${usuario2Id}`);
  }

  getUsuariosConversados(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.serverURL}/usuariosConversados/${userId}`);
  }

  marcarComoLeido(mensajeId: number): Observable<void> {
    return this.http.put<void>(`${this.serverURL}/marcarLeido/${mensajeId}`, {});
  }
}