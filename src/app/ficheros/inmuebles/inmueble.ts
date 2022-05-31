import { Finca } from "../fincas/finca";
import { Inquilino } from "../inquilinos/inquilino";
import { Propietario } from "../propietarios/propietario";

export class Inmueble {
  id?: number;
  ref_catastral_inmueble!: string;
  letra_inmueble!: string;
  piso_inmueble!: string;
  alquilado_inmueble!: boolean;
  precio_inmueble!: string;
  finca: Finca=new Finca();
  inquilino: Inquilino=new Inquilino();
  propietario: Propietario=new Propietario();
}
