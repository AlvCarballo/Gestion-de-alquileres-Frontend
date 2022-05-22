import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import swal from 'sweetalert2'
import { Inquilino } from '../inquilino';

@Component({
  selector: 'app-modinquilino',
  templateUrl: './modinquilino.component.html',
  styles: [
  ]
})
export class ModinquilinoComponent implements OnInit {

  inquilino:Inquilino =new Inquilino();
  titulo:string = "Modificar Inquilino";
  errores!: string[];

  constructor(
    private inquilinoService:InquilinosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarInquilino();
  }

  cargarInquilino(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.inquilinoService.getInquilino(id).subscribe( (inquilino) => this.inquilino = inquilino)
      }
    })
  }

  update():void{
    this.inquilinoService.update(this.inquilino)
    .subscribe( inquilino => {
      this.router.navigate(['/fichero/inquilinos']);
      swal.fire('Inquilino Actualizado', `Inquilino ${inquilino.nombre_inquilino} actualizado con éxito!`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    )
  }

}
