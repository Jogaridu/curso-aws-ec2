import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UtilsService } from 'src/services/utils.service';

@Component({
    selector: 'app-restrito',
    templateUrl: './restrito.component.html',
    styleUrls: ['./restrito.component.scss']
})
export class RestritoComponent implements OnInit {

    // Formulário
    public dados: any = {};
    public errorForm: any = {};
    public msgErrorForm: any = {};

    constructor(
        private elementRef: ElementRef,
        private activatedRoute: ActivatedRoute,
        private utils: UtilsService,
    ) { }

    ngOnInit(): void {
    }

    async logar() {

        const inputs = ['row-email', 'row-senha'];

        const dadosVazios = await this.utils.verificaCamposVazios(
            this.dados,
            inputs,
            true,
            this.elementRef
        );

        if (dadosVazios.length != 0) {

            this.utils.exibirToast('erro', 'Informe os dados de acesso.');
            return false;

        }

        if (this.dados['email'] != 'admin' || this.dados['senha'] != 'admin') {

            this.utils.exibirToast('erro', 'Dados de acesso incorretos.')
            return;

        }

        // const dados = await fetch('http://54.163.207.248:3333/enviarEmail', {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     method: 'POST',
        //     body: this.dados,
        //     mode: 'cors'
        // });

        this.utils.exibirToast('sucesso', 'Logada com sucesso', 'Bem vinda');

        this.utils.navegar('/');

        return true;

    }

}
