import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InmueblesService } from 'src/app/services/inmuebles.service';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { RecibosService } from 'src/app/services/recibos.service';
import { Recibo } from '../recibo';
import swal from 'sweetalert2';

@Component({
  selector: 'app-addrecibo',
  templateUrl: './addrecibo.component.html',
  styles: [
  ]
})
export class AddreciboComponent implements OnInit {

  recibo:Recibo =new Recibo();
  titulo:string = "Crear Recibo"
  inmuebles:any;
  inquilinos:any;

  constructor(
    private reciboService:RecibosService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private inmuebleService:InmueblesService,
    private inquilinosService:InquilinosService) { }

    ngOnInit(): void {
      this.cargarInmueble();
      this.cargarInquilinos();
    }
    cargarInmueble(){
      this.inmuebleService.getInmuebles()
        .subscribe(respuesta =>{
          this.inmuebles = respuesta;
        })
    }
    cargarInquilinos(){
      this.inquilinosService.getInquilinos()
        .subscribe(respuesta =>{
          this.inquilinos = respuesta;
        })
    }
    create(): void {
      this.reciboService.create(this.recibo)
        .subscribe((recibo) => {
          this.router.navigate(['recibos'])
          swal.fire('Nuevo recibo', `Recibo ${this.recibo.id} creado con éxito!`, 'success')
         }
        );
        console.log(this.recibo);
    }
}
