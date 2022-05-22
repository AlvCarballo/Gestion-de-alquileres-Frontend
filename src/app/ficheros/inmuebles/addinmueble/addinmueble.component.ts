import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { Inmueble } from '../inmueble';
import swal from 'sweetalert2';
import { FincasService } from 'src/app/services/fincas.service';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { PropietarioService } from 'src/app/services/propietario.service';

@Component({
  selector: 'app-addinmueble',
  templateUrl: './addinmueble.component.html',
  styles: [
  ]
})
export class AddinmuebleComponent implements OnInit {
  inmueble:Inmueble =new Inmueble();
  titulo:string = "Crear Inmueble"
  fincas:any;
  inquilinos:any;
  propietarios:any;

  constructor(
    private inmuebleService:InmueblesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fincasService:FincasService,
    private inquilinosService:InquilinosService,
    private propietariosService:PropietarioService) { }

    ngOnInit(): void {
      this.cargarFinca();
      this.cargarInquilinos();
      this.cargarPropietarios();
    }
    cargarFinca(){
      this.fincasService.getFincas()
        .subscribe(respuesta =>{
          this.fincas = respuesta;
        })
    }
    cargarInquilinos(){
      this.inquilinosService.getInquilinos()
        .subscribe(respuesta =>{
          this.inquilinos = respuesta;
        })
    }
    cargarPropietarios(){
      this.propietariosService.getPropietarios()
        .subscribe(respuesta =>{
          this.propietarios = respuesta;
        })
    }
    create(): void {
      this.inmuebleService.create(this.inmueble)
        .subscribe((inmueble) => {
          this.router.navigate(['ficheros/inmuebles'])
          swal.fire('Nuevo inmueble', `Inmueble ${this.inmueble.piso_inmueble} ${this.inmueble.letra_inmueble} creado con éxito!`, 'success')
         }
        );
        console.log(this.inmueble);
    }
}
