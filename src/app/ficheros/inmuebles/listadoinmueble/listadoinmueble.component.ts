import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FincasService } from 'src/app/services/fincas.service';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { PropietarioService } from 'src/app/services/propietario.service';
import swal from 'sweetalert2';
import { Inmueble } from '../inmueble';


@Component({
  selector: 'app-listadoinmueble',
  templateUrl: './listadoinmueble.component.html',
  styles: [
  ]
})
export class ListadoinmuebleComponent implements OnInit {
  inmuebles:any;
  propietarios:any;
  fincas:any;
  titulo:string = "Listado de Inmuebles";
  idfincainmueble:string = "";
  idpropietarioinmueble:string = "";
  paginador:any;
  searchText:any;

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success  mx-2',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  constructor(private inmueblesService:InmueblesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private propietarioService:PropietarioService,
    private fincasService:FincasService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.obtenerInmuebles();
    this.obtenerPropietarios();
    this.obtenerFincas();
  }
  ngOnChanges() {
    this.obtenerInmuebles();
  }
  obtenerInmuebles(){
    this.activatedRoute.paramMap.subscribe(params => {
      let page:number;
      let parametro = params.get('page');
      if(!parametro){
        page = 0;
      }else{
        page = +parametro;
      }
      let idfincainmueble = params.get('idfincainmueble');
      let idpropietarioinmueble = params.get('idpropietarioinmueble');
      if(idfincainmueble){
        this.idfincainmueble=idfincainmueble;
      }else if(idpropietarioinmueble){
        this.idpropietarioinmueble=idpropietarioinmueble;
      }
      this.inmueblesService.getInmueblesP(page)
      .subscribe(response =>{
        this.inmuebles = response.content as Inmueble[];
        this.paginador = response;
      })
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

  delete(inmueble: Inmueble): void {
    this.swalWithBootstrapButtons.fire({
      icon: 'warning',
      title: 'Est?? seguro?',
      text: `??Seguro que desea eliminar al inmueble ${inmueble.ref_catastral_inmueble} ?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {

        this.inmueblesService.delete(inmueble.id).subscribe(
          () => {
            this.inmuebles = this.inmuebles.filter((finca: any) => finca !== finca)
            swal.fire(
              'Inmueble Eliminado!',
              `Inmueble ${inmueble.ref_catastral_inmueble} eliminado con ??xito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
