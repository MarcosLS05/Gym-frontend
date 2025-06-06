import { IUsuario } from "./usuario.interface";


export interface IMensaje {
  id: number;
  emisor: IUsuario;
  receptor: IUsuario;
  contenido: string;
  fechaEnvio: string; 
  leido: boolean;
}
