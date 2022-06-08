import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Inmueble } from 'src/app/ficheros/inmuebles/inmueble';
import { FincasService } from 'src/app/services/fincas.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { PropietarioService } from 'src/app/services/propietario.service';
import { RecibosService } from 'src/app/services/recibos.service';
import swal from 'sweetalert2';
import { Recibo } from '../recibo';

@Component({
  selector: 'app-listadorecibos',
  templateUrl: './listadorecibos.component.html',
  styles: [
  ]
})

export class ListadorecibosComponent implements OnInit, PipeTransform  {
  newrecibo:Recibo =new Recibo();
  recibos:any;
  inmuebles:any;
  alqinmuebles:any;
  propietarios:any;
  inquilinos:any;
  fincas:any;
  titulo:string = "Listado de Recibos";
  idinquilino:string = "";
  paginador:any;
  searchText: any;


  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recibosService: RecibosService,
    private inmueblesService:InmueblesService,
    private inquilinoService:InquilinosService,
    private reciboService:RecibosService,) { }
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.obtenerRecibos();
    this.obtenerInquilinos();
  }
  ngOnChanges() {
    this.obtenerRecibos();
  }
  obtenerRecibos(){
    this.activatedRoute.paramMap.subscribe(params => {
      let page:number;
      let parametro = params.get('page');
      if(!parametro){
        page = 0;
      }else{
        page = +parametro;
      }
      let idinquilino = params.get('idinquilino');
      if(idinquilino){
        this.idinquilino=idinquilino;
      }
      this.recibosService.getRecibosP(page)
      .subscribe(response =>{
        this.recibos = response.content as Recibo[];
        this.paginador = response;
      })
    })
  }
  obtenerInquilinos(){
    this.inquilinoService.getInquilinos()
      .subscribe(respuesta =>{
        this.inquilinos = respuesta;
      })
  }
  generar(){
    this.inmueblesService.getInmuebles()
      .subscribe(response =>{
        this.inmuebles = response;
        this.inmuebles.forEach((element:any) => {
          if(element.alquilado_inmueble==true){
           this.newrecibo.id=null;
           this.newrecibo.concepto_recibo="Alquiler del mes de "+new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date())+" del "+new Intl.DateTimeFormat('es-ES', { year: 'numeric'}).format(new Date());
            this.newrecibo.fecha_recibo=new Date();
            this.newrecibo.importe_recibo=element.precio_inmueble;
            this.newrecibo.inmueble.id=element.id;
            this.newrecibo.inquilino.id=element.inquilino.id;

            this.reciboService.create(this.newrecibo)
        .subscribe((newrecibo) => {
          this.router.navigate(['recibos'])
          swal.fire('Generar Recibos', `Recibos generados correctamente`, 'success')
         }
        );
        console.log(this.newrecibo);

          }
        });
      })
      console.log( this.alqinmuebles);
  }
}
