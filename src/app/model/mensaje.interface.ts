

export interface IMensaje {
  id: number;
  emisorId: number;
  receptorId: number;
  contenido: string;
  fechaEnvio: string; // o Date si lo parseas como tal
  leido: boolean;
}
