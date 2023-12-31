import { Component, OnInit } from '@angular/core';
import config from './config-modulo.json';

@Component({
    selector: 'app-schematic',
    templateUrl: './schematic.component.html',
    styleUrls: ['./schematic.component.scss']
})
export class SchematicComponent implements OnInit {

    public config: any = config;
    public modo: string = 'listar';

    constructor() { }

    ngOnInit(): void { }

    alterarModo(modo: string) {
        this.modo = modo;
    }

}
