import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-cor',
    templateUrl: './cor.component.html',
    styleUrls: ['./cor.component.scss']
})
export class CorComponent implements OnInit {

    public modo: string = 'listar';

    constructor() { }

    async ngOnInit() {

    }

    alterarModo(modo: string) {
        this.modo = modo;
    }

}
