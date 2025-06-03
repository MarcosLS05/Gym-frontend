import { IUsuario } from './usuario.interface';
import { IPlanesentrenamiento } from './planesentrenamiento.interface';
export interface IGrupocontrata {
  id: number;
  usuario: IUsuario;
  creadoEn: Date;
  planesentrenamiento: IPlanesentrenamiento;
  
}