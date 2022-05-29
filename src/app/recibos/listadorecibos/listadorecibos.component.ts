import { Component, OnInit, PipeTransform } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Inmueble } from 'src/app/ficheros/inmuebles/inmueble';
import { FincasService } from 'src/app/services/fincas.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
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

  recibos:any;
  inmuebles:any;
  propietarios:any;
  fincas:any;
  titulo:string = "Listado de Inmuebles";
  idfincainmueble:string = "";
  idpropietarioinmueble:string = "";
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
    private propietarioService:PropietarioService,
    private fincasService:FincasService) { }
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.obtenerRecibos();
  }
  obtenerRecibos(){
    this.recibosService.getRecibos()
      .subscribe(respuesta =>{
        this.recibos = respuesta;
      })
  }
  obtenerPropietarios(){
    this.propietarioService.getPropietarios()
      .subscribe(respuesta =>{
        this.propietarios = respuesta;
      })
  }
  obtenerFincas(){
    this.fincasService.getFincas()
      .subscribe(respuesta =>{
        this.fincas = respuesta;
      })
  }
}
