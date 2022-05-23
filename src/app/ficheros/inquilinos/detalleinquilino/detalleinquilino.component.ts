import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { PropietarioService } from 'src/app/services/propietario.service';
import { Propietario } from '../../propietarios/propietario';
import { Inquilino } from '../inquilino';

@Component({
  selector: 'app-detalleinquilino',
  templateUrl: './detalleinquilino.component.html',
  styles: [
  ]
})
export class DetalleinquilinoComponent implements OnInit {

  inquilino:Inquilino =new Inquilino();
  titulo:string = "Modificar Propietario";
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

}
