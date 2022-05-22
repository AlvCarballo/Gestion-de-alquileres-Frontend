import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FincasService } from 'src/app/services/fincas.service';
import { Finca } from '../finca';
import swal from 'sweetalert2';

@Component({
  selector: 'app-addfinca',
  templateUrl: './addfinca.component.html'
})
export class AddfincaComponent implements OnInit {

  finca:Finca =new Finca();
  titulo:string = "Crear Finca"

  constructor(private fincaService:FincasService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  create(): void {
    this.fincaService.create(this.finca)
      .subscribe(finca => {
        this.router.navigate(['/fincas'])
        swal.fire('Nueva finca', 'Finca creada con éxito!', 'success')

       }
      );
  }
}
