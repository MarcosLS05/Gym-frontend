import { inject, Injectable } from "@angular/core";
import { IJwt } from "../model/jwt.interface";
import { BehaviorSubject, Subject } from "rxjs";
import { IUsuario } from "../model/usuario.interface";

@Injectable({
    providedIn: 'root'
})

export class SessionService {    
    private usuarioSubject = new BehaviorSubject<IUsuario | null>(null);
    usuario$ = this.usuarioSubject.asObservable();
    subjectLogin: Subject<void> = new Subject<void>();
    subjectLogout: Subject<void> = new Subject<void>();

    public getToken(): string | null {
        if (typeof window !== 'undefined' && window.localStorage) {
            return localStorage.getItem('token');
        }
        return null;
    }
    
    private deleteToken(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('token');
        }
    }
    
    private setToken(strToken: string): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('token', strToken);
        }
    }

    isSessionActive(): boolean {
        // comprobar si el token no ha expirado
        const token = this.getToken();
        if (token) {
            let parsedToken: IJwt;
            parsedToken = this.parseJwt(token);
            const now = Date.now() / 1000;
            if (parsedToken.exp > now) {
                return true;
            } else {
                this.deleteToken();
                return false;
            }
        } else {
            return false;
        }
    }

    getSessionEmail(): string {
        const token = this.getToken();
        if (token) {
            if (this.isSessionActive()) {
                let parsedToken: IJwt;
                parsedToken = this.parseJwt(token);
                return parsedToken.email;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;
  const parsedToken = this.parseJwt(token);
  // Aquí asumo que en el token el claim 'tipousuario' es un string (el título del rol)
  if (parsedToken && parsedToken.tipousuario) {
    return parsedToken.tipousuario;
  }
  return null;
}
getUserId(): number | null {
  const token = this.getToken();
  if (!token) return null;
  const parsed: any = this.parseJwt(token);
  if (parsed && parsed.id) return parsed.id;
  return null;
}

    setUsuario(usuario: IUsuario): void {
        this.usuarioSubject.next(usuario);
    }

    getUsuario(): IUsuario | null {
        return this.usuarioSubject.value;
    }


    private parseJwt(token: string): IJwt {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }

    onLogin(): Subject<void> {
        return this.subjectLogin;
    }

    onLogout(): Subject<void> {
        return this.subjectLogout;
    }


    login(strToken: string): void {
        this.setToken(strToken);
        this.subjectLogin.next();
    }

    logout(): void {
        this.deleteToken();
        this.subjectLogout.next();
        this.usuarioSubject.next(null);
    }


}