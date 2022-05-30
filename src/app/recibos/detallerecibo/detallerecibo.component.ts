import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecibosService } from 'src/app/services/recibos.service';
import { Recibo } from '../recibo';

@Component({
  selector: 'app-detallerecibo',
  templateUrl: './detallerecibo.component.html'
})
export class DetallereciboComponent implements OnInit {

  recibo:Recibo =new Recibo();
  titulo:string = "Detalle Recibo";
  constructor(
    private reciboService:RecibosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarRecibo();
  }
  cargarRecibo(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.reciboService.getRecibo(id).subscribe( (recibo) => this.recibo = recibo)
      }
    })
  }

}
