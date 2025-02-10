import { IUsuario } from './usuario.interface';
import { IPlanesentrenamiento } from './planesentrenamiento.interface';
export interface IGrupocontrata {
  id: number;
  titulo: string;
  descripcion: string;
  usuario: IUsuario;
  planesentrenamiento: IPlanesentrenamiento;
  
}