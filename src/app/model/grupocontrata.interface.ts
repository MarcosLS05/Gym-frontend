import { IUsuario } from './usuario.interface';
import { IPlanesentrenamiento } from './planesentrenamiento.interface';
export interface IGrupocontrata {
  id: number;
  titulo: string;
  descripcion: string;
  Usuario: IUsuario;
  Planesentrenamiento: IPlanesentrenamiento;
  
}