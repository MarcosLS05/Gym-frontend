import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { SessionService } from "../service/session.service";
import { UsuarioService } from "../service/usuario.service";
import { IUsuario } from "../model/usuario.interface";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EntrenadorPersonalGuard implements CanActivate {

    constructor(private oSessionService: SessionService,
        private oUsuarioService: UsuarioService,
        private oRouter: Router) { }

    canActivate(): Observable<boolean> {
        if (this.oSessionService.isSessionActive()) {
            let email: string = this.oSessionService.getSessionEmail();
            // llamar al servidor para obtener el rol del usuario
            return this.oUsuarioService.getUsuarioByEmail(email).pipe(
                map((data: IUsuario) => {
                    if (data.tipousuario.titulo === 'Entrenador Personal') {
                        return true;
                    } else {
                        this.oRouter.navigate(['/login']);
                        return false;
                    }
                })
            );        
        } else {
            this.oRouter.navigate(['/login']);
            return new Observable<boolean>(observer => {
                observer.next(false);
                observer.complete();
            });
        }
    }

}
