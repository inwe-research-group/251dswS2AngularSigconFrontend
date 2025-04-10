import { ITipoDocumento } from './tipo-documento';
import { IUbigeo } from './ubigeo';

export interface IPersonaResponse {
  idPersona: number;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  fechaNacimiento: Date;
  nDocumento: string;
  direccion: string;
  tipoDocumento: ITipoDocumento;
  ubigeo: IUbigeo;
}
