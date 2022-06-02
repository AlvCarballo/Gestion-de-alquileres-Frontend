import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InquilinosService } from 'src/app/services/inquilinos.service';
import { Inquilino } from '../inquilino';
import swal from 'sweetalert2';

@Component({
  selector: 'app-addinquilino',
  templateUrl: './addinquilino.component.html',
  styles: [
  ]
})
export class AddinquilinoComponent implements OnInit {

  inquilino:Inquilino =new Inquilino();
  titulo:string = "Crear Inquilino"

  constructor(private inquilinosService:InquilinosService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  create(): void {
    this.inquilinosService.create(this.inquilino)
      .subscribe(inquilino => {
        this.router.navigate(['ficheros//inquilinos'])
        swal.fire('Nuevo inquilino', `Inquilino ${inquilino.nombre_inquilino} creada con éxito!`, 'success')

       }
      );
  }
}
