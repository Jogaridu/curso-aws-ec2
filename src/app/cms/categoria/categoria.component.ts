import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html',
    styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

    public modo: string = 'listar';

    constructor() { }

    async ngOnInit() {

    }

    alterarModo(modo: string) {
        this.modo = modo;
    }

}
