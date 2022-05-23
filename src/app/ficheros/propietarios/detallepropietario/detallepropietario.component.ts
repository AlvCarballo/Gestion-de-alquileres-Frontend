import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PropietarioService } from 'src/app/services/propietario.service';
import { Propietario } from '../propietario';

@Component({
  selector: 'app-detallepropietario',
  templateUrl: './detallepropietario.component.html'
})
export class DetallepropietarioComponent implements OnInit {
  propietario:Propietario =new Propietario();
  titulo:string = "Detalle Propietario";
  constructor(
    private propietarioService:PropietarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarPropietario();
  }
  cargarPropietario(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.propietarioService.getPropietario(id).subscribe( (propietario) => this.propietario = propietario)
      }
    })
  }
}
