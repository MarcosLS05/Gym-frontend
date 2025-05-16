import { ITipousuario } from './tipousuario.interface';

export interface IUsuario {
  id: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  email: string;
  telefono: string;
  provincia: string;
  codigo_postal: number;
  direccion: string;
  dni: string;
  fecha_nacimiento: Date;
  password: string;
  tipousuario: ITipousuario;
  //planesentrenamiento?: any;
  grupocontrata?: any;

  
}