import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FincasService } from 'src/app/services/fincas.service';
import { Finca } from '../finca';
import swal from 'sweetalert2'

@Component({
  selector: 'app-modfinca',
  templateUrl: './modfinca.component.html'
})
export class ModfincaComponent implements OnInit {

  finca:Finca =new Finca();
  titulo:string = "Modificar Finca";
  errores!: string[];

  constructor(private fincaService:FincasService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id')

      if(id){
        this.fincaService.getFinca(id)
        .subscribe( (respuesta) =>
          this.finca = respuesta);
          console.log(this.finca);

      }
    });
  }

  cargarFinca(): void{
    this.activatedRoute.paramMap.subscribe(params => {
      let id = params.get('id')
      if(id){
        this.fincaService.getFinca(id)
        .subscribe( (respuesta) =>
          this.finca = respuesta);
          console.log(this.finca);

      }
    })
  }

  update():void{
    this.fincaService.update(this.finca)
    .subscribe( finca => {
      this.router.navigate(['ficheros/fincas']);
      swal.fire('Finca Actualizada', `Finca actualizada con éxito!`, 'success');
    },
    err => {
      this.errores = err.error.errors as string[];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    }
    )
  }

}
