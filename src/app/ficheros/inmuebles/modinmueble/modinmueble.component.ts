import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { Inmueble } from '../inmueble';
import swal from 'sweetalert2'
import { FincasService } from 'src/app/services/fincas.service';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { PropietarioService } from 'src/app/services/propietario.service';

@Component({
  selector: 'app-modinmueble',
  templateUrl: './modinmueble.component.html',
  styles: [
  ]
})
export class ModinmuebleComponent implements OnInit {

  inmueble:Inmueble =new Inmueble();
  titulo:string = "Modificar Inmueble";
  errores!: string[];
  fincas:any;
  inquilinos:any;
  propietarios:any;

  constructor(
    private inmuebleService:InmueblesService,
    private fincasService:FincasService,
    private inquilinosService:InquilinosService,
    private propietariosService:PropietarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id')

      if(id){
        this.inmuebleService.getInmueble(id)
        .subscribe( (respuesta) =>
          this.inmueble = respuesta);
          console.log(this.inmueble);

      }
    });
    this.cargarFinca();
    this.cargarInquilinos();
    this.cargarPropietarios();
  }

  cargarInmueble(): void{
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id')
      if(id){
        this.inmuebleService.getInmueble(id)
        .subscribe( (respuesta) =>
          this.inmueble = respuesta);
          console.log(this.inmueble);

      }
    })
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
  update():void{
    this.inmuebleService.update(this.inmueble)
    .subscribe( inmueble => {
      this.router.navigate(['ficheros/inmuebles']);
      swal.fire('Inmueble Actualizado', `Inmueble actualizao con éxito!`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    )
  }

}
