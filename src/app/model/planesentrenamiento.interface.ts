import { IUsuario } from "./usuario.interface";

export interface IPlanesentrenamiento {
  id: number;
  dificultad: string;
  titulo: string;
  descripcion: string;
  fechaCreacion: Date;
  creador?: IUsuario
}