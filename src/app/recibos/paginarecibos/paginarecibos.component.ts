import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-paginarecibos',
  templateUrl: './paginarecibos.component.html',
  styles: [
  ]
})
export class PaginarecibosComponent implements OnInit {

  @Input() paginador:any;
  paginas?: number[];
  constructor() { }

  ngOnInit(): void {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((valor, indice)=> indice +1);
  }

}
