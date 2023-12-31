import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-botao',
    templateUrl: './botao.component.html',
    styleUrls: ['./botao.component.scss'],
})
export class BotaoComponent implements OnInit {

    @Input('texto') txtBotao = '';
    @Input('tipo') tipoBotao = '';
    @Input() disabled = false;
    @Input() mostrarSpinner = false;
    @Input() redirecionar = {
        pagina: '',
        queryParams: {},
        animacao: false
    };


    constructor() { }

    ngOnInit() { }

    navegar() {

        const { pagina, queryParams, animacao } = this.redirecionar;

        if (pagina === '') {
            return;
        }

        // this.utils.navigateForward(pagina, queryParams, animacao);

    }

}
