import { Inmueble } from "../ficheros/inmuebles/inmueble";
import { Inquilino } from "../ficheros/inquilinos/inquilino";

export class Recibo{
  id?:number|null;
  concepto_recibo?:string;
  fecha_recibo?:Date;
  importe_recibo?:string;
  inmueble: Inmueble=new Inmueble();
  inquilino: Inquilino=new Inquilino();
}
