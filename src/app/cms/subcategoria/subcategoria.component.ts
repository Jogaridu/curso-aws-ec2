import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-subcategoria',
    templateUrl: './subcategoria.component.html',
    styleUrls: ['./subcategoria.component.scss']
})
export class SubcategoriaComponent implements OnInit {

    public modo: string = 'listar';

    constructor() { }

    async ngOnInit() {

    }

    alterarModo(modo: string) {
        this.modo = modo;
    }

}
