import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  constructor(private inmueblesService:InmueblesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private propietarioService:PropietarioService,
    private fincasService:FincasService) { }

  ngOnInit(): void {
    this.obtenerInmuebles();
    this.obtenerPropietarios();
    this.obtenerFincas();
  }
  obtenerInmuebles(){
    this.activatedRoute.paramMap.subscribe(params => {
      let idfincainmueble = params.get('idfincainmueble');
      let idpropietarioinmueble = params.get('idpropietarioinmueble');
      if(idfincainmueble){
        this.idfincainmueble=idfincainmueble;
      }else if(idpropietarioinmueble){
        this.idpropietarioinmueble=idpropietarioinmueble;
      }
      this.inmueblesService.getInmuebles()
      .subscribe(respuesta =>{
        this.inmuebles = respuesta;
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
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al inmueble ${inmueble.ref_catastral_inmueble} ?`,
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.inmueblesService.delete(inmueble.id).subscribe(
          () => {
            this.inmuebles = this.inmuebles.filter((finca: any) => finca !== finca)
            swal.fire(
              'Inmueble Eliminado!',
              `Inmueble ${inmueble.ref_catastral_inmueble} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
